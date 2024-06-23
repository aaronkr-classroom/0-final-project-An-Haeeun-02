// routes/trainRoutes.js
"use strict";

/**
 * Listing 26.1 (p. 380)
 * @TODO: Train 라우트의 trainRoutes.js로의 이동
 */
const router = require("express").Router(),
  trainsController = require("../controllers/trainsController");

/**
 * Trains
 */
router.get("/", trainsController.index, trainsController.indexView); // index 라우트 생성
router.get("/new", trainsController.new); // 생성 폼을 보기 위한 요청 처리
router.post("/create", trainsController.create, trainsController.redirectView); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/:id", trainsController.show, trainsController.showView);
router.get("/:id/edit", trainsController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/:id/update",
  trainsController.update,
  trainsController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/:id/delete",
  trainsController.delete,
  trainsController.redirectView
);

module.exports = router;
