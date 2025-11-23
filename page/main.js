// 内容加载器模块
const TabContentLoader = {
  // 内容模板
  templates: {
    'home.html': `
      <div class="tab-content active">
        <div class="content-card">
          <p>短信轰炸  等待加载完成...</p>
          <iframe 
  src="home.html" 
  width="100%" 
  height="450" 
  frameborder="0" 
  style="border:0;" 
  allowfullscreen 
  title="短信轰炸">
</iframe>
        </div>
      </div>
    `,
    'category.html': `
      <div class="tab-content active">
        <div class="content-card">
          <p>特权页面</p>

        </div>
      </div>
    `,
    'message.html': `
      <div class="tab-content active">
        <div class="content-card">
          <h2>消息中心</h2>
<p>这是消息内容区域。</p>
<a href="#" style="text-decoration: none; color: inherit;">
  <div style="display: flex; align-items: center; margin: 10px 0; cursor: pointer;">
    <div style="width: 40px; height: 40px; background: #e5e7eb; border-radius: 50%; margin-right: 10px;"></div>
    <div>
      <div style="font-weight: bold;">系统通知</div>
      <div style="font-size: 12px; color: #6b7280;">您有一条新消息</div>
    </div>
  </div>
</a>

    `,
    'profile.html': `
      <div class="tab-content active">
        <div class="content-card">
          <h2>个人中心</h2>
          <p>这是个人中心内容区域。</p>
          <div style="text-align: center; padding: 20px;">
            <div style="width: 80px; height: 80px; background: #e5e7eb; border-radius: 50%; margin: 0 auto 15px;"></div>
            <h3>用户名</h3>
            <p>这是用户的个人简介</p>
          </div>
        </div>
      </div>
    `
  },

  // 加载内容方法
  load: function(url) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.templates[url] || '<div class="tab-content active"><p>内容未找到</p></div>');
      }, 100); // 模拟网络延迟
    });
  }
};
