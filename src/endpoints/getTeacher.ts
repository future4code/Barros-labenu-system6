import { Request, Response } from "express"
import { connection } from "../dataBase/connection"

export const getTeacher = async(req:Request, res:Response) =>{
    const TABELA_NAME = "LabenuSystem_teacher"

    try{
        const {name} = req.body
        const [ result ] = await connection.raw(`SELECT * FROM ${TABELA_NAME} WHERE name LIKE "%${name}%";`)
        let speciality

        for (let i = 0; i < result.length; i++) {
            [speciality] = await connection.raw( `SELECT t.id, t.name FROM Teacher_specialty s, LabenuSystem_specialty t WHERE s.teacher_id = '${result[i].id}' AND t.id = s.specialty_id;`)
            result[i] = ({...result[i], speciality:speciality})
        } 
        res.status(200).send({result})
    }catch(err:any){
        res.status(401).send({ message: err.message })
    }

}