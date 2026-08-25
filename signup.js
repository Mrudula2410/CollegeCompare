document.addEventListener("DOMContentLoaded", function () {

    const signupForm =
        document.getElementById("signupForm");

    const message =
        document.getElementById("signupMessage");


    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("signupName")
                    .value
                    .trim();

            const email =
                document.getElementById("signupEmail")
                    .value
                    .trim();

            const password =
                document.getElementById("signupPassword")
                    .value;

            const confirmPassword =
                document.getElementById("confirmPassword")
                    .value;


            // Check password
            if (password !== confirmPassword) {

                message.innerText =
                    "Passwords do not match.";

                return;
            }


            // Check existing account
            const existingUser =
                localStorage.getItem("user");


            if (existingUser) {

                const user =
                    JSON.parse(existingUser);


                if (user.email === email) {

                    message.innerText =
                        "Account already exists.";

                    return;
                }

            }


            // Create user
            const user = {

                name: name,

                email: email,

                password: password

            };


            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );


            message.innerText =
                "Account created successfully!";


            // Go to login
            setTimeout(function () {

                window.location.href =
                    "login.html";

            }, 800);

        }
    );

});