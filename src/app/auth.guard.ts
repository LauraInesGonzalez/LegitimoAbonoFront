import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.chequeoPermisos(route);
  }
  chequeoPermisos(route:ActivatedRouteSnapshot):boolean{
    let chequeo=[];
    let permisos=JSON.parse(localStorage.getItem('Permisos') || '[]');
    
    for (let i=0;i<permisos.length;i++){
        chequeo.push(permisos[i].id);
    }
    if (chequeo.includes (route.data.role)){
      return true;
    }else{
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
