import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { logger } from "../utils/logger";

dotenv.config({ path: "./config.env" });
const { AUTH_SERVICE_URL } = process.env;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  logger.info("authenticate middleware processed a request");
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token
    if (!token) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized" });
    }

    const response = await axios.post(`${AUTH_SERVICE_URL}/validateToken`, {
      token,
    });
    if (response.data.status) {
      return next();
    } else {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized Access" });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("Login function processed a request with an error: ", error);
    return res.status(500).json({ status: "failed", error: errorMessage });
  }
};
