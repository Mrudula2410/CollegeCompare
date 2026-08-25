const express = require("express");

const router = express.Router();


// GET all users
router.get("/", (req, res) => {

    res.json([
        {
            id: 1,
            name: "Parshwi",
            email: "parshwi@example.com"
        },
        {
            id: 2,
            name: "Rahul",
            email: "rahul@example.com"
        }
    ]);

});


// GET single user
router.get("/:id", (req, res) => {

    const id = req.params.id;

    res.json({
        message: "User found",
        userId: id
    });

});


// POST user
router.post("/", (req, res) => {

    const user = req.body;

    res.json({
        message: "User added successfully",
        user: user
    });

});


module.exports = router;