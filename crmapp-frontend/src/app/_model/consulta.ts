 import { Especialidad } from './especialidad';
 import { Mentor } from './mentor';
import { Mentorizado } from './mentorizado';

export class Consulta {
    idConsulta: number;
     especialidad: Especialidad;
    fecha: string;
    mentorizado: Mentorizado;
    mentor: Mentor;
}