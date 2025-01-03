import mongoose from "mongoose";

// id easy 0-100 medium 101-200 hard ke liyee 201-301

const technicalRoundSchema = new mongoose.Schema({
    id:Number,
    question: String,
    testCase:String,
    difficulty:String,
    name:String

})


export const technicalRound = mongoose.model("technicalRound",technicalRoundSchema)