const boom = require('@hapi/boom');
const express = require('express');
const router = express.Router();

const note_service = require('../services/notes.services');
const service =new note_service();

router.post('/create', async (req, res, next) =>{
  try{
    const body = req.body;
    await service.createNote(body.nametag, body.message, body.timeZone);

    res.json({
      'message' : 'Note created',
      body
    });
  }catch(err){
    console.error(err)
    next(boom.badRequest());
  }
});

router.get('/read', async (req, res, next) =>{
  try{
    const {date_user, nametag} = req.headers;
    const notes = await service.getNotes(nametag, date_user);
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
    console.error(err)
    next(boom.badRequest());
  }
});

module.exports = router;
