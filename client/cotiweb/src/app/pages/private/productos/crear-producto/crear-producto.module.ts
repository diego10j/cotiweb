import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { ComponentsModule } from '../../../../components/components.module';
import { CrearProductoPage } from './crear-producto.page';
import { FileUploadModule} from 'primeng/fileupload';
import { PipesModule } from '../../../../pipes/pipes.module';
const routes: Routes = [
  {
    path: '',
    component: CrearProductoPage,
  },
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
    PipesModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CrearProductoPage],
})
export class CrearProductoPageModule {}
