import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/Users';

export class UserRepository {
  public static async findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE deleted = FALSE', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          resolve(users);
        }
      });
    });
  }

  public static async findById(userId: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE user_id = ? AND deleted = FALSE', [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          resolve(users.length > 0 ? users[0] : null);
        }
      });
    });
  }

  public static async createUser(user: User): Promise<User> {
    const query = `INSERT INTO users (username, password, role, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      connection.execute(query, [user.username, user.password, user.role, user.created_at, user.created_by, user.updated_at, user.updated_by, user.deleted], (error, result: ResultSetHeader) => {
          if (error) {
            reject(error);
          } else {
            const createdUserId = result.insertId;
            resolve({ ...user, user_id: createdUserId });
          }
        }
      );
    });
  }

  public static async updateUser(userId: number, userData: User): Promise<User | null> {
    const query = `UPDATE users SET username = ?, password = ?, role = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [
          userData.username, userData.password, userData.role,
          userData.updated_at, userData.updated_by, userData.deleted,
          userId
        ],
        (error, result: ResultSetHeader) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.affectedRows > 0 ? { ...userData, user_id: userId } : null);
          }
        }
      );
    });
  }

  public static async deleteUser(userId: number): Promise<boolean> {
    const query = 'UPDATE users SET deleted = TRUE WHERE user_id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [userId], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows > 0);
        }
      });
    });
  }
}
