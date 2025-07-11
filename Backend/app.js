import express from "express"
import {nanoid} from"nanoid"
import dotenv from "dotenv"
dotenv.config({path:"./.env"})
import connectDB from "./src/config/mongo_config.js"
import urlSchema from "./src/models/shorturl.model.js"
import validateUrl from "./src/middlewares/urlValidator.js"
import validateDate from "./src/middlewares/dateValidator.js"
import createShortUrlLimiter from "./src/middlewares/createLimiter.js"
import redirectLimiter from "./src/middlewares/redirectLimiter.js"

const PORT=process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.post('/shorten',createShortUrlLimiter,validateUrl,validateDate, async(req,res)=>{
    const {url,finalExpiry}=req.body;
    const shortUrl=(nanoid(7))
    const newUrl = new urlSchema({
        full_url:url,
        short_url:shortUrl,
        expireAt:finalExpiry
    })
    newUrl.save();
    res.send("http://localhost:3000/"+(shortUrl));
})

app.get('/:code',redirectLimiter, async(req,res)=>{
    const {code}=req.params;
    const url=await urlSchema.findOne({short_url:code})
    if(url){
        await urlSchema.updateOne(
            { short_url: code },
            { $inc: { clicks: 1 } }
        );
        res.redirect(url.full_url)
    }
    else {
        res.status(404).send("Not Found")
    }
})

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`)
});