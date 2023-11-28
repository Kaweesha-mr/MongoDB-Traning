const{MongoClient} = require('mongodb')

//connect to database


//retirve the connection when you need it

let dbConnection;
module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/bookStore')
        .then((client) => {
            dbConnection = client.db();

            return cb()

        })
        .catch(err => {
            console.log(err);
            return cb(err)
        })
    },
    //return the db connection (ES6) used
    getDb: () => dbConnection
}