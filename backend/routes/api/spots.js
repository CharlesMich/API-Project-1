const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const router = express.Router();


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

    res.json({ spots: spotList })
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
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: Review, attributes: [] }

        ]
    })
    let spot = spotbyId.toJSON();

    spot['Owner'] = spot['User'];
    delete spot['User'];

    res.json(spot)
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
    let spotId = parseInt(req.params.spotId);
   
    const userId = req.user.id;
   
    

    const spotCheck = await Spot.findByPk(spotId)

    const { review, stars } = req.body;

    // if(!review){
    //     res.statusCode = 400;
    //     return res.json(
    //         {"message" : "Bad Request",
    //         "errors": {"review":"Review text is required"}
    //     }
    //         )
    // }
    // if(!stars || stars > 5 || stars < 1 || !Number.isInteger(stars)){
    //     res.statusCode = 400;
    //     return res.json(
    //         {"message" : "Bad Request",
    //         "errors": {"stars": "Stars must be an integer from 1 to 5"}
    //     }
    //         )
    // }

    if (spotCheck) {

        if(!review){
            res.statusCode = 400;
            return res.json(
                {"message" : "Bad Request",
                "errors": {"review":"Review text is required"}
            }
                )
        }
        if(!stars || stars > 5 || stars < 1 || !Number.isInteger(stars)){
            res.statusCode = 400;
            return res.json(
                {"message" : "Bad Request",
                "errors": {"stars": "Stars must be an integer from 1 to 5"}
            }
                )
        }
        const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
        })

        res.statusCode = 201;
        res.json(newReview)
    } else {
        res.statusCode = 404;
        return res.json({
            "message": "Spot couldn't be found"
        })
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


module.exports = router;