const express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    dorenv = require('dotenv').config(),
    port = process.env.PORT,

    app = express();

app.use(express.json());

const objectConnection = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}
const connection = mysql.createConnection(objectConnection);
const pool = mysql.createPool(objectConnection);


connection.connect(err => {
    if (err) throw err;
    console.log(`Conectado a la base de datos: ${process.env.DATABASE}`);
});

app.get('/', (req, res) => {
    getAll(pool, function(result) {
        res.json(result)
    })
})


app.get('/insert', (req, res) => {
    insertPelicula(pool, function(result) {
        res.json(result);
    })
})

function getAll(pool, callback) {
    let query = 'select * from pelicula;';
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(query, function(err, result) {
            if (err) throw err;
            callback(result);

            connection.release();
        })
    })


}

function insertPelicula(pool, callback) {
    let query = 'insert into pelicula (nombre, categoria, anio, director) values("Prueba4", "Prueba2" , 2022, "Andres Lubo");'

    pool.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query(query, function(err, result) {
            if (err) throw err;
            callback(result)

            connection.release();
        })
    })

}


app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Servidor corriendo en el puerto ${port}`);
})