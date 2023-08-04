const HostelModel = require('../Models/HostelModel');
const controllerError = require('../utils/controllerError');
const cloudinary = require('../Middlewares/Cloudinary');
// module.exports.addHostel = async (req, res, next) => {
//     try {
//       console.log(req.body);
//         const { name, description, owner,longitude,latitude} = req.body;

//         const pic = await cloudinary.uploader.upload(req.file.path);
//        //const pic=await cloudinary.uploader.upload(image)
//         const hostel = new HostelModel({
//             name,
//             location: {
//                 type: 'Point',
//                 coordinates: [parseFloat(longitude), parseFloat(latitude)]
//             },

//             description,
//             image: pic.secure_url,
//             // ratings,
//             owner
//         });

//         hostel
//             .save()
//             .then((hostelData) => {
//                 res.status(201).json({
//                     hostelData
//                 });
//             })
//             .catch((err) => {
//                 controllerError(err, res, 'Error occurred');
//             });
//     } catch (error) {
//         controllerError(error, res, 'Error occurred');
//     }
// };
//add hostel with features
module.exports.addHostel = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, description, owner,longitude,latitude,wifi, parking,kitchen,tv, laundry,security,city,singleroom,doublebedroom,threebedroom,attachbath,airconditioned} = req.body;
        const pic = await cloudinary.uploader.upload(req.file.path);
        //const pic=await cloudinary.uploader.upload(image)
        const hostel = new HostelModel({
            name,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },

            description,
            image: pic.secure_url,
            // ratings,
            owner,
            features: {
                wifi: wifi,
                parking: parking,
                food: kitchen,
                tv: tv,
                security: security,
                laundry: laundry,
                singleroom: singleroom,
                doublebedroom: doublebedroom,
                threebedroom: threebedroom,
                attachbath: attachbath,
                airconditioned: airconditioned,
            },

            city,
        });

        hostel
            .save()
            .then((hostelData) => {
                res.status(201).json({
                    hostelData
                });
            })
            .catch((err) => {
                controllerError(err, res, 'Error occurred');
            });
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
};

//get hostels
module.exports.getHostels = async (req, res, next) => {
    try {
        const hostels = await HostelModel.find();
        return res.status(200).json({
            hostels
        });
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
};
module.exports.getHostelsByOwner = async (req, res, next) => {
    const owner = req.params.owner;
    try {
        const hostels = await HostelModel.find({owner: owner});
        return res.status(200).json({
            hostels
        });
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
};
//delete hostel
module.exports.deleteHostel = async (req, res, next) => {
    try {
        const hostelId = req.params.id;
        const hostel = await HostelModel.findById(hostelId);
        if (!hostel) {
            return res.status(404).json({
                message: 'Hostel not found'
            });
        }
        await hostel.remove();
        return res.status(200).json({
            message: 'Hostel deleted successfully'
        });
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
};
module.exports.getHostelsById = async (req, res, next) => {
    console.log("calling")
    try {
        const hostels = await HostelModel.findById({_id:req.query._id});
        console.log(hostels);
        return res.send(hostels);
    } catch (error) {
        controllerError(error, res, 'Error occurred');
    }
};