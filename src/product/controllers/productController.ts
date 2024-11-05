import { Request, Response } from 'express';
import { ProductService } from '../services/productServices';

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.getProductById(parseInt(req.params.id, 10));
    product ? res.status(200).json(product) : res.status(404).json({ message: 'Producto no encontrado' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await ProductService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await ProductService.modifyProduct(parseInt(req.params.id, 10), req.body);
    updatedProduct ? res.status(200).json(updatedProduct) : res.status(404).json({ message: 'No se pudo actualizar el producto' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductService.deleteProduct(parseInt(req.params.id, 10));
    deleted ? res.status(200).json({ message: 'Producto eliminado' }) : res.status(404).json({ message: 'No se pudo eliminar el producto' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
