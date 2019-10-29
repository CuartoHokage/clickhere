'use strict'
var os= require('os');
const fs= require('fs');
const path= require('path');
const sql= require ('mssql');

function getProductos(req, res){
	//new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
		new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN, i.IDENTIFICADOR FROM MAE_PRODUCTO p, IMAGENPROD i WHERE p.PRDIDENTI= i.IDPRODUCTO AND i.IDPRODUCTO=p.PRDIDENTI", (err, result) => {
	//handle err
		console.log(result.recordset[0]['IMAGEN'])
		var producto=0;
		for (producto; producto < result.recordset.length; producto++) {
			
			
		
		var originalBase64ImageStr = new Buffer(result.recordset[producto]['IMAGEN'])
		var decodedImage = new Buffer.from(originalBase64ImageStr , 'base64')
		//tratamiento de la imagen
		
		//fs.writeFileSync(target, recordSets.recordset[0].Image);
		//funciona en directorio erroneo
		//fs.writeFile('./public/imagenes/'+result.recordset[0]['PRDIDENTI']+'.jpg', decodedImage, function(err, data){
		fs.writeFile('./public/imagenes/'+result.recordset[producto]['PRDIDENTI']+'_'+result.recordset[producto]['IDENTIFICADOR']+'.jpg', decodedImage, function(err, data){
            if (err) throw err;
        console.log('It\'s saved!');
            console.log(data);
		});
	}
		var resultado=result.recordset;
		res.status(200).send({resultado})
	  });
}

module.exports={
	getProductos
}
