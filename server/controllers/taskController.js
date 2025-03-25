const Task = require('../models/Task');

const getTasks = async (req, res) => {
    const tasks = await Task.find({ User: req.user.id });
    res.status(200).json(tasks);
};

const createTask = async (req, res) => {
    const { Title, Description, Status, DueDate, Priority, User } = req.body;

    const task = await Task.create({
        Title,
        Description,
        Status,
        DueDate,
        Priority,
        User
    });

    res.status(201).json(task);
};

const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if(!task){
        res.status(404);
        throw new Error('Task not found');
    }

    if (task.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not authorized to update this task');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if(!task){
        res.status(404);
        throw new Error('Task not found');
    }

    if (task._id.toString() !== req.params.id){
        res.status(401);
        throw new Error('Not authorized to delete this task');
    }

    await task.deleteOne();
    res.status(200).json({ message: 'Task removed' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
