// 应用主入口文件
import { onDOMContentLoaded } from './utils.js';
import { setHeader, setHeaderMenu, setHeaderMenuPhone, setHeaderSearch } from './header.js';
import { setTocToggle } from './toc.js';
import { setWaves, setScrollReveal } from './libs.js';

// 声明全局变量
let customSearch;

// DOM加载完成后初始化应用
onDOMContentLoaded(function () {
  // 初始化头部相关功能
  setHeader();
  setHeaderMenu();
  setHeaderMenuPhone();
  setHeaderSearch();
  
  // 初始化第三方库
  setWaves();
  setScrollReveal();
  
  // 初始化目录功能
  setTocToggle();
  
  // 注释掉的功能
  // getHitokoto();
  // getPicture();

  // fitVids 替换
  document.querySelectorAll('.article .video-container').forEach(container => {
    if (typeof fitVids === 'function') fitVids(container);
  });

  // 隐藏加载条
  setTimeout(function () {
    const loadingBar = document.getElementById('loading-bar-wrapper');
    if (loadingBar) {
      loadingBar.style.transition = 'opacity 0.5s';
      loadingBar.style.opacity = 0;
      setTimeout(() => loadingBar.style.display = 'none', 500);
    }
  }, 300);

  // 初始化搜索服务
  if (typeof SEARCH_SERVICE !== 'undefined') {
    if (SEARCH_SERVICE === 'google') {
      customSearch = new GoogleCustomSearch({
        apiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
        engineId: GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
        imagePath: '/images/'
      });
    }
    else if (SEARCH_SERVICE === 'algolia') {
      customSearch = new AlgoliaSearch({
        apiKey: ALGOLIA_API_KEY,
        appId: ALGOLIA_APP_ID,
        indexName: ALGOLIA_INDEX_NAME,
        imagePath: '/images/'
      });
    }
    else if (SEARCH_SERVICE === 'hexo') {
      customSearch = new HexoSearch({
        imagePath: '/images/'
      });
    }
    else if (SEARCH_SERVICE === 'azure') {
      customSearch = new AzureSearch({
        serviceName: AZURE_SERVICE_NAME,
        indexName: AZURE_INDEX_NAME,
        queryKey: AZURE_QUERY_KEY,
        imagePath: '/images/'
      });
    }
    else if (SEARCH_SERVICE === 'baidu') {
      customSearch = new BaiduSearch({
        apiId: BAIDU_API_ID,
        imagePath: '/images/'
      });
    }
  }
});