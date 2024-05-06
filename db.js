const mongooes = require('mongoose');
require('dotenv').config();
// const mongooesURL = process.env.MONGO_DB_URL_LOCAL;
const mongooesURL=process.env.MONGO_DB_URL;


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