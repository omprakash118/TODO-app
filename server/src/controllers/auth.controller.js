const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');
const User = require('../models/user.models.js');

const loginUser = asyncHandler(async (req,res) => {
    
    res.status(200).json({
        message : 'Hello bab from the loginuser'
    })

})


const registerUser = asyncHandler(async (req,res) => {

    const {
        FirstName,
        LastName,
        username,
        email,
        password
    } = req.body;

    const existUser = await User.findOne({
        $or : [{username}, {email}]
    })

    console.log("USERs :- ", req.body)

    if(existUser){
        throw new ApiError(409, "User with email or username already exits");
    }

    const user = await User.create({
        username : username.toLowerCase(),
        FirstName,
        LastName,
        email,
        password
    })

    const createUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createUser){
        throw new ApiError(500,"Somthing went wrong while creating user account");
    }

    return res.status(201).json(
        new ApiResponse(200, createUser , "User register successfully")
    )
});

const logout = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : 'Hello bab from the Logout'
    })
})


module.exports = {
    loginUser,
    registerUser,
    logout
}