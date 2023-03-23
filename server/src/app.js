import express from "express"
import cors from "cors"
import { planetsRouter } from "./routes/planets/planets.router.js"
import { launchrouter } from "./routes/launches/launches.router.js"
import path from "path"
import { fileURLToPath } from 'url';
import morgan from "morgan"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
app.use(cors({orgin:"http://localhost:8987"}))
app.use(morgan("combined"))
app.use(express.static(path.join(__dirname,"..","public")))
app.use(express.json())
app.use("/planets",planetsRouter)
app.use("/launch",launchrouter)
app.get('/*', (req, res) => {
    res.sendFile(path.join(path.join(__dirname, '..', 'public', 'index.html')));
});
export default app
