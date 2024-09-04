const boom = require('@hapi/boom');
const express = require('express');
const router = express.Router();

const note_service = require('../services/notes.services');
const service =new note_service();

router.post('/create', async (req, res, next) =>{
  try{
    const body = req.body;
    await service.createNote(body.nametag, body.message);

    res.json({
      'message' : 'Note created',
      body
    });
  }catch(err){
    next(boom.badRequest());
  }
});

router.get('/read', async (req, res, next) =>{
  try{
    const {nametag} = req.headers;
    const notes = await service.getNotes(nametag);
    res.json({
      notes
    });
  }catch(err){
    console.error(err)
    next(boom.badRequest());
  }
});

router.put('/reviewNote', async (req, res, next) =>{
  try{
    const body = req.body;
    await service.updateReviewDateNote(body.id_note);
    res.json({
      'message': 'Note updated'
    });
  }catch(err){
    next(boom.badRequest());
  }
});

module.exports = router;
