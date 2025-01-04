import express, { Application, Response } from "express";
import chalk from "chalk";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import Connection from "./shared/db";
import { usermodel } from "./modules/models/User";
import techRouting from "./modules/routes/technicalRound";
import interRouting from "./modules/routes/sharingSdp";
import activeUsersRouting from "./modules/routes/activeUsers";

// Config
dotenv.config({ path: path.resolve(__dirname, "./.env") });
const app: Application = express();

// Middleware setup
const corsOptions = {
  origin: ["http://192.168.1.79:5173", "https://ab1c-106-219-164-206.ngrok-free.app" ,"http://localhost:5174","https://ab1c-106-219-164-206.ngrok-free.app/interview","https://fd22-106-219-164-206.ngrok-free.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
  credentials:true
};




app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan((tokens, req, res) => {
  return chalk.cyan(`${tokens.method(req, res)} ${tokens.url(req, res)}`);
}));

// Custom logging middleware
app.use((req: any, res: any, next) => {
  const oldSend = res.send;
  res.send = function(data) {
    // Request logging
    console.log(chalk.yellow("\n🔸 Request Details:"));
    console.log(chalk.blue("  Method:"), chalk.green(req.method));
    console.log(chalk.blue("  URL:   "), chalk.green(req.url));
    console.log(chalk.blue("  Body:  "), chalk.green(JSON.stringify(req.body, null, 2)));

    // Response logging
    console.log(chalk.yellow("\n🔸 Response Details:"));
    console.log(chalk.blue("  Status:"), getStatusColor(res.statusCode)(`${res.statusCode}`));
    console.log(chalk.blue("  Body:  "), chalk.green(JSON.stringify(data, null, 2)));
    console.log(chalk.gray("|||||||||||||||||||||||||||||||||||||||||||||||||"));

    oldSend.call(this, data);
  };
  next();
});

// Helper function for status code colors
function getStatusColor(status: number) {
  if (status >= 500) return chalk.red;
  if (status >= 400) return chalk.yellow;
  if (status >= 300) return chalk.cyan;
  if (status >= 200) return chalk.green;
  return chalk.white;
}

  


app.use("/api/status",activeUsersRouting)
app.use("/api/tech", techRouting)
app.use("/api/interview", interRouting)




app.get("/user/insertAUser", async (req, res) => {
    const users = [
        {
            id: 1,
            name: "Alice",
            password: "123",
            emailId: "lak@gmail.com",
            online: false
        },
        {
            id: 2,
            name: "Bob",
            password: "123",
            emailId: "lak@gmail.com",
            online: false
        },
        {
            id: 3,
            name: "Charlie",
            password: "123",
            emailId: "lak@gmail.com",
            online: false
        },
        {
            id: 4,
            name: "David",
            password: "123",
            emailId: "lak@gmail.com",
            online: false,
        },
        {
            id: 5,
            name: "Eve",
            password: "123",
            emailId: "lak@gmail.com",
            online: true,
            available:true
        },
    ];

    await usermodel.insertMany(users)
    res.json({ success: true })
})





app.listen(process.env.PORTNUMBER || 5000, async () => {
    console.log("server is running")
    await Connection()
})