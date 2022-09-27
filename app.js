const express = require('express');
const mysql = require('mysql2')
const connection = require('./database')
const {seq} = require('./middleware/db.config')
const {Sequelize} = require('sequelize')
const bodyParser = require('body-parser');
const cors = require('cors');


const user = require('./routes/user.router');


var app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.send("Its working ")
})

app.use('/user',user)
seq.authenticate().then(()=>{
    console.log('database successfully connected')
}).catch(err=>{console.log(err)})


// database.authenticate().then(()=>{
//     console.log("Database connected successfully")
// }).catch(err=>{
//     console.log("failed")
// })

// connection.connect(function(err){
//     if(err) {
//         console.log('err',err.message)
//     }
//     console.log('database connected successfully');
    
// })

// let sql = "SELECT * FROM USE_INFO";
// connection.query(sql,function(err,result){
//     if(err) console.log('err',err.message)
//     console.log('result',result);
// })




app.listen(3000,()=>{
    console.log("server is running successfull!");
})
