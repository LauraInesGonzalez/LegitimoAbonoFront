import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApiLauraService } from 'src/app/api-laura.service';
import { OrganismoDataSource, OrganismoItem } from './organismo-datasource';

@Component({
  selector: 'app-organismo',
  templateUrl: './organismo.component.html',
  styleUrls: ['./organismo.component.css']
})
export class OrganismoComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<OrganismoItem>;
  dataSource: OrganismoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'denominacion'];

  constructor(private api: ApiLauraService,
    private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource = new OrganismoDataSource();
  }
  ngOnInit(): void {

    this.api.getOrganismos().subscribe(data=>{
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      },error=>{});
  }

  ngAfterViewInit(): void {
  }
}
