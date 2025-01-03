import express from "express"
import { accessAnswer, accessOffer,  sendAnswer,  sendOffer } from "../controller/sharingSdp"


const router = express.Router()

// User 1 send offer
router.post("/sdp/offer",sendOffer)

// User 2 access offer  short poliing
router.post("/sdp/access/offer",accessOffer)


// User 2 send answer it will be done automatically by that user 
router.post("/sdp/answer",sendAnswer)


// User 1 access answer short polling 
router.post("/sdp/access/answer", accessAnswer)


export default router   