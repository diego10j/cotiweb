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
      console.error('Error RestService :  ' + JSON.stringify(error)); // log to console instead
      // Let the app keep running by returning an empty result.
      const response: RestResponse = {
        error: 'true',
        mensaje: 'Servidor no disponible',
        totalRegistros: null,
        token: null,
        datos: null
      };
      return of(response as RestResponse);
    };
  }

  consultar(sentencia: string, pagina: number): Promise<RestResponse> {
    // console.log(sentencia);
    const request: RestRequest = this.utilitario.getRestRequest();
    request.sentencia = btoa(sentencia);
    request.pagina = pagina;
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar('rest/consultar', request).subscribe(resp => {
        respuesta = resp;
        if (resp.datos) {
          const obj = JSON.parse(resp.datos);
          // console.log(obj.datos);
          respuesta.datos = obj.datos;
          // console.log(this.respuesta);
        }
        if (resp.error==='true'){
          this.utilitario.agregarMensaje('Error', resp.mensaje);
        }
        resolve(respuesta);
      });
    });
  }

  consultarUnico(sentencia: string): Promise<RestResponse> {
    const request: RestRequest = this.utilitario.getRestRequest();
    request.sentencia = btoa(sentencia);
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
        if (resp.error==='true'){
          this.utilitario.agregarMensaje('Error', resp.mensaje);
        }
        resolve(respuesta);
      });
    });
  }

  insertar(sentencia: string): Promise<RestResponse> {
    const request: RestRequest = this.utilitario.getRestRequest();
    request.sentencia = sentencia;
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar('rest/insertar', request).subscribe(resp => {
        respuesta = resp;
        if (resp.datos) {
          // console.log(resp.datos);
          respuesta.datos = resp.datos;
          // console.log(this.respuesta);
        }
        resolve(respuesta);
      });
    });
  }

  actualizar(sentencia: string): Promise<RestResponse> {
    const request: RestRequest = this.utilitario.getRestRequest();
    request.sentencia = sentencia;
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar('rest/actualizar', request).subscribe(resp => {
        respuesta = resp;
        resolve(respuesta);
      });
    });
  }

  eliminar(sentencia: string): Promise<RestResponse> {
    const request: RestRequest = this.utilitario.getRestRequest();
    request.sentencia = sentencia;
    let respuesta = null;
    return new Promise(resolve => {
      this.ejecutar('rest/eliminar', request).subscribe(resp => {
        respuesta = resp;
        resolve(respuesta);
      });
    });
  }

  ejecutar(metodo: string, request: RestRequest): Observable<RestResponse> {
    const SIGAFI_RESTAPI = this.utilitario.getVariableLocalStorage('RESTAPI');
    //console.log (SIGAFI_RESTAPI);
    return this.http.post<RestResponse>(SIGAFI_RESTAPI + '/' + metodo, request).pipe(
      catchError(this.handleError(metodo))
    );
  }

}
