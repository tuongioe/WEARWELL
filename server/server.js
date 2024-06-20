require("dotenv/config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cors = require("cors");
const APIError = require("./src/utils/apiError");

const app = express(),
  PORT = process.env.PORT || 8888;

// init static path
app.use(express.static(__dirname + "/src/uploads"));

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// Init routes
app.use("/api/v1", require("./src/routes"));

// Init handler error
app.use((req, res, next) => {
  const error = new APIError(404, "Not Found!");
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  console.log("====================================");
  console.log(`error`, error);
  console.log("====================================");

  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error!",
  });
});

app.listen(PORT, () => {
  // Init db
  require("./src/db/init.mongo");
  require("./src/utils/mockData");
  console.log(`server running on http://localhost:${PORT}`);
});
