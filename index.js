'use strict'

const app = require('./app')
const config = require('./config')
const nodemailer = require('nodemailer')
    //modulo para conectar con la base de datos
const sql = require('mssql')
    // Certificado
    // const https = require('https');
    // const fs = require('fs');
    // const options = {
    //     pfx: fs.readFileSync('C:/Users/Jaime Paz/Documents/certificado/certificados.pfx'),
    //     passphrase: '12qwaszx'
    // };


//Configuracion de la conexión
const config2 = {
    // Cambiar en el servidor
    user: 'sa',
    // database: 'click_new',
    // password: '12qwaszx',
    // server: '192.168.1.113', // You can use 'localhost\\instance' to connect to named instance
    database: 'click',
    password: 'Clickhere2018',
    server: '192.168.2.102', // You can use 'localhost\\instance' to connect to named instance

    pool: {
        max: 1000,
        min: 0,
        idleTimeoutMillis: 30000
    }

}

console.log("sdsd")
var connection = sql.connect(config2, function(err, res) {
    if (err) {
        throw err;

    } else {
        console.log("conectado a la base de datos");
        //Consulta de la base de datos https://riptutorial.com/es/node-js/example/30413/conectando-con-sql-via--mssql-npm-module
        /*
        new sql.Request().query("SELECT * FROM MAE_PRODUCTO WHERE PRDNOMBRE LIKE '%PREMIUM INK%'", (err, result) => {
          //handle err
          console.dir(result)
          // This example uses callbacks strategy for getting results.
        });
        */
    }
});
sql.on('error', err => {
    // ... error handler 
    console.log("Sql database connection error ", err);
})

app.listen(config.port, () => {
        console.log(`Api Rest corriendo en el puerto ${config.port}`)
    })
    // FIN DE LA VERSION 1.0 de CHPCECUADOR.com ESTABILIDAD.
    // VERSION ESTABLE Y FUNCIONANDO

// CErtificado
// https.createServer(options, app, console.log('ddd')).listen(3443);