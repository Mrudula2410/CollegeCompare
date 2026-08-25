const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    branches: [
      {
        type: String,
        trim: true
      }
    ],

    fees: {
      type: Number,
      required: true
    },

    cutoff: {
      type: Number,
      required: true
    },

    type: {
      type: String,
      enum: ["Government", "Private", "Autonomous"],
      required: true
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    image: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    },

    courses: [
      {
        type: String,
        trim: true
      }
    ],

    placement: {
      averagePackage: {
        type: Number,
        default: 0
      },

      highestPackage: {
        type: Number,
        default: 0
      },

      placementPercentage: {
        type: Number,
        default: 0
      }
    },

    address: {
      type: String,
      default: ""
    },

    website: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("College", collegeSchema);