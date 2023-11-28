const express = require('express');

//init app and middleware

const app = express();

app.listen(3000, ()=> {
    console.log("app listen in port 3000");
});

//routes

app.get('/books',(req,res) => {
    
    res.json({mssg: "welocme to the api"})

})