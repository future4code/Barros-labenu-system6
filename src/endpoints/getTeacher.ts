import { Request, Response } from "express"
import { connection } from "../dataBase/connection"
import { dateFormatBr } from "../functions"

export const getTeacher = async(req:Request, res:Response) =>{
    const TABELA_NAME = "LabenuSystem_teacher"
    let errCode = 400
    try{
        const {name} = req.body
        
        if (!name) {
            throw new Error("Verifique o body");
            
        }

        const [ result ] = await connection.raw(`SELECT * FROM ${TABELA_NAME} WHERE name LIKE "%${name}%";`)

        if(result.length === 0){
            errCode = 404
            throw new Error("Docente não encontrado.");
        }

        result.map((item:any)=>{
            item.data_nasc = dateFormatBr(item.data_nasc.toString())
            return result
        })
               
        let speciality
                
        for (let i = 0; i < result.length; i++) {
            [speciality] = await connection.raw( `SELECT h.id, h.name FROM Teacher_specialty p, LabenuSystem_specialty h WHERE p.teacher_id = '${result[i].id}' AND h.id = p.specialty_id;`)
            result[i] = ({...result[i], speciality:speciality})
        } 

        res.status(200).send({result})
    }catch(err:any){
        res.status(errCode).send({ message: err.message })
    }

}