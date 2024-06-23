// models/game.js
"use strict";

/**
 * Listing 17.2 (p. 242)
 * 구독자 스키마에 유효성 평가자 추가
 */
const mongoose = require("mongoose"),
  gameSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      creater: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
        enum: ['mode', 'retexture', 'expansion'], // enum 옵션 추가
      },
      link: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model("Game", gameSchema);
