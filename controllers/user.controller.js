const User = require('../models/user.model');

exports.test = function (req, res) {
    res.send('Test');
};

exports.user_create = function (req, res) {
    let user = new User(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,  
            employee_id: req.body.employee_id                     
        }
    );

        user.save()
        .then(data => {
            res.send({msg:"User created successfully"});
        }).catch(err => {
            res.status(500).send({
                err_msg: err.message || "Some error occurred while creating User."
            });
        });
  
};

exports.user_details = (req, res) => {
    User.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                err_msg: "User not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                err_msg: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            err_msg: "Error retrieving User with id " + req.params.id
        });
    });
};

exports.user_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send({msg:"User updated successfully"});
    });
};


exports.user_delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                err_msg: "User not found with id " + req.params.id
            });
        }
        res.send({msg: "User deleted successfully!"});
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

exports.user_all = (req, res) => {
    User.find().sort([['updated_date', -1]])
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            err_msg: err.message || "Error occurred while retrieving users."
        });
    });
};

exports.user_search = function(req, res) {     
       
            User.find({ 'title': new RegExp(req.params.title, 'i') }).then(data => {
                 res.send(data);
            }).catch(err => {
                res.status(500).send({
                    err_msg: err.message || "Error occurred while retrieving users."
                });
            });
    };