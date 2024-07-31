import { Router } from "express";
import ProductController from "../controller/productController";
import { authenticate } from "../middlewares/auth.middleware";

const router: Router = Router();

router.use(authenticate);

router.post("/new-product", ProductController.createProduct);

router
  .route("/:id")
  .get(ProductController.getProductById)
  .put(ProductController.updateProductById)
  .delete(ProductController.deleteProductById);

export default router;
