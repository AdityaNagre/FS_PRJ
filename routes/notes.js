const express = require('express');
const router=express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all notes using: GET | api/notes/fetchallnotes | Login Req
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
    const userid=req.id;
    const notes=await Notes.find({user: userid}) 
    res.json(notes)
    } catch (error) {
        return res.status(500).send("Internal Server Error")
      }
})

//ROUTE 2: Add a new note using: POST | api/notes/addnote | Login Req
router.post('/addnote',fetchuser,[
    body('title','Title must be atleast 2 characters').isLength({ min: 2 }),
    body('description','Description must be atleast 5 characters').isLength({ min: 5 })
    ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    const note=await Notes.create({
        user: req.id,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags
    })
    res.json(note)
    } catch (error) {
        return res.status(500).send("Internal Server Error")
    }
})

//ROUTE 3: Update a note using: PUT | api/notes/updatenote | Login Req
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const newnote={}
    if(req.body.title){newnote.title=req.body.title}
    if(req.body.description){newnote.description=req.body.description}
    if(req.body.tags){newnote.tags=req.body.tags}
    let note=await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.id){
        return res.status(401).send("Not Allowed")
    }
    try {
    note=await Notes.findByIdAndUpdate(req.params.id, {$set: newnote}, {new:true})
    res.json({note})
    } catch (error) {
        return res.status(500).send("Not Updated")
    }
})

//ROUTE 4: Delete a note using: DELETE | api/notes/deletenote | Login Req
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
    let note=await Notes.findById(req.params.id)
    } catch (error) {
        return res.status(404).send("Not Allowed")
    }
    if(!note){
        return res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.id){
        return res.status(401).send("Not Allowed")
    }
    try {
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({success: "Note Deleted", id: note.id})
    } catch (error) {
        return res.status(500).send("Not Updated")
    }
})

module.exports=router