const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'));
require('dotenv').config();
//npm install mysql 터미널에 mysql연결해주는 명령어 

app.get("/cart", (req, res) => {
    var mysql = require("mysql")
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "study",
    })

    connection.connect()

    connection.query(
        "select * from cart",
        function (err, rows, fields) {
            if (err) throw err
            console.log(rows)

            connection.end()
            res.send(rows)
        }
    )
})

//추가라우트
app.post("/cart", (req, res) => {
    
    console.log(req.query.name)

    var mysql = require("mysql")
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12345678",
        database: "study",
    })

    connection.connect()

    const name = req.query.name
    const price = req.query.price
    const amount = req.query.amount
    
    connection.query(
        `insert into cart(name,price,amount) values(?,?,?);`,
        [name, price, amount],
        function (err, rows, fields) {
            if (err) throw err
            console.log(rows)

            connection.end()
            res.send()
        }
    )
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



