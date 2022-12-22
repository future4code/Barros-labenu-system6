import { Request, Response} from "express";
import { connection } from "../dataBase/connection";
import { Gang } from "../class/Gang";


export const createGang = async( req: Request, res: Response) => {
    const TABELA_NAME = "LabenuSystem_gang"
    let errCode = 400

    try {
        const {id, gang_id, gang_name, teacher_id, student_id, modulo_atual} = req.body

        const newGang = new Gang(id, gang_id, gang_name, teacher_id, student_id, modulo_atual)

        await connection(TABELA_NAME).insert({
            id: newGang.getId(),
            name: newGang.getGangName(),
            teacher_id: newGang.getTeachersId(),
            gang_id: newGang.getGang_id(),
            student_id: newGang.getStudentId(),
            modulo_atual: newGang.getModuloAtual()
        }) 

        res.status(200).send({menssage:"Turma Criada!", Gang: newGang})


    } catch (error: any) {
        res.status(errCode).send({menssage: error.message})
    }

}