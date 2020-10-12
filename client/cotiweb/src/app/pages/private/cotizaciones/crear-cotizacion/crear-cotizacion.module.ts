import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrearCotizacionPage } from './crear-cotizacion.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { ComponentsModule } from '../../../../components/components.module';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { BuscarClientePageModule } from '../../../modal/buscar-cliente/buscar-cliente.module';
import { BuscarClientePage } from '../../../modal/buscar-cliente/buscar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: CrearCotizacionPage
  }
];

@NgModule({
  entryComponents: [
    BuscarClientePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    ButtonModule,
    ComponentsModule,
    PanelModule,
    InputTextModule,
    FontAwesomeModule,
    TableModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    CalendarModule,
    BuscarClientePageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CrearCotizacionPage]
})
export class CrearCotizacionPageModule {}
