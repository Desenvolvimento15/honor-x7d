
document.addEventListener("DOMContentLoaded", function () {
"use strict";

const PDT_NAME = "HONOR X7d";



const
HTML = document.documentElement,
BODY = document.body,
MAIN = document.body.querySelector('main');

let screenWidth = HTML.clientWidth,
screenHeight = HTML.clientHeight,

isMob = window.matchMedia('(max-aspect-ratio: 12 / 10)').matches && screenWidth < 1026,
isFold = window.matchMedia('(min-aspect-ratio: 661 / 758)').matches && screenWidth < 1001,
navHeight = 52,
scrubTime = isMob ? 0.5 : 0.7,
touchMoving = false,
viewportHeight = window.innerHeight,
triggerRefresh = false,
currentPosition = 0,
viewportWidth = window.innerWidth;



window.addEventListener('resize', function () {
screenWidth = HTML.clientWidth;
screenHeight = HTML.clientHeight;
isMob = window.matchMedia('(max-aspect-ratio: 12 / 10)').matches && screenWidth < 1026;
})


window.addEventListener('scroll', function () {
if (!triggerRefresh) {
ScrollTrigger.refresh();
triggerRefresh = true;
}
})

if (window.NodeList && !NodeList.prototype.forEach) {
NodeList.prototype.forEach = Array.prototype.forEach;
}

const Support = (function () {
const UA = navigator.userAgent.toLowerCase(),
isUC = UA.indexOf('ucbrowser') !== -1,
isWeChat = UA.indexOf('micromessenger') !== -1,
isIOS = UA.indexOf('safari') !== -1 && UA.indexOf('chrome') < 1 && UA.indexOf('android') < 1,
isNatural = UA.indexOf('huaweibrowser') !== -1,
isChrome = UA.indexOf('chrome') !== -1,
isFirefox = UA.indexOf('firefox') !== -1,
isHonor = UA.indexOf('honorbrowser') !== -1,
isBaidu = UA.indexOf('baidu') !== -1,
isXiaomi = UA.indexOf('miuibrowser') !== -1;



const supportWEBP = function supportWEBP() {
const webp = new Image();
webp.onerror = function () {
return false;
};
webp.onload = function () {
return true;
};
webp.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoBAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==';
}


const supportWEBM = function supportWEBM() {
if (document.createElement('video').canPlayType('video/webm') !== '') {
return true;
} else {
return false;
}
}


return {
inlineVideo: !(isUC || isWeChat || isHonor || isBaidu || isXiaomi),
isUC: isUC,
isWeChat: isWeChat,
isIOS: isIOS,
isNatural: isNatural,
isChrome: isChrome,
isFirefox: isFirefox,
supportWEBP: supportWEBP,
supportWEBM: supportWEBM,
};
})();

const Common = (function () {
gsap.config({
nullTargetWarn: false,
});

gsap.defaults({
duration: 1,
});

function unUseHandle() {
let doms;
if (isMob) doms = MAIN.querySelectorAll(".pc-show");
else doms = MAIN.querySelectorAll(".mob-show");
doms.forEach(function (dom) {
dom.remove();
});
}

function browserHandle() {
if (Support.isUC) MAIN.classList.add("is-uc");
if (Support.isWeChat) MAIN.classList.add("is-wechat");
if (Support.isIOS) MAIN.classList.add("is-ios");
if (Support.isNatural) MAIN.classList.add("is-natural");
if (Support.isFirefox) MAIN.classList.add("is-firefox");
if (Support.isChrome) MAIN.classList.add("is-chrome");
}

function buyButtonHrefHandle() {
let kvBuyBtn = MAIN.querySelector(".kvBuyBtn"),
navBuyBtn =
screenWidth < 841
? document.querySelector(".btn-buy-mob") ||
document.querySelector(".btn-buy")
: document.querySelector(".btn-buy-pc") ||
document.querySelector(".btn-buy"),
navBuyBtnTag = navBuyBtn?.tagName.toLowerCase(),
style = navBuyBtn ? window.getComputedStyle(navBuyBtn) : null,
timeout = null;

if (!kvBuyBtn) return;
if (!navBuyBtn) return (kvBuyBtn.style.display = "none");

function initKvBuyBtn() {
kvBuyBtn.style.display = "inline-block";
kvBuyBtn.style.opacity = "0";
if (style?.display == "none") kvBuyBtn.style.display = "none";

if (navBuyBtnTag == "a") {
let name = navBuyBtn.innerHTML,
href = navBuyBtn.getAttribute("href"),
target = navBuyBtn.getAttribute("target");

kvBuyBtn.innerHTML = name;
kvBuyBtn.setAttribute("href", href);
kvBuyBtn.setAttribute("target", target);
kvBuyBtn.setAttribute("button-name", name);

timeout = setTimeout(function () {
kvBuyBtn.style.opacity = "1";
clearTimeout(timeout);
timeout = null;
}, 300);
return false;
} else {
let name = navBuyBtn.innerHTML;

kvBuyBtn.innerHTML = name;
kvBuyBtn.setAttribute("href", "javascript:void(0)");
kvBuyBtn.setAttribute("button-name", name);

timeout = setTimeout(function () {
kvBuyBtn.style.opacity = "1";
clearTimeout(timeout);
timeout = null;
}, 300);
return true;
}
}

let observer = new MutationObserver(function (mutations) {
mutations.forEach(function (mutationRecord) {
if (timeout) clearTimeout(timeout), (timeout = null);
if (style?.display == "none") kvBuyBtn.style.display = "none";
else return initKvBuyBtn();
});
});
const config = { attributes: true };
observer.observe(navBuyBtn, config);

return initKvBuyBtn();
}


function removeClassesStartingWith(element, prefix) {
element.classList.forEach(function (className) {
if (className.startsWith(prefix)) element.classList.remove(className);
});
}

function removeClassesStartingWithAll(element, prefix) {
element.forEach(function (ele) {
ele.classList.forEach(function (className) {
if (className.startsWith(prefix)) ele.classList.remove(className);
});
})
}

function loadVideo(video) {
let id = video.getAttribute("id"),
path = video.getAttribute("data-path"),
color = video.getAttribute("data-color") || "";

if (Support.inlineVideo) {
let poster, src;
let suffix = isMob ? "-mob" : "-pc";
poster = path + id + suffix + ".jpg";
src = path + id + suffix + ".mp4";
video.setAttribute("poster", poster);
video.setAttribute("src", src);
video.load();
} else {
let imageEl = document.createElement("img");
imageEl.setAttribute("id", id);
imageEl.setAttribute("data-color", color);
imageEl.classList = video.classList;
imageEl.setAttribute("src", path + id + "-wx.jpg");
video.parentNode.insertBefore(imageEl, video.nextSibling);
video.parentNode.removeChild(video);
}
}


function backToTop() {
const button = document.querySelector('.pdp-backToTopBtn'),
$footer = document.querySelector('.footer');
button.addEventListener('click', function () {
window.scrollTo({ top: 0, behavior: 'smooth' });
})
window.addEventListener('scroll', function () {
let footerTop = $footer?.getBoundingClientRect().top || 0; if (window.scrollY > 200 && footerTop > screenHeight) button.classList.add('is-active');
else button.classList.remove('is-active');
})
}

function point_click() {
// if (!isMob) {
var honorPointLinks = MAIN.querySelectorAll(".point-item");
honorPointLinks.forEach(function (item) {
item.onclick = function (e) {
var id = item.getAttribute("data-id");
var position =
document
.querySelector('.point-part[data-id="' + id + '"]')
.getBoundingClientRect().top + window.scrollY;

if (!isMob) {
if (id == 1) position += screenHeight * 0;
if (id == 2) position += screenHeight * 0.03;
if (id == 3) position += screenHeight * 0.02;
if (id == 4) position += screenHeight * 0.02;
if (id == 5) position += screenHeight * 0.02;
if (id == 6) position -= screenHeight * 0.01;

} else {
if (id == 1) position -= screenHeight * 0;
if (id == 2) position += screenHeight * 0.02;
if (id == 3) position += screenHeight * 0.02;
if (id == 4) position -= screenHeight * 0.02;
if (id == 5) position -= screenHeight * 0;
if (id == 6) position -= screenHeight * 0.01;

}



window.scrollTo({
top: position,
left: 0,
behavior: "auto",
});
e.preventDefault();
};
});

}

return {
point_click: point_click(),
// backToTop: backToTop(),
unUseHandle: unUseHandle(),
browserHandle: browserHandle(),
buyButtonHrefHandle: buyButtonHrefHandle(),
removeClassesStartingWith,
removeClassesStartingWithAll,
loadVideo,
};
})();



const setCssVar = function (elName, varName, varVal) {
const el = document.querySelector(elName)
el.style.setProperty(varName, varVal)
}



const Animation = (function () {



function seccmf() {


if (!isMob) {
const $cmf = MAIN.querySelector('.section-cmf')

let sec_cmf = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-cmf-1',
start: 'top 0%',
end: 'top 0%',
scrub: 0,
// markers: true,
}
});


sec_cmf.to('.section-cmf', 1, {
onStart: function () {
$('.section-cmf').addClass('is-active1')


},
onReverseComplete: function () {
$('.section-cmf').removeClass('is-active1')


}
})



var currentColor = 'gold';
const colorBtns = $cmf.querySelectorAll('.text-wrapper .cmf-btn');
colorBtns.forEach(function (button, i) {
button.addEventListener('click', function () {
let color = this.getAttribute('data-color');

if (currentColor == color) return;
currentColor = color;
Common.removeClassesStartingWith($cmf, 'is-color');
$cmf.classList.add('is-color-' + currentColor);



})
})


} else {
const $cmf = MAIN.querySelector('.section-cmf')
let sec_cmf = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-cmf-1',
start: 'top 0%',
end: 'top 0%',
scrub: 0,
// markers: true,
}
});


