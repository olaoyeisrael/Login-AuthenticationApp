const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authRoute');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

const dbURI = 'mongodb+srv://Israel:Israel123@nodeapp.3bllk.mongodb.net/node-app?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>{app.listen(3000)})
.catch((err)=> console.log(err))

app.set('view engine', 'ejs')


app.use(authRoute)
app.get("*",(req, res)=>{
    res.render('404')
})

