const express = require('express');
// const Sequelize = require('sequelize');
const {Op} = require('sequelize')
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth');
const router = express.Router();


router.get('/users', async (req,res)=> {
    
    const users = await User.findAll()
    res.json(users)
})
router.get('/spots', async (req,res)=> {
    
    const spots = await Spot.findAll()
    res.json(spots)
})
router.get('/reviews', async (req,res)=> {
    
    const reviews = await Review.findAll()
    res.json(reviews)
})
router.get('/bookings', async (req,res)=> {
    
    const bookings = await Booking.findAll()
    res.json(bookings)
})
router.get('/reviewimages', async (req,res)=> {
    
    const reviewimages = await ReviewImage.findAll()
    res.json(reviewimages)
})
router.get('/spotimages', async (req,res)=> {
    
    const spotimages = await SpotImage.findAll()
    res.json(spotimages)
})

module.exports = router;