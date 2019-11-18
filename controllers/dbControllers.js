'use strict'
var os = require('os');
const fs = require('fs');
const path = require('path');
const sql = require('mssql');
var localStorage = require('localStorage')

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
		}
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES////////////////////////////////////
		// 	for (producto; producto < result.recordset.length; producto++) {



		// 	var originalBase64ImageStr = new Buffer(result.recordset[producto]['IMAGEN'])
		// 	var decodedImage = new Buffer.from(originalBase64ImageStr , 'base64')
		// 	//tratamiento de la imagen

		// 	//fs.writeFileSync(target, recordSets.recordset[0].Image);
		// 	//funciona en directorio erroneo
		// 	//fs.writeFile('./public/imagenes/'+result.recordset[0]['PRDIDENTI']+'.jpg', decodedImage, function(err, data){
		// 	fs.writeFile('./public/imagenes/'+result.recordset[producto]['PRDIDENTI']+'_'+result.recordset[producto]['IDENTIFICADOR']+'.jpg', decodedImage, function(err, data){
		//         if (err) throw err;
		//     console.log('It\'s saved!');
		//         console.log(data);
		// 	});
		// }
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES FINNN////////////////////////////////////
		var hoy = new Date();
		var hora;
		hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
		console.log(hora);
		var resultado = result.recordset;
		res.render("portatiles", { data: resultado })
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
		}
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES////////////////////////////////////
		// 	for (producto; producto < result.recordset.length; producto++) {



		// 	var originalBase64ImageStr = new Buffer(result.recordset[producto]['IMAGEN'])
		// 	var decodedImage = new Buffer.from(originalBase64ImageStr , 'base64')
		// 	//tratamiento de la imagen

		// 	//fs.writeFileSync(target, recordSets.recordset[0].Image);
		// 	//funciona en directorio erroneo
		// 	//fs.writeFile('./public/imagenes/'+result.recordset[0]['PRDIDENTI']+'.jpg', decodedImage, function(err, data){
		// 	fs.writeFile('./public/imagenes/'+result.recordset[producto]['PRDIDENTI']+'_'+result.recordset[producto]['IDENTIFICADOR']+'.jpg', decodedImage, function(err, data){
		//         if (err) throw err;
		//     console.log('It\'s saved!');
		//         console.log(data);
		// 	});
		// }
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES FINNN////////////////////////////////////
		var hoy = new Date();
		var hora;
		hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
		console.log(hora);
		var resultado = result.recordset;
		res.render("portatiles", { data: resultado })
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
		}
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES////////////////////////////////////
		// 	for (producto; producto < result.recordset.length; producto++) {



		// 	var originalBase64ImageStr = new Buffer(result.recordset[producto]['IMAGEN'])
		// 	var decodedImage = new Buffer.from(originalBase64ImageStr , 'base64')
		// 	//tratamiento de la imagen

		// 	//fs.writeFileSync(target, recordSets.recordset[0].Image);
		// 	//funciona en directorio erroneo
		// 	//fs.writeFile('./public/imagenes/'+result.recordset[0]['PRDIDENTI']+'.jpg', decodedImage, function(err, data){
		// 	fs.writeFile('./public/imagenes/'+result.recordset[producto]['PRDIDENTI']+'_'+result.recordset[producto]['IDENTIFICADOR']+'.jpg', decodedImage, function(err, data){
		//         if (err) throw err;
		//     console.log('It\'s saved!');
		//         console.log(data);
		// 	});
		// }
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES FINNN////////////////////////////////////
		var hoy = new Date();
		var hora;
		hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
		console.log(hora);
		var resultado = result.recordset;
		res.render("portatiles", { data: resultado })
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
		}
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES////////////////////////////////////
		// 	for (producto; producto < result.recordset.length; producto++) {



		// 	var originalBase64ImageStr = new Buffer(result.recordset[producto]['IMAGEN'])
		// 	var decodedImage = new Buffer.from(originalBase64ImageStr , 'base64')
		// 	//tratamiento de la imagen

		// 	//fs.writeFileSync(target, recordSets.recordset[0].Image);
		// 	//funciona en directorio erroneo
		// 	//fs.writeFile('./public/imagenes/'+result.recordset[0]['PRDIDENTI']+'.jpg', decodedImage, function(err, data){
		// 	fs.writeFile('./public/imagenes/'+result.recordset[producto]['PRDIDENTI']+'_'+result.recordset[producto]['IDENTIFICADOR']+'.jpg', decodedImage, function(err, data){
		//         if (err) throw err;
		//     console.log('It\'s saved!');
		//         console.log(data);
		// 	});
		// }
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES FINNN////////////////////////////////////
		var hoy = new Date();
		var hora;
		hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
		console.log(hora);
		var resultado = result.recordset;
		res.render("portatiles", { data: resultado })
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
		}
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES////////////////////////////////////
		// 	for (producto; producto < result.recordset.length; producto++) {



		// 	var originalBase64ImageStr = new Buffer(result.recordset[producto]['IMAGEN'])
		// 	var decodedImage = new Buffer.from(originalBase64ImageStr , 'base64')
		// 	//tratamiento de la imagen

		// 	//fs.writeFileSync(target, recordSets.recordset[0].Image);
		// 	//funciona en directorio erroneo
		// 	//fs.writeFile('./public/imagenes/'+result.recordset[0]['PRDIDENTI']+'.jpg', decodedImage, function(err, data){
		// 	fs.writeFile('./public/imagenes/'+result.recordset[producto]['PRDIDENTI']+'_'+result.recordset[producto]['IDENTIFICADOR']+'.jpg', decodedImage, function(err, data){
		//         if (err) throw err;
		//     console.log('It\'s saved!');
		//         console.log(data);
		// 	});
		// }
		//////////////////////////////OBTENER CONVERTIR Y CREAR IMAGENES FINNN////////////////////////////////////
		var hoy = new Date();
		var hora;
		hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
		console.log(hora);
		var resultado = result.recordset;
		res.render("portatiles", { data: resultado })
	});
}
function getProductosCoincidencia(req, res) {
	var buscar = req.body.buscar;
	new sql.Request().query("select p.PRDIDENTI, p.PRDNOMBRE, s.PUBSTOCK from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join REL_PRODAGRUPACION a on p.PRDIDENTI=a.IDPRODUCTO\
	where PRDNOMBRE like '%"+ buscar + "%' and PUBSTOCK >0", (err, result) => {
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
		consultaCodigo = "union SELECT DISTINCt p.PRDIDENTI, p.PRDNOMBRE,p.PRDNOMBRE as categoria, r.PUBSTOCK,  ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP FROM MAE_PRODUCTO p\
		inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0 and p.PRDIDENTI="+ buscar + ""
	}
	if (isNaN(buscar) == true) {
		buscar2 = 5557555;
	} else {
		buscar2 = buscar;
	}
	new sql.Request().query("SELECT DISTINCt p.PRDIDENTI, p.PRDNOMBRE,p.PRDNOMBRE as categoria, r.PUBSTOCK,  ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP FROM MAE_PRODUCTO p\
	inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0 and p.PRDIDENTI="+ buscar2 + "", (err, result1) => {
		console.log(result1.recordset.length)
		if (result1.recordset.length == 0) {
			new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like '%"+ buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12\
	union all\
	select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%"+ buscar + "%'\
	union all\
	select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	where Marcas.NOMBRE like '%"+ buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12 " + consultaCodigo + "", (err, result) => {
				//handle err
				console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
				console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
				console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
				// console.log(result.recordset)

				var producto = result.recordset
				//localStorage.setItem("producto", JSON.stringify(producto));
				for (var i = 0; i < producto.length; i++) {
					if (producto[i].PUBSTOCK > 5) {
						producto[i].PUBSTOCK = "Más de 5";
					}
				}
				//////CONTINUAR AQUI 15/11/2019
				// var seccion = producto.length;
				// var seccionN
				// var divisible = 0;
				// var productoSec = []
				// if (seccion<15) {
				// 	seccion=15;
				// }
				// do {
				// 	console.log('fdsf')
				// 	seccionN = seccion / 15;
				// 	if (Number.isInteger(seccionN)) {
				// 		divisible = 1;
				// 		console.log(seccionN)
				// 		var jsonSeccion = [];
				// 		var jsonseccionj=[];
				// 		for (var i = 0; i < seccionN; i++) {
				// 			jsonSeccion.push({})
				// 			if (producto.length<15) {
				// 				for(var j=0; j<producto.length; j++){
				// 					var jsoni= jsonSeccion;
				// 					jsoni.push(producto[j]);
				// 					console.log(j)
				// 					console.log(jsonSeccion)
				// 				}
				// 			} else {
				// 				for(var j=0; j<15; j++){
				// 					jsonSeccion.push(producto[j]);
				// 					console.log(j)
				// 					console.log(jsonSeccion)
				// 				}
				// 			}


				// 			console.log("seccion: " + i)


				// 		}
				// 	} else {
				// 		seccion = seccion + 1;

				// 	}
				// } while (divisible==0);




				//res.render('busqueda')
				res.render('busqueda', { data: producto })
				// res.render('busqueda',producto);
			});
		} else {
			var producto = result1.recordset
			//localStorage.setItem("producto", JSON.stringify(producto));

			//res.render('busqueda')
			res.render('busqueda', { data: producto })
		}
	});
}
function postProductosCoincidenciaadmin(req, res) {
	var buscar = req.body.buscar;
	var consultaCodigo = "";
	if (isNaN(buscar) == false) {
		consultaCodigo = "union SELECT DISTINCt p.PRDIDENTI, p.PRDNOMBRE,p.PRDNOMBRE as categoria, r.PUBSTOCK,  ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP FROM MAE_PRODUCTO p\
		inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0 and p.PRDIDENTI="+ buscar + ""
	}
	new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDNOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like '%"+ buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12\
	union all\
	select p.PRDIDENTI, p.PRDNOMBRE, a.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	inner join REL_PRODAGRUPACION ra on ra.IDPRODUCTO= p.PRDIDENTI\
	inner join AGRUPACION a on ra.IDGRUPO= a.IDGRUPO\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO and s.PRDCODIGO=p.PRDIDENTI\
	inner join MAE_UBICACION u on u.UBIIDENTI= s.PUBIDUBIC\
	where PUBSTOCK >0 and u.UBIIDENTI=12 and a.NOMBRE like '%"+ buscar + "%'\
	union all\
	select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, Marcas.NOMBRE as categoria, s.PUBSTOCK, ROUND((((PRDPVP * (select IMPPORCEN from CFG_IMPUESTOS where IMPIDENTI=1))/100)+ PRDPVP),2, 0) as PRDPVP from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join MARCAS on MARCAS.IDENTIFICADOR= IDMARCA\
	where Marcas.NOMBRE like '%"+ buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12 " + consultaCodigo + "", (err, result) => {
		//handle err
		console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
		console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
		console.log("///////////////////////////////////////////NUEVA CONSULTA/////////////////////////////////////////////////")
		console.log(result.recordset)

		var producto = result.recordset
		//localStorage.setItem("producto", JSON.stringify(producto));

		//res.render('busqueda')
		res.render('busqueda_admin', { data: producto })
		// res.render('busqueda',producto);

	});

}

function postPrductosCategoria(req, res) {
	var buscar = req.body.buscar;

	new sql.Request().query("select DISTINCt p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, s.PUBSTOCK from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	where PRDNOMBRE like '%"+ buscar + "%' and PUBSTOCK >0 and PUBIDUBIC=12", (err, result) => {
		//handle err
		console.log(result.recordset)

		var producto = result.recordset
		//localStorage.setItem("producto", JSON.stringify(producto));

		//res.render('busqueda')
		res.render('busqueda_admin', { data: producto })
		// res.render('busqueda',producto);

	});

}

module.exports = {
	getPortaStock,
	getRoutersTplink,
	getCases,
	getSeguridad,
	getImpresoras,	
	getProductosCoincidencia,
	postProductosCoincidencia,
	postProductosCoincidenciaadmin,
	postPrductosCategoria
}
