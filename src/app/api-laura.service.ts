import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrganismoItem } from './paginas/organismo/organismo-datasource';

@Injectable({
  providedIn: 'root'
})
export class ApiLauraService {

  constructor(private http: HttpClient,) { }

  getOrganismos(){
    
    // const EXAMPLE_DATA: OrganismoItem[] = [
    //   {"id":1,"cuit":"30-33333333-3","denominacion":"TRIBUNAL FISCAL DE LA NACION","direccion":1,"telefono":"01148885678","mail":"TRIBUNALFISCAL@MECON.GOB.AR","eliminado":null},
    //   {"id":2,"cuit":"34-54667611-2","denominacion":"TRIBUNAL DE TASACIONES DE LA NACION","direccion":1,"telefono":"01143493032","mail":"TRIBUNALTASACION@PRODUCCION.GOB.AR","eliminado":null},
    //   {"id":3,"cuit":"34-54666666-2","denominacion":"BANCO CENTRAL DE LA REPUBLICA ARGENTINA","direccion":1,"telefono":"01143675243","mail":"BCRA@ECONOMIA.GOB.AR","eliminado":null},
    //   {"id":4,"cuit":"34-5413131313-2","denominacion":"COMISION NACIONAL DE VALORES","direccion":1,"telefono":"01143494444","mail":"CNV@ECONOMIA.GOB.AR","eliminado":null}];
    
    // return EXAMPLE_DATA;
    return this.http.get<any>("http://127.0.0.1:5500/organismo");
    
   
  }
}
