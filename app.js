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
        db = getDb();
    }
})


//routes

app.get('/books',(req,res) => {
    let books = []
    db.collection('books')
.find()
.sort({author: 1 })
.forEach(book => books.push(book) )
.then(()=>{
    res.status(200).json(books)
})
.catch(()=>{
    res.status(500).json({error : "could not fetch"})
})

})