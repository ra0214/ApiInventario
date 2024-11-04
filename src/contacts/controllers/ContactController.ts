import { Request, Response } from 'express';
import { ContactService } from '../services/ContactService';

export const getContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await ContactService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await ContactService.getContactById(parseInt(req.params.id, 10));
    contact ? res.status(200).json(contact) : res.status(404).json({ message: 'Contacto no encontrado' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createContact = async (req: Request, res: Response) => {
  try {
    const newContact = await ContactService.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  try {
    const updatedContact = await ContactService.modifyContact(parseInt(req.params.id, 10), req.body);
    updatedContact ? res.status(200).json(updatedContact) : res.status(404).json({ message: 'No se pudo actualizar el contacto' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const deleted = await ContactService.deleteContact(parseInt(req.params.id, 10));
    deleted ? res.status(200).json({ message: 'Contacto eliminado' }) : res.status(404).json({ message: 'No se pudo eliminar el contacto' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
