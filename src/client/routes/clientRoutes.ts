import { Router } from 'express';
import { getClients, getClientById, createClient, updateClient, deleteClient, loginClient } from '../controllers/clientController';
import { authMiddleware } from '../../shared/middlewares/auth';

const clientRoutes: Router = Router();

clientRoutes.post('/login', loginClient);

clientRoutes.get('/', authMiddleware ,getClients);
clientRoutes.get('/:client_id', authMiddleware ,getClientById);
clientRoutes.post('/', createClient);
clientRoutes.put('/:client_id', updateClient);
clientRoutes.delete('/:client_id', deleteClient);

export default clientRoutes;