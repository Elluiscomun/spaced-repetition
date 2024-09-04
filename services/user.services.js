const getConnection = require('../libs/postgres');

class User{

  constructor(){}

  async register(nametag){
    const client = await getConnection();
    const rta = await client.query('INSERT INTO public."USER"('
      + 'rol_user, nametag_user, password_user, email_user) '
      + `VALUES ('user', '${nametag}', '${nametag}', '${nametag}');`);
    return rta;
  }
}

module.exports = User;
