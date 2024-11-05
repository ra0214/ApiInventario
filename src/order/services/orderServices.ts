import { OrderRepository } from "../../order/repositories/OrderRepository";
import { Order } from "../../order/models/Order";
import { DateUtils } from "../../shared/utils/DateUtils";

export class orderService {

    public static async getAllOrder(): Promise<Order[]> {
        try{
            return await OrderRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener las ordenes: ${error.message}`);
        }
    }

    public static async getOrderById(orderId: number): Promise<Order | null> {
        try{
            return await OrderRepository.findById(orderId);
        }catch (error: any){
            throw new Error(`Error al encontrar la orden: ${error.message}`);
        }
    }

    public static async addOrder(order: Order) {
        try {
            order.created_at = DateUtils.formatDate(new Date());
            order.updated_at = DateUtils.formatDate(new Date());
            return await OrderRepository.createOrder(order);
        } catch (error: any) {
            throw new Error(`Error al crear la orden: ${error.message}`);
        }
    }

    public static async modifyOrder(orderId: number, orderData: Order){
        try{
            const orderFinded =  await OrderRepository.findById(orderId);
            if(orderFinded){
                if(orderData.user_id){
                    orderFinded.user_id = orderData.user_id;
                }
                if(orderData.status){
                    orderFinded.status = orderData.status;
                }
                if(orderData.description){
                    orderFinded.description = orderData.description;
                }
                if(orderData.total){
                    orderFinded.total = orderData.total;
                }
                if(orderData.deleted){
                    orderFinded.deleted = orderData.deleted;
                }
            }else{
                return null;
            }
            orderFinded.updated_by = orderData.updated_by
            orderFinded.updated_at = DateUtils.formatDate(new Date());
            return await OrderRepository.updateOrder(orderId, orderFinded);
        }catch (error: any){
            throw new Error(`Error al modificar la orden: ${error.message}`);
        }
    }

    public static async deleteOrder(orderId: number): Promise<boolean> {
        try{
            return await OrderRepository.deleteOrder(orderId);
        }catch (error: any){
            throw new Error(`Error al eliminar la orden: ${error.message}`);
        }
    }

}