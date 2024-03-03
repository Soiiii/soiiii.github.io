// Header에 페이지 아래로 스크롤시 다크 스타일링 적용
const header = document.querySelector(".header");
// getBoundingClientRect: 헤더의 높이를 반환해줌
const headerHeight = header.getBoundingClientRect().height;

// 스크롤되는 이벤트가 발생하면 내가 하고 싶은 일을 수행해줘
document.addEventListener("scroll", () => {
  //스크롤되는 Y좌표가 headerHeight보다 크다면 다른 스타일링 해줘
  if (window.scrollY > headerHeight) {
    header.classList.add("header--dark");
  } else {
    header.classList.remove("header--dark");
  }
});

// Home Section을 아래로 스크롤시 투명하게 처리
const home = document.querySelector(".home__container");
const homeHeight = home.offsetHeight;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});
