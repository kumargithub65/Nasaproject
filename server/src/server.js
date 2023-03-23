import http from "http";
import app from "./app.js";
import os from "os";
import mongoose from "mongoose";
import { loadplanets } from "./models/planets.models.js";
import * as dotenv from 'dotenv'
dotenv.config()

let server = http.createServer(app);
let mongo_url ="mongodb+srv://nasa-api:KMFaWPdruiHbiYn1@nasa.1tblcfp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open",()=>{
    console.log("mongo db connected")
})

mongoose.connection.on("error",(err)=>{
    console.error(err)
})

async function startserver() {
  let port = 9009;
  let p = process.env.S3_BUCKET
   console.log(p)
  await mongoose.connect(mongo_url);
  await loadplanets();
  server.listen(port, () => {
    console.log("port listened on " + port);
  });
}

startserver();
