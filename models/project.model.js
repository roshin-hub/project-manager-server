const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({    
    title: {type: String, required: true},
    start_date: { type: Date},
    end_date: { type: Date },
    manager_id: {type: ObjectId, required: true,index: true},
    priority: {type: Number, required: true},
    status: {type: String, default: 'active'},
    updated_date: { type: Date, default: Date.now },
});


// Export the model
module.exports = mongoose.model('Project', ProjectSchema);