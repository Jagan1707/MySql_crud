const {Sequelize} = require('sequelize');
const {DB} = require('../middleware/db.config');


const categorySchema = DB.define('category_info',{
   id           : {type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
   category : {type:Sequelize.STRING,allowNull:false},
   image        : {type:Sequelize.STRING,allowNull:false},
   adminID       : {type:Sequelize.INTEGER,allowNull:false}
},{
    tableName:'category_info'
})
 
categorySchema.sync({force:false})

module.exports = {categorySchema}
