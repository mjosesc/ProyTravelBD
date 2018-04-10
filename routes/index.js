var express = require('express');
var router = express.Router();
var userModel=require('../models/userModel');
var destinosModel=require('../models/destinosModel');

// Destinos en homepage
router.get('/',(req,res,next)=>{
    destinosModel.fetchActivo((error,destinos)=>{
        if (error) return res.status(500).json(error);
        res.render('home',{
            title: "travels",
            layout: "layout",
            isLoged: req.session.isLoged,
            isAdmin: req.session.isAdmin,
            user:req.session.username,
            destinos
        })}
    })
);

router.get('/login', function(req, res, next) {
    res.render('login',
        {
            title: 'Iniciar Sesion',
            layout: 'layout2'
        });
});

router.get('/registro', function(req, res, next) {
    res.render('registro',
        {
            title: 'Registro de Usuario',
            layout: 'layout2'
        });
});

// Funciones de administrador

// Mostrar destinos
router.get('/admin/destinos', function(req, res, next) {
    destinosModel.fetchAll((error,destinos)=>{
        if(error) return res.status(500).json(error);
    else{
        let isAdmin=req.session.isAdmin;
        if(req.session.isAdmin==1){
            res.render('panelDestinos',{
                title:"Gestión de destinos",
                layout:"layout2",
                isLoged : req.session.isLoged,
                isAdmin : req.session.isAdmin,
                user : req.session.username,
                destinos
            })
        }
        else{
            res.redirect('/');
        }
    }
}
});

//Destinos activos
router.get('/admin/destinos/active/:id', function (req,res,next) {
    destinosModel.activoUpdate(req.params.id, (error,dest)=>{
        if(error) res.status(500).json(error);
    else{
        res.redirect('/admin/destinos');
    }
}
});

//Borrar destino
router.get('/admin/destinos/delete/:id', function (req,res,next) {
    destinosModel.destinoDelete(req.params.id,(error,dest)=>{
        if(error) res.status(500).json(error);
else{
        res.redirect('/admin/destinos');
    }
}
});

//Creacion de destinos
router.post('/admin/destinos/create', function (req,res,next) {
    let destino={
        viaje:req.body.viaje,
        precio:req.body.precio,
        fechaIda:req.body.fecha_sal,
        fechaVuelta:req.body.fecha_vuel,
        descripcion:req.body.descripcion,
        imagen:req.body.imagen,
        activo:req.body.activo
    }
    destinosModel.destinoCreate(destino,(error,dest)=>{
        if(error) res.status(500).json(error);
    else{
        res.redirect('/admin/destinos');
    }
}
});


router.get('/userlist', (req,res,next)=>{
    userModel.fetchAll((error,users)=>{
        if(error) return res.status(500).json(error);
        res.render('user-list',{
            title:"Listado de Usuarios",
            layout:"layout2",
            users
        })
    })
});


router.post('/loginook', function (req,res) {
    let Usuario={
        usuario:req.body.usuario,
        password:req.body.password
    };

    userModel.login(Usuario,function (error,result) {
        if(error) res.status(500).json(error);

        switch (result) {
            case 2:
                res.render('login', {
                    title: "Usuario erroneo",
                    layout: 'layout2',
                    errorLogin: true
                })
                break;
            case 1:
                if(Usuario.usuario=='admin'{
                    req.session.username = "Admin";
                    req.session.isLoged = 1;
                    req.session.isAdmin = 1;
                }
                else{
                    req.session.username=Usuario.usuario;
                    req.session.isLoged=1;
                    req.session.isAdmin=0;
                }
                res.redirect('/');
                break;
        }
    })
});

/*
router.get('/admindestinos', function(req, res, next) {
    res.render('adminview',
        {
            title: 'Administración Destinos',
            layout: 'layout2',
        });
});
*/

router.get('/destroy',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/')
});


router.post('/registrook', function (req, res) {
    let Usuario={
        usuario:req.body.usuario,
        email:req.body.email,
        password:req.body.password
    }
    userModel.registro(Usuario,function (error,result) {
        if(error) res.status(500).json(error);
        switch (result){
            case 1:
                res.render('registro',{
                    title:"Usuario existente",
                    layout:'layout2',
                    errorUsuario:true
                })
                break;
            case 2:
                res.render('registro',{
                    title:"Email existente",
                    layout:'layout2',
                    errorEmail:true
                })
                break;
            case 3:
                res.render('login',{
                    title:"Registro correcto",
                    layout:'layout2',
                    correcto:true
                })
                break;
        }
    })
});

/*
router.get('/*', function(req, res, next) {
    res.render('error404',
        {
            title: 'error',
            layout: 'layout2',
        });
})
*/
module.exports = router;
