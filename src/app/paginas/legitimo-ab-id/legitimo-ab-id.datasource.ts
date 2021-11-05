import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


// TODO: Replace this with your own data model type
export interface AbonoItem {
  id:number;
  organismo: number;
  proveedor: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  monto: number;
  justificacion: string;
  actoDispositivo: any;
  idUsuario: number;
  fecha: string;
}
export interface ProvItem{
  id: number;
  cuit:String;
  razonSocial:String;
  tPersona:String;
  mail:String;
  provincia:String;
  localidad:String;
  telefono:String;
  eliminado:0
}

/**
 * Data source for the Empleado view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AbonoDataSource extends DataSource<AbonoItem> {
  data: AbonoItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AbonoItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AbonoItem[]): AbonoItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
   private getSortedData(data: AbonoItem[]): AbonoItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'Organismo': return compare(a.organismo, b.organismo, isAsc);
        case 'Proveedor': return compare(a.proveedor, b.proveedor, isAsc);
        case 'Usuario': return compare(+a.idUsuario, +b.idUsuario, isAsc);
        case 'FechaInicio': return compare(a.fechaInicio, b.fechaInicio, isAsc);
        case 'FechaFinalizacion': return compare(a.fechaFin, b.fechaFin, isAsc);
        case 'Monto': return compare(a.monto, b.monto, isAsc);
        case 'Justificacion': return compare(a.justificacion, b.justificacion, isAsc);
        case 'Fecha': return compare(a.fecha, b.fecha, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}