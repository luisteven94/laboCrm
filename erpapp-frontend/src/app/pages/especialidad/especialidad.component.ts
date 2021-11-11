  import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
 import { Component, OnInit, ViewChild } from '@angular/core';
 import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { MedicoDialogoComponent } from '../medico/medico-dialogo/medico-dialogo.component';
import { ComprobanteDialogoComponent } from '../comprobante-dialogo/comprobante-dialogo.component';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {


  displayedColumns = ['idconsulta','fecha', 'mentoria', 'mentorizado', 'mentorizadoDocumento', 'acciones'];
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

    this.dialog.open(ComprobanteDialogoComponent, {
      width: '500px',
      data: med
    });
    
    this.consultaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 

}