document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("loginForm");

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const loginMessage =
        document.getElementById("loginMessage");


    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            loginMessage.textContent =
                "Logging in...";

            loginMessage.style.color =
                "black";


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/users/login",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                email: email,

                                password: password

                            })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    loginMessage.textContent =
                        data.message ||
                        "Invalid email or password.";

                    loginMessage.style.color =
                        "red";

                    return;

                }


                // =================================
                // SAVE LOGIN INFORMATION
                // =================================

                sessionStorage.setItem(
                    "isLoggedIn",
                    "true"
                );


                sessionStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(data.user)
                );


                loginMessage.textContent =
                    "Login successful!";

                loginMessage.style.color =
                    "green";


                setTimeout(function () {

                    window.location.href =
                        "/html files/homepage.html";

                }, 800);


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                loginMessage.textContent =
                    "Unable to connect to server.";

                loginMessage.style.color =
                    "red";

            }

        }
    );

});

if (response.ok) {

    sessionStorage.setItem(
        "isLoggedIn",
        "true"
    );

    sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.user)
    );


    loginMessage.textContent =
        "Login successful!";

    loginMessage.style.color =
        "green";


    setTimeout(function () {

        window.location.href =
            "/html files/homepage.html";

    }, 800);

}