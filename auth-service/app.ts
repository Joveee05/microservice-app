import express, { Application } from "express";
import setupMiddleWares from "./src/middlewares";
import authRoutes from "./src/route/authRoutes";

const app: Application = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

setupMiddleWares(app);

app.use("/api/auth", authRoutes);

export default app;
