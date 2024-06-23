// models/User.js
"use strict";

// [노트] 이 라인은 사용자 모델의 등록 전에 위치해야 한다.
const passportLocalMongoose = require("passport-local-mongoose"); // passport-local-mongoose를 요청

/**
 * Listing 18.1 (p. 259)
 * user.js에서 사용자 모델 생성
 */

/**
 * [노트] Mongoose Schema 객체에서 객체 소멸(object destruct)의 사용에 주목하자.
 * {Schema}는 Mongoose의 Schema 객체를 동일한 이름의 상수로 할당한다. 나중에 이
 * 새로운 형식을 다른 모델에 적용할 것이다.
 */
const mongoose = require("mongoose"),
  { Schema } = mongoose,
  bcrypt = require("bcrypt"), // Lesson 23 - bcrypt 라이브러리를 요청
  Subscriber = require("./Subscriber"), // Lesson 23 - Subscriber 모델을 요청
  randToken = require("rand-token"), // Lesson 28.2 - rand-token 라이브러리를 요청
  userSchema = Schema(
    // 사용자 스키마 생성
    {
      apiToken: { type: String }, // @TODO: Lesson 28.1 API 토큰 속성 추가
      name: {
        // name 속성에 이름(first)과 성(last) 추가
        first: {
          type: String,
          trim: true,
        },
        last: {
          type: String,
          trim: true,
        },
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
      },
      username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
      courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // 사용자와 강좌를 연결 시켜주기 위한 강좌 속성 추가
      subscribedAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscriber", // subscribedAccount를 사용자와 구독자를 연결하기 위해 추가
      },
      profileImg: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true, // timestamps 속성을 추가해 createdAt 및 updatedAt 시간 기록
    }
  );

/**
 * Listing 24.3 (p. 353)
 * passport-local-mongoose 플러그인을 사용자 스키마에 추가
 */
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email", // 이메일 주소를 사용자 이름으로 사용
});

/**
 * Listing 18.2 (p. 260)
 * 사용자 모델에 가상 속성 추가
 */
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
}); // 사용자의 풀 네임을 얻기 위한 가상 속성 추가

/**
 * 노트: 이 책을 쓰는 시점에 Mongoose 메소드는 더 이상 의존하지 않는 어휘 this를
 * 사용하기 때문에 화살표 함수를 사용할 수 없다.
 */

// pre("save") 훅 설정
/**
 * 노트: save에서의 pre 훅은 사용자가 저장될 때마다 실행된다. 다시 말하먼 Mongoose의 save
 * 메소드를 통해 생성 또는 업데이트 후에 실행된다.
 */
userSchema.pre("save", function (next) {
  let user = this; // 콜백에서 함수 키워드 사용
  /**
   * Listing 28.2 (p. 408)
   * @TODO: user.js에서 API 토큰 생성을 위한 pre("save") 훅 생성
   */
  if (!user.apiToken) user.apiToken = randToken.generate(16); // 사용자의 API 토큰 생성

  /**
   * Listing 19.4 (p. 281)
   * user.js에 pre("save") 훅 추가
   */
  if (user.subscribedAccount === undefined) {
    // 기존 Subscriber 연결을 위한 조건 체크 추가
    Subscriber.findOne({
      email: user.email,
    }) // Single Subscriber를 위한 퀴리
      .then((subscriber) => {
        user.subscribedAccount = subscriber; // 사용자와 구독자 계정 연결
        next();
      })
      .catch((error) => {
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error); // 에러 발생 시 다음 미들웨어로 함수로 전달
      });
  } else {
    next(); // 이미 연결 존재 시 다음 미들웨어로 함수 호출
  }
});

module.exports = mongoose.model("User", userSchema);

/**
 * 노트: 이 책을 쓰는 시점에는 Mongoose 훅에서 화살표 함수는 작동하지 않는다.
 */
