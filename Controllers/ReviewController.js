const Review = require("../Models/review");
const HostelModel = require('../Models/HostelModel');
const controllerError = require("../utils/controllerError");
const axios = require("axios");

const getRating = async (review,hostelId) => {
    await axios.post(`http://localhost:4000/predict`,
        //add review to the body
        {
            sentence: review
        }


    ).then((res) => {
        
        //update hostel rating according to the sentiment score recieved which is betwen 0 and 1
        const score = res.data.sentiment_score;
        console.log(score);
        const adjustment = score - 0.5;  // assume that a score of 0.5 is neutral
        const initial_rating = 3;
        let new_rating = initial_rating + adjustment;
        if(new_rating>5){
            new_rating=5;
        }
        if(new_rating<0){
            new_rating=0;
        }
        //upto 1 decimal place
        new_rating = Math.round(new_rating * 10) / 10;
        
        HostelModel.findByIdAndUpdate(hostelId, { $set: { ratings: new_rating } }, { new: true }, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc);
        }
        );
    }).catch((err) => {
        console.log(err);
    });
};

module.exports.addReview = async (req, res, next) => {

    try {
        console.log(req.body);
        const { review, user, hostel,name, email } = req.body;
        getRating(review,hostel);
        const newReview = new Review({
            review,
            user,
            hostel,
            name,
            email

        });
        newReview
            .save()
            .then((reviewData) => {
                res.status(201).json({
                    reviewData,
                });
            })
            .catch((err) => {
                controllerError(err, res, "Error occurred");
            });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
}

//get reviews by hostel
module.exports.getReviewsByHostel = async (req, res, next) => {
    const hostel = req.params.hostel;
    try {
        const reviews = await Review.find({ hostel: hostel });
        return res.status(200).json({
            reviews,
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
};

//delete review

