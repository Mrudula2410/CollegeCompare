document.addEventListener(
    "DOMContentLoaded",
    async function () {


        // =====================================================
        // GET LOGGED IN USER
        // =====================================================

        const loggedInUser =
            JSON.parse(
                sessionStorage.getItem(
                    "loggedInUser"
                )
            );


        const isLoggedIn =
            sessionStorage.getItem(
                "isLoggedIn"
            );


        // =====================================================
        // LOGIN CHECK
        // =====================================================

        if (
            isLoggedIn !== "true" ||
            !loggedInUser ||
            !loggedInUser.id
        ) {

            window.location.href =
                "/html files/login.html";

            return;

        }


        // =====================================================
        // USER INFORMATION
        // =====================================================

        const name =
            loggedInUser.name ||
            loggedInUser.username ||
            "User";


        const email =
            loggedInUser.email ||
            "No email available";


        document.getElementById(
            "profileName"
        ).innerText = name;


        document.getElementById(
            "profileEmail"
        ).innerText = email;


        document.getElementById(
            "infoName"
        ).innerText = name;


        document.getElementById(
            "infoEmail"
        ).innerText = email;



        // =====================================================
        // LOAD SAVED COLLEGES
        // =====================================================

        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/saved-colleges/${loggedInUser.id}`
                );


            const savedColleges =
                await response.json();


            if (response.ok) {

                document.getElementById(
                    "savedCount"
                ).innerText =
                    savedColleges.length;


                const preview =
                    document.getElementById(
                        "savedCollegePreview"
                    );


                preview.innerHTML = "";


                savedColleges
                    .slice(0, 3)
                    .forEach(
                        function (college) {

                            const div =
                                document.createElement(
                                    "div"
                                );


                            div.className =
                                "preview-college";


                            div.innerHTML = `

                                <i class="fa-solid fa-building-columns"></i>

                                &nbsp;

                                ${college.name}

                            `;


                            preview.appendChild(
                                div
                            );

                        }
                    );

            }


        } catch (error) {

            console.error(
                "Saved colleges error:",
                error
            );

        }



        // =====================================================
        // LOAD COMPARE HISTORY
        // =====================================================

        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/compare-history/${loggedInUser.id}`
                );


            const history =
                await response.json();


            if (response.ok) {

                document.getElementById(
                    "historyCount"
                ).innerText =
                    history.length;

            }

        } catch (error) {

            console.error(
                "Compare history error:",
                error
            );

        }



        // =====================================================
        // LOGOUT
        // =====================================================

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        logoutBtn.addEventListener(
            "click",
            function () {


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
);