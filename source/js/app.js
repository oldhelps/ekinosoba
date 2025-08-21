/* eslint-disable */
var customSearch;

"use strict";
const scrollCorrection = 70; // (header height = 50px) + (gap = 20px)
function scrolltoElement(elem, correction) {
  correction = correction || scrollCorrection;
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

function setHeader() {
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
  } else {
    comment.parentNode.removeChild(comment);
  }

  const tocTarget = wrapper.querySelector('.toc-wrapper');
  if (tocTarget && tocTarget.children.length) {
    toc.addEventListener('click', e => {
      e.stopPropagation();
      tocTarget.classList.toggle('active');
    });
  } else {
    toc.parentNode.removeChild(toc);
  }

  top.addEventListener('click', () => scrolltoElement(document.body));
}

function setHeaderMenu() {
  const headerMenu = document.querySelector('header .menu');
  const underline = headerMenu.querySelector('.underline');
  function setUnderline(item, transition) {
    item = item || headerMenu.querySelector('li a.active');
    transition = transition === undefined ? true : !!transition;
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

function setHeaderMenuPhone() {
  const switcher = document.querySelector('.l_header .switcher .s-menu');
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

function setHeaderSearch() {
  const switcher = document.querySelector('.l_header .switcher .s-search');
  const header = document.querySelector('.l_header');
  const search = document.querySelector('.l_header .m_search');
  if (!switcher) return;
  switcher.addEventListener('click', e => {
    e.stopPropagation();
    header.classList.toggle('z_search-open');
    search.querySelector('input').focus();
  });
  document.addEventListener('click', () => {
    header.classList.remove('z_search-open');
  });
  search.addEventListener('click', e => {
    e.stopPropagation();
  });
}

function setWaves() {
  Waves.attach('.flat-btn', ['waves-button']);
  Waves.attach('.float-btn', ['waves-button', 'waves-float']);
  Waves.attach('.float-btn-light', ['waves-button', 'waves-float', 'waves-light']);
  Waves.attach('.flat-box', ['waves-block']);
  Waves.attach('.float-box', ['waves-block', 'waves-float']);
  Waves.attach('.waves-image');
  Waves.init();
}

function setScrollReveal() {
  const reveal = document.querySelectorAll('.reveal');
  if (reveal.length === 0) return;
  const sr = ScrollReveal({ distance: 0 });
  sr.reveal('.reveal');
}

function setTocToggle() {
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
    return target ? Math.floor(target.getBoundingClientRect().top + window.pageYOffset - scrollCorrection) : 0;
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

// $(function () { ... }) 替换为 DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  setHeader();
  setHeaderMenu();
  setHeaderMenuPhone();
  setHeaderSearch();
  setWaves();
  setScrollReveal();
  setTocToggle();
  // getHitokoto();
  // getPicture();

  // fitVids 替换
  document.querySelectorAll(".article .video-container").forEach(container => {
    if (typeof fitVids === 'function') fitVids(container);
  });

  setTimeout(function () {
    const loadingBar = document.getElementById('loading-bar-wrapper');
    if (loadingBar) {
      loadingBar.style.transition = 'opacity 0.5s';
      loadingBar.style.opacity = 0;
      setTimeout(() => loadingBar.style.display = 'none', 500);
    }
  }, 300);

  if (typeof SEARCH_SERVICE !== 'undefined') {
    if (SEARCH_SERVICE === 'google') {
      customSearch = new GoogleCustomSearch({
        apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
        engineId: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
        imagePath: "/images/"
      });
    }
    else if (SEARCH_SERVICE === 'algolia') {
      customSearch = new AlgoliaSearch({
        apiKey: ALGOLIA_API_KEY,
        appId: ALGOLIA_APP_ID,
        indexName: ALGOLIA_INDEX_NAME,
        imagePath: "/images/"
      });
    }
    else if (SEARCH_SERVICE === 'hexo') {
      customSearch = new HexoSearch({
        imagePath: "/images/"
      });
    }
    else if (SEARCH_SERVICE === 'azure') {
      customSearch = new AzureSearch({
        serviceName: AZURE_SERVICE_NAME,
        indexName: AZURE_INDEX_NAME,
        queryKey: AZURE_QUERY_KEY,
        imagePath: "/images/"
      });
    }
    else if (SEARCH_SERVICE === 'baidu') {
      customSearch = new BaiduSearch({
        apiId: BAIDU_API_ID,
        imagePath: "/images/"
      });
    }
  }
});