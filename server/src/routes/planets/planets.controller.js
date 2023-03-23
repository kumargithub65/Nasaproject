import { getAlPlanets } from "../../models/planets.models.js"

export async function getAllPlanets(req,res){
    return res.status(200).json(await getAlPlanets())
}
 
