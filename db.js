const mongooes = require('mongoose');

const mongooesURL = "mongodb://127.0.0.1:27017/hotels"


const db = async ()=>{
    try {
       const connection = await mongooes.connect(mongooesURL);
       console.log('Connected to mongoDB server');
       return connection;
    } catch (error) {
        console.log('mongoDB connection error',error);
    }
}
// db.on("connection",() =>{
//     console.log('Connected to mongoDB server');
// })
// db.on("error",(err) =>{
//     console.log('mongoDB connection error',err);
// })
// db.on("disconnection",() =>{
//     console.log('mongoDB disconnected');
// })

module.exports = db;