const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Booking = require("./Models/bookingModel");

const url = process.env.MONGO_URI

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(express.json({limit: '50mb', extended: true}));
app.use(cors());

app.use("/", require("./Routes/AdminRoutes"));
app.use("/", require("./Routes/HostelRoutes"));
app.use("/", require("./Routes/UserRoutes"));
app.use("/", require("./Routes/RoomRoutes"));
app.use("/", require("./Routes/ReviewRoutes"));
app.use("/", require("./Routes/BookingRoutes"));
//implement stripe payment
const stripe = require('stripe')('sk_test_51MYkFEL77mu1NJWW23h5up7RTFPp8zqNLvsZizGTTAJReZYFT4WRawlxBNKHiwlLCToUFXW7irpNG1R4BuviHKOv00qWalSc53');
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.


app.post('/create-payment-intent', async (req, res) => {
  const { amount, bookingId, cutomer, owner } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
    setup_future_usage: 'off_session',
  });

  const booking = await Booking.findByIdAndUpdate(bookingId, {paid: true});

  res.send({
    clientSecret: paymentIntent.client_secret,
    id: paymentIntent.id,
  });
});

// 
//Database and server created
const PORT = process.env.PORT || 5000;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Error occurred");
  });


