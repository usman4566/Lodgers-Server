const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    code:{
        type: String,
    },
    email:{
        type: String,
    },
    expireIn: {
        type: Number,
    }

    
});

module.exports = mongoose.model("otp", otpSchema);