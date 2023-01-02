const jwt=require('jsonwebtoken');

var token=jwt.sign({role:"admin"},'a5fe53',{algorithm:"HS256"})
console.log('The signed token is : '+token);

try{
    const orignal=jwt.verify(token,'a5f5e3')
    console.log(orignal)
    console.log('VERIFIED ')
}
catch(error){
    console.log('INVALID SIGNATURE')
}
