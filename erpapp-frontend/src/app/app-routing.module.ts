  import { Not403Component } from './pages/not403/not403.component';
 import { ConsultaComponent } from './pages/consulta/consulta.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
 import { MedicoComponent } from './pages/medico/medico.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './_service/guard.service';
import { EspecialComponent } from './pages/consulta/especial/especial.component';

const routes: Routes = [
 
  { path: 'prospectos', component: MedicoComponent, canActivate: [GuardService] },
 
  {
    path: 'facturacion', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialidadEdicionComponent },
      { path: 'edicion/:id', component: EspecialidadEdicionComponent }
    ], canActivate: [GuardService]
  },
  { path: 'mentores', component: ConsultaComponent, canActivate: [GuardService] },
    { path: 'not-403', component: Not403Component },
  { path: 'login', component: LoginComponent },
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'mentorizados', component: EspecialComponent, canActivate: [GuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
