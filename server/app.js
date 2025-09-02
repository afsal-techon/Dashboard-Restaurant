import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/database.js';
import userRouter from './routes/userRouter.js'
import fs from "fs";



dotenv.config();
const app = express();
const port = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'));


await connectDB();


app.use('/sync',userRouter)


if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}


app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});




app.listen(port,()=>{
  console.log(`server connected at the port ${port}`)
})

