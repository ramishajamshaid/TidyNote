import { json } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'

const generateRefreshAndAccessToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        if(!user){
            throw new ApiError(401, "user not found")
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        

        user.refreshToken = refreshToken
        user.save({validateBeforeSave: false})

        return {
            accessToken, refreshToken
        }
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req,res)=>{
    console.log("Request Body: ", req.body);
    const {fullname, username, email, password} = req.body;
    

    if([fullname, username, email, password].some((field)=>field.trim()==="")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({$or: [{username}, {email}]})

    console.log("Existed User: ",existedUser);
    

    if(existedUser){
        throw new ApiError(409, "A user with this email or username already exists")
    }

    const avatarLocalPath = req.files.avatar?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar){
        throw new ApiError(400,"avatar file is required")
    }

    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
    })

    console.log("User: ", user);
    

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering a user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;    

    if(!email || !password){
        throw new ApiError(400, "Email or password is required")
    }
    const existedUser = await User.findOne({email})
    

    if(!existedUser){
        throw new ApiError(401, "user not found")
    }

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password)
    
    if(!isPasswordCorrect){
        throw new ApiError(402,"invalid credentials")
    }

    const {accessToken, refreshToken} = await generateRefreshAndAccessToken(existedUser._id)    
    
    const loggedInUser = await User.findById(existedUser._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {user: loggedInUser, accessToken, refreshToken} ,"User Logged In Successfully")
        )

})

const getUser = asyncHandler(async(req,res)=>{
    const userId = req.user?._id
    if(!userId){
        throw new ApiError(402, "unAuthorized Access")
    }

    const user = await User.findById(userId).select("-password -refreshToken")
    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "User details fetched successfully")
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh Token")
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: false
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(200,
                    { accessToken, newRefreshToken },
                    "Access Token Refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

export {generateRefreshAndAccessToken, registerUser, loginUser, getUser, refreshAccessToken}