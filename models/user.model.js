const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

var UserSchema = new Schema({    
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    employee_id: {type: String, required: true},      
    updated_date: { type: Date, default: Date.now },
});


// Export the model
module.exports = mongoose.model('User', UserSchema);