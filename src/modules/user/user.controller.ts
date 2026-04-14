import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const {page, limit, status, role} = req.query
        const pageNumber = Number(page) || 1
        const limitNumber = Number(limit) || 10
        const skipNumber = (pageNumber - 1) * limitNumber

        let status1 = status
        let roles = role

        if(status === "All"){
            status1 = undefined
        }

        if(role === "All"){
            roles = undefined
        }
        const result = await UserService.getAllUsers({pageNumber, limitNumber, skipNumber, status1, roles})

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req: Request, res:Response, next: NextFunction) => {
    try {
        const result = await UserService.updateUser(req.body)
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result
        })

    } catch (error) {
        next(error)
    }
}

export const UserController = {
    getAllUsers,
    updateUser
}