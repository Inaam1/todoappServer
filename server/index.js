const express = require('express');
const mongoose = require('mongoose');
const app = express();
const TodoItem = require('./models/TodoModel.js');

app.use(express.json());

const uri = "mongodb+srv://inaamchill:7b24UsFTwFUKx1jM@todolist.shfwr.mongodb.net/";

mongoose.connect(uri) 
    .then(() => console.log("Connected..."))

app.listen(5000, () => {
    console.log("Server Running on port 5000")
})

app.get('/', (req, res) => {
    res.send("Welcome to To-Do list Servere.....")
})

//Add a ToDo Item
app.post('/add', async (req, res) => {
    try {
        const item = await TodoItem.create(req.body);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get All ToDos
app.get('/all', async (req, res) => {
    try {
        const item = await TodoItem.find({});
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({messge:error.message})
    }
})

//Delete a ToDo
app.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const item = await TodoItem.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).json({message: "Todo No Found"})
        }
        res.status(200).json({message: "Todo Deleted"})
    } catch (error) {
        res.status(500).json({messge:error.message})
    }
})