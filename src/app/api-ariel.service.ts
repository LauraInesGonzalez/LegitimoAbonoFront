import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpleadoItem } from './paginas/empleado/empleado-datasource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiArielService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getEmpleados(){

    return this.http.get<EmpleadoItem[]>(`${this.API_URL}/empleado`,
    {headers:{'authorization':localStorage.getItem('Token')||''}});

  }

  postEmpleado(objeto: EmpleadoItem){
    return this.http.post(`${this.API_URL}/empleado`,{
      cuil: objeto.cuil,
      apellido: objeto.apellido,
      nombre: objeto.nombre,
      mail: objeto.mail,
      idOrganismo: objeto.idOrganismo,
      cargo: objeto.cargo
    },
    {headers:{'authorization':localStorage.getItem('Token')||''}})
  }

  putEmpleado(objeto: EmpleadoItem){
    return this.http.put(`${this.API_URL}/empleado/${objeto.id}`,{
      cuil: objeto.cuil,
      apellido: objeto.apellido,
      nombre: objeto.nombre,
      mail: objeto.mail,
      idOrganismo: objeto.idOrganismo,
      cargo: objeto.cargo
    },
    {headers:{'authorization':localStorage.getItem('Token')||''}})
  }

  deleteEmpleado(objeto: EmpleadoItem){
    return this.http.delete(`${this.API_URL}/empleado/${objeto.id}`,
    {headers:{'authorization':localStorage.getItem('Token')||''}});
  }

}
