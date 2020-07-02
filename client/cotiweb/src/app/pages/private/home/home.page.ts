import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  seleccionado = 'inicio';
  numNotificaciones = 0;

  constructor(){
  }

  async ionViewWillEnter() {
    // Consultar si tiene notificacioness
    this.numNotificaciones = 5;
    this.seleccionado = 'inicio';
  }

  clickTab(opcion: string) {
    this.seleccionado = opcion;
    if (this.seleccionado === 'notificaciones') {
      this.numNotificaciones = 0;
    }
  }

}
