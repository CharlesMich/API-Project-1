const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const router = express.Router();


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {

    let userid = req.user.id
   
    const spotbyId = await Spot.findAll({
        where:{ownerId: userid},
        attributes: {
            include: [
                [ Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
            ],
        },
        include: [ 
            {model: Review, attributes: []},
            {model: SpotImage}
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