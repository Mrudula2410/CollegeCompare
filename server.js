const express = require("express");

const app = express();

const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express Server is Working!");
});

app.get("/about", (req, res) => {
    res.send("This is About Page");
});

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});