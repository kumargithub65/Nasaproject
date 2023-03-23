import express from  "express"
import { getAllLaunch, httpAbortLaunch, httpAddNewLaunches } from "./launches.controller.js"
export const launchrouter = express.Router()

launchrouter.get("/",getAllLaunch)
launchrouter.post("/",httpAddNewLaunches)
launchrouter.delete("/:id",httpAbortLaunch)