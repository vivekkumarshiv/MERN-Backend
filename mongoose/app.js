const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

const anime =mongoose.model('anime',{name:String});

const bleach=new anime({name: 'Kurosaki'});

bleach.save()
.then(()=>{
    console.log("Your anime is saved")
    
})
.catch(err=>{
    console.log("Error is detected");
})

anime.find({name:'Kurosaki'},{__v: 0},(err,animes)=>{
    console.log(animes)
}).limit(1)