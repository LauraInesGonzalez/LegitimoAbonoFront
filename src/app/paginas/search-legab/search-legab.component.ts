
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiArielService } from 'src/app/api-ariel.service';
import { ApiLauraService } from 'src/app/api-laura.service';
import { AbonoDataSource, AbonoItem, OrgItem } from './search-legab.datasource';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-legab',
  templateUrl: './search-legab.component.html',
  styleUrls: ['./search-legab.component.css']
})
export class SearchLegabComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AbonoItem>;
  dataSource: AbonoDataSource;

  mostrarLista: boolean = true;
  mostrarFormulario: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  nombreArchivo: string = '';

  organismos: any[] = [];
  objectorg: OrgItem={
    id:0,
    denominacion:""
  }
  objeto: AbonoItem ={
    organismo: 0,
    proveedor: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    monto: 0,
    justificacion: '',
    actoDispositivo: '',
    idUsuario: 0,
    fecha: '',
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Organismo', 'Proveedor', 'FechaInicio', 'FechaFinalizacion', 'Monto', 'Justificacion', 'ActoDispositivo', 'Usuario', 'Fecha' ];

  constructor(
    private api: ApiArielService,
    private apiLaura: ApiLauraService,
    private _snackBar: MatSnackBar
    ) {
    this.dataSource = new AbonoDataSource();
  }
  ngOnInit(): void {
    this.cargarOrganismos();
  }
  cargarOrganismos(){
    this.apiLaura.getOrganismos().subscribe(data=>{
      this.organismos = data;
    });
  }
  onFileSelected(event:any) {
    if (event.target.files.length>0){
      const file=event.target.files[0];
      this.objeto.actoDispositivo=event.target.files[0];
    }
  }

  cargarLista(organismo:number){
    this.api.getAbonoorg(organismo).subscribe(data=>{
      console.log(data)
      this.dataSource.data = data;
      this.table.dataSource = this.dataSource.connect();
      },error=>{});
  }
  descargarAd(archivo:String):void{
    this.api.descargarAd(archivo).subscribe(data=>{
      var thefile = new Blob([data], { type: "application/pdf" });
      let url = window.URL.createObjectURL(thefile);
      window.open(url);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}

