import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem, MenuItem } from 'primeng/api';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { AlertController } from '@ionic/angular';
import { RestResponse } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
  providers: [MessageService],
})
export class ModificarPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public seleccionado : any;
  public COD_CABC = 11;

  //Combos
  public comboCliente: SelectItem[];
  public comboTipoCotiza: SelectItem[];
  public comboCondiCotiza: SelectItem[];
  public comboEstadoCotiza: SelectItem[];
  public comboValidez: SelectItem[];
  public comboUsuario: SelectItem[];
  public comboProductos: SelectItem[];
  public comboUnidades: SelectItem[];
  public comboIVA: SelectItem[];



  constructor(private restService: RestService,
              private utilitario: UtilitarioService,
              private messageService: MessageService,
              private alertController: AlertController) { 
                this.comboIVA = [{label: 'SI', value: '1'},{label: 'NO', value: '0'}]
              }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();

  //Combo Cliente
  const COD_CLIE=this.respuesta.datos[0].COD_CLIE;
  const COD_TICO=this.respuesta.datos[0].COD_TICO;
  const COD_ESCO=this.respuesta.datos[0].COD_ESCO;
  const COD_USUA=this.respuesta.datos[0].COD_USUA;
  
  this.comboCliente = this.utilitario.getCombo(await this.restService.getCombo('CLIENTE', 'COD_CLIE', 'NOMBRES_CLIE','COD_CLIE = '+COD_CLIE),false);

  this.comboTipoCotiza = this.utilitario.getCombo(await this.restService.getCombo('TIPO_COTIZACION', 'COD_TICO', 'NOMBRE_TICO','COD_TICO = '+COD_TICO),false);
  this.comboCondiCotiza = this.utilitario.getCombo(await this.restService.getCombo('CONDICION_COTIZACION', 'COD_COCO', 'NOMBRE_COCO'));
  this.comboEstadoCotiza = this.utilitario.getCombo(await this.restService.getCombo('ESTADO_COTIZACION', 'COD_ESCO', 'NOMBRE_ESCO','COD_ESCO = '+COD_ESCO),false);
  this.comboValidez = this.utilitario.getCombo(await this.restService.getCombo('VALIDEZ_COTIZACION', 'COD_VACO', 'NOMBRE_VACO'));
  this.comboUsuario = this.utilitario.getCombo(await this.restService.getCombo('USUARIO', 'COD_USUA', 'NOMBRE_USUA','COD_USUA = '+COD_USUA),false);
  this.comboProductos = this.utilitario.getCombo(await this.restService.getCombo('PRODUCTO', 'COD_PROD', 'NOMBRE_PROD'));
  this.comboUnidades = this.utilitario.getCombo(await this.restService.getCombo('UNIDAD_MEDIDA', 'COD_UNID', 'NOMBRE_UNID'));
  this.calcularTotalFactura();
  this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('cotizacion/buscarPorId/'+this.COD_CABC, this.pagina);
  }

  public seleccionaProducto(evt, fila){
    const nombre=this.getNombreProducto(evt.value);
    fila.NOMBRE_PROD=nombre;
  }

  public seleccionaUnidadMedida(evt, fila){
    const nombre=this.getNombreUnidadMedida(evt.value);
    fila.NOMBRE_UNID=nombre;
  }

  public getNombreProducto(value) : string{
    const obj= this.comboProductos.find(x => x.value === value);
    return obj.label;
  }
  
  public getNombreUnidadMedida(value) : string{
    const obj= this.comboUnidades.find(x => x.value === value);
    return obj.label;
  }


  public calcularDetalle(fila:any){
     
      let cantidad:number = fila.CANTIDAD_DECO;
      let precio:number = fila.PRECIO_DECO;
      let total:number = cantidad * precio ;
      fila.TOTAL_DECO=total;
      this.calcularTotalFactura();
  }

  private calcularTotalFactura(){
    let subtotal:number = 0;
    let subtotal0:number = 0;
    let iva:number = 0;
    let total:number = 0 ;
    for (let fila of this.respuesta.datos){
      let sub=fila.TOTAL_DECO;
      if(fila.IVA_DECO ===1){
        subtotal = subtotal+ sub;
      }
      else{
        subtotal0 = subtotal0+ sub;
      }
    }
    const porcentajeIVA= 0.12;
    iva = subtotal * porcentajeIVA;
    total= subtotal+subtotal0+iva;
    for (const fila of this.respuesta.datos){
      fila.SUBTOTAL_CABC=subtotal;
      fila.SUBTOTAL0_CABC=subtotal0;
      fila.IVA_CABC=iva;
      fila.TOTAL_CABC=total;
      break;
    }
  }
  

  insertarProducto(seleccionado: any) {

  }

  eliminarProducto(seleccionado: any) {

  }
}
