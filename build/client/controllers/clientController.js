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
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClientById = exports.getClients = exports.loginClient = void 0;
const clientServices_1 = require("../services/clientServices");
const loginClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, password } = req.body;
    try {
        const token = yield clientServices_1.clientService.login(fullname, password);
        if (!token) {
            res.status(401).json({ message: 'Invalid full name or password' });
        }
        else {
            res.status(200).json({ token });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginClient = loginClient;
const getClients = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield clientServices_1.clientService.getAllClient();
        if (client) {
            res.status(201).json(client);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getClients = getClients;
const getClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield clientServices_1.clientService.getClientById(parseInt(req.params.client_id, 10));
        if (client) {
            res.status(201).json(client);
        }
        else {
            res.status(404).json({ message: 'No se encontró el usuario' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getClientById = getClientById;
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newClient = yield clientServices_1.clientService.addClient(req.body);
        if (newClient) {
            res.status(201).json(newClient);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createClient = createClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedClient = yield clientServices_1.clientService.modifyClient(parseInt(req.params.client_id, 10), req.body);
        if (updatedClient) {
            res.status(201).json(updatedClient);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield clientServices_1.clientService.deleteClient(parseInt(req.params.client_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó el empleado.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteClient = deleteClient;
