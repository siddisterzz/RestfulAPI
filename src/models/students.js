const mongoose=require('mongoose')
const validator=require('validator')

const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email is already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Username")
            }
        }

    },
    phone:{
        type:Number,
        minLength:10,
        maxLength:10,
        required:true,
        unique:[true,"Phone no. already exists"]
    },
    address:{
        type:String,
        minLength:3,
    }

})

const Student=new mongoose.model('Student',studentSchema)
module.exports=Student
