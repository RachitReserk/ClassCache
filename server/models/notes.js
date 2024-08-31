import mongoose from 'mongoose'

const notesSchema = new mongoose.Schema({
  url:{
    type:String,
    required:true,
  },
  dp:{
  type:String,
  required:true
  },
  title:{
    type:String,
    required:true
  },
  semester:{
  type:String,
  required:true
  },
  branch:{
    type:String,
  },
  subject:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true,
  },
  price:{
    type:Number
  },
  desc:{
    type:String,
    required:true
  },
  language:{
    type:String,
  },
  sold:{
    type:Number,
    default:0
  },
  likes:{
    type:Number,
    default:0
  }
},{timestamps:true})

const Notes = mongoose.model("notes",notesSchema)
export default Notes