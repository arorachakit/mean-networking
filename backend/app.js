const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb://chakit:' + process.env.MONGO_ATLAS_PW + '@meanstack-shard-00-00-t3t1g.mongodb.net:27017,meanstack-shard-00-01-t3t1g.mongodb.net:27017,meanstack-shard-00-02-t3t1g.mongodb.net:27017/mean?ssl=true&&replicaSet=meanstack-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true}).then(()=>{
  console.log('Connected to database');
}).catch((err)=>{
  console.log(err)
  console.log("Connection failed")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use('/images', express.static(path.join('images')))

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
  next();
})

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
