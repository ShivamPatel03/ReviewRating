const express = require('express')
const router = express.Router()
const reviewValidation = require('../validation/reviewCurd/reviewCurdValidation')
const addReviewCurd = require('../controller/reviewCurdController')
const auth = require('../middlewares/auth_middleware')


router.post('/create',reviewValidation.reviewCurdValidation, auth.checkUserAuth ,addReviewCurd.addReview);
router.get('/show-review/:id', auth.checkUserAuth, addReviewCurd.getReview)
router.patch('/update-review/:id', reviewValidation.reviewCurdValidation, auth.checkUserAuth,
addReviewCurd.updateReviewCurd)

module.exports = router;
