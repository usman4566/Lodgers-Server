const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    review: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    },

    
});

module.exports = mongoose.model("Review", reviewSchema);