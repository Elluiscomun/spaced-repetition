const {DateTime} = require('luxon');
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
    try{
      const rta = await client.query('SELECT message_note, create_date_user, id_note FROM public."NOTE" '
        + `WHERE nametag_user = '${nametag}' `
        +  'AND review_date IS NULL '
        +  `AND EXTRACT(DAY FROM create_date_user) = ${currentDate.getDate()-1} `
        +  `AND EXTRACT(MONTH FROM create_date_user) = ${currentDate.getMonth()+1} `
        +  `AND EXTRACT(YEAR FROM create_date_user) = ${currentDate.getFullYear()}`)

      return rta.rows;
    }finally{
      client.release();
    }
  }

  async getNotesAfterWeek(nametag){
    let currentDate  = new Date();
    currentDate.setDate(currentDate.getDate()-7);

    const client = await getConnection();
    try{
      const rta = await client.query('SELECT message_note, create_date_user, id_note FROM public."NOTE" '
        + `WHERE nametag_user = '${nametag}' `
        +  'AND review_date IS NULL '
        +  `AND EXTRACT(DAY FROM create_date_user) = ${currentDate.getDate()} `
        +  `AND EXTRACT(MONTH FROM create_date_user) = ${currentDate.getMonth()+1} `
        +  `AND EXTRACT(YEAR FROM create_date_user) = ${currentDate.getFullYear()}`)

      return rta.rows
    }finally{
      client.release()
    }
  }

  async getNotesAfterMonth(nametag){
    let currentDate  = new Date();
    const client = await getConnection();
    try{
      const rta = await client.query('SELECT message_note, create_date_user, id_note FROM public."NOTE" '
        + `WHERE nametag_user = '${nametag}' `
        +  'AND review_date IS NULL '
        +  `AND EXTRACT(DAY FROM create_date_user) = ${currentDate.getDate()} `
        +  `AND EXTRACT(MONTH FROM create_date_user) = ${currentDate.getMonth()} `
        +  `AND EXTRACT(YEAR FROM create_date_user) = ${currentDate.getFullYear()}`)

      return rta.rows;
    }finally{
      client.release();
    }
  }

  async getNotesAfterYear(nametag){
    let currentDate  = new Date();
    const client = await getConnection();
    try{
      const rta = await client.query('SELECT message_note, create_date_user, id_note FROM public."NOTE" '
        + `WHERE nametag_user = '${nametag}' `
        +  'AND review_date IS NULL '
        +  `AND EXTRACT(DAY FROM create_date_user) = ${currentDate.getDate()} `
        +  `AND EXTRACT(MONTH FROM create_date_user) = ${currentDate.getMonth()+1} `
        +  `AND EXTRACT(YEAR FROM create_date_user) = ${currentDate.getFullYear()-1}`);
      return rta.rows;
    }finally{
      client.release();
    }

  }

  async createNote(nametag_user, message, timeZone){
    const client = await getConnection();
    const nowInUserTimeZone = DateTime.now().setZone(timeZone);
    try{
      const rta =
      await client.query (
        'INSERT INTO public."NOTE" (nametag_user, message_note, create_date_user) VALUES ($1, $2, $3)',
        [nametag_user, message, nowInUserTimeZone]
      );
      return rta.command;
    }finally{
      client.release();
    }
  }

  async updateReviewDateNote(id_note){
    const client = await getConnection();
    try{
      const query = 'UPDATE public."NOTE"'
        + ' SET review_date=CURRENT_DATE'
        + ` WHERE id_note = $1 ;`;

      const values =[id_note];
      const rta = await client.query(query,values)
      return rta.command;
    }finally{
      client.release();
    }
  }

}

module.exports = Notes;
