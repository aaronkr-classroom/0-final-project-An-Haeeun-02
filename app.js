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
  router = require("./routes/index"), // 라우터를 요청 (@TODO: Lesson 26)
  app = express(); // express 애플리케이션의 인스턴스화

// @TODO: Lesson 26: controllers 파일의 요청 삭제

const methodOverride = require("method-override"); // method-override 미들웨어를 요청
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
); // method-override 미들웨어를 사용

/**
 * =====================================================================
 * Flash Messages and Session
 * =====================================================================
 */
/**
 * Listing 22.1 (p. 325)
 * app.js에서의 플래시 메시지 요청
 */
const expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  expressValidator = require("express-validator"); // Lesson 23 - express-validator 미들웨어를 요청

app.use(cookieParser("secret_passcode")); // cookie-parser 미들웨어를 사용하고 비밀 키를 전달
app.use(
  expressSession({
    // express-session 미들웨어를 사용
    secret: "secret_passcode", // 비밀 키를 전달
    cookie: {
      maxAge: 4000000, // 쿠키의 유효 기간을 설정
    },
    resave: false, // 세션을 매번 재저장하지 않도록 설정
    saveUninitialized: false, // 초기화되지 않은 세션을 저장하지 않도록 설정
  })
);
app.use(connectFlash()); // connect-flash 미들웨어를 사용

/**
 * =====================================================================
 * Passport Configuration and Middleware
 * =====================================================================
 */
/**
 * Listing 24.1 (p. 351)
 * main.js에서 passport의 요청과 초기화
 */
const passport = require("passport"); // passport를 요청
app.use(passport.initialize()); // passport를 초기화
app.use(passport.session()); // passport가 Express.js 내 세션을 사용하도록 설정

/**
 * Listing 24.2 (p. 351)
 * main.js에서 passport 직렬화 설정
 */
const User = require("./models/User"); // User 모델을 요청
passport.use(User.createStrategy()); // User 모델의 인증 전략을 passport에 전달
passport.serializeUser(User.serializeUser()); // User 모델의 직렬화 메서드를 passport에 전달
passport.deserializeUser(User.deserializeUser()); // User 모델의 역직렬화 메서드를 passport에 전달

/**
 * Listing 22.2 (p. 327)
 * 응답상에서 connectFlash와 미들웨어와의 연계
 */
app.use((req, res, next) => {
  // 응답 객체상에서 플래시 메시지의 로컬 flashMessages로의 할당
  res.locals.flashMessages = req.flash(); // flash 메시지를 뷰에서 사용할 수 있도록 설정

  /**
   * Listing 24.7 (p. 358)
   * 사용자 정의 미들웨어로 로컬 변수 추가
   */
  res.locals.loggedIn = req.isAuthenticated(); // 로그인 여부를 확인하는 불리언 값을 로컬 변수에 추가
  res.locals.currentUser = req.user; // 현재 사용자를 로컬 변수에 추가
  next();
});

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

// express-validator의 추가
app.use(expressValidator());

// @TODO: Lesson 26. 순서가 중요하다. 라우트가 먼저 오면 미들웨어가 먼저 실행된다.
// 그래서 래이아웃을 먼저 설정하고 라우트를 설정해야 한다.
app.use("/", router); // 라우터를 애플리케이션에 추가

/**
 * =====================================================================
 * Define routes
 * =====================================================================
 */

/**
 * Pages
 */
/** @TODO: Home (Pages) 라우트의 homeRoutes.js로의 이동 */

/** @TODO: User 라우트의 userRoutes.js로의 이동 */

/** @TODO: Subscriber 라우트의 subscriberRoutes.js로의 이동 */

/** @TODO: Course 라우트의 courseRoutes.js로의 이동 */

/** @TODO: Train 라우트의 trainRoutes.js로의 이동 */

/** @TODO: Talk 라우트의 talkRoutes.js로의 이동 */

/** @TODO: Research 라우트의 researchRoutes.js로의 이동 */

/** @TODO: Research 라우트의 researchRoutes.js로의 이동 */

/**
 * =====================================================================
 * App Startup
 * =====================================================================
 */

/**
 * Listing 30.3 (p. 444)
 * app.js에서 서버 io 객체 추가
 */
const server = app.listen(app.get("port"), () => {
    // 3000번 포트로 리스닝 설정
    console.log(`Server running at http://localhost:${app.get("port")}`);
  }),
  io = require("socket.io")(server); // socket.io를 사용하기 위한 서버 객체 설정
require("./controllers/chatController")(io); // 채팅 컨트롤러를 요청하고 서버 객체를 전달