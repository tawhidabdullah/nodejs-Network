const express = require('express');
const mongoose = require("mongoose");

const users = require('./routes/api/users'); 
const profile = require('./routes/api/profile'); 
const posts = require('./routes/api/post'); 

// initialize app 
const app = express();

// Db config
const db = require("./config/keys").mongoURI;

// connect to mongoDB
mongoose.connect(db)
.then(()=>console.log("mongoDB Connected !"))
.catch(err => console.log(err)); 



app.get("/", (req, res) => {
  res.send('hellow world')
});

// Use Routes
// Go to this File for this Routes 
app.use('/api/users', users); // use Router() =>middleware (const router = express.Router()); 
app.use('/api/profile', profile); 
app.use('/api/posts', posts); 


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Tawhid Abdullah is a great programmer, surver is runnig on ${port}...`)
})