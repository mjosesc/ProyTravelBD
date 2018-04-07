let conn=require('../connections/mysqlconnection');
let Destinos={};

// listado de Viajes
Destinos.fetchAll=(cb)=> {
    if (!conn) return cb("No se ha podido realizar conexión");
    const SQL = "SELECT * FROM destinos WHERE activo=1";
    conn.query(SQL, (error, destinos) => {
        console.log(destinos);
        if (error) return cb(error);
        else return cb(null, destinos);
    })
};

module.exports=Destinos;