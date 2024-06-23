// routes/homeRoutes.js
"use strict";

/**
 * Listing 26.1 (p. 380)
 */
const router = require("express").Router(),
  pagesController = require("../controllers/pagesController");

/**
 * Home
 */
router.get("/", pagesController.showHome); // 홈 페이지 위한 라우트 추가
router.get("/about", pagesController.showAbout); // 코스 페이지 위한 라우트 추가
router.get("/transportation", pagesController.showTransportation); // 교통수단 페이지 위한 라우트 추가
router.get("/chat", pagesController.chat); // 채팅 페이지 위한 라우트 추가

module.exports = router;
