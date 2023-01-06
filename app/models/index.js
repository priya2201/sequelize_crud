const dbConfig=require('../config/db.config');
const Sequelize=require('sequelize');
// const dbConfig = require('../config/db.config');
const sequelize = new Sequelize('sequelize_video1','root','smileyarr12',{
    host:'localhost',
    dialect:'mysql',
    
    // pool:{
    //     max:dbConfig.pool.max,
    //     min :dbConfig.pool.min,
    //     acquire:dbConfig.pool.acquire,
    //     idle:dbConfig.pool.idle
    // }

});
const db={};
db.sequelize=sequelize;
db.Sequelize=Sequelize;
db.tutorials=require('./tutorial.model')
module.exports=db;

db.sequelize.sync({force:true}).then(()=>{
    console.log('Drop and re-sync db');
}).catch((err)=>{
    console.log('failed to sync db:'+err.message);
})