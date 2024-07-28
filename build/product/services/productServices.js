"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const ProductRepository_1 = require("../repositories/ProductRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class productService {
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener los productos: ${error.message}`);
            }
        });
    }
    static getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.findById(productId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el producto: ${error.message}`);
            }
        });
    }
    static addProduct(product, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlProject = process.env.URL;
            const portProject = process.env.PORT;
            try {
                product.url = `${urlProject}:${portProject}/uploads/${file.filename}`;
                product.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                product.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                product.created_by = 'admin';
                product.updated_by = 'admin';
                return yield ProductRepository_1.ProductRepository.createProduct(product);
            }
            catch (error) {
                throw new Error(`Error al crear el producto: ${error.message}`);
            }
        });
    }
    static modifyProduct(productId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productFinded = yield ProductRepository_1.ProductRepository.findById(productId);
                if (productFinded) {
                    if (productData.product_name) {
                        productFinded.product_name = productData.product_name;
                    }
                    if (productData.price) {
                        productFinded.price = productData.price;
                    }
                    if (productData.stock) {
                        productFinded.stock = productData.stock;
                    }
                    if (productData.description) {
                        productFinded.description = productData.description;
                    }
                    if (productData.deleted) {
                        productFinded.deleted = productData.deleted;
                    }
                    productFinded.updated_by = productData.updated_by;
                    productFinded.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                }
                else {
                    return null;
                }
                return yield ProductRepository_1.ProductRepository.updateProduct(productId, productFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar el producto: ${error.message}`);
            }
        });
    }
    static deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ProductRepository_1.ProductRepository.deleteProduct(productId);
            }
            catch (error) {
                throw new Error(`Error al eliminar el producto: ${error.message}`);
            }
        });
    }
}
exports.productService = productService;
