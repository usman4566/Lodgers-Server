const {addRoom, getRoomByHostel, getRooms, updateRoom} = require('../Controllers/RoomController')
const upload = require('../Middlewares/multer')
const router = require('express').Router()
router.get('/get-rooms', getRooms)
router.get('/get-rooms/:id', getRoomByHostel)
router.post('/add-rooms',upload.single("roomImage") ,addRoom)
router.put('/update-room/:id', updateRoom)

module.exports = router