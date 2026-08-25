const mongoose = require("mongoose");

const College = require("./models/college");


// ===============================
// MONGODB CONNECTION
// ===============================

const MONGO_URI = "mongodb://127.0.0.1:27017/collegeCompare";


const colleges = [

    {
        name: "College of Engineering Pune",
        location: "Pune",
        branches: [
            "Computer Engineering",
            "Electrical Engineering",
            "Mechanical Engineering"
        ],
        fees: 135000,
        cutoff: 96,
        type: "Government",
        rating: 4.5,
        image: "/images/COEP.jpeg",
        description:
            "College of Engineering Pune is a government autonomous engineering college.",
        courses: [
            "Computer Engineering",
            "Electrical Engineering",
            "Mechanical Engineering"
        ],
        placement: {
            averagePackage: 1200000,
            highestPackage: 5000000,
            placementPercentage: 95
        },
        address: "Pune, Maharashtra"
    },


    {
        name: "Veermata Jijabai Technological Institute",
        location: "Mumbai",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        fees: 85000,
        cutoff: 98,
        type: "Government",
        rating: 4.6,
        image: "/images/VJTI.jpeg",
        description:
            "Veermata Jijabai Technological Institute is a leading engineering institute in Mumbai.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        placement: {
            averagePackage: 1500000,
            highestPackage: 6300000,
            placementPercentage: 96
        },
        address: "Mumbai, Maharashtra"
    },


    {
        name: "Pune Institute of Computer Technology",
        location: "Pune",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Electronics and Telecommunication"
        ],
        fees: 120000,
        cutoff: 95,
        type: "Private",
        rating: 4.4,
        image: "/images/PCIT.jpeg",
        description:
            "Pune Institute of Computer Technology is an engineering institute in Pune.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Electronics and Telecommunication"
        ],
        placement: {
            averagePackage: 900000,
            highestPackage: 3000000,
            placementPercentage: 92
        },
        address: "Pune, Maharashtra"
    },


    {
        name: "Walchand College of Engineering",
        location: "Sangli",
        branches: [
            "Computer Science and Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        fees: 100000,
        cutoff: 94,
        type: "Government",
        rating: 4.5,
        image: "",
        description:
            "Walchand College of Engineering is an autonomous engineering institute in Sangli.",
        courses: [
            "Computer Science and Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        placement: {
            averagePackage: 1000000,
            highestPackage: 4500000,
            placementPercentage: 94
        },
        address: "Sangli, Maharashtra"
    },


    {
        name: "MIT World Peace University",
        location: "Pune",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Artificial Intelligence"
        ],
        fees: 250000,
        cutoff: 85,
        type: "Private",
        rating: 4.3,
        image: "",
        description:
            "MIT World Peace University is a private university located in Pune.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Artificial Intelligence"
        ],
        placement: {
            averagePackage: 700000,
            highestPackage: 3000000,
            placementPercentage: 90
        },
        address: "Pune, Maharashtra"
    },


    {
        name: "Vishwakarma Institute of Technology",
        location: "Pune",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Electronics Engineering"
        ],
        fees: 180000,
        cutoff: 93,
        type: "Private",
        rating: 4.4,
        image: "",
        description:
            "Vishwakarma Institute of Technology is an autonomous engineering institute in Pune.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Electronics Engineering"
        ],
        placement: {
            averagePackage: 900000,
            highestPackage: 4500000,
            placementPercentage: 93
        },
        address: "Pune, Maharashtra"
    },


    {
        name: "Pimpri Chinchwad College of Engineering",
        location: "Pune",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Electronics and Telecommunication"
        ],
        fees: 150000,
        cutoff: 91,
        type: "Private",
        rating: 4.3,
        image: "",
        description:
            "Pimpri Chinchwad College of Engineering is an autonomous engineering college in Pune.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Electronics and Telecommunication"
        ],
        placement: {
            averagePackage: 800000,
            highestPackage: 3500000,
            placementPercentage: 90
        },
        address: "Pimpri-Chinchwad, Pune"
    },


    {
        name: "AISSMS College of Engineering",
        location: "Pune",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        fees: 120000,
        cutoff: 88,
        type: "Private",
        rating: 4.1,
        image: "",
        description:
            "AISSMS College of Engineering is an engineering college in Pune.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        placement: {
            averagePackage: 600000,
            highestPackage: 2500000,
            placementPercentage: 85
        },
        address: "Pune, Maharashtra"
    },


    {
        name: "Dr. D. Y. Patil Institute of Technology",
        location: "Pune",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Artificial Intelligence"
        ],
        fees: 140000,
        cutoff: 89,
        type: "Private",
        rating: 4.2,
        image: "",
        description:
            "Dr. D. Y. Patil Institute of Technology is an engineering institute in Pune.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Artificial Intelligence"
        ],
        placement: {
            averagePackage: 650000,
            highestPackage: 2500000,
            placementPercentage: 88
        },
        address: "Pune, Maharashtra"
    },


    {
        name: "Sardar Patel Institute of Technology",
        location: "Mumbai",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Electronics Engineering"
        ],
        fees: 140000,
        cutoff: 97,
        type: "Private",
        rating: 4.5,
        image: "",
        description:
            "Sardar Patel Institute of Technology is an engineering institute in Mumbai.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Electronics Engineering"
        ],
        placement: {
            averagePackage: 1200000,
            highestPackage: 5000000,
            placementPercentage: 95
        },
        address: "Mumbai, Maharashtra"
    },


    {
        name: "Shri Ramdeobaba College of Engineering",
        location: "Nagpur",
        branches: [
            "Computer Science and Engineering",
            "Information Technology",
            "Electronics Engineering"
        ],
        fees: 150000,
        cutoff: 92,
        type: "Private",
        rating: 4.4,
        image: "",
        description:
            "Shri Ramdeobaba College of Engineering is an engineering college in Nagpur.",
        courses: [
            "Computer Science and Engineering",
            "Information Technology",
            "Electronics Engineering"
        ],
        placement: {
            averagePackage: 800000,
            highestPackage: 3000000,
            placementPercentage: 90
        },
        address: "Nagpur, Maharashtra"
    },


    {
        name: "Yeshwantrao Chavan College of Engineering",
        location: "Nagpur",
        branches: [
            "Computer Science and Engineering",
            "Information Technology",
            "Artificial Intelligence"
        ],
        fees: 130000,
        cutoff: 90,
        type: "Private",
        rating: 4.3,
        image: "",
        description:
            "Yeshwantrao Chavan College of Engineering is an autonomous engineering college in Nagpur.",
        courses: [
            "Computer Science and Engineering",
            "Information Technology",
            "Artificial Intelligence"
        ],
        placement: {
            averagePackage: 700000,
            highestPackage: 2800000,
            placementPercentage: 88
        },
        address: "Nagpur, Maharashtra"
    },


    {
        name: "K. K. Wagh Institute of Engineering Education",
        location: "Nashik",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        fees: 125000,
        cutoff: 87,
        type: "Private",
        rating: 4.2,
        image: "",
        description:
            "K. K. Wagh Institute of Engineering Education is an engineering institute in Nashik.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        placement: {
            averagePackage: 600000,
            highestPackage: 2500000,
            placementPercentage: 85
        },
        address: "Nashik, Maharashtra"
    },


    {
        name: "Jawaharlal Nehru Engineering College",
        location: "Aurangabad",
        branches: [
            "Computer Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        fees: 110000,
        cutoff: 85,
        type: "Private",
        rating: 4.1,
        image: "",
        description:
            "Jawaharlal Nehru Engineering College is an engineering college in Aurangabad.",
        courses: [
            "Computer Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        placement: {
            averagePackage: 500000,
            highestPackage: 2000000,
            placementPercentage: 82
        },
        address: "Aurangabad, Maharashtra"
    },


    {
        name: "Kolhapur Institute of Technology",
        location: "Kolhapur",
        branches: [
            "Computer Science and Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        fees: 100000,
        cutoff: 84,
        type: "Private",
        rating: 4.0,
        image: "",
        description:
            "Kolhapur Institute of Technology is an engineering college in Kolhapur.",
        courses: [
            "Computer Science and Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        placement: {
            averagePackage: 500000,
            highestPackage: 1800000,
            placementPercentage: 80
        },
        address: "Kolhapur, Maharashtra"
    },

    {
        name: "Government College of Engineering, Nagpur",

    location: "Nagpur",
        branches: ["Computer Science and Engineering, Information Technology, Artificial Intelligence and Data Science, Electronics and Telecommunication, Mechanical Engineering, Civil Engineering",
        ],
        fees: 80000,
        cutoff: 85,
        type: "Government",
        rating: 4.0,
        image: "",
        description:
            "Government College of Engineering, Nagpur is an excellent government college in nagpur ",
        courses: [
            "Computer Science and Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        placement: {
            averagePackage: 500000,
            highestPackage: 1800000,
            placementPercentage: 80
        },
        address: "Nagpur, Maharashtra"
    },

        {
        name: "Government College of Engineering, Chhatrapati Sambhajinagar",

        location: "Chhatrapati Sambhajinagar",
        branches: [ "Computer Science and Engineering, Information Technology, Electronics and Telecommunication, Mechanical Engineering, Civil Engineering"
        ],
        fees: 75000,
        cutoff: 90,
        type: "Government",
        rating: 4.1,
        image: "",
        description:
            "Government College of Engineering, Chhatrapati Sambhajinagar is an excellent government college in Aurangabad ",
        courses: [
            "Computer Science and Engineering",
            "Information Technology",
            "Mechanical Engineering"
        ],
        placement: {
            averagePackage: 500000,
            highestPackage: 1800000,
            placementPercentage: 80
        },
        address: "Nagpur, Maharashtra"
    }
];


// ===============================
// INSERT DATA
// ===============================

async function seedDatabase() {

    try {

        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected");


        // Existing colleges delete
        await College.deleteMany({});

        console.log("Old college data deleted");


        // New colleges insert
        await College.insertMany(colleges);

        console.log("College data inserted successfully");


        await mongoose.connection.close();

        console.log("MongoDB connection closed");

    } catch (error) {

        console.error("Seed error:", error);

        process.exit(1);

    }

}


seedDatabase();