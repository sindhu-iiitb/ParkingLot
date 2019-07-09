
const ParkingLot = require('../models/parkinglot.model.js');

const ParkingLotConstants = require('../../config/parkingLotConstants.config');

// Create and Save a new ParkingLot
exports.create = async (req, res) => {
    let ParkingSlots = () => { return ParkingLot.find({}).count() };
    let occupiedParkingSlots = await ParkingSlots();
    console.log("occupied" + occupiedParkingSlots);
    console.log("total" + ParkingLotConstants.totalParkingSpots);
    if (occupiedParkingSlots < ParkingLotConstants.TOTAL_PARKING_SPOTS) {

        // Create a ParkingLot
        const parkingLot = new ParkingLot({
            ticket_id: "ticket_" + Date.now()


        });

        // Save ParkingLot in the database
        parkingLot.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the ParkingLot."
                });
            });

    }
    else {
        res.status(400).send({ message: "There are no parking slots available" });
    }
};

exports.getDuration = async (req, res) => {
    if (!req.params.ticketId) {
        res.status(400).send({ message: "Please provide a ticketId" });
    }
    else {
        let ticket = req.params.ticketId.split("_");
        let hours = Math.ceil((Date.now() - ticket[1]) / (60 * 60 * 60 * 1000));
        let totalAmount = 0;
        if (hours <= 1) {
            totalAmount = ParkingLotConstants.CHARGE_1_HOUR;
        }
        else if (hours > 1 && hours <= 3) {
            totalAmount = ParkingLotConstant.CHARGE_3_HOUR;
        }
        else if (hours > 3 && hours <= 6) {
            totalAmount = ParkingLotConstants.CHARGE_6_HOUR;
        }
        else if (hours > 6 && hours <= 24) {
            totalAmount = ParkingLotConstants.CHARGE_ALL_DAY;
        }
        else {
            totalAmount = ParkingLotConstants.CHARGE_ALL_DAY * (Math.ceil(hours / 24));
        }


        res.send(totalAmount.toString());

    }
};


exports.pay = async (req, res) => {
    const creditCardNo = require("../mock/creditCard.mock");
    console.log(req.params.ticketId);
    // console.log(creditCardNo);
    if (!req.params.ticketId) {
        res.status(400).send({ message: "Please provide a valid ticket ID" });
    }
    else if (!req.params.creditCardNo || req.params.creditCardNo != creditCardNo.creditCardNumber) {
        res.status(400).send({ message: "Please provide a valid credit card number" });
    }
    else {
        // const parkingLot = new ParkingLot();
         let result= await ParkingLot.findOneAndRemove({ ticket_id : req.params.ticketId }).exec();
         
         
         return res.status(200).send(JSON.stringify(result));
    }
};