import { Router, Request, Response } from "express";
import * as userController from "../controller/userController"
const router = Router();

router.get("/user", userController.getUser)
router.get("/user/:id", userController.getUserById)
router.post("/user", userController.createUser)
router.patch("/user/:id", userController.updateUser)
router.delete("/user/:id", userController.deleteUser)

export default router;
