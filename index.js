const mongoose = require("mongoose")
const express = require('express')

const app = express()

var URI = "mongodb+srv://admin:admin@seva-108.vrzj5yt.mongodb.net/sunday-feast?retryWrites=true&w=majority";
mongoose.connect(URI)
const db = mongoose.connection;

db.once("open", function() {
    console.log("connection successful");
})

const profile_schema = mongoose.Schema({
    _id: Number,
    name: String,
    email: String, 
    address: String,
    seva: String
});

const cooking = mongoose.model("Cooking", profile_schema);


app.all('/', (req, res) => {
    cooking.find({__v: { $gte: 0} }).exec()
    .then((doc) => {
        res.json(doc);
    })    
})
app.listen(process.env.PORT || 3000)