// 2. Integrate with mongo
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

const AppUserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  password: { type: String },
});
const AppUser = mongoose.model("AppUser", AppUserSchema);

// 1. Setup Express App
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

app.post("/login", express.json(), (req, res) => {
  const { userName, password } = req.body;

  AppUser.findOne({ userName, password }, (err, appUser) => {
    if (err) {
      console.log("❌ Db Error");
      res.json({ sts: "fail", msg: "Db Error" });
    }
    if (appUser == null) {
      console.log("❌ User Not Found");
      res.json({ sts: "fail", msg: "❌ User Not Found" });
    }

    console.log(appUser);
    const token = jwt.sign({...appUser}, "abc123", { algorithm: "HS256" });

    res.json({
      sts: "sucess",
      token,
      msg: "✅ User LoggedIn Successfully",
      
    });
  });
});

app.get('/balance',expressjwt({secret:'abc123',algorithms:["HS256"]}),(req,res)=>{
  console.log(req.auth);
  res.json({sts:'success'})
})
app.put("/withdraw", expressjwt({secret:'abc123',algorithms:["HS256"]}), (req, res) => {});

app.post("/newuser", express.json(),expressjwt({secret:'abc123',algorithms:["HS256"]}), (req, res) => {
  console.log(req.auth)
  const {role}=req.auth._doc
  if(role && role=='admin'){
    res.json({sts:'New user added'})
  }
  else{
    res.status(401).json({sts:'Unauthorized user',data: req.auth})
  }
});

app.listen(6000, () => {
  console.log("✅ Server Running Successfully");
});
