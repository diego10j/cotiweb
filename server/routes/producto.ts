import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import productoCtrl from '../controllers/productoCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, productoCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', verificaToken, productoCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', verificaToken, productoCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, productoCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, productoCtrl.buscarPorId);

//getProductosPorTipo
userRoutes.post('/getProductosPorTipo', verificaToken, productoCtrl.getProductosPorTipo);

export default userRoutes;