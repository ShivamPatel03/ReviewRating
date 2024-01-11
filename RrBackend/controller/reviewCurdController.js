const ReviewCurdSchema = require("../model/review_schema");

const addReview = async (req, res) => {
  const reviewData = new ReviewCurdSchema(req.body);
  try {
    if (reviewData != null) {
      await reviewData.save();
      res.status(201).json({
        status: true,
        message: "Review Add successfully...",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const getReview = async (req, res) => {
  const companyId = req.params.id;
  try {
    const reviewData = await ReviewCurdSchema.find({ company_id: companyId });
    res.status(200).json({
      status: true,
      message: reviewData,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const updateReviewCurd = async (req, res) => {
  const id = req.params.id;
  try {
    await ReviewCurdSchema.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      status: true,
      massage: "Review update successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      massage: err.message,
    });
  }
};

const deleteReviewCurd = async (req, res) => {
  const id = req.params.id;
  try {
    await ReviewCurdSchema.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      massage: "Review delete successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      massage: err.message,
    });
  }
};

module.exports = { addReview, updateReviewCurd, getReview, deleteReviewCurd };
