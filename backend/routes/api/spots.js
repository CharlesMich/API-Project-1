const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    currentSpot = parseInt(req.params.spotId);
    currentUser = req.user.id;
    console.log(currentUser)

    const { startDate, endDate } = req.body;

    if (endDate < startDate) {
        res.statusCode = 400;
        return res.json({
            message: "Bad Request",
            errors: {
                endDate:
                    "endDate cannot be on or before startDate"
            }
        })
    }

    const spotCheck = await Spot.findByPk(currentSpot);

    if (!spotCheck) {
        res.statusCode = 404;
        return res.json({ "message": "Spot couldn't be found" })
    }
    if (spotCheck.ownerId == currentUser) {
        res.statusCode = 400;
        return res.json({ "message": "Owner cannot book his own Property" })
    }

    const checkBooking = await Booking.findAll({
        where: { spotId: currentSpot }
    })
    const newArr = []
    console.log(checkBooking)
    checkBooking.forEach(ele => {
        console.log(ele.dataValues)
        newArr.push(ele.dataValues)
    })
    console.log('new', newArr)

    for (let key of newArr) {
        if ((key.startDate < startDate && key.endDate > startDate) || (key.startDate < endDate && key.endDate > endDate)) {
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
        } else {
            const confirmBooking = await Booking.create({
                spotId: currentSpot,
                userId: currentUser,
                startDate,
                endDate

            })
            res.json(confirmBooking)
        }

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
        .isNumeric()
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isNumeric()
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
router.get('/:spotId/bookings', requireAuth, async (req, res) => {



    const currentSpot = req.params.spotId;
    currentUserId = req.user.id;
    const currentBookings = await Spot.findByPk(currentSpot, {
        include: [{ model: Booking }, { model: User }]
    })
    if (currentBookings) {
        if (currentUserId === currentBookings.ownerId) {
            const list = []
            list.push(currentBookings.User);
            list.push(currentBookings.Bookings)
            res.json({ "Bookings": list });
        } else {
            res.json({ "Bookings": currentBookings })
        }
    } else {
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found"
        })
    }


})



// Edit a Spot
router.put('/:spotId', validateupDate, requireAuth, async (req, res) => {
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
        res.statusCode = 400;
        res.json({ "message": "Spot must belong to the current User" })
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
router.get('/current', requireAuth, async (req, res) => {

    let userid = req.user.id

    const spotbyId = await Spot.findAll({
        where: { ownerId: userid },
        attributes: {
            include: [
                [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
            ],
        },
        group: ['Spot.id', 'SpotImages.id'],
        include: [
            { model: Review, attributes: [] },
            { model: SpotImage }
        ]
    })

    let spotList = [];
    spotbyId.forEach(list => {
        spotList.push(list.toJSON())
    })


    spotList.forEach(list => {
        list.SpotImages.forEach(img => {
            if (img.preview === true) {

                list.previewImage = img.url
            }
        })

    })
    spotList.forEach(ele => {
        delete ele.SpotImages
    })

    res.json({ Spots: spotList })
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

        spot['Owner'] = spot['User'];
        delete spot['User'];

        res.json(spot)
    }
})

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {
    // Your code here

    const ownerId = req.user.id;


    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (!address) {
        res.statusCode = 400
        return res.json({
            message: "Bad Request",
            error: "Street address is required"
        })
    }
    if (!city) {
        res.statusCode = 400
        return res.json({
            message: "Bad Request",
            error: "City is required"
        })
    }
    if (!state) {
        res.statusCode = 400
        return res.json({
            message: "Bad Request",
            error: "State is required"
        })
    }
    if (!country) {
        res.statusCode = 400
        return res.json({
            message: "Bad Request",
            error: "Country is required"
        })
    }
    if (!lat || isNaN(lat)) {
        res.statusCode = 400
        return res.json({
            message: "Bad Request",
            error: "Latitude is not Valid"
        })
    }
    if (!lng || isNaN(lat)) {
        res.statusCode = 400
        return res.json({
            message: "Bad Request",
            error: "Latitude is not valid"
        })
    }
    if (!name) {
        res.statusCode = 400
        return res.json({
            message: "Bad Request",
            error: "name is required"
        })
    }
    if (!description) {
        res.statusCode = 400
        return res.json({
            message: "Bad Request",
            error: "description is required"
        })
    }
    if (!price) {
        res.statusCode = 400
        return res.json({
            message: "Bad Request",
            error: "Price per day is required"
        })
    }

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

router.get('/', async (req, res) => {
    // return res.json('app is listening')
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [
                    Sequelize.fn("AVG", Sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
            ],

        },
        group: ['Spot.id', 'SpotImages.id'],
        include: [{
            model: Review,
            attributes: []
        },
        {
            model: SpotImage,
            // attributes:[]
        }
        ]
    })

    let spotList = [];
    spots.forEach(list => {
        spotList.push(list.toJSON())
    })


    spotList.forEach(list => {
        list.SpotImages.forEach(img => {
            if (img.preview === true) {

                list.previewImage = img.url
            }
        })

    })
    spotList.forEach(ele => {
        delete ele.SpotImages
    })

    res.json({ spots: spotList })
})

// Add an Image to a Spot based on the Spot's id
// create an image for a spot

router.post('/:spotId/images', requireAuth, async (req, res) => {

    const { url, preview } = req.body;


    const spotId = req.params.spotId;

    const spotCheck = await Spot.findByPk(spotId);
    if (spotCheck) {
        const newImage = await SpotImage.create({
            spotId,
            url,
            preview
        })
        const imageRes = newImage.toJSON();
        console.log(imageRes)
        delete imageRes['spotId'],
            delete imageRes['updatedAt'],
            delete imageRes['createdAt']
        res.json(
            imageRes
        )
    } else {
        res.statusCode = 404;
        res.json({
            "message": "Spot couldn't be found"
        })
    }

})


// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {

    const { review, stars } = req.body;
    if (!review) {
        res.statusCode = 400;
        return res.json(
            {
                "message": "Bad Request",
                "errors": { "review": "Review text is required" }
            }
        )
    }
    if (!stars || stars > 5 || stars < 1 || !Number.isInteger(stars)) {
        res.statusCode = 400;
        return res.json(
            {
                "message": "Bad Request",
                "errors": { "stars": "Stars must be an integer from 1 to 5" }
            }
        )
    }

    const spotId = req.params.spotId;
    const userId = req.user.id;


    const spotCheck = await Spot.findByPk(spotId)
// if there is no spot

    if (!spotCheck) {
        res.statusCode = 400;
        return res.json({ "message": "Spot couldn't be found" })
    }    
    // if there is a spot    
    if (spotCheck){
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
            ele.toJSON()});
            spotReviewCheck.forEach(item => {
                console.log('item.userId', item.userId)
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
    const SpotId1 = req.params.spotId;
    const reviewsBySpot = await Review.findAll({
        where: { SpotId: SpotId1 },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: ReviewImage, attributes: ['id', 'url'] }

        ]
    })


    res.json({ Reviews: reviewsBySpot })
})

// delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const currentSpot = req.params.spotId;
    const currentUser = req.user.id;

    const deleteSpot = await Spot.findByPk(currentSpot)


    if (!deleteSpot) {
        res.statusCode = 400;
        res.json({ "message": "Spot couldn't be found" })
    }

    const temp = deleteSpot.toJSON();
    if (temp.ownerId == currentUser) {
        await deleteSpot.destroy();
        res.json({ "message": "Successfully deleted" })
    } else {
        res.statusCode = 404;
        res.json({ "message": "Require proper authorization: Spot must belong to the current user" })
    }

})
module.exports = router;