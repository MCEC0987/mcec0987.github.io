// 检测用户是否使用移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 创建提示元素
function createMobilePrompt() {
    // 如果已经是移动设备，则不显示提示
    if (isMobileDevice()) return;
    
    // 创建提示元素
    const prompt = document.createElement('div');
    prompt.innerHTML = '为了保证最佳浏览体验请使用手机打开本站<span style="margin-left:15px;cursor:pointer;">&times;</span>';
    
    // 设置样式
    prompt.style.position = 'fixed';
    prompt.style.bottom = '0';
    prompt.style.left = '0';
    prompt.style.right = '0';
    prompt.style.backgroundColor = '#ff5252';
    prompt.style.color = 'white';
    prompt.style.padding = '15px';
    prompt.style.textAlign = 'center';
    prompt.style.fontSize = '16px';
    prompt.style.zIndex = '9999';
    prompt.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.2)';
    prompt.style.fontFamily = 'Arial, "Microsoft YaHei", sans-serif';
    
    // 添加关闭功能
    prompt.querySelector('span').onclick = function() {
        prompt.style.display = 'none';
    };
    
    // 添加到body中
    document.body.appendChild(prompt);
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', createMobilePrompt);