sec_cmf.to('.section-cmf', 1, {
onStart: function () {
$('.section-cmf').addClass('is-active1')
},
onReverseComplete: function () {
$('.section-cmf').removeClass('is-active1')
}
})


var currentColor = 'gold';
const colorBtns = $cmf.querySelectorAll('.text-wrapper .cmf-btn');
colorBtns.forEach(function (button, i) {
button.addEventListener('click', function () {
let color = this.getAttribute('data-color');

if (currentColor == color) return;
currentColor = color;
Common.removeClassesStartingWith($cmf, 'is-color');
$cmf.classList.add('is-color-' + currentColor);



})
})
}
}

function secdesign() {
if (!isMob) {

let sec_design = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-design-1',
start: 'top 0%',
end: 'top 0%',
scrub: 0,
// markers: true,
}
});


sec_design.to('.section-design', 1, {
onStart: function () {
$('.section-design').addClass('is-active1')


},
onReverseComplete: function () {
$('.section-design').removeClass('is-active1')


}
})

} else {

let sec_design = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-design-1',
start: 'top 0%',
end: 'top 0%',
scrub: 0,
// markers: true,
}
});

sec_design.to('.section-design', 1, {
onStart: function () {
$('.section-design').addClass('is-active1')
},
onReverseComplete: function () {
$('.section-design').removeClass('is-active1')
}
})

}
}

function secbattery() {
if (!isMob) {

let sec_battery = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-battery-1',
start: 'top 0%',
end: '+=50%',
scrub: 0,
// markers: true,
}
});


