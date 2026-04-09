import { NextFunction, Request, Response } from "express";
import { profileService } from "./profile.service";

const getProfileDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id as string

        const result = await profileService.getProfileDetails(userId)

        res.status(200).json({
            success: true,
            message: "Profile details retrieved successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateProfileDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id as string

        const result = await profileService.updateProfileDetails(userId, req.body)

        res.status(200).json({
            success: true,
            message: "Profile details updated successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const profileController = {
    getProfileDetails,
    updateProfileDetails
}