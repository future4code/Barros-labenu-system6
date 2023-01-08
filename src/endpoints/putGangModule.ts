import { Request, Response } from "express";
import { connection } from "../dataBase/connection";

export const putGangModule = async (req:Request, res:Response) =>{
    const TABELA_NAME = "LabenuSystem_gang"
    let errCode = 400

    
    try {

        const name = req.body.name
        const modulo = req.body.modulo
        

        const nameValido = await connection(TABELA_NAME)
        .where({name: name})
        let nameValido2 = ""

        if(nameValido[0]){
            nameValido2 = nameValido[0].name
        }
       
        if(nameValido2 !== name){
            errCode = 400
            throw new Error("Nome da turma inválida!")
        }

        const gangModulo = nameValido.findIndex((item)=>{
            return item.modulo === modulo
        })

        if(gangModulo != -1){
            errCode = 400
            throw new Error("Turma já esta no modulo!")
        }

        const arrayModulo: number[] = [0, 1, 2, 3, 4, 5, 6]
        if (modulo > arrayModulo[6]){
            errCode = 400
            throw new Error("Módulo inválido, digite um módulo de 0 á 6!")
        }

        if(!modulo || modulo === ""){
            errCode = 400
            throw new Error("Módulo inválido!")
        }

        await connection(TABELA_NAME)
        .update({modulo: modulo})
        .where({name: name})

        res.status(200).send({menssage:"Modulo alterado com sucesso!"})
    } catch (error:any) {
        res.status(errCode).send({menssage: error.message})
    }
}