// data/seedPapers.js
"use strict";

const mongoose = require("mongoose"),
  Course = require("../models/Papers");

// 데이터베이스 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/aaronkr", {
  useNewUrlParser: true,
});

mongoose.connection;

var papers = [
  {
    title: "Handwritten Hangul Grapheme Generation Using an ACGAN",
    subtitle: "", // Korean title OK
    authors: ["A.Snowberger", "C.H.Lee"],
    meta: {
      abstractOneLine: "",
      abstract: "",
      abstractAlt: "", // Korean abstract OK
      keywords: "",
    },
    published: {
      date: "May 2023",
      location: "Proceedings of the 2023 Spring Academic Conference",
      organization: "KIICE",
      event: "",
      pages: "",
    },
    links: {
      code: "",
      slides: "",
      paper: "",
    },
    paperImg: "",
    user: "",
  },
];

var commands = [];

// 1. Delete all previous data. / 이전 데이터 모두 삭제
// 2. Set a timeout to allow the database to be cleared. / 데이터베이스가 지워지는 것을 기다리기 위해 타임아웃 설정
// 3. Create a promise for each courses object. / 코스 객체마다 프라미스 생성.
// 4. Use Promise.all() to wait for all promises to resolve. / 모든 프라미스가 해결될 때까지 기다리기 위해 Promise.all() 사용.
// 5. Close the connection to the database. / 데이터베이스 연결 닫기.

Course.deleteMany({})
  .exec()
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} projects!`);
  });

setTimeout(() => {
  // 프라미스 생성을 위한 구독자 객체 루프
  papers.forEach((p) => {
    commands.push(
      Paper.create({
        title: p.title,
        description: p.description,
        price: p.price,
        paperImg: p.paperImg,
      }).then((paper) => {
        console.log(`Created paper: ${paper.title}`);
      })
    );
  });

  console.log(`${commands.length} commands created!`);

  Promise.all(commands)
    .then((r) => {
      console.log(JSON.stringify(r));
      mongoose.connection.close();
      console.log("Connection closed!");
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}, 500);
