'use strict'
var os= require('os');
const fs= require('fs');
const path= require('path');
const Peliculas= require ('../modelos/peliculas');

function postBanner(req, res){
	console.log('Post /api/peliculas')
		var file_path= req.files.picture.path;
		console.log(req.files)
		console.log(os.platform())
		//separar toda la ruta para obtener solo el nombre del fichero
		if (os.platform()=='linux'){
			var file_split= file_path.split('\/');
		}
		if (os.platform()=='win32'){
			var file_split= file_path.split('\\');
		}
		var file_name= file_split[3];
		//separa extensión
		var exp_split= file_name.split('\.');
        var file_exp= exp_split[1];
}

function uploadImage(req, res){
	var file_name= 'No subido';
	console.log(req.files)
	if(req.files){
		var file_path= req.files.picture.path;
		//separar toda la ruta para obtener solo el nombre del fichero
		var file_split= file_path.split('\\');
		var file_name= file_split[3];
		//separa extensión
		var exp_split= file_name.split('\.');
		var file_exp= exp_split[1];
		if(file_exp=="png"|| file_exp=="jpg"|| file_exp=="gif"){
			res.status(200).send({message: 'Imagen subida'});
		}else{
			res.status(200).send({message: 'Extensión no válida'})
		}
	}else{
		res.status(200).send({message: 'No has subido imagen'})
	}
}

module.exports={
	postBanner,
	uploadImage
}
