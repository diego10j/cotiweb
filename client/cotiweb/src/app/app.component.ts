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

import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  listaMenu: Observable<OpcionMenu[]>;

  items: MenuItem[];

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



      this.items = [
        {
            label: 'File',
            icon: 'pi pi-pw pi-file',
            items: [{
                    label: 'New', 
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {label: 'User', icon: 'pi pi-fw pi-user-plus'},
                        {label: 'Filter', icon: 'pi pi-fw pi-filter'}
                    ]
                },
                {label: 'Open', icon: 'pi pi-fw pi-external-link'},
                {separator: true},
                {label: 'Quit', icon: 'pi pi-fw pi-times'}
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
            ]
        },
        {
            label: 'Help',
            icon: 'pi pi-fw pi-question',
            items: [
                {
                    label: 'Contents',
                    icon: 'pi pi-pi pi-bars'
                },
                {
                    label: 'Search', 
                    icon: 'pi pi-pi pi-search', 
                    items: [
                        {
                            label: 'Text', 
                            items: [
                                {
                                    label: 'Workspace'
                                }
                            ]
                        },
                        {
                            label: 'User',
                            icon: 'pi pi-fw pi-file',
                        }
                ]}
            ]
        },
        {
            label: 'Actions',
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {label: 'Save', icon: 'pi pi-fw pi-save'},
                        {label: 'Update', icon: 'pi pi-fw pi-save'},
                    ]
                },
                {
                    label: 'Other',
                    icon: 'pi pi-fw pi-tags',
                    items: [
                        {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                    ]
                }
            ]
        }
    ];



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





}
