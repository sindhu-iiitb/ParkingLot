const mongoose = require('mongoose');

const ParkingLotSchema = mongoose.Schema({
    ticket_id: String
    
}, {
    timestamps: true 
});

module.exports = mongoose.model('ParkingLot', ParkingLotSchema);