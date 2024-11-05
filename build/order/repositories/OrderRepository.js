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
exports.OrderRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class OrderRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM `order`', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const orders = results;
                        resolve(orders);
                    }
                });
            });
        });
    }
    static findById(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM `order` WHERE order_id = ?', [order_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const orders = results;
                        if (orders.length > 0) {
                            resolve(orders[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO `order` (user_id, status, description, total, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [order.user_id, order.status, order.description, order.total, order.created_by, order.created_at, order.updated_by, order.updated_at, order.deleted], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdOrderId = result.insertId;
                        const createdOrder = Object.assign(Object.assign({}, order), { order_id: createdOrderId });
                        resolve(createdOrder);
                    }
                });
            });
        });
    }
    static updateOrder(order_id, orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE `order` SET user_id = ?, status = ?, description = ?, total = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE order_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [orderData.user_id, orderData.status, orderData.description, orderData.total, orderData.updated_at, orderData.updated_by, orderData.deleted, order_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedOrder = Object.assign(Object.assign({}, orderData), { order_id: order_id });
                            resolve(updatedOrder);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteOrder(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM `order` WHERE order_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [order_id], (error, result) => {
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
exports.OrderRepository = OrderRepository;
