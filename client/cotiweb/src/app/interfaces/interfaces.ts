import { Observable } from 'rxjs';
export interface OpcionMenu {
  icon: string;
  name: string;
  redirectTo: string;
  color: string;
  seleccionado: boolean;
}

export interface RestResponse {
  error: string;
  mensaje: string;
  totalRegistros: string;
  token: string;
  datos: any;
}

export interface RestRequest {
  empresa: string;
  sentencia: string;
  usuario: string;
  clave: string;
  ide_usua: string;
  ide_sucu: string ;
  ide_empr: string ;
  pagina: number;
  filas: number;
}
