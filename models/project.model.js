const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = new Schema({    
    title: {type: string, required: true},
    start_date: { type: Date, required: true },
    end_date: { type: Date },
    priority: {type: Number, required: true},
    updated_date: { type: Date, default: Date.now },
});


// Export the model
module.exports = mongoose.model('Project', ProjectSchema);