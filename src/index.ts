import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from "cors"

// Importar rutas de módulos
import employeeRoutes from './employee/routes/employeeRoutes';
import clientRoutes from './client/routes/clientRoutes';
import orderRoutes from './order/routes/orderRoutes';
import productRoutes from './product/routes/productRoutes';
import roleRoutes from './role/routes/roleRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

// Rutas de los módulos
app.use('/api/client', clientRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/product',productRoutes);
app.use('/api/role',roleRoutes);

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://34.232.184.104:${port}`);
});
