import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiArielService } from 'src/app/api-ariel.service';
import { ApiLauraService } from 'src/app/api-laura.service';
import { EmpleadoDataSource, EmpleadoItem } from './empleado-datasource';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EmpleadoItem>;
  dataSource: EmpleadoDataSource;

  mostrarLista: boolean = true;
  mostrarFormulario: boolean = false;

  organismos: any[] = []

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'apellido', 'cuil', 'organismo', 'cargo'];

  constructor(
    private api: ApiArielService,
    private apiLaura: ApiLauraService,
    ) {
    this.dataSource = new EmpleadoDataSource();
  }
  ngOnInit(): void {
    //this.dataSource.data = this.api.getEmpleados();

    this.api.getEmpleados().subscribe(data=>{
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      },error=>{});

  }

  ngAfterViewInit(): void {
  }

  nuevo(){
    this.mostrarLista = false;
    this.mostrarFormulario = true;
    this.cargarOrganismos();
  }

  aceptar(){
    this.mostrarLista = true;
    this.mostrarFormulario = false;
    this.ngOnInit();
  }

  cancelar(){
    this.mostrarLista = true;
    this.mostrarFormulario = false;
    this.ngOnInit();
  }

  cargarOrganismos(){
    this.apiLaura.getOrganismos().subscribe(data=>{
      this.organismos = data;
    });
  }
}
