import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/postsRoute.js'
import authRoutes from './routes/authRoute.js'
dotenv.config()

const app = express()


app.use(express.json({ limit: '30mb', extended: 'true' }));
app.use(express.urlencoded({ limit: '30mb', extended: 'true' }));
app.use(cors());

app.use('/posts', postRoutes)
app.use('/auth', authRoutes)


const dbUri = process.env.DATA_BASE_CONNECT

const PORT = process.env.PORT || 5000
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => { app.listen(PORT,(console.log(`app has beenconnected on server ${PORT}`))); }).catch((error) => { console.log(error) })

mongoose.set('useFindAndModify', false)

