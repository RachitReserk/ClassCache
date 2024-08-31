import express from 'express'
const cartRouter = express.Router()
import authenticateToken from '../utils/userAuth.js'
import User from '../models/user.js'

cartRouter.put("/add-to-cart",authenticateToken,async (req,res) => {
    try {
         const {noteid,id} = req.headers;
         const userData = await User.findById(id);
         const isNoteFavourite = userData.cart.includes(noteid)
         if(isNoteFavourite){
            return res.json(
                {
                    status:"Success",
                    message:"Note is already in cart"
                }
            )
         }
         await User.findByIdAndUpdate(id,{
            $push:{ cart:noteid}
         })

         return res.json({
            status:"Success",
            "message":"Note added to cart"
         })
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
})

cartRouter.put("/remove-from-cart/:noteid",authenticateToken,async (req,res) => {
try {
    const {noteid} = req.params
    const {id} = req.headers
    await User.findByIdAndUpdate(id,{
        $pull:{cart:noteid}
    })

    return res.json({
        status:"Success",
        message:"Removed from cart"
     })
} catch (error) {
    return res.status(500).json({message:"Internal Server Error"})
}    
})

cartRouter.get("/get-cart",authenticateToken,async(req,res) => {
    try {
        const {id} = req.headers
        const userData = await User.findById(id).populate("cart")
        const cart = userData.cart.reverse()
        return res.json({
            status:"success",
            data:cart
        })
        } catch (error) {
        return res.status(500).json({message:"Internal Server error"})
    }
})
export default cartRouter