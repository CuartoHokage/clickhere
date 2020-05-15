'use strict'
var os = require('os');
const fs = require('fs');
const path = require('path');
const sql = require('mssql');
var localStorage = require('localStorage')

const request = require('request');

const options = {
    // Cambiar en el servidor
    // url: 'http://192.168.1.113:3002/api/generador',
    url: 'http://192.168.2.105:3002/api/generador',
    method: 'GET'
};
// Codigo nuevo
function getPortaStockIMAGENES_OBTENER(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {
    request(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(JSON.parse(body));
    });

}
// Consultar por categorias
// Generico
function generico(descripcion, categoria, marca) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like " + descripcion + " and PUBSTOCK >0 and PUBIDUBIC=12\
	union all\
	select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like " + categoria + "\
	union all\
	select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	where Marcas.NOMBRE like " + marca + " and PUBSTOCK >0 and PUBIDUBIC=12 ", (err, result) => {
        //handle err
        var producto = result.recordset

        //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 1;
            // producto[i].push({categorias: 'portatiles'})
        }

        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;
        return resultado;
        // 
        //
        // console.log(resultado)
    });
}

function getPortaStock(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

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
            // producto[i].push({categorias: 'portatiles'})
        }

        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;
        res.render("productos/portatiles", { data: resultado })
    });
}

function getPortaStockG(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {
    console.log(generico("'port.%'", "'port.%'", "'%port%'"));
    // res.render("productos/portatiles", { data: data })
}
// Jugando con app
function getPortaStocks(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

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
        }
        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;
        console.log(resultado)
            // 
            //
            // console.log(resultado)
        res.status(200).send(resultado)
    });
}

function getRoutersTplink(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

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

        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;

        res.render("productos/redes", { data: resultado })
    });
}

function getCases(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

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
        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;

        res.render("productos/case", { data: resultado })
    });
}

function getSeguridad(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

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
        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;

        res.render("productos/seguridadvideo", { data: resultado })
    });
}

function getImpresoras(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

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

        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;

        res.render("productos/impresoras", { data: resultado })
    });
}

function getRAM(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like '%DIMM%GB%' and PUBSTOCK >0 and PUBIDUBIC=12\
    union all\
    select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
    inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
    inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
    where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%DIMM%GB%'\
    union all\
    select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
    inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
    where Marcas.NOMBRE like '%DIMM%GB%' and PUBSTOCK >0 and PUBIDUBIC=12 ", (err, result) => {
        //handle err
        console.log(result.recordset)
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 7;
        }

        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;
        console.log(resultado)

        res.render("productos/memorias_ram", { data: resultado })
    });
}

function getAlmacenamiento(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where (PRDNOMBRE like '%ssd%sata%' or PRDNOMBRE like '%hdd%SATA%') and PUBSTOCK >0 and PUBIDUBIC=12\
    union all\
    select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
    inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
    inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
    where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%hdd%SATA%'\
    union all\
    select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
    inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
    where (Marcas.NOMBRE like 'ssd%' or PRDNOMBRE like '%hdd%SATA%') and PUBSTOCK >0 and PUBIDUBIC=12  ", (err, result) => {
        //handle err
        console.log(result.recordset)
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 8;
        }

        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;
        console.log(resultado)

        res.render("productos/almacenamiento", { data: resultado })
    });
}

function getProcesador(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like '%proc.%' and PUBSTOCK >0 and PUBIDUBIC=12\
    union all\
    select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
    inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
    inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
    where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%proc.%'\
    union all\
    select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
    inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
    where Marcas.NOMBRE like '%Intel%' and PUBSTOCK >0 and PUBIDUBIC=12   ", (err, result) => {
        //handle err
        console.log(result.recordset)
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 9;
        }

        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;
        console.log(resultado)

        res.render("productos/procesador", { data: resultado })
    });
}

function getMainboard(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where (PRDNOMBRE like '% MBO%' or PRDNOMBRE like 'MBO%' ) and PUBSTOCK >0 and PUBIDUBIC=12 \
    union all\
    select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
    inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
    inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
    where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%MBO%'\
    union all\
    select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
    inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
    where Marcas.NOMBRE like '%MBO%' and PUBSTOCK >0 and PUBIDUBIC=12  ", (err, result) => {
        //handle err
        console.log(result.recordset)
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 10;
        }

        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;
        console.log(resultado)

        res.render("productos/mainboard", { data: resultado })
    });
}

function getGrafica(req, res) {
    //new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
    //new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like 'T/VIDEO%' and PUBSTOCK >0 and PUBIDUBIC=12\
    union  all\
    select  p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
    inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
    inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
    where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%T/VIDEO%'\
    union all\
    select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
    INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
    inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
    where Marcas.NOMBRE like '%TARJETA DE VIDEO%' and PUBSTOCK >0 and PUBIDUBIC=12   ", (err, result) => {
        //handle err
        console.log(result.recordset)
        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));
        for (var i = 0; i < producto.length; i++) {
            if (producto[i].PUBSTOCK > 5) {
                producto[i].PUBSTOCK = "Más de 5";
            }
            producto[i].id_add_carrito = 11;
        }

        var hoy = new Date();
        var hora;
        hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        console.log(hora);
        var resultado = result.recordset;
        console.log(resultado)

        res.render("productos/tarjeta_video", { data: resultado })
    });
}

// Fin categorias
function getProductosCoincidencia(req, res) {
    var buscar = req.body.buscar;
    new sql.Request().query("select p.PRDIDENTI, p.PRDNOMBRE, s.PUBSTOCK from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join REL_PRODAGRUPACION a on p.PRDIDENTI=a.IDPRODUCTO\
	where PRDNOMBRE like '%" + buscar + "%' and PUBSTOCK >0", (err, result) => {
        //handle err
        console.log(result.recordset)
        var producto = 0;

    });
    return result.recordset;
}

