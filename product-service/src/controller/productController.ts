import { Request, Response } from "express";
import Product from "../model/product";
import { logger } from "../utils/logger";
import redisClient from "../utils/redisClient";
import { ProductRequest, ProductResponse } from "../types/productTypes";

interface IProductController {
  createProduct(
    req: Request<ProductRequest>,
    res: Response<Partial<ProductResponse>>
  ): Promise<Response<Partial<ProductResponse>>>;
  getProductById(
    req: Request<{ id: string }>,
    res: Response<Partial<ProductResponse>>
  ): Promise<Response<Partial<ProductResponse>>>;
  updateProductById(
    req: Request<{ id: string }, ProductRequest>,
    res: Response<Partial<ProductResponse>>
  ): Promise<Response<Partial<ProductResponse>>>;
  deleteProductById(
    req: Request<{ id: string }>,
    res: Response<Partial<ProductResponse>>
  ): Promise<Response<Partial<ProductResponse>>>;
}

class ProductController implements IProductController {
  public async createProduct(
    req: Request<ProductRequest>,
    res: Response<Partial<ProductResponse>>
  ): Promise<Response<Partial<ProductResponse>>> {
    logger.info("createProduct function processed a request");
    try {
      const { name, description, price } = req.body;
      const product = new Product({ name, description, price });
      await product.save();

      await redisClient.setEx(
        `product:${product.id}`,
        3600,
        JSON.stringify(product)
      );
      return res.status(201).json({ status: "success", data: product });
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(
        "createProduct function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }

  public async getProductById(
    req: Request<{ id: string }>,
    res: Response<Partial<ProductResponse>>
  ): Promise<Response<Partial<ProductResponse>>> {
    logger.info("getProductById function processed a request");
    try {
      const productId = req.params.id;
      const cachedProduct = await redisClient.get(`product:${productId}`);
      if (cachedProduct) {
        return res
          .status(200)
          .json({ status: "success", data: JSON.parse(cachedProduct) });
      } else {
        const product = await Product.findById(productId);
        if (product) {
          await redisClient.setEx(
            `product:${product.id}`,
            3600,
            JSON.stringify(product)
          );
          return res.status(200).json({ status: "success", data: product });
        } else {
          return res
            .status(404)
            .json({ status: "failed", message: "Product not found" });
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(
        "getProductById function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }

  public async updateProductById(
    req: Request<{ id: string }, ProductRequest>,
    res: Response<Partial<ProductResponse>>
  ): Promise<Response<Partial<ProductResponse>>> {
    logger.info("updateProductById function processed a request");
    try {
      const productId = req.params.id;
      const product = await Product.findByIdAndUpdate(productId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return res
          .status(404)
          .json({ status: "failed", message: "Product not found" });
      } else {
        await redisClient.del(`product:${productId}`);
        await redisClient.setEx(
          `product:${productId}`,
          3600,
          JSON.stringify(product)
        );
        return res.status(200).json({ status: "success", data: product });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(
        "updateProductById function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }

  public async deleteProductById(
    req: Request<{ id: string }>,
    res: Response<Partial<ProductResponse>>
  ): Promise<Response<Partial<ProductResponse>>> {
    logger.info("deleteProductById function processed a request");
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ status: "failed", message: "Product not found" });
      } else {
        await Product.findByIdAndDelete(productId);
        await redisClient.del(`product:${productId}`);
        return res
          .status(200)
          .json({ status: "success", message: "Product deleted" });
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error(
        "deleteProductById function processed a request with an error: ",
        error
      );
      return res.status(500).json({ status: "failed", error: errorMessage });
    }
  }
}

export default new ProductController();
