import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { EmpleadoComponent } from '../paginas/empleado/empleado.component';
import { LegitimoAbonoComponent } from '../paginas/legitimo-abono/legitimo-abono.component';
import { LoginComponent } from '../paginas/login/login.component';
import { OrganismoComponent } from '../paginas/organismo/organismo.component';
import { TableroComponent } from '../paginas/tablero/tablero.component';
import { UsuarioComponent } from '../paginas/usuario/usuario.component';
import { EstructuraComponent } from './estructura.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tablero',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: EstructuraComponent,
    children: [
      {
        path: 'tablero',
        component: TableroComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'usuarios',
        component: UsuarioComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'empleado',
        component: EmpleadoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'legitimo',
        component: LegitimoAbonoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'organismo',
        component: OrganismoComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstructuraRoutingModule { }
