const Company = require("../model/company_schema");
const ReviewAndRating = require("../model/review_schema");

const createCompany = async (req, res) => {
  let company = req.body;
  let companyName = company.companyName;
  console.log('companyName "', companyName);
  try {
    const companySchema = new Company(company);
    if (companySchema) {
      const companyExists = await Company.findOne({ companyName: companyName });
      if (companyExists) {
        return res.status(400).json({
          success: false,
          error: "Company name already exists",
        });
      }
      const filePath = `/uploads/${req.file.filename}`;
      companySchema.company_logo = filePath;
      await companySchema.save();
      res.status(201).json({
        success: true,
        message: "Company data save successfully",
      });
    } else {
      res
        .status(403)
        .json({ success: "failure", error: "Company data is Empty " });
    }
  } catch (error) {
    res.status(500).json({ success: "failure", error: error.message });
  }
};

const reviewAndRating = async (req, res) => {
  try {
    const reviewData = new ReviewAndRating(req.body);
    await reviewData.save();
    return res.status(200).json({
      success: true,
      message: "Review data inserted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: "failure", error: err.message });
  }
};

const companyList = async (req, res) => {
  try {
    const companyList = await Company.find();
    const totalCompany = await Company.find().count();
    res.status(200).json({
      success: true,
      message: "All company found successfully!",
      count: totalCompany,
      companies: companyList,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const comapnyReviewComment = async (req, res) => {
  let id = req.params.id;
  // console.log('*** Details id: ',id)
  try {
    const companyDetails = await Company.findById(id).lean();
    const comment = await ReviewAndRating.find({ company_id: `${id}` })
      .populate({
        path: "user_id",
        select: "name profilepic",
      })
      .populate({
        path: "company_id",
        select: "_id",
      });
    const commentsAndCompanyName = {
      companyDetails: companyDetails,
      comments: comment,
    };
    // res.contentType('image/jpeg');
    return res.status(200).json({
      compDetails: commentsAndCompanyName,
      status: true,
      message: "Company details find successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createCompany,
  companyList,
  reviewAndRating,
  comapnyReviewComment,
};
