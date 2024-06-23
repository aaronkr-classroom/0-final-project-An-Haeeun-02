/**
 * Dev.to에서: https://dev.to/ljcdev/easy-hamburger-menu-with-js-2do0
 *
 * 메뉴 버튼과 반응형 메뉴를 생성하십시오.
 */

// Bootstrap dropdown menu를 사용하지 않고 메뉴를 만들었습니다.
$(document).ready(function () {
  $(".dropdown-toggle").dropdown();
});

// @TODO: querySelector 및 getElementById를 사용하여 관련 메뉴 노드를 가져오십시오.
const menu = document.querySelector(".menu");
const menuButton = document.getElementById("menu-button");

// @TODO: 반응형 메뉴를 열고 닫는 toggleMenu 함수를 작성하십시오.
function toggleMenu() {
  if (menu.classList.contains("show-menu")) {
    menu.classList.remove("show-menu");
    menuButton.style.color = "black";
    menuButton.innerHTML = "Menu";
  } else {
    menu.classList.add("show-menu");
    menuButton.style.color = "white";
    menuButton.innerHTML = "Close";
  }
}

// @TODO: 메뉴 버튼 클릭을 수신하는 eventListener 생성하십시오.
menuButton.addEventListener("click", toggleMenu);

/**
 * Add toggle for profileImg edit button.
 */
const profileImgEditButton = document.getElementById("profileImg-edit-button");
const profileImgEdit = document.getElementById("inputProfileImg");

function toggleProfileImgEdit() {
  if (profileImgEdit.classList.contains("show-profileImg-edit")) {
    profileImgEdit.classList.remove("show-profileImg-edit");
  } else {
    profileImgEdit.classList.add("show-profileImg-edit");
  }
}

if (profileImgEditButton)
  profileImgEditButton.addEventListener("click", toggleProfileImgEdit);
