import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import unidadMedidaCtrl from '../controllers/unidadMedidaCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, unidadMedidaCtrl.crear);

// Eliminar
userRoutes.delete('/eliminar/:id', verificaToken, unidadMedidaCtrl.eliminar);

// Actualizar
userRoutes.put('/actualizar/:id', verificaToken, unidadMedidaCtrl.actualizar);

//Listar
userRoutes.get('/listar', verificaToken, unidadMedidaCtrl.listar);

//Buscar por Id
userRoutes.get('/buscarPorId/:id', verificaToken, unidadMedidaCtrl.buscarPorId);

export default userRoutes;