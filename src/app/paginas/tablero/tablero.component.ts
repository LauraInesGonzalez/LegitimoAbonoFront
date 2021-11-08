import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

import { ChartType, ChartOptions, ChartDataSets  } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiLauraService } from 'src/app/api-laura.service';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value:any, ctx:any ) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: Label[] = [['Activos'], ['Inactivos']];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];//[pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0,255,0,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  public UsuariosChartData: number[] = [0, 0];
  public ProveedoresChartData: number[] = [300, 100];


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public abonosUsuariosChartLabels: Label[] = [];
  public abonosUsuariosChartData: ChartDataSets[] = [
    { data: [], label: 'Abonos' }
  ];

  public proveedoresProvinciasChartLabels: Label[] = [];
  public proveedoresProvinciasChartData: ChartDataSets[] = [
    { data: [], label: 'Proveedores' }
  ];

  public AbonosOrganismosLabels: Label[] = [];
  public AbonosOrganismosChartData: ChartDataSets[] = [
    { data: [], label: 'Abonos' }
  ];



  public AbonosChartColors = [
    {
      backgroundColor: ['rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)','rgba(0,0,255,0.3)'],
    },
  ];


  constructor(private breakpointObserver: BreakpointObserver, private api: ApiLauraService) {}
  ngOnInit(): void {
    this.getUsuarios();
    this.getProveedores();
    this.getAbonosusuarios();
    this.getProveedoresProvincia();
    this.getAbonosOrganismos();
  }

  getUsuarios(){
    this.api.getDashUsuarios().subscribe(data=>{
      //console.log(data);

      this.UsuariosChartData = [data['canthabilitados'],data['cantinhabilitados']];
    }, error=>{

    });
  }

  getProveedores(){
    this.api.getDashProveedores().subscribe(data=>{
      //console.log(data);
      this.ProveedoresChartData = [data['canthabilitados'],data['cantinhabilitados']];
    },error=>{

    })
  }

  getAbonosusuarios(){

    this.api.getDashAbonoUsuario().subscribe(data=>{
      //console.log(data);
      const a:any[] = [];
      data.forEach((element: { usuario: Label; cantidad:Label}) => {
        this.abonosUsuariosChartLabels.push(element.usuario);
        a.push(element.cantidad);
      },a);
      this.abonosUsuariosChartData = [{data:a,label: 'Abonos'}];
    },error=>{

    })

  }

  getProveedoresProvincia(){

    this.api.getDashProveedoresProvincia().subscribe(data=>{
      //console.log(data);
      const a:any[] = [];
      data.forEach((element: { provincia: Label; cantidad:Label}) => {
        this.proveedoresProvinciasChartLabels.push(element.provincia);
        a.push(element.cantidad);
      },a);
      this.proveedoresProvinciasChartData = [{data:a,label: 'Proveedores'}];
    },error=>{

    })

  }

  getAbonosOrganismos(){

    this.api.getDashAbonosOrganismos().subscribe(data=>{
      console.log(data);
      const a:any[] = [];
      data.forEach((element: { organismo: Label; cantidad:Label}) => {
        this.AbonosOrganismosLabels.push(element.organismo);
        a.push(element.cantidad);
      },a);
      this.AbonosOrganismosChartData = [{data:a,label: 'Abonos'}];
    },error=>{

    })

  }

}
