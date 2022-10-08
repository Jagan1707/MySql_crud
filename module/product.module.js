const {Sequelize, INTEGER} = require('sequelize');
const {DB} = require('../middleware/db.config');

const productSchema = DB.define( 'product_info',{ 
    id           : {type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
    productName  : {type:Sequelize.STRING,allowNull:false},
    expireData   : {type:Sequelize.DATE,allowNull:true},
    price        : {type:Sequelize.INTEGER,allowNull:false},
    image        : {type:Sequelize.STRING,allowNull:false},
    quantity     : {type:Sequelize.INTEGER,allowNull:false},
    categoryID   : {type:Sequelize.INTEGER,allowNull:true},
    categoryName : {type:Sequelize.STRING,allowNull:true},
    adminID      : {type:Sequelize.INTEGER,allowNull:true} 
},{
    tableName:'product_info'
})

productSchema.sync({force:false});


module.exports = {productSchema}