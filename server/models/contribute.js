import mongoose from 'mongoose'

const contributeSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    branch:{
        type:String,
    },
    semester:{
        type:String,
    },
    subject:{
        type:String,
    },
    message:{
        type:String,
    },
    email:{
        type:String,
    }
},{timestamps:true})

const Contribute = mongoose.model("contributions",contributeSchema)
export default Contribute