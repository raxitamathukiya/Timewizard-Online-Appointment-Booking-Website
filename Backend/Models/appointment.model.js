const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    Date:{ type: Date, required: true },
 
});

const AppointmentModel = mongoose.model('Appointment', AppointmentSchema);

module.exports = {
    AppointmentModel
}
