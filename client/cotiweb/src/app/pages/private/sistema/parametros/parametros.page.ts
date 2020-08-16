import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
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
    return this.restService.consultar('sistema/getParametros', this.pagina);
  }

  public modificar(event) {
    const parametros = {
      seleccionado: event.COD_USUA,
    };
    this.utilitario.abrirPagina('modificar-parametro', parametros);
  }

  

}
