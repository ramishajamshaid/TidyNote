import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from "./db/index.js";

connectDB()
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT: ", process.env.PORT);
})

import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.route.js'
app.use((req, res, next) => {
    next();
});
app.use("/api/v1/users", userRouter)
app.use("/api/v1/todo", todoRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
    })
})
export { app };
export default app;