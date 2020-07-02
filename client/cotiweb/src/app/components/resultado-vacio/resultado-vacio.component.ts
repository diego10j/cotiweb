import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resultado-vacio',
  templateUrl: './resultado-vacio.component.html',
  styleUrls: ['./resultado-vacio.component.scss'],
})
export class ResultadoVacioComponent implements OnInit {
  @Input() textoPrincipal = 'No existen Resultados';
  @Input() textoSecundario: string;

  constructor() { }

  ngOnInit() {}

}
