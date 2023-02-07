
export class People{
    constructor(
       protected id:string,
       protected name:string, 
       protected email:string,
       protected data_nasc: string,
       protected gang_id:string
    ){
        this.id=id,
        this.name=name,
        this.email=email,
        this.data_nasc=data_nasc,
        this.gang_id=gang_id
    }
  
}