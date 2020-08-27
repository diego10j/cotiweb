import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import tipoProductoCtrl from '../controllers/tipoProductoCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, tipoProductoCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', verificaToken, tipoProductoCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', verificaToken, tipoProductoCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, tipoProductoCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, tipoProductoCtrl.buscarPorId);



export default userRoutes;