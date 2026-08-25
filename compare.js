document.addEventListener("DOMContentLoaded", function () {

    const selectedContainer =
        document.getElementById("selectedColleges");

    const collegeList =
        document.getElementById("collegeList");

    const collegeMenu =
        document.getElementById("collegeMenu");

    const addCollegeBtn =
        document.getElementById("addCollegeBtn");

    const closeDrawer =
        document.getElementById("closeDrawer");

    const table =
        document.getElementById("comparisonTable");


    // =====================================================
    // ALL COLLEGES FROM BACKEND
    // =====================================================

    let colleges = [];

    let selectedColleges = [];


    // =====================================================
    // LOAD SELECTED COLLEGES FROM LOCAL STORAGE
    // =====================================================

    const saved =
        localStorage.getItem("compareColleges");

    if (saved) {

        try {

            selectedColleges =
                JSON.parse(saved);

            console.log(
                "COMPARE DATA FROM LOCAL STORAGE:",
                selectedColleges
            );

        } catch (error) {

            console.error(
                "LocalStorage error:",
                error
            );

            selectedColleges = [];

        }

    }


    // =====================================================
    // SAVE SELECTED COLLEGES
    // =====================================================

  function saveColleges() {

    localStorage.setItem(
        "compareColleges",
        JSON.stringify(selectedColleges)
    );

}


    // =====================================================
    // FETCH COLLEGES FROM BACKEND
    // =====================================================

    async function loadColleges() {

        try {

            console.log(
                "Fetching colleges from backend..."
            );

            const response =
                await fetch(
                    "http://localhost:5000/api/colleges"
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to fetch colleges"
                );

            }


            colleges =
                await response.json();


            console.log(
                "COLLEGES FROM MONGODB:",
                colleges
            );


            // If drawer is already open
            renderCollegeList();


        } catch (error) {

            console.error(
                "Error loading colleges:",
                error
            );


            collegeList.innerHTML = `
                <p style="padding: 15px;">
                    Failed to load colleges.
                    Please make sure the backend server is running.
                </p>
            `;

        }

    }


    // =====================================================
    // ADD COLLEGE BUTTON
    // =====================================================

    if (addCollegeBtn) {

        addCollegeBtn.addEventListener(
            "click",
            function () {

                collegeMenu.classList.toggle("show");

                renderCollegeList();

            }
        );

    }


    // =====================================================
    // CLOSE DRAWER
    // =====================================================

    if (closeDrawer) {

        closeDrawer.addEventListener(
            "click",
            function () {

                collegeMenu.classList.remove(
                    "show"
                );

            }
        );

    }


    // =====================================================
    // RENDER COLLEGE LIST
    // =====================================================

    function renderCollegeList() {

        if (!collegeList) return;


        collegeList.innerHTML = "";


        // Backend data not loaded yet
        if (colleges.length === 0) {

            collegeList.innerHTML = `
                <p style="padding: 15px;">
                    Loading colleges...
                </p>
            `;

            return;

        }


        colleges.forEach(
            function (college) {


                // Check whether already selected
                const exists =
                    selectedColleges.some(
                        function (selected) {

                            return (
                                selected.id === college._id ||
                                selected._id === college._id ||
                                selected.name === college.name
                            );

                        }
                    );


                const item =
                    document.createElement("div");

                item.className =
                    "college-menu-item";


                item.innerHTML = `

                    <span>
                        ${college.name || "-"}
                    </span>

                    <button
                        type="button"
                        ${exists ? "disabled" : ""}
                    >
                        ${exists ? "Added" : "Add"}
                    </button>

                `;


                const button =
                    item.querySelector("button");


                button.addEventListener(
                    "click",
                    function () {


                        // Maximum 3 colleges
                        if (
                            selectedColleges.length >= 3
                        ) {

                            alert(
                                "You can compare maximum 3 colleges."
                            );

                            return;

                        }


                        // Duplicate check
                        const alreadySelected =
                            selectedColleges.some(
                                function (selected) {

                                    return (
                                        selected.id === college._id ||
                                        selected._id === college._id ||
                                        selected.name === college.name
                                    );

                                }
                            );


                        if (alreadySelected) {

                            alert(
                                "This college is already added."
                            );

                            return;

                        }


                        // Convert MongoDB data
                        // into compare format
                        const collegeData =
                            formatCollegeData(
                                college
                            );

selectedColleges.push(
    collegeData
);

saveColleges();

collegeMenu.classList.remove(
    "show"
);

render();


// Save comparison history
if (selectedColleges.length >= 2) {

    saveComparisonHistory();

}

                    }
                );


                collegeList.appendChild(
                    item
                );

            }
        );

    }


    // =====================================================
    // FORMAT COLLEGE DATA
    // =====================================================

    function formatCollegeData(college) {

        return {

            id:
                college._id || "",

            name:
                college.name || "-",

            location:
                college.location || "-",

            branches:
                Array.isArray(college.branches)
                    ? college.branches.join(", ")
                    : college.branches || "-",

            fees:
                formatFees(
                    college.fees
                ),

            cutoff:
                college.cutoff || "-",

            rating:
                college.rating || "-",

            type:
                college.type || "-"

        };

    }


    // =====================================================
    // FORMAT FEES
    // =====================================================

    function formatFees(fees) {

        if (
            fees === undefined ||
            fees === null ||
            fees === ""
        ) {

            return "-";

        }


        // If fees is already formatted
        if (
            typeof fees === "string" &&
            fees.includes("₹")
        ) {

            return fees;

        }


        const numberFees =
            Number(fees);


        if (isNaN(numberFees)) {

            return fees;

        }


        return (
            "₹" +
            numberFees.toLocaleString(
                "en-IN"
            )
        );

    }


    // =====================================================
    // MAIN RENDER
    // =====================================================

    function render() {

        renderSelectedColleges();

        renderTable();

    }


    // =====================================================
    // SELECTED COLLEGE CARDS
    // =====================================================

    function renderSelectedColleges() {

        selectedContainer.innerHTML = "";


        selectedColleges.forEach(
            function (college, index) {


                const card =
                    document.createElement("div");

                card.className =
                    "selected-college";


                card.innerHTML = `

                    <div>

                        <h3>
                            ${college.name}
                        </h3>

                        <p>
                            ${college.location}
                        </p>

                    </div>

                    <button
                        type="button"
                        class="remove-college"
                    >
                        ×
                    </button>

                `;


                card
                    .querySelector(
                        ".remove-college"
                    )
                    .addEventListener(
                        "click",
                        function () {


                            selectedColleges.splice(
                                index,
                                1
                            );


                            saveColleges();


                            render();


                            // Refresh drawer buttons
                            renderCollegeList();

                        }
                    );


                selectedContainer.appendChild(
                    card
                );

            }
        );

    }


    // =====================================================
    // COMPARISON TABLE
    // =====================================================

    function renderTable() {

        table.innerHTML = "";


        // No colleges selected
        if (
            selectedColleges.length === 0
        ) {

            table.innerHTML = `

                <thead>

                    <tr>

                        <th>
                            Details
                        </th>

                    </tr>

                </thead>


                <tbody>

                    <tr>

                        <td>
                            Select a college to start comparison
                        </td>

                    </tr>

                </tbody>

            `;

            return;

        }


        // =================================================
        // TABLE HEADER
        // =================================================

        const thead =
            document.createElement("thead");


        const headerRow =
            document.createElement("tr");


        const detailHeader =
            document.createElement("th");


        detailHeader.innerText =
            "Details";


        headerRow.appendChild(
            detailHeader
        );


        selectedColleges.forEach(
            function (college) {


                const th =
                    document.createElement("th");


                th.innerText =
                    college.name;


                headerRow.appendChild(
                    th
                );

            }
        );


        thead.appendChild(
            headerRow
        );


        // =================================================
        // TABLE BODY
        // =================================================

        const tbody =
            document.createElement("tbody");


        createRow(
            tbody,
            "Location",
            "location"
        );


        createRow(
            tbody,
            "Branches",
            "branches"
        );


        createRow(
            tbody,
            "Fees",
            "fees"
        );


        createRow(
            tbody,
            "Cutoff",
            "cutoff"
        );


        createRow(
            tbody,
            "Rating",
            "rating"
        );


        createRow(
            tbody,
            "College Type",
            "type"
        );


        table.appendChild(
            thead
        );


        table.appendChild(
            tbody
        );

    }


    // =====================================================
    // CREATE TABLE ROW
    // =====================================================

    function createRow(
        tbody,
        label,
        property
    ) {


        const row =
            document.createElement("tr");


        const labelCell =
            document.createElement("td");


        labelCell.innerText =
            label;


        row.appendChild(
            labelCell
        );


        selectedColleges.forEach(
            function (college) {


                const cell =
                    document.createElement("td");


                cell.innerText =
                    college[property] || "-";


                row.appendChild(
                    cell
                );

            }
        );


        tbody.appendChild(
            row
        );

    }


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    render();


    // Load colleges from MongoDB
    loadColleges();

});

async function saveComparisonHistory() {

    const loggedInUser =
        JSON.parse(
            sessionStorage.getItem(
                "loggedInUser"
            )
        );


    // Login nahi hai
    if (!loggedInUser) {

        alert(
            "Please login to save comparison history."
        );

        return;

    }


    if (
        selectedColleges.length < 2
    ) {

        return;

    }


    try {

        const collegeIds =
            selectedColleges.map(
                college =>
                    college.id ||
                    college._id
            );


        const response =
            await fetch(
                "http://localhost:5000/api/comparisons",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        userId:
                            loggedInUser.id,

                        collegeIds:
                            collegeIds

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            console.error(
                "History save failed:",
                data
            );

            return;

        }


        console.log(
            "Comparison history saved:",
            data
        );


    } catch (error) {

        console.error(
            "Comparison history error:",
            error
        );

    }

}