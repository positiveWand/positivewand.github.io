if(!sessionStorage.getItem('theme')) {
    sessionStorage.setItem('theme', 'light');
} else if (sessionStorage.getItem('theme') == 'light') {
    document.querySelector('body').className = 'light';
    let themeswitch = document.querySelector('.toggle-switch input');
    themeswitch.checked = false;
} else if (sessionStorage.getItem('theme') == 'dark') {
    document.querySelector('body').className = 'dark';
    let themeswitch = document.querySelector('.toggle-switch input');
    themeswitch.checked = true;
}

document.querySelector('.toggle-switch input').addEventListener('click', (event) => {
    if(!event.currentTarget.checked) {
        sessionStorage.setItem('theme', 'light');
        document.querySelector('body').className = 'light';
    } else {
        sessionStorage.setItem('theme', 'dark');
        document.querySelector('body').className = 'dark';
    }
});

// 카테고리 메뉴 통제 버튼(작은 화면)
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

let hamburger_svg = htmlToElements(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 64 64" version="1.1">
<g id="surface1">
<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 11.328125 34.5 C 11.324219 34.5 11.324219 34.5 11.324219 34.5 C 10.488281 34.5 9.8125 33.378906 9.8125 32 C 9.8125 30.621094 10.488281 29.5 11.324219 29.5 L 52.675781 29.5 C 53.511719 29.5 54.1875 30.621094 54.1875 32 C 54.1875 33.378906 53.511719 34.5 52.675781 34.5 Z M 11.328125 34.5 "/>
<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 11.328125 15.625 C 11.324219 15.625 11.324219 15.625 11.324219 15.625 C 10.488281 15.625 9.8125 14.503906 9.8125 13.125 C 9.8125 11.746094 10.488281 10.625 11.324219 10.625 L 52.675781 10.625 C 53.511719 10.625 54.1875 11.746094 54.1875 13.125 C 54.1875 14.503906 53.511719 15.625 52.675781 15.625 Z M 11.328125 15.625 "/>
<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 11.328125 53.375 C 11.324219 53.375 11.324219 53.375 11.324219 53.375 C 10.488281 53.375 9.8125 52.253906 9.8125 50.875 C 9.8125 49.496094 10.488281 48.375 11.324219 48.375 L 52.675781 48.375 C 53.511719 48.375 54.1875 49.496094 54.1875 50.875 C 54.1875 52.253906 53.511719 53.375 52.675781 53.375 Z M 11.328125 53.375 "/>`)[0];
let cross_svg = htmlToElements(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 64 64" version="1.1">
<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 14.207031 10.671875 L 53.328125 49.792969 L 49.792969 53.328125 L 10.671875 14.207031 Z M 14.207031 10.671875 "/>
<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 10.671875 49.792969 L 49.792969 10.671875 L 53.328125 14.207031 L 14.207031 53.328125 Z M 10.671875 49.792969 "/>
<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 12.378906 9.890625 C 13.757812 9.890625 14.878906 11.011719 14.878906 12.390625 C 14.878906 13.769531 13.757812 14.890625 12.378906 14.890625 C 11 14.890625 9.878906 13.769531 9.878906 12.390625 C 9.878906 11.011719 11 9.890625 12.378906 9.890625 Z M 12.378906 9.890625 "/>
<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 51.613281 9.890625 C 52.996094 9.890625 54.113281 11.011719 54.113281 12.390625 C 54.113281 13.769531 52.996094 14.890625 51.613281 14.890625 C 50.234375 14.890625 49.113281 13.769531 49.113281 12.390625 C 49.113281 11.011719 50.234375 9.890625 51.613281 9.890625 Z M 51.613281 9.890625 "/>
<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 12.378906 49.152344 C 13.757812 49.152344 14.878906 50.273438 14.878906 51.652344 C 14.878906 53.03125 13.757812 54.152344 12.378906 54.152344 C 11 54.152344 9.878906 53.03125 9.878906 51.652344 C 9.878906 50.273438 11 49.152344 12.378906 49.152344 Z M 12.378906 49.152344 "/>
<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 51.613281 49.152344 C 52.996094 49.152344 54.113281 50.273438 54.113281 51.652344 C 54.113281 53.03125 52.996094 54.152344 51.613281 54.152344 C 50.234375 54.152344 49.113281 53.03125 49.113281 51.652344 C 49.113281 50.273438 50.234375 49.152344 51.613281 49.152344 Z M 51.613281 49.152344 "/>
</svg>`)[0];

let header_hamburger = document.querySelector(".header-hamburger");
header_hamburger.addEventListener("click", (event) => {
    let category_flag;
    if(window.getComputedStyle(document.querySelector(".sidebar-wrapper")).display == "none") {
        category_flag = false;
    } else {
        category_flag = true;
    }

    if(!category_flag) {
        document.querySelector(".header-hamburger svg").remove();
        event.currentTarget.appendChild(cross_svg);
        document.querySelector(".sidebar-wrapper").style.display = "block";
    } else {
        document.querySelector(".header-hamburger svg").remove();
        event.currentTarget.appendChild(hamburger_svg);
        document.querySelector(".sidebar-wrapper").style.removeProperty("display");
    }
});

// 카테고리 메뉴 통제 버튼(큰 화면)
let sidebar_hide = document.querySelector(".sidebar-header button");
sidebar_hide.addEventListener("click", (event) => {
    document.querySelector(".sidebar-wrapper").style.display = "none";
    document.querySelector(".sidebar-show-btn").style.display = "block";
})
let sidebar_hamburger = document.querySelector(".sidebar-show-btn");
sidebar_hamburger.addEventListener("click", (event) => {
    document.querySelector(".sidebar-wrapper").style.display = "block";
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

const page_content_num = 5;

if(document.querySelector('.content-list')  && !document.querySelector('.searchbar')) {
    let total_content_num = document.querySelector('.content-list').childElementCount;
    let current_page = Number((new URLSearchParams(window.location.search)).get('page'));
    if(current_page == 0) {
        current_page = 1;
    }

    let contents = Array.from(document.querySelectorAll('.content-list > li'));
    const start = (current_page - 1) * page_content_num;
    const end = Math.min(start + page_content_num, total_content_num);
    contents.slice(start, end).forEach(element => {
        console.log(element);
        element.style.removeProperty('display');
    });

    if (start > total_content_num) {
        let wrong = document.createElement('li');
        wrong.innerHTML = '잘못된 접근입니다';
        document.querySelector('.content-list').appendChild(wrong);
    }
}

function createNavButton(type, num, selected) {
    const newItem = document.createElement('li');
    const newButton = document.createElement('button');
    const newSpan = document.createElement('span');

    let total_content_num = document.querySelector('.content-list').childElementCount;
    const page_num = Math.ceil(total_content_num / page_content_num);
    let current_page = Number((new URLSearchParams(window.location.search)).get('page'));
    if(current_page == 0) {
        current_page = 1;
    }

    newItem.appendChild(newButton);
    newButton.appendChild(newSpan);

    switch (type) {
        case 'number':
            newSpan.innerHTML = num;
            if (selected) {
                newItem.className = 'content-list-navbar-current'
            } else {
                newButton.addEventListener('click', () => {
                    let searchParam = new URLSearchParams(window.location.search.slice());
                    searchParam.set('page', num);
                    console.log(searchParam.toString())
                    location.href = window.location.pathname + "?" + searchParam.toString();
                })
            }
            break;
        case 'left':
            newSpan.innerHTML = '&lt;';
            newButton.addEventListener('click', () => {
                let searchParam = new URLSearchParams(window.location.search.slice());
                    searchParam.set('page', current_page - 1);
                    location.href = window.location.pathname + "?" + searchParam.toString();
            });
            if (current_page == 1) {
                newButton.disabled = true;
            }
            break;
        case 'right':
            newSpan.innerHTML = '&gt;';
            newButton.addEventListener('click', () => {
                let searchParam = new URLSearchParams(window.location.search.slice());
                    searchParam.set('page', current_page + 1);
                    location.href = window.location.pathname + "?" + searchParam.toString();
            });
            if (current_page == page_num) {
                newButton.disabled = true;
            }
            break;
        case 'ellipsis':
            newButton.disabled = true;
            newSpan.innerHTML = '...';
            break;
    }

    return newItem;
}

if(document.querySelector(".content-list-navbar")) {
    let navlist = document.createElement('ol');
    let total_content_num = document.querySelector('.content-list').childElementCount;
    const page_num = Math.ceil(total_content_num / page_content_num);
    let current_page = Number((new URLSearchParams(window.location.search)).get('page'));
    if(current_page == 0) {
        current_page = 1;
    }

    console.log(current_page)

    if (page_num == 0) {
        navlist.appendChild(createNavButton('left'));
        navlist.appendChild(createNavButton('number', '1', true));
        navlist.appendChild(createNavButton('right'));
    } else if (page_num < 10) {
        navlist.appendChild(createNavButton('left'));
        for (let i = 1; i <= page_num; i++) {
            let selected = current_page == i;
            let item = createNavButton('number', i, selected);
            navlist.appendChild(item);
        }
        navlist.appendChild(createNavButton('right'));
    } else {
        navlist.appendChild(createNavButton('left'));
        if (current_page <= 5) {
            for (let i = 1; i <= 7; i++) {
                let selected = current_page == i;
                let item = createNavButton('number', i, selected);
                navlist.appendChild(item);
            }
            navlist.appendChild(createNavButton('ellipsis'));
            navlist.appendChild(createNavButton('number', page_num, false));
        } else if (current_page >= page_num - 4) {
            navlist.appendChild(createNavButton('number', 1, false));
            navlist.appendChild(createNavButton('ellipsis'));
            for (let i = page_num - 6; i <= page_num; i++) {
                let selected = current_page == i;
                let item = createNavButton('number', i, selected);
                navlist.appendChild(item);
            }
        } else {
            navlist.appendChild(createNavButton('number', 1, false));
            navlist.appendChild(createNavButton('ellipsis'));
            for (let i = current_page-2; i <= current_page+2; i++) {
                let selected = current_page == i;
                let item = createNavButton('number', i, selected);
                navlist.appendChild(item);
            }
            navlist.appendChild(createNavButton('ellipsis'));
            navlist.appendChild(createNavButton('number', page_num, false));
        }
        navlist.appendChild(createNavButton('right'));
    }

    console.log(navlist)
    document.querySelector(".content-list-navbar").appendChild(navlist);
}

function findIndex(list, item) {
    let start = 0;
    let end = list.length - 1;
    let mid;
    while (start <= end) {
        mid = parseInt((start+end)/2);

        if(item < list[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return end;
}

if (document.querySelector('.post-content-nav')) {
    const header_list = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6');
    const anchor_list = document.querySelectorAll('.post-content-nav li');
    const positions = [];
    for (const aHeader of header_list) {
        let targetPosition = aHeader.getBoundingClientRect().top + document.documentElement.scrollTop - parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.5;
        targetPosition = targetPosition >= 0 ? targetPosition : 0;
        positions.push(targetPosition);
    }
    // console.log(positions);
    let activeAnchor = undefined;
    window.addEventListener("scroll", () => {
        let currentPosition = document.documentElement.scrollTop + parseFloat(getComputedStyle(document.documentElement).fontSize) * 6;
        // console.log(findIndex(positions, currentPosition));
        let targetIndex = findIndex(positions, currentPosition);
        if(activeAnchor) {
            activeAnchor.className = '';
        }
        if(targetIndex >= 0) {
            activeAnchor = anchor_list[targetIndex];
            activeAnchor.className = 'active';
        }
    });
}

if (document.querySelector('.searchbar')) {
    const searchbar = document.querySelector('.searchbar');
    const posts = Array.from(document.querySelectorAll('.content-list > li'));

    posts.forEach((element) => {
        element.style.removeProperty("display");
    });
    document.querySelector('.search-result > h2 > span').innerText = '('+ posts.length +')';
    searchbar.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(document.querySelector('.searchbar input').value);
        let query = document.querySelector('.searchbar input').value;
        let count = posts.length;
        query = query.toLowerCase();
        posts.forEach((element, index) => {
            element.style.display = 'block';
            if(!element.querySelector('h3').innerText.toLowerCase().includes(query)) {
                element.style.display = 'none';
                count--;
            }
        });

        document.querySelector('.search-result > h2 > span').innerText = '('+ count +')';
    });
}