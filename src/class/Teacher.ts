import { People } from "./People";

export class Teacher extends People{
    constructor(
        id:string,
        name:string,
        email:string,
        data_nasc:Date,
        gang_id:string,
        private specialty_id:string,
    ){
        super(id, name, email, data_nasc,gang_id)
        this.specialty_id = specialty_id;
    }
    public getSpecialty(){
        return this.specialty_id;
    }
    public getId(){
        return this.id;
    }
    public getName(){
        return this.name;
    }
    public getEmail(){
        return this.email
    }
    public getData_nasc(){
        return this.data_nasc
    }
    public getGang_id(){
        return this.gang_id
    }
    public setId(id:string){
        this.id = id
    }
    public setName(name:string){
        this.name = name
    }
    public setEmail(email:string){
        this.email = email
    }
    public setNasc(nasc:Date){
        this.data_nasc = nasc
    }
    public setGangId(gang:string){
        this.gang_id = gang
    }
    public setSpecialty(specialty_id:string){
        this.specialty_id = specialty_id
    }

}