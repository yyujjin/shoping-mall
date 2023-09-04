const express = require("express")
const app = express()
const port = 3000
app.use(express.static("public"))
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended:false}));
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

    connection.query("select * from cart", function (err, rows, fields) {
        if (err) throw err
        console.log(rows)

        connection.end()
        res.send(rows)
    })
})

// app.post("/test", (req, res) => {
//     console.log(req.body)
//     console.log(req.body.gender)
// })

//추가라우트
app.post("/cart", (req, res) => {
    console.log(req.query.name)

    var mysql = require("mysql")
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "study",
    })

    connection.connect()

    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const amount = req.body.amount

    connection.query(
        `insert into cart(id,name,price,amount) values(?,?,?,?);`,
        [id, name, price, amount],
        function (err, rows, fields) {
            if (err) throw err
            console.log(rows)

            connection.end()
            res.send()
        }
    )
})

//삭제라우트
app.delete("/cart", (req, res) => {
    var mysql = require("mysql")
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "study",
    })

    connection.connect()

    connection.query(
        `delete from cart where id = ?;`,
        [req.query.id],
        function (err, rows, fields) {
            if (err) throw err
            console.log(rows)

            connection.end()
            res.send()
        }
    )
})

//수정 라우트  모르겠음 /////////
app.patch("/cart", (req, res) => {
    console.log("hi")
    var mysql = require("mysql")
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "study",
    })
    const id = req.query.id
    const amount = req.query.amount
    const price = req.query.price
    connection.connect()

    connection.query(
        `update cart set amount = ? , price = ? where id=?`,
        [amount,price,id],
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
