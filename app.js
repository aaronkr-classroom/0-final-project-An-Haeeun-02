// app.js
"use strict";

/**
 * =====================================================================
 * Define Express app and set it up
 * =====================================================================
 */

// modules
const express = require("express"), // express를 요청
  layouts = require("express-ejs-layouts"), // express-ejs-layout의 요청
  app = express(); // express 애플리케이션의 인스턴스화

// controllers 폴더의 파일을 요청
const pagesController = require("./controllers/pagesController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  coursesController = require("./controllers/coursesController"),
  talksController = require("./controllers/talksController"),
  trainsController = require("./controllers/trainsController"),
  errorController = require("./controllers/errorController"),
  gamesController = require("./controllers/gamesController")

/**
 * =====================================================================
 * Define Mongoose and MongoDB connection
 * =====================================================================
 */

// 애플리케이션에 Mongoose 설정
const mongoose = require("mongoose"); // mongoose를 요청

// 데이터베이스 연결 설정
mongoose.connect(
  "mongodb+srv://135ssg:8m6wl5LWOF5fnHKd@ut-node.lvbkpqv.mongodb.net/?retryWrites=true&w=majority&appName=ut-node", //Atils 경로
)
const db = mongoose.connection;
db.once("open",()=>{
  console.log("Connedted DB");
});

/**
 * =====================================================================
 * Define app settings and middleware
 * =====================================================================
 */

app.set("port", process.env.PORT || 3000);

// ejs 레이아웃 렌더링
app.set("view engine", "ejs"); // ejs를 사용하기 위한 애플리케이션 세팅
app.use(layouts); // layout 모듈 사용을 위한 애플리케이션 세팅
app.use(express.static("public"));

// body-parser의 추가
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * =====================================================================
 * Define routes
 * =====================================================================
 */

const router = express.Router(); // Express 라우터를 인스턴스화
app.use("/", router); // 라우터를 애플리케이션에 추가

/**
 * Pages
 */
router.get("/", pagesController.showHome); // 홈 페이지 위한 라우트 추가
router.get("/about", pagesController.showAbout); // 코스 페이지 위한 라우트 추가


/**
 * Subscribers
 */
router.get(
  "/subscribers",
  subscribersController.index,
  subscribersController.indexView
); // index 라우트 생성
router.get("/subscribers/new", subscribersController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get(
  "/subscribers/:id",
  subscribersController.show,
  subscribersController.showView
);
router.get("/subscribers/:id/edit", subscribersController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);

/**
 * Users
 */
router.get("/users", usersController.index, usersController.indexView); // index 라우트 생성
router.get("/users/new", usersController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

/**
 * Courses
 */
router.get("/courses", coursesController.index, coursesController.indexView); // index 라우트 생성
router.get("/courses/new", coursesController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/courses/create",
  coursesController.create,
  coursesController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/courses/:id/update",
  coursesController.update,
  coursesController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/courses/:id/delete",
  coursesController.delete,
  coursesController.redirectView
);

/**
 * Talks
 */
// router.get("/talks", talksController.index, talksController.indexView); // 모든 토크를 위한 라우트 추가
// router.get("/talk/:id", talksController.show, talksController.showView); // 특정 토크를 위한 라우트 추가
router.get("/talks", talksController.index, talksController.indexView); // index 라우트 생성
router.get("/talks/new", talksController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/talks/create",
  talksController.create,
  talksController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/talks/:id", talksController.show, talksController.showView);
router.get("/talks/:id/edit", talksController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/talks/:id/update",
  talksController.update,
  talksController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/talks/:id/delete",
  talksController.delete,
  talksController.redirectView
);

/**
 * Trains
 */
router.get("/trains", trainsController.index, trainsController.indexView); // index 라우트 생성
router.get("/trains/new", trainsController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/trains/create",
  trainsController.create,
  trainsController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/trains/:id", trainsController.show, trainsController.showView);
router.get("/trains/:id/edit", trainsController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/trains/:id/update",
  trainsController.update,
  trainsController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/trains/:id/delete",
  trainsController.delete,
  trainsController.redirectView
);

/**
 * Game
 */
router.get(
  "/games",
  gamesController.index,
  gamesController.indexView
); // index 라우트 생성
router.get("/games/new", gamesController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
  "/games/create",
  gamesController.create,
  gamesController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get(
  "/games/:id",
  gamesController.show,
  gamesController.showView
);
router.get("/games/:id/edit", gamesController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
  "/games/:id/update",
  gamesController.update,
  gamesController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
  "/games/:id/delete",
  gamesController.delete,
  gamesController.redirectView
);
/**
 * =====================================================================
 * Errors Handling & App Startup
 * =====================================================================
 */
app.use(errorController.resNotFound); // 미들웨어 함수로 에러 처리 추가
app.use(errorController.resInternalError);

app.listen(app.get("port"), () => {
  // 3000번 포트로 리스닝 설정
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
