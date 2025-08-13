const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const verifyJWT = asyncHandler(async (req, __, next) => {
    try {
        
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");

        if(!token){
            throw new ApiError(401, "Unauthirized Request");
        }

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

        console.log("Decoded Token :- ", decodedToken);

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401, "Invalid access Token");
        }

        req.user = {
            _id : user._id,
        };

        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});


module.exports = verifyJWT; 