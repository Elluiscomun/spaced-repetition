const boom =  require('@hapi/boom');

function validatorHandler(schema,properties){
  return (req, res, next) => {
    const data = res[properties];
    const {error} = schema.validate(data);
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
