import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CrearClientePage } from './crear-cliente.page';
import { ComponentsModule } from '../../../../components/components.module';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  {
    path: '',
    component: CrearClientePage
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
  declarations: [CrearClientePage]
})
export class CrearClientePageModule {}
