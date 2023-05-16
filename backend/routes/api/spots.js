const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const router = express.Router();


// Get all Spots owned by the Current User
router.get('/current', (req, res)=> {
let user = req.user;
console.log(user)
   })




// Get details of a Spot from an id
router.get('/:id', async (req, res)=> {

const spotbyId = await Spot.findByPk(req.params.id,{
include: {model:SpotImage}
})
res.json(spotbyId)
})





// Get all Spots

router.get('/', async (req, res)=> {
// return res.json('app is listening')
    const spots = await Spot.findAll({
        
        attributes: {
            include: [ 
                [
                  Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 
                  "avgRating"
                ], 
                // {"previewImage":  {model: SpotImage, attributes:['url']}}
            ],
          
           
        },
        include: [{
            model: Review, 
            attributes: [] 
        },
        {model: SpotImage, attributes:['url'], subQuery:false},
        

     {model: SpotImage, attributes:[]},
    ]
       
        //
    })
    // console.log(spots)
    res.json({Spots:spots})
})

module.exports = router;