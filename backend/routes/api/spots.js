const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const router = express.Router();


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {

    let userid = req.user.id
    const spotbyId = await Spot.findByPk(userid, {
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
        ]
    })
    res.json(spotbyId)
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
            { model: SpotImage, attributes:['id', 'url', 'preview'] },
         {model: User, attributes: ['id', 'firstName', 'lastName']},
         {model: Review, attributes: [] }
         
        ]
    })
   let spot = spotbyId.toJSON();
   console.log(spot)
    spot['Owner'] = spot['User'];
delete spot[ 'User' ];
console.log(spot)
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
    // console.log(spotList)

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

module.exports = router;