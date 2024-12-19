const {DateTime} = require('luxon');
const getConnection = require('../libs/postgres');

class  Notes{

  constructor(){}


  async getNotes(nametag, date_user){
    const day = new Date(date_user)

    let notes = [];
    notes.push(... await this.getNotesAfterDay(nametag, day));
    notes.push(... await this.getNotesAfterWeek(nametag, day));
    notes.push(... await this.getNotesAfterMonth(nametag, day));
    notes.push(... await this.getNotesAfterYear(nametag, day));
    return notes;
  }

  async getNotesAfterDay(nametag, day){
    let currentDate  = day;
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

  async getNotesAfterWeek(nametag, day){
    let currentDate  = day;
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

  async getNotesAfterMonth(nametag, day){
    let currentDate  = day;
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

  async getNotesAfterYear(nametag, day){
    let currentDate  = day;
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
