import express from "express";
import { Router } from "./routes/index.js";
import cors from "cors";
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors({
    origin: true
}))
app.use(express.json())
app.use(Router)
app.use((req,res)=>{
    res.status(400).json("are you lost?")
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})


