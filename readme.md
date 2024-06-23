[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Vo0H5yHd)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15170751)
# Final Project Starter Files / 기말 프로젝트 시작 파일

This folder contains the starter files for the final project. You can use these files to start your project.<br>
이 폴더는 기말 프로젝트 시작 파일을 포함하고 있습니다. 이 파일들을 사용하여 프로젝트를 시작할 수 있습니다.

Check the [Final Project page](https://ut-nodejs.github.io/project.html) for more (updated) details.<br>
더 많은 (업데이트 된) 세부 정보는 [기말 프로젝트 페이지](https://ut-nodejs.github.io/project.html)를 확인하세요.

## 프로젝트 구조

In this class, we've created the following MVC structure. / 이 수업에서는 다음과 같은 MVC 구조를 만들었습니다.

1. Subscribers
2. Users
3. Courses

Each of these models has a controller, views for the CRUD operations, and a seedData file. For example: / 각 모델에는 CRUD 작업을위한 컨트롤러,보기 및 seedData 파일이 있습니다. 예를 들어:

```js
- models/Subscriber.js // 모델
- controllers/subscribersController.js // 컨트롤러
- views
    - subscribers
        - index.ejs // 목록 보기
        - new.ejs   // 새로 만들기
        - edit.ejs  // 수정하기
        - show.ejs  // 세부 정보 보기
- data/seedSubscribers.js // 몽고 DB에 데이터를 채우는 데 사용되는 데이터
```

Your task is to **create ONE more model, controller, views, and see dData file.**<br>
당신의 과제는 **하나의 모델, 컨트롤러, 뷰 및 seedData 파일을 더 만드는 것입니다.**

This sample project introduces a `Talks` and a `Trains` MVC structure.<br>
이 샘플 프로젝트는 `Talks` 및 `Trains` MVC 구조를 소개합니다.

## Basic Requirements / 기본 요구사항

1. **Unit 4:** Build 3 models: `Subscriber`, `Transportation`, and `User`.<br>
   3개의 모델을 만드세요: `Subscriber`, `Transportation`, 그리고 `User`.
2. Build controllers for each model.<br>
   각 모델에 대한 컨트롤러를 만드세요.
3. Build views for each model.<br>
   각 모델에 대한 뷰를 만드세요.
4. Build CRUD routes for each model.<br>
   각 모델에 대한 CRUD 라우트를 만드세요.
5. Add one additional model, controller, and view (including CRUD routes) of your choice.<br>
   추가로 하나의 모델, 컨트롤러, 뷰 (CRUD 라우트 포함)를 만드세요.
6. **Unit 5:** Add User Authentication.<br>
   사용자 인증을 추가하세요.

## Bonus / 보너스

1. **Unit 6:** Build an API for one (or more) of your models.<br>
   모델 중 하나 (또는 그 이상)에 대한 API를 만드세요.
2. **Unit 7:** Add chat functionality to your app.<br>
   채팅 기능을 앱에 추가하세요.

### Included files / 포함된 파일

```bash
|___/models                   # <NEW>
| |___User.js                   # 사용자 모델
| |___Subscriber.js             # 구독자 모델
| |___Course.js                 # 과정 모델
| |___Talk.js                   # 발표 모델
| |___Train.js                  # 기차 모델


|___/controllers              # <NEW>
| |___pagesController.js        # 모든 라우트를 처리하는 컨트롤러
| |___errorController.js        # 모든 에러를 처리하는 컨트롤러
| |___usersController.js        # users 모델을 처리하는 컨트롤러
| |___subscribersController.js  # subscribers 모델을 처리하는 컨트롤러
| |___coursesController.js      # courses 모델을 처리하는 컨트롤러
| |___talksController.js        # talks 모델을 처리하는 컨트롤러
| |___trainsController.js       # trains 모델을 처리하는 컨트롤러


|___/data                     # <NEW> 데이터베이스를 채우려면 `node seedModel.js`를 실행하세요
| |___seedUsers.js              # 스타터 사용자 데이터
| |___seedSubscribers.js        # 스타터 구독자 데이터
| |___seedCourses.js            # 스타터 과정 데이터
| |___seedTalks.js              # 스타터 발표 데이터
| |___seedTrains.js             # 스타터 기차 데이터


|___/views
| |___/_pages                 # <NEW>
| |___404.ejs                   # 에러 발생 시 접근 가능
| |___500.ejs                   # 에러 발생 시 접근 가능
| |___about.ejs                 # GET 메소드로 접근 가능
| |___transportation.ejs        # GET 메소드로 접근 가능
| |___/_partials              # <NEW>
| | |___header.ejs              # 모든 페이지에 사용되는 헤더
| | |___footer.ejs              # 모든 페이지에 사용되는 푸터
| | |___navigation.ejs          # 모든 페이지에 사용되는 네비게이션 바
| | |___confetti.ejs            # thanks.html에 사용되는 confetti
| |___/users                  # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___/subscribers            # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___/courses                # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___/talks                  # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___/trains                 # <NEW>
| | |___edit.ejs                # PUT 메소드로 접근 가능 (update)
| | |___index.ejs               # GET 메소드로 접근 가능 (index)
| | |___new.ejs                 # POST 메소드로 접근 가능 (create)
| | |___show.ejs                # GET 메소드로 접근 가능 (show) = 단일 레코드의 데이터
| |___layout.ejs              # <NEW> 모든 페이지의 레이아웃
| |___index.ejs                 # GET 메소드로 접근 가능


|___/public                   # <NO CHANGES> 안 바뀜
| |___css
| |___img
| |___js


|___main.js                   # <NEW> Express 서버를 설정하는 파일
|___package.json              # <NEW> npm init을 통해 생성된 파일
|___package-lock.json
```
