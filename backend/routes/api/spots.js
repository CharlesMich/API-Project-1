const express = require('express');
const Sequelize = require('sequelize');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { singleFileUpload, singleMulterUpload, multipleFilesUpload, } = require("../../awsS3");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {

    let yourSpots = await Spot.findAll({
        where: { ownerId: req.user.id }
    })
    let spotsList = []


    yourSpots.forEach(spot => {
        let spotObj = spot.toJSON()

        spotsList.push(spotObj)
    });

    //for loop to add avg rating to each spot
    for (let i = 0; i < spotsList.length; i++) {
        let spotId = spotsList[i]['id']
        // console.log(spotId)
        const starRating = await Review.findOne({
            where: { spotId: spotId },
            attributes: [
                [Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating"],
            ],
        });

        let reviewJson = starRating.toJSON();


        spotsList[i].avgRating = reviewJson.avgStarRating;
    }

    //for loop to add preview Image to each spot
    for (let i = 0; i < spotsList.length; i++) {
        let spotId = spotsList[i]["id"];
        // console.log(spotId);
        const spotImg = await SpotImage.findOne({
            where: {
                spotId: spotId,
                preview: true
            },
            attributes: [
                'url', 'preview'
            ],
        });

        if (!spotImg) spotsList[i].previewImage = "no preview image"

        if (spotImg) {
            let previewImg = spotImg.toJSON();
            spotsList[i].previewImage = previewImg.url;
        }


    }

    spotsList.forEach(ele => {
        if(ele.price){
            let item = ele.price;
            ele.price = parseInt(item)
        };
        if(ele.lat){
            let item = ele.lat;
            ele.lat = +item
        };
        if(ele.lng){
            let item = ele.lng;
            ele.lng = +item
        };
        if(ele.avgRating){
            let item = ele.avgRating;
            ele.avgRating = +item
        };
    })


    let spots = {}
    spots.Spots = spotsList


    res.json(spots)

    // let userid = req.user.id

    // const spotbyId = await Spot.findAll({
    //     where: { ownerId: userid },
    //     attributes: {
    //         include: [
    //             [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
    //         ],
    //     },
    //     group: ['Spot.id', 'SpotImages.id'],
    //     include: [
    //         { model: Review, attributes: [] },
    //         { model: SpotImage}
    //     ]
    // })

    // let spotList = [];
    // spotbyId.forEach(list => {
    //     spotList.push(list.toJSON())
    // })


    // spotList.forEach(list => {
    //     list.SpotImages.forEach(img => {
    //         if (img.preview === true) {

    //             list.previewImage = img.url
    //         }
    //     })

    // })
    // spotList.forEach(ele => {
    //     delete ele.SpotImages
    // })

    // res.json({ Spots: spotList })
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    currentSpot = req.params.spotId;
    currentUser = req.user.id;
    let { startDate, endDate } = req.body;
   startDate = startDate.split('T')[0];
   endDate = endDate.split('T')[0];
    const spotCheck = await Spot.findByPk(currentSpot);

    if (!spotCheck) {
        res.statusCode = 404;
        return res.json({ "message": "Spot couldn't be found" })
    }

    if (Date.parse(endDate) < Date.parse(startDate)) {

        const err = new Error('End date cannot be on or before start date');
        err.status = 400;
        // err.title = 'Booking failed';
        // err.errors = { "endDate": "endDate cannot be on or before startDate" };
        return next(err);
        // res.statusCode = 400;
        // return res.json({ "endDate": "endDate cannot be on or before startDate"
        // })
    }
    else if (spotCheck.ownerId == currentUser) {
        const err = new Error('Owner cannot book his own Property');
        err.status = 403;
        return next(err);
        // res.statusCode = 403;
        // return res.json({ "message": "Owner cannot book his own Property" })
    }

    const newBooking = await Booking.findAll({
        where: { spotId: currentSpot }
    });
    if (!newBooking) {
        const confirmBooking = await Booking.create({
            spotId: currentSpot,
            userId: currentUser,
            startDate,
            endDate
        })
        res.json(confirmBooking)
    } else {
        // console.log(newBooking.length)
        for (let i = 0; i < newBooking.length; i++) {
            // console.log(newBooking[i].startDate)
            if (Date.parse(newBooking[i].startDate) <= Date.parse(startDate) && Date.parse(startDate) <= Date.parse(newBooking[i].endDate) || Date.parse(newBooking[i].startDate) <= Date.parse(endDate) && Date.parse(endDate) <= Date.parse(newBooking[i].endDate)) {
                const err = new Error('Sorry, this spot is already booked for the specified dates');
                err.status = 403;
                return next(err);
                // res.statusCode = 403;
                // return res.json({
                    // "message": "Sorry, this spot is already booked for the specified dates"
                    // ,
                    // "errors": {
                    //     "startDate": "Start date conflicts with an existing booking"
                    //     ,
                    //     "endDate": "End date conflicts with an existing booking"
                    // }
                // })
            }
        }
        const confirmBooking = await Booking.create({
            spotId: currentSpot,
            userId: currentUser,
            startDate,
            endDate
        })
        res.json(confirmBooking);
    }
})

