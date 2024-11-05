import { ProductRepository } from "../repositories/ProductRepository";
import { product } from "../models/Product";
import { DateUtils } from "../../shared/utils/DateUtils";

export class ProductService {
  public static async getAllProducts(): Promise<product[]> {
    return await ProductRepository.findAll();
  }

  public static async getProductById(productId: number): Promise<product | null> {
    return await ProductRepository.findById(productId);
  }

  public static async addProduct(product: product): Promise<product> {
    product.created_at = DateUtils.formatDate(new Date());
    product.updated_at = DateUtils.formatDate(new Date());
    return await ProductRepository.createProduct(product);
  }

  public static async modifyProduct(productId: number, productData: Partial<product>): Promise<product | null> {
    const existingProduct = await ProductRepository.findById(productId);
    if (existingProduct) {
      Object.assign(existingProduct, productData);
      existingProduct.updated_at = DateUtils.formatDate(new Date());
      return await ProductRepository.updateProduct(productId, existingProduct);
    }
    return null;
  }

  public static async deleteProduct(productId: number): Promise<boolean> {
    return await ProductRepository.deleteProduct(productId);
  }
}
