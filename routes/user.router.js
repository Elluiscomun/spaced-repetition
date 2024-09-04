const boom = require('@hapi/boom');
const express = require('express');
const router = express.Router();

const user_service = require('../services/user.services');
const service = new user_service();

router.post('/register', async (req, res, next) =>{
  try{
    const body = req.body;
    await service.register(body.nametag);
    res.json({
      "message": "User created",
      body
    });
  }catch(err){
    next(boom.badRequest());
  }
})

module.exports = router;
