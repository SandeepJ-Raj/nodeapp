const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnect');
const dotenv = require('dotenv').config();
const app = new express();

const port = process.env.PORT;
connectDB();
app.use(express.json());
app.use(errorHandler);
app.use("/api/contacts", require('./routes/contacts'));
app.use("/api/users", require('./routes/users'));

app.listen(port, () => {
    console.log(`Port running on ${port}`);
});