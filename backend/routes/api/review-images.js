const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.delete('/:reviewImageId', requireAuth, async (req, res)=> {

    const reviewImageId = req.params.reviewImageId;
    const currentUser = req.user.id;

    const deleteRevImg = await ReviewImage.findByPk(reviewImageId, {
        include: {model: Review}
    })
    console.log(deleteRevImg.Review)
    if(!deleteRevImg){
        res.statusCode = 404;
        return res.json({"message" : "Review Image couldn't be found"})
    } else {
        if(deleteRevImg.Review.userId !== currentUser){
            res.statusCode= 400;
            return res.json({"message": "Require proper authorization: Review must belong to the current user"})
        } else {
            await deleteRevImg.destroy();
            res.statusCode=400;
            res.json({ "message" : "Successfully deleted"})
        }
    }


})

module.exports = router;