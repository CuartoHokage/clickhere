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


// inicioobtencion de datos en un array de productos

/*
var request =new mssl.Request();
//revisar https://www.youtube.com/watch?v=X2Stnj3eVls
request.query('SELECT * from dbo.MAE_PRODUCTO', function(err, result){
	//if(err)
		//return next(err);
	var data= {};
	data= result.recordset;
	console.log(data)
	res.send(data);
	
});
*/

////fin obtencion de datos en un array de productos



//FUNCIONA REACTIVAR CUANDO SE USE ENVIO DE MAILS/
//Creamos el objeto de transporte  https://cursos.mejorcodigo.net/article/enviar-correo-electronico-con-nodejs-17
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jaime.paz.mero@gmail.com',
    pass: 'naruto2014'
  }
});

var mensaje = "Hola desde nodejs...";

var mailOptions = {
  from: 'jaime.paz.mero@gmail.com',
  to: 'jaime199505@hotmail.com',
  subject: 'Asunto Del Correo',
  text: mensaje
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email enviado: ' + info.response);
  }
});
//FUNCIONA REACTIVAR CUANDO SE USE/

app.listen(config.port, ()=>{
	console.log(`Api Rest corriendo en el puerto ${config.port}`)
})
