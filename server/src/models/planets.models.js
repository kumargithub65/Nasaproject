import { parse } from 'csv-parse';
import  fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import planetsMongo from './planets.mongo.js';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
export let planets = []



function isHabitablePlanet (planet) { 
    return planet['koi_disposition'] === 'CONFIRMED'
              && planet['koi_insol']  > 0.36
             && planet['koi_prad']  < 1.6
               && planet['koi_insol'] < 1.11 ;
             
}



export function loadplanets(){
   

 return new Promise((res,rej)=>{
 fs.createReadStream(path.join(__dirname,"..","..","data","kepler_data.csv")).pipe(parse({comment:"#",columns:true}))
 .on("data", async (data)=>{
    if(isHabitablePlanet(data)){
       saveplanets(data)
        // console.log(count)
        // planets.push(data)
    }
}).on("error",(err)=>{
    console.log("err")
    rej(err)
}).on("end", async ()=>{
    let totalplanets = await getAlPlanets()
    console.log(totalplanets.length + " planets  found")
    console.log("ended data")
    res()
})

}) 
}


export async function saveplanets(data){
    try{
    await planetsMongo.updateOne({
        keplerName:data.kepler_name
    },{
        keplerName:data.kepler_name
    },{
        upsert:true
    })
}catch(err){
    console.log("could not save planet " + err)
}
}

export async function getAlPlanets() {
    return await planetsMongo.find({},{
        _id:0,__v:0
    });
  }
  


