import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {

  data: any;
  data1: any;

  cars: SelectItem[];

  constructor() {
    this.data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
          {
              label: 'Cotizaciones Realizadas',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              fill: false,
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Cotizaciones Concretadas',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              fill: false,
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };

  this.data1 = {
    labels: ['Realizada','Pendientes','Concretadas'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]    
    };


    this.cars = [
      {label: 'Martha Guayasamin', value: 'Martha Guayasamin'},
      {label: 'Daniel Arevalo', value: 'Daniel Arevalo'},
      {label: 'Edison Yazuma', value: 'Edison Yazuma'},
      {label: 'Katerin Quishpe', value: 'Katerin Quishpe'},
      {label: 'Karina Arevalo', value: 'Karina Arevalo'},
      {label: 'Fanny Guayasamin', value: 'Fanny Guayasamin'}
  ];

   }

  ngOnInit() {
  }

}
