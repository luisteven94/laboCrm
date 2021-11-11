import { ConsultaService } from './../../_service/consulta.service';

import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Mentor } from 'src/app/_model/mentor';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

   displayedColumns = ['mentor', 'telefono', 'correo', 'perfil', 'acciones'];
  dataSource: MatTableDataSource<Mentor>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  
 
 
 
  nombreapellidos: string;
  telefono: string;
  correoelectronico: string;
  perfil: string;

  nombreCompletoFiltro : string;
 
 
  constructor(
    private consultaService: ConsultaService, 
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.listaMentores();
 
  }
  
  aceptar() {
    let mentor = new Mentor();
    mentor.correo=this.correoelectronico;
    mentor.nombres=this.nombreapellidos;
    mentor.perfil=this.perfil;
    mentor.telefono=this.telefono;

    this.consultaService.registrarmentor(mentor).subscribe(() => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });
      this.limpiarInput();
      this.listaMentores();
 
    });
  }



  limpiarInput() {
    this.correoelectronico="";
    this.nombreapellidos="";
    this.perfil="";
    this.telefono="";

  }

  buscar() {  
    let filtro = new Mentor();
    filtro.nombres= this.nombreCompletoFiltro;
    filtro.nombres = filtro.nombres.toLowerCase();
    // this.utilService.estadoProgress.next(true);



       this.consultaService.buscarMentor(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.utilService.estadoProgress.next(false);
      });
    
  }

listaMentores(){  
  let filtro = new Mentor();
  filtro.nombres= "";
  this.consultaService.buscarMentor( filtro).subscribe(data => {
    this.dataSource = new MatTableDataSource(data)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.utilService.estadoProgress.next(false);
  });

}


}
