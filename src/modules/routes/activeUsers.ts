import express from "express"
import {  checkOnline, setOffline, setOnline,callCut } from "../controller/activeUser"


const router = express.Router()

// User 1 to make user online available
router.post("/online",setOnline)

// user 1 to check how many people are online 
router.get("/online-users",checkOnline)


// both for user 1 and user 2 need two routes to make onCall-> false and online -> false
router.post("/offline",setOffline)

router.post("/user/call/cut",callCut)




export default router   