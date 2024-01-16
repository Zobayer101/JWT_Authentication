
const express=require('express');
const dotenv=require('dotenv');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const DBconnect=require('./server/database/connection');
const route=require('./server/routes/route');

const app=express();
dotenv.config();
const PORT=process.env.PORT||8800;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

DBconnect();

app.use('/',route);

app.use((error,req,res,next)=>{
    if(error){
        console.log(error.message);
    }else{
        console.log(`Server side error`)
    }
})

app.listen(PORT,()=>{
    console.log(`Server run on http:localhost:${PORT}`);
})