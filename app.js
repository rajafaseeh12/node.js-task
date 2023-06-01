const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/index');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { console.log("Database-connected"); })
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Running on port ", PORT);
});