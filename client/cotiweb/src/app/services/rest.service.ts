import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestResponse, RestRequest } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { UtilitarioService } from './utilitario.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private platform: Platform, private utilitario: UtilitarioService) { }

  private handleError<T>(operation = 'operation', result?: RestResponse) {
    return (error: any): Observable<RestResponse> => {
      // TODO: send the error to remote logging infrastructure
      //console.log(JSON.stringify(error.error) +' Error RestService :  ' + JSON.stringify(error)); // log to console instead
      // Let the app keep running by returning an empty result.
      let msgError= 'Servidor no disponible';
      if(error.error.mensaje){
        msgError=error.error.mensaje;
      }
      const response: RestResponse = {
        error: true,
        mensaje: msgError,
        totalRegistros: null,
        token: null,
        datos: null
      };
      return of(response as RestResponse);
    };
  }

  consultar(metodo: string, pagina: number): Promise<RestResponse> {
    // console.log(sentencia);
    const request: RestRequest = this.utilitario.getRestRequest();
    //.....request.sentencia = btoa(sentencia);
    request.pagina = pagina;
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar(metodo, request).subscribe(resp => {
        respuesta = resp;
        //ojo borrar 
        if (resp.datos) {
          respuesta.datos = resp.datos;
          // console.log(this.respuesta);
        }
        if (resp.error === true) {
          this.utilitario.agregarMensaje('Error', resp.mensaje);
        }
        resolve(respuesta);
      });
    });
  }

  /**
   * LLama mediante post a un metodo del api rest
   * @param metodo 
   * @param request 
   */
  llamarServicioWeb(metodo: string, request: any): Promise<RestResponse> {
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar(metodo, request).subscribe(resp => {
        respuesta = resp;
        if (resp.datos) {
          respuesta.datos = resp.datos;
          // console.log(this.respuesta);
        }
        if (resp.error === true) {
          this.utilitario.agregarMensaje('Error', resp.mensaje);
        }
        resolve(respuesta);
      });
    });
  }

  consultarUnico(sentencia: string): Promise<RestResponse> {
    const request: RestRequest = this.utilitario.getRestRequest();
    //.....request.sentencia = btoa(sentencia);
    request.pagina = 1;
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar('rest/consultarUnico', request).subscribe(resp => {
        respuesta = resp;
        if (resp.datos) {
          const obj = JSON.parse(resp.datos);
          // console.log(obj.datos);
          respuesta.datos = obj.datos;
          // console.log(this.respuesta);
        }
        if (resp.error === true) {
          this.utilitario.agregarMensaje('Error', resp.mensaje);
        }
        resolve(respuesta);
      });
    });
  }

  insertar(metodo: string, request: any): Promise<RestResponse> {
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar(metodo, request).subscribe(resp => {
        respuesta = resp;
        if (resp.error === true) {
          this.utilitario.agregarMensaje('Error', resp.mensaje);
        }
        resolve(respuesta);
      });
    });
  }

  actualizar(metodo: string, request: any): Promise<RestResponse> {
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar(metodo, request).subscribe(resp => {
        respuesta = resp;
        if (resp.error === true) {
          this.utilitario.agregarMensaje('Error', resp.mensaje);
        }
        resolve(respuesta);
      });
    });
  }

  eliminar(metodo: string): Promise<RestResponse> {
    const request: RestRequest = this.utilitario.getRestRequest();
    //.....request.sentencia = sentencia;
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar(metodo, request).subscribe(resp => {
        respuesta = resp;
        if (resp.error === true) {
          this.utilitario.agregarMensaje('Error al eliminar', resp.mensaje);
        }
        resolve(respuesta);
      });
    });
  }

  ejecutar(metodo: string, request: any): Observable<RestResponse> {
    const RESTAPI = this.utilitario.getRestApi();
    //console.log (SIGAFI_RESTAPI);
    return this.http.post<RestResponse>(RESTAPI + '/' + metodo, request).pipe(
      catchError(this.handleError(metodo))
    );
  }


  getCombo(tabla: string, campoCodigo: string, campoLabel: string, condicion?: string): Promise<RestResponse> {
    const parametros = {
      tabla,
      campoCodigo,
      campoLabel,
      condicion,
    }
    return this.llamarServicioWeb('sistema/getCombo', parametros);
  }

}
