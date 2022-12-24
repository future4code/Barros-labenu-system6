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
        const hobbies: string[] = req.body.hobbies
        let id = Date.now().toString()
        
        let dateHobbies = await connection("LabenuSystem_hobbies").select()
        
        const formatDate:string = dateFormat(data_nasc)
               
        const newStudant = new Students(id, name, email, formatDate, gang_id, hobbies)

        await connection(TABELA_NAME).insert({
            id: newStudant.getId(),
            name: newStudant.getName(),
            email: newStudant.getEmail(),
            data_nasc: newStudant.getData_nasc(),
            gang_id: newStudant.getGang_id()
        })

        const arrayHobbies:hobbies[] = []
        for (let i = 0; i < hobbies.length; i++) {
            const element = hobbies[i];
            arrayHobbies.push({id: Date.now().toString() , name:element})
            const nameExistTbHobbies = dateHobbies.findIndex((item)=>{
                return item.name.toLowerCase() === element.toLowerCase()
            })
                        
            if(nameExistTbHobbies === -1){
                await connection("LabenuSystem_hobbies").insert({
                    id: arrayHobbies[i].id,
                    name: arrayHobbies[i].name.toLowerCase()
                })               
            }
                     
        }
        
        dateHobbies = await connection("LabenuSystem_hobbies").select()
                
        for (let i = 0; i < arrayHobbies.length; i++) {
            const element = arrayHobbies[i].name;
            const indexHobbies = dateHobbies.findIndex((item)=>{
                return item.name.toLowerCase() === element.toLowerCase()
            })
            await connection("Hobbies_student").insert({
                id: Date.now().toString(),
                student_id: newStudant.getId(),
                hobby_id: dateHobbies[indexHobbies].id
            })
            
        }
        
       
            
        res.status(200).send({menssage:"Estudante criado" , Students: newStudant})

    } catch (error:any) {
        res.status(errCode).send({menssage: error.message})
        
    }


}
