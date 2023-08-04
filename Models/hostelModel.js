const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HostelSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    image: String,
    name: String,
    description: String,
    price: Number,
   
    addedOn: {type: Date, default: Date.now},
    location: {
        type: {type: String, default: 'Point'}, 
        coordinates: {type: [Number], default: [0, 0]}
    },
    ratings: {type: Number, default: 0},
    totalRooms: Number,
    features: {
        wifi: {type: Boolean, default: false},
        parking: {type: Boolean, default: false},
        security: {type: Boolean, default: false},
       // ac: {type: Boolean, default: false},
        tv: {type: Boolean, default: false},
        food: {type: Boolean, default: false},
        laundry: {type: Boolean, default: false},
       // gym: {type: Boolean, default: false},
       singleroom: {type: Boolean, default: false},
        doublebedroom: {type: Boolean, default: false},
        threebedroom: {type: Boolean, default: false},
       // ac: {type: Boolean, default: false},
        attachbath: {type: Boolean, default: false},
        airconditioned: {type: Boolean, default: false},
        
    },
    city: {
        type: String,
    }
    
    //roomsMap: {type: Map, of: String, required: true}
})
HostelSchema.index({location: '2dsphere'})
module.exports = new mongoose.model('Hostel', HostelSchema)