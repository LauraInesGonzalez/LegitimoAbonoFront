import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiArielService } from 'src/app/api-ariel.service';
import { ApiLauraService } from 'src/app/api-laura.service';
import { AbonoDataSource, AbonoItem } from './legitimo-abono.datasource';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-legitimo-abono',
  templateUrl: './legitimo-abono.component.html',
  styleUrls: ['./legitimo-abono.component.css']
})
export class LegitimoAbonoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<AbonoItem>;
  dataSource: AbonoDataSource;

  mostrarLista: boolean = true;
  mostrarFormulario: boolean = false;
  editando: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  nombreArchivo: string = '';

  organismos: any[] = [];
  objeto: AbonoItem ={
    id:0,
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
  displayedColumns = ['id','Organismo', 'Proveedor', 'FechaInicio', 'FechaFinalizacion', 'Monto', 'Justificacion', 'ActoDispositivo', 'Usuario', 'Fecha', 'accion' ];

  constructor(
    private api: ApiArielService,
    private apiLaura: ApiLauraService,
    private _snackBar: MatSnackBar
    ) {
    this.dataSource = new AbonoDataSource();
  }
  ngOnInit(): void {
    //this.dataSource.data = this.api.getAbono();

    this.cargarLista();

  }

  onFileSelected(event:any) {
    if (event.target.files.length>0){
      const file=event.target.files[0];
      this.objeto.actoDispositivo=event.target.files[0];
    }
  }

  cargarLista(){
    this.api.getAbono().subscribe(data=>{
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
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

  nuevo(){

    this.editando = false;
    this.objeto= { 
      id:0,
      organismo: 0,
      proveedor: '',
      descripcion: '',
      fechaInicio: '',
      fechaFin: '',
      monto: 0,
      justificacion: '',
      actoDispositivo: '',
      idUsuario: 0,
      fecha: '',};

    this.mostrarLista = false;
    this.mostrarFormulario = true;
    this.cargarOrganismos();
  }

  editar(o:AbonoItem){
    this.editando = true;
    this.objeto = o;
    //console.log(o);

    this.mostrarLista = false;
    this.mostrarFormulario = true;
    this.cargarOrganismos();
  }

  aceptar(){
    console.log(this.objeto);
    this.api.postAbono(this.objeto).subscribe(
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
         console.log(error['error']);

    })

  }

  modificar(){
    console.log(this.objeto);

    this.api.putAbono(this.objeto).subscribe(
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

  eliminar(o: AbonoItem){
    console.log(this.objeto);

    this.api.deleteAbono(o).subscribe(
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

