import { Router } from "express";
import AuthController from "../controller/authController";

const router: Router = Router();

router.post("/login", AuthController.Login);
router.post("/validateToken", AuthController.validateToken);

export default router;
