import express from 'express';
const notesRouter = express.Router();

import User from '../models/user.js'
import authenticateToken from '../utils/userAuth.js'
import Notes from '../models/notes.js'
import Contribute from '../models/contribute.js';

notesRouter.post('/add-contri',authenticateToken,async(req,res)=>{
    try{
       const contri = new Contribute({
        title:req.body.titlex,
        branch:req.body.branchx,
        semester:req.body.semesterx,
        subject:req.body.subjectx,
        message:req.body.messagex,
        email:req.body.emailx
    })
    await contri.save();
    res.status(200).json("Thank yo !")
    }
    catch(error){
     return res.status(500).json({message:"Internal server error"}) 
    }
}) 

notesRouter.post('/add-notes',authenticateToken, async(req,res) => {
try {
    const id = req.cookies.id
    const user = await User.findById(id)
    if(user.role !== 'admin'){
    return res.status(400).json({message:'NO ACCESS TO PERFORM THIS ACTION'})
    }
    const note = new Notes({
    url:req.body.url,
    dp:req.body.dp,
    title:req.body.title,
    branch:req.body.branch,
    author:req.body.author,
    subject:req.body.subject,
    semester:req.body.semester,
    desc:req.body.desc,
    })
    console.log(note)
    await note.save();
    res.status(200).json({message:"note stored !"})
} catch (error) {
   return res.status(500).json({message:"Internal server error"}) 
}
})

notesRouter.put('/update-note',authenticateToken, async(req,res) => {
    try {
    const {id} = req.headers
    const user = await User.findById(id)
    if(user.role !== 'admin'){
    return res.status(400).json({message:'NO ACCESS TO PERFORM THIS ACTION'})
    }
        const {noteid} = req.headers
        await Notes.findByIdAndUpdate(noteid , {
        url:req.body.url,
        title:req.body.title,
        semester:req.body.semester,
        author:req.body.author,
        price:req.body.price,
        desc:req.body.desc,
        language:req.body.language
        })

        res.status(200).json({message:"note updated !"})
    } catch (error) {
       return res.status(500).json({message:"Internal server error"}) 
    }
    })

notesRouter.delete("/delete-note",authenticateToken,async(req,res)=>{
    try {
        const {id} = req.headers
        const user = await User.findById(id)
        if(user.role !== 'admin'){
        return res.status(400).json({message:'NO ACCESS TO PERFORM THIS ACTION'})
        }
        const {noteid} = req.headers
        await Notes.findByIdAndDelete(noteid);
        return res.status(200).json({message:"Note deleted"})

    } catch (error) {
       return res.status(500).json({message:"Internal server error"}) 
} 
})

notesRouter.get('/get-all-notes',async(req,res) => {
    try {
        const notes = await Notes.find().sort({createdAt: -1})
        return res.json({
            status:"Success",
            data:notes
        })    
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})     
    }
})

notesRouter.get('/get-recent-notes',async(req,res) => {
    try {
        const notes = await Notes.find().sort({createdAt: -1}).limit(4)
        return res.json({
            status:"Success",
            data:notes
        })    
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})     
    }
})

notesRouter.get('/get-top-notes',async(req,res) => {
    try {
        const notes = await Notes.find().sort({likes:-1}).limit(3)
        return res.json({
            status:"Success",
            data:notes
        })    
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})     
    }
})

notesRouter.get('/get-note/:id',async(req,res) =>
    {
    try {
        const {id} = req.params;
        console.log(id)
        const note = await Notes.findById(id)
      
        return res.json({
            status:"success",
            data: note
        })    
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})      
    }
    })

notesRouter.get('/get-note/:branch/:semester',async(req, res) => {
    try{
    const {branch} = req.params
    const {semester} = req.params
    const notes= await Notes.find({branch , semester})
    return res.json({
        stats:"success",
        data:notes
    })
    }
    catch(error){
    return res.status(500).json({message:"Internal server error"})       
    }
})
export default notesRouter