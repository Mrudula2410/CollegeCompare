const express = require("express");
const router = express.Router();

const College = require("../models/college");


// ===============================
// GET ALL COLLEGES
// ===============================

router.get("/", async (req, res) => {
    try {

        const colleges = await College.find();

        res.status(200).json(colleges);

    } catch (error) {

        console.error("Error fetching colleges:", error);

        res.status(500).json({
            message: "Failed to fetch colleges"
        });

    }
});

// ===============================
// FILTER COLLEGES
// ===============================

router.get("/filter/search", async (req, res) => {

    try {

        const {
            location,
            branch,
            type,
            minFees,
            maxFees
        } = req.query;


        let filter = {};


        // LOCATION

        if (location) {

            filter.location = {
                $regex: location,
                $options: "i"
            };

        }


        // BRANCH

        if (branch) {

            filter.branches = {
                $regex: branch,
                $options: "i"
            };

        }


        // COLLEGE TYPE

        if (type) {

            filter.type = type;

        }


        // FEES

        if (minFees || maxFees) {

            filter.fees = {};

            if (minFees) {
                filter.fees.$gte = Number(minFees);
            }

            if (maxFees) {
                filter.fees.$lte = Number(maxFees);
            }

        }


        const colleges = await College.find(filter);

        res.status(200).json(colleges);

    } catch (error) {

        console.error("Filter error:", error);

        res.status(500).json({
            message: "Failed to filter colleges"
        });

    }

});


// ===============================
// GET SINGLE COLLEGE
// ===============================

router.get("/:id", async (req, res) => {
    try {

        const college = await College.findById(req.params.id);

        if (!college) {
            return res.status(404).json({
                message: "College not found"
            });
        }

        res.status(200).json(college);

    } catch (error) {

        console.error("Error fetching college:", error);

        res.status(500).json({
            message: "Failed to fetch college"
        });

    }
});



module.exports = router;