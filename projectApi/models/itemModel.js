const mongoose=require('mongoose');
require('./categoryModel');

const itemSchema=mongoose.Schema({
    title:{type:String},
    description:{type:String},
    price:{type:String},
    imageUrl:{type:String},
    cloudinaryId:{type:String},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
}, {timestamps:true});

module.exports=mongoose.model("Item", itemSchema);