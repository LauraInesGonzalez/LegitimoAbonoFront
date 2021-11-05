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
import { ProveedoresComponent } from '../paginas/proveedores/proveedores.component';
import { SearchLegabComponent } from '../paginas/search-legab/search-legab.component';
import { SearchLabProvComponent } from '../paginas/search-lab-prov/search-lab-prov.component';
import { LegitimoAbIdComponent } from '../paginas/legitimo-ab-id/legitimo-ab-id.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/legitimo',
    pathMatch: 'full'
  },
  {
    path: '',
    component: EstructuraComponent,
    children: [
      {
        path: 'legitimo',
        component: LegitimoAbonoComponent,
        data:{
          role:"PERMIT_LOGIN"
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'organismo',
        component: OrganismoComponent,
        data:{
          role:"PERMIT_LOGIN"
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'blegitimo',
        component: SearchLegabComponent,
        data:{
          role:"PERMIT_LOGIN"
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'blegitimop',
        component: SearchLabProvComponent,
        data:{
          role:"PERMIT_LOGIN"
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'blegitimoid',
        component: LegitimoAbIdComponent,
        data:{
          role:"PERMIT_LOGIN"
        },
        canActivate: [AuthGuard],
      }

    ]
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
        data:{
          role:"PERMIT_ADMINISTRATE"
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'usuarios',
        component: UsuarioComponent,
        data:{
          role:"PERMIT_ADMINISTRATE"
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'empleado',
        component: EmpleadoComponent,
        data:{
          role:"PERMIT_ADMINISTRATE"
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
        data:{
          role:"PERMIT_ADMINISTRATE"
        },
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
