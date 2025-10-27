import { Router, Request, Response } from "express";
import * as productController from "../controller/productController"
const router = Router();

router.get("/products", productController.getProduct)
router.get("/products/:id", productController.getProductById)
router.post("/products", productController.createProduct)
router.patch("/products/:id", productController.updateProduct)
router.delete("/products/:id", productController.deleteProduct)

export default router;
