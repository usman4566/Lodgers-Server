const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
    
    },
    email: {
        type: String,
        
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    joinedOn: {
        type: Date,
        default: Date.now,
    },
    image:{
        type: String,
    }
});

module.exports = mongoose.model("User", userSchema);