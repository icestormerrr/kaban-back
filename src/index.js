import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

import { connectDb } from "./config/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
// import { authMiddleware } from "./middlewares/authMiddleware.js";

import { taskRouter } from "./routers/taskRouter.js";
import { userRouter } from "./routers/userRouter.js";
import { projectRouter } from "./routers/projectRouter.js";
import { authRouter } from "./routers/authRouter.js";

const app = express();

configDotenv();
connectDb();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/projects", projectRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
