const express = require('express');
const mongoose = require('mongoose');
const weatherRouter = require('./Router.js/weatherRouter');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.uduq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.use('/weather', weatherRouter);

app.listen(3147, () => {
    console.log('Server is running on port 3147');
});