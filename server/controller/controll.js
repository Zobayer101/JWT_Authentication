const UserDB=require('../model/modelSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.singupuser= async (req,res)=>{
    try{
        const hashpas=await bcrypt.hash(req.body.password,10);
        const user =  new UserDB({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            password:hashpas
        })

        
       var data= await user.save(user)

      // token genearet
      const token= jwt.sign({

        userId:data._id,
        username:data.name

      },process.env.SECRET)

      
  
   console.log(token)
       

        res.status(200).cookie('user-cookie',token,{httpOnly:true}).send(data)
        
    }catch(error){
        res.status(500).send(error)
        console.log(error.message)
    }
}


exports.singinuser= async (req,res)=>{
    try{
       const data= await UserDB.find({email:req.body.email})
       
       if(data.length > 0){

        const isvalid=await bcrypt.compare(req.body.password,data[0].password);
       
        if(isvalid){
            //console.log(data[0])
            //token genaret
            const token=jwt.sign({
                userId:data[0]._id,
                username:data[0].name
            },process.env.SECRET);
            res.status(200).cookie('user-cookie',token,{httpOnly:true}).send(`user login successfull ${data[0]}`)
        }else{
            res.status(403).send('password invalid')
        }
       }else{
        res.status(401).send('This email not valid')
        console.log('email not valid');
       }
    }catch(error){
        console.log(error.message);
        res.status(405).send(error.message)
    }

}


exports.readData= async (req,res)=>{
    try{
        const data = await UserDB.find({_id:req.userID})
        console.log(req.userID)
        res.status(200).send(data[0])
    }catch(error){
        res.status(500).send('First you need to login')
    }
            
}

