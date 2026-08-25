// ==========================================
// COLLEGE DATA
// ==========================================

const colleges = [

    {
        name: "College of Engineering Pune",
        keywords: [
            "coep",
            "college of engineering pune"
        ],
        detailsPage: "/clgDetails/html_files/coep.html"
    },

    {
        name: "Veermata Jijabai Technological Institute",
        keywords: [
            "vjti",
            "veermata jijabai",
            "vjti mumbai"
        ],
        detailsPage: "/clgDetails/html_files/VJTI.html"
    },

    {
        name: "Pune Institute of Computer Technology",
        keywords: [
            "pict",
            "pict pune",
            "pune institute of computer technology"
        ],
        detailsPage: "/clgDetails/html_files/PICT.html"
    },

    {
        name: "Walchand College of Engineering",
        keywords: [
            "walchand",
            "wce",
            "walchand college"
        ],
        detailsPage: "/clgDetails/html_files/Walchand.html"
    },

    {
        name: "MIT World Peace University",
        keywords: [
            "mit",
            "mit wpu",
            "mit world peace university"
        ],
        detailsPage: "/clgDetails/html_files/MIT.html"
    },

    {
        name: "Vishwakarma Institute of Technology",
        keywords: [
            "vit",
            "vit pune",
            "vishwakarma"
        ],
        detailsPage: "/clgDetails/html_files/VIT.html"
    },

    {
        name: "Pimpri Chinchwad College of Engineering",
        keywords: [
            "pccoe",
            "pimpri",
            "pimpri chinchwad"
        ],
        detailsPage: "/clgDetails/html_files/Pimpri.html"
    },

    {
        name: "AISSMS College of Engineering",
        keywords: [
            "aissms",
            "aissms college"
        ],
        detailsPage: "/clgDetails/html_files/AISSMS.html"
    },

    {
        name: "Dr. D. Y. Patil Institute of Technology",
        keywords: [
            "dy patil",
            "dypit",
            "d y patil"
        ],
        detailsPage: "/clgDetails/html_files/DY_Patil.html"
    },

    {
        name: "Sardar Patel Institute of Technology",
        keywords: [
            "spit",
            "sardar patel",
            "sardar patel institute"
        ],
        detailsPage: "/clgDetails/html_files/SPIT.html"
    },

    {
        name: "Shri Ramdeobaba College of Engineering",
        keywords: [
            "rcoem",
            "ramdeobaba",
            "ramdeobaba college"
        ],
        detailsPage: "/clgDetails/html_files/RCOEM.html"
    },

    {
        name: "Yeshwantrao Chavan College of Engineering",
        keywords: [
            "ycce",
            "yeshwantrao chavan",
            "ycce nagpur"
        ],
        detailsPage: "/clgDetails/html_files/YCCE.html"
    },

    {
        name: "K. K. Wagh Institute of Engineering Education",
        keywords: [
            "kk wagh",
            "k k wagh",
            "kkwagh"
        ],
        detailsPage: "/clgDetails/html_files/KK_Wagh.html"
    },

    {
        name: "Jawaharlal Nehru Engineering College",
        keywords: [
            "jnec",
            "jawaharlal nehru engineering"
        ],
        detailsPage: "/clgDetails/html_files/JNEC.html"
    },

    {
        name: "Kolhapur Institute of Technology",
        keywords: [
            "kit",
            "kit kolhapur",
            "kolhapur institute"
        ],
        detailsPage: "/clgDetails/html_files/KIT.html"
    }

];


// ==========================================
// ELEMENTS
// ==========================================

const searchInput =
    document.getElementById("homeCollegeSearch");

const searchBtn =
    document.getElementById("homeSearchBtn");

const compareBtn =
    document.getElementById("homeCompareBtn");

const suggestionsBox =
    document.getElementById("searchSuggestions");


// ==========================================
// FIND COLLEGE
// ==========================================

function findCollege(searchValue) {

    const search = searchValue.trim().toLowerCase();

    if (!search) {
        return null;
    }

    return colleges.find(college => {

        const nameMatch =
            college.name
                .toLowerCase()
                .includes(search);

        const keywordMatch =
            college.keywords.some(keyword =>
                keyword.toLowerCase().includes(search) ||
                search.includes(keyword.toLowerCase())
            );

        return nameMatch || keywordMatch;
    });
}


// ==========================================
// SEARCH COLLEGE BUTTON
// ==========================================

searchBtn.addEventListener("click", function () {

    const value = searchInput.value.trim();

    if (value === "") {

        alert("Please enter a college name.");

        searchInput.focus();

        return;
    }

    const college = findCollege(value);

    if (!college) {

        alert(
            "College not found. Please enter a valid college name."
        );

        return;
    }

    // Directly open college details page
    window.location.href = college.detailsPage;

});


// ==========================================
// COMPARE BUTTON
// ==========================================

compareBtn.addEventListener("click", function () {

    const value = searchInput.value.trim();

    if (value === "") {

        alert("Please enter a college name.");

        searchInput.focus();

        return;
    }

    const college = findCollege(value);

    if (!college) {

        alert(
            "College not found. Please enter a valid college name."
        );

        return;
    }

    // Send college name to comparison page
    const collegeName =
        encodeURIComponent(college.name);

    window.location.href =
        "/html files/collegecomparison.html?college" +
        collegeName;

});


// ==========================================
// SEARCH SUGGESTIONS
// ==========================================

searchInput.addEventListener("input", function () {

    const value =
        searchInput.value.trim().toLowerCase();

    suggestionsBox.innerHTML = "";

    if (!value) {

        suggestionsBox.style.display = "none";

        return;
    }

    const results = colleges
        .filter(college => {

            const nameMatch =
                college.name
                    .toLowerCase()
                    .includes(value);

            const keywordMatch =
                college.keywords.some(keyword =>
                    keyword.toLowerCase().includes(value)
                );

            return nameMatch || keywordMatch;

        })
        .slice(0, 5);


    if (results.length === 0) {

        suggestionsBox.style.display = "none";

        return;
    }


    results.forEach(college => {

        const suggestion =
            document.createElement("div");

        suggestion.classList.add(
            "suggestion-item"
        );

        suggestion.innerHTML = `
            <i class="fas fa-building"></i>
            <span>${college.name}</span>
        `;


        suggestion.addEventListener(
            "click",
            function () {

                searchInput.value =
                    college.name;

                suggestionsBox.style.display =
                    "none";

            }
        );


        suggestionsBox.appendChild(
            suggestion
        );

    });


    suggestionsBox.style.display = "block";

});


// ==========================================
// ENTER KEY
// ==========================================

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchBtn.click();

        }

    }
);


// ==========================================
// CLOSE SUGGESTIONS
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(".search-box")
        ) {

            suggestionsBox.style.display =
                "none";

        }

    }
);

