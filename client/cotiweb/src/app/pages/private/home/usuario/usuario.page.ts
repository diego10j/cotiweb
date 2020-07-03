import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { NgForm } from '@angular/forms';
import { RestResponse } from '../../../../interfaces/interfaces';
import { RestService } from '../../../../services/rest.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage {

  isDatos = true;

  password ={
    actual:null,
    nueva:null,
    confirma:null
  }
  

  respuesta: RestResponse = this.utilitario.getRestResponse();
  buscando = false;

  constructor(private restService: RestService,
    private utilitario: UtilitarioService) { }

    async ionViewWillEnter() {
      this.buscando = true;
      this.respuesta = await this.consulta();
      this.buscando = false;
    }


  async guardar() {
    const condiciones = {
      IDE_USUA  : this.utilitario.getVariableLocalStorage('IDE_USUA')
    };
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.actualizar(this.utilitario.generarUpdate('SIS_USUARIO', 'IDE_USUA', this.respuesta.datos,condiciones));
    if(respuesta.error === false){
      //Guardo correctamente
this.utilitario.agregarMensaje("","Se guardo correctamente");
    }

  }


  cambiarSegmento(valor) {
    this.isDatos = valor;
    this.password ={
      actual:null,
      nueva:null,
      confirma:null
    }
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultarUnico
      ("SELECT NOM_USUA,NICK_USUA,AVATAR_USUA,MAIL_USUA "
        + "FROM SIS_USUARIO "
        + "WHERE IDE_USUA=" + this.utilitario.getVariableLocalStorage('IDE_USUA'));
  }

  cambiaClave(){
    
  }
}
