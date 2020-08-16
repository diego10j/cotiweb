import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { UtilitarioService } from '../../services/utilitario.service';
import { RestResponse } from '../../interfaces/interfaces';
import { SelectItem } from 'primeng/api';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboComponent),
      multi: true
    }
  ]
})
export class ComboComponent implements OnInit, ControlValueAccessor {

  @Input() tabla: string;
  @Input() campoCodigo: string;
  @Input() campoLabel: string;
  @Input() condicion: string;
  @Input() seleccionado: any;
  @Input() required: boolean = false;
  @Output() ngModel = new EventEmitter<string>();


  value: string;
  isDisabled: boolean;
  onChange = (_: any) => { }
  onTouch = () => { }

  datosCombo: SelectItem[];
  constructor(private restService: RestService, private utilitario: UtilitarioService) { }

  async ngOnInit() {
    const vacio = [
      { label: 'Seleccionar...', value: null }
    ];
    const combo = await this.cargarCombo();
    this.datosCombo = combo.datos;
    this.datosCombo.unshift(...vacio);
  }

  private cargarCombo(): Promise<RestResponse> {

    const parametros = {
      tabla: this.tabla,
      campoCodigo: this.campoCodigo,
      campoLabel: this.campoLabel,
      condicion: this.condicion,
    }
    return this.restService.llamarServicioWeb('cotiweb/getCombo', parametros);
  }


  seleccionarOpcion(evt) {
  console.log(evt.value);
  this.ngModel.emit(evt.value);
  }




  onInput(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }
  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}

