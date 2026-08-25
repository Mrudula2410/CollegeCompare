const express = require("express");
const router = express.Router();

const User = require("../models/user");
const College = require("../models/college");


// =====================================================
// GET SAVED COLLEGES
// =====================================================

router.get("/:userId", async (req, res) => {

    try {

        const user = await User.findById(req.params.userId)
            .populate("savedColleges");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json(user.savedColleges);

    } catch (error) {

        console.error("Get saved colleges error:", error);

        res.status(500).json({
            message: "Failed to get saved colleges"
        });

    }

});


// =====================================================
// SAVE COLLEGE
// =====================================================

router.post("/:userId/:collegeId", async (req, res) => {

    try {

        const user =
            await User.findById(req.params.userId);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        const college =
            await College.findById(req.params.collegeId);

        if (!college) {

            return res.status(404).json({
                message: "College not found"
            });

        }


        // Already saved?

        if (
            user.savedColleges.some(
                id => id.toString() === college._id.toString()
            )
        ) {

            return res.status(400).json({
                message: "College already saved"
            });

        }


        user.savedColleges.push(college._id);

        await user.save();


        res.status(200).json({
            message: "College saved successfully"
        });


    } catch (error) {

        console.error("Save college error:", error);

        res.status(500).json({
            message: "Failed to save college"
        });

    }

});


// =====================================================
// REMOVE SAVED COLLEGE
// =====================================================

router.delete("/:userId/:collegeId", async (req, res) => {

    try {

        const user =
            await User.findById(req.params.userId);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        user.savedColleges =
            user.savedColleges.filter(
                id =>
                    id.toString() !==
                    req.params.collegeId
            );


        await user.save();


        res.status(200).json({
            message: "College removed from saved colleges"
        });


    } catch (error) {

        console.error("Remove saved college error:", error);

        res.status(500).json({
            message: "Failed to remove college"
        });

    }

});


module.exports = router;