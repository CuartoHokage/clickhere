'use strict'
var os = require('os');
const fs = require('fs');
const path = require('path');
const sql = require('mssql');

function getProductos(req, res) {
	//new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
	//new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {
	new sql.Request().query("  SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, r.PUBSTOCK FROM MAE_PRODUCTO p inner join REL_PRODUBIC r on r.PRDCODIGO=p.PRDIDENTI where PUBIDUBIC=12 and PUBSTOCK>0 and p.PRDNOMBRE LIKE 'port%'		", (err, result) => {
		//handle err
		console.log(result.recordset[0]['IMAGEN'])
		var producto = 0;
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
		res.status(200).send({ resultado })
	});
}

function getProductosCoincidencia(req, res) {
	var buscar= req.buscar;
	new sql.Request().query("select p.PRDIDENTI, p.PRDNOMBRE, s.PUBSTOCK from MAE_PRODUCTO p\
	INNER join REL_PRODUBIC s on p.PRDIDENTI= s.PRDCODIGO\
	inner join REL_PRODAGRUPACION a on p.PRDIDENTI=a.IDPRODUCTO\
	where PRDNOMBRE like '%"+buscar+"%' and PUBSTOCK >0", (err, result) => {
		//handle err
		console.log(result.recordset)
		var producto = 0;
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
	});
}

module.exports = {
	getProductos,
	getProductosCoincidencia
}
