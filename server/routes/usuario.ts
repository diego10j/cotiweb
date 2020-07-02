import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import usuarioCtrl from '../controllers/usuarioCtrl';

const userRoutes = Router();

// Login
userRoutes.post('/login', usuarioCtrl.login);

// Crear
userRoutes.post('/crear', usuarioCtrl.crear);

// Eliminar
userRoutes.delete('/eliminar/:id', usuarioCtrl.eliminar);

// Actualizar
userRoutes.put('/actualizar/:id', usuarioCtrl.actualizar);

//Listar
userRoutes.get('/listar', verificaToken, usuarioCtrl.listar);

//Buscar por Id
userRoutes.get('/buscarPorId/:id', verificaToken, usuarioCtrl.buscarPorId);

//Retorna datos del usuario que se encuentran en el token
userRoutes.get('/verificaToken', verificaToken, usuarioCtrl.verificaToken);

export default userRoutes;