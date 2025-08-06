const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const asyncHandler = require('../utils/asyncHandler.js');

const loginUser = asyncHandler(async (req,res) => {
    
    res.status(200).json({
        message : 'Hello bab from the loginuser'
    })

})

const registerUser = asyncHandler(async (req,res) => {
    res.status(200).json({
        message : 'Hello bab from the register User'
    })
})

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