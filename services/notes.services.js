const getConnection = require('../libs/postgres');

class  Notes{

  constructor(){}


  async getNotes(nametag){
    let notes = [];
    notes.push(... await this.getNotesAfterDay(nametag));
    notes.push(... await this.getNotesAfterWeek(nametag));
    notes.push(... await this.getNotesAfterMonth(nametag));
    notes.push(... await this.getNotesAfterYear(nametag));
    return notes;
  }

  async getNotesAfterDay(nametag){
    let currentDate  = new Date();
    const client = await getConnection();
    const rta = await client.query('SELECT message_note, create_date_user FROM public."NOTE" '
      + `WHERE nametag_user = '${nametag}' `
      +  'AND review_date IS NULL '
      +  `AND EXTRACT(DAY FROM create_date_user) = ${currentDate.getDate()-1} `
      +  `AND EXTRACT(MONTH FROM create_date_user) = ${currentDate.getMonth()+1} `
      +  `AND EXTRACT(YEAR FROM create_date_user) = ${currentDate.getFullYear()}`)

    return rta.rows;
  }

  async getNotesAfterWeek(nametag){
    let currentDate  = new Date();
    const client = await getConnection();
    const rta = await client.query('SELECT message_note, create_date_user FROM public."NOTE" '
      + `WHERE nametag_user = '${nametag}' `
      +  'AND review_date IS NULL '
      +  `AND EXTRACT(DAY FROM create_date_user) = ${currentDate.getDate()-7} `
      +  `AND EXTRACT(MONTH FROM create_date_user) = ${currentDate.getMonth()+1} `
      +  `AND EXTRACT(YEAR FROM create_date_user) = ${currentDate.getFullYear()}`)

    return rta.rows;
  }

  async getNotesAfterMonth(nametag){
    let currentDate  = new Date();
    const client = await getConnection();
    const rta = await client.query('SELECT message_note, create_date_user FROM public."NOTE" '
      + `WHERE nametag_user = '${nametag}' `
      +  'AND review_date IS NULL '
      +  `AND EXTRACT(DAY FROM create_date_user) = ${currentDate.getDate()} `
      +  `AND EXTRACT(MONTH FROM create_date_user) = ${currentDate.getMonth()} `
      +  `AND EXTRACT(YEAR FROM create_date_user) = ${currentDate.getFullYear()}`)

    return rta.rows;
  }

  async getNotesAfterYear(nametag){
    let currentDate  = new Date();
    const client = await getConnection();
    const rta = await client.query('SELECT message_note, create_date_user FROM public."NOTE" '
      + `WHERE nametag_user = '${nametag}' `
      +  'AND review_date IS NULL '
      +  `AND EXTRACT(DAY FROM create_date_user) = ${currentDate.getDate()} `
      +  `AND EXTRACT(MONTH FROM create_date_user) = ${currentDate.getMonth()+1} `
      +  `AND EXTRACT(YEAR FROM create_date_user) = ${currentDate.getFullYear()-1}`);
    return rta.rows;
  }

  async createNote(nametag_user, message){
    const client = await getConnection();
    const rta =
      await client.query (
        'INSERT INTO public."NOTE" (nametag_user, message_note) VALUES ($1, $2)',
        [nametag_user, message]
      );
    return rta.command;
  }

  async updateReviewDateNote(id_note){
    const client = await getConnection();
    const rta =
      await client.query('UPDATE public."NOTE"'
        + 'SET review_date=CURRENT_DATE'
        + `WHERE id_note=${id_note};`);
    return rta.command;
  }

}

module.exports = Notes;
