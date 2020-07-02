import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { UtilitarioService } from '../../services/utilitario.service';
import { RestResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss'],
})
export class ComboComponent implements OnInit {

  @Input() tabla: string;
  @Input() campoCodigo: string;
  @Input() campoNombre: string;
  @Input() condicion: string;
  @Output() ngModel = new EventEmitter<string>();

  combo: RestResponse = this.utilitario.getRestResponse();
  constructor(private restService: RestService, private utilitario: UtilitarioService) { }

  async ngOnInit() {
    this.combo = await this.cargarCombo();
  }

  private cargarCombo(): Promise<RestResponse> {

    let sqlCondicion='';
    if(this.condicion){
      sqlCondicion  = 'WHERE 1 = 1 AND ' + this.condicion + ' ';
    }
    return this.restService.consultar
      ("SELECT " + this.campoCodigo + " AS CODIGO, " + this.campoNombre + " AS VALOR "
        + "FROM " + this.tabla + " "
        + sqlCondicion
        + "ORDER BY " + this.campoNombre, 1);
  }


  seleccionarOpcion(evt) {
    // console.log(evt.detail.value);
    this.ngModel.emit(evt.detail.value);
  }

}
