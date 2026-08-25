const express = require("express");
const router = express.Router();

const User = require("../models/user");


// ==========================================
// REGISTER
// ==========================================

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }


        // Check existing user

        const existingUser =
            await User.findOne({
                email: email.toLowerCase()
            });


        if (existingUser) {

            return res.status(409).json({
                message: "Email already registered"
            });

        }


        // Create user

        const user =
            await User.create({

                name: name,

                email: email.toLowerCase(),

                password: password

            });


        res.status(201).json({

            message: "Registration successful",

            userId: user._id

        });


    } catch (error) {

        console.error(
            "Registration error:",
            error
        );

        res.status(500).json({

            message: "Registration failed"

        });

    }

});


// ==========================================
// LOGIN
// ==========================================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                message: "Email and password are required"

            });

        }


        const user =
            await User.findOne({

                email: email.toLowerCase()

            });


        if (!user) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }


        if (user.password !== password) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }


        res.status(200).json({

            message: "Login successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });


    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        res.status(500).json({

            message: "Login failed"

        });

    }

});

// ==========================================
// SAVE COMPARISON HISTORY
// ==========================================

router.post("/:userId/comparisons", async (req, res) => {

    try {

        const { colleges } = req.body;


        if (
            !colleges ||
            !Array.isArray(colleges) ||
            colleges.length < 2
        ) {

            return res.status(400).json({

                message:
                    "At least 2 colleges are required"

            });

        }


        const user =
            await User.findById(
                req.params.userId
            );


        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }


        user.compareHistory.unshift({

            colleges: colleges,

            comparedAt: new Date()

        });


        await user.save();


        res.status(201).json({

            message:
                "Comparison history saved"

        });


    } catch (error) {

        console.error(
            "Comparison history error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to save comparison history"

        });

    }

});


// ==========================================
// GET COMPARISON HISTORY
// ==========================================

router.get("/:userId/comparisons", async (req, res) => {

    try {

        const user =
            await User.findById(
                req.params.userId
            );


        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }


        res.status(200).json(
            user.compareHistory || []
        );


    } catch (error) {

        console.error(
            "Get comparison history error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to fetch comparison history"

        });

    }

});



module.exports = router;