import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // Importar cors
import * as dotenv from 'dotenv';

// Importar rutas de módulos
import employeeRoutes from './employee/routes/employeeRoutes';
import clientRoutes from './client/routes/clientRoutes';
import contactRoutes from './contacts/routes/contactRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

// Configurar CORS
app.use(cors());

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de los módulos
app.use('/api/contact', contactRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/employee', employeeRoutes);

// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://54.204.239.6:${port}`);
});
