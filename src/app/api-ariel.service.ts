import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpleadoItem } from './paginas/empleado/empleado-datasource';

@Injectable({
  providedIn: 'root'
})
export class ApiArielService {

  constructor(private http: HttpClient) { }

  getEmpleados(){

    return this.http.get<EmpleadoItem[]>('http://127.0.0.1:5500/empleado');

  }

  postEmpleado(objeto: EmpleadoItem){
    return this.http.post('http://127.0.0.1:5500/empleado',{
      cuil: objeto.cuil,
      apellido: objeto.apellido,
      nombre: objeto.nombre,
      mail: objeto.mail,
      idOrganismo: objeto.idOrganismo,
      cargo: objeto.cargo
    })
  }
}
