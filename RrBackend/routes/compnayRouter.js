const express = require('express')
const {upload} = require('../middlewares/imageStorage')
const company = require('../controller/companyController')
const validate = require('../validation/company/company_validation')
const router = express.Router();
const auth = require('../middlewares/auth_middleware')
const {IsUser,IsAdmin} = require('../middlewares/autherize')

// router.post('/create', validate.companyValidation,upload.single("company_logo"),company.createCompany)
//router.post('/create', auth.checkUserAuth ,company.createCompany)
router.post('/create',upload.single("company_logo"),company.createCompany)
router.get('/list' ,company.companyList);
// router.get('/list',IsUser, company.companyList);
router.post('/company_review', validate.reviewValidation,company.reviewAndRating);
router.get('/details/:id', company.comapnyReviewComment)

module.exports = router;
