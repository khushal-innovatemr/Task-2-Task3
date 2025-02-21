const mongoose  = require('mongoose');
const express = require('express');
const Expense = require('./models/model');
const app = express();
const port = 3194;
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.uduq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.post('/add-expense',async(req,res) => {
    try{
        const newExpense = new Expense(req.body);
        await newExpense.save();
        res.send('Expense Saved Successfully')
    }
    catch(error){
        res.status(500).send("Error Saving user");
        console.log(error);
    }
})

app.get('/expense-summary',async(req,res) => {
    try{
        const Expenses = await Expense.aggregate([
        {
          $group: {
            _id: "$category",
            Expense: {
              $sum: "$amount",
            },
          },
        },
      ])
    res.send(Expenses);
    console.log(Expenses);
    }
    catch(error){
        console.log(error,"Tum Galat Ho")
    }  
})

app.listen(3194, () => {
    console.log(`Server is running on port "http://localhost:${port}`);
});