sec_battery.to('.section-battery', 1, {
onStart: function () {
$('.section-battery').addClass('is-active1')

},
onReverseComplete: function () {
$('.section-battery').removeClass('is-active1')
}
})

sec_battery.to('.section-battery', 1, {
onStart: function () {
$('.section-battery').addClass('is-active2')

},
onReverseComplete: function () {
$('.section-battery').removeClass('is-active2')
}
}, "+=0.5")

} else {

let sec_battery = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-battery-1',
start: 'top 0%',
end: '+=50%',
scrub: 0,
// markers: true,
}
});

sec_battery.to('.section-battery', 1, {
onStart: function () {
$('.section-battery').addClass('is-active1')
},
onReverseComplete: function () {
$('.section-battery').removeClass('is-active1')
}
})

sec_battery.to('.section-battery', 1, {
onStart: function () {
$('.section-battery').addClass('is-active2')
},
onReverseComplete: function () {
$('.section-battery').removeClass('is-active2')
}
}, "+=0.2")

}
}

function secdrop() {
if (!isMob) {

let sec_drop0 = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-drop-0',
start: 'top 25%',
end: 'top 25%',
scrub: 0,
// markers: true,
}
});


sec_drop0.to('.section-drop', 1, {
onStart: function () {
$('.section-drop').addClass('is-active1')

},
onReverseComplete: function () {
$('.section-drop').removeClass('is-active1')
}
})

let sec_drop = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-drop-1',
start: 'top 0%',
end: '+=50%',
scrub: 0,
// markers: true,
}
});



sec_drop.to('.section-drop', 1, {
onStart: function () {
$('.section-drop').addClass('is-active2')

},
onReverseComplete: function () {
$('.section-drop').removeClass('is-active2')
}
}, "+=0.5")


} else {

let sec_drop0 = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-drop-0',
start: 'top 25%',
end: 'top 25%',
scrub: 0,
// markers: true,
}
});


sec_drop0.to('.section-drop', 1, {
onStart: function () {
$('.section-drop').addClass('is-active1')

},
onReverseComplete: function () {
$('.section-drop').removeClass('is-active1')
}
})

let sec_drop = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-drop-1',
start: 'top 0%',
end: '+=85%',
scrub: 0,
// markers: true,
}
});


sec_drop.to('.section-drop', 1, {
onStart: function () {
$('.section-drop').addClass('is-active2')

},
onReverseComplete: function () {
$('.section-drop').removeClass('is-active2')
}
}, "+=0.9")

sec_drop.to('.section-drop', 1, {
onStart: function () {
$('.section-drop').addClass('is-active3')

},
onReverseComplete: function () {
$('.section-drop').removeClass('is-active3')
}
})



}
}

function secwater() {
const aiVideo1 = MAIN.querySelector('.section-ai #ai1-video')
var ai_video_isLoad1 = false

const aiVideo2 = MAIN.querySelector('.section-ai #ai2-video')
var ai_video_isLoad2 = false

const aiVideo3 = MAIN.querySelector('.section-ai #ai3-video')
var ai_video_isLoad3 = false

// const aiVideo4 = MAIN.querySelector('.section-ai #ai4-video')
// var ai_video_isLoad4 = false
if (!isMob) {

let sec_water = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-water-1',
start: 'top 50%',
end: 'top 50%',
scrub: 0,
// markers: true,
}
});


sec_water.to('.section-water', 1, {
onStart: function () {
$('.section-water').addClass('is-active1')

if (!ai_video_isLoad1) {
Common.loadVideo(aiVideo1);
ai_video_isLoad1 = true;
}

if (!ai_video_isLoad2) {
Common.loadVideo(aiVideo2);
ai_video_isLoad2 = true;
}


if (!ai_video_isLoad3) {
Common.loadVideo(aiVideo3);
ai_video_isLoad3 = true;
}






},
onReverseComplete: function () {
$('.section-water').removeClass('is-active1')


}
})

} else {

let sec_water = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-water-1',
start: 'top 70%',
end: 'top 70%',
scrub: 0,
// markers: true,
}
});

sec_water.to('.section-water', 1, {
onStart: function () {
$('.section-water').addClass('is-active1')


if (!ai_video_isLoad1) {
Common.loadVideo(aiVideo1);
ai_video_isLoad1 = true;
}

if (!ai_video_isLoad2) {
Common.loadVideo(aiVideo2);
ai_video_isLoad2 = true;
}


if (!ai_video_isLoad3) {
Common.loadVideo(aiVideo3);
ai_video_isLoad3 = true;
}
},
onReverseComplete: function () {
$('.section-water').removeClass('is-active1')
}
})

let sec_water2 = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-water-2',
start: 'top 0%',
end: 'top 0%',
scrub: 0,
// markers: true,
}
});

sec_water2.to('.section-water', 1, {
onStart: function () {
$('.section-water').addClass('is-active2')
},
onReverseComplete: function () {
$('.section-water').removeClass('is-active2')
}
})

}
}

function secins() {
if (!isMob) {

let sec_ins0 = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-ins-0',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});


sec_ins0.to('.section-ins', 1, {
onStart: function () {
$('.section-ins').addClass('is-enter')

},
onReverseComplete: function () {
$('.section-ins').removeClass('is-enter')
}
})

let sec_ins = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-ins-1',
start: 'top 0%',
end: '+=120%',
scrub: 0,
// markers: true,
}
});


sec_ins.to('.section-ins', 1, {
onStart: function () {
$('.section-ins').addClass('is-active1')

},
onReverseComplete: function () {
$('.section-ins').removeClass('is-active1')
}
})

sec_ins.to('.section-ins', 1, {
onStart: function () {
$('.section-ins').addClass('is-active2')

},
onReverseComplete: function () {
$('.section-ins').removeClass('is-active2')
}
})

