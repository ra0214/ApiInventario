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
exports.employeeService = void 0;
const EmployeeRepository_1 = require("../../employee/repositories/EmployeeRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET || "";
const saltRounds = 10;
class employeeService {
    static login(full_name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield this.getEmployeeByFullName(full_name);
                if (!employee) {
                    return null;
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, employee.password);
                if (!passwordMatch) {
                    return null;
                }
                const payload = {
                    employee_id: employee.employee_id,
                    full_name: employee.full_name
                };
                return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '5m' });
            }
            catch (error) {
                throw new Error(`Error al logearse: ${error.message}`);
            }
        });
    }
    static getAllEmployee() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeeRepository_1.EmployeeRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener empleados: ${error.message}`);
            }
        });
    }
    static getEmployeeById(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeeRepository_1.EmployeeRepository.findById(employeeId);
            }
            catch (error) {
                throw new Error(`Error al encontrar empleado: ${error.message}`);
            }
        });
    }
    static getEmployeeByFullName(full_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeeRepository_1.EmployeeRepository.findByFullName(full_name);
            }
            catch (error) {
                throw new Error(`Error al encontrar empleado: ${error.message}`);
            }
        });
    }
    static addEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                employee.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                employee.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                employee.password = yield bcrypt_1.default.hash(employee.password, salt);
                return yield EmployeeRepository_1.EmployeeRepository.createEmployee(employee);
            }
            catch (error) {
                throw new Error(`Error al crear empleado: ${error.message}`);
            }
        });
    }
    static modifyEmployee(employeeId, employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeFound = yield EmployeeRepository_1.EmployeeRepository.findById(employeeId);
                if (employeeFound) {
                    if (employeeData.full_name) {
                        employeeFound.full_name = employeeData.full_name;
                    }
                    if (employeeData.password) {
                        employeeFound.password = employeeData.password;
                    }
                    if (employeeData.celphone) {
                        employeeFound.celphone = employeeData.celphone;
                    }
                    if (employeeData.email) {
                        employeeFound.email = employeeData.email;
                    }
                    if (employeeData.deleted) {
                        employeeFound.deleted = employeeData.deleted;
                    }
                }
                else {
                    return null;
                }
                employeeFound.updated_by = employeeData.updated_by;
                employeeFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield EmployeeRepository_1.EmployeeRepository.updateEmployee(employeeId, employeeFound);
            }
            catch (error) {
                throw new Error(`Error al modificar empleado: ${error.message}`);
            }
        });
    }
    static deleteEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmployeeRepository_1.EmployeeRepository.deleteEmployee(employeeId);
            }
            catch (error) {
                throw new Error(`Error al eliminar empleado: ${error.message}`);
            }
        });
    }
}
exports.employeeService = employeeService;
