// routes/talkRoutes.js
"use strict";

/**
 * Listing 26.1 (p. 380)
 * @TODO: Talk 라우트의 talkRoutes.js로의 이동
 */
const router = require("express").Router(),
  talksController = require("../controllers/talksController");

/**
 * Talks
 */
router.get("/", talksController.index, talksController.indexView); // index 라우트 생성
router.get("/new", talksController.new); // 생성 폼을 보기 위한 요청 처리
router.post("/create", talksController.create, talksController.redirectView); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/:id", talksController.show, talksController.showView);
router.get("/:id/edit", talksController.edit); // viewing을 처리하기 위한 라우트 추가
router.put("/:id/update", talksController.update, talksController.redirectView); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/:id/delete",
  talksController.delete,
  talksController.redirectView
);

module.exports = router;
