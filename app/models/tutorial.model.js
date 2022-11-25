const Sequelize=require('sequelize');
const sequelize = new Sequelize('sequelize_video','root','rootpassword',{
    host:'localhost',
    dialect:'mysql',
})

const Tutorial=sequelize.define('tutorial',{
        title:{
            type:Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        published:{
            type:Sequelize.BOOLEAN
        }
    });
    
Tutorial.sync({alter:true}).then(()=>{
    console.log('table model synced successfully')
}).catch((err)=>{
    console.log(err);
});
module.exports=Tutorial;