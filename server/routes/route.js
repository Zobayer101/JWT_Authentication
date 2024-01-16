
const express=require('express');
const route=express.Router();
const controller=require('../controller/controll');
const checkLogin=require('../services/midellware');

// api create 

//user create with token send
route.post('/route/api/signup',controller.singupuser);

//user login with token genaretd
route.post('/route/api/signin',controller.singinuser);

//one user read data
route.get('/route/api/read',checkLogin,controller.readData)
module.exports=route;
