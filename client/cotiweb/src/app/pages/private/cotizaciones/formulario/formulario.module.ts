import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormularioPage } from './formulario.page';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ComponentsModule } from '../../../../components/components.module';
import { DropdownModule } from 'primeng/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
  {
    path: '',
    component: FormularioPage
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
  declarations: [FormularioPage]
})
export class FormularioPageModule {}
