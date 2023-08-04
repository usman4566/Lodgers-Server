const {registerUser, updateUser, getUserById,emailSend,changePassword,getUsers} = require('../Controllers/UserController');
const upload = require('../Middlewares/multer')
const router = require('express').Router();

router.post('/register-user',upload.single("image") , registerUser);
router.put('/update-user/:id', updateUser);
router.get('/get-user/:id', getUserById);
router.post("/email-send",emailSend)
router.post('/change-password', changePassword);
router.get('/get-users', getUsers);
module.exports = router;