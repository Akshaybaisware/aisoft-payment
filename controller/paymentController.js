import Razorpay from "razorpay";

export const orderPayment =
    async (req, res) => {
        try {
            console.log("running1");

            var razorpay = new Razorpay({
                key_id: process.env.KEY_ID,
                key_secret: process.env.SECRET_KEY
            });
            console.log("running2");

            var options = {
                amount: req.body.amount,
                currency: req.body.currency,
                receipt: "receipt#1",
                payment_capture:1
            };
            // console.log("running3");

            const response = await razorpay.orders.create(options);
            console.log("running4");

            return res.send({ data: response, status: 200, msg: "success" });
        } catch (error) {
            console.log(error);
        }
    }


export const getOrderPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        console.log("Fetching payment details for Payment ID:", paymentId);

        if (!paymentId) {
            return res.status(400).send({ status: 400, msg: 'Payment ID is required' });
        }

        const keyId = process.env.KEY_ID;
        const keySecret = process.env.SECRET_KEY;

        // Log key information (be careful not to log secrets in production)
        console.log("Key ID:", keyId);
        console.log("Key Secret Length:", keySecret ? keySecret.length : 'Not Set');

        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret
        });

        const getRazorOrder = await razorpay.payments.fetch(paymentId);

        console.log("Payment details fetched:", getRazorOrder);

        return res.status(200).send({ data: getRazorOrder, status: 200, msg: "success" });
    } catch (error) {
        console.error("Error fetching payment details:", error);

        if (error.statusCode === 400 && error.error && error.error.code === 'BAD_REQUEST_ERROR') {
            return res.status(400).send({
                statusCode: 400,
                error: {
                    code: 'BAD_REQUEST_ERROR',
                    description: 'The id provided does not exist or is invalid',
                    source: 'business',
                    step: 'payment_initiation',
                    reason: 'input_validation_failed',
                    metadata: {}
                }
            });
        }

        return res.status(500).send({ status: 500, msg: 'Error fetching payment details', error: error.message });
    }
};

// export const getOrderPayment = async (req, res) => {
//     try {
//         const { paymentId } = req.params;
//         console.log("Fetching payment details for Payment ID:", paymentId);

//         const keyId = process.env.KEY_ID;
//         const keySecret = process.env.SECRET_KEY ;

//         // Log key information (be careful not to log secrets in production)
//         console.log("Key ID:", keyId);
//         console.log("Key Secret Length:", keySecret ? keySecret.length : 'Not Set');

//         const razorpay = new Razorpay({
//             key_id: keyId,
//             key_secret: keySecret
//         });

//         const getRazorOrder = await razorpay.payments.fetch(paymentId);

//         console.log("Payment details fetched:", getRazorOrder);

//         return res.status(200).send({ data: getRazorOrder, status: 200, msg: "success" });
//     } catch (error) {
//         console.error("Error fetching payment details:", error);

//         return res.status(500).send({ status: 500, msg: 'Error fetching payment details', error: error.message });
//     }
// };
