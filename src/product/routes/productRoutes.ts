import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import upload from '../../shared/middlewares/uploadMiddleware';

const productRoutes: Router = Router();

productRoutes.get('/', getProducts);
productRoutes.get('/:product_id', getProductById);
productRoutes.post('/', upload.single('productImage'), createProduct);
productRoutes.put('/:product_id', updateProduct);
productRoutes.delete('/:product_id', deleteProduct);

export default productRoutes;
