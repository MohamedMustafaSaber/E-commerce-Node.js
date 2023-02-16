const userModel = require('./user.model.js')
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Sign Up user
const signUp = catchAsyncErrors(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        let newUser = new userModel(req.body);
        await newUser.save();
        res.status(200).json(newUser);
    }

    else {
        return next(new AppError(`User Already Exist`, 400));
    }

})

// Sign in user
const signIn = catchAsyncErrors(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new AppError(`Incorrect Email or Password`, 400));
    }
    let token = jwt.sign({ name : user.name , userId : user._ifd }, process.env.JWT_KEY);
    res.status(200).json({ token})


})




module.exports = {
    signUp,
    signIn
}