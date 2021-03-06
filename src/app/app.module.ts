import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstructuraComponent } from './estructura/estructura.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { EstructuraModule } from './estructura/estructura.module';
import { TableroComponent } from './paginas/tablero/tablero.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { EmpleadoComponent } from './paginas/empleado/empleado.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrganismoComponent } from './paginas/organismo/organismo.component';
import { HttpClientModule } from '@angular/common/http';
import { DireccionComponent } from './direccion/direccion.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UsuarioComponent } from './paginas/usuario/usuario.component';
import { LoginComponent } from './paginas/login/login.component';
import { LegitimoAbonoComponent } from './paginas/legitimo-abono/legitimo-abono.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProveedoresComponent } from './paginas/proveedores/proveedores.component';
import { SearchLegabComponent } from './paginas/search-legab/search-legab.component';
import { SearchLabProvComponent } from './paginas/search-lab-prov/search-lab-prov.component';
import { LegitimoAbIdComponent } from './paginas/legitimo-ab-id/legitimo-ab-id.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    EstructuraComponent,
    TableroComponent,
    EmpleadoComponent,
    OrganismoComponent,
    DireccionComponent,
    UsuarioComponent,
    LoginComponent,
    LegitimoAbonoComponent,
    ProveedoresComponent,
    SearchLegabComponent,
    SearchLabProvComponent,
    LegitimoAbIdComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot([]),
    EstructuraModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
