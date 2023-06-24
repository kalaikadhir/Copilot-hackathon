const express = require('express');
const app = express();
const mongooose = require('mongoose');
const WorkModel = require('./models/Work');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongooose.connect("mongodb+srv://admin:Ketanrocks14@tasks.wiuemon.mongodb.net/work?retryWrites=true&w=majority",{useNewUrlParser:true});

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