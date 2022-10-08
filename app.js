const express = require('express');
const mysql = require('mysql2')
const connection = require('./database')
const {DB} = require('./middleware/db.config')
const {Sequelize} = require('sequelize')
const bodyParser = require('body-parser');
const cors = require('cors');


//Routers
const user = require('./routes/user.router');
const category = require('./routes/category.router');
const product = require("./routes/product.router");


var app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.send("Its working ")
})

app.use('/user',user)
app.use('/cat',category);
app.use('/product',product)
DB.authenticate().then(()=>{
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
