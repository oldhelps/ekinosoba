document.addEventListener('DOMContentLoaded', function() {
    const navigationDrawer = document.getElementById('navigationDrawer');
    const menuButton = document.querySelector('mdui-top-app-bar mdui-button-icon[icon="menu"]');
    const closeButton = document.querySelector('.close-drawer-btn');
    
    // 打开抽屉栏
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            navigationDrawer.open = true;
        });
    }
    
    // 关闭抽屉栏
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            navigationDrawer.open = false;
        });
    }
    
    // ESC键关闭抽屉栏
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navigationDrawer.open) {
            navigationDrawer.open = false;
        }
    });
    
    // 点击导航项时关闭抽屉栏
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            setTimeout(() => {
                navigationDrawer.open = false;
            }, 300);
        });
    });
});