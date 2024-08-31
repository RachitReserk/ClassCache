import express from 'express';
const userRouter = express.Router();
import crypto from 'crypto'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import  jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import authenticateToken from '../utils/userAuth.js'
import transporter from '../utils/noidemailer.js';

userRouter.post('/sign-up',async(req,res) =>{
    try {
      const emailDomain = '@juitsolan.in';
    const {username , email , password , address} = req.body
    if(username.length < 5){
        return res
        .status(400)
        .json({message:"⚠️ Username should be greater than 4"})
    }
    const existingUsername = await User.findOne({username:username})
    if(existingUsername){
        return res
        .status(400)
        .json({message:"⚠️ Username already exists"})
     }
     const existingEmail = await User.findOne({email:email})
     if(existingEmail){
        return res
        .status(400)
        .json({message:"⚠️ Email already exists"})
     }
     if(password.length < 5){
        return res
        .status(400)
        .json({message:"⚠️ Password length should be more than 5"})
     }
     if(!email.endsWith(emailDomain)){
      return res
        .status(400)
        .json({message:"⚠️ Email should belong to JUIT's domain"})
     }


     const hashedPassword = await bcrypt.hash(password,10)

     const newUser = new User({username:username,email:email,password:hashedPassword,address:address})
     
     newUser.generateVerificationToken();
     await newUser.save();
     const verificationLink = `${process.env.WEB_URL}/${newUser.verificationToken}`

     await transporter.sendMail({
      from:'"Class Cache" <no-reply@classcache.com>',
      to:newUser.email,
      subject: 'Verify Your Email Address for Class Cache',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Welcome to Class Cache, ${username}!</h2>
          <p>Thank you for registering with us. To complete your registration and start sharing and accessing class notes, please verify your email address by clicking the button below:</p>
          <a href="${verificationLink}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Your Email</a>
          <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
          <p style="word-wrap: break-word;">${verificationLink}</p>
          <p>If you did not create an account with Class Cache, please ignore this email.</p>
          <p>Thank you</p>
        </div>
      `,
     })

     return res.status(200).json({message:"Verification email sent"})     
    } catch (error)
    {
      return res.status(500).json({error:error ,message:"Internal server error"}) 
    }
})

userRouter.get('/verify-email/:token',async(req,res) => {
try{
const {token} = req.params
const user = await User.findOne({
   verificationToken:token,
   verificationTokenExpires:{$gt:Date.now()}
})

if (!user) return res.status(400).send('Invalid or expired token');

user.isVerified = true;
user.verificationToken = undefined;
user.verificationTokenExpires = undefined;
await user.save()
return res.status(200).json({message:"Verification Done"})     
}
catch(error){
   return res.status(500).json({message:"Verification error"}) 
}
})

userRouter.post('/sign-in',async(req,res) => {
   try {
      const {username,password} = req.body
      const existingUser = await User.findOne({username})
      if(!existingUser){
        return res.status(400).json({message:"Invalid credentials"})
      }
      if(existingUser.isVerified === false){
         return res.status(400).json({message:"❌ Email unverified"})
      }
      await bcrypt.compare(password,existingUser.password,(err,data) =>{
         if(data){

            const authClaims = [
               {name:existingUser.username},
               {role:existingUser.role}
            ]

            const token = jwt.sign({authClaims},process.env.KEY,{expiresIn:"7d"})
           {/*res.status(200).json({id:existingUser.id,role:existingUser.role,token:token})*/}
            
            res.cookie('token',token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production', 
               maxAge: 36000000,
               sameSite:'none'
             });
             res.cookie('id',existingUser.id, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production', 
               sameSite:'none',
               maxAge: 36000000 
             });
             res.cookie('role',existingUser.role, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite:'none', 
               maxAge: 36000000 
             });

             res.status(200).json({ message: 'Login successful' });

         }
         else{
            res.status(400).json({message:"Invalid  Credentials"})
         }
      })
   } catch (error
   ) {
      return res.status(500).json({message:"Internal server error"})
   }
})

userRouter.post('/logout',async(req,res) => {
   try {
      res.clearCookie('token');
      res.clearCookie('id');
      res.clearCookie('role');
      res.status(200).json({ message: 'Logged out successfully' });
   } catch (error) {
      return res.status(500).json({message:"Internal server error"})
   }
})

userRouter.get('/recover-account/:email',async(req,res) => {
   try {
      const {email} = req.params
      const user = await User.findOne({email})
      if(!user){
         return res.status(404).json({message:"Account does not exist."})   
      }
      else{
         const generateResetToken = () => {
            return crypto.randomBytes(32).toString('hex');
          }
          const expirationTime = Date.now() + 36000000;
          const token = generateResetToken()
          await User.updateOne(
            { email: email },
            {
              resetPasswordToken: token,
              resetPasswordExpires: expirationTime
            }
          );
         const resetLink = `${process.env.WEB_URL2}/${token}`
         await transporter.sendMail({
            from: '"ClassCache Support" <support@class-cache.com>',
            to: email,
            subject: 'Account Recovery - Reset Your Password',
            html: `
              <p>Dear user,</p>
              <p>We received a request for your account recovery.Your username is ${user.username} , click the link below to reset your password:</p>
              <a href="${resetLink}" target="_blank" style="text-decoration: none; color: #fff; background-color: #007BFF; padding: 10px 15px; border-radius: 5px;">Reset Password</a>
              <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
              <p>Thank you.</p>
            `,
          }) 
      return res.status(200).json({message:"Password reset link sent! Check your email."})   
      }
   } catch (error) {
      return res.status(500).json({message:"Internal server error"})
   }
})

userRouter.post('/verify-reset/:token',async(req,res) => {
   try {
      const {token} = req.params
      const {password} = req.body
      if(password.length < 5){
         return res
         .status(400)
         .json({message:"⚠️ Password length should be more than 5"})
      }

      const user = await User.findOne({
         resetPasswordToken: token,
         resetPasswordExpires: {$gt:Date.now()}
      })    
    
      if(!user){
         return res.status(404).json({message:"Invalid token"})   
      }
      else{
      const hashedPassword = await bcrypt.hash(password,10)
    
      await User.updateOne(
         { resetPasswordToken: token },
         {
          password:hashedPassword
         }
       );

      user.resetPasswordToken = undefined
      user.resetPasswordExpires = undefined
      user.save()

      return res.status(200).json({message:"Password changed successfully !"})
      }   
   } catch (error) {
   return res.status(500).json({message:"Internal server error"}) 
   }
})

userRouter.get('/userInfo',authenticateToken,async (req,res) => {
   try {
      const id = req.cookies.id;
      const data = await User.findById(id).select("-password")
      res.status(200).json(data)
      
   } catch (error) {
      return res.status(500).json({message:"Internal server error"})
   }
})

userRouter.put('/updateAddress',authenticateToken , async(req,res) => {
try {
   const {id} = req.headers
   const {address} = req.body
   await User.findByIdAndUpdate(id,{address: address})
   res.status(200).json({message:"address updated"})
} catch (error) {
   return res.status(500).json({message:"Internal server error"})
}
})

export default userRouter