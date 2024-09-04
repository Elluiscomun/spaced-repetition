const express = require('express');
const notes_routes = require('./notes.router');
const user_router = require('./user.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/note', notes_routes);
  router.use('/user', user_router);
}

module.exports = routerApi;
