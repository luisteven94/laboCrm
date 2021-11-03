  import { Consulta } from './../_model/consulta';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
 import { Mentor } from '../_model/mentor';
import { Mentorizado } from '../_model/mentorizado';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  medicoCambio = new Subject<Consulta[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/consultas`;

  urlMentor: string = `${environment.HOST}/mentor`;

  urlMentorizado: string = `${environment.HOST}/mentorizado`;

  constructor(private http: HttpClient) { }


  registrarmentor(mentor: Mentor) {
    return this.http.post(this.urlMentor, mentor);
  }

  buscarMentor(mentor: Mentor) {
    return this.http.post<Mentor[]>(`${this.urlMentor}/buscar`, mentor);
  }


  registrarmentorizado(mentor: Mentorizado) {
    return this.http.post(this.urlMentorizado, mentor);
  }

  buscarMentorizado(mentor: Mentorizado) {
    return this.http.post<Mentorizado[]>(`${this.urlMentorizado}/buscar`, mentor);
  }



  listar() {
    return this.http.get<Consulta[]>(this.url);
  }


  listarPorId(idmedico: number) {
    return this.http.get<Consulta>(`${this.url}/${idmedico}`);
  }

  registrar(medico: Consulta) {
    return this.http.post(this.url, medico);
  }

  modificar(medico: Consulta) {
    return this.http.put(this.url, medico);
  }

  eliminar(idmedico: number) {
    return this.http.delete(`${this.url}/${idmedico}`);
  }

 
  listarMentores() {
    return this.http.get<Mentor[]>(this.urlMentor);
  }

  listarMentorizado() {
    return this.http.get<Mentorizado[]>(this.urlMentorizado);
  }


   
}
