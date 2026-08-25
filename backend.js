const express = require("express");

const app = express();

const PORT = 3003;


app.use(express.json());


app.get("/", (req, res) => {

    res.json({
        message: "Backend is working!"
    });

});


app.get("/api/college", (req, res) => {

    res.json({
        id: 1,
        name: "COEP",
        city: "Pune",
        branch: "Computer Engineering"
    });

});


app.listen(PORT, () => {

    console.log(
        `Backend running on http://localhost:${PORT}`
    );

});