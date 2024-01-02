const express=require("express")
require('./db/conn')
const Student=require('./models/students')
const app=express()
const port=process.env.PORT || 3000;

app.use(express.json())


// Note : this is done using promises, the better way pf doing it would be using async-await
// app.post("/students",(req,res)=>{
//     console.log(req.body)
//     const user = new Student(req.body)
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })

//create a student
app.post('/students',async (req,res)=>{
    try{
        const user=new Student(req.body)
        const createUser= await user.save()
        res.status(201).send(createUser)
    }catch(e){
        res.status(404).send(e)
    }
})

//for data of all student
app.get('/students',async(req,res)=>{
    try{
        const studentData = await Student.find()
        res.send(studentData)
    }catch(e){
        console.log(e)
    }
})

//for data of one student
app.get('/students/:id',async (req,res)=>{
    try{
        const _id = req.params.id
        const studentData = await Student.findById(_id)
        console.log(studentData)
        if(!studentData){
            return res.status(404).send()
        }else{
            return res.status(201).send(studentData)
        }
    }catch(e){
        console.log(e)
    }
})

//for updating a student
app.patch('/students/:id', async (req,res)=>{
    try{
        const _id = req.params.id
        const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{new:true})
        res.send(updateStudent)
    }catch(e){
        console.log(e)
        res.status(404).send(e)
    }
})
app.delete('/students/:id',async (req,res)=>{
    try{
        const _id=req.params.id
        const deleteStudent=await Student.findByIdAndDelete(_id)
        res.send(deleteStudent)
    }catch(e){
        res.status(404).send(e)
    }
})
app.listen(port , ()=>{
    console.log(`connection is set up at ${port} `)
})

