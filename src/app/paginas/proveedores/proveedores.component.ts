import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiArielService } from 'src/app/api-ariel.service';
import { ApiLauraService } from 'src/app/api-laura.service';
import { ProveedoresDataSource, ProveedoresItem } from './proveedores-datasource';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProveedoresItem>;
  dataSource: ProveedoresDataSource;

  mostrarLista: boolean = true;
  mostrarFormulario: boolean = false;
  editando: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  provincias: any[] = [];
  localidades:any[] =[];

  objeto: ProveedoresItem ={id: 0,
    cuit: '',
    razonSocial: '',
    tPersona: '',
    mail: '',
    provincia: '',
    localidad: '',
    telefono: 0,
    eliminado: null}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'cuit', 'razonSocial', 'tPersona', 'mail', 'provincia', 'localidad', 'telefono'];

  constructor(
    private api: ApiArielService,
    private apiLaura: ApiLauraService,
    private _snackBar: MatSnackBar
    ) {
    this.dataSource = new ProveedoresDataSource();
  }
  ngOnInit(): void {
    //this.dataSource.data = this.api.getEmpleados();

    this.cargarLista();

  }

  cargarLista(){
    this.api.getProveedores().subscribe(data=>{
      this.dataSource.data = data;
      this.table.dataSource = this.dataSource.connect();
      },error=>{});
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }

  nuevo(){

    this.editando = false;
    this.objeto= {id: 0,
      cuit: '',
    razonSocial: '',
    tPersona: '',
    mail: '',
    provincia: '',
    localidad: '',
    telefono: 0,
    eliminado: null}
    this.provincias=[];
    this.localidades=[];
    this.mostrarLista = false;
    this.mostrarFormulario = true;
    this.cargarProvincias();
  }

  editar(o:ProveedoresItem){
    this.editando = true;
    this.objeto = o;
    //console.log(o);

    this.mostrarLista = false;
    this.mostrarFormulario = true;
    /*this.cargarOrganismos();*/
  }

  aceptar(){
    console.log(this.objeto);

    this.api.postProveedores(this.objeto).subscribe(
      data=>{
        this._snackBar.open('Exito: Los datos se guardaron correctamente','',{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        });
        this.mostrarLista = true;
        this.mostrarFormulario = false;
        this.cargarLista();
      },error=>{
        this._snackBar.open(error['error']['Mensaje'],'Aceptar',{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    })
  }

    cancelar(){
    this.mostrarLista = true;
    this.mostrarFormulario = false;
    this.cargarLista();
  }

  cargarProvincias(){
    this.api.getProvincias().subscribe(data=>{
      this.provincias = data;
    });
  }

  eliminar(o: ProveedoresItem){
    console.log(this.objeto);

    this.api.deleteProveedores(o).subscribe(
      data=>{
        console.log(data);
        this._snackBar.open('Exito: Los datos se guardaron correctamente','',{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        });
        this.mostrarLista = true;
        this.mostrarFormulario = false;
        this.cargarLista();
      },error=>{
        this._snackBar.open(error['error']['error'],'Aceptar',{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        //console.log(error['error']);

    })
  }
  cambioProvincia(prov:String){
    this.api.getLocalidades(prov).subscribe(data=>{
      this.localidades = data;
    });
  }
}
