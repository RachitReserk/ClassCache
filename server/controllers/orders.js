import express from 'express'
const orderRouter = express.Router()
import authenticateToken from '../utils/userAuth.js'
import Order from '../models/order.js'
import Notes from '../models/notes.js'
import User from '../models/user.js'

orderRouter.post('/place-order',authenticateToken,async (req,res) => {
    try{
        const {id} = req.headers
        const {order} = req.body
        for(const orderData of order){
        const newOrder = new Order({user:id , note:orderData.id})
        const orderDataFromDb = await newOrder.save()
    
        await User.findByIdAndUpdate(id,{
            $push: {orders: orderDataFromDb._id}
        })
        await User.findByIdAndUpdate(id,{
            $pull:{cart: orderData._id}
        })
        }
        return res.json({
            status:"Success",
            message:"Order Placed Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message:"Internal Server Error"
        }) 
    }
    
})

orderRouter.get('/get-order-history', authenticateToken , async (req,res) => {
try {
    const {id} = req.headers
    const userData = await User.findById(id).populate({
        path:"orders",
        populate:{path:"note"}
    })
    const orderData = userData.orders.reverse();
    return res.json({
        status:"Success",
        data:orderData
    })
} catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
}
})

orderRouter.get('/get-all-order-history', authenticateToken , async (req,res) => {
    try {
        const userData = await User.find().populate({
        path:"note"
        })
        .populate({
        path:"user"
        })
        .sort({createdAt: -1})

        return res.json({
            status:"Success",
            data:userData
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
    })

orderRouter.put('/update-status/:id',authenticateToken , async(req,res) => {
try {
    const {id} = req.params
    await Order.findByIdAndUpdate(id,{status: req.body.status})
    return res.json({
        status:"Success",
        message:"Status Updated Successfully"
    })
} catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
}
})
export default orderRouter