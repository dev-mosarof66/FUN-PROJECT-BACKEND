import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors());

//import routers

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export default app;
