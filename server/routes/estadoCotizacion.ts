import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import estadoCotizacionCtrl from '../controllers/estadoCotizacionCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, estadoCotizacionCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', verificaToken, estadoCotizacionCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', verificaToken, estadoCotizacionCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, estadoCotizacionCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, estadoCotizacionCtrl.buscarPorId);

export default userRoutes;