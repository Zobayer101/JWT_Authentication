
const jwt=require('jsonwebtoken');

const checkLogin=  (req,res,next)=>{
    try{
        
        //console.log('This is a middel ware')
        const cookie=req.cookies;
        
        const cookiesValue=Object.values(cookie);
        //console.log(cookiesValue[0] )
        const decoded=  jwt.verify(cookiesValue[0],process.env.SECRET);
        req.userID=decoded.userId;
        req.userName=decoded.username;
        // console.log(decoded)
        // console.log(decoded.userId)
        if(!decoded.userId ){
            console.log('your authentication is faled');
        }else{
            next()
        }
        
         
    }catch(error){
        console.log(error.message);
        next(new Error('autontication fale'))
    }
}

module.exports=checkLogin;