const express=require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const app=express();
const tutorialRoute = require('./app/routes/tutorial.routes');
// var corsOptions={
//     origin:'http://localhost:8081'
// };
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const db=require('./app/models');

app.get('/',(req,res)=>{
    res.json({message:'Welcome to sequelize crud'});
});
// require('./app/routes/tutorial.routes')(app);
app.use('/api/tutorials', tutorialRoute)
let PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
console.log(`server is listening on port ${PORT}...`)
});

