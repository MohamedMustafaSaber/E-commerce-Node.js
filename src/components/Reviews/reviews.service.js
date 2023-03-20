const ReviewModel = require('./reviews.model.js')
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')
const factory = require('../Handlers/handler.factory')







// create new Review
const createReview = catchAsyncErrors(async (req, res, next) => {
    const isReviewed = await ReviewModel.findOne({user:req.user._id , product:req.body.product});
    if(isReviewed) {
        next(new AppError('You are create review for this product before'))
    }
    let newReview = new ReviewModel(req.body);
    await newReview.save();
    if (!newReview) {
        return next(new AppError(`can not create New Review`, 400));
    }
    res.status(200).json(newReview);
})




// get All Reviews
const getReviews = catchAsyncErrors(async (req, res, next) => {
    let Reviews = await ReviewModel.find({});
    if (!Reviews) {
        return next(new AppError(`Reviews Not Found`, 400));
    }
    res.status(200).json(Reviews);
})


// get Review By ID 
const getReviewyByID = catchAsyncErrors(async (req, res, next) => {
    let Review = await ReviewModel.findById(req.params.id);
    if (!Review) {
        return next(new AppError(`Review Not Found`, 404));
    }
    res.status(200).json(Review);
})


// update Review
const updateReview = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let review = await ReviewModel.findById(id);
    if (review.user._id.toString() == req.user._id.toString() ){
        let updatedReview = await ReviewModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedReview) {
            return next(new AppError(`Review Not Found To Update`, 404));
        }
        res.status(200).json(updatedReview);
    }
    else{
        next(new AppError(`You Can not update this Review`, 404));
    }
})


//delete subCategory
const deleteReview = factory.deleteFun(ReviewModel);




module.exports = {
    createReview,
    getReviews,
    getReviewyByID,
    updateReview,
    deleteReview
}