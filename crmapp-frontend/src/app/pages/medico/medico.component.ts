import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoDialogoComponent } from './medico-dialogo/medico-dialogo.component';
import { switchMap } from 'rxjs/operators';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { Consulta } from 'src/app/_model/consulta';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  displayedColumns = ['fecha', 'mentor', 'mentorizado', 'mentoria', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private consultaService: ConsultaService,
     private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
   
    this.consultaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(consulta?: Consulta) {
    let med = consulta != null ? consulta : new Consulta();

    this.dialog.open(MedicoDialogoComponent, {
      width: '250px',
      data: med
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
