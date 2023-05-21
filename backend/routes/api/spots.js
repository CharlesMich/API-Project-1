const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    currentSpot = req.params.spotId;
    currentUser = req.user.id;

    const { startDate, endDate } = req.body;

    const spotCheck = await Spot.findByPk(currentSpot);

    if (!spotCheck) {
        res.statusCode = 404;
        return res.json({ "message": "Spot couldn't be found" })
    }


    if (Date.parse(endDate) < Date.parse(startDate)) {
        res.statusCode = 400;
        return res.json({
            message: "Bad Request",
            errors: {
                endDate:
                    "endDate cannot be on or before startDate"
            }
        })
    }
    else if (spotCheck.ownerId == currentUser) {
        res.statusCode = 403;
        return res.json({ "message": "Owner cannot book his own Property" })
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

                res.statusCode = 403;
                return res.json({
                    "message": "Sorry, this spot is already booked for the specified dates"
                    ,
                    "errors": {
                        "startDate": "Start date conflicts with an existing booking"
                        ,
                        "endDate": "End date conflicts with an existing booking"
                    }
                })
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
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    // if not owner, only booking dates are visible
    let notOwner = await Spot.findByPk(req.params.spotId, {
        attributes: ["ownerId"],
    });

    let ownerIdJson = notOwner.toJSON().ownerId;

    if (ownerIdJson !== currentUserId) {
        let bookings = await Booking.findAll({
            where: { spotId: currentUserId },
            attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt'] }
        })
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
    // if (currentBookings) {
    //     if (currentUserId === currentBookings.ownerId) {
    //         const list = []
    //         list.push(currentBookings.User);
    //         list.push(currentBookings.Bookings)
    //         res.json({ "Bookings": list });
    //     } else {
    //         res.json({ "Bookings": currentBookings })
    //     }
    // } else {
    //     res.statusCode = 404;
    //     res.json({
    //         "message": "Spot couldn't be found"
    //     })
    // }


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


// Get details of a Spot from an id
router.get('/:id', async (req, res) => {

    const spotbyId = await Spot.findByPk(req.params.id, {

        attributes: {
            include: [
                [
                    Sequelize.fn("AVG", Sequelize.col("Reviews.stars")),
                    "avgStarRating"
                ],
                [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"]
            ],
        },
        group: ['Spot.id', 'SpotImages.id', 'User.id'],
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Review, attributes: [] }

        ]
    })

    if (!spotbyId) {
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found"
        })
    } else {


        let spot = spotbyId.toJSON();
        // console.log(spot.numReviews)
        spot['Owner'] = spot['User'];
        delete spot['User'];

        spot.numReviews = parseInt(spot.numReviews)
        res.json(spot)
    }
})

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {
    // Your code here

    const ownerId = req.user.id;


    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    // if (!address) {
    //     res.statusCode = 400
    //     return res.json({
    //         message: "Bad Request",
    //         error: "Street address is required"
    //     })
    // }
    // if (!city) {
    //     res.statusCode = 400
    //     return res.json({
    //         message: "Bad Request",
    //         error: "City is required"
    //     })
    // }
    // if (!state) {
    //     res.statusCode = 400
    //     return res.json({
    //         message: "Bad Request",
    //         error: "State is required"
    //     })
    // }
    // if (!country) {
    //     res.statusCode = 400
    //     return res.json({
    //         message: "Bad Request",
    //         error: "Country is required"
    //     })
    // }
    // if (!lat) {
    //     res.statusCode = 400
    //     return res.json({
    //         message: "Bad Request",
    //         error: "Latitude is not Valid"
    //     })
    // }
    // if (!lng) {
    //     res.statusCode = 400
    //     return res.json({
    //         message: "Bad Request",
    //         error: "Latitude is not valid"
    //     })
    // }
    // if (!name) {
    //     res.statusCode = 400
    //     return res.json({
    //         message: "Bad Request",
    //         error: "name is required"
    //     })
    // }
    // if (!description) {
    //     res.statusCode = 400
    //     return res.json({
    //         message: "Bad Request",
    //         error: "description is required"
    //     })
    // }
    // if (!price) {
    //     res.statusCode = 400
    //     return res.json({
    //         message: "Bad Request",
    //         error: "Price per day is required"
    //     })
    // }

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

    let pagination = {};
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
    let spots = {};
    spots.Spots = spotlist;
    spots.page = page;
    spots.size = size;



    res.json(spots)




})



// Add an Image to a Spot based on the Spot's id
// create an image for a spot

router.post('/:spotId/images', requireAuth, async (req, res) => {

    const { url, preview } = req.body;

    const userId = req.user.id;

    const spotId = req.params.spotId;

    const spotCheck = await Spot.findByPk(spotId);


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
router.post('/:spotId/reviews', requireAuth, async (req, res) => {

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
        spotReviewCheck.forEach(item => {

            if (item.userId == userId) {
                res.statusCode = 500;
                return res.json({ "message": "User already has a review for this spot" })
            }
        })

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
router.get('/:spotId/reviews', async (req, res) => {
    const spotId1 = req.params.spotId;

    const spotcheck = await Spot.findByPk(spotId1)
    const reviewsBySpot = await Review.findAll({
        where: { spotId: spotId1 },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    })

    if (!spotcheck) {
        res.statusCode = 404;
        res.json({ "message": "Spot couldn't be found" })
    } else if (!reviewsBySpot.length) {
        res.json({ "message": "There are no reviews for the spot" })
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
module.exports = router;