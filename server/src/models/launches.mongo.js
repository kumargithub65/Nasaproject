import mongoose from "mongoose";
const launchschema = new mongoose.Schema({
    mission: {
        type:String,
        required:true
    }, 
    rocket: {
        type:String,
        required:true
    },
    launchDate: {
        type:Date,
        required:true
    },
    target: {
        type:String,
        required:true
    }, 
   
    flightNumber: {
        type:Number,
      required:true

    },
    customer: {
        type:[String],
        required:true
    },
    upcoming: {
        type:Boolean,
        required:true
    }, 
    success: {
        type:Boolean,
        required:true,
        default:true
    },
})
// connects launchschema with launch collection

let LaunchesMongo =  mongoose.model("Launch",launchschema)
export default LaunchesMongo