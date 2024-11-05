import { Request, Response } from 'express';
import { roleService } from '../services/roleServices';

export const getRoles = async (_req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    if(roles){
      res.status(200).json(roles);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await roleService.getRoleById(parseInt(req.params.role_id, 10));
    if(role){
      res.status(200).json(role);
    }else{
      res.status(404).json({ message: 'No se encontró el role' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const newRole = await roleService.addRole(req.body);
    if(newRole){
      res.status(201).json(newRole);
    }else{
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const updatedRole = await roleService.modifyRole(parseInt(req.params.role_id, 10), req.body);
    if(updatedRole){
      res.status(200).json(updatedRole);
    }else{
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const deleted = await roleService.deleteRole(parseInt(req.params.role_id, 10));
    if(deleted){
      res.status(200).json({ message: 'Se eliminó el role.' });
    }else{
      res.status(400).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};