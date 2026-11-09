const mongoose=require('mongoose');

const categorySchema=mongoose.Schema({
    category_name:{type:String}
})

const Category = mongoose.model("Category", categorySchema);
module.exports=Category;