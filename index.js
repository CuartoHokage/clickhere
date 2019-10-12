'use strict'

const mongoose= require('mongoose')
const app = require('./app')
const config= require('./config')
const nodemailer = require('nodemailer')  

// mongoose.connect(config.db, (err, res)=>{
// 	if (err) {
// 		return console.log(`Conecte la base de datos ${err}`)
// 	}
// 	console.log('Conexión a la base de datos Mongodb establecida')
// 	app.listen(config.port, ()=>{
// 		console.log(`Api Rest corriendo en el puerto ${config.port}`)
// 	})
// })

////// conexion a sql server



///
const mssql = require('mssql')


const config2 = {
    user: 'sa',
    password: 'Clickhere2018',
    server: '192.168.2.102', // You can use 'localhost\\instance' to connect to named instance
    database: 'click'
 /*
    options: {
        encrypt: true // Use this if you're on Windows Azure
	}
	*/
}

console.log("sdsd")
var connection = mssql.connect(config2, function(err, res){
	if(err){
		throw err;

	} else{
		console.log("conectado a la base de datos");
	}
});


// inicioobtencion de datos en un array de productos


var request =new mssql.Request();
//revisar https://www.youtube.com/watch?v=X2Stnj3eVls
//const result = await sql.query`select * from mytable where id = ${value}`


/*
request.query('select * FROM [click].[dbo].[MAE_PRODUCTO]', function(err, result){
  //console.log(result.recordset)
	if(err)
    console.log(err);
    
	var data= {};
	data= result.recordset;
	console.log(result.recordset)
	res.send(data);
	
});
*/

  

////fin obtencion de datos en un array de productos

/////////////////////////////////////TEDIOUS//////////////////////////////////////////////

var db = require("./controllers/dbController.js");
var TYPES = require("tedious").TYPES;

// QUERY
// Imagine we have a table called pokemon with 2 attributes: name and number
// We want to find a pokemon by number, using a select query
const getPokemon = (number) => {
  var params = [];
  var sql = "select * from pokemon where number = @number";
  // For each param do: db.buildParams(params, "name", TYPES.type, variable)
  db.buildParams(params, "number", TYPES.Int, number);
  db.query(params, sql, result => {
    console.log(result);
  });
}

// PROCEDURE
// The same as above but using instead a procedure called findPokemon(number)
const getPokemonProc = (number) => {
  var params = [];
  var sql = "findPokemon"; // instead of query selector use only procedure name
  // For each param do: db.buildParams(params, "name", TYPES.type, variable)
  db.buildParams(params, "number", TYPES.Int, number); // Params will be added automatically to the procedure exec
  db.proc(params, sql, result => { // Just need to change from query to proc
    console.log(result);
  });
}


getPokemon(132);
getPokemonProc(34);

module.exports = {
  getPokemon: getPokemon,
  getPokemonProc: getPokemonProc
}
/////////////////////////////////////TEDIOUS//////////////////////////////////////////////

app.listen(config.port, ()=>{
	console.log(`Api Rest corriendo en el puerto ${config.port}`)
})
