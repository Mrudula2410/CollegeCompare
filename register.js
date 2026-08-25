document.addEventListener(
    "DOMContentLoaded",
    function () {


        const registerForm =
            document.getElementById(
                "registerForm"
            );


        const registerMessage =
            document.getElementById(
                "registerMessage"
            );


        registerForm.addEventListener(
            "submit",
            async function (event) {


                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim();


                const password =
                    document
                        .getElementById("password")
                        .value;


                registerMessage.textContent =
                    "Creating account...";


                registerMessage.style.color =
                    "black";


                try {


                    const response =
                        await fetch(
                            "http://localhost:5000/api/users/register",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    name: name,
                                    email: email,
                                    password: password

                                })

                            }
                        );


                    const data =
                        await response.json();


                    if (!response.ok) {

                        registerMessage.textContent =
                            data.message ||
                            "Registration failed";

                        registerMessage.style.color =
                            "red";

                        return;

                    }


                    registerMessage.textContent =
                        "Registration successful!";

                    registerMessage.style.color =
                        "green";


                    setTimeout(
                        function () {

                            window.location.href =
                                "/html files/login.html";

                        },
                        1000
                    );


                } catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );


                    registerMessage.textContent =
                        "Unable to connect to server.";

                    registerMessage.style.color =
                        "red";

                }

            }
        );

    }
);