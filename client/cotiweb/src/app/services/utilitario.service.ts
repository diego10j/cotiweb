import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { environment } from "../../environments/environment";
import { RestRequest, RestResponse, Producto } from '../interfaces/interfaces';
import { SelectItem } from "primeng/api";

const URL = environment.rest_api;

@Injectable({
  providedIn: "root",
})
export class UtilitarioService {
  constructor(
    private toastController: ToastController,
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
  async agregarNotificacion(mensaje: any, color = "dark") {
    const toast = await this.toastController.create({
      message: mensaje,
      color,
      duration: 2000,
      position: "top",
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
      buttons: ["OK"],
    });
    await alert.present();
  }

  /**
   * Agrega un mensaje en la pantalla
   * @param $title
   * @param $message
   */
  async agregarMensajeError($title, $message) {
    //this.mensaje.add({severity:'error', summary:$title, detail:$message});
  }

  /**
   * Retorna si una variable esta definida
   * @param variable
   */
  isDefined(variable: any): boolean {
    return typeof variable !== "undefined" && variable !== null;
  }

  /**
   * Retorna si una variable esta definida
   * @param variable
   */
  isEmpty(variable: string): boolean {
    if (this.isDefined(variable)) {
      variable = variable.trim();
      if (variable.length === 0) {
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
    return new Promise((resolve) => {
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
    return Number(
      Math.round(parseFloat(numero + "e" + decimales)) + "e-" + decimales
    ).toFixed(decimales);
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
    return this.getFechaFormato(fecha, "yyyy-MM-dd");
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
      error: false,
      mensaje: "",
      totalRegistros: "0",
      token: null,
      datos: null,
    };
  }

  /**
   * Retorna un objeto de tipo RestRequest
   */
  getRestRequest(): RestRequest {
    return {
      usuario: this.getVariableLocalStorage("LOGIN_USUA"),
      clave: btoa(this.getVariableLocalStorage("LOGIN_USUA")),
      pagina: 1,
      filas: 50,
    };
  }

  getRestApi(): string {
    return URL;
  }

  /**
   * Navega hacia una pagina
   * @param path
   * @param parametros
   */
  abrirPagina(path: string, parametros?: any) {
    if (parametros) {
      this.router.navigate(["private", path], { state: parametros });
    } else {
      this.router.navigate(["private", path]);
    }
  }

  /**
   * Navega hacia una pagina
   * @param path
   * @param parametros
   */
  abrirPaginaPublica(path: string, parametros?: any) {
    if (parametros) {
      this.router.navigate([path], { state: parametros });
    } else {
      this.router.navigate([path]);
    }
  }

  getCombo(combo: RestResponse): SelectItem[] {
    const vacio = [{ label: "Seleccionar...", value: null }];
    let datosCombo: SelectItem[];
    datosCombo = combo.datos;
    datosCombo.unshift(...vacio);
    return datosCombo;
  }


  async agregarListaProductos(producto: Producto) {
    let lista: Producto[] = [];
    const listaGuardada: Producto[] = await this.storage.get('lista');
    if (listaGuardada) {
      lista = listaGuardada;
    }

    const existe = lista.find(prod => prod.codigo === producto.codigo);
    if (!existe) {
      lista.unshift(producto);
      this.storage.set('lista', lista);
    }
  }

  async getListaProductos() {
    let lista: Producto[] = [];
    const listaGuardada: Producto[] = await this.storage.get('lista');
    if (listaGuardada) {
      lista = listaGuardada;
    }
    return lista;
  }

  async eliminarProductoLista(producto: Producto) {
    let lista: Producto[] = [];
    const listaGuardada: Producto[] = await this.storage.get('lista');
    if (listaGuardada) {
      lista = listaGuardada;
    }
    const existe = lista.find(prod => prod.codigo === producto.codigo);
    if (existe) {
      let num: number = 0;
      for (let i in lista) {
        if (lista[i].codigo === producto.codigo) {
          lista.splice(num, 1);
        }
        num++;
      }
      this.storage.set('lista', lista);
    }
  }


  async existeProductoLista(producto: Producto){
    let lista: Producto[] = [];
    const listaGuardada: Producto[] = await this.storage.get('lista');
    if (listaGuardada) {
      lista = listaGuardada;
    }

    const existe = lista.find(prod => prod.codigo === producto.codigo);
    if (!existe) {
      return false;
    }
    return true;
  }
  

  async limpiarListaProductos() {
    this.storage.remove('lista');
  }
  
}
