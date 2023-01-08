import { Request, Response} from "express";
import { Teacher } from "../class/Teacher";
import { connection } from "../dataBase/connection";
import { dateFormat } from "../functions";
import { speciality } from "../modelos/types";

export const createTeacher = async(req: Request, res: Response ) =>{
    const TABELA_NAME = "LabenuSystem_teacher"
    let errCode = 400
    try{
        const { name, email, data_nasc, gang_id } = req.body
        const speciality: string[] = req.body.speciality
        let id = Date.now().toString()

        if(!name||!email||!data_nasc||!gang_id||speciality){
            errCode = 404
            throw new Error("Verifique os atributos no body.");
        }

        
        const [result] = await connection.raw(`SELECT * FROM ${TABELA_NAME} WHERE email = "${email}";`)
        
        if (result.length>0) {
            errCode = 404
            throw new Error("Email já cadastrado!");
            
        }
        
        let dateSpeciality = await connection("LabenuSystem_specialty").select()
        
        const formatDate:string = dateFormat(data_nasc)

        const newTeacher = new Teacher(id, name, email, formatDate, gang_id, speciality)

        await connection(TABELA_NAME).insert({
            id: newTeacher.getId(),
            name: newTeacher.getName(),
            email: newTeacher.getEmail(),
            data_nasc: newTeacher.getData_nasc(),
            gang_id: newTeacher.getGang_id()
            
        })

        const arrayspeciality:speciality[] = []
        for (let i = 0; i < speciality.length; i++) {
            const element = speciality[i];
            arrayspeciality.push({id: Date.now().toString() , name:element})
            const nameExistTbSpeciality = dateSpeciality.findIndex((item)=>{
                return item.name.toLowerCase() === element.toLowerCase()
            })
                        
            if(nameExistTbSpeciality === -1){
                await connection("LabenuSystem_specialty").insert({
                    id: arrayspeciality[i].id,
                    name: arrayspeciality[i].name.toLowerCase()
                })               
            }
                     
        }

        dateSpeciality = await connection("LabenuSystem_specialty").select()
                
        for (let i = 0; i < arrayspeciality.length; i++) {
            const element = arrayspeciality[i].name;
            const indexSpeciality = dateSpeciality.findIndex((item)=>{
                return item.name.toLowerCase() === element.toLowerCase()
            })
            await connection("Teacher_specialty").insert({
                id: Date.now().toString(),
                teacher_id: newTeacher.getId(),
                specialty_id: dateSpeciality[indexSpeciality].id
            })
            
        }

        res.status(200).send({menssage:"Professor criado" , Teacher: newTeacher})

    }catch(error:any){
        res.status(errCode).send({menssage: error.message})
    }
}
