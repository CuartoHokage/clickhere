'use strict'
var os= require('os');
const fs= require('fs');
const path= require('path');
const sql= require ('mssql');

function getProductos(req, res){
	new sql.Request().query("SELECT * FROM MAE_PRODUCTO WHERE PRDNOMBRE LIKE '%PREMIUM INK%'", (err, result) => {
		//handle err
		console.log(result)
		res.status(200).send({result})
		// This example uses callbacks strategy for getting results.vv
	  });
}

module.exports={
	getProductos
}
