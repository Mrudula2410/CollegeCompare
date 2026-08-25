



const collegeData = {

    name: "College of Engineering Pune",

    location: "Pune",

    rating: "4.5",

    image: "/images/COEP.jpeg",

    detailsUrl: "/clgDetails/html_files/coep.html",

    branches: "Computer Engineering, Information Technology, Mechanical Engineering, Electrical Engineering",

    fees: "₹1,35,000",

    cutoff: "96.5%",

    type: "Government"

};


/* ==============================
   ADD TO COMPARE
============================== */

async function addCompare() {

    const loggedInUser =
        JSON.parse(
            sessionStorage.getItem("loggedInUser")
        );


    // =================================================
    // LOGIN CHECK
    // =================================================

    if (!loggedInUser) {

        alert(
            "Please login first to use compare history."
        );

        window.location.href =
            "/html files/login.html";

        return;

    }


    // =================================================
    // CURRENT COMPARISON
    // =================================================

    let compareColleges =
        JSON.parse(
            localStorage.getItem("compareColleges")
        ) || [];


    const alreadyAdded =
        compareColleges.some(
            college =>
                college.name === collegeData.name
        );


    if (alreadyAdded) {

        alert(
            "This college is already added to comparison!"
        );

        return;

    }


    if (compareColleges.length >= 3) {

        alert(
            "You can compare maximum 3 colleges!"
        );

        return;

    }


    // =================================================
    // GET COLLEGE FROM MONGODB
    // =================================================

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/colleges"
            );


        const colleges =
            await response.json();


        const college =
            colleges.find(
                c =>
                    c.name.trim().toLowerCase() ===
                    collegeData.name.trim().toLowerCase()
            );


        if (!college) {

            alert(
                "College not found in database."
            );

            return;

        }


        // =================================================
        // SAVE TO CURRENT COMPARISON
        // =================================================

        compareColleges.push(
            collegeData
        );


        localStorage.setItem(
            "compareColleges",
            JSON.stringify(compareColleges)
        );


        // =================================================
        // SAVE TO MONGODB COMPARE HISTORY
        // =================================================

        const historyResponse =
            await fetch(
                `http://localhost:5000/api/compare-history/${loggedInUser.id}/${college._id}`,
                {
                    method: "POST"
                }
            );


        if (!historyResponse.ok) {

            console.error(
                "Failed to save compare history"
            );

        }


        alert(
            collegeData.name +
            " added to comparison!"
        );


    } catch (error) {

        console.error(
            "Compare error:",
            error
        );

        alert(
            "Unable to connect to server."
        );

    }

}

/* ==============================
   LOGIN BUTTON
============================== */

function login() {

    alert("Login page will open here.");

}



/* ==============================
   TAB BUTTONS
============================== */

let overview = document.getElementById("overview");

let courses = document.getElementById("courses");

let fees = document.getElementById("fees");

let cutoff = document.getElementById("cutoff");

let placements = document.getElementById("placements");

let facilities = document.getElementById("facilities");

let reviews = document.getElementById("reviews");



/* Hide all sections */

function hideAll() {

    overview.style.display = "none";

    courses.style.display = "none";

    fees.style.display = "none";

    cutoff.style.display = "none";

    placements.style.display = "none";

    facilities.style.display = "none";

    reviews.style.display = "none";

}



/* ==============================
   OVERVIEW
============================== */

function showOverview() {

    hideAll();

    overview.style.display = "block";

}



/* ==============================
   COURSES
============================== */

function showCourses() {

    hideAll();

    courses.style.display = "block";

}



/* ==============================
   FEES
============================== */

function showFees() {

    hideAll();

    fees.style.display = "block";

}



/* ==============================
   CUTOFF
============================== */

function showCutoff() {

    hideAll();

    cutoff.style.display = "block";

}



/* ==============================
   PLACEMENTS
============================== */

function showPlacements() {

    hideAll();

    placements.style.display = "block";

}



/* ==============================
   FACILITIES
============================== */

function showFacilities() {

    hideAll();

    facilities.style.display = "block";

}



/* ==============================
   REVIEWS
============================== */

function showReviews() {

    hideAll();

    reviews.style.display = "block";

}

