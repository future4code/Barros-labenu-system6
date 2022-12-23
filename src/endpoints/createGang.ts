import { Request, Response} from "express";
import { connection } from "../dataBase/connection";
import { Gang } from "../class/Gang";


export const createGang = async( req: Request, res: Response) => {
    const TABELA_NAME = "LabenuSystem_gang"
    let errCode = 400

    try {
        const {gang_name, teacher_id, student_id, modulo_atual} = req.body
        let gang_id = Date.now().toString()

        const newGang = new Gang(gang_id, gang_name, teacher_id, student_id, modulo_atual)
        console.log(newGang);
        
        await connection(TABELA_NAME).insert({
            id: newGang.getGang_id(),
            name: newGang.getGangName(),
            modulo: newGang.getModuloAtual()
        }) 

        res.status(200).send({menssage:"Turma Criada!", Gang: newGang})


    } catch (error: any) {
        res.status(errCode).send({menssage: error.message})
    }

}