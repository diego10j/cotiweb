import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InfoProductoPage } from './info-producto.page';
import { FileUploadModule } from 'primeng/fileupload';
import { ComponentsModule } from '../../../components/components.module';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import {SpinnerModule} from 'primeng/spinner';
import {ToolbarModule} from 'primeng/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '../../../pipes/pipes.module';
const routes: Routes = [
  {
    path: '',
    component: InfoProductoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RadioButtonModule,
    InputTextareaModule,
    DropdownModule,
    FormsModule,
    ToastModule,
    FileUploadModule,
    TableModule,
    PanelModule,
    SpinnerModule,
    ToolbarModule,
    FontAwesomeModule,
    PipesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InfoProductoPage]
})
export class InfoProductoPageModule {}
