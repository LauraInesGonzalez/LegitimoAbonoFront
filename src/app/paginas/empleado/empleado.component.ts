import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiArielService } from 'src/app/api-ariel.service';
import { ApiLauraService } from 'src/app/api-laura.service';
import { EmpleadoDataSource, EmpleadoItem } from './empleado-datasource';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EmpleadoItem>;
  dataSource: EmpleadoDataSource;

  mostrarLista: boolean = true;
  mostrarFormulario: boolean = false;
  editando: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  organismos: any[] = [];
  objeto: EmpleadoItem ={id: 0,
    cuil: '',
    apellido: '',
    nombre: '',
    mail: '',
    idOrganismo: 0,
    cargo: '',
    eliminado: null}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'apellido', 'cuil', 'mail', 'organismo','cargo', 'accion'];

  constructor(
    private api: ApiArielService,
    private apiLaura: ApiLauraService,
    private _snackBar: MatSnackBar
    ) {
    this.dataSource = new EmpleadoDataSource();
  }
  ngOnInit(): void {
    //this.dataSource.data = this.api.getEmpleados();

    this.cargarLista();

  }

  cargarLista(){
    this.api.getEmpleados().subscribe(data=>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.dataSource.data = data;
      this.table.dataSource = this.dataSource.connect();
      },error=>{});
  }



  nuevo(){
    this.editando = false;
    this.objeto= {id: 0,
      cuil: '',
      apellido: '',
      nombre: '',
      mail: '',
      idOrganismo: 0,
      cargo: '',
      eliminado: null}

    this.mostrarLista = false;
    this.mostrarFormulario = true;
    this.cargarOrganismos();
  }

  editar(o:EmpleadoItem){
    this.editando = true;
    this.objeto = o;
    this.mostrarLista = false;
    this.mostrarFormulario = true;
    this.cargarOrganismos();
  }

  aceptar(){
    this.api.postEmpleado(this.objeto).subscribe(
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
        this._snackBar.open(error['error']['error'],'Aceptar',{
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    })
    
  }

  modificar(){
    this.api.putEmpleado(this.objeto).subscribe(
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

  cancelar(){
    this.mostrarLista = true;
    this.mostrarFormulario = false;
    this.cargarLista();
  }

  cargarOrganismos(){
    this.apiLaura.getOrganismos().subscribe(data=>{
      this.organismos = data;
    });
  }

  eliminar(o: EmpleadoItem){
    console.log(this.objeto);

    this.api.deleteEmpleado(o).subscribe(
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
}
