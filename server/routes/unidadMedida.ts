import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import unidadMedidaCtrl from '../controllers/unidadMedidaCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, unidadMedidaCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', verificaToken, unidadMedidaCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', verificaToken, unidadMedidaCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, unidadMedidaCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, unidadMedidaCtrl.buscarPorId);

export default userRoutes;