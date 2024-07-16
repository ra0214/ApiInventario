import { Router } from 'express';
import { getRoles, getRoleById, createRole, updateRole, deleteRole } from '../controllers/roleController';

const roleRoutes: Router = Router();

roleRoutes.get('/', getRoles);
roleRoutes.get('/:role_id', getRoleById);
roleRoutes.post('/', createRole);
roleRoutes.put('/:role_id', updateRole);
roleRoutes.delete('/:role_id', deleteRole);

export default roleRoutes;
