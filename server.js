require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const fetchAllRoutes = require('./routes/fetchAllRoute.js')
// const db = require('./config/db.js');


const app = express();
app.use(bodyParser.json());

const PORT = 8000;

app.use('/api', fetchAllRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
