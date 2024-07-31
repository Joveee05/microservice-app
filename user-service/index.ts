import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8080;
const API_NAME = process.env.API_NAME;

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("UsersDB connected successfully!"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`${API_NAME} running on port ${PORT}...`);
});

process.on("uncaughtException", (error) => {
  console.error({ uncaughtException: error });
});

process.on("unhandledRejection", function (error) {
  console.error({ unhandledRejection: error });
});

export default app;
