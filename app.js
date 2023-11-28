const express = require('express');
const {connectToDb,getDb} = require('./db');

//init app and middleware

const app = express();

//db conenction
let db;
connectToDb((err)=>{
    //using this call back function we are going to verify that if there is connection error or not
    if(!err){
        app.listen(3000, ()=> {
            console.log("app listen in port 3000");
        });
        db = getDb;
    }
})


//routes

app.get('/books',(req,res) => {
    
db.collection('books')
let book = []
.find()
.sort({author: 1 })
.forEach(book => book.push(book) )
.then(()=>{
    res.status(200).json(book)
})
.catch(()=>{
    res.status(500).json({error : "could not fetch"})
})
    res.json({mssg: "welocme to the api"})

})