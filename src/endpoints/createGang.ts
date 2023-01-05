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

        if (gang_name === ""){
            const erro=new Error("Nome da Turma INVÁLIDA!");
            erro.name="nameInvalido";
            throw erro;
        }

        const arrayModulo: number[] = [0, 1, 2, 3, 4, 5, 6];
        const value = arrayModulo.some(isBiggerThan6)
        
        function isBiggerThan6(element: number){
            if(modulo_atual > element){
                const erro=new Error("Módulo INVÁLIDO, digite um módulo de 0 á 6!");
                erro.name="moduloInvalido";
                throw erro;
            }

        }
        
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