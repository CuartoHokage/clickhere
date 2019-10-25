'use strict'
var os= require('os');
const fs= require('fs');
const path= require('path');
const sql= require ('mssql');

function getProductos(req, res){
	//new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
		new sql.Request().query("SELECT TOP 5 p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM MAE_PRODUCTO p INNER JOIN IMAGENPROD i ON p.PRDIDENTI= i.IDPRODUCTO", (err, result) => {
	//handle err
		console.log(result.recordset[0]['IMAGEN'])
		var originalBase64ImageStr = new Buffer(result.recordset[0]['IMAGEN'])
		var decodedImage = new Buffer.from(originalBase64ImageStr , 'base64')
		//tratamiento de la imagen
		
		//fs.writeFileSync(target, recordSets.recordset[0].Image);
		//funciona en directorio erroneo
		
		fs.writeFile('./public/imagenes/'+result.recordset[0]['PRDIDENTI']+'.jpg', decodedImage, function(err, data){
            if (err) throw err;
        console.log('It\'s saved!');
            console.log(data);
		});
		
		var resultado=result.recordset;
		res.status(200).send({resultado})
	  });
}

module.exports={
	getProductos
}
