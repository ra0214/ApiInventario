import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Order } from '../models/Order';

export class OrderRepository {

  public static async findAll(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `order`', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const orders: Order[] = results as Order[];
          resolve(orders);
        }
      });
    });
  }

  public static async findById(order_id: number): Promise<Order | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `order` WHERE order_id = ?', [order_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const orders: Order[] = results as Order[];
          if (orders.length > 0) {
            resolve(orders[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createOrder(order: Order): Promise<Order> {
    const query = 'INSERT INTO `order` (user_id, status, description, total, created_by, created_at, updated_by, updated_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order.user_id, order.status, order.description, order.total, order.created_by, order.created_at, order.updated_by, order.updated_at, order.deleted], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdOrderId = result.insertId;
          const createdOrder: Order = { ...order, order_id: createdOrderId };
          resolve(createdOrder);
        }
      });
    });
  }

  public static async updateOrder(order_id: number, orderData: Order): Promise<Order | null> {
    const query = 'UPDATE `order` SET user_id = ?, status = ?, description = ?, total = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE order_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [orderData.user_id, orderData.status, orderData.description, orderData.total, orderData.updated_at, orderData.updated_by, orderData.deleted, order_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedOrder: Order = { ...orderData, order_id: order_id };
            resolve(updatedOrder);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteOrder(order_id: number): Promise<boolean> {
    const query = 'DELETE FROM `order` WHERE order_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [order_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el usuario a eliminar
          }
        }
      });
    });
  }
}
