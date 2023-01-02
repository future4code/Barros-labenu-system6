import { Request, Response } from "express"
import { connection } from "../dataBase/connection"

export const getTeacher = async(req:Request, res:Response) =>{
    const TABELA_NAME = "LabenuSystem_teacher"

    try{
        const {name} = req.body
        const [ result ] = await connection.raw(`SELECT * FROM ${TABELA_NAME};`)

        res.status(200).send({result})
    }catch(err:any){
        res.status(401).send({ message: err.message })
    }

}