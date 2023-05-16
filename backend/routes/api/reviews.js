const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const router = express.Router();

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