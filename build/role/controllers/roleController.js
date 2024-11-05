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
exports.deleteRole = exports.updateRole = exports.createRole = exports.getRoleById = exports.getRoles = void 0;
const roleServices_1 = require("../services/roleServices");
const getRoles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield roleServices_1.roleService.getAllRoles();
        if (roles) {
            res.status(200).json(roles);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRoles = getRoles;
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield roleServices_1.roleService.getRoleById(parseInt(req.params.role_id, 10));
        if (role) {
            res.status(200).json(role);
        }
        else {
            res.status(404).json({ message: 'No se encontró el role' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getRoleById = getRoleById;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRole = yield roleServices_1.roleService.addRole(req.body);
        if (newRole) {
            res.status(201).json(newRole);
        }
        else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createRole = createRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRole = yield roleServices_1.roleService.modifyRole(parseInt(req.params.role_id, 10), req.body);
        if (updatedRole) {
            res.status(200).json(updatedRole);
        }
        else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield roleServices_1.roleService.deleteRole(parseInt(req.params.role_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Se eliminó el role.' });
        }
        else {
            res.status(400).json({ message: 'Algo salió mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteRole = deleteRole;
