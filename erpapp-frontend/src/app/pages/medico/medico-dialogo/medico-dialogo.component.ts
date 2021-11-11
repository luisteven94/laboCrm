import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { Especialidad } from 'src/app/_model/especialidad';
import { Mentor } from 'src/app/_model/mentor';
import { Mentorizado } from 'src/app/_model/mentorizado';
import swal from 'sweetalert';
import { Comprobante } from 'src/app/_model/comprobante';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit {

  mentorizado: Mentorizado;


  fechaSeleccionada: Date = new Date();

  idMentorizado: number;
  idEspecialidad: number;
  idMentor: number;
  comprobante: Comprobante ;
  especialidades: Especialidad[] = [];
  mentores: Mentor[] = [];
  
  constructor(private dialogRef: MatDialogRef<MedicoDialogoComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: Mentorizado, 
    private consultaService: ConsultaService,
    private especialidadService: EspecialidadService) { }

  ngOnInit() {   
      this.listarEspecilidad();
      this.listarMentores();

    this.mentorizado = new Mentorizado();
    this.mentorizado =this.data;

    }


 


  retornaComprobantePorSesion() {

    // this.consultaService.retornaComprobantePorSesion(this.consulta.idConsulta).subscribe(data => {
    //   this.comprobante = data[0];
    // });
  }
  


  listarEspecilidad() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });
  }
  listarMentores() {
    this.consultaService.listarMentores().subscribe(data => {
      this.mentores = data;
    });
  }
  operar() {

      // let mentorizado = new Mentorizado();
      // mentorizado.idMentorizado = this.idMentorizado;
      let especialidad = new Especialidad();
      especialidad.idEspecialidad = this.idEspecialidad;
      let mentor = new Mentor();
      mentor.idMentor = this.idMentor;
      let consulta = new Consulta();
      consulta.especialidad = especialidad;
      consulta.mentor = mentor;
       consulta.mentorizado = this.mentorizado;
      let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
      let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
      consulta.fecha = localISOTime;  
      swal("Registro!", "Inscripcion correcta, se esta enviando correo al mentorizado", "success");

      this.consultaService.registrarErp(consulta).subscribe(() => {   


      });

    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}
