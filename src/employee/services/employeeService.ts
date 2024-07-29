import { EmployeeRepository } from "../../employee/repositories/EmployeeRepository";
import { Employee } from "../../employee/models/Employee";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class employeeService {

    public static async login(full_name: string, password: string){
        try {
            const employee = await this.getEmployeeByFullName(full_name);
            if (!employee) {
                return null;
            }

            const passwordMatch = await bcrypt.compare(password, employee.password);
            if (!passwordMatch) {
                return null;
            }

            const payload = {
                employee_id: employee.employee_id,
                full_name: employee.full_name
            };

            return jwt.sign(payload, secretKey, { expiresIn: '5m' });

        } catch (error: any) {
            throw new Error(`Error al logearse: ${error.message}`);
        }
    }

    public static async getAllEmployee(): Promise<Employee[]> {
        try{
            return await EmployeeRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }

    public static async getEmployeeById(employeeId: number): Promise<Employee | null> {
        try{
            return await EmployeeRepository.findById(employeeId);
        }catch (error: any){
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async getEmployeeByFullName(full_name: string): Promise<Employee | null> {
        try {
            return await EmployeeRepository.findByFullName(full_name);
        } catch (error: any) {
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addEmployee(employee: Employee) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            employee.created_at = DateUtils.formatDate(new Date());
            employee.updated_at = DateUtils.formatDate(new Date());
            employee.password = await bcrypt.hash(employee.password, salt);
            return await EmployeeRepository.createEmployee(employee);
        } catch (error: any) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    public static async modifyEmployee(employeeId: number, employeeData: Employee){
        try{
            const employeeFound =  await EmployeeRepository.findById(employeeId);
            if(employeeFound){
                if(employeeData.full_name){
                    employeeFound.full_name = employeeData.full_name;
                }
                if(employeeData.password){
                    employeeFound.password = employeeData.password;
                }
                if(employeeData.celphone){
                    employeeFound.celphone = employeeData.celphone;
                }
                if(employeeData.email){
                    employeeFound.email = employeeData.email;
                }
                if(employeeData.deleted){
                    employeeFound.deleted = employeeData.deleted;
                }
            }else{
                return null;
            }
            employeeFound.updated_by = employeeData.updated_by;
            employeeFound.updated_at = DateUtils.formatDate(new Date());
            return await EmployeeRepository.updateEmployee(employeeId, employeeFound);
        }catch (error: any){
            throw new Error(`Error al modificar empleado: ${error.message}`);
        }
    }

    public static async deleteEmployee(employeeId: number): Promise<boolean> {
        try{
            return await EmployeeRepository.deleteEmployee(employeeId);
        }catch (error: any){
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }

}