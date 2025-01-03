"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing = express_1.default.Router();
routing.get("/yoo", (req, res) => {
    res.send("sdkjds");
});
exports.default = routing;
