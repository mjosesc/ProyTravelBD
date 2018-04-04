let conn=require('../connections/mysqlconnection');
let Users={};

// listado de Usuarios
Users.fetchAll=(cb)=>{
    if(!conn) return cb("No se ha podido realizar conexión");
    const SQL="Select * FROM usuarios";
    conn.query(SQL, (error,rows)=>{
        if(error) return cb(error);
        else return cb(null,rows);
    })
}
// Comprobacion de usuario y registro
Users.registro=function (usuario,cb) {

    if(!conn) return cb("Fallo al conectar a la BD");
    conn.query('SELECT * FROM usuarios WHERE usuario=?',[usuario.usuario],(error,result)=>{
        if(error) return cb(error);
        if (result != ''){
            return cb(null,1);
        } else {
            conn.query('SELECT * FROM usuarios WHERE email=?',[usuario.email],(error,result)=>{
                if(error) return cb(error);
                if (result != ''){
                    return cb(null,2);
                } else {
                    conn.query('INSERT INTO usuarios SET ?',[usuario],(error,result)=>{
                        if(error) return cb(error);
                        return cb(null,3);
                    })
                }
            })
        }
    })

}

// login de usuario

Users.login=function (usuario,cb) {
    if(!conn) return cb("Fallo al conectar a la BD");
    conn.query('SELECT * FROM usuarios WHERE usuario=? AND password=?',[usuario.usuario,usuario.password],(error,result)=>{
        if(error) return cb(error);
        if (result != ''){
            return cb(null,1);
        } else {
            return cb(null,2);
        }
    })
}



// registro de usuarios antes de comprobacion
// Users.registro= function (usuario,cb){
//     if(!conn) return cb("Fallo al conectar a la BD");
//     conn.query('INSERT INTO usuarios SET ?', [usuario],(error,result)=>{
//         if(error) return cb(error);
//         return cb(null,result);
//         })
// }

// para que sea accesible
module.exports=Users;