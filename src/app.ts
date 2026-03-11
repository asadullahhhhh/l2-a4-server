import express from 'express';

const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// base route
app.get("/", (req, res) => {
    res.send("Application is running.....")
})

export default app