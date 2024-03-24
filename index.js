const express = require("express");
const errorHandler = require("./middleware/errorHandler.js")
require("dotenv").config();
const connectDb = require("./config/dbConnection.js");
const cors = require("cors")
const bodyParser = require('body-parser');
const asyncHandler = require("express-async-handler");

connectDb()
const app = express();
const port = process.env.PORT;

const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:5501'],
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(bodyParser.json());

const cookieOptions = {
    // httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    // secure: true,
    // sameSite: 'None'
};
app.get('/', (req, res) => {
    res.cookie("token", "This_is_test_cookie_token", cookieOptions).json({ message: "Login successfully" }).status(200);
})

app.use("/api/user",require("./routes/userRoute.js"));
app.use("/api/user/address",require("./routes/addressRoute.js"));
app.use("/api/category",require("./routes/categoryRoute.js"));
app.use("/api/product",require("./routes/productRoute.js"));
app.use("/api/user/order",require("./routes/ordersRoute.js"));
app.use("/api/order/shipping",require("./routes/shippingRoute.js"));
app.use("/api/order/delivery",require("./routes/deliveryRoute.js"));
app.use("/api/user/cart",require("./routes/cartRoute.js"));
app.use("/api/user/review",require("./routes/reviewRoute.js"));

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is runing on port ${port}`)
})