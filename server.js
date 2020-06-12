// Import's
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Importing my route's
const authRoutes = require("./Routers/auth");
const userRoutes = require("./Routers/user");

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED");
})

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());    


//Using my Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);


// PORT
const port = process.env.PORT || 8000;

// Starting Server
app.listen(port,() => {
    console.log(`app is running at ${port}`);
});