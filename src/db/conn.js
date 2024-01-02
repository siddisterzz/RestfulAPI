const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/students-api',{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(()=>{
    console.log("Connection is successful")
})
.catch((e)=>{
    console.log(`error is connection ${e}`)
})
