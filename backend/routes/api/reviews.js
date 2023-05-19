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
router.put('/:reviewId', requireAuth, validateReview, async (req,res)=> {
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

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res)=> {

    const currentUser = req.user.id;
    const reviewId = req.params.reviewId;

    const deleteReview = await Review.findByPk(reviewId);
    
    if(!deleteReview){
        res.statusCode=400;
        return res.json({"message" : "Review couldn't be found"})
    }else{
        if(deleteReview.userId !== currentUser){
            res.statusCode = 404;
            res.json({"message": "Require proper authorization: Review must belong to the current user"})
        } else {
            await deleteReview.destroy();
            res.json({ "message" : "Successfully deleted"})
        }
    }

})
// create/add an image for a review
router.post('/:reviewId/images', requireAuth, async (req, res)=> {
    const currentUser = req.user.id;
    const reviewId = req.params.reviewId;
    const {url} = req.body
   
    const newImg = await Review.findByPk(reviewId, {
        include: {model: ReviewImage}
    })
  if(!newImg){
    res.statusCode = 404;
    res.json({"message" : "Review couldn't be found"})
  }
  console.log(newImg.userId)
    if(newImg.userId !== currentUser){
        res.statusCode = 400;
        res.json({"message": "Require proper authorization: Review must belong to the current user"})
    } else {

        const addImg = await ReviewImage.findAll({
            where:{reviewId: reviewId}
        })
        if (addImg.length >= 10){
            res.statusCode= 403;
            res.json({ "message" : "Maximum number of images for this resource was reached"})
        } else {
            const newImg1 = await ReviewImage.create({
                reviewId,
                url
            })
            res.json({"id":newImg1.id, "url":newImg1.url})

        }
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