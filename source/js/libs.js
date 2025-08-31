// 第三方库初始化模块

// 设置Waves效果
export function setWaves() {
  if (typeof Waves !== 'undefined') {
    Waves.attach('.flat-btn', ['waves-button']);
    Waves.attach('.float-btn', ['waves-button', 'waves-float']);
    Waves.attach('.float-btn-light', ['waves-button', 'waves-float', 'waves-light']);
    Waves.attach('.flat-box', ['waves-block']);
    Waves.attach('.float-box', ['waves-block', 'waves-float']);
    Waves.attach('.waves-image');
    Waves.init();
  }
}

// 设置ScrollReveal效果
export function setScrollReveal() {
  const reveal = document.querySelectorAll('.reveal');
  if (reveal.length === 0 || typeof ScrollReveal === 'undefined') return;
  
  const sr = ScrollReveal({ distance: 0 });
  sr.reveal('.reveal');
}