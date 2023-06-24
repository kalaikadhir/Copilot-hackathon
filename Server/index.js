const express = require('express');
const app = express();
const mongooose = require('mongoose');
const WorkModel = require('./models/Work');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongooose.connect("mongodb+srv://ketansingh918:ketansingh@cluster0.yiaqxkq.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});

app.listen(8000,()=>{
    console.log("listening")
});


app.post("/insert",async (req, res) =>{
    const title = req.body.title;
    const body = req.body.body;
    const eod = req.body.eod;
    const task = new WorkModel({title, body, eod});
    try
    {
        await task.save();
        res.send("Inserted Data");
    }
    catch(err)
    {
        console.log(err);
        res.send("error");
    }
});

app.get("/read",async (req, res) =>{
    WorkModel.find({},(err,result)=>{
        if(err)
        {
            res.send(err);
        }

        res.send(result);
    });
});

app.delete("/delete/:id",async (req, res) =>{
   const id = req.params.id;
   await WorkModel.findByIdAndRemove(id).exec();
   res.send("deleted");
});

// Registration

app.post("/register",async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = {userName: req.body.userName , password: hashedPassword}
        const newUser = new studentModel({userName: user.userName, password: user.password})
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
      console.log(user)
      if(user.isUser==false){
          console.log("User is not a student")
          return res.sendStatus(403)
      }
      next()
    })
  }

// Login

app.post("/login",async(req,res)=>{
    
    try{
        console.log("Tried.")
        const user=await studentModel.findOne({userName: req.body.userName})
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
            const token=jwt.sign({id: user._id, isUser: true},process.env.ACCESS_TOKEN_SECRET)
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