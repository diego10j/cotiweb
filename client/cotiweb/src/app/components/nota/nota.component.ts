import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss'],
})
export class NotaComponent implements OnInit {
  @Input() texto: string;
  @Input() textoSecundario: string;
  @Input() imagen: string;
  @Input() animated: false;

  constructor() { }

  ngOnInit() {}

}
