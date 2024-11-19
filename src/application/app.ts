import express from "express"
import { api } from "../routes/api"

const app = express()
app.use(express.json())
app.use(api)

export default app