import express from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors';
import { categorieRouter } from './modules/categories/categorie.route';
import errorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import { providerRouter } from './modules/provider/provider.route';
import { mealRouter } from './modules/meals/meal.route';
import { orderRouter } from './modules/order/order.route';
import { cartItemRoute } from './modules/cartItems/cartItem.route';
import { reviewRouter } from './modules/reviews/review.route';
import { profileRoute } from './modules/profile/profile.route';
import { HomeRoute } from './modules/home/home.route';

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

// ===> categories route
app.use("/api/v1/category", categorieRouter)

// ===> provider route
app.use("/api/v1/provider", providerRouter)

// ===> meal route
app.use("/api/v1/meals", mealRouter)

// ===> order route
app.use("/api/v1/order", orderRouter)

// ===> cartItem route
app.use("/api/v1/cartItem", cartItemRoute)

// ===> Profile route
app.use("/api/v1/profile", profileRoute)

// ===> home route
app.use("/api/v1/home", HomeRoute)


//  ===> review route
app.use("/api/v1/reviews", reviewRouter)

// Wrong route handler
app.use(notFound)

// error handler
app.use(errorHandler)


export default app