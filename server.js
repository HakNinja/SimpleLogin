const express = require('express');
const app = express();
const path = require('path');
const bcrypt= require('bcrypt')
const port = process.env.PORT || 5000;

require("./db/conn");
const User = require('./models/signup');

app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});



app.post('/signup', async(req,res)=>{

    try { 


        
        const confirmpassPasswordtoBeHashed=req.body.confirmpassword;
        const round=10;
const passwordTobeHashed=req.body.password;
bcrypt.hash(passwordTobeHashed, round, (err, hash) => {
hashedpassword=hash;
  });
bcrypt.hash(confirmpassPasswordtoBeHashed, round, (err, hashed) => {
hashedconfirmpassword=hashed;
  });

    if (passwordTobeHashed===confirmpassPasswordtoBeHashed){
            const newuser = new User({
                fname:req.body.fname,
                lname:req.body.lname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                address:req.body.address,
               password:hashedpassword,
                confirmpassword:hashedconfirmpassword
            });
            await newuser.save();
            res.status(201).send("Sign Up Sucessfull!! _ Login into Account !! ");
        }
        else{
           res.status(400).send("Password not Matched !!! Try Again !!!!!")
        }
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
  
        if( temp.email === email && temp.password===password  ){
            res.status(201).send("Login Sucessfull");    
         
        }else {
            res.status(201).send("Invalid Credentials...Please Try Again!!");                   
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});