function postProductosCoincidencia(req, res) {
    var buscar = req.body.buscar;

    var consultaCodigo = "";
    var buscar2;
    if (isNaN(buscar) == false) {
        // console.log(buscar)
        consultaCodigo = "union SELECT DISTINCt p.PRDIDENTI, p.PRDNOMBRE,p.PRDNOMBRE as categoria, r.PUBSTOCK,  ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP FROM MAE_PRODUCTO p\
		inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0 and p.PRDIDENTI=" + buscar + ""
    }
    if ((isNaN(buscar) == true)) {
        buscar2 = 5557555;
        console.log(buscar)
    } else {
        buscar2 = buscar;
        // console.log(buscar2)
    }
    new sql.Request().query("SELECT DISTINCt p.PRDIDENTI, p.PRDNOMBRE,p.PRDNOMBRE as categoria, r.PUBSTOCK,  ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP FROM MAE_PRODUCTO p\
	inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0 and p.PRDIDENTI=" + buscar2 + "", (err, result1) => {
        // console.log(result1.recordset.length)
        // console.log(buscar2)
        // console.log(result1.recordset)
        if (!err) {


            if (result1.recordset.length == 0) {
                new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like '%" + buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12\
	union all\
	select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%" + buscar + "%'\
	union all\
	select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	where Marcas.NOMBRE like '%" + buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12 " + consultaCodigo + "", (err, result) => {
                    //handle err
                    console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
                    console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
                    console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
                    console.log(result.recordset)

                    var producto = result.recordset
                        //localStorage.setItem("producto", JSON.stringify(producto));
                    for (var i = 0; i < producto.length; i++) {
                        if (producto[i].PUBSTOCK > 5) {
                            producto[i].PUBSTOCK = "Más de 5";
                        }
                        producto[i].id_add_carrito = 6;
                    }

                    var dictstring = JSON.stringify(producto, null, 4)

                    fs.writeFileSync("./public/buscar.json", dictstring);
                    // fs.writeFile("./public/buscar.json", dictstring, () => {});
                    res.render('productos/busqueda', { data: producto })
                        // res.render('busqueda',producto);
                });
            } else {
                console.log('gg')
                var producto = result1.recordset
                for (var i = 0; i < producto.length; i++) {

                    producto[i].id_add_carrito = 6;
                }
                var dictstring = JSON.stringify(producto, null, 4)

                fs.writeFile("./public/buscar.json", dictstring, () => {});
                res.render('productos/busqueda', { data: producto }, localStorage.getItem("buscar"))
            }
        } else {
            res.render('index', err)
        }
    });
}

function postProductosCoincidenciaadmin(req, res) {
    var buscar = req.body.buscar;
    var consultaCodigo = "";
    if (isNaN(buscar) == false) {
        consultaCodigo = "union SELECT DISTINCt p.PRDIDENTI, p.PRDNOMBRE,p.PRDNOMBRE as categoria, r.PUBSTOCK, ROUND(PRDPVP, 2, 0) as Precio_sin_IVA,  ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP FROM MAE_PRODUCTO p\
		inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0 and p.PRDIDENTI=" + buscar + ""
    }
    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND(PRDPVP, 2, 0) as Precio_sin_IVA, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like '%" + buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12\
	union all\
	select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND(PRDPVP, 2, 0) as Precio_sin_IVA , ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%" + buscar + "%'\
	union all\
	select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND(PRDPVP, 2, 0) as Precio_sin_IVA, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	where Marcas.NOMBRE like '%" + buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12 " + consultaCodigo + "", (err, result) => {
        //handle err
        console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
        console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
        console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
        console.log(result.recordset)

        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));

        //res.render('busqueda')
        res.render('productos/busqueda_admin', { data: producto })
            // res.render('busqueda',producto);

    });
}

function postPrductosCategoria(req, res) {
    var buscar = req.body.buscar;

    new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, s.PUBSTOCK from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like '%" + buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12", (err, result) => {
        //handle err
        // console.log(result.recordset)

        var producto = result.recordset
            //localStorage.setItem("producto", JSON.stringify(producto));

        //res.render('busqueda')
        res.render('busqueda_admin', { data: producto })
            // res.render('busqueda',producto);

    });
}

// OBTENER PRODUCTOS SIMPLES (borrar?)
function getProductosSimples(req, res) {
    var buscar = req.body.buscar;

    new sql.Request().query("SELECT DISTINCt p.PRDIDENTI, p.PRDNOMBRE,p.PRDNOMBRE as categoria, r.PUBSTOCK,  ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP FROM MAE_PRODUCTO p\
	inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0 and p.PRDIDENTI=" + buscar + "", (err, result) => {
        //handle err
        console.log(result.recordset)
        var producto = result.recordset;



        res.render('producto_simple', { data: producto })
    });

}
// Servir imágen servidor externo
function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './public/imagenes/' + imageFile;
    fs.exists(path_file, function(exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: 'No existe esa imagen' })
        }
    });
}
module.exports = {
    getPortaStock,
    getPortaStocks,
    getRoutersTplink,
    getCases,
    getSeguridad,
    getImpresoras,
    getRAM,
    getProcesador,
    getMainboard,
    getGrafica,
    getProductosCoincidencia,
    getAlmacenamiento,
    postProductosCoincidencia,
    postProductosCoincidenciaadmin,
    postPrductosCategoria,


    // Codigos nuevos
    // getPortaStockIMAGENES_OBTENER,
    getProductosSimples,
    getPortaStockIMAGENES_OBTENER,
    // Servir imágen servidor externo
    getImageFile
}