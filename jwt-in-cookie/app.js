const express=require('express')
const app=express()

const jwt=require('jsonwebtoken')

app.listen(6000,()=>{
    console.log('SERVER RUNNING SUCCESSFULLY')
})

app.post('/login',express.json(),(req,res)=>{
    const data=req.body
    const token=jwt.sign(data,"abc123",{algorithm:'HS256'})

    res.cookie('json_token',token,{httpOnly:true}).status(200).json({sts:'Logged in successfully'})
}

)

app.get('/balance',(req,res)=>{
    res.json({balance: 1000})
})