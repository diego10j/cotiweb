import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import cotizacionCtrl from '../controllers/cotizacionCtrl';

const userRoutes = Router();

// Crear
userRoutes.post('/crearDesdePortal', cotizacionCtrl.crearDesdePortal);

// Crear
userRoutes.post('/crear', verificaToken, cotizacionCtrl.crear);

// Eliminar
userRoutes.post('/eliminar/:id', verificaToken, cotizacionCtrl.eliminar);

// Actualizar
userRoutes.post('/actualizar/:id', verificaToken, cotizacionCtrl.actualizar);

//Listar
userRoutes.post('/listar', verificaToken, cotizacionCtrl.listar);

//Buscar por Id
userRoutes.post('/buscarPorId/:id', verificaToken, cotizacionCtrl.buscarPorId);

userRoutes.post('/getEstados', verificaToken, cotizacionCtrl.getEstados);
userRoutes.post('/getTipos', verificaToken, cotizacionCtrl.getTipos);
userRoutes.post('/getValidez', verificaToken, cotizacionCtrl.getValidez);
userRoutes.post('/getCondicion', verificaToken, cotizacionCtrl.getCondicion);



//misCotizaciones
userRoutes.post('/misCotizaciones/:id', verificaToken, cotizacionCtrl.misCotizaciones);


userRoutes.post('/asignarVendedor/:id', verificaToken, cotizacionCtrl.asignarVendedor);

userRoutes.post('/asignarEstado/:id', verificaToken, cotizacionCtrl.asignarEstado);

userRoutes.post('/getDatosCotizacion/:id', verificaToken, cotizacionCtrl.getDatosCotizacion);


userRoutes.post('/enviarMail', cotizacionCtrl.enviarMail);

export default userRoutes;