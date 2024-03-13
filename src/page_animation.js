"use strict";

$(function () {
  var sections = $(".mydiv");
  var currentSectionIndex = 0;
  currentSectionIndex = -1;
  sections.each(function (i) {
    if (
      currentSectionIndex < 0 &&
      $(this).offset() &&
      $(this).offset().top >= $(window).scrollTop()
    ) {
      currentSectionIndex = i;
    }
  });

  $(window).on("mousewheel DOMMouseScroll", { passive: false }, function (e) {
    // project 맨 마지막 섹션에서 스크롤 다운할경우 contact로 넘어가게 이동
    if (e.originalEvent.deltaY > 0 && $(this).scrollTop() > 3000) {
      console.log($(document));
      $("html, body").animate(
        {
          scrollTop: $(document).height(),
        },
        500
      );
      return false; // 기본 이벤트 방지
    }

    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      if (currentSectionIndex > 0) {
        currentSectionIndex--;
      }
    } else {
      if (currentSectionIndex < sections.length - 1) {
        // Added -1 to avoid going beyond the last element
        currentSectionIndex++;
      }
    }
    if (
      sections.eq(currentSectionIndex) &&
      sections.eq(currentSectionIndex).offset()
    ) {
      // header menu 버튼이 눌려서 페이지가 이동되었을때 현재 세션의 값을 셋팅
      $(document).ready(function () {
        $(".header__menu__item").click(function (e) {
          var target = $(this).attr("href");
          if (target === "#home") {
            currentSectionIndex = 0;
          } else if (target === "#about") {
            currentSectionIndex = 1;
          } else if (target === "#experience") {
            currentSectionIndex = 2;
          } else if (target === "#skills") {
            currentSectionIndex = 3;
          } else if (target === "#work") {
            currentSectionIndex = 4;
          } else {
            currentSectionIndex = 5;
          }
        });
        $(".arrow-up").click(function (e) {
          currentSectionIndex = 0;
        });
      });
      $("html,body")
        .stop()
        .animate(
          {
            scrollTop: sections.eq(currentSectionIndex).offset().top,
          },
          500
        );
    }
    return false;
  });
  $(window).resize(function () {
    if (
      sections.eq(currentSectionIndex) &&
      sections.eq(currentSectionIndex).offset()
    ) {
      $("html,body").scrollTop(sections.eq(currentSectionIndex).offset().top);
    }
  });
});
