import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.post("/signup", UserController.userRegister);
router.post("/login", UserController.userLogin);

export default router;