sec_ins.to('.section-ins', 1, {
onStart: function () {
$('.section-ins').addClass('is-active3')

},
onReverseComplete: function () {
$('.section-ins').removeClass('is-active3')
}
})

} else {

let sec_ins0 = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-ins-0',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});


sec_ins0.to('.section-ins', 1, {
onStart: function () {
$('.section-ins').addClass('is-enter')

},
onReverseComplete: function () {
$('.section-ins').removeClass('is-enter')
}
})

let sec_ins = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-ins-1',
start: 'top 0%',
end: '+=120%',
scrub: 0,
// markers: true,
}
});


sec_ins.to('.section-ins', 1, {
onStart: function () {
$('.section-ins').addClass('is-active1')

},
onReverseComplete: function () {
$('.section-ins').removeClass('is-active1')
}
})

sec_ins.to('.section-ins', 1, {
onStart: function () {
$('.section-ins').addClass('is-active2')

},
onReverseComplete: function () {
$('.section-ins').removeClass('is-active2')
}
})

sec_ins.to('.section-ins', 1, {
onStart: function () {
$('.section-ins').addClass('is-active3')

},
onReverseComplete: function () {
$('.section-ins').removeClass('is-active3')
}
})

}
}

function seccamera() {
if (!isMob) {

let sec_camera = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-camera-1',
start: 'top 50%',
end: 'top 50%',
scrub: 0,
// markers: true,
}
});


sec_camera.to('.section-camera', 1, {
onStart: function () {
$('.section-camera').addClass('is-active1')


},
onReverseComplete: function () {
$('.section-camera').removeClass('is-active1')


}
})

} else {

let sec_camera = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-camera-1',
start: 'top 50%',
end: 'top 50%',
scrub: 0,
// markers: true,
}
});

sec_camera.to('.section-camera', 1, {
onStart: function () {
$('.section-camera').addClass('is-active1')
},
onReverseComplete: function () {
$('.section-camera').removeClass('is-active1')
}
})

}
}


function secai() {

const aiSection = MAIN.querySelector('.section-ai')
const aiBtn = MAIN.querySelectorAll('.section-ai .detail-wrapper .detail')

const aiVideo1 = MAIN.querySelector('.section-ai #ai1-video')


const aiVideo = MAIN.querySelectorAll('.section-ai .ai-video')

if (!isMob) {
let isPlay = false;
let sec_ai = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-ai-1',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});


sec_ai.to('.section-ai', 1, {
onStart: function () {
$('.section-ai').addClass('is-active1')

if (Support.inlineVideo && !isPlay) {
const promise = aiVideo1.play();
promise.then(() => { isPlay = true; })
.catch(error => {
console.error('视频播放失败:', error);
});
}
},
onReverseComplete: function () {
$('.section-ai').removeClass('is-active1')
}
})



aiBtn.forEach(function (button, i) {


button.addEventListener('click', function () {

Common.removeClassesStartingWith(aiSection, 'is-active-');
aiSection.classList.add('is-active-' + i);

if (Support.inlineVideo) {


aiVideo.forEach((item) => {
item.pause()
})
const promise = aiVideo[i].play();
promise.then(() => { })
.catch(error => {
console.error('视频播放失败:', error);
});
}
})




})


} else {
let isPlay = false;
let sec_ai = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-ai-1',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});

sec_ai.to('.section-ai', 1, {
onStart: function () {
$('.section-ai').addClass('is-active1')

if (Support.inlineVideo && !isPlay) {
const promise = aiVideo1.play();
promise.then(() => { isPlay = true; })
.catch(error => {
console.error('视频播放失败:', error);
});
}
},
onReverseComplete: function () {
$('.section-ai').removeClass('is-active1')
}
})


var spaceBetweenAi = 16 / 375 * screenWidth
var mySwiper = new Swiper('.swiper-container-ai', {
// loop: true,
spaceBetween: spaceBetweenAi,
navigation: {
nextEl: '.nextBtn',
prevEl: '.prevBtn',
disabledClass: 'my-button-disabled',
},
pagination: {
el: '.swiper-pagination',
type: 'progressbar',
},

on: {
touchMove: function () {
touchMoving = true;
// console.log('hua')
},
touchEnd: function () {
setTimeout(() => { touchMoving = false }, 100);
},
slidePrevTransitionStart: function () {
if (touchMoving) GA.swiper_touch(MAIN.querySelector('.section-ai'), 'prev');
},
slideNextTransitionStart: function () {
if (touchMoving) GA.swiper_touch(MAIN.querySelector('.section-ai'), 'next');
},


slideChangeTransitionEnd: function () {

if (Support.inlineVideo) {
const video = MAIN.querySelector('.section-ai').querySelectorAll('.swiper-container-ai .ai-video')[this.activeIndex]

let promise = video.play();
if (promise !== undefined) {
promise.then((_) => { }).catch((error) => { });
}
}
},
},

})



}
}

function secmagicos() {
if (!isMob) {

let sec_magicos = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-magicos-1',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});


sec_magicos.to('.section-magicos', 1, {
onStart: function () {
$('.section-magicos').addClass('is-active1')

},
onReverseComplete: function () {
$('.section-magicos').removeClass('is-active1')


}
})

} else {

let sec_magicos = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-magicos-1',
start: 'top 40%',
end: 'top 40%',
scrub: 0,
// markers: true,
}
});

sec_magicos.to('.section-magicos', 1, {
onStart: function () {
$('.section-magicos').addClass('is-active1')
},
onReverseComplete: function () {
$('.section-magicos').removeClass('is-active1')
}
})

}
}

