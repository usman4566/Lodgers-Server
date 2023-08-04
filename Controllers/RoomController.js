const RoomSchema = require('../Models/RoomModel')
const controllerError = require('../utils/controllerError')
const cloudinary = require('../Middlewares/Cloudinary');
module.exports.getRooms = async (req, res, next) => {
    try {
        const rooms = await RoomSchema.find()
        return res.status(200).json({
            rooms
        })
    } catch (error) {
        controllerError(error, res, 'Error occurred')
    }
}

module.exports.getRoomByHostel = async (req, res, next) => {
    const id = req.params.id
    try {
        const room = await RoomSchema.find({ hostel: id })
        return res.status(200).json({
            room
        })
    } catch (error) {
        controllerError(error, res, 'Error occurred')
    }
}

module.exports.addRoom = async (req, res, next) => {
    console.log(req.body)
    try {
       
        const { hostel, roomNumber, roomType, roomPrice, roomDescription } = req.body
        const pic = await cloudinary.uploader.upload(req.file.path)
        
        const room = new RoomSchema({
            hostel,
            roomNumber,
            roomType,
            roomPrice,
            roomImage: pic.secure_url,
            roomDescription
        })
        room
            .save()
            .then((roomData) => {
                res.status(201).json({
                    roomData
                })
            })
            .catch((err) => {
                controllerError(err, res, 'Error occurred')
            })
    } catch (error) {
        controllerError(error, res, 'Error occurred')
    }
}

module.exports.updateRoom = async (req, res, next) => {
    const id = req.params.id
    try {
        const room = await RoomSchema.findById(id)
        if (room) {
            room.roomNumber = req.body.roomNumber || room.roomNumber
            room.roomType = req.body.roomType || room.roomType
            room.roomPrice = req.body.roomPrice || room.roomPrice
            room.roomStatus = req.body.roomStatus || room.roomStatus
            room.roomImage = req.body.roomImage || room.roomImage
            room.roomDescription = req.body.roomDescription || room.roomDescription
            const updatedRoom = await room.save()
            res.json(updatedRoom)
        } else {
            res.status(404)
            throw new Error('Room not found')
        }
    } catch (error) {
        controllerError(error, res, 'Error occurred')
    }
}

module.exports.deleteRoom = async (req, res, next) => {
    const id = req.params.id
    try {
        const room = await RoomSchema.findById (id)
        if (room) {
            await room.remove()
            res.json({ message: 'Room removed' })
        }
    } catch (error) {
        controllerError(error, res, 'Error occurred')
    }
}


