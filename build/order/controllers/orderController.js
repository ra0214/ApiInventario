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
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrderById = exports.getOrders = void 0;
const orderServices_1 = require("../services/orderServices");
const getOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderServices_1.orderService.getAllOrder();
        if (order) {
            res.status(201).json(order);
        }
        else {
            res.status(404).json({ message: 'Sin registros' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrders = getOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderServices_1.orderService.getOrderById(parseInt(req.params.order_id, 10));
        if (order) {
            res.status(201).json(order);
        }
        else {
            res.status(404).json({ message: 'No se encontró la orden' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getOrderById = getOrderById;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = yield orderServices_1.orderService.addOrder(req.body);
        if (newOrder) {
            res.status(201).json(newOrder);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield orderServices_1.orderService.modifyOrder(parseInt(req.params.order_id, 10), req.body);
        if (updatedOrder) {
            res.status(201).json(updatedOrder);
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield orderServices_1.orderService.deleteOrder(parseInt(req.params.order_id, 10));
        if (deleted) {
            res.status(201).json({ message: 'Se eliminó la orden.' });
        }
        else {
            res.status(404).json({ message: 'Algo salio mal' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteOrder = deleteOrder;
