
"use strict";

/**
 * Listing 15.9 (p. 224)
 */
const mongoose = require("mongoose"),
  Game = require("../models/Game");

// 데이터베이스 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/ut-nodejs", {
  useNewUrlParser: true,
});

mongoose.connection;

var games = [
  {
    name: "모드",
    creater :"나",
    type : "mode",
    link : "https://smapi.io/",
  },
];

var commands = [];

Game.deleteMany({})
  .exec()
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} game records!`);
  });

setTimeout(() => {
  // 프라미스 생성을 위한 구독자 객체 루프
  games.forEach((g) => {
    commands.push(
      Game.create({
        name: g.name,
        creater : g.creater ,
        type : g.type ,
        link : g.link ,
      }).then((game) => {
        console.log(`Created game: ${game.name}`);
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