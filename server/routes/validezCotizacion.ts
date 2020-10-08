import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import validezCotizacionCtrl from '../controllers/validezCotizacionCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, validezCotizacionCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', verificaToken, validezCotizacionCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', verificaToken, validezCotizacionCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, validezCotizacionCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, validezCotizacionCtrl.buscarPorId);

export default userRoutes;