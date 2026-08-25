const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const collegeRoutes = require("./routes/collegeRoutes");
const userRoutes = require("./routes/userRoutes");
const savedCollegeRoutes= require("./routes/savedCollegeRoutes");
const app = express();


// ===============================
// MIDDLEWARE
// ===============================

app.use(cors());

app.use(express.json());


// ===============================
// MONGODB
// ===============================

mongoose.connect(
    "mongodb://127.0.0.1:27017/collegeCompare"
)
.then(() => {

    console.log("MongoDB connected");

})
.catch((error) => {

    console.log(
        "MongoDB connection error:",
        error
    );

});


// ===============================
// ROUTES
// ===============================

app.use(
    "/api/colleges",
    collegeRoutes
);

app.use(
    "/api/users",
    userRoutes
);

app.use(
    "/api/saved-colleges",
    savedCollegeRoutes
);
// ===============================
// SERVER
// ===============================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});