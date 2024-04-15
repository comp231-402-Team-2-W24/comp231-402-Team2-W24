const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const ReminderRoute = require("./Routes/ReminderRoute");
const NotesRoute = require('./Routes/NotesRoute');

const { MONGO_URL, SERVER_PORT, REACT_APP_FRONT_END } = process.env;

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((err) => console.error(err));

app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
});

app.use(
    cors({
        origin: [`${REACT_APP_FRONT_END}`],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
app.use("/reminders/", ReminderRoute);
app.use("/notes/", NotesRoute);

