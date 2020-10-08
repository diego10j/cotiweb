import { Router } from 'express';
import utilitarioCtrl from '../controllers/sistemaCtrl';
import { verificaToken } from '../middlewares/autenticacion';
const rutas = Router();

// getCombo
rutas.post('/getCombo', utilitarioCtrl.getCombo);

rutas.post('/getOpciones', verificaToken, utilitarioCtrl.getOpciones);
rutas.post('/getPerfiles', verificaToken, utilitarioCtrl.getPerfiles);
rutas.post('/getParametros', verificaToken, utilitarioCtrl.getParametros);
rutas.post('/getPermisosPerfil', verificaToken, utilitarioCtrl.getPermisosPerfil);

rutas.post('/crearOpcion', verificaToken, utilitarioCtrl.crearOpcion);
rutas.post('/eliminarOpcion/:id', verificaToken, utilitarioCtrl.eliminarOpcion);
rutas.post('/buscarOpcionPorId/:id',verificaToken,  utilitarioCtrl.buscarOpcionPorId);
rutas.post('/actualizarOpcion/:id',verificaToken,  utilitarioCtrl.actualizarOpcion);


rutas.post('/getMenuOpcionesUsuario',verificaToken,  utilitarioCtrl.getMenuOpcionesUsuario);
rutas.post('/getDatosEmpresa',verificaToken,  utilitarioCtrl.getDatosEmpresa);
rutas.post('/actualizarDatosEmpresa/:id',verificaToken,  utilitarioCtrl.actualizarDatosEmpresa);
rutas.post('/buscarPerfilPorId/:id',verificaToken,  utilitarioCtrl.buscarPerfilPorId);
rutas.post('/actualizarPerfil/:id',verificaToken,  utilitarioCtrl.actualizarPerfil);
rutas.post('/eliminarPerfil/:id',verificaToken,  utilitarioCtrl.eliminarPerfil);
rutas.post('/crearPerfil',verificaToken,  utilitarioCtrl.crearPerfil);


rutas.post('/buscarParametroPorId/:id',verificaToken,  utilitarioCtrl.buscarParametroPorId);
rutas.post('/actualizarParametro/:id',verificaToken,  utilitarioCtrl.actualizarParametro);

rutas.post('/guardarPermisos/:id',verificaToken,  utilitarioCtrl.guardarPermisos);




export default rutas;