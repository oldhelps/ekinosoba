// 目录相关功能模块
import { scrolltoElement } from './utils.js';

// 设置目录切换
export function setTocToggle() {
  const toc = document.querySelector('.toc-wrapper');
  if (!toc) return;

  toc.addEventListener('click', e => {
    e.stopPropagation();
    toc.classList.add('active');
  });

  document.addEventListener('click', () => toc.classList.remove('active'));

  toc.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      e.stopPropagation();
      scrolltoElement(e.target);
    }
  });

  const liElements = Array.from(toc.querySelectorAll('li a'));
  const getAnchor = () => liElements.map(elem => {
    const target = document.querySelector(elem.getAttribute('href'));
    return target ? Math.floor(target.getBoundingClientRect().top + window.pageYOffset - 70) : 0;
  });

  let anchor = getAnchor();
  function scrollListener() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (!anchor) return;
    let l = 0, r = anchor.length - 1, mid;
    while (l < r) {
      mid = (l + r + 1) >> 1;
      if (anchor[mid] === scrollTop) l = r = mid;
      else if (anchor[mid] < scrollTop) l = mid;
      else r = mid - 1;
    }
    liElements.forEach((el, idx) => el.classList.toggle('active', idx === l));
  }

  window.addEventListener('resize', () => {
    anchor = getAnchor();
    scrollListener();
  });

  window.addEventListener('scroll', scrollListener);
  scrollListener();
}