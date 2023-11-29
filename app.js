const express = require('express');
const {connectToDb,getDb} = require('./db');
const { ObjectId } = require('mongodb');

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

app.get('/books/:id', (req,res) =>{
    //get the parameter from the get method url
    //req.params.id

    if((ObjectId.isValid(req.params.id))){
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        } )
        .catch(err => {
            res.status(500).json({error: "could not fetch"})
        })

    }
    else{
        res.status(500).json({error: 'Not Valid doc id '})
    }


} )