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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const productServices_1 = require("../services/productServices");
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productServices_1.productService.getAllProducts();
        if (products) {
            res.status(200).json(products);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productServices_1.productService.getProductById(parseInt(req.params.product_id, 10));
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'No se encontró el producto' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const newProduct = yield productServices_1.productService.addProduct(req.body, req.file);
        if (newProduct) {
            res.status(201).json(newProduct);
        }
        else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield productServices_1.productService.modifyProduct(parseInt(req.params.product_id, 10), req.body);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        }
        else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield productServices_1.productService.deleteProduct(parseInt(req.params.product_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Se eliminó el producto.' });
        }
        else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
