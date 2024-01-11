const joi= require('@hapi/joi')
joi.objectId= require('joi-objectid')(joi);

const ComapanyValschema = {
    companyRegister: joi.object({
       companyName : joi.string().min(3).max(50).required(),
       location : joi.string().required(),
       city : joi.string().required(),
       founded : joi.string().required(),
       // userId : joi.objectId().required()
    }).unknown(true),

    reviewAndRating: joi.object({
        subject : joi.string().min(2).max(150).required(),
        review : joi.string().required(),
        rating : joi.number().integer().min(1).max(5).required(),
        company_id : joi.objectId().required(),
        user_id : joi.objectId().required()
     }).unknown(true)

}



module.exports = ComapanyValschema