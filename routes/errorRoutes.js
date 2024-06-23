// routes/errorRoutes.js
"use strict";

/**
 * Listing 26.1 (p. 380)
 */
const router = require("express").Router(),
  errorController = require("../controllers/errorController");

/**
 * Error
 */
router.use(errorController.logErrors); // 미들웨어 함수로 에러 처리 추가
router.use(errorController.resNotFound); // 미들웨어 함수로 에러 처리 추가
router.use(errorController.resInternalError);

module.exports = router;
