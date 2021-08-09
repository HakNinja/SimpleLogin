const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

require("./db/conn");
const User = require('./models/signup');

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/signup', async(req,res)=>{
    try { 
        const newuser = new User({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:req.body.password,
            gender:req.body.gender,
            phone:req.body.phone,
            address:req.body.address
        });
        await newuser.save();
        res.status(201).send("Data saved");
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/signin',(req,res)=>{
    res.sendFile(path.join(__dirname+'/check.html'));
});

app.post('/signin', async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const temp = await User.findOne({email:email});
        if( temp.email === email && temp.password === password ){
            res.status(201).send("Valid user");    
        } else {
            res.status(201).send("Database Error");                   
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});