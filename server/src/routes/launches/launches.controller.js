import { launches } from "../../models/launches.model.js";
import { scheduleNewLaunch } from "../../models/launches.model.js";

import LaunchesMongo from "../../models/launches.mongo.js";
export async function getAllLaunch(req,res){
 return res.status(200).json(await LaunchesMongo.find({}))
}

export async function httpAddNewLaunches(req,res){
 const launch = req.body
 
 launch.launchDate = new Date(launch.launchDate)
 await scheduleNewLaunch(launch)
 return res.status(201).json(launch)
}


export async function httpAbortLaunch(req,res){
    let launchid = +req.params.id
let exitss =  await exitslaunchwithid(launchid)
       if(!exitss){
        return res.status(400).json({
        ok : false,
        error: "launch not found"
        })
       }
       const aborted = await abortlaunchbyid(launchid)
       return res.status(200).json({
        ok :true
       })
}

async function exitslaunchwithid(id){
    return await LaunchesMongo.findOne({
        flightNumber : id
    })
}



async function abortlaunchbyid(id){
  const aborted =   await LaunchesMongo.updateOne({
        flightNumber:id
    },{
      upcoming : false,
    success : false  
    })
return aborted.modifiedCount === 1
    // const aborted = launches.get(id)
    // aborted.upcoming = false
    // aborted.success = false
    // return aborted
}