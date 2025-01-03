import express from "express";
import mysql from "mysql";
import "dotenv/config.js";


const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER, //"root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB //"test"
});

app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello, this is the backend!");
});

app.get("/books", (req, res) => {
    const queryAllBooks = "SELECT * FROM books";
    db.query(queryAllBooks, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.post("/books", (req, res) => {
    const queryCreateNewBook = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
    const values = [
        req.body.title, 
        req.body.desc, 
        req.body.cover
    ];

    db.query(queryCreateNewBook, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been changed successfully");
    })
})

app.listen(8800, () => {
    console.log("Connected to backend")
});