const {addReview, getReviewsByHostel} = require('../Controllers/ReviewController');

const router = require('express').Router();

router.post('/add-review', addReview);
router.get('/get-reviews/:hostel', getReviewsByHostel);

module.exports = router