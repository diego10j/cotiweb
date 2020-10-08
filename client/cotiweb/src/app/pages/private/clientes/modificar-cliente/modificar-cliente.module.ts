import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModificarClientePage } from './modificar-cliente.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { ComponentsModule } from '../../../../components/components.module';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  {
    path: '',
    component: ModificarClientePage
  }
];

@NgModule({
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
    RouterModule.forChild(routes)
  ],
  declarations: [ModificarClientePage]
})
export class ModificarClientePageModule {}
