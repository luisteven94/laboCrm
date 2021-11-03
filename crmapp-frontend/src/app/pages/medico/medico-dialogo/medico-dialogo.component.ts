import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { EspecialidadService } from 'src/app/_service/especialidad.service';
import { Especialidad } from 'src/app/_model/especialidad';
import { Mentor } from 'src/app/_model/mentor';
import { Mentorizado } from 'src/app/_model/mentorizado';

@Component({
  selector: 'app-medico-dialogo',
  templateUrl: './medico-dialogo.component.html',
  styleUrls: ['./medico-dialogo.component.css']
})
export class MedicoDialogoComponent implements OnInit {

  consulta: Consulta;


  fechaSeleccionada: Date = new Date();

  idMentorizado: number;
  idEspecialidad: number;
  idMentor: number;
  mentores: Mentor[] = [];
  especialidades: Especialidad[] = [];
  mentorizados: Mentorizado[] = [];
  
  constructor(private dialogRef: MatDialogRef<MedicoDialogoComponent>, 
    @Inject(MAT_DIALOG_DATA) private data: Consulta, 
    private consultaService: ConsultaService,
    private especialidadService: EspecialidadService) { }

  ngOnInit() {
    this.listarMentores();
    this.listarMentorizados();
    this.listarEspecilidad();

    this.consulta = new Consulta();
    this.consulta.idConsulta = this.data.idConsulta;
    this.consulta.mentor = this.data.mentor;
    this.consulta.mentorizado = this.data.mentorizado;
    this.consulta.especialidad = this.data.especialidad;
  }


  listarMentores() {
    this.consultaService.listarMentores().subscribe(data => {
      this.mentores = data;
    });
  }
  listarEspecilidad() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });
  }
  listarMentorizados() {
    this.consultaService.listarMentorizado().subscribe(data => {
      this.mentorizados = data;
    });
  }
  operar() {
    if (this.consulta != null && this.consulta.idConsulta > 0) {
       this.consultaService.modificar(this.consulta).pipe(switchMap(() => {        
        return this.consultaService.listar();
      })).subscribe(medicos => {
        this.consultaService.medicoCambio.next(medicos);
        this.consultaService.mensajeCambio.next("SE MODIFICO");
      });
    } else {
      let mentorizado = new Mentorizado();
      mentorizado.idMentorizado = this.idMentorizado;
      let especialidad = new Especialidad();
      especialidad.idEspecialidad = this.idEspecialidad;
      let mentor = new Mentor();
      mentor.idMentor = this.idMentor;
      let consulta = new Consulta();
      consulta.especialidad = especialidad;
      consulta.mentor = mentor;
      consulta.mentorizado = mentorizado;
      let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
      let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
      consulta.fecha = localISOTime;
      this.consultaService.registrar(consulta).subscribe(() => {
        this.consultaService.listar().subscribe(medicos => {
          this.consultaService.medicoCambio.next(medicos);
          this.consultaService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }
}
