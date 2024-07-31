import { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { logger } from "../utils/logger";
import { AuthRequest, AuthResponse } from "../types/AuthTypes";

dotenv.config({ path: "./config.env" });
const { USER_SERVICE_URL } = process.env;

interface IAuthController {
  Login(
    req: Request<AuthRequest>,
    res: Response<Partial<AuthResponse>>
  ): Promise<Response<Partial<AuthResponse>>>;
  validateToken(
    req: Request<AuthRequest>,
    res: Response<Partial<AuthResponse>>
  ): Promise<Response<Partial<AuthResponse>>>;
}

class AuthController implements IAuthController {
  public async Login(
    req: Request<AuthRequest>,
    res: Response<Partial<AuthResponse>>
  ): Promise<Response<Partial<AuthResponse>>> {
    logger.info("Login function processed a request");
    try {
      const { email, password } = req.body;
      const response = await axios.get(USER_SERVICE_URL + `/email/${email}`);
      const user = response.data.data;

      if (user && user.password === password) {
        //Generate a simple token (in real-world, use JWT or similar)
        const token = Buffer.from(`${email}:${password}`).toString("base64");
        delete user.password;
        return res.status(200).json({ status: "success", token, data: user });
      } else {
        return res
          .status(401)
          .json({ status: "failed", message: "Invalid credentials" });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      logger.error("Login function processed a request with an error: ", error);
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }

  public async validateToken(
    req: Request<AuthRequest>,
    res: Response<Partial<AuthResponse>>
  ): Promise<Response<Partial<AuthResponse>>> {
    try {
      const { token } = req.body;
      const decoded = Buffer.from(token, "base64").toString("ascii");
      const [email, password] = decoded.split(":");

      const response = await axios.get(USER_SERVICE_URL + `/email/${email}`);
      const user = response.data.data;
      if (user && user.password === password) {
        return res.status(200).json({ status: "success" });
      } else {
        return res.status(401).json({ status: "failed" });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      logger.error(
        "validateToken function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }
}

export default new AuthController();
