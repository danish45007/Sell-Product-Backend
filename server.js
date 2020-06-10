const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();



// database connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('DB CONNECTED')
}).catch(err => {
    console.log("DB CONNECTED Failed")
});


// PORT Define
const PORT = process.env.PORT || 5000;

// starting the server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
});