function secpay() {
if (!isMob) {

let sec_pay = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-pay-1',
start: 'top 50%',
end: 'top 50%',
scrub: 0,
// markers: true,
}
});


sec_pay.to('.section-pay', 1, {
onStart: function () {
$('.section-pay').addClass('is-active1')

},
onReverseComplete: function () {
$('.section-pay').removeClass('is-active1')


}
})

} else {

let sec_pay = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-pay-1',
start: 'top 70%',
end: 'top 70%',
scrub: 0,
// markers: true,
}
});

sec_pay.to('.section-pay', 1, {
onStart: function () {
$('.section-pay').addClass('is-active1')
},
onReverseComplete: function () {
$('.section-pay').removeClass('is-active1')
}
})

}
}

function secchip() {



if (!isMob) {

let sec_chip = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-chip-1',
start: 'top 65%',
end: 'top 65%',
scrub: 0,
// markers: true,
}
});


sec_chip.to('.section-chip', 1, {
onStart: function () {
$('.section-chip').addClass('is-active1')




},
onReverseComplete: function () {
$('.section-chip').removeClass('is-active1')


}
})

} else {

let sec_chip = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-chip-1',
start: 'top 70%',
end: 'top 70%',
scrub: 0,
// markers: true,
}
});

sec_chip.to('.section-chip', 1, {
onStart: function () {
$('.section-chip').addClass('is-active1')

if (!sound_video_isLoad1) {
Common.loadVideo(soundVideo1);
sound_video_isLoad1 = true;
}
},
onReverseComplete: function () {
$('.section-chip').removeClass('is-active1')
}
})

}
}

function secmemory() {
const soundVideo1 = MAIN.querySelector('.section-sound .sound-video')
var sound_video_isLoad1 = false
if (!isMob) {

let sec_memory = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-memory-1',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});

// sec_memory.fromTo( $('.section-memory .img-wrapper'),{
//   transform: "translate(calc(-50% - 0.15625vw), calc(-50% + 0vw))",
// },
// {
//   transform: "translate(calc(-50% - 0.15625vw), calc(-50% + 8.4vw))",
// })
sec_memory.to('.section-memory', 1, {
onStart: function () {
$('.section-memory').addClass('is-active1')
if (!sound_video_isLoad1) {
Common.loadVideo(soundVideo1);
sound_video_isLoad1 = true;
}
},
onReverseComplete: function () {
$('.section-memory').removeClass('is-active1')


}
})



let sec_memory2 = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-memory-2',
start: 'top 5%',
end: '+=60%',
scrub: 0,
// markers: true,
}
});


sec_memory2.to('.section-memory', 1, {
onStart: function () {
$('.section-memory').addClass('is-active2')

},
onReverseComplete: function () {
$('.section-memory').removeClass('is-active2')
}
})

sec_memory2.to('.section-memory', 1, {
onStart: function () {
$('.section-memory').addClass('is-active3')

},
onReverseComplete: function () {
$('.section-memory').removeClass('is-active3')
}
}, "+=0.8")

} else {

let sec_memory = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-memory-1',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});

// sec_memory.fromTo( $('.section-memory .img-wrapper'),{
//   transform: "translate(calc(-50% - 0.15625vw), calc(-50% + 0vw))",
// },
// {
//   transform: "translate(calc(-50% - 0.15625vw), calc(-50% + 8.4vw))",
// })
sec_memory.to('.section-memory', 1, {
onStart: function () {
$('.section-memory').addClass('is-active1')
if (!sound_video_isLoad1) {
Common.loadVideo(soundVideo1);
sound_video_isLoad1 = true;
}

},
onReverseComplete: function () {
$('.section-memory').removeClass('is-active1')


}
})



let sec_memory2 = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-memory-2',
start: 'top 5%',
end: '+=60%',
scrub: 0,
// markers: true,
}
});


sec_memory2.to('.section-memory', 1, {
onStart: function () {
$('.section-memory').addClass('is-active2')

},
onReverseComplete: function () {
$('.section-memory').removeClass('is-active2')
}
})

sec_memory2.to('.section-memory', 1, {
onStart: function () {
$('.section-memory').addClass('is-active3')

},
onReverseComplete: function () {
$('.section-memory').removeClass('is-active3')
}
}, "+=0.8")

}
}

function seclight() {
if (!isMob) {

let sec_light = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-light-1',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});


sec_light.to('.section-light', 1, {
onStart: function () {
$('.section-light').addClass('is-active1')

},
onReverseComplete: function () {
$('.section-light').removeClass('is-active1')


}
})

} else {

let sec_light = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-light-1',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});

sec_light.to('.section-light', 1, {
onStart: function () {
$('.section-light').addClass('is-active1')
},
onReverseComplete: function () {
$('.section-light').removeClass('is-active1')
}
})

let sec_light2 = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-light-1',
start: 'top 11%',
end: 'top 11%',
scrub: 0,
// markers: true,
}
});

sec_light2.to('.section-light', 1, {
onStart: function () {
$('.section-light').addClass('is-active2')
},
onReverseComplete: function () {
$('.section-light').removeClass('is-active2')
}
})

}
}


function secsound() {
const soundVideo1 = MAIN.querySelector('.section-sound .sound-video')
if (!isMob) {
let isPlay = false;
let sec_sound = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-sound-1',
start: 'top 60%',
end: 'top 60%',
scrub: 0,
// markers: true,
}
});


sec_sound.to('.section-sound', 1, {
onStart: function () {
$('.section-sound').addClass('is-active1')

if (Support.inlineVideo && !isPlay) {
const promise = soundVideo1.play();
promise.then(() => { isPlay = true; })
.catch(error => {
console.error('视频播放失败:', error);
});
}

},
onReverseComplete: function () {
$('.section-sound').removeClass('is-active1')


}
})

} else {
let isPlay = false;
let sec_sound = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-sound-1',
start: 'top 50%',
end: 'top 50%',
scrub: 0,
// markers: true,
}
});

