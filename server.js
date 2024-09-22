const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./backend/models");
//const db = require("./config/db.js");



// db.authenticate()
//   .catch(error => console.error(error))
//   .then(() => console.log("Database connected..."));
  
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./backend/routes/schedulerRoutes")(app);
require("./backend/routes/userRoutes")(app);
require("./backend/routes/masterRoutes")(app);
require("./backend/routes/customerRoutes")(app);
require("./backend/routes/authRoutes")(app);


// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, "/client/dist")));

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to StyleScheduler backend." });
// });

// // All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});