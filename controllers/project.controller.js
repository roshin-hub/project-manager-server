const Project = require('../models/project.model');

exports.test = function (req, res) {
    res.send('Test');
};

exports.project_create = function (req, res) {
    let project = new Project(
        {
            title: req.body.title,  
            manager_id: req.body.manager_id,         
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            status: req.body.status,
            priority: req.body.priority
           
        }
    );

        project.save()
        .then(data => {
            res.send({msg:"Project created successfully"});
        }).catch(err => {
            res.status(500).send({
                err_msg: err.message || "Some error occurred while creating Project."
            });
        });
  
};

exports.project_details = (req, res) => {
    Project.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                err_msg: "Project not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                err_msg: "Project not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            err_msg: "Error retrieving Project with id " + req.params.id
        });
    });
};

exports.project_update = function (req, res) {
    Project.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, project) {
        if (err) return next(err);
        res.send({msg:"Project updated successfully"});
    });
};


exports.project_delete = (req, res) => {
    Project.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                err_msg: "Project not found with id " + req.params.id
            });
        }
        res.send({msg: "Project deleted successfully!"});
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

exports.project_all = (req, res) => {
    Project.find().sort([['updated_date', -1]])
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            err_msg: err.message || "Error occurred while retrieving projects."
        });
    });
};



exports.project_search = function(req, res) {     
       
            Project.find({ 'title': new RegExp(req.params.title, 'i') }).then(data => {
                 res.send(data);
            }).catch(err => {
                res.status(500).send({
                    err_msg: err.message || "Error occurred while retrieving projects."
                });
            });
    };