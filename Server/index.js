const express = require('express');
const app = express();
const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const UserModel = require('./models/User');
const TransactionModel = require('./models/Transaction');

app.use(express.json());
app.use(cors());

mongooose.connect("mongodb+srv://ketansingh918:ketansingh@cluster0.yiaqxkq.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});

app.listen(8000,()=>{
    console.log("listening")
});


// Registration

app.post("/register",async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = {userName: req.body.userName , password: hashedPassword}
        const newUser = new UserModel({userName: user.userName, password: user.password})
        await newUser.save()
        res.status(201).send()
    } catch{
        res.status(500).send()
    }    
})

// Authentication

function authenticateUser(req, res, next) {
    console.log(req.headers)
    const authHeader = req.headers.authorization
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      console.log("Token is null")
      return res.sendStatus(401)
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403)
      }
      req.user = user
      next()
    })
  }

// Login

app.post("/login",async(req,res)=>{
    
    try{
        console.log("Tried.")
        const user=await User.findOne({userName: req.body.userName})
        console.log("User....")
        if(!user){
            console.log("No such user exists")
            res.sendStatus(400);
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        console.log(match)
        if(match){
            // console.log("matched")
            // console.log(user,process.env.ACCESS_TOKEN_SECRET)
            const token=jwt.sign({id: user._id},process.env.ACCESS_TOKEN_SECRET)
            res.json({user:user,token:token})
        }
        else{
            console.log("Password incorrect")
            res.send("Password incorrect")
        }
    } catch{
        res.status(500).send()
    }    
})

app.get("/",authenticateUser,async(req,res)=>{
    const user_id = req.user;
    const user = await UserModel.findById(user_id);
    if(!user){
        res.status(400).send("No such user exists");
    }
    let Transaction = user.transactions;
    let temp = [];
    for(let i=0;i<Transaction.length;i++){
        let tempTransaction = await TransactionModel.findById(Transaction[i]);
        temp.push(tempTransaction);
    }
    res.send({user:user,transactions:temp});
})