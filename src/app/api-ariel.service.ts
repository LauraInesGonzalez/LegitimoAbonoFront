import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpleadoItem } from './paginas/empleado/empleado-datasource';
import { environment } from 'src/environments/environment';
import { AbonoItem} from './paginas/legitimo-abono/legitimo-abono.datasource';

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

  getAbono(){

    return this.http.get<AbonoItem[]>(`${this.API_URL}/legitimoab`,
    {headers:{'authorization':localStorage.getItem('Token')||''}});

  }
  descargarAd(archivo:String){
     return this.http.get(`${this.API_URL}/legitimoab/download/${archivo}`,
    {headers:{'authorization':localStorage.getItem('Token')||''},responseType: 'arraybuffer'} );
  }
  postAbono(objeto: AbonoItem){
    return this.http.post(`${this.API_URL}/legitimoab`,{
      organismo: objeto.organismo,
      proveedor: objeto.proveedor,
      descripcion: objeto.descripcion,
      fechaInicio: objeto.fechaInicio,
      fechaFin: objeto.fechaFin,
      monto: objeto.monto,
      justificacion: objeto.justificacion,
      actoDispositivo: objeto.actoDispositivo,
      idUsuario: objeto.idUsuario,
      fecha: objeto.fecha
    },
    {headers:{'authorization':localStorage.getItem('Token')||''}})
  }

  putAbono(objeto: AbonoItem){
    return this.http.put(`${this.API_URL}/legitimoab/${objeto.organismo}`,{
      organismo: objeto.organismo,
      proveedor: objeto.proveedor,
      descripcion: objeto.descripcion,
      fechaInicio: objeto.fechaInicio,
      fechaFin: objeto.fechaFin,
      monto: objeto.monto,
      justificacion: objeto.justificacion,
      actoDispositivo: objeto.actoDispositivo,
      idUsuario: objeto.idUsuario,
      fecha: objeto.fecha
    },
    {headers:{'authorization':localStorage.getItem('Token')||''}})
  }

  deleteAbono(objeto: AbonoItem){
    return this.http.delete(`${this.API_URL}/legitimoab/${objeto.organismo}`,
    {headers:{'authorization':localStorage.getItem('Token')||''}});
  }

}
