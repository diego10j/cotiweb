import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { RestResponse } from '../../../interfaces/interfaces';
import { AuthenticationService } from '../../../services/authentication.service';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  private respuestaLogin: RestResponse = this.utilitario.getRestResponse();

  constructor(private authenticationService: AuthenticationService,
              private utilitario: UtilitarioService,
              private menuCtrl: MenuController) { }

   async ngOnInit() {
    this.menuCtrl.enable(false);
  }

   async login(form: NgForm) { 
    this.respuestaLogin = await this.authenticationService.login(
      form.value.usuario,
      form.value.clave,
    );
    if (this.respuestaLogin.error === true) {
      this.utilitario.agregarMensaje('Error', this.respuestaLogin.mensaje);
    } else {
      this.menuCtrl.enable(true);
    }
    form.reset();
  }

}
