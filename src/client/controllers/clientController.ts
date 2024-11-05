import { Request, Response } from 'express';
import { clientService } from '../services/clientServices';
import jwt from 'jsonwebtoken';

export const loginClient = async (req: Request, res: Response) => {
  const { fullname, password } = req.body;
  try {
    const token = await clientService.login(fullname, password);

    if (!token) {
      res.status(401).json({ message: 'Invalid full name or password' });
    } else {
      const decodedToken = jwt.decode(token) as { role_id_fk: number };
      console.log(fullname)
      res.status(200).json({ token, role_id_fk: decodedToken.role_id_fk , fullname});
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getClients = async (_req: Request, res: Response) => {
  try {
    const client = await clientService.getAllClient();
    if(client){
      res.status(201).json(client);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await clientService.getClientById(parseInt(req.params.client_id, 10));
    if(client){
      res.status(201).json(client);
    }else{
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const newClient = await clientService.addClient(req.body);
    if(newClient){
      res.status(201).json(newClient);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const updatedClient = await clientService.modifyClient(parseInt(req.params.client_id, 10), req.body);
    if(updatedClient){
      res.status(201).json(updatedClient);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const deleted = await clientService.deleteClient(parseInt(req.params.client_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el empleado.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};