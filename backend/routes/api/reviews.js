const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateReview = [
    check('review')
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
    check('stars')
    .exists({ checkFalsy: true })
    .isInt({min: 1, max: 5})
    .withMessage("Stars must be an integer from 1 to 5"), handleValidationErrors 
];



// Edit a Review
router.put('/:reviewId', validateReview, requireAuth, async (req,res)=> {
    const reviewId = req.params.reviewId;
    const currentUser = req.user.id;
    const { review, stars } = req.body;

    const editReview = await Review.findByPk(reviewId);

    if(!editReview){
        res.statusCode = 404;
        return res.json({"message":"Review couldn't be found"})
    } else if(currentUser !== editReview.userId){
        res.statusCode = 400;
        return res.json({
            "message":"Require proper authorization: Review must belong to the current user"
        })
    } else {
        editReview.review = review;
        editReview.stars = stars;
        editReview.save();
        res.Json(editReview)
    }

    
    
})


// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req,res,next)=> {
   const userid = req.user.id;

   const reviewById = await Review.findAll({
        where:{userId:userid},
   include: [
        {model: User, attributes: ['id','firstName', 'lastName']},
        {model: Spot, attributes:{exclude:['description', 'createdAt', 'updatedAt']}, include: {model: SpotImage}},
        {model: ReviewImage, attributes: ['id', 'url']},
       
             ]
   });

   let reviewList = [];
    reviewById.forEach(list => {
        reviewList.push(list.toJSON())
    })
   
    reviewList.forEach(list => {
        list.Spot.SpotImages.forEach(ele => {
            
                    if(ele.preview === true){
                        list.Spot.previewImage = ele.url
                    }                
          })
     })      
     reviewList.forEach(ele => {
          delete ele.Spot.SpotImages
      })
   res.json({Reviews: reviewList});
})










module.exports = router;