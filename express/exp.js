const express=require('express');

const app=express();

app.get('/',(req,res)=>
{
    res.end('GET: This is express tutorial');
})

app.post('/login',(req,res)=>{
    res.end('POST: This is express tutorial');
})

app.listen(9000,()=>{
    console.log('SERVER IS RUNNING SUCCESSFULLY')
})