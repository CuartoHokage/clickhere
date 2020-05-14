'use strict'

const express = require('express');
const api = express.Router();
var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './public/uploads/productos' });
const mailControllers = require('../controllers/mailControllers');
const dbControllers = require('../controllers/dbControllers');
const edicionControllers = require('../controllers/edicionControllers');
const userControllers = require('../controllers/userControllers');
const Cart = require('../models/cart');
const sql = require('mssql');
const fs = require('fs');
//Cruds para peliculas

//rutas de páginas
// BUSQUEDAS
api.get('/verconcidencia', (req, res) => {
    res.render('busqueda');
});
api.post('/coincidenciaadmin', dbControllers.postProductosCoincidenciaadmin);
api.post('/coincidencia', dbControllers.postProductosCoincidencia);


api.get('/contacto', (req, res) => {
    res.render('contacto');
});

api.get('/mantenimiento', (req, res) => {
    res.render('mantenimiento');
});
api.get('/seguridad', (req, res) => {
    res.render('seguridad');
});
api.get('/acerca_de', (req, res) => {
    res.render('acerca_de');
});
api.get('/portafolio', (req, res) => {
    res.render('portafolio');
});
api.get('/construccion', (req, res) => {
    res.render('en_creacion');
});
api.get('/cotizacion', (req, res) => {
    res.render('cotizacion');
});

api.get('/carrito', (req, res) => {
    if (!req.session.cart) {
        return res.render('carrito', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('carrito', {
        products: cart.getItems(),
        totalPrice: cart.totalPrice
    });
});
/////

//////

api.post('/upload', (req, res) => {
    let EDFile = req.files.picture
    EDFile.mv(`./public/imagenes/banner3.png`, err => {
        if (err) return res.status(500).send({ message: err })
        res.status(200).render('index');
    })
})

api.post('/upload_banner', (req, res) => {
    let EDFile = req.files.picture;
    var id_imagen = req.body.seleccion;
    EDFile.mv('./public/imagenes/banner' + id_imagen + '.jpg', err => {
        if (err) return res.status(500).send({ message: err })
        res.status(200).render('admin');
    })
})
api.post('/upload_bannerPromo', (req, res) => {
    let EDFile = req.files.picture;
    var id_imagen = req.body.seleccion;
    EDFile.mv('./public/imagenes/bannerPromo' + id_imagen + '.jpg', err => {
        if (err) return res.status(500).send({ message: err })
        res.status(200).render('admin');
    })
})

api.post('/upload_promociones', (req, res) => {
    let EDFile = req.files.picture;

    EDFile.mv('./public/imagenes/promocion3.jpg', err => {
        if (err) return res.status(500).send({ message: err })
        res.status(200).render('admin');
    })
})
api.post('/upload_productos', (req, res) => {
    let EDFile = req.files.picture
    var id_imagen = req.body.id_imagen
        // console.log(req.files.picture.values)
        // console.log(id_imagen)
    EDFile.mv('./public/imagenes/' + id_imagen + '.png', err => {
        if (err) return res.status(500).send({ message: err })
        res.status(200).render('admin');
    })
})
api.post('/upload_servicios', (req, res) => {
    let EDFile = req.files.picture
    var id_imagen = req.body.id_imagen
        // console.log(req.files.picture.values)
        // console.log(id_imagen)
    EDFile.mv('./public/imagenes/' + id_imagen + '.jpg', err => {
        if (err) return res.status(500).send({ message: err })
        res.status(200).render('admin');
    })
})

api.post('/postmail_contacto', mailControllers.postMail2);
api.post('/postmail_cotizacion', mailControllers.postMail);
api.post('/postmail_ordeCompra', mailControllers.postMailOrdenCompra);


api.get('/portatiles', dbControllers.getPortaStock);
api.get('/portatiless', dbControllers.getPortaStocks);

api.get('/redes', dbControllers.getRoutersTplink);
api.get('/cases', dbControllers.getCases);
api.get('/seguridad-2', dbControllers.getSeguridad);
api.get('/impresoras', dbControllers.getImpresoras);
//api.get('/imagen',('./controllers/publick/img3.jpg.'));

//obtener usuarios
api.get('/getusuarios', userControllers.getUsuarios);
//Vista de inicio de sesion
api.get('/signin', (req, res) => {
    res.render('signin');
});
//administrador
api.get('/adminClickhere', (req, res) => {
    res.render('admin');
});
//Enviar usuario por post
api.post('/postsignin', userControllers.postUsuario);
module.exports = api

//funciones carrito
api.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(productId)
    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/api/carrito');
});

api.get('/removeALL', function(req, res, next) {

    req.session.cart = null;
    console.log('ddddddd')
    res.redirect('/api/carrito');
});

api.get('/add1/:id', function(req, res, next) {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	  INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	  where PRDNOMBRE like 'port.%' and PUBSTOCK >0 and PUBIDUBIC=12\
	  union all\
	  select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	  inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	  inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	  INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	  inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	  where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like 'port.%'\
	  union all\
	  select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	  INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	  inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	  where Marcas.NOMBRE like '%port%' and PUBSTOCK >0 and PUBIDUBIC=12 ", (err, result) => {
        //handle err
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 1;
        }

        var resultado = result.recordset;
        console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
            // console.log(resultado)
            // 
            //
        var productId = req.params.id;
        console.log(productId);
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        var product = resultado.filter(function(item) {

            return item.PRDIDENTI == productId;
        });
        console.log(product[0])
        cart.add(product[0], productId);
        req.session.cart = cart;
        res.redirect('/api/portatiles');
    });


});


