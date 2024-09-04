const Joi = require('joi');

const message = Joi.string().min(2).max(30);
const create_date = Joi.date();
const id_user = Joi.string().min(5);

const createNote = Joi.object({
    message: message.required()
});

module.exports = { message }


