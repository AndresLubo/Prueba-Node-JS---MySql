const express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql');


const Connection = require('mysql/lib/Connection');
const ConnectionConfig = require('mysql/lib/ConnectionConfig');
app = express();

app.use(express.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prueba'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos con éxito...');
})

app.get('/', (req, res) => {
    read(connection, (result) => {
        res.json(result)
    })
})

app.get('/insert', (req, res) => {
    insert(connection, (result) => {
        res.json(result)
    })
})

app.get('/update', (req, res) => {
    update(connection, (result) => {
        res.json(result);
    })
})

app.get('/delete', (req, res) => {
    deleteUser(connection, (result) => {
        res.json(result);
    })
})


function read(connection, callback) {
    connection.query('SELECT * FROM user', function(err, result) {
        if (err) throw err;
        callback(result);
    });
}

function insert(connection, callback) {
    let insertQuery = 'insert into user (nombre, edad, email) values ("Maicky", 22, "MaickyPeinado@gmail,com");';
    connection.query(insertQuery, function(err, result) {
        if (err) throw err;
        callback(result)
    })
}

function update(connection, callback) {
    let insertQuery = 'update user set email = "AndresLubo@gmail.com" where id=1;'
    connection.query(insertQuery, function(err, result) {
        if (err) throw err;
        callback(result);
    })
}


function deleteUser(connection, callback) {
    let insertQuery = 'delete from user where id=6';
    connection.query(insertQuery, function(err, result) {
        if (err) throw err;
        callback(result);
    })
}




app.listen(3000, () => {
    console.log('Servidor corriendo...');
});