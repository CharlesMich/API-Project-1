const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingRouter = require('./bookings.js');
const spotImageRouter = require('./spot-images.js');
const reviewImageRouter = require('./review-images.js');  
const dataRouter = require('./data.js');

// GET /api/restore-user (test)
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter)

router.use('/bookings', bookingRouter);

router.use('/spot-images', spotImageRouter);

router.use('/review-images', reviewImageRouter);

router.use('/data', dataRouter);


// ... after `router.use('/api', apiRouter);`





// ------------------------------------

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});



// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// GET /api/set-token-cookie (test)
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// GET /api/require-auth (test)
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

module.exports = router;