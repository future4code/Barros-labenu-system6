import { Request, Response} from "express";
import { Students } from "../class/Studant";
import { connection } from "../dataBase/connection";
import { dateFormat } from "../functions";
import { hobbies } from "../modelos/types";


export const createStudants = async( req: Request, res: Response) => {
    const TABELA_NAME = "LabenuSystem_student"
    let errCode = 400
    try {
        const {name, email, data_nasc, gang_id} = req.body;
        const hobbies: hobbies[] = req.body.hobbies
        let id = Date.now().toString()

       /*  if(!name || !email || !data_nasc || !gang_id || hobbies.length === 0){
            throw new Error("Body Inválido.")
        } */
        hobbies.map((hobbies) =>{
            hobbies.id = id
        });
        
        const arrayHabbies = await connection("LabenuSystem_hobbies").select()
        
        //console.log(arrayHabbies);
        

       /*  for (let i = 0; i < arrayHabbies.length; i++) {
            const element = arrayHabbies[i].name;
            console.log(element);
            
        } */
        const formatDate:string = dateFormat(data_nasc)
               
        const newStudant = new Students(id, name, email, formatDate, gang_id, hobbies)
        
        for (let i = 0; i < hobbies.length; i++) {
            const element = hobbies[i].name;
            const nameExist = arrayHabbies.findIndex((item)=>{
                return item.name.toLowerCase() === element.toLowerCase()
            })
            if(nameExist!=1){
                await connection("LabenuSystem_hobbies").insert({
                    id: Date.now().toString(),
                    name: element
                })                
            }
                                    
        }
        
     
        await connection(TABELA_NAME).insert({
            id: newStudant.getId(),
            name: newStudant.getName(),
            email: newStudant.getEmail(),
            data_nasc: newStudant.getData_nasc(),
            gang_id: newStudant.getGang_id()
        }) 

        res.status(200).send({menssage:"Estudante criado" , Students: newStudant})

    } catch (error:any) {
        res.status(errCode).send({menssage: error.message})
        
    }

}
