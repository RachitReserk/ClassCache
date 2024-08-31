import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/1326/1326390.png"
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    address: {
        type:String
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },
    favourites:[{
        type:mongoose.Types.ObjectId,
        ref:"notes"
    }],
    cart:[{
        type:mongoose.Types.ObjectId,
        ref:"notes"
    }],
    orders:[{
        type:mongoose.Types.ObjectId,
        ref:"order"
    }],
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date
},{timestamps:true});

userSchema.methods.generateVerificationToken = function() {
    this.verificationToken = crypto.randomBytes(20).toString('hex');
    this.verificationTokenExpires = Date.now() + 36000000; 
};

const User = mongoose.model("user",userSchema)
export default User