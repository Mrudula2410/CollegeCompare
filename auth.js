document.addEventListener("DOMContentLoaded", function () {

    const authButton =
        document.getElementById("authButton");

    if (!authButton) return;


    const isLoggedIn =
        sessionStorage.getItem("isLoggedIn") === "true";


    if (isLoggedIn) {

        // User logged in hai
        authButton.textContent = "Logout";

        authButton.onclick = function () {

            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("loggedInUser");

            window.location.href =
                "/html files/homepage.html";

        };

    } else {

        // User logged out hai
        authButton.textContent = "Login";

        authButton.onclick = function () {

            window.location.href =
                "/html files/login.html";

        };

    }

});