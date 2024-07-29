import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Order } from '../models/Order';
import { RowDataPacket } from 'mysql2/promise'; // Asegúrate de tener mysql2/promise
export class OrderRepository {

  

  public static async findAll(): Promise<Order[]> {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          o.*, 
          oi.product_name, 
          oi.quantity 
        FROM orders o 
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
      `;
  
      connection.query(query, (error: any, results: RowDataPacket[]) => {
        if (error) {
          reject(error);
        } else {
          const ordersMap: { [key: number]: Order } = {};
  
          results.forEach((row: any) => {
            if (!ordersMap[row.order_id]) {
              ordersMap[row.order_id] = {
                order_id: row.order_id,
                user_id: row.user_id,
                status: row.status,
                description: row.description,
                total: row.total,
                created_at: row.created_at,
                created_by: row.created_by,
                updated_at: row.updated_at,
                updated_by: row.updated_by,
                deleted: row.deleted,
                fullname: row.fullname,
                items: []
              };
            }
  
            if (row.product_name) {
              ordersMap[row.order_id].items!.push({
                product_name: row.product_name,
                quantity: row.quantity
              });
            }
          });
  
          const orders: Order[] = Object.values(ordersMap);
          resolve(orders);
        }
      });
    });
  }
  
  

  public static async findById(order_id: number): Promise<Order | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM `orders` WHERE order_id = ?', [order_id], (error: any, results) => {
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
    const queryOrder = 'INSERT INTO `orders` (user_id, status, description, total, created_by, created_at, updated_by, updated_at, deleted,fullname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
    const paramsOrder = [
      order.user_id ?? null,
      order.status ?? null,
      order.description ?? null,
      order.total ?? null,
      order.created_by ?? null,
      order.created_at ?? null,
      order.updated_by ?? null,
      order.updated_at ?? null,
      order.deleted ?? null,
      order.fullname ?? null
    ];
  
    return new Promise((resolve, reject) => {
      connection.execute(queryOrder, paramsOrder, (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdOrderId = result.insertId;
          if (order.items && order.items.length > 0) {
            const queryItems = 'INSERT INTO `order_items` (order_id, product_name, quantity) VALUES ?';
            const itemsParams = order.items.map(item => [createdOrderId, item.product_name, item.quantity]);
            connection.query(queryItems, [itemsParams], (error) => {
              if (error) {
                reject(error);
              } else {
                const createdOrder: Order = { ...order, order_id: createdOrderId };
                resolve(createdOrder);
              }
            });
          } else {
            const createdOrder: Order = { ...order, order_id: createdOrderId };
            resolve(createdOrder);
          }
        }
      });
    });
  }
  
  

  public static async updateOrder(order_id: number, orderData: Order): Promise<Order | null> {
    const query = 'UPDATE `orders` SET user_id = ?, status = ?, description = ?, total = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE order_id = ?';
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
    const query = 'DELETE FROM `orders` WHERE order_id = ?';
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
