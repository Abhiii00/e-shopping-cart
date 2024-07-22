const paymentModel = require('../Model/checkoutModel')
const stripe = require('stripe')('sk_test_51PSYXCBeuBTxbWczd1ScHT120t7XKjIMudS27Yd9mw5TjNgKzeBh3i5PPoXJGns2e1uEcdLM4JOt4n7h6Fv21v7h007ZX8yz2n');


exports.paymentCheckout = async(req, res) =>{
    const { products, email } = req.body
    try {
        const lineItems = products.map((product) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.title,
                        images: [product.image],
                    },
                    unit_amount: product.price,
                },
                quantity: product.quantity,
            };
        });
    

        // stripe detial store part

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3001/success",
            cancel_url: "http://localhost:3001/cancel",
        });

        res.json({
            id: session.id,
        });

        // inserting payment detail in db
        
        await paymentModel.create({
            email: email,
            transactionId: session.id, 
            paymentStatus: "Success",
            products: products
        });
        
    } catch (error) {
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
}