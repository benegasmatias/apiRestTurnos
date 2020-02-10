const mysql = require('mysql');
//configuracion de la bbd
const mysqlConnection = mysql.createConnection({
    host:'db4free.net',
    user:'benegas',
    password:'Mattias37',
    database: 'gestionturnos',
    multipleStatements:true
})

//muestra el err si no se conecta
mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return
    }else{
        console.log('Base de Datos Conectada..');
    }

});

//exporta la coneccion 
module.exports = mysqlConnection;