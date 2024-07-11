import { Router } from 'express';
import { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController';

const orderRoutes: Router = Router();

orderRoutes.get('/', getOrders);
orderRoutes.get('/:order_id', getOrderById);
orderRoutes.post('/', createOrder);
orderRoutes.put('/:order_id', updateOrder);
orderRoutes.delete('/:order_id', deleteOrder);

export default orderRoutes;