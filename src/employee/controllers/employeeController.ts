import { Request, Response } from 'express';
import { employeeService } from '../services/employeeService';

export const loginEmployee = async (req: Request, res: Response) => {
  const { full_name, password } = req.body;
  try {
    const token = await employeeService.login(full_name, password);

    if (!token) {
      res.status(401).json({ message: 'Invalid full name or password' });
    } else {
      res.status(200).json({ token });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employee = await employeeService.getAllEmployee();
    if(employee){
      res.status(201).json(employee);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await employeeService.getEmployeeById(parseInt(req.params.employee_id, 10));
    if(employee){
      res.status(201).json(employee);
    }else{
      res.status(404).json({ message: 'No se encontró el empleado' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const newEmployee = await employeeService.addEmployee(req.body);
    if(newEmployee){
      res.status(201).json(newEmployee);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updatedEmployee = await employeeService.modifyEmployee(parseInt(req.params.employee_id, 10), req.body);
    if(updatedEmployee){
      res.status(201).json(updatedEmployee);
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deleted = await employeeService.deleteEmployee(parseInt(req.params.employee_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el empleado.' });
    }else{
      res.status(404).json({ message: 'Algo salió mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};