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
const config2 = {
    user: 'sa',
    password: 'clickhere2018',
    server: '192.168.2.102', // You can use 'localhost\\instance' to connect to named instance
    database: 'click',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
///
/*
const sql = require('mssql')


(async function () {
    try {
        let pool = await sql.connect(config2)
        let result1 = await pool.request()
            .input('input_parameter', sql.Int, value)
            .query('select * from mytable where id = @input_parameter')
            
        console.dir(result1)
    
        // Stored procedure
        
        let result2 = await pool.request()
            .input('input_parameter', sql.Int, value)
            .output('output_parameter', sql.VarChar(50))
            .execute('procedure_name')
        
        console.dir(result2)
    } catch (err) {
        // ... error checks
    }
})()
 
sql.on('error', err => {
    // ... error handler
})
//////
console.log("sdsd")

*/
app.listen(config.port, ()=>{
	console.log(`Api Rest corriendo en el puerto ${config.port}`)
})
