import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrganismoItem } from './paginas/organismo/organismo-datasource';
import { UsuarioItem } from './paginas/usuario/usuario-datasource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiLauraService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient,) { }

  getOrganismos(){
    return this.http.get<any>(`${this.API_URL}/organismo`,
        {headers:{'authorization':localStorage.getItem('Token')||''}}
    );
  }
  getProveedores(){
    return this.http.get<any>(`${this.API_URL}/proveedor`,
        {headers:{'authorization':localStorage.getItem('Token')||''}}
    );
  }

  getUsuarios(){

    return this.http.get<UsuarioItem[]>(`${this.API_URL}/userinterno`,
    {headers:{'authorization':localStorage.getItem('Token')||''}});

  }

  postUsuario(objeto: UsuarioItem){
    return this.http.post(`${this.API_URL}/userinterno`,{
      cuil: objeto.cuil,
      email: objeto.mail,
      contrasenia: objeto.contrasenia,
      rol: objeto.idRol,
      usuario: objeto.usuario
    },
    {headers:{'authorization':localStorage.getItem('Token')||''}})
  }

  
  putUsuario(objeto: UsuarioItem){
    return this.http.put(`${this.API_URL}/userinterno/cambio/${objeto.usuario}`,{
      contrasenia: objeto.contrasenia
    },
    {headers:{'authorization':localStorage.getItem('Token')||''}})
  }

  
  deleteUsuario(objeto: UsuarioItem){
    return this.http.delete(`${this.API_URL}/userinterno/${objeto.usuario}`,
    {headers:{'authorization':localStorage.getItem('Token')||''}});
  }

  getDashUsuarios(){
    return this.http.get<any>(`${this.API_URL}/dashboard/usuarioscount`,
      {headers:{'authorization':localStorage.getItem('Token')||''}});
  }

  getDashProveedores(){
    return this.http.get<any>(`${this.API_URL}/dashboard/proveedorescount`,
      {headers:{'authorization':localStorage.getItem('Token')||''}});
  }

  getDashAbonoUsuario(){
    return this.http.get<any>(`${this.API_URL}/dashboard/legabusuarios`,
      {headers:{'authorization':localStorage.getItem('Token')||''}});

  }

  getDashProveedoresProvincia(){
    return this.http.get<any>(`${this.API_URL}/dashboard/proveedorescountprov`,
      {headers:{'authorization':localStorage.getItem('Token')||''}});

  }

  getDashAbonosOrganismos(){
    return this.http.get<any>(`${this.API_URL}/dashboard/countlaorg`,
      {headers:{'authorization':localStorage.getItem('Token')||''}});

  }
}
