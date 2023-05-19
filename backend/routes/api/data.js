const express = require('express');
const Sequelize = require('sequelize');
const {Op} = require('sequelize')
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


router.get('/users', async (req,res)=> {
    res.json('Hi')
    const users = await User.findAll()
    res.json(users)
})


module.exports = router;