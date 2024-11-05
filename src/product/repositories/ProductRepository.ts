import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { product } from '../models/Product';

export class ProductRepository {
  public static async findAll(): Promise<product[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products WHERE deleted = FALSE', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const products: product[] = results as product[];
          resolve(products);
        }
      });
    });
  }

  public static async findById(productId: number): Promise<product | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products WHERE product_id = ? AND deleted = FALSE', [productId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const products: product[] = results as product[];
          resolve(products.length > 0 ? products[0] : null);
        }
      });
    });
  }

  public static async createProduct(product: product): Promise<product> {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO products (name, description, stock_boxes, stock_individual, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const values = [
        product.name,
        product.description,
        product.stock_boxes,
        product.stock_individual,
        product.created_at,
        product.updated_at
      ];

      if (!product.name) {
        reject(new Error("El campo 'name' no puede ser nulo"));
        return;
      }

      connection.query(query, values, (error, results: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          // Si el producto se ha creado exitosamente, podemos devolver el producto con su nuevo ID
          resolve({ ...product, product_id: results.insertId });
        }
      });
    });
  }

  public static async updateProduct(productId: number, product: product): Promise<product | null> {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE products
        SET name = ?, description = ?, stock_boxes = ?, stock_individual = ?, updated_at = ?
        WHERE product_id = ? AND deleted = FALSE
      `;

      const values = [
        product.name,
        product.description,
        product.stock_boxes,
        product.stock_individual,
        product.updated_at,
        productId
      ];

      connection.query(query, values, (error, results: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0 ? product : null);
        }
      });
    });
  }

  public static async deleteProduct(productId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const query = `UPDATE products SET deleted = TRUE WHERE product_id = ?`;
      connection.query(query, [productId], (error, results: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }
}
