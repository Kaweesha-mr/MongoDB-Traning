const express = require('express');
const {connectToDb,getDb} = require('./db');
const { ObjectId } = require('mongodb');

//init app and middleware

const app = express();

//when jason data is passed you can access them in req.body object from using this
app.use(express.json());

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


app.post('/books', (req,res) => {
    //this will store the data comming from json
    const book = req.body;
    //pass data to the database using post request
    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(200).json({message: 'book inserted'})
    })
    .catch(err => {
        res.status(500).json({error: 'could not insert book'})
    })

})


//delete single document
app.delete('/books/:id', (req,res)=> {
    if((ObjectId.isValid(req.params.id))){
        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        } )
        .catch(err => {
            res.status(500).json({error: "could not delete the document"})
        })

    }
    else{
        res.status(500).json({error: 'Not Valid doc id '})
    }


})



app.patch('/books/:id', (req,res)=>{
    const updates = req.body;

    if((ObjectId.isValid(req.params.id))){
        db.collection('books')
        .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
        .then(result => {
            res.status(200).json(result)
        } )
        .catch(err => {
            res.status(500).json({error: "could not delete the document"})
        })

    }
    else{
        res.status(500).json({error: 'Not Valid doc id '})
    }





})