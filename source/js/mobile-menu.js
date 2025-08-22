document.addEventListener('DOMContentLoaded', function() {
  // 移动端菜单切换
  const menuButton = document.getElementById('mobile-menu-button');
  const mainMenu = document.getElementById('main-menu');
  
  if (menuButton && mainMenu) {
    menuButton.addEventListener('click', function() {
      mainMenu.classList.toggle('active');
      // 切换图标（菜单/关闭）
      const icon = menuButton.querySelector('.icon');
      if (mainMenu.classList.contains('active')) {
        icon.classList.remove('icon-menu');
        icon.classList.add('icon-close');
      } else {
        icon.classList.remove('icon-close');
        icon.classList.add('icon-menu');
      }
    });
  }
  
  // 点击页面其他区域关闭菜单
  document.addEventListener('click', function(event) {
    if (mainMenu && mainMenu.classList.contains('active') && 
        !menuButton.contains(event.target) && 
        !mainMenu.contains(event.target)) {
      mainMenu.classList.remove('active');
      const icon = menuButton.querySelector('.icon');
      icon.classList.remove('icon-close');
      icon.classList.add('icon-menu');
    }
  });
});
