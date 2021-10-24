import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-estructura',
  templateUrl: './estructura.component.html',
  styleUrls: ['./estructura.component.css']
})
export class EstructuraComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}
  chequeoPermisos(tipo:String):boolean{
    let chequeo=[];
    let permisos=JSON.parse(localStorage.getItem('Permisos') || '[]');
    
    for (let i=0;i<permisos.length;i++){
        chequeo.push(permisos[i].id);
    }
    if (chequeo.includes (tipo)){
      return true;
    }else{
      return false;
    }
  }
}
