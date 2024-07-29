"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// Importar rutas de módulos
const clientRoutes_1 = __importDefault(require("./client/routes/clientRoutes"));
const orderRoutes_1 = __importDefault(require("./order/routes/orderRoutes"));
const productRoutes_1 = __importDefault(require("./product/routes/productRoutes"));
const roleRoutes_1 = __importDefault(require("./role/routes/roleRoutes"));
// Importar middlewares compartidos
const errorHandler_1 = require("./shared/middlewares/errorHandler");
const notFoundHandler_1 = require("./shared/middlewares/notFoundHandler");
// Configuración de variables de entorno
dotenv.config();
// Crear la aplicación de Express
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT, 10);
// Middleware de análisis del cuerpo
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*",
}));
// Rutas de los módulos
app.use('/api/client', clientRoutes_1.default);
app.use('/api/order', orderRoutes_1.default);
app.use('/api/product', productRoutes_1.default);
app.use('/api/role', roleRoutes_1.default);
// Ruta para servir archivos estáticos
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Middleware para manejar rutas no encontradas
app.use(notFoundHandler_1.notFoundHandler);
// Middleware de manejo de errores
app.use(errorHandler_1.errorHandler);
// Iniciar el servidor
app.listen(port, () => {
    console.log('Serving static files from:', path_1.default.join(__dirname, '../uploads'));
    console.log(`Servidor corriendo en ${process.env.URL}:${port}`);
});
