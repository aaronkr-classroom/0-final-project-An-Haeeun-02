// routes/apiRoutes.js
"use strict";

/**
 * Listing 27.1 (p. 392)
 * @TODO: apiRoutes.js에서 모든 강좌를 보기 위한 라우트 추가
 */
const router = require("express").Router(),
  coursesController = require("../controllers/coursesController"),
  usersController = require("../controllers/usersController"); // @TODO: Lesson 28.1

// router.use(usersController.verifyToken); // @TODO: Lesson 28.1
router.post("/login", usersController.apiAuthenticate); // @TODO: Lesson 28.3
router.use(usersController.verifyToken); // @TODO: Lesson 28.3

router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses, // @TODO: Listing 27.7 (p. 401)
  coursesController.respondJSON
);
router.get(
  "/courses/:id/join",
  coursesController.join,
  coursesController.respondJSON
);
router.use(coursesController.errorJSON);

module.exports = router;
