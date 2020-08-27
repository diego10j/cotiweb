import { Router } from 'express';
import utilitarioCtrl from '../controllers/sistemaCtrl';
import { verificaToken } from '../middlewares/autenticacion';
const rutas = Router();

// getCombo
rutas.post('/getCombo', verificaToken, utilitarioCtrl.getCombo);

rutas.post('/getOpciones', verificaToken, utilitarioCtrl.getOpciones);
rutas.post('/getPerfiles', verificaToken, utilitarioCtrl.getPerfiles);
rutas.post('/getParametros', verificaToken, utilitarioCtrl.getParametros);
rutas.post('/getPermisosPerfil', verificaToken, utilitarioCtrl.getPermisosPerfil);
export default rutas;