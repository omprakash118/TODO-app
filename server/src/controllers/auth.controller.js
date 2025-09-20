const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');
const User = require('../models/user.models.js');
const bcrypt = require('bcryptjs');
const { generateTokens } = require('../utils/generateToken.js');

const loginUser = asyncHandler(async (req,res) => {

    const { email , password} = req.body;

    if(!email) throw new ApiError(400, "Email is require");
    
    const user = await User.findOne({
        $or : [{email}]
    }).select("+password");


    if(!user) throw new ApiError(404, "User not Found");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) throw new ApiError(400, "Invalid credentials" );

    const tokens = await generateTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refereshToken");

    // console.log("Tokes om :- ", tokens);
    // console.log("Logged in user :- ", loggedInUser);
    

    return res
        .status(200)
        .cookie("accessToken" , tokens.accessToken)
        .cookie("refreshToken", tokens.refreshToken)
        .json(
            new ApiResponse(
                200,
                { user : loggedInUser , accessToken : tokens.accessToken, refreshToken : tokens.refreshToken , userId : loggedInUser._id },
                "User logged in successfully"
            )
        )

})


const registerUser = asyncHandler(async (req,res) => {

    const {
        FirstName,
        LastName,
        email,
        password
    } = req.body;

    const existUser = await User.findOne({
        $or : [{email}]
    })

    console.log("USERs :- ", req.body)

    if(existUser){
        throw new ApiError(409, "User with email or username already exits");
    }

    const user = await User.create({
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
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({
        message : 'Logout successfully'
    })
})


module.exports = {
    loginUser,
    registerUser,
    logout
}