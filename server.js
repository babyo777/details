import express from "express";
import { Router } from "./routes/index.js";
import cors from "cors";
const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors({
    origin: ["https://tanmay-seven.vercel.app/","https://tanmayo7.vercel.app/"]
}))
app.use(express.json())
app.use(Router)
app.use((req,res)=>{
    res.json("are you lost?")
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})


