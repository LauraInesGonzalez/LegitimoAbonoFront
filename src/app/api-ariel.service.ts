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
}
