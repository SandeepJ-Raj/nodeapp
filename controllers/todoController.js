const asyncHandler = require('express-async-handler');
const todoCollection = require('../models/todoModel');

const list = asyncHandler( async(req, res) => {
    console.log('requested => ', req.headers);
    const todolist = await todoCollection.find();
    console.log('todolist => ', todolist);
    return res.header({status: true}).json({list: todolist});
});

const addTodo = asyncHandler( async(req, res) => {
    const {desc, date} = req.body;
    console.log('desc => ', desc, ' date => ', date, ' req.body => ', req.body);
    await todoCollection.create({desc, date});
    return res.json({message: `Todo list added successfully`});
})

const updateTodo = asyncHandler( async(req, res) => {
    console.log('req.body => ', req.body, ' req.params => ', req.params);
    const updataTodoItem = await todoCollection.findByIdAndUpdate(
        req.body._id,
        req.body
    );
    console.log('updataTodoItem => ', updataTodoItem);
    return res.json({message: `Todo list updated successfully`});
})

const deleteTodo = asyncHandler( async(req, res) => {
    const todoItem = await todoCollection.findById(req.params.id);
    if(!todoItem) {
        res.status(404);
        throw new Error("Todo item not found");
    }
    await todoItem.deleteOne({_id: req.params.id});
    return res.json({message: `Todo list deleted successfully`});
})
module.exports = {list, addTodo, updateTodo, deleteTodo};