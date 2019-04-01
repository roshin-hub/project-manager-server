const Project = require('../models/project.model');

exports.test = function (req, res) {
    res.send('Test');
};

exports.project_create = function (req, res) {
    let project = new Project(
        {
            title: req.body.title,
            priority: req.body.priority
        }
    );

    project.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Project created successfully')
    })
};

exports.project_details = function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err) return next(err);
        res.send(project);
    })
};

exports.project_update = function (req, res) {
    Project.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, project) {
        if (err) return next(err);
        res.send('Project udpated.');
    });
};

exports.project_delete = function (req, res) {
    Project.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};