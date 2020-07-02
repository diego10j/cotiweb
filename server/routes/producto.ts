import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import productoCtrl from '../controllers/productoCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, productoCtrl.crear);

// Eliminar
userRoutes.delete('/eliminar/:id', verificaToken, productoCtrl.eliminar);

// Actualizar
userRoutes.put('/actualizar/:id', verificaToken, productoCtrl.actualizar);

//Listar
userRoutes.get('/listar', verificaToken, productoCtrl.listar);

//Buscar por Id
userRoutes.get('/buscarPorId/:id', verificaToken, productoCtrl.buscarPorId);

//getProductosPorTipo
userRoutes.get('/getProductosPorTipo', verificaToken, productoCtrl.getProductosPorTipo);

export default userRoutes;