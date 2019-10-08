// import timestamps = require('mongoose-timestamp');
import mongoose from '../../app.database';

const schema = new mongoose.Schema({
    seatNumber: { type: String, required: true },
    price: { type: String, required: true },
    value: {type: Number, required: true},
    available: {type: Boolean, required: true},
    disabilityAccessible: {type: Boolean, required: true}
});

export const Seat = mongoose.models.Seat || mongoose.model('Seat', schema, 'seats');
