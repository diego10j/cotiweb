import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import usuarioCtrl from '../controllers/usuarioCtrl';

const userRoutes = Router();

// Login
userRoutes.post('/login', usuarioCtrl.login);

// Crear
userRoutes.post('/crear', usuarioCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', usuarioCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', usuarioCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, usuarioCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, usuarioCtrl.buscarPorId);

//Retorna datos del usuario que se encuentran en el token
userRoutes.post('/verificaToken', verificaToken, usuarioCtrl.verificaToken);

//getVendedores
userRoutes.post('/getVendedores', verificaToken, usuarioCtrl.getVendedores);

export default userRoutes;