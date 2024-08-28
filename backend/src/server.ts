import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userRouter from './routers/user.router';
import atractionRouter from './routers/atraction.router';

const app = express();
app.use(cors())
app.use(express.json())
const router=express.Router()

mongoose.connect('mongodb://127.0.0.1:27017/turizam')
const conn=mongoose.connection
conn.once('open',()=>{console.log("DB connected")})

app.use('/',router)

router.use('/users',userRouter)
router.use('/atractions',atractionRouter)

app.listen(4000, () => console.log(`Express server running on port 4000`));