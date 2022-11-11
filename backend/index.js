const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const Userauth = require('./routes/Userauth')
const productRouter = require("./routes/ProductRoute");
const helmet = require("helmet");


require('./db/config')
const errorHandlerMiddleware = require("../backend/middleware/Error-Handler");
const notFoundMiddleware = require("../backend/middleware/Not-Found");


const PORT = 5000

const app = express()
app.use(cookieParser())
app.use(helmet());
app.use(cors())
app.use(express.json())

app.use(Userauth)
app.use(productRouter)
app.use(errorHandlerMiddleware);
// app.use(notFoundMiddleware);
app.use("/image", express.static("uploads"));

app.listen(PORT, () => {
    console.log(`conection is set up ${PORT}`)
})