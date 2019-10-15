'use strict'
var os= require('os');
const fs= require('fs');
const path= require('path');
const sql= require ('mssql');

function getProductos(req, res){
	//new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
		new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP FROM MAE_PRODUCTO p where PRDCLASI3=1", (err, result) => {
	//handle err
		console.log(result.recordset[0]['IMAGEN'])
		//console.log(result.recordset[{IMAGEN}])
		var resultado=result.recordset;
		res.status(200).send({resultado})
		// This example uses callbacks strategy for getting results.vv
		//Convertir imagen varbinary
		/*
		if (fs.existsSync('./uploads/productos')) {
			console.log('The file exists.');
		  }else{
			  console.log('ddd')
		  }
		var originalBase64ImageStr = new Buffer(result.recordset[0]['IMAGEN']).toString('utf8');
		
		var decodedImage = new Buffer(originalBase64ImageStr , 'base64')
		console.log(decodedImage)
		fs.writeFile(result.recordset[0]['IMAGEN']+'.png', decodedImage, function(err, data){
		//fs.writeFile(process.cwd() +''+'\\'+'\\'+'uploads'+'\\'+'productos'+'\\'+''+result.recordset[0]['IMAGEN']+'.png', decodedImage, function(err, data){
		if (err) throw err;
		console.log('It\'s saved!');
			cb(data);
		});
*/
	  });
}

module.exports={
	getProductos
}
