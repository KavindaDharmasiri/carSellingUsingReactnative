const express = require('express')
const mysql = require('mysql')
const db = require('../configs/db.configs')
const router = express.Router()

const connection = mysql.createConnection(db.database)

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
        var itemTableQuery = "CREATE TABLE IF NOT EXISTS vehicle (code VARCHAR(255) PRIMARY KEY, vehiclename VARCHAR(255), vehicleimg VARCHAR(255),detail VARCHAR(255))"
        connection.query(itemTableQuery, function (err, result) {

            if (result.warningCount === 0) {
                console.log("vehicle table created!");
            }
        })
    }
})

router.get('/', (req, res) => {
    var query = "SELECT * FROM vehicle";
    connection.query(query, (err, rows) => {
        if (err) console.log(err)
        res.send(rows)
    })
})

router.post('/', (req, res) => {
    const code = req.body.code
    const name = req.body.name
    const price = req.body.price

    var query = "INSERT INTO vehicle (code, vehiclename, vehicleimg,detail) VALUES (?, ?, ?, ?)";

    connection.query(query, [code, vehiclename, vehicleimg , detail], (err) => {
        if (err) {
            res.send({'message': 'duplicate entry'})
        } else {
            res.send({'message': 'vehicle created!'})
        }
    })

})

router.put('/', (req, res) => {
    const code = req.body.code
    const name = req.body.vehiclename
    const img = req.body.vehicleimg
    const detail = req.body.detail

    var query = "UPDATE vehicle SET vehiclename=?, vehicleimg=?, detail=? WHERE code=?";

    connection.query(query, [name, img,detail, code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'vehilce updated'})
        } else {
            res.send({'message': 'vehicle not found'})
        }
    })
})

router.delete('/', (req, res) => {
    const code = req.body.code

    var query = "DELETE FROM vehicle WHERE code=?";

    connection.query(query, [code], (err, rows) => {
        if (err) console.log(err);

        if (rows.affectedRows > 0) {
            res.send({'message': 'vehicle deleted'})
        } else {
            res.send({'message': 'vehicle not found'})
        }
    })
})

router.get('/getOne', (req, res) => {
    const code = req.body.code

    var query = "SELECT * from vehicle WHERE code=?";

    connection.query(query, [code], (err, row) => {
        if (err) console.log(err);

        res.send(row)
    })
})


module.exports = router