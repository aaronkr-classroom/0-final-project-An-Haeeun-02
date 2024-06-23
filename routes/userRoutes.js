// routes/userRoutes.js
"use strict";

/**
 * Listing 26.1 (p. 380)
 * @TODO: User 라우트의 userRoutes.js로의 이동
 */
const router = require("express").Router(),
  usersController = require("../controllers/usersController");

/**
 * Listing 23.2 (p. 335)
 * app.js로 로그인 라우트를 추가
 */
router.get("/login", usersController.setReferer, usersController.login); // 로그인 폼을 보기 위한 요청 처리
router.post(
  "/login",
  usersController.authenticate,
  usersController.redirectView
); // 로그인 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기

// Listing 24.7 후에 (p. 358)
router.get("/logout", usersController.logout, usersController.redirectView); // 로그아웃을 위한 라우트 추가

/**
 * Users
 */
router.get("/", usersController.index, usersController.indexView); // index 라우트 생성
router.get("/new", usersController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/create",
  usersController.validate, // Listing 23.6 (p. 344) - 사용자 생성 라우트에 유효성 체크 미들웨어 추가
  usersController.create,
  usersController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.edit); // viewing을 처리하기 위한 라우트 추가
router.put("/:id/update", usersController.update, usersController.redirectView); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/:id/delete",
  usersController.delete,
  usersController.redirectView
);

module.exports = router;
