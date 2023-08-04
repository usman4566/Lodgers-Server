const UserModel = require('../Models/UserModel');
const otpModel = require('../Models/otpModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const controllerError = require('../utils/controllerError');
const key = process.env.SECRET_KEY
const Cryptr = require("cryptr");
const cryptr = new Cryptr(key);
const cloudinary = require('../Middlewares/Cloudinary');
const emailApi=process.env.EMAIL_API;
module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find();
        console.log(users);
        res.status(200).json({
            users,
        });
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
};
//register user

module.exports.registerUser = async (req, res, next) => {
    try {
        const {name,email, password,role} = req.body;
        const pic = await cloudinary.uploader.upload(req.file.path);
        const hash = await cryptr.encrypt(password);
        const user = new UserModel({
            name,
            email,
            password: hash,
            role,
            image: pic.secure_url,
        });

        user
            .save()
            .then((userData) => {
                res.status(201).json({
                    userData,
                });
            })
            .catch((err) => {
                controllerError(err, res, 'Error occurred');
            });
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
};
//update user
module.exports.updateUser = async (req, res, next) => {
    try {
        const { name, email, password,role } = req.body;
        const hash = await cryptr.encrypt(password);
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password: hash,
            role,
        }); 
        user
            .save()
            .then((userData) => {
                res.status(201).json({
                    userData,
                });
            })
            .catch((err) => {
                controllerError(err, res, 'Error occurred');
            }
            );
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
};
//get user by id
module.exports.getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user
            = await UserModel.findById
            (id);
        console.log(user);
        return res.status(201).json({
            user,
        });
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
};

module.exports.emailSend = async (req, res, next) => {
    let { email } = req.body;
    try {
        let data= await UserModel.findOne({email:email})
        if(data){
            const code = Math.floor(1000 + Math.random() * 9000);
            const otp = new otpModel({
                code: code,
                email: email,
                expireIn: Date.now() + 300000,
            });
            otp
                .save()
                .then((otpData) => {
                    mailer(email,code)
                    res.status(201).json({
                        otpData,
                        message: "Email sent successfully!",
                    });
                })
                .catch((err) => {
                    controllerError(err, res, 'Error occurred');
                });
        }else{
            res.status(201).json({
                message: "Email not found",
            });
        }
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
     
}
const mailer =(email,code)=>{
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(emailApi)
    const msg = {
      to: email, // Change to your recipient
      from: 'i190678@nu.edu.pk', // Change to your verified sender
      subject: 'OTP for change password ',
      text: 'This is your OTP for change password: '+code+'. Please do not share this with anyone',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
}

module.exports.changePassword = async (req, res, next) => {
    let data = await otpModel.find({ email: req.body.email, code: req.body.otp });
    // console.log(data)
    const response={}
    if (data) {
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        if (diff < 0) {
            response.message = "OTP Expired";
            res.status(201).json(response);
        } else {
            let user= await UserModel.findOne({email:req.body.email})
            const hash = await cryptr.encrypt(req.body.newPassword);
            user.password=hash
            user.save()
            .then((userData) => {
                res.status(201).json({
                    userData,
                    message: "Password changed successfully!"
                });
            })
            .catch((err) => {
                controllerError(err, res, 'Error occurred');
        });
            
        }
    }
    else{
        response.message = "OTP not found";
        res.status(201).json(response);
    }
}
