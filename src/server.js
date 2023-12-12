require("express-async-errors");
const database = require('./database/sqlite')
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser")

const express = require("express");
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173/"],
  credentials: true
}));
app.use(express.json());
app.use(routes);

database();


app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));