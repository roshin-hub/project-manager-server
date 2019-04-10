const Task = require('../models/task.model');

exports.test = function (req, res) {
    res.send('Test');
};

exports.task_create = function (req, res) {
    let task = new Task(
        {
            title: req.body.title,
            is_parent: req.body.is_parent,
            parent_id: req.body.parent_id,
            project_id: req.body.project_id,
            user_id: req.body.user_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            priority: req.body.priority
        }
    );

        task.save()
        .then(data => {
            res.send({msg:"Task created successfully"});
        }).catch(err => {
            res.status(500).send({
                err_msg: err.message || "Some error occurred while creating Task."
            });
        });
  
};

exports.task_details = (req, res) => {
    Task.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                err_msg: "Task not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                err_msg: "Task not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            err_msg: "Error retrieving Task with id " + req.params.id
        });
    });
};

exports.task_update = function (req, res) {
    Task.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, task) {
        if (err) return next(err);
        res.send({msg:"Task updated successfully"});
    });
};


exports.task_delete = (req, res) => {
    Task.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                err_msg: "Task not found with id " + req.params.id
            });
        }
        res.send({msg: "Task deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                err_msg: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            err_msg: "Could not delete note with id " + req.params.id
        });
    });
};

exports.task_all = (req, res) => {
    Task.find().sort([['updated_date', -1]])
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            err_msg: err.message || "Error occurred while retrieving tasks."
        });
    });
};

exports.task_search = function(req, res) {     
       
            Task.find({ 'title': new RegExp(req.params.title, 'i') }).then(data => {
                 res.send(data);
            }).catch(err => {
                res.status(500).send({
                    err_msg: err.message || "Error occurred while retrieving tasks."
                });
            });
    };