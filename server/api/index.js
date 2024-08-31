import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())

  app.use(cookieParser())

  app.use(cors({
    origin:'https://classcache.netlify.app',
    credentials: true
  }));


import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

import userRouter from '../controllers/userManagement.js'
import notesRouter from '../controllers/notesManagement.js'
import favRouter from '../controllers/favourite.js'
import cartRouter from '../controllers/carts.js'
import orderRouter from '../controllers/orders.js'
import cookieParser from 'cookie-parser'

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
})

app.use("/api",userRouter)
app.use('/api',notesRouter)
app.use('/api',favRouter)
app.use("/api",cartRouter)
app.use("/api",orderRouter)

app.listen(process.env.PORT,() => {
    console.log(`Server started at port ${process.env.PORT}`)
})