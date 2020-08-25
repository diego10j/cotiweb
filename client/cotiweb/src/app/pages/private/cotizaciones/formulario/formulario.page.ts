import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { RestService } from '../../../../services/rest.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  providers: [MessageService],
})
export class FormularioPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public COD_CABC = 11;

  //Combos
  public comboCliente: SelectItem[];
  public comboTipoCotiza: SelectItem[];
  public comboCondiCotiza: SelectItem[];
  public comboEstadoCotiza: SelectItem[];
  public comboValidez: SelectItem[];
  public comboUsuario: SelectItem[];

  constructor(private restService: RestService,
              private utilitario: UtilitarioService,
              private messageService: MessageService,
              private alertController: AlertController) { }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();

  //Combo Cliente
  const COD_CLIE=this.respuesta.datos[0].COD_CLIE;
  const COD_TICO=this.respuesta.datos[0].COD_TICO;
  const COD_ESCO=this.respuesta.datos[0].COD_ESCO;
  const COD_COCO=this.respuesta.datos[0].COD_COCO;
  const COD_VACO=this.respuesta.datos[0].COD_VACO;
  const COD_USUA=this.respuesta.datos[0].COD_USUA;
  
  this.comboCliente = this.utilitario.getCombo(await this.restService.getCombo('CLIENTE', 'COD_CLIE', 'NOMBRES_CLIE','COD_CLIE = '+COD_CLIE),false);


  this.comboTipoCotiza = this.utilitario.getCombo(await this.restService.getCombo('TIPO_COTIZACION', 'COD_TICO', 'NOMBRE_TICO','COD_TICO = '+COD_TICO),false);
  this.comboCondiCotiza = this.utilitario.getCombo(await this.restService.getCombo('CONDICION_COTIZACION', 'COD_COCO', 'NOMBRE_COCO','COD_COCO = '+COD_COCO),false);
  this.comboEstadoCotiza = this.utilitario.getCombo(await this.restService.getCombo('ESTADO_COTIZACION', 'COD_ESCO', 'NOMBRE_ESCO','COD_ESCO = '+COD_ESCO),false);
  this.comboValidez = this.utilitario.getCombo(await this.restService.getCombo('VALIDEZ_COTIZACION', 'COD_VACO', 'NOMBRE_VACO','COD_VACO = '+COD_VACO),false);
  this.comboUsuario = this.utilitario.getCombo(await this.restService.getCombo('USUARIO', 'COD_USUA', 'NOMBRE_USUA','COD_USUA = '+COD_USUA),false);

    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('cotizacion/buscarPorId/'+this.COD_CABC, this.pagina);
  }


}
