import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import clienteCtrl from '../controllers/clienteCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crear', verificaToken, clienteCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', verificaToken, clienteCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', verificaToken, clienteCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, clienteCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, clienteCtrl.buscarPorId);

//Buscar por nombre
userRoutes.post('/buscarCliente', verificaToken, clienteCtrl.buscarCliente);

export default userRoutes;