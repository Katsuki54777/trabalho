const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const emprestimoRoutes = require("./routes/emprestimoRoutes");
const livroRoutes = require("./routes/livroRoutes");    
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
require('dotenv').config();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/", userRoutes);
app.use("/", categoriaRoutes);
app.use("/", emprestimoRoutes);
app.use("/", livroRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}/api-docs`)
})