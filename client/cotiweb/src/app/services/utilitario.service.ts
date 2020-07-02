import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { RestResponse, RestRequest } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';
import { Router, NavigationExtras } from '@angular/router';

const URL = environment.sigafi_rest_api;
const URL_FILE_SERVER = environment.sigafi_file_server;
@Injectable({
  providedIn: 'root'
})
export class UtilitarioService {

  constructor(private toastController: ToastController,
              private storage: Storage,
              private router: Router,
              public alertCtrl: AlertController,
              private datePipe: DatePipe
  ) { }

  /**
   * Agrega una notificación a la pantalla
   * @param mensaje
   * @param color
   */
  async agregarNotificacion(mensaje: any, color = 'dark') {
    const toast = await this.toastController.create({
      message: mensaje,
      color,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  /**
   * Agrega un mensaje en la pantalla
   * @param $title
   * @param $message
   */
  async agregarMensaje($title, $message) {
    const alert = await this.alertCtrl.create({
      header: $title,
      message: $message,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Retorna si una variable esta definida
   * @param variable
   */
  isDefined(variable: any): boolean {
    return typeof variable !== 'undefined' && variable !== null;
  }

    /**
   * Retorna si una variable esta definida
   * @param variable
   */
  isEmpty(variable: string): boolean {
    if(this.isDefined(variable)){
      variable = variable.trim();
      if(variable.length  === 0){
        return true;
      }
    }
    return false;
    
  }

  /**
   * Borra una variable del Storage
   * @param variable
   */
  borrarVariable(variable: string) {
    this.storage.remove(variable);
  }

  /**
   * Crea una variable en el Storage
   * @param variable
   * @param valor
   */
  crearVariable(variable: string, valor: any) {
    this.storage.set(variable, valor);
  }

  /**
   * Retorna el valor de una variable del Storage
   * @param variable
    */
  getVariable(variable: string): Promise<any> {
    return new Promise(resolve => {
      this.storage.get(variable).then((result) => {
        // console.log(result);
        resolve(result);
      });
    });
  }

  /**
 * Crea una variable en el Local Storage
 * @param variable
 * @param valor
 */
  crearVariableLocalStorage(variable: string, valor: any) {
    localStorage.setItem(variable, valor);
  }

/**
 * Elimina una variable en el Local Storage
 * @param variable
 * @param valor
 */
eliminarVariableLocalStorage(variable: string) {
  localStorage.removeItem(variable);
}


  /**
  * Retorna el valor de una variable del Local Storage
  * @param variable
   */
  getVariableLocalStorage(variable: string): string {
    return localStorage.getItem(variable);
  }

  /**
   * Carga variablesde la configuracion inicial
   */
  async cargarVariablesConfiguracion() {
    // Valida si existen variables de configuración para crearlas  por defecto
    if (!this.isDefined(await this.getVariable('SERVIDOR'))) {
      this.crearVariable('SERVIDOR', '127.0.0.1');
      this.crearVariable('PROTOCOLO', 'http');
      this.crearVariable('PUERTO', '8080');
      this.crearVariable('PUERTOFILE', '80');
    }
    const PROTOCOLO = await this.getVariable('PROTOCOLO');
    const SERVIDOR = await this.getVariable('SERVIDOR');
    const PUERTO = await this.getVariable('PUERTO');
    const PUERTOFILE = await this.getVariable('PUERTOFILE');
    //this.crearVariableLocalStorage('RESTAPI', PROTOCOLO + '://' + SERVIDOR + ':' + PUERTO + URL);
    //this.crearVariableLocalStorage('FILESERVER', PROTOCOLO + '://' + SERVIDOR + ':' + PUERTOFILE + URL_FILE_SERVER);

    this.crearVariableLocalStorage('RESTAPI', PROTOCOLO +'://' + SERVIDOR + ':' + PUERTO + URL);
    this.crearVariableLocalStorage('FILESERVER', PROTOCOLO +'://' + SERVIDOR + ':' + PUERTOFILE + URL_FILE_SERVER);

    // this.crearVariableLocalStorage('FILESERVER', PROTOCOLO + '://192.168.64.2:' + PUERTOFILE + URL_FILE_SERVER);
  }

  getFormatoNumero(numero: number): any {
    return this.getFormatoNumeroDecimales(numero, 2);
  }

  getFormatoNumeroDecimales(numero: number, decimales: number): any {
    if (!this.isDefined(numero)) {
      numero = 0;
    }
    if (isNaN(numero)) {
      numero = 0;
    }
    return Number(Math.round(parseFloat(numero + 'e' + decimales)) + 'e-' + decimales).toFixed(decimales);
  }
  /**
   * Limpia todo el contenido del Storage
   */
  limpiarVariablesLocalStorage() {
    localStorage.clear();
  }
  /**
   * Retorna la fecha en formato yyyy-MM-dd
   * @param fecha
   */
  getFormatoFecha(fecha: Date): string {
    return this.getFechaFormato(fecha, 'yyyy-MM-dd');
  }

  getFechaFormato(fecha: Date, formato: string): string {
    return this.datePipe.transform(fecha, formato);
  }

  /**
   * Transforma a Date una fecha string
   * @param fecha
   */
  toDate(fecha: string): Date {
    return new Date(fecha);
  }

  /**
   * Suma dias a una fecha
   * @param fecha
   * @param dias
   */
  sumarDiasFecha(fecha: string, dias: number): string {
    let fechaDate: Date;
    fechaDate = this.toDate(fecha);
    fechaDate.setDate(fechaDate.getDate() + dias);
    return this.getFormatoFecha(fechaDate);
  }

  /**
   * Retorna un objeto de tipo RestResponse
   */
  getRestResponse(): RestResponse {
    return {
      error: '',
      mensaje: '',
      totalRegistros: '0',
      token: null,
      datos: null
    };
  }

  /**
  * Retorna un objeto de tipo RestRequest
  */
  getRestRequest(): RestRequest {
    return {
      empresa: this.getVariableLocalStorage('SECUENCIAL'),
      sentencia: '',
      usuario: this.getVariableLocalStorage('USUARIO'),
      clave: btoa(this.getVariableLocalStorage('USUARIO')),
      ide_usua: this.getVariableLocalStorage('IDE_USUA'),
      ide_sucu: this.getVariableLocalStorage('IDE_SUCU'),
      ide_empr: this.getVariableLocalStorage('IDE_EMPR'),
      pagina: 1,
      filas: 50
    };
  }

  /**
   * Despliega la pantalla de seleccionar sucursal si el usuario tiene asignado
   * mas de 2 sucursales
   * @param $title
   * @param $message
   */
  async abrirSucursales(respuestaSucursales) {
    // this.utilitario.crearVariableLocalStorage('SECUENCIAL', '1');
    // this.utilitario.crearVariableLocalStorage('IDE_USUA', '11');
    // let respuestaSucursales: RestResponse = this.utilitario.getRestResponse();
    // respuestaSucursales = await this.authenticationService.getSucursalesUsuario();
    // this.utilitario.abrirSucursales(respuestaSucursales);

    if (respuestaSucursales.error === 'true') {
      this.agregarMensaje('Error', respuestaSucursales.mensaje);
      return;
    }
    const sucursales = [];
    for (const fila of respuestaSucursales.datos) {
      sucursales.push({
        type: 'radio',
        label: fila.NOM_SUCU,
        value: fila.SIS_IDE_SUCU
      });

      if (respuestaSucursales.totalRegistros === '1') {
        this.crearVariableLocalStorage('IDE_SUCU', fila.SIS_IDE_SUCU);
        this.crearVariableLocalStorage('NOM_SUCU', fila.NOM_SUCU);
        this.crearVariableLocalStorage('NOMBRE_COMERCIAL_SUCU', fila.NOMBRE_COMERCIAL_SUCU);
        this.crearVariableLocalStorage('IDENTIFICACION_SUCU', fila.IDENTIFICACION_SUCU);
        this.crearVariableLocalStorage('LOGO_SUCU', 'data:image/png;base64, ' + fila.LOGO_SUCU);
        this.crearVariableLocalStorage('SUCURSALES', 'false');
        return;
      }
    }

    const prompt = await this.alertCtrl.create({
      message: 'Seleccione una Sucursal',
      inputs: sucursales,
      buttons: [
        {
          text: 'ACEPTAR',
          handler: data => {
            this.crearVariableLocalStorage('IDE_SUCU', data);
            for (const fila of respuestaSucursales.datos) {
              if (fila.SIS_IDE_SUCU === data) {
                this.crearVariableLocalStorage('NOM_SUCU', fila.NOM_SUCU);
                this.crearVariableLocalStorage('NOMBRE_COMERCIAL_SUCU', fila.NOMBRE_COMERCIAL_SUCU);
                this.crearVariableLocalStorage('IDENTIFICACION_SUCU', fila.IDENTIFICACION_SUCU);
                this.crearVariableLocalStorage('LOGO_SUCU', 'data:image/png;base64, ' + fila.LOGO_SUCU);
                this.crearVariableLocalStorage('SUCURSALES', 'true');
                break;
              }
            }
            this.abrirPagina('home');
          }
        }],
      backdropDismiss: false
    });
    await prompt.present();
  }

  /**
   * Genera sentecia Insert para API Rest
   * @param tabla 
   * @param pk 
   * @param valores 
   */
  generarInsert(tabla: string, pk: string, valores: any): string {
    const valoresJSON = JSON.stringify(valores);
    // "sentencia": "{"tabla":"SIS_OPCION","pk":"IDE_OPCI","valores":{"IDE_OPCI":"null","NOM_OPCI":"Prueba App",AUDITORIA_OPCI":"false"}}"
    const sentencia = '{"tabla":"' + tabla + '","pk":"' + pk + '","valores":' + valoresJSON + '}';
    // console.log(sentencia);
    return sentencia;
  }

  /**
   * Genera sentecia Delete para API Rest
   * @param tabla 
   * @param pk 
   * @param condiciones 
   */
  generarDelete(tabla: string, pk: string, condiciones: any): string {
    const condicionesJSON = JSON.stringify(condiciones);
    // "sentencia": "{\"tabla\":\"SIS_OPCION\",\"pk\":\"IDE_OPCI\", \"condiciones\":{\"IDE_OPCI\":\"1000\"} }"
    const sentencia = '{"tabla":"' + tabla + '","pk":"' + pk + '","condiciones":' + condicionesJSON + '}';
    // console.log(sentencia);
    return sentencia;
  }

/**
 *  Genera sentecia Update para API Rest
 * @param tabla 
 * @param pk 
 * @param valores 
 * @param condiciones 
 */
  generarUpdate(tabla: string, pk: string, valores: any, condiciones: any): string {
    const condicionesJSON = JSON.stringify(condiciones);
    const valoresJSON = JSON.stringify(valores);
    // "sentencia": "{\"tabla\":\"SIS_OPCION\",\"pk\":\"IDE_OPCI\",\"valores\":{\"NOM_OPCI\":\"Prueba App\",\"TIPO_OPCI\":\"Tipo\"}, \"condiciones\":{\"IDE_OPCI\":\"1000\"} }"
    const sentencia = '{"tabla":"' + tabla + '","pk":"' + pk + '","valores":' + valoresJSON + ',"condiciones":' + condicionesJSON + '}';
    // console.log(sentencia);
    return sentencia;
  }

  /**
   * Navega hacia una pagina
   * @param path 
   * @param parametros 
   */
  abrirPagina(path: string, parametros?: any) {
    if (parametros) {
      this.router.navigate(['private', path], { state:  parametros  });
    } else {
      this.router.navigate(['private', path] );
    }
  }



/**
 * Genera sentecia para llamar a un reporte
 * @param reporte 
 * @param parametros 
 */
generarReporte(reporte: string, parametros: any): string {  
  const parametrosJSON = JSON.stringify(parametros);
  // "sentencia": "{\"reporte\":\"rep_proformas/rep_proforma.jasper\",\"parametros\":{\"ide_cccpr\":\"(int)15\"}}"
   const sentencia = '{"reporte":"' + reporte + '","parametros":' + parametrosJSON + '}';
  // console.log(sentencia);
  return sentencia;
}

}
