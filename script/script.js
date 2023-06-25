// 카테고리 메뉴 통제 버튼(작은 화면)
let header_hamburger = document.querySelector(".header-hamburger img");
header_hamburger.addEventListener("click", (event) => {
    let category_flag;
    if(window.getComputedStyle(document.querySelector(".sidebar-wrapper")).display == "none") {
        category_flag = false;
    } else {
        category_flag = true;
    }

    if(!category_flag) {
        event.target.src = "/assets/cross.svg";
        document.querySelector(".sidebar-wrapper").style.display = "block";
    } else {
        event.target.src = "/assets/hamburger.svg";
        document.querySelector(".sidebar-wrapper").style.removeProperty("display");
    }
});

// 카테고리 메뉴 통제 버튼(큰 화면)
let sidebar_hide = document.querySelector(".sidebar-header button");
sidebar_hide.addEventListener("click", (event) => {
    document.querySelector(".sidebar-wrapper").style.display = "none";
    document.querySelector(".sidebar-show-btn").style.display = "block";
})
let sidebar_hamburger = target = document.querySelector(".sidebar-show-btn");
target.addEventListener("click", (event) => {
    document.querySelector(".sidebar-wrapper").style.removeProperty("display");
    document.querySelector(".sidebar-show-btn").style.display = "none";
})

// 헤더 페이지 요약 정보
function isElementInViewport (el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function onVisibilityChange(element, callback) {
    let old_visible;
    return function () {
        let visible = isElementInViewport(element);
        if (visible != old_visible) {
            old_visible = visible;
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

let candidate = [
    ".page-content-header"
];
let targetElement = null;
for (const aElement of candidate) {
    if(document.querySelector(aElement)) {
        targetElement = document.querySelector(aElement);
        break;
    }
}
//console.log(targetElement);
if (targetElement) {
    let handler = onVisibilityChange(targetElement, () => {
        if(isElementInViewport(targetElement)) {
            console.log("visible");
            document.querySelector(".header-content-info").style.visibility = "hidden";
        } else {
            console.log("hidden");
            document.querySelector(".header-content-info").style.visibility = "visible";
        }
    });
    if (window.addEventListener) {
        addEventListener('DOMContentLoaded', handler, false);
        addEventListener('load', handler, false);
        addEventListener('scroll', handler, false);
        addEventListener('resize', handler, false);
    } else if (window.attachEvent)  {
        attachEvent('onDOMContentLoaded', handler);
        attachEvent('onload', handler);
        attachEvent('onscroll', handler);
        attachEvent('onresize', handler);
    }
}

if(document.querySelector(".sidebar-nav-selected")) {
    let targetHeight = document.querySelector(".sidebar-nav-selected").offsetTop - document.querySelector(".sidebar").offsetHeight/2;
    document.querySelector(".sidebar").scrollTop = targetHeight >= 0 ? targetHeight : 0;
}