import { UserRepository } from "../repositories/UsersRepository";
import { User } from "../models/Users";
import { DateUtils } from "../../shared/utils/DateUtils";

export class UserService {
  public static async getAllUsers(): Promise<User[]> {
    return await UserRepository.findAll();
  }

  public static async getUserById(userId: number): Promise<User | null> {
    return await UserRepository.findById(userId);
  }

  public static async addUser(user: User): Promise<User> {
    user.created_at = DateUtils.formatDate(new Date());
    user.updated_at = DateUtils.formatDate(new Date());
    return await UserRepository.createUser(user);
  }

  public static async modifyUser(userId: number, userData: Partial<User>): Promise<User | null> {
    const existingUser = await UserRepository.findById(userId);
    if (existingUser) {
      Object.assign(existingUser, userData);
      existingUser.updated_at = DateUtils.formatDate(new Date());
      return await UserRepository.updateUser(userId, existingUser);
    }
    return null;
  }

  public static async deleteUser(userId: number): Promise<boolean> {
    return await UserRepository.deleteUser(userId);
  }
}
