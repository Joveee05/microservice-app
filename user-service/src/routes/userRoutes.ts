import { Router } from "express";
import UserController from "../controller/userController";

const router: Router = Router();

router.post("/sign-up", UserController.createUser);

router.get("/email/:email", UserController.getUserByEmail);

router
  .route("/:id")
  .get(UserController.getUserById)
  .put(UserController.updateUserById)
  .delete(UserController.deleteUserById);

export default router;
