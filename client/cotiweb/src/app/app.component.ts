import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { OpcionMenu } from './interfaces/interfaces';
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';
import { UtilitarioService } from './services/utilitario.service';

import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public listaMenu: Observable<OpcionMenu[]>;

    public items: MenuItem[];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authenticationService: AuthenticationService,
        private dataService: DataService,
        public utilitario: UtilitarioService,
        private menuCtrl: MenuController,
        private router: Router) {
        this.initializeApp();

    }

    public initializeApp() {
        this.platform.ready().then(async () => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.listaMenu = this.dataService.getMenu();

            this.items = [
                {
                    label: 'SISTEMA',
                    icon: '',
                    expanded: true,
                    items: [
                        {
                            label: 'Empresa', icon: 'pi pi-fw pi-users',
                            command: () => { this.abrirPagina('empresa'); }
                        },
                        {
                            label: 'Usuarios', icon: 'pi pi-fw pi-users',
                            command: () => { this.abrirPagina('usuarios'); }
                        },
                        {
                            label: 'Perfiles', icon: 'pi pi-fw pi-check-square',
                            command: () => { this.abrirPagina('perfiles'); }
                        },
                        {
                            label: 'Permisos', icon: 'pi pi-fw pi-check-square',
                            command: () => { this.abrirPagina('permisos'); }
                        },
                        {
                            label: 'Parámetros', icon: 'pi pi-fw pi-cog',
                            command: () => { this.abrirPagina('parametros'); }
                        },
                        {
                            label: 'Opciones', icon: 'pi pi-fw pi-cog',
                            command: () => { this.abrirPagina('opciones'); }
                        },
                    ],
                },
                {
                    label: 'PRODUCTOS',
                    icon: '',
                    expanded: true,
                    items: [
                        {
                            label: 'Productos', icon: 'pi pi-fw pi-tablet',
                            command: () => { this.abrirPagina('productos'); }
                        },
                        {
                            label: 'Archivos Productos', icon: 'pi pi-fw pi-images',
                            command: () => { this.abrirPagina('archivos'); }
                        },
                        {
                            label: 'Categorias', icon: 'pi pi-fw pi-file-o',
                            command: () => { this.abrirPagina('categorias'); }
                        },
                        {
                            label: 'Unidades de Medida', icon: 'pi pi-fw pi-list',
                            command: () => { this.abrirPagina('unidades'); }
                        },
                    ],
                },
                {
                    label: 'COTIZACIONES',
                    icon: '',
                    expanded: true,
                    items: [
                        {
                            label: 'Cotizaciones', icon: 'pi pi-fw pi-table',
                            command: () => { this.abrirPagina('cotizaciones'); }
                        },
                        {
                            label: 'Clientes', icon: 'pi pi-fw pi-id-card',
                            command: () => { this.abrirPagina('clientes'); }
                        },
                        {
                            label: 'Mis Cotizaciones', icon: 'pi pi-fw pi-inbox',
                            command: () => { this.abrirPagina('mis-cotizaciones'); }
                        },
                        {
                            label: 'Graficos', icon: 'pi pi-fw pi-chart-bar',
                            command: () => { this.abrirPagina('graficos'); }
                        },
                        { separator: true },
                        {
                            label: 'Tipo Cotización', icon: 'pi pi-fw pi-list',
                            command: () => { this.abrirPagina('tipos-cotizacion'); }
                        },
                        {
                            label: 'Estados Cotización', icon: 'pi pi-fw pi-list',
                            command: () => { this.abrirPagina('estados-cotizacion'); }
                        },
                        {
                            label: 'Condiciones Cotización', icon: 'pi pi-fw pi-list',
                            command: () => { this.abrirPagina('condiciones-cotizacion'); }
                        },
                    ],
                },
            ];

            // await
           // await this.authenticationService.authenticationState.subscribe((state) => {
           //     if (state) {
           //         this.menuCtrl.enable(true);
           //         this.router.navigate(['private', 'home']);
           //     } else {
           //         this.router.navigate(['login']);
           //     }
           // });
        },
        );
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
