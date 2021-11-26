const express = require('express');

const router = express.Router();

let todos = [];

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos});
})

router.post('/todo', (req, res, next) =>{
    const newTodo = {id: new Date().toString(),text: req.body.text}
    todos.push(newTodo);
    res.status(201).json({message: 'Added', todo: newTodo, todos: todos});
})

router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id == tid);
    if(todoIndex >=0){
        todos[todoIndex] = {id: tid, text: req.body.text};
        return res.status(200).json({message: 'Updated', todos:todos});
    }
    res.status(404).json({message: 'Could not find todo for this id'});
})

router.delete('/todo/:todoId', (req, res, next)=>{
    const tid = req.params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== tid);
    res.status(200).json({message: 'Deleted', todos: todos});
})

module.exports = router;