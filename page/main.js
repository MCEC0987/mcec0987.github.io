// 内容加载器模块
const TabContentLoader = {
  // 内容模板
  templates: {
    'home.html': `
      <div class="tab-content active">
        <div class="content-card">
          <h2>首页内容</h2>
          <p>这是动态加载的首页内容区域。</p>
          <p>内容通过JavaScript异步加载，实现真正的隔离。</p><iframe 
  src="home.html" 
  width="100%" 
  height="450" 
  frameborder="0" 
  style="border:0;" 
  allowfullscreen 
  title="百度地图">
</iframe>
        </div>
      </div>
    `,
    'category.html': `
      <div class="tab-content active">
        <div class="content-card">
          <h2>分类页面</h2>
          <p>这是动态加载的分类内容区域。</p>
          <ul>
            <li>分类项目 1</li>
            <li>分类项目 2</li>
            <li>分类项目 3</li>
          </ul>
        </div>
      </div>
    `,
    'message.html': `
      <div class="tab-content active">
        <div class="content-card">
          <h2>消息中心</h2>
          <p>这是动态加载的消息内容区域。</p>
          <div style="display: flex; align-items: center; margin: 10px 0;">
            <div style="width: 40px; height: 40px; background: #e5e7eb; border-radius: 50%; margin-right: 10px;"></div>
            <div>
              <div style="font-weight: bold;">系统通知</div>
              <div style="font-size: 12px; color: #6b7280;">您有一条新消息</div>
            </div>
          </div>
        </div>
      </div>
    `,
    'profile.html': `
      <div class="tab-content active">
        <div class="content-card">
          <h2>个人中心</h2>
          <p>这是动态加载的个人中心内容区域。</p>
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
      }, 500); // 模拟网络延迟
    });
  }
};
