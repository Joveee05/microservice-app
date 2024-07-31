import express, { Application } from "express";
import setupMiddleWares from "./src/middlewares";
import productRoutes from "./src/routes/productRoutes";

const app: Application = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

setupMiddleWares(app);

app.use("/api/products", productRoutes);

export default app;
