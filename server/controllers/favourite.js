import express from 'express';
const favRouter = express.Router();

import User from '../models/user.js'
import Note from '../models/notes.js'
import authenticateToken from '../utils/userAuth.js'

favRouter.put('/put-fav',authenticateToken,async(req,res) => {
try {
    const {noteid} = req.headers
    const id = req.cookies.id
    const userData = await User.findById(id);
    const isNoteFavourite = userData.favourites.includes(noteid)
    const note = await Note.findById(noteid)

    if(isNoteFavourite)
        {
            await Note.findByIdAndUpdate(noteid,{likes:note.likes-1})
            return res.status(200).json({message:"Note already favourite"})
        }
   
    await Note.findByIdAndUpdate(noteid,{likes:note.likes+1})
    await User.findByIdAndUpdate(id,{$push:{favourites:noteid}})
    return res.status(200).json({message:"Note added to favourites"})
} catch (error) {
    return res.status(500).json({message:"Internal Server error"})
}
})

favRouter.put("/remove-from-fav/:noteid",authenticateToken,async (req,res) => {
    try {
        const {noteid} = req.params
        const id = req.cookies.id
        await User.findByIdAndUpdate(id,{
            $pull:{favourites:noteid}
        })
    
        return res.json({
            status:"Success",
            message:"Removed from favourites"
         })
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }    
    })

favRouter.get('/get-fav',authenticateToken,async (req,res) => {
    try {
        const id = req.cookies.id
        const userData = await User.findById(id).populate("favourites");
        const favouriteNotes = userData.favourites
        return res.json({
            status:"success",
            data:favouriteNotes
        })
        } catch (error) {
        return res.status(500).json({message:"Internal Server error"})
    }
})

export default favRouter