/**
 * 广告点击等待跳转功能
 * 1. 点击广告后显示等待提示
 * 2. 显示进度条动画
 * 3. 等待指定时间后跳转
 */

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 获取等待提示条元素
  const waitingBar = document.getElementById('waitingBar');
  const waitingProgress = document.querySelector('.waitingProgress');
  const waitingText = document.querySelector('.waitingText');
  
  // 存储当前活动的计时器和目标URL
  let activeTimer = null;
  let targetUrl = '';
  
  /**
   * 显示等待提示
   * @param {number} waitTime - 需要等待的时间(毫秒)
   */
  function showWaitingBar(waitTime) {
    // 显示等待条和文本
    waitingBar.style.display = 'block';
    waitingText.style.display = 'block';
    
    // 重置进度条
    waitingProgress.style.width = '0';
    
    // 开始进度条动画
    let startTime = Date.now();
    const interval = 50; // 更新频率(毫秒)
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / waitTime, 1);
      waitingProgress.style.width = `${progress * 100}%`;
      
      if (progress < 1) {
        setTimeout(updateProgress, interval);
      }
    };
    
    updateProgress();
  }
  
  /**
   * 隐藏等待提示
   */
  function hideWaitingBar() {
    waitingBar.style.display = 'none';
    waitingText.style.display = 'none';
  }
  
  /**
   * 处理广告点击事件
   * @param {Event} e - 点击事件对象
   * @param {HTMLElement} element - 被点击的元素
   */
  function handleAdClick(e, element) {
    e.preventDefault(); // 阻止默认跳转行为
    
    // 如果已有活动计时器，则忽略新点击
    if (activeTimer) {
      return;
    }
    
    // 获取等待时间(从data-wait属性获取，默认2000毫秒)
    const waitTime = parseInt(element.getAttribute('data-wait')) || 2000;
    targetUrl = element.getAttribute('href');
    
    // 显示等待提示
    showWaitingBar(waitTime);
    
    // 设置定时器，在等待时间结束后跳转
    activeTimer = setTimeout(() => {
      window.open(targetUrl, '_blank');
      hideWaitingBar();
      activeTimer = null;
    }, waitTime);
  }
  
  // 为所有广告元素添加点击事件监听
  document.querySelectorAll('.ripple').forEach(function(element) {
    // 点击事件 - 处理跳转等待
    element.addEventListener('click', function(e) {
      handleAdClick(e, this);
    });
    
    // 涟漪效果
    element.addEventListener('click', function(e) {
      // 移除旧的涟漪元素
      const oldRipple = this.querySelector('.jsRipple');
      if (oldRipple) {
        oldRipple.remove();
      }
      
      // 创建新的涟漪元素
      const ripple = document.createElement('span');
      ripple.classList.add('jsRipple');
      
      // 计算位置和大小
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      // 设置涟漪样式
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      // 添加到按钮中
      this.appendChild(ripple);
      
      // 动画结束后移除
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // 添加额外的广告效果：轮播自动切换
  let currentAd = 1;
  const maxAds = 6;
  
  function rotateAds() {
    document.querySelectorAll('.textAdItem').forEach(item => {
      item.style.opacity = '0.7';
      item.style.transform = 'scale(0.95)';
    });
    
    const currentElement = document.querySelector(`.ad${currentAd}`);
    if (currentElement) {
      currentElement.style.opacity = '1';
      currentElement.style.transform = 'scale(1)';
      currentElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    }
    
    currentAd = currentAd % maxAds + 1;
  }
  
  // 每3秒切换一次高亮广告
  setInterval(rotateAds, 3000);
  rotateAds(); // 初始调用
  
  // 点击页面其他区域取消等待
  document.addEventListener('click', function(e) {
    // 如果点击的不是广告元素且有活动计时器
    if (!e.target.closest('.ripple') && activeTimer) {
      clearTimeout(activeTimer);
      activeTimer = null;
      hideWaitingBar();
    }
  });
});