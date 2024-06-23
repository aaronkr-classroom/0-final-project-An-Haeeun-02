// routes/courseRoutes.js
"use strict";

/**
 * Listing 26.1 (p. 380)
 * @TODO: Course 라우트의 courseRoutes.js로의 이동
 */
const router = require("express").Router(),
  coursesController = require("../controllers/coursesController");

/**
 * Courses
 */
router.get("/", coursesController.index, coursesController.indexView); // index 라우트 생성
router.get("/new", coursesController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/create",
  coursesController.create,
  coursesController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/:id", coursesController.show, coursesController.showView);
router.get("/:id/edit", coursesController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/:id/update",
  coursesController.update,
  coursesController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/:id/delete",
  coursesController.delete,
  coursesController.redirectView
);

module.exports = router;
