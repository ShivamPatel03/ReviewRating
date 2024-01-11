const mongoose= require('mongoose')

const companySchema = new mongoose.Schema({
  companyName:{
    type:String,
    require:true
  },
  location:{
    type:String,
    require: true,
    default: false
  },
  city:{
    type:String,
    require:true
  },
  founded:{
    type:String,
    require:true
  },
  isActive:{
    type: Boolean,
    default:true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  company_logo : {
    type:String,
  }
})
companySchema.set('timestamps',true)

module.exports = mongoose.model('company', companySchema)
