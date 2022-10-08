const {Sequelize} = require('sequelize')

const DB = new Sequelize('userData','root','Jagan17@',{
    host : "localhost",
    dialect : "mysql",
    port : "3306",
})


module.exports = {DB}