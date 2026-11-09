const express=require('express');
const router=express.Router();
const Item=require('../models/itemModel');
const cloudinary=require('../config/cloudinary');
const upload=require('../middleware/multer');
// const authenticate=require('../middleware/authenticate');
// const authorize=require('../middleware/authorize');

router.get('/', async(req, res)=>{
    try{
        const items=await Item.find().populate('category');
        if(!items){
            return res.json({message:'No items found'});
        }   
        res.json(items);
    }catch(err){
        res.json({message:err.message});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const item=await Item.findById(req.params.id).populate('category');
        if(!item){
            return res.json({message:'Item not found'});
        }
        res.json(item);
    }catch(err){
        res.json({message:err.message});
    }
}); 

router.post('/', upload.single('image'), async(req, res)=>{
    try{
        const result=await cloudinary.uploader.upload(req.file.path);
        const newItem=new Item({
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            imageUrl:result.secure_url,
            cloudinaryId:result.public_id,
            category:req.body.category
        });
        const save=await newItem.save();
        res.json(save);
    }catch(err){
        res.json({message:err.message});
    }
}); 

router.delete('/:id', async(req, res)=>{
    try{
        const item=await Item.findById(req.params.id);
        if(!item){
            return res.json({message:'Item not found'});
        }
        await item.remove();
        res.json({message:'Item deleted successfully'});
    }catch(err){
        res.json({message:err.message});
    }
});

router.put('/:id', upload.single('image'), async(req, res)=>{
    try{
        const item=await Item.findById(req.params.id);
        if(!item){
            return res.json({message:'Item not found'});
        }
        const result=await cloudinary.uploader.upload(req.file.path);
        item.title=req.body.title;
        item.description=req.body.description;
        item.price=req.body.price;
        item.imageUrl=result.secure_url;
        item.cloudinaryId=result.public_id;
        item.category=req.body.category;
        const updatedItem=await item.save();
        res.json(updatedItem);
    }catch(err){
        res.json({message:err.message});
    } 
 });

module.exports=router;