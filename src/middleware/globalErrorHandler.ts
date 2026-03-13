import { NextFunction, Request, Response } from "express"
import { Prisma } from "../../generated/prisma/client"


const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let errorCode = 500
    let errorMessage = "Internal server error!!!"
    let errorDetails = err

    // ---> Prisma Client Validation Error
    if(err instanceof Prisma.PrismaClientValidationError) {
        errorCode = 400
        errorMessage = `Missing field or Incorrect field type`
    }

    res.status(errorCode).json({
        success: false,
        message: errorMessage,
        details: "Invalid input data!!"
    })
}

export default errorHandler