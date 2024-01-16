
const mongoose=require('mongoose');

const schema = new mongoose.Schema({
 name:{
    type:String,
    required:true,
 },
 age:{
    type:String,
    required:true,
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 password:{
    type:String,
    required:true,
   
 }
},{
   timestamps:true
})
 
const UserDB= mongoose.model('Check',schema);
module.exports=UserDB;