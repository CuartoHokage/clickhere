'use strict'
var os= require('os');
const fs= require('fs');
const path= require('path');
const sql= require ('mssql');

function getProductos(req, res){
	//new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM IMAGENPROD i, MAE_PRODUCTO p	WHERE p.PRDIDENTI= i.IDENTIFICADOR ", (err, result) => {
		new sql.Request().query("SELECT p.PRDIDENTI, p.PRDNOMBRE, p.PRDPVP, i.IMAGEN FROM MAE_PRODUCTO p INNER JOIN IMAGENPROD i ON p.PRDIDENTI= i.IDPRODUCTO where p.PRDIDENTI= 14491", (err, result) => {
	//handle err
		console.log(result.recordset[0]['IMAGEN'])
		var originalBase64ImageStr = new Buffer(result.recordset[0]['IMAGEN']).toString('utf8');
		var decodedImage = new Buffer(originalBase64ImageStr , 'base64')
		//tratamiento de la imagen
		
		//fs.writeFileSync(target, recordSets.recordset[0].Image);
		fs.writeFile(__dirname+'/publick/img3.png', decodedImage, function(err, data){
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
