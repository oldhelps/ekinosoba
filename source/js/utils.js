// 通用工具函数

export const scrollCorrection = 70; // (header height = 50px) + (gap = 20px)

export function scrolltoElement(elem, correction = scrollCorrection) {
  let target;
  if (elem.href) {
    target = document.querySelector(elem.getAttribute('href'));
  } else {
    target = elem;
  }
  if (!target) return;
  const targetY = target.getBoundingClientRect().top + window.pageYOffset - correction;
  window.scrollTo({
    top: targetY,
    behavior: 'smooth'
  });
}

// DOMContentLoaded 包装器
export function onDOMContentLoaded(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}