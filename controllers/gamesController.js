// controllers/usersController.js
"use strict";

/**
 * Listing 18.11 (p. 271)
 * userController.js에서 인덱스 액션 생성과 index 액션의 재방문
 */
const 
  passport = require("passport"),
  httpStatus = require("http-status-codes"), // Lesson 27.3 HTTP 상태 코드 요청
  Game = require("../models/Game"); // 사용자 모델 요청
  
const getGameParams = (body) => {
  return {
    name: body.name,
    creater : body.creater ,
    type : body.type ,
    link : body.link 
  };
};

module.exports = {
  /**
   * Listing 28.1, 3 (p. 407, 410)
   * usersController.js에서 API 토큰의 검증을 위한 미들웨어 함수의 추가
   */
  verifyToken: (req, res, next) => {
    let token = req.query.apiToken; // 쿼리 매개변수로부터 API 토큰 수집
    console.log("Verifying: ", token);
    if (token) {
      Game.findOne({ apiToken: token }) // API 토큰을 사용해 사용자 찾기
        .then((user) => {
          if (user) {
            next(); // 토큰이 일치하면 next 미들웨어 호출
          } else {
            next(new Error("Invalid API token!")); // 일치하지 않으면 에러 메시지로 응답
          }
        })
        .catch((error) => {
          next(new Error(error.message)); // 에러 메시지로 응답
        });
    } else {
      next(new Error("No API token!")); // 일치하지 않으면 에러 메시지로 응답
    }
  },

  /**
   * Listing 28.4 (p. 413)
   * @TODO: usersController.js에서 API를 위한 로그인 액션 생성
   */
  apiAuthenticate: (req, res, next) => {
    passport.authenticate("local", (errors, game) => {
      if (game) {
        console.log("Houston, we have a user!", game);
        let signedToken = jsonWebToken.sign(
          {
            data: game._id,
            exp: new Date().setDate(new Date().getDate() + 1),
          },
          "secret_encoding_passphrase"
        ); // 사용자 ID와 만료 시간을 사용해 토큰 서명
        res.json({
          success: true,
          message: "Success authenticating user!",
        }); // 토큰을 JSON으로 응답
      } else {
        console.log("Houston, we have a problem!");
        res.json({
          success: false,
          message: "Could not authenticate user.",
        }); // 인증 실패 시 메시지로 응답
      }
    })(req, res, next);
  },

  /**
   * Listing 28.6 (p. 414-415)
   * userController.js에서 API를 위한 유효성 체크 액션 생성
   */
  verifyJWT: (req, res, next) => {
    let token = req.headers.token; // 헤더로부터 토큰 수집
    console.log(req.headers);
    if (token) {
      jsonWebToken.verify(
        token,
        "secret_encoding_passphrase",
        (errors, payload) => {
          if (payload) {
            Game.findById(payload.data).then((user) => {
              if (user) {
                next(); // 사용자가 존재하면 next 미들웨어 호출
              } else {
                res.status(httpStatus.FORBIDDEN).json({
                  error: true,
                  message: "No user account found.",
                }); // 사용자가 없으면 에러 메시지로 응답
              }
            });
          } else {
            res.status(httpStatus.UNAUTHORIZED).json({
              error: true,
              message: "Cannot verify API token.",
            }); // 토큰이 일치하지 않으면 에러 메시지로 응답
            next();
          }
        }
      );
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: true,
        message: "Provide Token.",
      }); // 토큰이 없으면 에러 메시지로 응답
    }
  },


  setReferer: (req, res, next) => {
    res.locals.redirect = req.headers.referer;
    next();
  },

  // local strategy로 사용자를 인증하기 위해 passport 호출
  authenticate: passport.authenticate("local", {
    // 성공, 실패의 플래시 메시지를 설정하고 사용자의 인중 상태에 따라 리디렉션할 경로를 지정한다
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successRedirect: "/chat",
    successFlash: "Logged in!",
  }), // passport의 authenticate 메소드를 사용해 사용자 인증

  /**
   * Listing 24.8 (p. 359)
   * usersController.js에서 logout 액션 추가
   */
  logout: (req, res, next) => {
    req.logout(() => {
      console.log("Logged out!");
    }); // passport의 logout 메소드를 사용해 사용자 로그아웃
    req.flash("success", "You have been logged out!"); // 로그아웃 성공 메시지
    res.locals.redirect = "/"; // 홈페이지로 리디렉션
    next();
  },

  index: (req, res, next) => {
    Game.find() // index 액션에서만 퀴리 실행
      .then((games) => {
        // 사용자 배열로 index 페이지 렌더링
        res.locals.games = games; // 응답상에서 사용자 데이터를 저장하고 다음 미들웨어 함수 호출
        next();
      })
      .catch((error) => {
        // 로그 메시지를 출력하고 홈페이지로 리디렉션
        console.log(`Error fetching users: ${error.message}`);
        next(error); // 에러를 캐치하고 다음 미들웨어로 전달
      });
  },
  indexView: (req, res) => {
    /*
     * Listing 26.3 (p. 384)
     * @TODO: userController.js에서 쿼리 매개변수가 존재할 때 JSON으로 응답하기
     */
    if (req.query.format === "json") {
      res.json(res.locals.game);
    } else {
      res.render("game/index", {
        page: "game",
        title: "All Game",
        // flashMessages: {
        //   // Listing 22.6 (p. 331) - 렌더링된 인덱스 뷰에서 플래시 메시지를 추가
        //   success: "Loaded all users!",
        // },
      }); // 분리된 액션으로 뷰 렌더링
    }
  },

  /**
   * 노트: 구독자 컨트롤러에서 index 액션이 getAllSubscribers를 대체한다. main.js에서 액션 관련
   * 라우트 index를 가리키도록 수정하고 subscribers.ejs를 index.ejs로 변경된 점을 기억하자. 이
   * 뷰는 views 폴더 아래 subscribers 폴더에 있어야 한다.
   */


  // 폼의 렌더링을 위한 새로운 액션 추가
  new: (req, res) => {
    res.render("game/new", {
      page: "new-game",
      title: "New Game",
    });
  },

  /**
   * Listing 22.3 (p. 328)
   * userController.js에서 create액션이 플래시 메시지를 추가
   *
   * [노트] 플래시 메시지를 임시로 저장하기 위해 요청 객체를 사용했지만, 응답에서의 로컬 변수와 이
   * 메시지들을 연결했기 때문에 메시지들은 결국 응답 객체로 연결된다.
   */
  create: (req, res, next) => {
    if (req.skip) next(); // 유효성 체크를 통과하지 못하면 다음 미들웨어 함수로 전달

    let newGame = new Game(getGameParams(req.body)); // Listing 22.3 (p. 328)

    /**
     * Listing 24.4 (p. 355)
     * usersController.js에서 create 액션에서의 새로운 사용자 등록
     * 원래 있는 코드는 다 지우고 아래 코드로 대체
     */
    Game.register(newGame, req.body.password, (error, game) => {
      // 새로운 사용자 등록
      if (game) {
        // 새로운 사용자가 등록되면
        req.flash(
          "success",
          `${game.fullName}'s account created successfully!`
        ); // 플래시 메시지를 추가하고
        res.locals.redirect = "/games"; // 사용자 인덱스 페이지로 리디렉션
        next();
      } else {
        // 새로운 사용자가 등록되지 않으면
        req.flash(
          "error",
          `Failed to create user account because: ${error.message}.`
        ); // 에러 메시지를 추가하고
        res.locals.redirect = "/games/new"; // 사용자 생성 페이지로 리디렉션
        next();
      }
    });
  },


  // 분리된 redirectView 액션에서 뷰 렌더링
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },

  /**
   * 노트: 구독자 컨트롤러에 new와 create 액션을 추가하는 것은 새로운 CRUD 액션을 맞춰
   * getAllSubscribers와 saveSubscriber 액션을 삭제할 수 있다는 의미다. 게다가 홈
   * 컨트롤러에서 할 것은 홈페이지인 index.ejs 제공밖에 없다.
   */

  /**
   * Listing 19.7 (p. 285)
   * userController.js에서 특정 사용자에 대한 show 액션 추가
   */
  show: (req, res, next) => {
    let gameId = req.params.id; // request params로부터 사용자 ID 수집
    Game.findById(gameId) // ID로 사용자 찾기
      .then((game) => {
        res.locals.game = game; // 응답 객체를 통해 다음 믿들웨어 함수로 사용자 전달
        next();
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error); // 에러를 로깅하고 다음 함수로 전달
      });
  },

  // show 뷰의 렌더링
  showView: (req, res) => {
    res.render("game/show", {
      page: "user-details",
      title: "User Details",
    });
  },

  /**
   * Listing 20.6 (p. 294)
   * edit와 update 액션 추가
   */
  // edit 액션 추가
  edit: (req, res, next) => {
    let gameId = req.params.id;
    Game.findById(gameId) // ID로 데이터베이스에서 게임을 찾기 위해 findById 사용
      .then((game) => {
        res.render("game/edit", {
          game: game, // 수정: user가 아닌 game으로 변수명 수정
          page: "edit-game",
          title: "Edit Game",
        }); // 데이터베이스에서 특정 게임을 위한 편집 페이지 렌더링
      })
      .catch((error) => {
        console.log(`Error fetching game by ID: ${error.message}`);
        next(error);
      });
  },

  // update 액션 추가
  update: (req, res, next) => {
    let gameId = req.params.id,
      gameParams = getGameParams(req.body);

    Game.findByIdAndUpdate(gameId, {
      $set: gameParams,
    }) //ID로 사용자를 찾아 단일 명령으로 레코드를 수정하기 위한 findByIdAndUpdate의 사용
      .then((game) => {
        res.locals.redirect = `/games/${gameId}`;
        res.locals.game = game;
        next(); // 지역 변수로서 응답하기 위해 사용자를 추가하고 다음 미들웨어 함수 호출
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },

  /**
   * Listing 20.9 (p. 298)
   * delete 액션의 추가
   */
  delete: (req, res, next) => {
    let gameId = req.params.id;
    Game.findByIdAndRemove(gameId) // findByIdAndRemove 메소드를 이용한 사용자 삭제
      .then(() => {
        res.locals.redirect = "/games";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  },
};
