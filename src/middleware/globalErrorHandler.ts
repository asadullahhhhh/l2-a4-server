import { NextFunction, Request, Response } from "express"


const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorCode = 500
    const errorMessage = "Internal server error!!!"
    const errorDetails = err

    res.status(errorCode).json({
        message: errorMessage,
        details: errorDetails
    })
}

export default errorHandler