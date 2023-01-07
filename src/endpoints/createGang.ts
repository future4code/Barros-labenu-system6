import { Request, Response} from "express";
import { connection } from "../dataBase/connection";
import { Gang } from "../class/Gang";


export const createGang = async( req: Request, res: Response) => {
    const TABELA_NAME = "LabenuSystem_gang"
    
    try {
        const {gang_name, teacher_id, student_id, modulo_atual} = req.body
        let gang_id = Date.now().toString()

        const [result] = await connection.raw(`SELECT * FROM ${TABELA_NAME} WHERE name = "${gang_name}";`)
        
        if (result.length>0) {
            const erro=new Error("Nome de tumar já cadastrado!");
            erro.name="nameInvalido";
            throw erro;
            
        }

        const newGang = new Gang(gang_id, gang_name, teacher_id, student_id, modulo_atual)
        
        if (gang_name === ""){
            const erro=new Error("Nome da Turma INVÁLIDA!");
            erro.name="nameInvalido";
            throw erro;
        }

        const arrayModulo: number[] = [0, 1, 2, 3, 4, 5, 6];
                 
        const value = arrayModulo.findIndex((item)=>{
            return (item.toString() === modulo_atual)
        })
       
        
        if(value === -1){
             const erro=new Error("Módulo INVÁLIDO, digite um módulo de 0 á 6!");
             erro.name="moduloInvalido";
             throw erro;
        }

    
        
        await connection(TABELA_NAME).insert({
            id: newGang.getGang_id(),
            name: newGang.getGangName(),
            modulo: newGang.getModuloAtual()
        }) 

        
        res.status(200).send({menssage:"Turma Criada!", Gang: newGang})


    } catch (error: any) {
        res.status(400).send({menssage: error.message})
    }

}