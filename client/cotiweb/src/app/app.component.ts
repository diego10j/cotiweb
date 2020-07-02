import { Component, ViewChild } from '@angular/core';

import { Platform, IonMenu, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data.service';
import { OpcionMenu, RestResponse } from './interfaces/interfaces';
import { AuthenticationService } from './services/authentication.service';
import { UtilitarioService } from './services/utilitario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  listaMenu: Observable<OpcionMenu[]>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private dataService: DataService,
    public utilitario: UtilitarioService,
    private menuCtrl: MenuController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.listaMenu = this.dataService.getMenu();
      await this.utilitario.cargarVariablesConfiguracion(); //await ?
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.menuCtrl.enable(true);
          this.router.navigate(['private', 'home']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  async logout() {
    this.menuCtrl.enable(false);
    await this.authenticationService.logout();
  }

  async cambiarSucursal() {
    let respuestaSucursales: RestResponse = this.utilitario.getRestResponse();
    respuestaSucursales = await this.authenticationService.getSucursalesUsuario();
    await this.utilitario.abrirSucursales(respuestaSucursales);
  }



}
