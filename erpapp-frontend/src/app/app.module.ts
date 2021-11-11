import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
 import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MedicoComponent } from './pages/medico/medico.component';
import { MedicoDialogoComponent } from './pages/medico/medico-dialogo/medico-dialogo.component';
 import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
 import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
   import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './login/login.component';

import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Not403Component } from './pages/not403/not403.component';
 import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ComprobanteDialogoComponent } from './pages/comprobante-dialogo/comprobante-dialogo.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  let token = tk != null ? tk : '';
  //console.log(token);
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
     MedicoComponent,
    MedicoDialogoComponent,
     EspecialidadComponent,
     EspecialidadEdicionComponent,
    ConsultaComponent,
    EspecialComponent,
     LoginComponent,
    Not403Component,
    ComprobanteDialogoComponent
   ],
  entryComponents: [MedicoDialogoComponent,ComprobanteDialogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['134.209.167.81'],
        blacklistedRoutes: ['http://134.209.167.81/mediapp-backend/login/enviarCorreo']
      }
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
