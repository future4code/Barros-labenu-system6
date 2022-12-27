import { Request, Response} from "express";
import { Teacher } from "../class/Teacher";
import { connection } from "../dataBase/connection";
import { dateFormat } from "../functions";
import { speciality } from "../modelos/types";

export const createTeacher = async(req: Request, res: Response ) =>{
    const TABELA_NAME = "LabenuSystem_teacher"

    try{
        const { name, email, data_nasc, gang_id } = req.body
        const speciality: speciality[] = req.body.speciality

        let id = Date.now().toString()

        const formatDate:string = dateFormat(data_nasc)

        const newTeacher = new Teacher(id, name, email, formatDate, gang_id, speciality)

        await connection(TABELA_NAME).insert({
            id: newTeacher.getId(),
            name: newTeacher.getName(),
            email: newTeacher.getEmail(),
            data_nasc: newTeacher.getData_nasc(),
            gang_id: newTeacher.getGang_id(),
            specialty: newTeacher.getSpecialty()
        })

        res.status(200).send({menssage:"Professor criado" , Teacher: newTeacher})

    }catch(error:any){
        res.status(400).send({menssage: error.message})
    }
}