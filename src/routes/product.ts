import { Router, Request, Response } from "express";
import * as productController from "../controller/productController"
const router = Router();

router.get("/product", productController.getProduct)
router.get("/product/:id", productController.getProductById)
router.post("/product", productController.createProduct)
router.patch("/product/:id", productController.updateProduct)
router.delete("/product/:id", productController.deleteProduct)

export default router;
