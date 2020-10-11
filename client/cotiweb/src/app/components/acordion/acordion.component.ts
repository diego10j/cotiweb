import { Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../services/authentication.service';
import { UtilitarioService } from '../../services/utilitario.service';

@Component({
  selector: 'app-acordion',
  templateUrl: './acordion.component.html',
  styleUrls: ['./acordion.component.scss'],
})
export class AcordionComponent implements OnInit {

  public items: MenuItem[];

    constructor(

        private authenticationService: AuthenticationService,
        public utilitario: UtilitarioService,
        private menuCtrl: MenuController) {

    }

    public ngOnInit() {

      this.cargarmenu();
    }

  public abrirPagina(ruta) {
    this.utilitario.abrirPagina(ruta);
    this.menuCtrl.close();
}

public async logout() {
  this.menuCtrl.enable(false);
  await this.authenticationService.logout();
}

public cargarmenu(){
  if(JSON.parse(localStorage.getItem('MENU'))){
    this.items=[];
    const respMenu = JSON.parse(localStorage.getItem('MENU'));
   // console.log(respMenu);
    if (respMenu) {
        for (const principal of respMenu) {
            for (const opcion of principal.items) {
                opcion.command = () => { this.abrirPagina(opcion.path); };
            }
        }
        this.items = respMenu;
    }
  }
 
}

}
