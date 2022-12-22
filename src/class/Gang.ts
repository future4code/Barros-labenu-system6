import { Modulo } from "../modelos/types";

export class Gang {
   constructor(
    private gang_id: string,
    private gang_name: string,
    private teachers_id: string[],
    private students_id: string[],
    private modulo_atual: Modulo.Zero
   ){
    this.gang_id = gang_id;
    this.gang_name = gang_name;
    this.teachers_id = teachers_id;
    this.students_id = students_id;
    this.modulo_atual = modulo_atual;
   }

   public getGangId(){
      return this.gang_id;
    }
  public getGangName(){
      return this.gang_name;
    }
  public getTeachersId(){
      return this.teachers_id
    }
  public getStudentsId(){
      return this.students_id
    }
  public getGang_id(){
      return this.gang_id
    }
  public getModuloAtual(){
      return this.modulo_atual;
    }

  public setGangId(gang: string){
      this.gang_id = gang
    }
   public setGangName(gang_name: string){
      this.gang_name = gang_name
    }
   public setTeachersId(teachers_id: string[]){
      this.teachers_id = teachers_id
    }
   public setStudentsId(students_id: string[]){
      this.students_id = students_id
    }
   public setModuloAtual(modulo_atual: Modulo.Zero){
      this.modulo_atual = modulo_atual
    }
   
}


