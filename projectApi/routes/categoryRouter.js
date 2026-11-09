const express=require('express');
const Category=require('../models/categoryModel');
const router=express.Router();
const authenticate=require('../middleware/authenticate');
const authorize=require('../middleware/authorize');
router.get('/', async (req, res)=>{
    try{
        const categories= await Category.find()
        if(categories.length>0){
            res.json(categories)
        }else{
            res.json({message:"No category details found"})
        }
    }catch(err){
        res.json({message:err.message})
    }
});

router.post('/', authenticate , authorize('admin') ,async (req, res)=>{
    try{
        const newCat=new Category(req.body);
        // console.log(req.body)
        const save = await newCat.save()
        res.json(save);
    }catch(err){
        res.json({message:err.message});
    }
});

router.delete('/:id', async (req,res)=>{
    id=req.params.id
    try{
        const delCategory= await Category.findByIdAndDelete(id)
        if(!delCategory){
            return res.status(404).json({
                message:"Category details not found"
            })
        }
        else{
            return res.json(delCategory);
        }
    }catch(err){
        return res.json({
            message:err.message
        })
    }
});

router.put('/:id', async (req, res)=>{
    
    try{
        updCategory= await Category.findByIdAndUpdate(
           req.params.id,
           req.body,
           {
            new :true
           }
        )
        if(!updCategory){
            res.json({
            message:"Category not updated"
        })
        }
        res.json(updCategory)

    }catch(err){
        res.json({
            message:err.message
        })
    }
});

module.exports=router;