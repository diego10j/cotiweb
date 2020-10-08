import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import condicionCotizacionCtrl from '../controllers/condicionCotizacionCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, condicionCotizacionCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', verificaToken, condicionCotizacionCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', verificaToken, condicionCotizacionCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, condicionCotizacionCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, condicionCotizacionCtrl.buscarPorId);

export default userRoutes;