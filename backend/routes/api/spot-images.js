const express = require('express');

const Sequelize = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:spotImageId', requireAuth, async (req, res)=> {

    const imageId = req.params.spotImageId;
    const currentUser = req.user.id;
    
    const deleteImage = await SpotImage.findByPk(imageId, {
        include: {model:Spot}
    });
    // console.log(deleteImage.Spot.ownerId)

    if(!deleteImage){
        res.statusCode = 404;
        res.json({"message":"Spot Image couldn't be found"})
    } else {
        if (deleteImage.Spot.ownerId !== currentUser){
            res.statusCode=400;
            res.json({"message": "Require proper authorization: Spot must belong to the current user"})
        } else {
            await deleteImage.destroy();
            res.json({"message" : "Successfully deleted"})
        }
    }
   
})

module.exports = router;