import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-rango-fechas',
  templateUrl: './rango-fechas.page.html',
  styleUrls: ['./rango-fechas.page.scss'],
})
export class RangoFechasPage {
  @Input() fechaInicio: string;
  @Input() fechaFin: string;
  fechaMaxima: string;


  constructor(private modalCtrl: ModalController, private utilitario: UtilitarioService) {
    this.fechaMaxima = this.utilitario.getFormatoFecha(new Date());
   }


  cerrar() {
    this.modalCtrl.dismiss();
  }

  aceptar() {
    this.modalCtrl.dismiss({
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin
    });
  }

}
