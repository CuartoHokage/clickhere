'use strict'

const mongoose= require('mongoose')
const app = require('./app')
const config= require('./config')

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
const mssl = require('mssql')


const config2 = {
    user: 'sa',
    password: 'Clickhere2018',
    server: '192.168.2.102', // You can use 'localhost\\instance' to connect to named instance
    database: 'click',
 /*
    options: {
        encrypt: true // Use this if you're on Windows Azure
	}
	*/
}

console.log("sdsd")
var connection = mssl.connect(config2, function(err, res){
	if(err){
		throw err;

	} else{
		console.log("conectado a la base de datos");
	}
});
//
var request =new mssl.Request();
request//revisar https://www.youtube.com/watch?v=X2Stnj3eVls
//
app.listen(config.port, ()=>{
	console.log(`Api Rest corriendo en el puerto ${config.port}`)
})