sec_sound.to('.section-sound', 1, {
onStart: function () {
$('.section-sound').addClass('is-active1')

if (Support.inlineVideo && !isPlay) {
const promise = soundVideo1.play();
promise.then(() => { isPlay = true; })
.catch(error => {
console.error('视频播放失败:', error);
});
}
},
onReverseComplete: function () {
$('.section-sound').removeClass('is-active1')
}
})

}
}

function secsmall() {

const chipVideo1 = MAIN.querySelector('.section-chip .chip-video')
var chip_video_isLoad1 = false


const iceVideo1 = MAIN.querySelector('.section-ice .ice-video')
var ice_video_isLoad1 = false


if (!isMob) {
let sec_small = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-small-1',
start: 'top 10%',
end: 'top 10%',
scrub: 0,
// markers: true,
}
});


sec_small.to('.section-small', 1, {
onStart: function () {
$('.section-small').addClass('is-active1')

if (!ice_video_isLoad1) {
Common.loadVideo(iceVideo1);
ice_video_isLoad1 = true;
}

if (!chip_video_isLoad1) {
Common.loadVideo(chipVideo1);
chip_video_isLoad1 = true;
}

},
onReverseComplete: function () {
$('.section-small').removeClass('is-active1')
}
})







} else {
let sec_small = gsap.timeline({
scrollTrigger: {
trigger: '#trigger-small-1',
start: 'top 12%',
end: 'top 12%',
scrub: 0,
// markers: true,
}
});


sec_small.to('.section-small', 1, {
onStart: function () {
$('.section-small').addClass('is-active1')

if (!ice_video_isLoad1) {
Common.loadVideo(iceVideo1);
ice_video_isLoad1 = true;
}

if (!chip_video_isLoad1) {
Common.loadVideo(chipVideo1);
chip_video_isLoad1 = true;
}
},
onReverseComplete: function () {
$('.section-small').removeClass('is-active1')
}
})





}
}





return {

seccmf: seccmf(),
secdesign: secdesign(),
secbattery: secbattery(),
secdrop: secdrop(),
secwater: secwater(),
secins: secins(),
seccamera: seccamera(),
secai: secai(),
secmagicos: secmagicos(),
secpay: secpay(),
// secchip: secchip(),
secmemory: secmemory(),
seclight: seclight(),

secsound: secsound(),

};
})();



// 弹窗
const Popup = (function () {
class watcher {
constructor(opts) {
this.$data = this.getBaseType(opts.data) === 'Object' ? opts.data : {};
this.$watch = this.getBaseType(opts.watch) === 'Object' ? opts.watch : {};
for (let key in opts.data) {
this.setData(key)
}
}

getBaseType(target) {
const typeStr = Object.prototype.toString.apply(target);
return typeStr.slice(8, -1);
}

setData(_key) {
Object.defineProperty(this, _key, {
get: function () {
return this.$data[_key];
},
set: function (val) {
const oldVal = this.$data[_key];
if (oldVal === val) return val;
this.$data[_key] = val;
this.$watch[_key] && typeof this.$watch[_key] === 'function' && (
this.$watch[_key].call(this, val, oldVal)
);
return val;
},
});
}
}

const
$popup = document.querySelector('.popup'),
$wrapper = $popup.querySelector('.popup-container'),
video_popup = $popup.querySelector('#video-popup'),
$body = HTML.querySelector('body');
let
video_popup_src = '',
video_popup_isPlay = false;

const popup = new watcher({
data: {
index: 0,
},
watch: {
index(nv) {
switch (nv) {
case 0:
if (video_popup_isPlay) {
video_popup.pause();
video_popup.classList.add('close');
video_popup_src = '';
video_popup.setAttribute('src', '');
video_popup.load();
video_popup_isPlay = false;
}
$popup.classList.remove('is-active');
$body.classList.remove('is-overHidden');
Common.removeClassesStartingWith($wrapper, 'is-')
break;
case 1:
video_popup.setAttribute('src', video_popup_src);
video_popup.load();
video_popup.volume = 0.2;
$wrapper.classList.add('is-video');
$popup.classList.add('is-active');
$body.classList.add('is-overHidden');
const promise = video_popup.play();
if (promise !== undefined) {
promise.then(_ => {
video_popup_isPlay = true;
video_popup.classList.remove('close');
})
.catch(error => { });
}
break;
}
}
}
})

const playBtns = document.querySelectorAll('.playBtn');
playBtns.forEach(function (botton) {
botton.addEventListener('click', function () {
currentPosition = window.scrollY;
video_popup_src = isMob ? this.getAttribute('data-video-src-m') : this.getAttribute('data-video-src-p');
// video_popup_src += Support.supportWEBM && isMob ? '.webm' : '.mp4';
video_popup_src += '.mp4';
popup.index = 1;
})
})
const closeBtns = document.querySelectorAll('.popupcloseBtn');
closeBtns.forEach(function (botton) {
botton.addEventListener('click', function () {
window.scrollTo({
top: currentPosition,
behavior: 'auto'
});
popup.index = 0;
})
})
})();





