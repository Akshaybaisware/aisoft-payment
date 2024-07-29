import express, { json } from "express";
import cors from 'cors'
import dotenv from "dotenv"
import router from "./router/paymentRoute.js";

dotenv.config()
const app = express()

// const allowedOrigins = ['http://localhost:3030','http://localhost:5173'];
// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }));

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/', router)

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:3030`)
})