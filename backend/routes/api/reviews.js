const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req,res,next)=> {
   const userid = req.user.id;

   const reviewById = await Review.findByPk(userid,{
   include: [{model: User, attributes: ['id','firstName', 'lastName']},
           {model: Spot}]


   });
   

   res.json({"Reviews":[reviewById]});
})



router.get




module.exports = router;