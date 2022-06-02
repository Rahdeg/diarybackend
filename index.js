const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
const db = mysql.createPool({
    host:'us-cdbr-east-05.cleardb.net',
    user:'b5e8bc32406a45',
    password:'c5c741a3',
    database:'heroku_fdc9f9844c451b9'
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
   res.send('it is working')
})

app.listen(process.env.PORT || 5000,()=>{
    console.log(`App is listening at Port ${process.env.PORT}` )
})