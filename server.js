import express from "express";
import { Router } from "./routes/index.js";
import cors from "cors";
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(Router)
app.use((req,res)=>{
    res.json("Page not Found")
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})


