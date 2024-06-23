// controllers/usersController.js
"use strict";

/**
 * Listing 18.11 (p. 271)
 * userController.js에서 인덱스 액션 생성과 index 액션의 재방문
 */
const game = require("../models/Game"); // 사용자 모델 요청

/**
 * [노트] getUserParams는 이전 캡스톤 프로젝트 (21장)에서 사용돼 왔다. 이 함수는 컨트롤러를 통해
 * 재사용돼 사용자 속성을 하나의 객체로 구성한다. 동일한 함수를 다른 모델 컨트롤러에도 구성해야 한다.
 */
const getGameParams = (body) => {
  return {
    name: body.name,
    creater : body.creater ,
    type : body.type ,
    link : body.link 
  };
};

module.exports = {
  index: (req, res, next) => {
    game.find() // index 액션에서만 퀴리 실행
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
    res.render("game/index", {
      page: "game",
      title: "All Users",
    }); // 분리된 액션으로 뷰 렌더링
  },

  /**
   * 노트: 구독자 컨트롤러에서 index 액션이 getAllSubscribers를 대체한다. main.js에서 액션 관련
   * 라우트 index를 가리키도록 수정하고 subscribers.ejs를 index.ejs로 변경된 점을 기억하자. 이
   * 뷰는 views 폴더 아래 subscribers 폴더에 있어야 한다.
   */

  /**
   * Listing 19.2 (p. 278)
   * userController.js에 액션 생성 추가
   */
  // 폼의 렌더링을 위한 새로운 액션 추가
  new: (req, res) => {
    res.render("game/new", {
      page: "new-game",
      title: "New game",
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
    let gameParams = getGameParams(req.body); // Listing 22.3 (p. 328)
    // 폼 파라미터로 사용자 생성
    game.create(gameParams)
      .then((game) => {
        req.flash(
          "success",
          `${game.name}'s account created successfully!`
        ); // Listing 22.3 (p. 328)
        res.locals.redirect = "/games";
        res.locals.game = game;
        next();
      })
      .catch((error) => {
        console.log(`Error saving user: ${error.message}`);
        res.locals.redirect = "/games/new";
        req.flash(
          "error",
          `Failed to create user account because: ${error.message}.`
        ); // Listing 22.3 (p. 328)
        next(error);
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
    game.findById(gameId) // ID로 사용자 찾기
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
    game.findById(gameId) // ID로 데이터베이스에서 사용자를 찾기 위한 findById 사용
      .then((game) => {
        res.render("game/edit", {
          game: game,
          page: "edit-user",
          title: "Edit User",
        }); // 데이터베이스에서 내 특정 사용자를 위한 편집 페이지 렌더링
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  // update 액션 추가
  update: (req, res, next) => {
    let gameId = req.params.id,
      // @TODO: getUserParams 사용 - Listing 22.3 (p. 328)
      gameParams = getGameParams(req.body);
    game.findByIdAndUpdate(gameId, {
      $set: gameParams,
    }) //ID로 사용자를 찾아 단일 명령으로 레코드를 수정하기 위한 findByIdAndUpdate의 사용
      .then((user) => {
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
    game.findByIdAndRemove(gameId) // findByIdAndRemove 메소드를 이용한 사용자 삭제
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