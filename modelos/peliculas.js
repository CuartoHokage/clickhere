'use strict'
const mongoose= require('mongoose')
const Schema= mongoose.Schema
//comentario
const PeliculaSchema= Schema({
	name: String,
	picture: String,
	censura:{
		type: String, enum: ['Todo público', '12 años', '16 años', '18 años']
	},
	descripcion: String,
	fechaEstreno: String,
	fechaFinal: String,
	duracion: String,
	tiempoCartelera: String
})
module.exports= mongoose.model('Pelicula', PeliculaSchema)
