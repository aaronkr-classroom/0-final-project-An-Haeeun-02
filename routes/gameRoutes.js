// routes/userRoutes.js
"use strict";

/**
 * Listing 26.1 (p. 380)
 * @TODO: User 라우트의 userRoutes.js로의 이동
 */
const router = require("express").Router(),
  gamesController = require("../controllers/gamesController");

/**
 * Game
 */
router.get("/", gamesController.index, gamesController.indexView);
router.get("/new", gamesController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/create",
  gamesController.create,
  gamesController.redirectView
); 
router.get("/:id", gamesController.show, gamesController.showView);
router.get("/:id/edit", gamesController.edit); 
router.put("/:id/update", gamesController.update, gamesController.redirectView); 
router.delete(
  "/:id/delete",
  gamesController.delete,
  gamesController.redirectView
);

module.exports = router;
