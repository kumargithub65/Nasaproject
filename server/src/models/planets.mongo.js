import mongoose from "mongoose";
const planetsSchema = new mongoose.Schema({
    keplerName : {
        type:String,
        required:true
    }
})

let planetsMongo =  mongoose.model("Planets",planetsSchema)
export default planetsMongo