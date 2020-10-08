import { Component, OnInit } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActionSheetController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(public utilitario: UtilitarioService, private authenticationService: AuthenticationService,
    private actionSheetCtrl: ActionSheetController, private menuCtrl: MenuController) { }

  async ionViewWillEnter() {
    
  }

  async presentarActionSheet() {

    const opciones = [];
    opciones.push({
      text: 'Cerrar Sesión',
      icon: 'power',
      handler: async () => {
        this.menuCtrl.enable(false);
        await this.authenticationService.logout();
        this.utilitario.abrirPaginaPublica("login");
      }
    });
    opciones.push({
      text: 'Cancelar',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      backdropDismiss: false,
      buttons: opciones
    });
    await actionSheet.present();
  }





}
