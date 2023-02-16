const userModel = require('./user.model.js')
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../Utilities/sendEmail.js');


// Sign Up user
const signUp = catchAsyncErrors(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        let newUser = new userModel(req.body);
        await newUser.save();
        const html = `<a href = "${req.protocol}://${req.headers.host}/api/v1/users/confirmEmail/${newUser._id}">Click Here To Confirm Email</a?`;
        sendEmail(newUser.email , html )
        console.log(newUser);
        res.status(200).json({ Email:newUser.email , message :  "Sign Up Successfully ...plz confirm your EMAIL..." });
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
    else if (!user.emailConfirmed){
        return next(new AppError(`First Confirm Your Email...`, 400));
    }
    let token = jwt.sign({ name : user.name , userId : user._id }, process.env.JWT_KEY);
    res.status(200).json({ token})


})

// Confirm Email
const confirmEmail = catchAsyncErrors(async (req, res , next) => {
    const userId = req.params.id;
    await userModel.findByIdAndUpdate(userId, { emailConfirmed: true });
    res.json({ message: "Email Has been Confirmed Successfully", })
})


// Authentication
const ProtectedRoutes = catchAsyncErrors(async(req,res , next)=>{
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

// Authorization
const AllowedTo = (...roles)=>{
    return catchAsyncErrors(async(req , res ,next)=>{
        if (!roles.includes(req.user.role)){
            return next(new AppError("You Are Not Authorized To Access This Route") , 401)
        }
        next();
    })
}


module.exports = {
    signUp,
    signIn,
    ProtectedRoutes,
    AllowedTo,
    confirmEmail
}