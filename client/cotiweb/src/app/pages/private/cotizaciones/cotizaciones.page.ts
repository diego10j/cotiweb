import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RestResponse } from '../../../interfaces/interfaces';
import { RestService } from '../../../services/rest.service';
import { UtilitarioService } from '../../../services/utilitario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.page.html',
  styleUrls: ['./cotizaciones.page.scss'],
  providers: [MessageService],
})
export class CotizacionesPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;

  public seleccionado: any;

  constructor(private restService: RestService,
              private utilitario: UtilitarioService,
              private messageService: MessageService,
              private alertController: AlertController) { }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('cotizacion/listar', this.pagina);
  }

  public ver(){
    this.utilitario.abrirPagina('formulario');
  }


}
