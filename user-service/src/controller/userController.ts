import { Request, Response } from "express";
import User from "../model/user";
import { logger } from "../utils/logger";
import { UserRequest, UserResponse } from "../types/userTypes";

interface IUserController {
  createUser(
    req: Request<UserRequest>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>>;
  getUserById(
    req: Request<{ id: string }>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>>;
  getUserByEmail(
    req: Request<{ email: string }>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>>;
  updateUserById(
    req: Request<{ id: string }>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>>;
  deleteUserById(
    req: Request<{ id: string }>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>>;
}

class UserController implements IUserController {
  public async createUser(
    req: Request<UserRequest>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>> {
    logger.info("createUser function processed a request");
    try {
      const { name, email, password } = req.body;
      const user = new User({ name, email, password });
      await user.save();

      return res.status(201).json({ status: "success", data: user });
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(
        "createUser function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }

  public async getUserById(
    req: Request<{ id: string }>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>> {
    logger.info("getUserById function processed a request");
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (user) {
        return res.status(200).json({ status: "success", data: user });
      } else {
        return res
          .status(404)
          .json({ status: "failed", message: "User not found" });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(
        "getUserById function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }

  public async getUserByEmail(
    req: Request<{ email: string }>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>> {
    logger.info("getUserByEmail function processed a request");
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });

      if (user) {
        return res.status(200).json({ status: "success", data: user });
      } else {
        return res.status(404).json({
          status: "failed",
          message: "User with email not found",
        });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(
        "getUserByEmail function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }

  public async updateUserById(
    req: Request<{ id: string }, UserRequest>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>> {
    logger.info("updateUserById function processed a request");
    try {
      const userId = req.params.id;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "User not found" });
      } else {
        return res.status(200).json({ status: "success", data: user });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(
        "updateUserById function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }

  public async deleteUserById(
    req: Request<{ id: string }, UserRequest>,
    res: Response<Partial<UserResponse>>
  ): Promise<Response<Partial<UserResponse>>> {
    logger.info("deleteUserById function processed a request");
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "User not found" });
      } else {
        await User.findByIdAndDelete(userId);
        return res
          .status(200)
          .json({ status: "success", message: "User deleted" });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(
        "deleteUserById function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }
}

export default new UserController();
