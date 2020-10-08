import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import tipoCotizacionCtrl from '../controllers/tipoCotizacionCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, tipoCotizacionCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', verificaToken, tipoCotizacionCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', verificaToken, tipoCotizacionCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, tipoCotizacionCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, tipoCotizacionCtrl.buscarPorId);

export default userRoutes;