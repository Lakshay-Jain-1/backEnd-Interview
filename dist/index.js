"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const technicalRound_1 = __importDefault(require("./modules/routes/technicalRound"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "./.env") });
const app = (0, express_1.default)();
app.use("/test", technicalRound_1.default);
app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(process.env.PORTNUMBER || 5000, () => {
    console.log(process.env.PORTNUMBER);
    console.log("server is running");
});
