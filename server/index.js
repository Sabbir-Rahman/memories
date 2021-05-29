
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config()

//for parsing the data 
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

//setting up the routes
app.use('/posts',postRoutes)

app.get('/', (req,res) => {
    res.send('Hello to Memories API')
})

// const CONNECTION_URL = 'mongodb+srv://sabbir:sabbir@cluster0.mmfp5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT 

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false)
