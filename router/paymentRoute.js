import Express from "express";
import { getOrderPayment, orderPayment } from "../controller/paymentController.js";
const router = Express.Router()

router.post('/orders', orderPayment);
router.get('/payment/:paymentId',getOrderPayment)

export default router