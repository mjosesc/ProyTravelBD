var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json(req.session || "Sesión no disponible");
});

router.get('/create', function(req,res,next) {
  req.session.username="mjosesc";
  req.session.isAdmin=1;
  res.redirect('/admin');
});

router.get('/remove',function(req,res,next) {
    req.session.username=null;
res.redirect('/admin');
});

router.get('/destroy',function(req,res,next){
    req.session.destroy();
res.redirect('/admin');
});

router.get('/privada',function(req,res,next){
    if(req.session.isAdmin==1)res.status(200).send("Conectado");
    else res.redirect('/admin');
});


module.exports = router;
