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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class ClientRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM client', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const clients = results;
                        resolve(clients);
                    }
                });
            });
        });
    }
    static findById(client_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM client WHERE client_id = ?', [client_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const clients = results;
                        if (clients.length > 0) {
                            resolve(clients[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByFullName(fullname) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM client WHERE fullname = ?', [fullname], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const clients = results;
                        if (clients.length > 0) {
                            resolve(clients[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO client (fullname, password, celphone, email, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            console.log(client);
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [client.fullname, client.password, client.celphone, client.email, client.created_at, client.created_by, client.updated_at, client.updated_by, client.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdClientId = result.insertId;
                        const createdClient = Object.assign(Object.assign({}, client), { client_id: createdClientId });
                        resolve(createdClient);
                    }
                });
            });
        });
    }
    static updateClient(client_id, clientData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE client SET fullname = ?, password = ?, celphone = ?, email = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE client_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [clientData.fullname, clientData.password, clientData.celphone, clientData.email, clientData.updated_at, clientData.updated_by, clientData.deleted, client_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedClient = Object.assign(Object.assign({}, clientData), { client_id: client_id });
                            resolve(updatedClient);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteClient(client_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM client WHERE client_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [client_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true); // Eliminación exitosa
                        }
                        else {
                            resolve(false); // Si no se encontró el usuario a eliminar
                        }
                    }
                });
            });
        });
    }
}
exports.ClientRepository = ClientRepository;
