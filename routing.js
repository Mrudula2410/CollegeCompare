const express = require("express");

const app = express();

const userRoutes = require("./routes/userRoutes");

const PORT = 3002;


app.use(express.json());


// Home route
app.get("/", (req, res) => {

    res.send("Routing is working!");

});


// User routes
app.use("/users", userRoutes);


app.listen(PORT, () => {

    console.log(
        `Routing server running on http://localhost:${PORT}`
    );

});