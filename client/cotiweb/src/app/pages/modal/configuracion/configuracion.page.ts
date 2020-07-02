import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage{

  @Input() protocolo;
  @Input() servidor;
  @Input() puerto;
  @Input() puertoFile;
  constructor(private modalCtrl: ModalController) { }
 
  guardar() {

    this.modalCtrl.dismiss({
      protocolo: this.protocolo,
      servidor: this.servidor,
      puerto: this.puerto,
      puertoFile: this.puertoFile,
    });

  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

}
