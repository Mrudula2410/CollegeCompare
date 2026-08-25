document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // ELEMENTS
    // =====================================================

    const collegeContainer =
        document.getElementById("savedCollegesContainer");

    const comparisonContainer =
        document.querySelector(".comparison-box");


    // =====================================================
    // GET LOGGED IN USER
    // =====================================================

    const loggedInUser =
        JSON.parse(
            sessionStorage.getItem("loggedInUser")
        );

    const isLoggedIn =
        sessionStorage.getItem("isLoggedIn");


    // =====================================================
    // LOGIN CHECK
    // =====================================================

    if (
        isLoggedIn !== "true" ||
        !loggedInUser ||
        !loggedInUser.id
    ) {

        if (collegeContainer) {

            collegeContainer.innerHTML = `

                <div class="no-saved">

                    <i class="fa-regular fa-user"></i>

                    <h3>
                        Please login to view your dashboard
                    </h3>

                    <p>
                        Login to save colleges and view
                        your comparison history.
                    </p>

                    <a href="/html files/login.html">
                        Login
                    </a>

                </div>

            `;

        }


        if (comparisonContainer) {

            comparisonContainer.innerHTML = `

                <div class="no-saved">

                    <h3>
                        Login required
                    </h3>

                    <p>
                        Your comparison history will appear here
                        after login.
                    </p>

                </div>

            `;

        }

        return;

    }


    // =====================================================
    // COLLEGE PAGE MAPPING
    // =====================================================

    const collegePages = {

        "college of engineering pune coep":
            "/clgDetails/html_files/coep.html",

        "college of engineering pune":
            "/clgDetails/html_files/coep.html",

        "veermata jijabai technological institute":
            "/clgDetails/html_files/VJTI.html",

        "veermata jijabai technological institute vjti":
            "/clgDetails/html_files/VJTI.html",

        "pune institute of computer technology":
            "/clgDetails/html_files/PICT.html",

        "pune institute of computer technology pict":
            "/clgDetails/html_files/PICT.html",

        "government college of engineering nagpur":
            "/clgDetails/html_files/GCOEN.html",

        "government college of engineering nagpur gcoen":
            "/clgDetails/html_files/GCOEN.html",

        "walchand college of engineering":
            "/clgDetails/html_files/Walchand.html",

        "government college of engineering aurangabad":
            "/clgDetails/html_files/GECA.html",

        "mit world peace university":
            "/clgDetails/html_files/MIT.html",

        "vishwakarma institute of technology":
            "/clgDetails/html_files/VIT.html",

        "vishwakarma institute of technology vit":
            "/clgDetails/html_files/VIT.html",

        "pimpri chinchwad college of engineering":
            "/clgDetails/html_files/Pimpri.html",

        "pimpri chinchwad college of engineering pccoe":
            "/clgDetails/html_files/Pimpri.html",

        "aissms college of engineering":
            "/clgDetails/html_files/AISSMS.html",

        "dr d y patil institute of technology":
            "/clgDetails/html_files/DY_Patil.html",

        "sardar patel institute of technology":
            "/clgDetails/html_files/SPIT.html",

        "sardar patel institute of technology spit":
            "/clgDetails/html_files/SPIT.html",

        "shri ramdeobaba college of engineering":
            "/clgDetails/html_files/RCOEM.html",

        "shri ramdeobaba college of engineering rcoem":
            "/clgDetails/html_files/RCOEM.html",

        "yeshwantrao chavan college of engineering":
            "/clgDetails/html_files/YCCE.html",

        "yeshwantrao chavan college of engineering ycce":
            "/clgDetails/html_files/YCCE.html",

        "k k wagh institute of engineering education":
            "/clgDetails/html_files/KK_Wagh.html",

        "jawaharlal nehru engineering college":
            "/clgDetails/html_files/JNEC.html",

        "kolhapur institute of technology":
            "/clgDetails/html_files/KIT.html"
    };


    // =====================================================
    // GET INDIVIDUAL COLLEGE PAGE
    // =====================================================

    function getCollegeDetailsUrl(college) {

        const collegeName =
            (college.name || "")
                .trim()
                .toLowerCase();


        const page =
            collegePages[collegeName];


        if (page) {

            return page;

        }


        // If exact name doesn't match,
        // try partial matching

        for (
            const name in collegePages
        ) {

            if (
                collegeName.includes(name) ||
                name.includes(collegeName)
            ) {

                return collegePages[name];

            }

        }


        // No page found

        return null;

    }


    // =====================================================
    // LOAD SAVED COLLEGES
    // =====================================================

    async function loadSavedColleges() {

        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/saved-colleges/${loggedInUser.id}`
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to load saved colleges"
                );

            }


            const savedColleges =
                await response.json();


            renderSavedColleges(
                savedColleges
            );


        } catch (error) {

            console.error(
                "Saved colleges error:",
                error
            );


            if (collegeContainer) {

                collegeContainer.innerHTML = `

                    <div class="no-saved">

                        <h3>
                            Unable to load saved colleges
                        </h3>

                        <p>
                            Please try again later.
                        </p>

                    </div>

                `;

            }

        }

    }


    // =====================================================
    // RENDER SAVED COLLEGES
    // =====================================================

    function renderSavedColleges(
        savedColleges
    ) {

        if (!collegeContainer) return;


        collegeContainer.innerHTML = "";


        // =================================================
        // NO SAVED COLLEGES
        // =================================================

        if (
            !savedColleges ||
            savedColleges.length === 0
        ) {

            collegeContainer.innerHTML = `

                <div class="no-saved">

                    <i class="fa-regular fa-heart"></i>

                    <h3>
                        No saved colleges yet
                    </h3>

                    <p>
                        Save colleges from their details page
                        and they will appear here.
                    </p>

                </div>

            `;

            return;

        }


        // =================================================
        // CREATE COLLEGE CARDS
        // =================================================

        savedColleges.forEach(
            function (college) {

                const card =
                    document.createElement("div");


                card.className =
                    "college-card";


                // =================================================
                // GET INDIVIDUAL DETAILS PAGE
                // =================================================

                const detailsUrl =
                    getCollegeDetailsUrl(
                        college
                    );


                // =================================================
                // VIEW DETAILS BUTTON
                // =================================================

                let viewDetailsHTML;


                if (detailsUrl) {

                    viewDetailsHTML = `

                        <a
                            href="${detailsUrl}"
                            class="view-details-btn"
                        >
                            View Details
                        </a>

                    `;

                } else {

                    viewDetailsHTML = `

                        <button
                            class="view-details-btn details-not-found"
                            type="button"
                        >
                            View Details
                        </button>

                    `;

                }


                // =================================================
                // CARD HTML
                // =================================================

                card.innerHTML = `

                    <div class="college-icon">

                        <i class="fa-solid fa-building-columns"></i>

                    </div>


                    <i
                        class="fa-solid fa-heart heart saved-heart"
                        title="Remove from saved"
                    ></i>


                    <h3>
                        ${college.name}
                    </h3>


                    <p>
                        ${college.location || ""}
                    </p>


                    <span class="rating">

                        <i class="fa-solid fa-star"></i>

                        ${college.rating || "-"}

                    </span>


                    ${viewDetailsHTML}

                `;


                // =================================================
                // UNSAVE COLLEGE
                // =================================================

                const heart =
                    card.querySelector(
                        ".heart"
                    );


                if (heart) {

                    heart.addEventListener(
                        "click",
                        async function () {

                            try {

                                const response =
                                    await fetch(
                                        `http://localhost:5000/api/saved-colleges/${loggedInUser.id}/${college._id}`,
                                        {
                                            method: "DELETE"
                                        }
                                    );


                                if (!response.ok) {

                                    throw new Error(
                                        "Failed to remove college"
                                    );

                                }


                                // Reload saved colleges

                                await loadSavedColleges();


                            } catch (error) {

                                console.error(
                                    "Unsave error:",
                                    error
                                );

                            }

                        }
                    );

                }


                // =================================================
                // ADD CARD
                // =================================================

                collegeContainer.appendChild(
                    card
                );

            }
        );

    }


    // =====================================================
    // LOAD COMPARISON HISTORY
    // =====================================================

    async function loadComparisonHistory() {

        // Currently no comparison API
        // Keep this function so dashboard does not throw error.

        if (!comparisonContainer) {
            return;
        }

        // If you have comparison API later,
        // we can connect it here.
    }


    // =====================================================
    // LOGOUT
    // =====================================================

    const logoutButton =
        document.getElementById("logoutBtn");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                sessionStorage.removeItem(
                    "isLoggedIn"
                );


                sessionStorage.removeItem(
                    "loggedInUser"
                );


                localStorage.removeItem(
                    "compareColleges"
                );


                window.location.href =
                    "/html files/homepage.html";

            }
        );

    }


    // =====================================================
    // START DASHBOARD
    // =====================================================

    loadSavedColleges();

    loadComparisonHistory();

});