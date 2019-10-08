// import timestamps = require('mongoose-timestamp');
import mongoose from '../../app.database';

const schema = new mongoose.Schema({
    seatNumber: { type: String, required: false },
    price: { type: String, required: false },
    available: {type: Boolean, required: false},
    disabilityAccessible: {type: Boolean, required: false}
});

export const Seat = mongoose.models.Seat || mongoose.model('Seat', schema, 'seats');
