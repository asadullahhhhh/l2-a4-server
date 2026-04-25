import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { categorieRouter } from "./modules/categories/categorie.route";
import errorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import { providerRouter } from "./modules/provider/provider.route";
import { mealRouter } from "./modules/meals/meal.route";
import { orderRouter } from "./modules/order/order.route";
import { cartItemRoute } from "./modules/cartItems/cartItem.route";
import { reviewRouter } from "./modules/reviews/review.route";
import { profileRoute } from "./modules/profile/profile.route";
import { HomeRoute } from "./modules/home/home.route";
import { UserRoute } from "./modules/user/user.route";
import { PaymentRoute } from "./modules/payment/payment.route";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS to allow both production and Vercel preview deployments
const allowedOrigins = [
  process.env.FONTEND_URL ,
  process.env.PROD_APP_URL, // Production frontend URL
  "http://localhost:3000"

].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);

// better auth authentication
app.all("/api/auth/*splat", toNodeHandler(auth));

// base route
app.get("/", (req, res) => {
  res.send("Application is running.....");
});

// ===> categories route
app.use("/api/v1/category", categorieRouter);

// ===> provider route
app.use("/api/v1/provider", providerRouter);

// ===> meal route
app.use("/api/v1/meals", mealRouter);

// ===> order route
app.use("/api/v1/order", orderRouter);

// ===> cartItem route
app.use("/api/v1/cartItem", cartItemRoute);

// ===> Profile route
app.use("/api/v1/profile", profileRoute);

// ===> home route
app.use("/api/v1/home", HomeRoute);

// ===> Admin route
app.use("/api/v1/admin", UserRoute);

//  ===> payment route
app.use("/api/v1/payment", PaymentRoute);

//  ===> review route
app.use("/api/v1/reviews", reviewRouter);

// Wrong route handler
app.use(notFound);

// error handler
app.use(errorHandler);

export default app;
