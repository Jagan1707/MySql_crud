const {Sequelize} = require('sequelize')

const seq = new Sequelize('userData','root','Jagan17@',{
    host : "localhost",
    dialect : "mysql",
    port : "3306",
})


module.exports = {seq}