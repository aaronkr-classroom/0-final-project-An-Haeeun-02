// models/Talk.js
"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  talkSchema = new Schema({
    meta: {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
      },
      abstractOneLine: {
        type: String,
      },
      abstract: {
        type: String,
      },
      keywords: {
        type: String,
      },
    },
    given: {
      date: {
        type: String,
      },
      location: {
        name: {
          type: String,
        },
        korean: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      organization: {
        name: {
          type: String,
        },
        korean: {
          type: String,
        },
        url: {
          type: String,
        },
      },
      event: {
        name: {
          type: String,
        },
        korean: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    },
    links: {
      code: {
        type: String,
      },
      slides: {
        type: String,
      },
      article: {
        type: String,
      },
    },
    talkImg: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  }, {
    timestamps: true,
  });

module.exports = mongoose.model("Talk", talkSchema);
