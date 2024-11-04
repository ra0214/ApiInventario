import { Router } from 'express';
import { getContacts, getContactById, createContact, updateContact, deleteContact } from '../controllers/ContactController';

const contactRoutes: Router = Router();

contactRoutes.get('/', getContacts);
contactRoutes.get('/:id', getContactById);
contactRoutes.post('/', createContact);
contactRoutes.put('/:id', updateContact);
contactRoutes.delete('/:id', deleteContact);

export default contactRoutes;
