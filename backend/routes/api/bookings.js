const express = require('express');
const Sequelize = require('sequelize');
const {Op} = require('sequelize')
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


// delete a booking
router.delete('/:bookingId', requireAuth, async (req, res)=> {
    const currentUser = req.user.id;
    const currentBooking = req.params.bookingId;
  
    const deleteBooking = await Booking.findByPk(currentBooking, {
      
        where:{[Op.or]: [{userId : currentUser}, { include: {model:Spot, ownerId :currentUser}}]},
        // include: {model: Spot, where:{ownerId: currentUser}}
    })
   
    if(!deleteBooking){
        res.statusCode = 404;
        res.json({ "message": "Booking couldn't be found"})
    } else {
        await deleteBooking.destroy();
        res.json({ "message": "Successfully deleted" })
    }
})

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
        where: { userId: userId },
        include: { model: Spot, include: { model: SpotImage } }
    });

    let spotList = [];
    bookings.forEach(list => {
        spotList.push(list.toJSON())
    })
    console.log(spotList[0].Spot.SpotImages[0].preview)

    spotList.forEach(ele => {
        // console.log('1', ele)
        ele.Spot.SpotImages.forEach(item => {
            console.log('2', item.preview)
            if (item.preview === true) {
                spotList.forEach(element => {
                    console.log(element)
                    element.Spot.previewImage = item.url;
                })
            }
        })
    })
    spotList.forEach(ele => {
        delete ele.Spot.SpotImages
    })
    res.json({ Bookings: spotList })

})



module.exports = router;