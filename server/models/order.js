import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    note:{
        type:mongoose.Types.ObjectId,
        ref:"user" 
    },
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed","Out for delivery","Delivered","Canceled"]
    },
},{timestamps:true})

const Orders = mongoose.model("order",orderSchema)
export default Orders