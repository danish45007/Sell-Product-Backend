const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./Routers/auth');

// init app
const app = express();

// Routes
app.use("/api", authRoutes)


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

// Middlewares injection
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// PORT Define
const PORT = process.env.PORT || 5000;

// starting the server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
});
