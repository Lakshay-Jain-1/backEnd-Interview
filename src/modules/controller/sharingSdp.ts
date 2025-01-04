import { Response, Request } from "express";
import { usermodel } from "../models/User";

async function sendOffer(req: Request, res: Response):Promise<any> {
    try {
        const { senderName, acceptor, offer } = req.body;

        const reciever = await usermodel.findOne({ name: acceptor });
        if (!reciever) {
            return res.status(404).json({ success: false, message: "Acceptor not found" });
        }

        if (reciever.onCall || !reciever.available) {
            return res.json({ success: false, message: "Receiver is unavailable or on a call" });
        }

        await usermodel.findOneAndUpdate(
            { name: acceptor },
            { $set: { offer, acceptor: senderName, recievingOffer: true } }
        );

        res.json({ success: true, senderName, acceptor });
    } catch (error) {
        console.error("Error in sendOffer:", error);
        res.status(500).json({ success: false, message: "Failed to send offer. Please try again." });
    }
}

async function accessOffer(req: Request, res: Response):Promise<any> {
    try {
        const { name } = req.body;
        console.log(name)
        const reciever = await usermodel.findOne({ name });
        if (!reciever) {
            return res.status(404).json({ success: false, message: "Receiver not found" });
        }

        console.log("Before accessing offer:", reciever);

        if (reciever.onCall) {
            return res.json({ success: false, message: "Receiver is already on a call" });
        }

        setTimeout(async () => {
            try {
                await usermodel.findOneAndUpdate({ name }, { $set: { onCall: true } });
            } catch (error) {
                console.error("Error updating onCall in accessOffer:", error);
            }
        }, 1000);
        console.log(reciever)
        res.json({ success: true, offer: reciever.offer, acceptor: reciever.acceptor });
    } catch (error) {
        console.error("Error in accessOffer:", error);
        res.status(500).json({ success: false, message: "Failed to access offer. Please try again." });
    }
}

async function sendAnswer(req: Request, res: Response):Promise<any> {
    try {
        const { name, acceptor, answer } = req.body;

        const sender = await usermodel.findOne({ name: acceptor });
        if (!sender) {
            return res.status(404).json({ success: false, message: "Acceptor not found" });
        }
        console.log("sender",sender)
        if (sender.onCall) {
            return res.json({ success: false, message: "Acceptor is already on a call" });
        }

        await usermodel.findOneAndUpdate(
            { name: acceptor },
            { $set: { answer, acceptor: name } }
        );
        console.log("why is it not working",sender)
        res.json({ success: true });
    } catch (error) {
        console.error("Error in sendAnswer:", error);
        res.status(500).json({ success: false, message: "Failed to send answer. Please try again." });
    }
}

async function accessAnswer(req: Request, res: Response):Promise<any> {
    try {
        const { name } = req.body;

        const sender = await usermodel.findOne({ name });
        // if (!sender) {
        //      res.status(404).json({ success: false, message: "Sender not found" });
        //      return
        // }

        // if (sender.onCall) {
        //      res.json({ success: false, message: "Sender is already on a call" });
        //      return
        // }

        // await usermodel.findOneAndUpdate({ name }, { $set: { onCall: true } });

        res.json({ success: true, answer: sender.answer });
    } catch (error) {
        console.error("Error in accessAnswer:", error);
        res.status(500).json({ success: false, message: "Failed to access answer. Please try again." });
    }
}

export { sendOffer, accessOffer, sendAnswer, accessAnswer };
