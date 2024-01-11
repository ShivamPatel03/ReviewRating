const express = require('express');
const userRouter = require('./userRoutes')
const companyRouter = require('./compnayRouter')
const reviewCurdRouter = require('./reviewCurdRoute')
const router = express.Router();

router.use('/user', userRouter)
router.use('/company', companyRouter)
router.use('/curd-review', reviewCurdRouter)

module.exports = router;
