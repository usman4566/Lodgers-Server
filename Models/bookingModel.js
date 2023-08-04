const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
    {
        hostelId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Hostel',
            required: true
        },
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        customerName: {
            type: String,
            required: true
        },
        hostelName: {
            type: String,
            required: true
        },
        roomImage: {
            type: String,
            required: true
        },
        roomType: {
            type: String,
            required: true
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true
        },
        checkIn: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        contactNo: {
            type: String,
            required: true
        },
        message: {
            type: String,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status:{
            type: Boolean,
            default: false
        },
        paid:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Booking", bookingSchema);