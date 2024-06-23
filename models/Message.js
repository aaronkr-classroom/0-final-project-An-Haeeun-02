// models/Message.js 파일을 열어서 다음을 확인하세요.
"use strict";

/**
 * Listing 31.9 (p. 458)
 * 메시지 스키마 생성
 */
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
