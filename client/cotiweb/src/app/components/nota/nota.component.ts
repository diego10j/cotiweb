import {MenuItem} from 'primeng/api';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss'],
})
export class NotaComponent implements OnInit {
  @Input() opciones:  MenuItem[];
  public home: MenuItem;

  constructor() {
    this.home = {icon: 'pi pi-home',routerLink: '/private/inicio'};
   }

  ngOnInit() {}

}
