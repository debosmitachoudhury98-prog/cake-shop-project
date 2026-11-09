const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String},
    password:{type:String},
    mobile:{type:String},
    role:{
        type:String,
        enum:['admin','customer'],
        default:'customer'
    }
})

userSchema.methods.comparePassword= async function(plainPassword){
   return bcrypt.compare(plainPassword, this.password)
} 

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
    }
}); 


const User = mongoose.model("User", userSchema);
module.exports=User;