// ga
const GA = function () {
let
productName = PDT_NAME,
sections = document.querySelectorAll('.ga-section'),
currentVideoName,
lang = HTML.getAttribute('lang'),
objs = [],
pageScrolling = false;
// touchMoving = false;


function findParentWithClass(element, className) {
let current = element.parentElement;
while (current) {
if (current.classList.contains(className)) return current;
current = current.parentElement;
}
}

function screen_swipe() {
sections.forEach(function (section, index) {
let position = index + 1;
const title = section.querySelectorAll('.ga-title')[0] || section.getAttribute('data-title') || productName;
let titleName = title.innerHTML || productName;
titleName = titleName.trim().replace(/&nbsp;/g, ' ').replace(/<sup>(.*?)<\/sup>/g, '').replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
const trigger = section.querySelector('#trigger-ga') || section;
let
sectionTop = section.offsetTop,
sectionHeight = section.offsetHeight,
triggerTop = trigger?.offsetTop || 0,
step = sectionTop + triggerTop;
if (section.classList.contains('ga-section-kv')) titleName += ' KV', step = 0;

if (section.classList.contains('ga-section-design')) titleName = 'Design, Down to the Last Detail.';
if (section.classList.contains('ga-section-ins')) titleName = 'Instant AI Button, One-Click Access.';
if (section.classList.contains('ga-section-camera')) titleName = '108MP Ultra-clear AI Camera Your Best Photos, Just a Tap Away.';
if (section.classList.contains('sec-bottom-nodes')) titleName = 'Notes';


// if (section.classList.contains('ga-section-6')) {
//   step = MAIN.querySelector('.section67').offsetTop + MAIN.querySelector('.section6').offsetHeight * 0.6 + triggerTop
// }


objs.push({
position: position,
titleName: titleName,
sectionHeight: sectionHeight,
step: step,
flag: false
})

ScrollTrigger.create({
trigger: trigger,
start: 'top',
end: '+=30%',
// markers: true,
onUpdate: function () {
if (objs[index].flag || pageScrolling) return;
objs[index].flag = true;
// console.log(objs[index].step)
// console.log(objs[index - 1].step)
const step =
index > 0
? objs[index].step - objs[index - 1].step
: 0;


console.log(`${productName}_${objs[index].position}_${objs[index].titleName}_${Math.floor(step)}px`)

try {
if (lang == 'zh-CN') {
window.sendDapData({
'actionCode': 'screen_swipe',
'eventType': '2',
'content': {
'event_name': 'screen_swipe',
'eventLabel': `${productName}_${objs[index].position}_${objs[index].titleName}_${Math.floor(step)}px`,
}
})
} else {
window.dataLayer.push({
'event': 'screen_swipe',
'position': objs[index].position,
'product_name': productName,
'title_name': objs[index].titleName,
'step': Math.floor(step) + 'px'
})
}
} catch (e) { }
},
});
});
}

function video_interaction() {
let videoDuration = 0;

function sendData(videoName, videoStep, position) {
try {
if (lang == 'zh-CN') {
window.sendDapData({
'actionCode': 'video_interaction',
'eventType': '2',
'content': {
'event_name': 'video_interaction',
'eventLabel': `${videoStep}_${productName}_${position}_${videoName}_${videoDuration}s`
}
})
} else {
window.dataLayer.push({
'event': 'video_interaction',
'product_name': productName,
'position': position,
'step': videoStep,
'video_name': videoName,
'video_duration': videoDuration + 's'
})
}
} catch (e) { }
}

function videoStep(video, videoName, position, percent) {
const progress = Math.floor(video.currentTime * 100 / videoDuration);

if (progress >= 0 && progress < 25 && !percent._0) {
sendData(videoName, 'play', position);
sendData(videoName, '0%-24%', position);
percent._0 = true;
} else if (progress >= 25 && progress < 50 && !percent._25) {
sendData(videoName, '25%-49%', position);
percent._25 = true;
} else if (progress >= 50 && progress < 75 && !percent._50) {
sendData(videoName, '50%-74%', position);
percent._50 = true;
} else if (progress >= 75 && progress < 100 && !percent._75) {
sendData(videoName, '75%-100%', position);
percent._75 = true;
}
}

function videoStatus(video, videoName, position) {
video.addEventListener('loadedmetadata', function () {
videoDuration = parseInt(video.duration);

let percent = {
_0: false,
_25: false,
_50: false,
_75: false,
_100: false,
};
video.onpause = function () {
if (video.currentTime == 0 || video.currentTime == videoDuration) return false;
if (!video.classList.contains('close')) sendData(videoName, 'pause', position);
};

video.ontimeupdate = function () {
videoStep(video, videoName, position, percent);
};
})
}

function videoClick(buttonEl, modalEl) {
const
buttons = MAIN.querySelectorAll(buttonEl),
modal = MAIN.querySelector(modalEl),
video = modal.querySelector('video'),
close = modal.querySelector('.popupcloseBtn.is-video') || null;

let position;
buttons.forEach(function (button) {
button.addEventListener('click', function () {
const parent = findParentWithClass(button, 'ga-section');
position = Array.prototype.indexOf.call(MAIN.querySelectorAll('.ga-section'), parent) + 1;
currentVideoName = button.getAttribute('data-ga-video-name');
videoStatus(video, currentVideoName, position);
});
})

close.addEventListener('click', function () {
sendData(currentVideoName, 'close', position);
});
}

videoClick('.playBtn', '.popup .videoWrapper');
}

function gaBtn_click() {
const buttons = document.querySelectorAll('.gaBtn');
buttons.forEach(function (button, index) {
button.addEventListener('click', function () {
let
buttonName = this.getAttribute('data-buttonname') || this.innerHTML.trim().replace(/<sup>(.*?)<\/sup>/g, '').replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, ''),
parent = findParentWithClass(this, 'ga-section'),
position = Array.prototype.indexOf.call(document.querySelectorAll('.ga-section'), parent) + 1,
title = parent.getAttribute('data-title') || this.getAttribute('data-title'),
titleName = title;

// titleName = titleName.trim().replace(/<sup>(.*?)<\/sup>/g, '').replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');

pageScrolling = true;
setTimeout(() => { pageScrolling = false }, 1000);


// console.log(`${productName}_${position}_${titleName}_${buttonName}`)
try {
if (lang == 'zh-CN') {
window.sendDapData({
'actionCode': 'screen_click',
'eventType': '2',
'content': {
'event_name': 'screen_click',
'eventLabel': `${productName}_${position}_${titleName}_${buttonName}`
}
})
} else {
window.dataLayer.push({
'event': 'screen_click',
'position': position,
'title_name': titleName,
'product_name': productName,
'button_name': buttonName
})
}
} catch (e) { }
});
})
}

