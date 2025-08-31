// 头部相关功能模块
import { scrolltoElement } from './utils.js';

// 设置头部导航
export function setHeader() {
  if (!window.subData) return;
  const wrapper = document.querySelector('header .wrapper');
  const comment = wrapper.querySelector('.s-comment');
  const toc = wrapper.querySelector('.s-toc');
  const top = wrapper.querySelector('.s-top');

  wrapper.querySelector('.nav-sub .logo').textContent = window.subData.title;
  let pos = document.body.scrollTop || document.documentElement.scrollTop;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const del = scrollTop - pos;
    if (del >= 20) {
      pos = scrollTop;
      wrapper.classList.add('sub');
    } else if (del <= -20) {
      pos = scrollTop;
      wrapper.classList.remove('sub');
    }
  });

  const commentTarget = document.getElementById('comments');
  if (commentTarget) {
    comment.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      scrolltoElement(commentTarget);
    });
  } else if (comment) {
    comment.parentNode.removeChild(comment);
  }

  const tocTarget = wrapper.querySelector('.toc-wrapper');
  if (tocTarget && tocTarget.children.length) {
    toc.addEventListener('click', e => {
      e.stopPropagation();
      tocTarget.classList.toggle('active');
    });
  } else if (toc) {
    toc.parentNode.removeChild(toc);
  }

  if (top) {
    top.addEventListener('click', () => scrolltoElement(document.body));
  }
}

// 设置头部菜单
export function setHeaderMenu() {
  const headerMenu = document.querySelector('header .menu');
  const underline = headerMenu?.querySelector('.underline');
  if (!headerMenu || !underline) return;

  function setUnderline(item, transition = true) {
    item = item || headerMenu.querySelector('li a.active');
    if (!transition) underline.classList.add('disable-trans');
    if (item) {
      item.classList.add('active');
      Array.from(item.parentNode.parentNode.children).forEach(li => {
        if (li !== item.parentNode) {
          const a = li.querySelector('a');
          if (a) a.classList.remove('active');
        }
      });
      underline.style.left = item.offsetLeft + 'px';
      underline.style.width = item.offsetWidth + 'px';
    } else {
      underline.style.left = '0';
      underline.style.width = '0';
    }
    if (!transition) {
      setTimeout(() => underline.classList.remove('disable-trans'), 0);
    }
  }

  headerMenu.addEventListener('mouseenter', e => {
    const li = e.target.closest('li');
    if (li) {
      const a = li.querySelector('a');
      if (a) setUnderline(a);
    }
  }, true);

  headerMenu.addEventListener('mouseleave', () => {
    setUnderline();
  });

  let active_link = null;
  if (location.pathname === '/' || location.pathname.startsWith('/page/')) {
    active_link = headerMenu.querySelector('.nav-home');
  } else {
    const name = location.pathname.match(/\/(.*?)\//);
    if (name && name.length > 1) {
      active_link = headerMenu.querySelector('.nav-' + name[1]);
    }
  }
  setUnderline(active_link, false);
}

// 设置移动端菜单
export function setHeaderMenuPhone() {
  const switcher = document.querySelector('.l_header .switcher .s-menu');
  if (!switcher) return;

  switcher.addEventListener('click', e => {
    e.stopPropagation();
    document.body.classList.toggle('z_menu-open');
    switcher.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    document.body.classList.remove('z_menu-open');
    switcher.classList.remove('active');
  });
}

// 设置头部搜索
export function setHeaderSearch() {
  const switcher = document.querySelector('.l_header .switcher .s-search');
  const header = document.querySelector('.l_header');
  const search = document.querySelector('.l_header .m_search');
  if (!switcher || !header || !search) return;

  switcher.addEventListener('click', e => {
    e.stopPropagation();
    header.classList.toggle('z_search-open');
    search.querySelector('input')?.focus();
  });

  document.addEventListener('click', () => {
    header.classList.remove('z_search-open');
  });

  search.addEventListener('click', e => {
    e.stopPropagation();
  });
}