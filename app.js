import express, { json } from "express";
import cors from 'cors'
import dotenv from "dotenv"
import router from "./router/paymentRoute.js";

dotenv.config()
const app = express()

app.use(cors({
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/', router)

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:3030`)
})