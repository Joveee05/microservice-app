import express, { Application } from "express";
import setupMiddleWares from "./src/middlewares";
import userRoutes from "./src/routes/userRoutes";

const app: Application = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

setupMiddleWares(app);

app.use("/api/users", userRoutes);

export default app;
