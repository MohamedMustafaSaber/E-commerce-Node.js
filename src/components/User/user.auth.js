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
    let token = jwt.sign({ name : user.name , userId : user._id }, process.env.JWT_KEY);
    res.status(200).json({ token})


})

const protectedRoutes = catchAsyncErrors(async(req,res , next)=>{
    // 1. check if token is provided
    let token = req.headers.token;
    if(!token) return next(new AppError('Token is required' , 401))

    // 2. check if token is valid
    let decoded = await jwt.verify(token, process.env.JWT_KEY)
    
    // 3. check if token user Id is already exist
    let user = await userModel.findById(decoded.userId);
    if (!user) {
        return next(new AppError("User Not Exists" , 401))
    }

    // 4. check if password is changed --> Turn off all Tokens
    let changePasswordTime = parseInt(user.passwordChangedAt.getTime() / 1000)  // chabge password change time to seconds
    if(changePasswordTime > decoded.iat){
        return next(new AppError("Password changed"))
    }

    req.user = user ;
    next();
})


module.exports = {
    signUp,
    signIn,
    protectedRoutes
}