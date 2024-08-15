import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { connectToMongoDb } from "./common/mongo/connectMongoDb";
import { projectRouter } from "./domains/project/infrastructure/api/http/controller/ProjectController";
import { errorMiddleware } from "./common/http/middlewares/errorMiddleware";
import { taskRouter } from "./domains/task/infrastructure/api/http/controller/TaskController";
import { userRouter } from "./domains/user/infrastructure/api/http/controller/UserController";

const app: Express = express();

dotenv.config();
connectToMongoDb();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/projects", projectRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
