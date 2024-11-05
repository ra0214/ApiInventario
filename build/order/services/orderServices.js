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
exports.orderService = void 0;
const OrderRepository_1 = require("../../order/repositories/OrderRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class orderService {
    static getAllOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OrderRepository_1.OrderRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener las ordenes: ${error.message}`);
            }
        });
    }
    static getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OrderRepository_1.OrderRepository.findById(orderId);
            }
            catch (error) {
                throw new Error(`Error al encontrar la orden: ${error.message}`);
            }
        });
    }
    static addOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                order.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                order.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield OrderRepository_1.OrderRepository.createOrder(order);
            }
            catch (error) {
                throw new Error(`Error al crear la orden: ${error.message}`);
            }
        });
    }
    static modifyOrder(orderId, orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderFinded = yield OrderRepository_1.OrderRepository.findById(orderId);
                if (orderFinded) {
                    if (orderData.user_id) {
                        orderFinded.user_id = orderData.user_id;
                    }
                    if (orderData.status) {
                        orderFinded.status = orderData.status;
                    }
                    if (orderData.description) {
                        orderFinded.description = orderData.description;
                    }
                    if (orderData.total) {
                        orderFinded.total = orderData.total;
                    }
                    if (orderData.deleted) {
                        orderFinded.deleted = orderData.deleted;
                    }
                }
                else {
                    return null;
                }
                orderFinded.updated_by = orderData.updated_by;
                orderFinded.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                return yield OrderRepository_1.OrderRepository.updateOrder(orderId, orderFinded);
            }
            catch (error) {
                throw new Error(`Error al modificar la orden: ${error.message}`);
            }
        });
    }
    static deleteOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield OrderRepository_1.OrderRepository.deleteOrder(orderId);
            }
            catch (error) {
                throw new Error(`Error al eliminar la orden: ${error.message}`);
            }
        });
    }
}
exports.orderService = orderService;
