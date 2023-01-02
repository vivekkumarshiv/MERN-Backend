const { Console } = require('console');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/test')
.then(()=>{
    console.log("Server running successfully")
})
.catch(err=>{
    console.log("There was an error")
});

const express=require('express');
const app=express();

//create a car schema
const carSchema=new mongoose.Schema({
    model:{type: String,unique:true},
    slug:{type: String,unique:true},
    isFour:{type: Boolean},
    country:{type: Number},
    make:{type: String}

})
carSchema.pre('save',async function(){
    await new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log('Data Fetched');
            res()
        },1500)
    })
})

carSchema.pre('save',function(next){
    console.log('Middleware detected');
    console.log(this);
    this.slug=slugify(this.model);
    next()
})

carSchema.post('save',doc=>{
    console.log('POST: Middleware detected');
    console.log('ID: '+doc._id);
   
})

carSchema.post('save',(error,doc,next)=>{
    console.log('POST: Middleware detected');
    console.log('ID: '+doc._id);
    if(error.name==='MongoServerError' && error.code===11000){
        next(new Error('Model should be unique'))
    }
    else{
    next()
    }
})



const car= mongoose.model('car',carSchema);

// const car=mongoose.model('car',{
//     model: String,
//     country: Number,
//     isFour: Boolean,
//     make: String
// })

app.listen(9000,()=>{
   console.log('Car server running');
})

app.post('/',express.json(),(req,res)=>{
    const reqcar=req.body;
    //json to javascript object
    console.log(reqcar);
    //const obj=new car({
      //  model: reqcar.model,
        //make: reqcar.model,
        //country: reqcar.country,
        //isFour: reqcar.isFour
    //})
    const obj=new car({...reqcar})

    
    obj.save().then(
        sts => res.status(201).json({ sts : 'success' })
    ).catch(
        err => {
            res.status(400).json({ sts : 'err', msg : err.message })
        }
    )
     

})
app.get('/',(req,res)=>{
    car.find((err,crs)=>{
        if(err) res.status(500).json()
        res.json(crs)
    })
    
})
app.put('/',(req,res)=>{
    
})
app.delete('/',(req,res)=>{
    
})

function slugify(model){
      return model.toString().toLowerCase().replaceAll(' ','-')
}