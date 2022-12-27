import { Request, Response } from "express";
import { connection } from "../dataBase/connection";

export const putGangStudant = async (req:Request, res:Response)=>{
    const TABELA_NAME = "LabenuSystem_student"
    let errCode = 400
    try {
        const id = req.body.id as string
        const gangid = req.body.gangid as string

        if(!id || !gangid){
            errCode = 406
            throw new Error("verifique o body");
        }

        const dataStudant = await connection(TABELA_NAME)
        .select()
        .where("id", id)
                
        if(dataStudant.length === 0 ){
            errCode = 404
            throw new Error("Estudante não encontrado");
        }

        if(dataStudant[0].gang_id === gangid){
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

        res.status(200).send({menssage:"Sucesso alterado a turma!"})
    } catch (error:any) {
        res.status(errCode).send({menssage: error.message})
    }


}