const validateupDate = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const currentSpot = req.params.spotId;
    currentUserId = req.user.id;

    const currentBookings = await Spot.findByPk(currentSpot)

    if (!currentBookings) {
       res.statusCode = 404;
       return res.json({"message": "Spot couldn't be found"})
    }

    // if not owner, only booking dates are visible
    let notOwner = await Spot.findByPk(currentSpot, {
        attributes: ["ownerId"],
    });

    let ownerIdJson = notOwner.toJSON().ownerId;
     
    if (ownerIdJson !== currentUserId) {
        let bookings = await Booking.findAll({
            where: { spotId: currentSpot },
            attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] }
        })

        // bookings.forEach(ele => {
        //     if(ele.startDate){   
                       
        //         let start = ele.startDate;
        //     }
        //     if(ele.endDate){
        //         let end = ele.endDate;
        //         // ele.endDate = end.toJSON().split("T")[0]
        //     }
        // })
        return res.json({ bookings });
    } else {
        // if owner of spot, they can see additional data on booker and booking
        let Bookings = await Booking.findAll({
            where: { spotId: req.params.spotId },
            include: {
                model: User,
                attributes: {
                    exclude: [
                        "username",
                        "hashedPassword",
                        "email",
                        "createdAt",
                        "updatedAt",
                    ],
                },
            },
        });
      
        
        return res.send({ Bookings });
    }
   

})

// Edit a Spot
router.put('/:spotId', requireAuth, validateupDate, async (req, res) => {
    const currentSpot = req.params.spotId;
    const userId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;


    const spotCheck = await Spot.findByPk(currentSpot, {
        where: { ownerId: userId }
    })
    if (!spotCheck) {
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found"
        })
    } else if (spotCheck.ownerId !== userId) {
        res.statusCode = 403;
        res.json({ "message": "Spot must belong to the user" })
    } else {

        spotCheck.address = address;
        spotCheck.city = city;
        spotCheck.state = state;
        spotCheck.country = country;
        spotCheck.lat = lat;
        spotCheck.lng = lng;
        spotCheck.name = name;
        spotCheck.description = description;
        spotCheck.price = price;
        spotCheck.save();
        res.json(spotCheck)
    }
})

// Get details of a Spot from an id 
router.get('/:spotId', async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId, {
      include: [
        {
          model: SpotImage,
          attributes: ["id", "url", "preview"],
        },
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
  
    if (!spot) {
      const err = new Error("Spot couldn't be found")
      err.status = 404
      next(err)
    }
  
    const numReviews = await Review.count({
     where: { spotId: spot.id }
    })
  
    
  
    const starRating = await Review.findOne({
      where: { spotId: spot.id },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("stars")), "avgStarRating",]]
    })
  
   
  
    let reviewJson = starRating.toJSON()
   
  
    let newSpot = spot.toJSON()
  
    newSpot.numReviews = numReviews
    newSpot.avgStarRating = reviewJson.avgStarRating
  
  
   
  
    // console.log(newSpot)
    res.json(newSpot)
  
  })
  

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {
    // Your code here

    const ownerId = req.user.id;


    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.statusCode = 201;
    res.json(newSpot)
})

// Get all Spots

router.get('/', async (req, res, next) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    let pagination = {
        // where:{}
    };
    page = parseInt(page);
    size = parseInt(size);

    if (!page) page = 1;
    if (!size) size = 20;
    if (page > 10) page = 10;
    if (size > 20) size = 20;

    if (page < 1) {
        const err = new Error("Page must be greater than or equal to 1");
        err.status = 400;
        return next(err)
    }

    if (size < 1) {
        const err = new Error("Size must be greater than or equal to 1")
        err.status = 400;
        return next(err)
    }

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    let allSpots = await Spot.findAll({
        ...pagination
    });

    let spotlist = [];

    allSpots.forEach(ele => {
        spotlist.push(ele.toJSON())
    })
    // console.log(spotlist)

    for (let i = 0; i < spotlist.length; i++) {
        let spotId = spotlist[i]['id'];
        const avgRating = await Review.findOne({
            where: { spotId: spotId },
            attributes: [
                [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"]
            ],

        });
        let parsedReview = avgRating.toJSON();
        spotlist[i].avgRating = parsedReview.avgRating;

    }

    for (let i = 0; i < spotlist.length; i++) {
        let spotId = spotlist[i]['id'];
        const spotImg = await SpotImage.findOne({
            where: {
                spotId: spotId,
                preview: true,
            },
            attributes: ['url', 'preview']
        });

        if (!spotImg) spotlist[i].previewImage = "no preview image";

        if (spotImg) {
            let previewImg = spotImg.toJSON();
            spotlist[i].previewImage = previewImg.url
        }
    }
    // parse numeric values
    spotlist.forEach(ele => {
        if(ele.price){
            let item = ele.price;
            ele.price = parseInt(item)
        };
        if(ele.lat){
            let item = ele.lat;
            ele.lat = +item
        };
        if(ele.lng){
            let item = ele.lng;
            ele.lng = +item
        };
        if(ele.avgRating){
            let item = ele.avgRating;
            ele.avgRating = +item
        };
    })
   
    let spots = {};
    spots.Spots = spotlist;
    spots.page = page;
    spots.size = size;



    res.json(spots)




})

