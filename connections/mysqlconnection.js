const MYSQL=require('mysql');
const CONN=MYSQL.createConnection({
    host:'localhost',
    user:'root',
    //password:'root',
    password:'1234',
    database:'Actividad3'
})

module.exports=CONN;