const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('mongodb');
require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/register', async(req, res) => {
  const {name, email, password} = req.body
  const data = {
    name: name,
    email: email,
    password: password
  }
  try {
    const check = await user.findOne({email:email})
    if(check){
      res.json('exist')
      console.log(check);
    } else{
      console.log(check);
      res.json('non-existence')
      await user.insertMany([data])
    }
  } catch (error) {
    console.log(error);
    res.json('fail')
  }
})

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
});
const user = mongoose.model('users', userSchema);
user.createIndexes();

async function connect(){
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
  };
};

app.get('/', (req, res) => {
  res.send('yoo');
});



connect();

app.listen(8001);