const { json } = require('body-parser')
const reviewCurdSchema = require('./reviewCrudSchema')

module.exports = {
    reviewCurdValidation : async (req,res,next) =>{
        const value = await reviewCurdSchema.reviewRating.
        validate(req.body, {abortsEarly : false })
        if(value.error)
        {
            res.json({
                success : true,
                message : value.error.details[0].message
            })
        }else{
            next()
        }
        
    }

}
