const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

var TaskSchema = new Schema({    
    title: {type: String, required: true},
    is_parent: {type: Number, default: 0},
    parent_id: {type: String, index: true},
    project_id: {type: String, required: true,index: true},
    user_id: {type: String, required: true,index: true},
    start_date: { type: Date},
    end_date: { type: Date },
    priority: {type: Number, required: true},
    status: {type: String, default: 'Defined'},
    updated_date: { type: Date, default: Date.now },
});


// Export the model
module.exports = mongoose.model('Task', TaskSchema);