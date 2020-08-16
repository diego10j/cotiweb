import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { RestRequest, RestResponse } from '../interfaces/interfaces';
import { RestService } from './rest.service';
import { UtilitarioService } from './utilitario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // instancia del objeto de sesion
  authenticationState = new BehaviorSubject(false);

  constructor(public restService: RestService,
              private utilitario: UtilitarioService,
              private platform: Platform,
              private storage: Storage) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  getEmpresas(): Promise<RestResponse> {
    let respuesta = null;
    const request: RestRequest = this.utilitario.getRestRequest();
    return new Promise(resolve => {
      this.restService.ejecutar('auth/getEmpresas', request).subscribe(resp => {
        respuesta = resp;
        if (resp.datos) {
          const obj = JSON.parse(resp.datos);
          respuesta.datos = obj.datos;
        }
        resolve(respuesta);
      });
    });
  }

  login(usuario: string, clave: string): Promise<RestResponse> {

    const request: RestRequest = this.utilitario.getRestRequest();
    request.usuario = usuario;
    request.clave = clave;

    return new Promise(resolve => {
      let respuesta = null;
      this.restService.ejecutar('usuario/login', request).subscribe(resp => {
        respuesta = resp;
        if (resp.datos) {
          const obj = resp.datos;
          respuesta.datos = obj;
        }
        if (respuesta.error === false) { 
          // Crea variable de sesion
          this.storage.set('COTI-TOKEN', respuesta.token).then(res => {
            this.authenticationState.next(true);
            this.utilitario.crearVariableLocalStorage('COTI-OKEN', respuesta.token);
            this.utilitario.crearVariableLocalStorage('COD_USUA', respuesta.datos.COD_USUA);
            this.utilitario.crearVariableLocalStorage('COD_PERF', respuesta.datos.COD_PERF);
            this.utilitario.crearVariableLocalStorage('NOMBRE_USUA', respuesta.datos.NOMBRE_USUA);
            this.utilitario.crearVariableLocalStorage('LOGIN_USUA', respuesta.datos.LOGIN_USUA);
            this.utilitario.crearVariableLocalStorage('CORREO_USUA', respuesta.datos.CORREO_USUA);
            this.utilitario.crearVariableLocalStorage('TELEFONO_USUA', respuesta.datos.TELEFONO_USUA);
            this.utilitario.crearVariableLocalStorage('AVATAR_USUA', respuesta.datos.AVATAR_USUA);
          });
        }
        resolve(respuesta);
      });
    });
  }


getSucursalesUsuario(): Promise<RestResponse> {
    const request: RestRequest = this.utilitario.getRestRequest();
    return new Promise(resolve => {
      let respuesta = null;
      this.restService.ejecutar('auth/getSucursalesUsuario', request).subscribe(resp => {
        respuesta = resp;
        if (resp.datos) {
          const obj = JSON.parse(resp.datos);
          respuesta.datos = obj.datos;
        }
        resolve(respuesta);
      });
    });
  }


logout() {
    return this.storage.remove('COTI-TOKEN').then(async () => {
      this.utilitario.limpiarVariablesLocalStorage();
      this.authenticationState.next(false);
    });
  }

isAuthenticated() {
    return this.authenticationState.value;
  }

checkToken() {
    return this.storage.get('COTI-TOKEN').then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

getToken() {
    return this.storage.get('COTI-TOKEN').then(
      data => { return data }
    );
  }

  private getTokenState(user) {
    return (user != null) ? true : false;
  }

 

}
