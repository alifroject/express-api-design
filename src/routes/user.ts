import { Router, Request, Response } from "express";
import * as userController from "../controller/userController"
const router = Router();

router.get("/", userController.getUser)

export default router;
