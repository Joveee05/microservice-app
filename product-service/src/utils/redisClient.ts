import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.connect();

export default redisClient;
