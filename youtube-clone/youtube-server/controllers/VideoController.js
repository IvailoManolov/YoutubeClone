import { createError } from "../error";
import Video from "../models/Video"

export const addVideo = async (req,res,next) => {
    const newVideo = new Video({userId:req.user.id, ...req.body});

    try{
        const savedVideo = await newVideo.save();

        console.log("Video saved successfully!");

        res.status(200).json(savedVideo);
    }
    catch(err){
        console.log("Problem creating a video!");
        next(err);
    }
}

export const updateVideo = async (req,res,next) => {
    try{
        const video = await Video.findById(req.params.id);

        if(!video){
            return next(createError(404,'Video not found!'));
        }

        if(req.user.id === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});

            res.status(200).json(updatedVideo);
        }

        else{
            return next(createError(403,"You can update only your videos!"));
        }
    }
    catch(err){
        console.log("Problem creating a video!");
        next(err);
    }
}

export const deleteVideo = async (req,res,next) => {
    try{
        const video = await Video.findById(req.params.id);

        if(!video){
            return next(createError(404,'Video not found!'));
        }

        if(req.user.id === video.userId){
            await Video.findByIdAndDelete(req.params.id);

            res.status(200).json("Video has been deleted!");
        }

        else{
            return next(createError(403,"You can delete only your videos!"));
        }
    }
    catch(err){
        console.log("Problem creating a video!");
        next(err);
    }
}

export const getVideo = async (req,res,next) => {
    try{
        const searchedVideo = await Video.findById(req.params.id);

        res.status(200).json(searchedVideo);
    }
    catch(err){
        console.log("Problem creating a video!");
        next(err);
    }
}

export const addView = async (req,res,next) => {
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })

        res.status(200).json("The view has been increased!");
    }
    catch(err){
        console.log("Problem increasing the views of a video!");
        next(err);
    }
}

export const randomVideo = async (req,res,next) => {
    try{
        const randomVideos = await Video.aggregate([{$sample:{size:40}}])

        res.status(200).json(randomVideos);
    }
    catch(err){
        console.log("Problem getting random videos!");
        next(err);
    }
}

export const trendVideo = async (req,res,next) => {
    try{
        const trendyVideos = await Video.find().sort({views:-1});

        res.status(200).json(trendyVideos);
    }
    catch(err){
        console.log("Problem getting random videos!");
        next(err);
    }
}

export const subbed = async (req,res,next) => {
    try{
        const searchedVideo = await Video.findById(req.params.id);

        res.status(200).json(searchedVideo);
    }
    catch(err){
        console.log("Problem creating a video!");
        next(err);
    }
}
