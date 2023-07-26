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
    
    const deleteBooking = await Booking.findByPk((currentBooking), {
      include: [{model: Spot}],
    //   raw:true,
    })
    
    if(!deleteBooking){
        res.statusCode = 404;
        res.json({ "message": "Booking couldn't be found"})
    } else if (deleteBooking.userId == currentUser || deleteBooking.Spot.ownerId == currentUser){
        if(Date.parse(deleteBooking.startDate) > Date.now()){
            await deleteBooking.destroy();
            res.json({ "message": "Successfully deleted" })
        } else {
            res.statusCode = 403;
            res.json({
                "message":"Bookings that have been started can't be deleted"})
        }
    } else {
        res.statusCode= 403;
        res.json({"message": "Booking must belong to the current user or the Spot must belong to the current user"})

    }
})
    
// update a booking
router.put('/:bookingId', requireAuth, async (req, res)=> {
    const currentUser = req.user.id;
    const bookingId = req.params.bookingId;

    const {startDate, endDate} = req.body;
    // console.log(Date.now())
    if (Date.parse(startDate)> Date.parse(endDate)){
        res.statusCode = 400;
        return res.json( {"message": "endDate cannot come before startDate"})
    }

    const upDate = await Booking.findByPk(bookingId);
    

    if(!upDate){
        res.statusCode = 404;
        return res.json({ "message" : "Booking couldn't be found" })
    }

    if(upDate.userId !== currentUser){
        res.statusCode = 403;
        return res.json({"message": "Booking must belong to the current user"})
    }
    
    else if (Date.parse(upDate.endDate) < Date.now()){
        res.statusCode = 403;
        return res.json({"message": "Past bookings can't be modified" })
    }

    else if ((Date.parse(startDate)>= Date.parse(upDate.startDate)) && (Date.parse(startDate)<= Date.parse(upDate.endDate))){
        res.statusCode = 403;
        return res.json({"message": "Start date conflicts with an existing booking" })
    }
   else if ((Date.parse(endDate)>= Date.parse(upDate.startDate)) && (Date.parse(endDate)<= Date.parse(upDate.endDate))){
    res.statusCode = 403;
    return res.json({"message": "End date conflicts with an existing booking" })

   }else if ((Date.parse(startDate)< Date.parse(upDate.startDate)) && (Date.parse(endDate)> Date.parse(upDate.endDate))){
        res.statusCode = 403;
        return res.json({"message": "Start date and end date conflicts with an existing booking" })
   } else {
    upDate.startDate = startDate;
    upDate.endDate = endDate;
    upDate.save();
    res.json(upDate);
   }
   

   
   
})

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
        where: { userId: userId },
        include: { model: Spot, include: { model: SpotImage } }
    });
 
   if (!bookings.length) {
    res.json({"message": "The user has no bookings"});
   }

    let spotList = [];
    bookings.forEach(list => {
        spotList.push(list.toJSON())
    })
    // console.log(spotList[0].Spot.SpotImages[0].preview)

    spotList.forEach(ele => {
        // console.log('1', ele)
        ele.Spot.SpotImages.forEach(item => {
            
            if (item.preview === true) {
                spotList.forEach(element => {
                   
                    element.Spot.previewImage = item.url;
                })
            }
        })
    })
    spotList.forEach(ele => {
        delete ele.Spot.SpotImages
    })

    spotList.forEach(ele => {
        if(ele.startDate){          
            let start = ele.startDate;
            console.log(start)
            // ele.startDate = start.toJSON().split("T")[0]
        }
        if(ele.endDate){
            let end = ele.endDate;
            // ele.endDate = end.toJSON().split("T")[0]
        }
    })
   
    res.json({ Bookings: spotList })

})



module.exports = router;