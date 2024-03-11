//구현 계획
// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserver 를 사용해서 모든 섹션들을 관찰해야 한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
// 보여지는 섹션:
// -- 다수의 섹션이 동시에 보여진다면, 가장 첫번째 섹션을 선택
// -- 마지막 contact 섹션이 보여진다면, 가장 마지막 섹션을 선택

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
const sectionIds = [
  "#home",
  "#about",
  "#experience",
  "#skills",
  "#work",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[href="${id}"]`)
);

const visibleSections = sectionIds.map(() => false);
let activeNavItem = navItems[0];

const options = {
  rootMargin: "-20% 0px 0px 0px",
  // 점진적으로 다시 callback함수 호출
  threshold: [0, 0.98],
};

// 2. IntersectionObserver 를 사용해서 모든 섹션들을 관찰해야 한다.
const observer = new IntersectionObserver(observerCallback, options);
sections.forEach((section) => observer.observe(section));

function observerCallback(entries) {
  // flag 변수 (마지막인지 아닌지 알 수 있는 체크)
  let selectLastOne;
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
    // 3가지 조건이 모두 만족한다면 selectLastOne : true
    selectLastOne =
      // entry index가 가장 마지막이고
      index === sectionIds.length - 1 &&
      // 마지막 entry가 보여지고 있고
      entry.isIntersecting &&
      //  95% 보여지고 있다면
      entry.intersectionRatio >= 0.95;
  });

  const navIndex = selectLastOne
    ? sectionIds.length - 1
    : findFirstIntersecting(visibleSections);
  selectNavItem(navIndex);
}

// 인자로 전달된 intersections 이름 Boolean 배열에 처음으로 있는 true를 반환

function findFirstIntersecting(intersections) {
  const index = intersections.indexOf(true);
  return index >= 0 ? index : 0;
}

function selectNavItem(index) {
  const navItem = navItems[index];
  if (!navItem) return;
  activeNavItem.classList.remove("active");
  activeNavItem = navItem;
  activeNavItem.classList.add("active");
}
