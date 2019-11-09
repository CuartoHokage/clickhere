'use strict'
var os = require('os');
const fs = require('fs');
const path = require('path');
const sql = require('mssql');
var localStorage = require('localStorage')

function getUsuarios(req, res) {
	//new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
	//new sql.Request().query("SELECT top 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {
	new sql.Request().query("select IDUSUARIO, ALIAS, CLAVE from USUARIO", (err, result) => {
		//handle err
		var producto = 0;
		var resultado = result.recordset;
		res.status(200).send({ resultado })
	});
}
function postUsuario(req, res){
    var usuario = req.body.usuario;

	new sql.Request().query("select IDUSUARIO, ALIAS, CLAVE from USUARIO where ALIAS='"+usuario+"'", (err, result) => {
		//handle err
		console.log(result.recordset)

		var usuario  =result.recordset
		//localStorage.setItem("producto", JSON.stringify(producto));

		//res.render('busqueda')
		res.render('index', { data:usuario })
		// res.render('busqueda',producto);

	});
}
module.exports = {
    getUsuarios,
    postUsuario
}