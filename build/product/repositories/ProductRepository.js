"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class ProductRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM product', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results;
                        resolve(products);
                    }
                });
            });
        });
    }
    static findById(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM product WHERE product_id = ?', [product_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const products = results;
                        if (products.length > 0) {
                            resolve(products[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO product (product_name, price, stock, url, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [product.product_name, product.price, product.stock, product.url, product.created_at, product.created_by, product.updated_at, product.updated_by, product.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdProductId = result.insertId;
                        const createdProduct = Object.assign(Object.assign({}, product), { product_id: createdProductId });
                        resolve(createdProduct);
                    }
                });
            });
        });
    }
    static updateProduct(product_id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE product SET product_name = ?, price = ?, stock = ?, url = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE product_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [productData.product_name, productData.price, productData.stock, productData.url, productData.updated_at, productData.updated_by, productData.deleted, product_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedProduct = Object.assign(Object.assign({}, productData), { product_id: product_id });
                            resolve(updatedProduct);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteProduct(product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM product WHERE product_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [product_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true); // Eliminación exitosa
                        }
                        else {
                            resolve(false); // Si no se encontró el producto a eliminar
                        }
                    }
                });
            });
        });
    }
}
exports.ProductRepository = ProductRepository;
