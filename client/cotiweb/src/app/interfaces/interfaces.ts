import { Observable } from 'rxjs';
export interface OpcionMenu {
  icon: string;
  name: string;
  redirectTo: string;
  color: string;
  seleccionado: boolean;
}

export interface RestResponse {
  error: boolean;
  mensaje: string;
  totalRegistros: string;
  token: string;
  datos: any;
}

export interface RestRequest {
  usuario: string;
  clave: string;
  pagina: number;
  filas: number;
}

export interface Producto {
  codigo: string;
  nombre: string;
  cantidad: number;
  imagen: string;
  unidad: string;
  codigo_unidad:string;
}