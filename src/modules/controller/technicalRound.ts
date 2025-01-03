import { Response, Request } from "express";
import { technicalRound } from "../models/technicalRoundmodel";
import axios from "axios";

async function sendingQuestion(req: Request, res: Response) {
    try {
        const { id } = req.params
        const data = await technicalRound.find({id})
        res.status(200).json(data)

    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }
}

async function submitCodeToJudge0(source_code: string, language_id: number): Promise<string> {

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
            base64_encoded: 'true',
            wait: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': '717065928emshc44f4f175d27c9dp1435b4jsne1eeb37d8cf8',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            language_id,
            source_code
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.token
    } catch (error) {
        console.error(error);
    }
}

async function pollSubmissionResult(token: string): Promise<any> {
    const options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': '717065928emshc44f4f175d27c9dp1435b4jsne1eeb37d8cf8',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        let response = await axios.request(options);
        while (response.data.status.id <= 2) {
            response = await axios.request(options);
        }
        return response.data
    } catch (error) {
        console.error(error);
    }

}

async function executingQuestion(req: Request, res: Response) {
    const { sourceCode, languageId } = req.body;

    try {
        const token = await submitCodeToJudge0(sourceCode, languageId);
        const result = await pollSubmissionResult(token)
        res.json(result);
    } catch (error) {
        console.error('Error executing code:', error.message);
        res.status(500).json({ error: error.message });
    }
}



export { sendingQuestion, executingQuestion }