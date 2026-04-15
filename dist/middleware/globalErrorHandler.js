import { Prisma } from "../../generated/prisma/client";
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof Error) {
        message = err.message;
    }
    // Prisma Validation Error
    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid input data";
    }
    // Prisma Known Errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 400;
            message = "Unique constraint failed";
        }
        if (err.code === "P2003") {
            statusCode = 400;
            message = "Foreign key constraint failed";
        }
        if (err.code === "P2025") {
            statusCode = 404;
            message = "Record not found";
        }
    }
    res.status(statusCode).json({
        success: false,
        message,
    });
};
export default errorHandler;
//# sourceMappingURL=globalErrorHandler.js.map