import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import tipoProductoCtrl from '../controllers/tipoProductoCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, tipoProductoCtrl.crear);

// Eliminar
userRoutes.delete('/eliminar/:id', verificaToken, tipoProductoCtrl.eliminar);

// Actualizar
userRoutes.put('/actualizar/:id', verificaToken, tipoProductoCtrl.actualizar);

//Listar
userRoutes.get('/listar', verificaToken, tipoProductoCtrl.listar);

//Buscar por Id
userRoutes.get('/buscarPorId/:id', verificaToken, tipoProductoCtrl.buscarPorId);



export default userRoutes;