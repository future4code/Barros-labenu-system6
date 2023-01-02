import { Request, Response } from "express";
import { connection } from "../dataBase/connection";

export const putGangTeacher = async (req:Request, res:Response) =>{
    const TABELA_NAME = "LabenuSystem_teacher"
    
    try {
        const id = req.body.id as string
        const gangid = req.body.gangid as string

        const dataTeacher = await connection(TABELA_NAME)
        .select()
        .where("id", id)
                
        const dataGang = await connection("LabenuSystem_gang")
        .select()
        .where("id", gangid)
       
        await connection(TABELA_NAME)
        .update({gang_id: gangid})
        .where({id: id});

        res.status(200).send({menssage:"Docente alterado de turma!"})
    } catch (error:any) {
        res.status(401).send({menssage: error.message})
    }
}