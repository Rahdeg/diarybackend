const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Diamond2022@',
    database:'ram_contact'
})

app.get('/api/get',(req,res)=>{
const sqlget = `SELECT * FROM contact_db`;
db.query(sqlget,(err,result)=>{
    res.send(result);
})
})

app.post('/api/post',(req,res)=>{
    const {name,email,contact}= req.body;
    const sqlPost= `INSERT INTO contact_db(name,email,contact) VALUE (?,?,?)`
    db.query(sqlPost,[name,email,contact],(error,result)=>{
        if (error) {
           console.log(error); 
        }
    })
})

app.delete('/api/remove/:id',(req,res)=>{
    const {id}= req.params;
    const sqlremove = `DELETE FROM contact_db WHERE id=?`;
    db.query(sqlremove,id,(err,result)=>{
        if (err) {
            console.log(err)
        }
    })
    })
    app.get('/api/get/:id',(req,res)=>{
        const {id}= req.params;
        const sqlget = `SELECT * FROM contact_db WHERE id=?`;
        db.query(sqlget,id,(err,result)=>{
            if (err) {
                console.log(err)
            }
            res.send(result);
        })
        })
    app.put('/api/update/:id',(req,res)=>{
        const {id}= req.params;
        const {name,email,contact}= req.body;
        const sqlupdate = `UPDATE contact_db SET name=?,email=?,contact=? WHERE id=?`;
        db.query(sqlupdate,[name,email,contact,id],(err,result)=>{
            if (err) {
                console.log(err)
            }
        })
        })
    


app.get('/',(req,res)=>{
    // const sqlGet = `INSERT INTO contact_db (name,email,contact) VALUE ('raheem','walett95@gmail.com','08106473829')`;
    // db.query(sqlGet,(err,result)=>{
    //     console.log('error', err);
    //     console.log('result', result);
    //     res.json('welcome to express');
    // })
   
})

app.listen(5000,()=>{
    console.log('App is listening at Port 5000')
})