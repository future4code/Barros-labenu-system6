import { Request, Response } from "express"
import { connection } from "../dataBase/connection"


export const getGangs = async (req: Request, res: Response) => {
    let errorCode = 400

    try {
        const gangActive = await connection.select("*").from("LabenuSystem_gang")


        res.status(200).send(gangActive)

    } catch (error: any) {
        res.status(errorCode).send({ message: error.message })

    }
}