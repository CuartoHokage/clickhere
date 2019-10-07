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
app.listen(config.port, ()=>{
	console.log(`Api Rest corriendo en el puerto ${config.port}`)
})