import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';
import { switchMap } from 'rxjs/operators';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { Consulta } from 'src/app/_model/consulta';
import { Mentorizado } from 'src/app/_model/mentorizado';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

   displayedColumns = ['mentorizado','dni', 'telefono', 'correo', 'perfil', 'acciones'];


  dataSource: MatTableDataSource<Mentorizado>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private consultaService: ConsultaService,
     private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.listaMentorizados();
 
  }

  openDialog(consulta?: Mentorizado) { 
    let med = consulta != null ? consulta : new Mentorizado();

    this.dialog.open(MedicoDialogoComponent, {
      width: '250px',
      data: med
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
