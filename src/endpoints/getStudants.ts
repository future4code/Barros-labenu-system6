import { Request, Response } from "express"
import { connection } from "../dataBase/connection"
import { dateFormatBr } from "../functions"

export const getStudants = async(req:Request, res:Response)=>{
    const TABELA_NAME = "LabenuSystem_student"
    let errCode = 400
    try {
    
        const {name} = req.body

        const [result] = await connection.raw(`SELECT * FROM ${TABELA_NAME} WHERE name LIKE "%${name}%";`)
        
        result.map((item:any)=>{
            item.data_nasc = dateFormatBr(item.data_nasc.toString())
            return result
        })
               
        let hobbies
                
        for (let i = 0; i < result.length; i++) {
            [hobbies] = await connection.raw( `SELECT h.id, h.name FROM Hobbies_student p, LabenuSystem_hobbies h WHERE p.student_id = '${result[i].id}' AND h.id = p.hobby_id;`)
            result[i] = ({...result[i], hobbies:hobbies})
        } 

        res.status(200).send({result})
    } catch (error:any) {
        res.status(errCode).send({ message: error.message })
    }

}