function kvBuyBtn_click() {
const button = MAIN.querySelector(".kvBuyBtn");
if (!button) return;
button.addEventListener("click", function (e) {
e.stopPropagation();

if (Common.buyButtonHrefHandle) {
const $wrapper = document.querySelector(".width-container"),
malls = $wrapper.querySelectorAll(".mall-img");

if (malls?.length > 0) {
malls.forEach(function (mall) {
let img = mall.querySelector("img"),
src = img.getAttribute("flag");
img.setAttribute("src", src);
});
}
$wrapper.style.display = "flex";
}

let buttonName =
this.getAttribute("button-name").trim() ||
this.innerHTML
.trim()
.replace(/<\/?.+?>/g, "")
.replace(/\s+/g, " ")
.replace(/^\s*|\s*$/g, ""),
parent = findParentWithClass(this, "ga-section"),
position =
Array.prototype.indexOf.call(
MAIN.querySelectorAll(".ga-section"),
parent
) + 1,
_productName = this.getAttribute("data-product-name") || productName;


console.log(`${buttonName}_${position}_${_productName}`)
try {
if (lang == "zh-CN") {
window.sendDapData({
actionCode: "buy",
eventType: "2",
content: {
event_name: "buy",
eventLabel: `${buttonName}_${position}_${_productName}`,
},
});
} else {
window.dataLayer.push({
event: "buy",
button_name: buttonName,
position: position,
product_name: _productName,
});
}
} catch (e) { }
});
}

function cmfBtn_click() {
const buttons = MAIN.querySelectorAll('.cmfBtn');
buttons.forEach(function (button, index) {
button.addEventListener('click', function () {
let
buttonName = this.getAttribute('data-buttonname'),
parent = findParentWithClass(this, 'ga-section'),
position = Array.prototype.indexOf.call(MAIN.querySelectorAll('.ga-section'), parent) + 1,
titleName = `${productName} CMF`;

try {
if (lang == 'zh-CN') {
window.sendDapData({
'actionCode': 'screen_click',
'eventType': '2',
'content': {
'event_name': 'screen_click',
'eventLabel': `${productName}_${position}_${titleName}_${buttonName}`
}
})
} else {
window.dataLayer.push({
event: 'screen_click',
position: position,
title_name: titleName,
product_name: productName,
button_name: buttonName,
});
}
} catch (e) { }
});
})
}

function highlightsBtn_click() {
const buttons = MAIN.querySelectorAll('.highlightsBtn');
buttons.forEach(function (button, index) {
button.addEventListener('click', function (e) {
e.stopPropagation();

let
buttonName = this.querySelectorAll('.subtitle')[0].innerHTML.trim().replace(/<sup>.*?<\/sup>/g, '').replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, ''),
parent = findParentWithClass(this, 'ga-section'),
position = Array.prototype.indexOf.call(MAIN.querySelectorAll('.ga-section'), parent) + 1,
title = parent.querySelectorAll('.ga-title')[0] || this.getAttribute('data-title') || PDT_NAME,
titleName = title.innerHTML || title;
titleName = titleName.trim().replace(/<\/?.+?>/g, '').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');

pageScrolling = true;
setTimeout(() => { pageScrolling = false }, 1000);
const section = this.getAttribute('data-section');
let offsetTop = MAIN.querySelector('.' + section).offsetTop - navHeight - 20;
if (MAIN.querySelector('.' + section).classList.contains('section-snapdragon') && !isMob) offsetTop += screenHeight * 0.9;
window.scrollTo({
top: offsetTop,
behavior: 'smooth',
});

try {
if (lang == 'zh-CN') {
window.sendDapData({
'actionCode': 'screen_click',
'eventType': '2',
'content': {
'event_name': 'screen_click',
'eventLabel': `${productName}_${position}_${titleName}_${buttonName}`
}
})
} else {
window.dataLayer.push({
'event': 'screen_click',
'position': position,
'title_name': titleName,
'product_name': productName,
'button_name': buttonName
})
}
} catch (e) { }
});
})
}

function swiper_touch(section, direction) {
let
position = Array.prototype.indexOf.call(document.querySelectorAll('.ga-section'), section) + 1,
titleName = section.getAttribute('data-title')


try {
if (lang == 'zh-CN') {
let _direction = direction === 'next' ? '向后' : '向前';

// console.log(position ,titleName, productName, _direction)

window.sendDapData({
'actionCode': 'screen_click',
'eventType': '2',
'content': {
'event_name': 'screen_click',
'eventLabel': `${productName}_${position}_${titleName}_拖拽${_direction}`
}
})
} else {
let _direction = direction === 'next' ? 'Next' : 'Prev';

// console.log(position ,titleName, productName, _direction)
window.dataLayer.push({
'event': 'screen_click',
'position': position,
'title_name': titleName,
'product_name': productName,
'button_name': 'Swipe ' + _direction
})
}
} catch (e) { }
}

return {
screen_swipe: screen_swipe(),
// video_interaction: video_interaction(),
gaBtn_click: gaBtn_click(),
kvBuyBtn_click: kvBuyBtn_click(),
// cmfBtn_click: cmfBtn_click(),
// highlightsBtn_click: highlightsBtn_click(),
swiper_touch,
};
}();


});
