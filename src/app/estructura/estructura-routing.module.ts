import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstructuraRoutingModule { }
