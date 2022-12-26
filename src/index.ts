import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createStudants } from './endpoints/createStudants'
import { createTeacher } from './endpoints/createTeacher'
import { ping } from './endpoints/ping'
import { createGang } from './endpoints/createGang'
import { getStudants } from './endpoints/getStudants'



dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.get("/ping", ping)
app.post("/studant", createStudants);
app.post("/teacher", createTeacher);
app.post("/gang", createGang);
app.get("/studant", getStudants);

