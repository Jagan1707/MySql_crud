const {Sequelize} = require('sequelize')
const {seq} = require('../middleware/db.config');

const userShema = seq.define('user_info',{
    id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
    Name : {type:Sequelize.STRING,allowNull:false},
    Mobile : {type:Sequelize.INTEGER,allowNull:false},
    Email :{type:Sequelize.STRING,allowNull:false}
},{
    tableName : 'user_info',
    // freezeTableName:true,

})

userShema.sync({force:false});

module.exports = {userShema};