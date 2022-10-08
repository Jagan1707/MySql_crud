const {Sequelize} = require('sequelize')
const {DB} = require('../middleware/db.config');

const userShema = DB.define('user_info',{
    id          : {type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
    Name        : {type:Sequelize.STRING(20),allowNull:false},
    Mobile      : {type:Sequelize.STRING(10),allowNull:false},
    Email       : {type:Sequelize.STRING(35),allowNull:false},
    Password    : {type:Sequelize.STRING(60),allowNull:false},
    Role        : {type:Sequelize.STRING(10),allowNull:true,defaultValue:'user'},
    Gender      : {type:Sequelize.STRING(10),allowNull:true},
    Address     : {type:Sequelize.STRING(30),allowNull:true,defaultValue:"chennai-68"},
    Active      : {type:Sequelize.BOOLEAN,allowNull:true,defaultValue:false},
    LaginStatus : {type:Sequelize.BOOLEAN,allowNull:true,defaultValue:true}
},{
    tableName : 'user_info',
    // freezeTableName:true,

})

userShema.sync({force:false});

module.exports = {userShema};