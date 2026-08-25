const collegeData = {

   name: "Kolhapur Institute of Technology",
    location: "Kolhapur",

    rating: "4.1",

    image: "/images/KIT",

    detailsUrl: "/clgDetails/html_files/KIT.html",

    branches: "Computer Science and Engineering, Information Technology, Electronics and Telecommunication, Mechanical Engineering, Civil Engineering",

    fees: "95000",

    cutoff: "80",

    type: "Private"

};


// =====================================================
// ADD TO COMPARE
// =====================================================

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

// =====================================================
// LOGIN
// =====================================================

function login() {

    window.location.href =
        "/html files/login.html";

}


// =====================================================
// GET SECTIONS
// =====================================================

let overview =
    document.getElementById("overview");

let courses =
    document.getElementById("courses");

let fees =
    document.getElementById("fees");

let cutoff =
    document.getElementById("cutoff");

let placements =
    document.getElementById("placements");

let facilities =
    document.getElementById("facilities");

let reviews =
    document.getElementById("reviews");


// =====================================================
// HIDE ALL
// =====================================================

function hideAll() {

    overview.style.display = "none";

    courses.style.display = "none";

    fees.style.display = "none";

    cutoff.style.display = "none";

    placements.style.display = "none";

    facilities.style.display = "none";

    reviews.style.display = "none";

}


// =====================================================
// SHOW SECTIONS
// =====================================================

function showOverview() {

    hideAll();

    overview.style.display = "block";

}


function showCourses() {

    hideAll();

    courses.style.display = "block";

}


function showFees() {

    hideAll();

    fees.style.display = "block";

}


function showCutoff() {

    hideAll();

    cutoff.style.display = "block";

}


function showPlacements() {

    hideAll();

    placements.style.display = "block";

}


function showFacilities() {

    hideAll();

    facilities.style.display = "block";

}


function showReviews() {

    hideAll();

    reviews.style.display = "block";

}


// =====================================================
// SAVE / UNSAVE COLLEGE
// =====================================================

async function saveCollege() {


    // =================================================
    // CHECK LOGIN
    // =================================================

    const loggedInUser =
        JSON.parse(
            sessionStorage.getItem("loggedInUser")
        );


    if (!loggedInUser) {

        alert(
            "Please login first to save colleges."
        );

        window.location.href =
            "/html files/login.html";

        return;

    }


    // =================================================
    // GET USER ID
    // =================================================

    const userId =
        loggedInUser.id;


    if (!userId) {

        alert(
            "User information not found. Please login again."
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


        if (!response.ok) {

            throw new Error(
                "Unable to fetch colleges"
            );

        }


        const colleges =
            await response.json();


        // Find AISSMS in MongoDB

        const college =
            colleges.find(function (item) {

                return (
                    item.name ===
                    collegeData.name
                );

            });


        // =================================================
        // COLLEGE NOT FOUND
        // =================================================

        if (!college) {

            alert(
                "College not found in database."
            );

            console.error(
                "AISSMS not found in MongoDB. Available colleges:",
                colleges
            );

            return;

        }


        const collegeId =
            college._id;


        // =================================================
        // CHECK CURRENT SAVE STATUS
        // =================================================

        const savedResponse =
            await fetch(
                "http://localhost:5000/api/saved-colleges/" +
                userId
            );


        if (!savedResponse.ok) {

            throw new Error(
                "Unable to check saved colleges"
            );

        }


        const savedColleges =
            await savedResponse.json();


        const alreadySaved =
            savedColleges.some(function (savedCollege) {

                return (
                    savedCollege._id ===
                    collegeId
                );

            });


        // =================================================
        // UNSAVE
        // =================================================

        if (alreadySaved) {

            const removeResponse =
                await fetch(
                    "http://localhost:5000/api/saved-colleges/" +
                    userId +
                    "/" +
                    collegeId,
                    {
                        method: "DELETE"
                    }
                );


            const removeData =
                await removeResponse.json();


            if (!removeResponse.ok) {

                alert(
                    removeData.message ||
                    "Unable to remove college."
                );

                return;

            }


            alert(
                "College removed from saved colleges."
            );


            updateSaveButton(false);

            return;

        }


        // =================================================
        // SAVE
        // =================================================

        const saveResponse =
            await fetch(
                "http://localhost:5000/api/saved-colleges/" +
                userId +
                "/" +
                collegeId,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );


        const saveData =
            await saveResponse.json();


        if (!saveResponse.ok) {

            alert(
                saveData.message ||
                "Unable to save college."
            );

            return;

        }


        alert(
            "College saved successfully!"
        );


        updateSaveButton(true);


    } catch (error) {

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

function updateSaveButton(isSaved) {

    const saveButton =
        document.querySelector(".save-btn");


    if (!saveButton) return;


    if (isSaved) {

        saveButton.innerText =
            "♥ Saved";

        saveButton.classList.add(
            "saved"
        );

    } else {

        saveButton.innerText =
            "♡ Save College";

        saveButton.classList.remove(
            "saved"
        );

    }

}


// =====================================================
// CHECK SAVE STATUS WHEN PAGE LOADS
// =====================================================

async function checkSaveStatus() {


    const loggedInUser =
        JSON.parse(
            sessionStorage.getItem("loggedInUser")
        );


    // User not logged in

    if (!loggedInUser) {

        updateSaveButton(false);

        return;

    }


    try {

        const response =
            await fetch(
                "http://localhost:5000/api/saved-colleges/" +
                loggedInUser.id
            );


        if (!response.ok) {

            return;

        }


        const savedColleges =
            await response.json();


        const alreadySaved =
            savedColleges.some(function (college) {

                return (
                    college.name ===
                    collegeData.name
                );

            });


        updateSaveButton(
            alreadySaved
        );


    } catch (error) {

        console.error(
            "Check save status error:",
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

        checkSaveStatus();

    }
);