// =====================================================
// COEP DETAILS PAGE
// =====================================================





// =====================================================
// SAVE / UNSAVE COLLEGE
// =====================================================

// =====================================================
// SAVE / UNSAVE COLLEGE - MONGODB
// =====================================================

async function saveCollege() {

    const loggedInUser =
        JSON.parse(
            sessionStorage.getItem("loggedInUser")
        );


    // =================================================
    // LOGIN CHECK
    // =================================================

    if (!loggedInUser) {

        alert("Please login to save colleges.");

        window.location.href =
            "/html files/login.html";

        return;

    }


    // =================================================
    // GET COLLEGE FROM MONGODB
    // =================================================

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/colleges"
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch colleges"
            );

        }


        const colleges =
            await response.json();


        // Find current college using its name

        const college =
            colleges.find(
                c =>
                    c.name.trim().toLowerCase() ===
                    collegeData.name.trim().toLowerCase()
            );


        if (!college) {

            alert("College not found in database.");

            console.error(
                "College searched:",
                collegeData.name
            );

            console.log(
                "Colleges received from MongoDB:",
                colleges
            );

            return;

        }


        // =================================================
        // GET USER'S SAVED COLLEGES
        // =================================================

        const savedResponse =
            await fetch(
                `http://localhost:5000/api/saved-colleges/${loggedInUser.id}`
            );


        if (!savedResponse.ok) {

            throw new Error(
                "Failed to fetch saved colleges"
            );

        }


        const savedColleges =
            await savedResponse.json();


        // =================================================
        // CHECK IF ALREADY SAVED
        // =================================================

        const alreadySaved =
            savedColleges.some(
                c =>
                    c._id.toString() ===
                    college._id.toString()
            );


        // =================================================
        // UNSAVE
        // =================================================

        if (alreadySaved) {

            const deleteResponse =
                await fetch(
                    `http://localhost:5000/api/saved-colleges/${loggedInUser.id}/${college._id}`,
                    {
                        method: "DELETE"
                    }
                );


            if (!deleteResponse.ok) {

                const data =
                    await deleteResponse.json();

                alert(
                    data.message ||
                    "Failed to remove college."
                );

                return;

            }


            alert(
                "College removed from saved colleges."
            );

        }


        // =================================================
        // SAVE
        // =================================================

        else {

            const saveResponse =
                await fetch(
                    `http://localhost:5000/api/saved-colleges/${loggedInUser.id}/${college._id}`,
                    {
                        method: "POST"
                    }
                );


            const data =
                await saveResponse.json();


            if (!saveResponse.ok) {

                alert(
                    data.message ||
                    "Failed to save college."
                );

                return;

            }


            alert(
                "College saved successfully!"
            );

        }


        // Update heart button

        updateSaveButton();

    }


    catch (error) {

        console.error(
            "Save college error:",
            error
        );

        alert(
            "Unable to connect to server."
        );

    }

}


// =====================================================
// UPDATE SAVE BUTTON
// =====================================================

async function updateSaveButton() {

    const saveButton =
        document.querySelector(".save-btn");


    if (!saveButton) return;


    const loggedInUser =
        JSON.parse(
            sessionStorage.getItem("loggedInUser")
        );


    // Not logged in

    if (!loggedInUser) {

        saveButton.innerText =
            "♡ Save College";

        saveButton.classList.remove(
            "saved"
        );

        return;

    }


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/saved-colleges/${loggedInUser.id}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch saved colleges"
            );

        }


        const savedColleges =
            await response.json();


        const alreadySaved =
            savedColleges.some(
                college =>
                    college.name.trim().toLowerCase() ===
                    collegeData.name.trim().toLowerCase()
            );


        if (alreadySaved) {

            saveButton.innerText =
                "♥ Saved";

            saveButton.classList.add(
                "saved"
            );

        }


        else {

            saveButton.innerText =
                "♡ Save College";

            saveButton.classList.remove(
                "saved"
            );

        }

    }


    catch (error) {

        console.error(
            "Update save button error:",
            error
        );

    }

}


// =====================================================
// INITIAL LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateSaveButton();

    }
);