// 确保DOM完全加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 进度跟踪器类
    class ProgressTracker {
        constructor() {
            this.totalWeight = 100;
            this.domReadyWeight = 25;
            this.contentWeight = 65;
            this.windowLoadWeight = 10;
            
            this.domReady = false;
            this.contentLoaded = 0;
            this.contentTotal = 0;
            this.windowLoaded = false;
            
            this.stayDuration = 2000;
            this.minimumShowTime = 800;
            this.startTime = Date.now();
            
            this.initTracking();
        }
        
        initTracking() {
            // 初始进度
            this.updateProgress(5);
            
            // 跟踪图片
            this.trackImages();
            
            // 跟踪CSS
            this.trackStylesheets();
            
            // 跟踪脚本
            this.trackScripts();
            
            // DOM就绪
            this.domReady = true;
            this.updateProgress(this.domReadyWeight);
            
            // 窗口加载事件
            window.addEventListener('load', () => {
                this.windowLoaded = true;
                this.updateProgress(this.domReadyWeight + this.contentWeight + this.windowLoadWeight);
                this.complete();
            });
            
            // 确保最终完成
            setTimeout(() => {
                if (!this.windowLoaded) this.complete();
            }, 5000);
        }
        
        trackImages() {
            const images = document.images;
            this.contentTotal += images.length;
            
            for (let i = 0; i < images.length; i++) {
                if (images[i].complete) {
                    this.contentLoaded++;
                } else {
                    images[i].addEventListener('load', this.onContentLoad.bind(this));
                    images[i].addEventListener('error', this.onContentLoad.bind(this));
                }
            }
            this.updateContentProgress();
        }
        
        trackStylesheets() {
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            this.contentTotal += links.length;
            
            links.forEach(link => {
                if (link.sheet) {
                    this.contentLoaded++;
                } else {
                    link.addEventListener('load', this.onContentLoad.bind(this));
                    link.addEventListener('error', this.onContentLoad.bind(this));
                }
            });
            this.updateContentProgress();
        }
        
        trackScripts() {
            const scripts = document.querySelectorAll('script[src]');
            this.contentTotal += scripts.length;
            
            scripts.forEach(script => {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    this.contentLoaded++;
                } else {
                    script.addEventListener('load', this.onContentLoad.bind(this));
                    script.addEventListener('error', this.onContentLoad.bind(this));
                }
            });
            this.updateContentProgress();
        }
        
        onContentLoad() {
            this.contentLoaded++;
            this.updateContentProgress();
        }
        
        updateContentProgress() {
            const contentProgress = this.contentTotal > 0 
                ? (this.contentLoaded / this.contentTotal) * this.contentWeight 
                : this.contentWeight;
            this.updateProgress(this.domReadyWeight + contentProgress);
        }
        
        updateProgress(percent) {
            percent = Math.min(percent, this.totalWeight);
            const progressBar = document.getElementById('progress-bar');
            const percentDisplay = document.getElementById('progress-percent');
            
            if (progressBar) {
                progressBar.style.width = percent + '%';
            }
            if (percentDisplay) {
                percentDisplay.textContent = Math.round(percent) + '%';
            }
        }
        
        complete() {
            // 确保至少显示最小时间
            const elapsed = Date.now() - this.startTime;
            const remaining = Math.max(0, this.minimumShowTime - elapsed);
            
            setTimeout(() => {
                this.updateProgress(this.totalWeight);
                const container = document.getElementById('progress-container');
                if (container) {
                    container.classList.add('complete');
                    
                    setTimeout(() => {
                        container.classList.add('hide');
                        
                        setTimeout(() => {
                            container.style.display = 'none';
                        }, 600);
                    }, this.stayDuration);
                }
            }, remaining);
        }
    }
    
    // 初始化跟踪器
    const tracker = new ProgressTracker();
});