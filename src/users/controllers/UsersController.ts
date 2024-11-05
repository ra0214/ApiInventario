import { Request, Response } from 'express';
import { UserService } from '../services/UsersService';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserById(parseInt(req.params.id, 10));
    user ? res.status(200).json(user) : res.status(404).json({ message: 'Usuario no encontrado' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserService.modifyUser(parseInt(req.params.id, 10), req.body);
    updatedUser ? res.status(200).json(updatedUser) : res.status(404).json({ message: 'No se pudo actualizar el usuario' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await UserService.deleteUser(parseInt(req.params.id, 10));
    deleted ? res.status(200).json({ message: 'Usuario eliminado' }) : res.status(404).json({ message: 'No se pudo eliminar el usuario' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
