import { Request, Response } from 'express';
import { productService } from '../services/productServices';

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    if(products){
      res.status(200).json(products);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(parseInt(req.params.product_id, 10));
    if(product){
      res.status(200).json(product);
    }else{
      res.status(404).json({ message: 'No se encontró el producto' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const newProduct = await productService.addProduct(req.body, req.file);
    if(newProduct){
      res.status(201).json(newProduct);
    }else{
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productService.modifyProduct(parseInt(req.params.product_id, 10), req.body);
    if(updatedProduct){
      res.status(200).json(updatedProduct);
    }else{
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await productService.deleteProduct(parseInt(req.params.product_id, 10));
    if(deleted){
      res.status(200).json({ message: 'Se eliminó el producto.' });
    }else{
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};