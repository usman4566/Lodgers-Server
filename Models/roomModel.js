const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoomSchema = new Schema({
    hostel: {type: mongoose.Schema.Types.ObjectId, ref: 'Hostel'},
    roomType: String,
    roomPrice: Number,
    roomStatus: {
       type : String,
        default: "Available"
    },
    roomImage: String,
    roomDescription: String,
    addedOn: {type: Date, default: Date.now}
})

module.exports = new mongoose.model('Room', RoomSchema)