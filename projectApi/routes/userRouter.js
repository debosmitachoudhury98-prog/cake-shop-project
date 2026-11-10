const express=require('express');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
const router=express.Router();


router.post('/', async (req, res)=>{
    try{
        const email=req.body['email'];
        const user=await User.findOne({email})
        if(user){
            return res.json({
                message:"You are alredy registered"
            })
        }
        const newUser=new User(req.body);
        const save = await newUser.save()
        res.send(save);
    }catch(err){
        res.json({message:err.message});
    }
});

router.post('/login', async (req, res)=>{
    const {email, password}=req.body;
    const user= await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message:"Invalid email details"
        })
    } 
    
     const isPassCorrect = await user.comparePassword(password);
    if(!isPassCorrect){
        return res.status(404).json({
            message:"Invalid password details"
        })
    }
    
    const token=jwt.sign({id:user._id, 
        first_name:user.first_name, last_name:user.last_name, role:user.role},
    "SrdIKaenMlJ4QEeb5u138eOmbln2NmYrD1lcbNQMojl",{expiresIn:'1h'});
    res.json({message:"Login successful", token, role:user.role}); 
   res.send(token); 
}); 

module.exports=router;