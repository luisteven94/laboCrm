import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { Especialidad } from 'src/app/_model/especialidad';
import { Mentor } from 'src/app/_model/mentor';
import { Mentorizado } from 'src/app/_model/mentorizado';
 import { Comprobante } from 'src/app/_model/comprobante';

@Component({
  selector: 'app-comprobante-dialogo',
  templateUrl: './comprobante-dialogo.component.html',
  styleUrls: ['./comprobante-dialogo.component.css']
})
export class ComprobanteDialogoComponent implements OnInit {

  consulta: Consulta;


  fechaSeleccionada: Date = new Date();

  idMentorizado: number;
  idEspecialidad: number;
  idMentor: number;
  comprobante: Comprobante ;
  especialidades: Especialidad[] = [];
  mentores: Mentor[] = [];
  
  constructor(private dialogRef: MatDialogRef<ComprobanteDialogoComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: Consulta, 
    private consultaService: ConsultaService,
    private especialidadService: EspecialidadService) { }

  ngOnInit() {    debugger
    this.consulta = new Consulta();
    this.consulta =this.data;
    this.consultaService.listaComprobante(this.consulta).subscribe(data => {debugger
      this.comprobante = data[0];
    }); 

     
  


    }
 

 
    listarMentores() {
      this.consultaService.listarMentores().subscribe(data => {
        this.mentores = data;
      });
    }
  

  cancelar() {
    this.dialogRef.close();
  }
}
