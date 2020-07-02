import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InicioPage } from './inicio.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '../../../../components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: InicioPage
      }
    ])
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
