import { ConsultaService } from './../../../_service/consulta.service';
 import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
  import { Especialidad } from './../../../_model/especialidad';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
  import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { Mentorizado } from 'src/app/_model/mentorizado';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {
  displayedColumns = ['mentor', 'telefono', 'correo', 'perfil', 'acciones'];
  dataSource: MatTableDataSource<Mentorizado>;
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
    this.listaMentorizados();
 
  }
  
  aceptar() {
    let mentor = new Mentorizado();
    mentor.correo=this.correoelectronico;
    mentor.nombres=this.nombreapellidos;
    mentor.perfil=this.perfil;
    mentor.telefono=this.telefono;

    this.consultaService.registrarmentorizado(mentor).subscribe(() => {
      this.snackBar.open("Se registró", "Aviso", { duration: 2000 });
      this.limpiarInput();
      this.listaMentorizados();
 
    });
  }



  limpiarInput() {
    this.correoelectronico="";
    this.nombreapellidos="";
    this.perfil="";
    this.telefono="";

  }

  buscar() {  
    let filtro = new Mentorizado();
    filtro.nombres= this.nombreCompletoFiltro;
    filtro.nombres = filtro.nombres.toLowerCase();
    // this.utilService.estadoProgress.next(true);



       this.consultaService.buscarMentorizado(filtro).subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        // this.utilService.estadoProgress.next(false);
      });
    
  }

  listaMentorizados(){
  let filtro = new Mentorizado();
  filtro.nombres= "";
  this.consultaService.buscarMentorizado( filtro).subscribe(data => {
    this.dataSource = new MatTableDataSource(data)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.utilService.estadoProgress.next(false);
  });

}
}
