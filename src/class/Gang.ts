import { Modulo } from "../modelos/types";

export class Gang {
   constructor(
    public gang_id: string,
    public gang_name: string,
    public teachers_id: string,
    public students_id: string,
    public modulo_atual: Modulo.Zero
   ){
    this.gang_id = gang_id;
    this.gang_name =gang_name;
    this.teachers_id = teachers_id;
    this.students_id = students_id;
    this.modulo_atual = modulo_atual;
   }
}


