import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { RestService } from '../../../../services/rest.service';
import { RestResponse } from '../../../../interfaces/interfaces';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.page.html',
  styleUrls: ['./parametros.page.scss'],
  providers: [MessageService],
})
export class ParametrosPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
              private utilitario: UtilitarioService,
              private messageService: MessageService,
              private alertController: AlertController) { 
                this.listaBreadcrumb = [
                  { label: 'SISTEMA' },
                  { label: 'Parámetros del sistema' }
                ];
              }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('sistema/getParametros', this.pagina);
  }

  public modificar(event) {
    this.utilitario.abrirPaginaPublica('private/modificar-parametro/'+ event.NEMONICO_PARA);
  }

  

}
