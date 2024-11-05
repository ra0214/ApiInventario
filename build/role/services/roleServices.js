"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleService = void 0;
const RoleRepository_1 = require("../repositories/RoleRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class roleService {
    static getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RoleRepository_1.RoleRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener los roles: ${error.message}`);
            }
        });
    }
    static getRoleById(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RoleRepository_1.RoleRepository.findById(roleId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el role: ${error.message}`);
            }
        });
    }
    static addRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                role.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                role.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield RoleRepository_1.RoleRepository.createRole(role);
            }
            catch (error) {
                throw new Error(`Error al crear el role: ${error.message}`);
            }
        });
    }
    static modifyRole(roleId, roleData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roleFinded = yield RoleRepository_1.RoleRepository.findById(roleId);
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
                }
                else {
                    return null;
                }
                roleFinded.updated_by = roleData.updated_by;
                roleFinded.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield RoleRepository_1.RoleRepository.updateRole(roleId, roleFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar el role: ${error.message}`);
            }
        });
    }
    static deleteRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RoleRepository_1.RoleRepository.deleteRole(roleId);
            }
            catch (error) {
                throw new Error(`Error al eliminar el role: ${error.message}`);
            }
        });
    }
}
exports.roleService = roleService;
