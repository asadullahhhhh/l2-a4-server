import express from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors';
import { categorieRouter } from './modules/categories/categorie.route';
import errorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';

const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// cors origin setup
app.use(cors({
    origin: process.env.FONTEND_URL,
    credentials: true
}))

// better auth authentication
app.all("/api/auth/*splat", toNodeHandler(auth));

// base route
app.get("/", (req, res) => {
    res.send("Application is running.....")
})

// categories route
app.use("/api/v1/category", categorieRouter)


// Wrong route handler
app.use(notFound)

// error handler
app.use(errorHandler)


export default app