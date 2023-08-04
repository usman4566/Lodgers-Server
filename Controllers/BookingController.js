const Booking = require("../Models/bookingModel");
const controllerError = require("../utils/controllerError");
//get all bookings
module.exports.getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({
            bookings,
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
}

//get booking by hostel id
module.exports.getBookingByHostelId = async (req, res, next) => {
    try{
        const hostelId = req.params.hostelId;
        const bookings = await Booking.find({hostelId: hostelId});
        res.status(200).json({
            bookings,
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
}
//get booking by user id
module.exports.getBookingByUserId = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const booking = await Booking.find({userId: userId});
        res.status(200).json({
            booking,
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
}
//add booking
module.exports.addBooking = async (req, res, next) => {
    try{
        const {hostelId, userId, checkIn, price, contactNo, message, customerName,ownerId, roomId,roomImage,roomType,hostelName} = req.body;
        const booking = new Booking({
            hostelId,
            userId,
            checkIn,
            price,
            contactNo,
            message,
            customerName,
            ownerId,
            roomId,
            roomImage,
            roomType,
            hostelName
            
        });
        booking
            .save()
            .then((bookingData) => {
                res.status(201).json({
                    bookingData,
                });
            })
            .catch((err) => {
                controllerError(err, res, "Error occurred");
            });
    } catch (error) {
        controllerError(error, res, "Error occurred");  
    }
}
//get booking by owner id
module.exports.getBookingByOwnerId = async (req, res, next) => {
    try{
        const ownerId = req.params.ownerId;
        const booking =await Booking.find({ownerId: ownerId});
        res.status(200).json({
            booking,
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
}
//change booking status
module.exports.changeBookingStatus = async (req, res, next) => {
    try{
        const id = req.params.id;
        const booking = await Booking.findByIdAndUpdate(id, {status: true});
        res.status(200).json({
            booking,
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
}
//delete booking
module.exports.deleteBooking = async (req, res, next) => {
    try{

        const id = req.params.id;
        console.log(id);
        const booking = await Booking.findByIdAndDelete(id);
        res.status(200).json({
            booking,
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
}