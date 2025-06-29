require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');

require('./config/passport.js');
const cors = require('cors');

const pokeRoutes = require('./routes/routes.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// Create an instance of an Express application
const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/api-docs", // change this to wherever you want
  })
);

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    app.redirect("/auth/google/callback");
  }
  res.send(req.user); // or render profile
});

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
// All your other routes
app.use("/", pokeRoutes);
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connection db


app.use((req, res) => {
  res.status(404).send("Page not found");
});

// app.use('/', './controllers/routes.js'); 
// Define the port number the server will listen on
const PORT = 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


