const userModel = require('./user.model.js')
const slugify = require("slugify")
const factory = require('../Handlers/handler.factory')
const AppError = require('../../Utilities/AppError')
const { catchAsyncErrors } = require('../../Utilities/catchAsync')



// create new user
const createUser = catchAsyncErrors(async (req, res, next) => {
    let isUser = await userModel.findOne({ email: req.body.email });
    if(!isUser){
        let newUser = new userModel(req.body);
        await newUser.save();
        res.status(200).json(newUser);
    }
    
    else{
        return next(new AppError(`User Already Exist`, 400));
    }
    
})




// get all Users
const getUsers = catchAsyncErrors(async (req, res, next) => {
    let Users = await userModel.find();
    if (!Users) {
        return next(new AppError(`Users Not Found`, 400));
    }
    res.status(200).json(Users);
})


// get user By ID 
const getUserByID = catchAsyncErrors(async (req, res, next) => {
    let user = await userModel.findById(req.params.id);
    if (!user) {
        return next(new AppError(`user Not Found`, 404));
    }
    res.status(200).json(user);
})


// update user
const updateUser = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    if (req.body.name) {
        req.body.slug = slugify(name);
    }

    req.body.image = req.file?.filename;
    let user = await userModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
        return next(new AppError(`user Not Found To Update`, 404));
    }
    res.status(200).json(user);
})

const changeUserPassword = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let user = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
        return next(new AppError(`user Not Found To Update`, 404));
    }
    res.status(200).json(user);
})

//delete user
const deleteUser = factory.deleteFun(userModel);





module.exports = {
    createUser,
    getUsers,
    getUserByID,
    updateUser,
    deleteUser,
    changeUserPassword
}