// Add an Image to a Spot based on the Spot's id
// create an image for a spot


// router.post('/:spotId/images1', singleMulterUpload("image"), requireAuth, async (req, res)=>{
//     // const { url, preview } = req.body;
//     const { preview } = req.body;
//     const spotId = req.params.spotId;
//     const url = req.file? await singleFileUpload({file: req.file, public:true}): null;
//     const newImage = await SpotImage.create({
//         spotId,
//         url,
//         preview
//     })
//     const imageRes = newImage.toJSON();
//     res.json(imageRes);

// })
router.post('/:spotId/images', singleMulterUpload("url"), requireAuth, async (req, res) => {
    const { preview } = req.body;
    console.log('req.body', req.body, preview)
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const url = await singleFileUpload({file: req.file, public:true});
    const spotCheck = await Spot.findByPk(spotId);
    console.log('backendroute', url)
   
    if (!spotCheck) {
        res.statusCode = 404;
        return res.json({
            "message": "Spot couldn't be found"
        })
    } else {
        if (spotCheck.ownerId == userId) {
            const newImage = await SpotImage.create({
                spotId,
                url,
                preview
            })
            const imageRes = newImage.toJSON();
            
                delete imageRes['spotId'],
                delete imageRes['updatedAt'],
                delete imageRes['createdAt']
            res.json(
                imageRes
            )
        } else {
            res.statusCode = 403;
            return res.json({ "message": "Spot must belong to the current user" })
        }

    }
})


// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {

    const { review, stars } = req.body;
    if (!review) {
        res.statusCode = 400;
        return res.json({ "review": "Review text is required" })
    }
    if (!stars || stars > 5 || stars < 1 || !Number.isInteger(stars)) {
        res.statusCode = 400;
        return res.json({ "stars": "Stars must be an integer from 1 to 5" })
    }

    const spotId = req.params.spotId;
    const userId = req.user.id;


    const spotCheck = await Spot.findByPk(spotId)
    // if there is no spot

    if (!spotCheck) {
        res.statusCode = 404;
        return res.json({ "message": "Spot couldn't be found" })
    }
    // if there is a spot    
    if (spotCheck) {
        const spotReviewCheck = await Review.findAll({
            where: { spotId: spotId }
        })

        // check if there is a review for that spot/ if no, add a review;
        spotReviewCheck.forEach(item => {
            // if (reviewsOnSpot) {
            //     const err = new Error("User already has a review for this spot");
            //     err.status = 403;
            //     return next(err);
            //   }
            if (item.userId == userId) {
                res.statusCode = 500;
                return res.json({ "message": "User already has a review for this spot" })
            }
        })

        
        if (!spotReviewCheck) {
            const newReview = await Review.create({
                userId,
                spotId,
                review,
                stars
            })

            res.statusCode = 201;
            res.json(newReview)
        }
        // if there is a review, check if user has a review, if yes, send an error message
        spotReviewCheck.forEach(ele => {
            ele.toJSON()
        });

        const newReviews = await Review.create({
            userId,
            spotId,
            review,
            stars
        })

        res.statusCode = 201;
        res.json(newReviews)
    }
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId1 = req.params.spotId;

    const spotcheck = await Spot.findByPk(spotId1)
    const reviewsBySpot = await Review.findAll({
        where: { spotId: spotId1 },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    })

    if (!spotcheck) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err)
    } else if (!reviewsBySpot.length) {
        const err = new Error("There are no reviews for the spot")
        err.status = 404;
        return next(err)
    } else {
        res.json({ Reviews: reviewsBySpot })
    }
})

// delete a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const currentSpot = req.params.spotId;
    const currentUser = req.user.id;

    const deleteSpot = await Spot.findByPk(currentSpot)


    if (!deleteSpot) {
        res.statusCode = 404;
        return res.json({ "message": "Spot couldn't be found" })
    }

    const temp = deleteSpot.toJSON();
    if (temp.ownerId == currentUser) {
        await deleteSpot.destroy();
        res.json({ "message": "Successfully deleted" })
    } else {
        res.statusCode = 403;
        res.json({ "message": "Spot must belong to the user" })
    }


})

router.use((err, req, res, next) => {
    // console.log(err);
    res.status(err.status || 500)
    res.send({
      error: err.message,
    });
})
module.exports = router;