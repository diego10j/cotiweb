import { Component } from '@angular/core';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ActionSheetController, MenuController } from '@ionic/angular';
import { RestResponse } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  constructor(public utilitario: UtilitarioService, private authenticationService: AuthenticationService,
    private actionSheetCtrl: ActionSheetController, private menuCtrl: MenuController) { }


  async presentarActionSheet() {

    const opciones = [];
    opciones.push({
      text: 'Cerrar Sesión',
      icon: 'power',
      handler: async () => {
        this.menuCtrl.enable(false);
        await this.authenticationService.logout();
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





  /**
   * The data structure that will be used for supplying the accordion content
   * @public
   * @property technologies
   * @type {Array}
   */
  public technologies: Array<{ name: string, description: string, image: string }> = [
    {
      name: 'Angular',
      description: 'Google\'s front-end development framework - default option for Ionic development',
      image: '/assets/images/angular-logo.png'
    },
    {
      name: 'VueJS',
      description: 'Latest cutting edge front-end development framework - can be enabled as an option for Ionic development',
      image: '/assets/images/vuejs-logo.png'
    },
    {
      name: 'React',
      description: 'Popular front-end development framework from Facebook- can be enabled as an option for Ionic development',
      image: 'assets/images/react-logo.png'
    },
    {
      name: 'TypeScript',
      description: 'Superset of JavaScript that provides class based object oriented programming and strict data typing',
      image: 'assets/images/typescript-logo.png'
    },
    {
      name: 'Ionic Native',
      description: 'Apache Cordova compatible plugins that allow native device API\'s to be utilised',
      image: 'assets/images/ionic-native-logo.png'
    },
    {
      name: 'Capacitor',
      description: 'Plugins for Progressive Web App and hybrid app development',
      image: 'assets/images/capacitor-logo.png'
    },
    {
      name: 'StencilJS',
      description: 'Custom web component development framework',
      image: 'assets/images/stencil-logo.png'
    },
    {
      name: 'Sass',
      description: 'CSS pre-processor development library',
      image: 'assets/images/sass-logo.png'
    },
    {
      name: 'HTML5',
      description: 'Markup language and front-end API support',
      image: 'assets/images/html5-logo.png'
    }
  ];




  /**
   * Captures and console logs the value emitted from the user depressing the accordion component's <ion-button> element
   * @public
   * @method captureName
   * @param {any}		event 				The captured event
   * @returns {none}
   */
  public captureName(event: any): void {
    console.log(`Captured name by event value: ${event}`);
  }
/**http://masteringionic.com/blog/2019-01-27-creating-a-simple-accordion-widget-in-ionic-4/ */



}
