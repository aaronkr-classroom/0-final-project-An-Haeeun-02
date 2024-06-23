// data/seedTalks.js
"use strict";

const mongoose = require("mongoose"),
  Talk = require("../models/Talk");

// 데이터베이스 연결 설정
mongoose.connect("mongodb://127.0.0.1:27017/aaronkr", {
  useNewUrlParser: true,
});

mongoose.connection;

var talks = [
  {
    meta: {
      title: "Learn JavaScript by Building a Shopping App in CodePen",
    },
    given: {
      date: "3 September 2019",
      event: {
        name: "JS Conf Korea 2019",
      },
    },
    links: {
      article:
        "https://docs.google.com/presentation/d/1X23TrUjYDkb0DJn_ctOEhvBA5-LO2q5aM88dMJAfFfQ/edit?usp=sharing",
    },
  },
  {
    meta: {
      title: "Full Circle: (W)holistic Life Management",
    },
    given: {
      date: "25 March 2019",
      event: {
        name: "Bodeum + Winning Story Meetup",
      },
    },
    links: {
      article: "https://aaron.kr/",
    },
  },
  {
    meta: {
      title: "Atomic Habits that will turn you into a Superhero",
    },
    given: {
      date: "17 November 2018",
      event: {
        name: "Jeonju KOTESOL Conference 2018",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/atomic-habits-that-will-turn-you-into-a-superhero/",
    },
  },
  {
    meta: {
      title: "Increase your Professional Performance",
    },
    given: {
      date: "9 June 2018",
      event: {
        name: "Jeonju KOTESOL Workshop",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/increase-your-professional-performance/",
    },
  },
  {
    meta: {
      title: "11 Great Google Services (for your Classroom)",
    },
    given: {
      date: "11 November 2017",
      event: {
        name: "Jeonju KOTESOL Conference 2017",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/11-great-google-things-for-your-classroom/",
    },
  },
  {
    meta: {
      title: "Google Classroom 101",
    },
    given: {
      date: "21 October 2017",
      event: {
        name: "KOTESOL International Conference 2017",
      },
    },
    links: {
      article: "https://aaron.kr/content/talks/google-classroom-101/",
    },
  },
  {
    meta: {
      title: "Google Classroom & G Suite for Education Training",
    },
    given: {
      date: "16 August 2017",
      event: {
        name: "GPA HS Teacher Training Seminar",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/google-classroom-g-suite-for-education-training/",
    },
  },
  {
    meta: {
      title: "Teacher Tech Tips",
    },
    given: {
      date: "17 February 2017",
      event: {
        name: "GPA HS Teacher Training Seminar",
      },
    },
    links: {
      article: "https://aaron.kr/content/talks/teacher-tech-tips/",
    },
  },
  {
    meta: {
      title:
        "Become a Better Presenter by Becoming a Better Teacher (and vice versa)",
    },
    given: {
      date: "9 April 2016",
      event: {
        name: "Jeonju KOTESOL Workshop",
      },
    },
    links: {
      article: "https://aaron.kr/content/talks/become-a-better-presenter/",
    },
  },
  {
    meta: {
      title: "A Roadmap for WordPress as LMS",
    },
    given: {
      date: "30 May 2015",
      event: {
        name: "KOTESOL National Conference 2015",
      },
    },
    links: {
      article: "https://aaron.kr/content/talks/a-roadmap-for-wordpress-as-lms/",
    },
  },
  {
    meta: {
      title: "Computer Science as a Career",
    },
    given: {
      date: "16 April 2015",
      event: {
        name: "GPA HS Career Day",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/gpa-hs-career-day-computer-science/",
    },
  },
  {
    meta: {
      title: "WordPress in your Classroom as an LMS",
    },
    given: {
      date: "14 March 2015",
      event: {
        name: "Jeonju KOTESOL Workshop",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/code/wordpress/wordpress-as-lms-learning-management-system/",
    },
  },
  {
    meta: {
      title: "A Comprehensive Overview of WP Site Owner Roles",
    },
    given: {
      date: "7 March 2015",
      event: {
        name: "Jeonju WordPress Meetup",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/a-comprehensive-overview-of-wordpress-site-owner-roles/",
    },
  },
  {
    meta: {
      title: "오픈 소스, 워드프레스, 그리고 커뮤니티",
    },
    given: {
      date: "28 February 2015",
      event: {
        name: "서울 워드프레스 미트업 2015",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/%ec%84%9c%ec%9a%b8-%ec%9b%8c%eb%93%9c%ed%94%84%eb%a0%88%ec%8a%a4-%eb%af%b8%ed%8a%b8%ec%97%85-2015-%ec%98%a4%ed%94%88-%ec%86%8c%ec%8a%a4-%ec%9b%8c%eb%93%9c%ed%94%84%eb%a0%88%ec%8a%a4-%ea%b7%b8/",
    },
  },
  {
    meta: {
      title: "Open Source, WordPress, & the Community",
    },
    given: {
      date: "28 February 2015",
      event: {
        name: "Seoul WordPress Grand Meetup 2015",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/seoul-meetup-2015-open-source-wordpress-and-the-community/",
    },
  },
  {
    meta: {
      title: "WordPress Overview",
    },
    given: {
      date: "24 January 2015",
      event: {
        name: "Jeonju WordPress Meetup",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/all-you-ever-wanted-to-know-about-wordpress-in-ten-minutes-or-less/",
    },
  },
  {
    meta: {
      title:
        "From Delinquent to Star Student: My journey toward second-language learning motivation",
    },
    given: {
      date: "12 April 2014",
      event: {
        name: "Jeonju KOTESOL Conference 2014",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/from-delinquent-to-star-student/",
    },
  },
  {
    meta: {
      title: "Technology Upgrade: Build a Customized Gradebook",
    },
    given: {
      date: "21 April 2012",
      event: {
        name: "Jeonju KOTESOL Conference 2012",
      },
    },
    links: {
      article:
        "https://aaron.kr/content/talks/technology-upgrade-customized-grade-book/",
    },
  },
];

var commands = [];

// 1. Delete all previous data. / 이전 데이터 모두 삭제
// 2. Set a timeout to allow the database to be cleared. / 데이터베이스가 지워지는 것을 기다리기 위해 타임아웃 설정
// 3. Create a promise for each courses object. / 코스 객체마다 프라미스 생성.
// 4. Use Promise.all() to wait for all promises to resolve. / 모든 프라미스가 해결될 때까지 기다리기 위해 Promise.all() 사용.
// 5. Close the connection to the database. / 데이터베이스 연결 닫기.

Talk.deleteMany({})
  .exec()
  .then((result) => {
    console.log(`Deleted ${result.deletedCount} talks!`);
  });

setTimeout(() => {
  // 프라미스 생성을 위한 구독자 객체 루프
  talks.forEach((t) => {
    commands.push(
      Talk.create({
        meta: {
          title: t.meta.title,
        },
        given: {
          date: t.given.date,
          event: {
            name: t.given.event.name,
          },
        },
        links: {
          article: t.links.article,
        },
      }).then((talk) => {
        console.log(`Created talk: ${talk.meta.title}`);
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
