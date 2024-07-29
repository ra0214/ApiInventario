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
exports.clientService = void 0;
const ClientRepository_1 = require("../../client/repositories/ClientRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET || "";
const saltRounds = 10;
class clientService {
    static login(fullname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield this.getClientByFullName(fullname);
                if (!client) {
                    return null;
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, client.password);
                if (!passwordMatch) {
                    return null;
                }
                const payload = {
                    client_id: client.client_id,
                    fullname: client.fullname,
                    role_id_fk: client.role_id_fk
                };
                return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '5m' });
            }
            catch (error) {
                throw new Error(`Error al logearse: ${error.message}`);
            }
        });
    }
    static getAllClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ClientRepository_1.ClientRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener clientes: ${error.message}`);
            }
        });
    }
    static getClientById(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ClientRepository_1.ClientRepository.findById(clientId);
            }
            catch (error) {
                throw new Error(`Error al encontrar cliente: ${error.message}`);
            }
        });
    }
    static getClientByFullName(fullname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ClientRepository_1.ClientRepository.findByFullName(fullname);
            }
            catch (error) {
                throw new Error(`Error al encontrar cliente: ${error.message}`);
            }
        });
    }
    static addClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                client.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                client.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                client.password = yield bcrypt_1.default.hash(client.password, salt);
                return yield ClientRepository_1.ClientRepository.createClient(client);
            }
            catch (error) {
                throw new Error(`Error al crear cliente: ${error.message}`);
            }
        });
    }
    static modifyClient(clientId, clientData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientFinded = yield ClientRepository_1.ClientRepository.findById(clientId);
                if (clientFinded) {
                    if (clientData.fullname) {
                        clientFinded.fullname = clientData.fullname;
                    }
                    if (clientData.password) {
                        clientFinded.password = clientData.password;
                    }
                    if (clientData.celphone) {
                        clientFinded.celphone = clientData.celphone;
                    }
                    if (clientData.email) {
                        clientFinded.email = clientData.email;
                    }
                    if (clientData.role_id_fk) {
                        clientFinded.role_id_fk = clientData.role_id_fk;
                    }
                    if (clientData.deleted) {
                        clientFinded.deleted = clientData.deleted;
                    }
                }
                else {
                    return null;
                }
                clientFinded.updated_by = clientData.updated_by;
                clientFinded.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield ClientRepository_1.ClientRepository.updateClient(clientId, clientFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar cliente: ${error.message}`);
            }
        });
    }
    static deleteClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ClientRepository_1.ClientRepository.deleteClient(clientId);
            }
            catch (error) {
                throw new Error(`Error al eliminar cliente: ${error.message}`);
            }
        });
    }
}
exports.clientService = clientService;
