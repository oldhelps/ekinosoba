hljs.highlightAll();

// 添加复制按钮到代码块
function addCopyButtons() {
    // 查找所有代码块容器
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        // 检查是否已经添加了复制按钮
        if (codeBlock.closest('.code-block-wrapper')) {
            return; // 已经处理过，跳过
        }
        
        // 创建复制按钮
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="material-icons">content_copy</i>';
        copyButton.title = '复制代码';
        
        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'code-block-header';
        buttonContainer.appendChild(copyButton);
        
        // 获取 pre 元素（code 的父元素）
        const preElement = codeBlock.parentElement;
        
        // 创建包装容器
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        
        // 将 pre 元素插入到包装容器中
        preElement.parentNode.insertBefore(wrapper, preElement);
        wrapper.appendChild(buttonContainer);
        wrapper.appendChild(preElement);
        
        // 添加点击事件处理程序
        copyButton.addEventListener('click', function() {
            // 获取代码文本（去除可能的行号等额外内容）
            const codeText = codeBlock.textContent;
            
            // 使用 Clipboard API 复制文本
            navigator.clipboard.writeText(codeText).then(function() {
                // 复制成功，更改按钮状态
                const originalHTML = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="material-icons">check</i>';
                copyButton.title = '已复制';
                
                // 2秒后恢复原始状态
                setTimeout(function() {
                    copyButton.innerHTML = originalHTML;
                    copyButton.title = '复制代码';
                }, 2000);
            }).catch(function(err) {
                console.error('复制失败: ', err);
            });
        });
    });
}

// 在Highlight.js处理后添加复制按钮
hljs.highlightAll();
document.addEventListener('DOMContentLoaded', function() {
    addCopyButtons();
});

// 为了确保在页面加载完成后执行
window.addEventListener('load', function() {
    addCopyButtons();
});