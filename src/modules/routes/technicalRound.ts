
import express from "express"
import { executingQuestion, sendingQuestion } from "../controller/technicalRound"

const routing = express.Router()

routing.get("/question/:id",sendingQuestion)
routing.post('/question/execute',executingQuestion );

export default routing