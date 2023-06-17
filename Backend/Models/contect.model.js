const mongoose = require('mongoose');

const contectSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    chat:{ type: String, required: true },
    message:{ type: String, required: true },
    time:{ type: String, required: true },
 
});

const contectModel = mongoose.model('Contect', contectSchema);

module.exports = {
   contectModel
}
