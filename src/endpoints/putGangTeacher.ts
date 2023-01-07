import { Request, Response } from "express";
import { connection } from "../dataBase/connection";

export const putGangTeacher = async (req:Request, res:Response) =>{
    const TABELA_NAME = "LabenuSystem_teacher"
    let errCode = 400;
    try {
        const id = req.body.id as string
        const gangid = req.body.gangid as string

        if(!id || !gangid){
            errCode = 406
            throw new Error("verifique o body");
        }

        const dataTeacher = await connection(TABELA_NAME)
        .select()
        .where("id", id)

        if(dataTeacher.length === 0 ){
            errCode = 404
            throw new Error("Docente não encontrado");
        }

        if(dataTeacher[0].gang_id === gangid){
            errCode = 409
            throw new Error("Estudante já faz parte da turma");
        }
                
        const dataGang = await connection("LabenuSystem_gang")
        .select()
        .where("id", gangid)

        if(dataGang.length === 0 ){
            errCode = 404
            throw new Error("Estudante não encontrado");
        }   
       
        await connection(TABELA_NAME)
        .update({gang_id: gangid})
        .where({id: id});

        res.status(200).send({menssage:"Docente alterado de turma!"})
    } catch (error:any) {
        res.status(401).send({menssage: error.message})
    }
}