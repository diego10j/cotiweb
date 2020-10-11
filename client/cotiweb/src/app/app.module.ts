import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { DatePipe } from '@angular/common';
import { PipesModule } from './pipes/pipes.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {PanelMenuModule} from 'primeng/panelmenu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { ComponentsModule } from './components/components.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    PipesModule,
    HttpClientModule,
    FontAwesomeModule,
    ComponentsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    SocialSharing,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    [DatePipe]
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {


     constructor(library: FaIconLibrary) {
      //all icons
       library.addIconPacks(fas);
       library.addIconPacks(far);
      }
}
