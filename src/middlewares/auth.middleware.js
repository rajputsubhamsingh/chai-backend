// this method is only varifying user is available or not

import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const varifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
    
        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.varify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if(!user) { 
            throw new ApiError(401, "Invalid Access Token");
        }
    
        req.user = user;
        next()
    } catch (err) {
        throw new ApiError(401, err?.message || "Invalid access token");
    }
});