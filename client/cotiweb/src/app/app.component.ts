import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OpcionMenu, RestResponse } from './interfaces/interfaces';
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';
import { UtilitarioService } from './services/utilitario.service';

import { MenuItem } from 'primeng/api';
import { RestService } from './services/rest.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    public items: MenuItem[];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authenticationService: AuthenticationService,
        private restService: RestService,
        public utilitario: UtilitarioService,
        private menuCtrl: MenuController,) {
        this.initializeApp();

    }

    public initializeApp() {
        this.platform.ready().then(async () => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            const respMenu = JSON.parse(localStorage.getItem("MENU"));
            if (respMenu) {
                for (let principal of respMenu) {
                    for (let opcion of principal.items) {
                        opcion.command = () => { this.abrirPagina(opcion.path); }
                    }
                }
                this.items = respMenu;
            }

        });
    }

    public async logout() {
        this.menuCtrl.enable(false);
        await this.authenticationService.logout();
    }


    public abrirPagina(ruta) {
        this.utilitario.abrirPagina(ruta);
        this.menuCtrl.close();
    }


   


}
