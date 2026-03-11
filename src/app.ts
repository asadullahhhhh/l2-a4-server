import express from 'express';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';

const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

app.all("/api/auth/*splat", toNodeHandler(auth));

// base route
app.get("/", (req, res) => {
    res.send("Application is running.....")
})

export default app