import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body

    // TODO: get video, upload to cloudinary, create video

    // Get video details from frontend
    // validation - not empty
    // check for videoFile and thumbnail 
    // upload them to cloudinary
    // create video object - create entry in db
    // check for video creation
    // return res

    if([title, description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const videoLocalPath = req.files?.videoFile[0]?.path;
    
    let thumbnailLocalPath;

    if (req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
        thumbnailLocalPath = req.files.thumbnail[0].path
    }

    if (!videoLocalPath) {
        throw new ApiError(400, "Video file is required")
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath)
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if(!videoFile){
        throw new ApiError(400, "Video File is required")
    }

    const video = Video.create({
        title,
        description,
        videoFile : videoFile.url,
        thumbnail: thumbnail?.url || "",
        duration: videoFile?.duration || 0,
    });

    const videoResponse = new ApiResponse(201, "Video published successfully", video);

    return res.status(videoResponse.statusCode).json(videoResponse)
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
