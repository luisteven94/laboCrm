  import { Consulta } from './../_model/consulta';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
 import { Mentor } from '../_model/mentor';
import { Mentorizado } from '../_model/mentorizado';
import { Subject } from 'rxjs';
import { Comprobante } from '../_model/comprobante';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  medicoCambio = new Subject<Consulta[]>();
  prospectoCambio = new Subject<Mentorizado[]>();

  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/consultas`;

  urlMentor: string = `${environment.HOST}/mentor`;

  urlMentorizado: string = `${environment.HOST}/mentorizado`;

  urlComprobante: string = `${environment.HOST}/comprobante`;

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

  registrarErp(medico: Consulta) {
    return this.http.post(`${this.url}/erp`, medico);
  }
  
  modificar(medico: Consulta) {
    return this.http.put(this.url, medico);
  }

  eliminar(idmedico: number) {
    return this.http.delete(`${this.url}/${idmedico}`);
  }

 
 

  listarMentorizado() {
    return this.http.get<Mentorizado[]>(this.urlMentorizado);
  }

  listarMentores() { 
     return this.http.get<Mentor[]>(this.urlMentor);

 
  }


  listarMentoresPrueba() { 
    // return this.http.get<Mentor[]>(this.urlMentor);

    return this.http.get<Comprobante[]>(`${this.url}/comprobanteXsesion/1`);

  }

  listaComprobante(consulta: Consulta) {debugger
   var id = consulta.idConsulta;

    return this.http.get<Comprobante[]>(this.urlComprobante+"/comprobanteXsesion/"+id);
  }
}
