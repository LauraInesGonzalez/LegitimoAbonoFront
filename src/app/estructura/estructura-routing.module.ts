import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from '../paginas/empleado/empleado.component';
import { OrganismoComponent } from '../paginas/organismo/organismo.component';
import { TableroComponent } from '../paginas/tablero/tablero.component';
import { EstructuraComponent } from './estructura.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tablero',
    pathMatch: 'full'
  },
  {
    path: '',
    component: EstructuraComponent,
    children: [
      {
        path: 'tablero',
        component: TableroComponent
      },
      {
        path: 'empleado',
        component: EmpleadoComponent
      },
      {
        path: 'organismo',
        component: OrganismoComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstructuraRoutingModule { }
