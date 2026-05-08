const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const { initSocket } = require("./socket/socket");

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

const io = initSocket(server);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/experts", require("./routes/expertRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));
app.use(errorHandler);
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});