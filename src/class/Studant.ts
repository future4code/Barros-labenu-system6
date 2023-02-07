import { hobbies } from "../modelos/types";
import { People } from "./People";

export class Students extends People{
    constructor(
        id:string,
        name:string,
        email:string,
        data_nasc:string,
        gang_id:string,
       private hobbies:string[]
    ){
        super(id,name,email,data_nasc,gang_id)
        this.hobbies = hobbies;
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
    public getHobbies(){
        return this.hobbies;
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
    public setNasc(nasc:string){
        this.data_nasc = nasc
    }
    public setGangId(gang:string){
        this.gang_id = gang
    }
    public setHobbies(hobbies:string[]){
        this.hobbies = hobbies
    }
}