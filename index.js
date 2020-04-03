const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// var bodyParser = require('body-parser');
// const fs = require('fs');
const app = express();
// const https = require('https');


const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurant');
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use('/user' ,userRoutes);
app.use('/restaurant' ,restaurantRoutes);

mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true , useUnifiedTopology: true}  )
.then(() => console.log("Congratulations you are connected to Database"))
.catch(err => console.log(err));


app.listen(11211)