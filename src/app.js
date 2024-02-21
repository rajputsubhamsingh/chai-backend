import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));                    
app.use(express.urlencoded({extended: true, limit: "16kb"}));  // take the data from url 
app.use(express.static("public"));          // store the file or pdf in public folder
app.use(cookieParser());


// routes import
import userRouter from './routes/user.routes.js';


// routes declaration
// app.use("/users", userRouter)
// /users to thik hai par standard practice me hm usko versioning bhi dete hai 

app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register 

export { app };