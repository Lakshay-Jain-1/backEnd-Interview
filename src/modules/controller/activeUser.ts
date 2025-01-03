import { Response, Request } from "express";
import { usermodel } from "../models/User";

async function setOnline(req: Request, res: Response): Promise<any> {
    try {
        const { name, id } = req.body;

        const updatedUser = await usermodel.findOneAndUpdate(
            { name, id },
            { $set: { online: true, available: true } }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error in setOnline:", error);
        res.status(500).json({ success: false, message: "Failed to set user online. Please try again." });
    }
}

async function checkOnline(req: Request, res: Response): Promise<any> {
    try {
        const data = await usermodel.find({ online: true }).select({ name: 1, _id: 0 });

        if (!data || data.length === 0) {
            return res.json({ success: false, message: "No users are currently online" });
        }

        console.log("Online users:", data);
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error in checkOnline:", error);
        res.status(500).json({ success: false, message: "Failed to check online users. Please try again." });
    }
}

async function setOffline(req: Request, res: Response): Promise<any> {
    try {
        const { name } = req.body;

        const updatedUser = await usermodel.findOneAndUpdate(
            { name },
            { $set: { online: false, onCall: false, recievingOffer: false, available: false, offer: "", answer: "" } }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error in setOffline:", error);
        res.status(500).json({ success: false, message: "Failed to set user offline. Please try again." });
    }
}

async function callCut(req: Request, res: Response): Promise<any> {
    try {
        const { name } = req.body;

        const updatedUser = await usermodel.findOneAndUpdate(
            { name },
            { $set: { onCall: false, recievingOffer: false, available: false } }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error in callCut:", error);
        res.status(500).json({ success: false, message: "Failed to update user call status. Please try again." });
    }
}

export { setOnline, checkOnline, setOffline, callCut };