api.get('/add2/:id', function(req, res, next) {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where (PRDNOMBRE like '%nexxt%' or PRDNOMBRE like '%tplink%' or PRDNOMBRE like '%router%' or PRDNOMBRE like '%switch%') and PUBSTOCK >0 and PUBIDUBIC=12\
	union all\
	select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%tplink%'\
	union all\
	select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	where Marcas.NOMBRE like '%tplink%' and PUBSTOCK >0 and PUBIDUBIC=12 ", (err, result) => {
        //handle err
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 2;
        }

        var resultado = result.recordset;
        console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
            // console.log(resultado)
            // 
            //
        var productId = req.params.id;
        console.log(productId);
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        var product = resultado.filter(function(item) {

            return item.PRDIDENTI == productId;
        });
        console.log(product[0])
        cart.add(product[0], productId);
        req.session.cart = cart;
        res.redirect('/api/redes');
    });


});

api.get('/add3/:id', function(req, res, next) {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where (PRDNOMBRE like '%corsair%' or PRDNOMBRE like '%case combo%' or PRDNOMBRE like '%case spitze%') and PUBSTOCK >0 and PUBIDUBIC=12\
	union all\
	select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%case%'\
	union all\
	select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	where Marcas.NOMBRE like '%corsair%' and PUBSTOCK >0 and PUBIDUBIC=12 ", (err, result) => {
        //handle err
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 3;
        }

        var resultado = result.recordset;
        console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
            // console.log(resultado)
            // 
            //
        var productId = req.params.id;
        console.log(productId);
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        var product = resultado.filter(function(item) {

            return item.PRDIDENTI == productId;
        });
        console.log(product[0])
        cart.add(product[0], productId);
        req.session.cart = cart;
        res.redirect('/api/cases');
    });


});

api.get('/add4/:id', function(req, res, next) {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where (PRDNOMBRE like '%HIKVISION%' or PRDNOMBRE like '%DVR%' or PRDNOMBRE like '%CAMARA VIGIL.%') and PUBSTOCK >0 and PUBIDUBIC=12\
	union all\
	select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%seguridad%'\
	union all\
	select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	where Marcas.NOMBRE like '%corsair%' and PUBSTOCK >0 and PUBIDUBIC=12 ", (err, result) => {
        //handle err
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 4;
        }

        var resultado = result.recordset;
        console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
            // console.log(resultado)
            // 
            //
        var productId = req.params.id;
        console.log(productId);
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        var product = resultado.filter(function(item) {

            return item.PRDIDENTI == productId;
        });
        console.log(product[0])
        cart.add(product[0], productId);
        req.session.cart = cart;
        res.redirect('/api/seguridad-2');
    });


});
api.get('/add5/:id', function(req, res, next) {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where (PRDNOMBRE like 'imp MULTIF%') and PUBSTOCK >0 and PUBIDUBIC=12\
	union all\
	select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%impresora%'\
	union all\
	select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	where Marcas.NOMBRE like '%impresora%' and PUBSTOCK >0 and PUBIDUBIC=12 ", (err, result) => {
        //handle err
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 5;
        }

        var resultado = result.recordset;
        console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
            // console.log(resultado)
            // 
            //
        var productId = req.params.id;
        console.log(productId);
        var cart = new Cart(req.session.cart ? req.session.cart : {});
        var product = resultado.filter(function(item) {

            return item.PRDIDENTI == productId;
        });
        console.log(product[0])
        cart.add(product[0], productId);
        req.session.cart = cart;
        res.redirect('/api/impresoras');
    });


});


api.get('/add6/:id', function(req, res, next) {
    var products = JSON.parse(fs.readFileSync('./public/buscar.json'));
    var productId = req.params.id;
    console.log(productId);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    var product = products.filter(function(item) {
        item.id_add_carrito = 6;
        return item.PRDIDENTI == productId;
    });
    console.log(product[0])
    cart.add(product[0], productId);
    req.session.cart = cart;
    res.redirect('/');
});

// api.get('/generador', dbControllers.getPortaStockIMAGENES_OBTENER);


api.get('/producto-single/:add/:id', function(req, res) {
    var buscar = req.params.id;
    var add = req.params.add;

    new sql.Request().query("SELECT DISTINCt p.PRDIDENTI, p.PRDNOMBRE,p.PRDNOMBRE as categoria, r.PUBSTOCK,  ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP FROM MAE_PRODUCTO p\
	inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0 and p.PRDIDENTI=" + buscar + "", (err, result) => {
        //handle err
        var producto = result.recordset[0];
        var bandera = 0
        var count = 0;
        var contador = [];
        // producto.valores = count;

        do {
            var instruccionNombreImagen = './public/imagenes/' + producto.PRDIDENTI + '_' + count + '.png';

            if (count == 0) {
                count = count + 1;
                contador.push(count)

            } else {
                count = count + 1
                if (fs.existsSync(instruccionNombreImagen)) {
                    contador.push(count)
                    producto.contador = contador;

                } else {
                    bandera = 1;
                    contador.pop();
                }
            }

        } while (bandera == 0)
        console.log(producto)
        producto.id_add_carrito = add;
        res.render('producto_simple', { data: producto })
    });

});
// Servir imágen servidor externo
api.get('/generador', dbControllers.getPortaStockIMAGENES_OBTENER)


// Mostrar imagen de producto puro
api.get('/get-image/:imageFile', dbControllers.getImageFile);