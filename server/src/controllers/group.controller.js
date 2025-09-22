const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/user.models.js');
const Group = require('../models/group.models');

const createGroup = asyncHandler(async (req,res) => {

    // console.log("Resqusdf a:- ", req);
    const { title , createdBy , members = []} = req.body;

    
    const findTitle = await Group.findOne({title});
    console.log("Title :- ", findTitle);
    if(findTitle) throw new ApiError(409, 'The Same Title group already exist');
    
    if(!title || !createdBy || !Array.isArray(members) || members.length === 0) {
        throw new ApiError(400 , "All Field Required");
    }
    members.push(createdBy);
    
    const newGroup = await Group.create({ title , createdBy , members});

    await User.updateOne(
        {_id : { $in : createdBy}},
        { $addToSet : {createdByGroups : newGroup._id}}
    );

    await User.updateMany(
        {_id : { $in : members }},
        { $addToSet : { groups : newGroup._id}}
    );

    return res.status(201).json(new ApiResponse(201 , newGroup , "Group created"));

});
 
const getAllGroup = asyncHandler(async (req,res) => {
    const group = await Group.find()
        .populate('createdBy' , 'FirstName LastName')
        .populate('members' , 'FirstName LastName position');

    return res.status(200).json(new ApiResponse(200, group ,"All group find successfully"));
});

const getGroupById = asyncHandler(async (req,res) => {
    const { groupID } = req.params;

    if(!groupID) throw new ApiError(400, 'Group ID required');

    const group = await Group.findById(groupID)
        .populate('createdBy' , 'FirstName LastName')
        .populate('members' , 'FirstName LastName position email')
        .populate({
            path: "tasks",
            select: "title description priority status dueDate createdBy assignTo",
            populate: [
              {
                path: "createdBy",
                select: "FirstName LastName",
              },
              {
                path: "assignTo",
                select: "FirstName LastName",
              },
            ],
          });

    if(!group) throw new ApiError(404, "Group Not Found");

    return res.status(200).json(new ApiResponse(200, group , "Group found successfully"));

})

const deleteGroup = asyncHandler(async (req,res) => {
    const { groupID } = req.params;

    if(!groupID) throw new ApiError(404, "Group ID required");

    const group = await Group.findById(groupID);
    if (!group) throw new ApiError(404, "Group not found");

    await Group.findByIdAndDelete(groupID);

    await User.findByIdAndUpdate(group.createdBy, {
        $pull : { createdByGroups : groupID }
    }); 

    await User.updateMany(
        { _id : { $in : group.members}},
        { $pull : { groups : groupID}}
    );

    return res.status(200).json(new ApiResponse(200, {} , "Group deleted successfully"));

});

const addMembers = asyncHandler(async (req,res) => {
    const { groupID , userID  = [] } = req.body;

    if(!groupID || !userID) throw new ApiError(400, "GroupID and UserId required");

    const group = await Group.findById(groupID);
    if(!group) throw new ApiError(404, "Group not found");

    const user = await User.findById(userID);
    if(!user) throw new ApiError(404, "User Not found");

    // await Group.findByIdAndUpdate(groupID, {
    //     $addToSet : {members :  userID } 
    // });

    await Group.findByIdAndUpdate(groupID, {
        $addToSet: { members: { $each: userID } }
    });
    await User.updateMany(
        { _id : { $in : userID} },
        { $addToSet : { groups : groupID} }
    );

    // await User.findByIdAndUpdate(userID , {
    //     $addToSet : { groups : groupID}
    // });

    const updatedGroup = await Group.findById(groupID)
        .populate('createdBy', 'FirstName LastName')
        .populate('members', 'FirstName LastName position');

    return res.status(200).json(new ApiResponse(200, updatedGroup, "Group Updated Successfully"));
});

const removeMembers = asyncHandler(async (req,res) => {
    const { groupID , userID = [] } = req.body;

    if(!groupID || !userID || !Array.isArray(userID) || userID.length === 0) throw new ApiError(400, "GroupID and UserId required");

    await Group.findByIdAndUpdate(groupID, {
        $pull : { members : { $in : userID}}
    })

    await User.updateMany(
        { _id : {$in : userID} },
        { $pull : { groups : groupID} }
    );

    const updatedGroup = await Group.findById(groupID)
        .populate("createdBy", "FirstName LastName")
        .populate("members", "FirstName LastName position");   
    
    return res.status(200).json(new ApiResponse(200, updatedGroup, "Members removed successfully"));
    
});

const getGroupMembers = asyncHandler(async (req,res) => {
    const { groupID } = req.params;
    if(!groupID) throw new ApiError(400, "Group ID required");
    const group = await Group.findById(groupID) 
        .populate("members", "FirstName LastName position");
    if(!group) throw new ApiError(404, "Group not found");
    const members = group.members;

    return res.status(200).json(new ApiResponse(200, members, "Group members fetched successfully"));
});

module.exports = {
    createGroup,
    getAllGroup,
    deleteGroup,
    getGroupById,
    addMembers,
    removeMembers,
    getGroupMembers
};