import app from "./app";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8080;
const API_NAME = process.env.API_NAME;

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
