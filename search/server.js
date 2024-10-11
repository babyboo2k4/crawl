require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = "mongodb://127.0.0.1:27017/demo-news";

const db = mongoDB;
mongoose.Promise = global.Promise;
// connect process
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log(error);
    });