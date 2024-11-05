"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const uploadMiddleware_1 = __importDefault(require("../../shared/middlewares/uploadMiddleware"));
const productRoutes = (0, express_1.Router)();
productRoutes.get('/', productController_1.getProducts);
productRoutes.get('/:product_id', productController_1.getProductById);
productRoutes.post('/', uploadMiddleware_1.default.single('productImage'), productController_1.createProduct);
productRoutes.put('/:product_id', productController_1.updateProduct);
productRoutes.delete('/:product_id', productController_1.deleteProduct);
exports.default = productRoutes;
