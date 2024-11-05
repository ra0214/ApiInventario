import { RoleRepository } from "../repositories/RoleRepository" 
import { Role } from "../models/Role";
import { DateUtils } from "../../shared/utils/DateUtils";

export class roleService {

    public static async getAllRoles(): Promise<Role[]> {
        try {
            return await RoleRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener los roles: ${error.message}`);
        }
    }

    public static async getRoleById(roleId: number): Promise<Role | null> {
        try {
            return await RoleRepository.findById(roleId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el role: ${error.message}`);
        }
    }

    public static async addRole(role: Role) {
        try {
            role.created_at = DateUtils.formatDate(new Date());
            role.updated_at = DateUtils.formatDate(new Date());
            return await RoleRepository.createRole(role);
        } catch (error: any) {
            throw new Error(`Error al crear el role: ${error.message}`);
        }
    }

    public static async modifyRole(roleId: number, roleData: Role) {
        try {
            const roleFinded = await RoleRepository.findById(roleId);
            if (roleFinded) {
                if (roleData.role_name) {
                    roleFinded.role_name = roleData.role_name;
                }
                if (roleData.description) {
                    roleFinded.description = roleData.description;
                }
                if (roleData.deleted) {
                    roleFinded.deleted = roleData.deleted;
                }
            } else {
                return null;
            }
            roleFinded.updated_by = roleData.updated_by;
            roleFinded.updated_at = DateUtils.formatDate(new Date());
            return await RoleRepository.updateRole(roleId, roleFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar el role: ${error.message}`);
        }
    }

    public static async deleteRole(roleId: number): Promise<boolean> {
        try {
            return await RoleRepository.deleteRole(roleId);
        } catch (error: any) {
            throw new Error(`Error al eliminar el role: ${error.message}`);
        }
    }
}
