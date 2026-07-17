class RunoobTutorial {
    constructor(options) {
        this.language = options.language;
        this.title = options.title;
        this.subtitle = options.subtitle;
        this.chapters = [];
        
        this.prefixes = {
            progress: `${this.language}_progress`,
            notes: `${this.language}_notes`
        };
        
        this.init();
    }
    
    async init() {
        await this.loadChapters();
        this.render();
        this.bindEvents();
        this.loadProgress();
        this.loadNotes();
        this.showChapter(1);
    }
    
    async loadChapters() {
        const dataKey = 'TUTORIAL_DATA_' + this.language.replace(/-/g, '_');
        
        if (window[dataKey]) {
            this.chapters = window[dataKey];
            return;
        }

        if (window.location.protocol === 'file:') {
            console.error('file:// 协议下请先引入 data/tutorial-' + this.language + '.data.js');
            this.chapters = [];
            return;
        }

        try {
            const response = await fetch(`data/tutorial-${this.language}.json`);
            this.chapters = await response.json();
        } catch (e) {
            console.error('加载章节数据失败:', e);
            this.chapters = [];
        }
    }
    
    escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;');
    }
    
    render() {
        document.body.innerHTML = `
            <!-- 顶部导航 -->
            <nav class="top-nav">
                <div class="nav-container">
                    <a href="index.html" class="logo">
                        📚 编程<span>教程</span>
                    </a>
                    <div class="nav-menu">
                        <a href="index.html" class="nav-item">首页</a>
                        <a href="tutorial-python.html" class="nav-item ${this.language === 'python' ? 'active' : ''}">Python</a>
                        <a href="tutorial-java.html" class="nav-item ${this.language === 'java' ? 'active' : ''}">Java</a>
                        <a href="tutorial-javascript.html" class="nav-item ${this.language === 'javascript' ? 'active' : ''}">JavaScript</a>
                        <a href="tutorial-cpp.html" class="nav-item ${this.language === 'cpp' ? 'active' : ''}">C/C++</a>
                        <a href="tutorial-csharp.html" class="nav-item ${this.language === 'csharp' ? 'active' : ''}">C#</a>
                        <a href="tutorial-go.html" class="nav-item ${this.language === 'go' ? 'active' : ''}">Go</a>
                        <a href="tutorial-php.html" class="nav-item ${this.language === 'php' ? 'active' : ''}">PHP</a>
                        <a href="tutorial-rust.html" class="nav-item ${this.language === 'rust' ? 'active' : ''}">Rust</a>
                        <a href="tutorial-swift.html" class="nav-item ${this.language === 'swift' ? 'active' : ''}">Swift</a>
                    </div>
                    <div class="nav-search">
                        <input type="text" id="searchInput" placeholder="搜索教程..." oninput="tutorial.search()">
                    </div>
                </div>
            </nav>
            
            <!-- 进度条 -->
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
                <div class="progress-text" id="progressText">学习进度: 0%</div>
            </div>
            
            <!-- 主内容区 -->
            <div class="main-wrapper">
                <!-- 左侧边栏 -->
                <aside class="sidebar">
                    <div class="sidebar-header">
                        ${this.title} 目录
                    </div>
                    <nav class="sidebar-menu" id="sidebarMenu">
                        ${this.renderSidebar()}
                    </nav>
                </aside>
                
                <!-- 右侧内容区 -->
                <main class="content-area" id="contentArea">
                    ${this.renderContent()}
                </main>
            </div>
            
            <!-- Toast提示 -->
            <div class="toast" id="toast"></div>
        `;
    }
    
    renderSidebar() {
        let html = '';
        let currentCategory = '';
        
        this.chapters.forEach((ch, index) => {
            // 每10章分一个类别
            const categoryIndex = Math.floor(index / 10);
            const categoryName = this.getCategoryName(categoryIndex);
            
            if (categoryName !== currentCategory) {
                html += `<div class="sidebar-category">${categoryName}</div>`;
                currentCategory = categoryName;
            }
            
            html += `
                <a href="javascript:void(0)" class="sidebar-item" id="menu_${ch.id}" onclick="tutorial.showChapter(${ch.id})">
                    ${ch.id}. ${ch.t}
                </a>
            `;
        });
        
        return html;
    }
    
    getCategoryName(index) {
        const categories = ['基础入门', '进阶提升', '高级应用'];
        return categories[index] || '更多内容';
    }
    
    renderContent() {
        return this.chapters.map(ch => `
            <div class="chapter-content" id="chapter_${ch.id}">
                <div class="tutorial-header">
                    <h1>${ch.t}</h1>
                    <div class="meta">
                        <span>📖 第 ${ch.id} 章</span>
                        <span>⏱️ 预计学习时间：15分钟</span>
                        <span id="status_${ch.id}">⭕ 未完成</span>
                    </div>
                </div>
                
                ${ch.p && ch.p.length > 0 ? `
                <h2 class="chapter-title">知识点</h2>
                <ul class="knowledge-list">
                    ${ch.p.map(p => `<li>${p}</li>`).join('')}
                </ul>` : ''}
                
                ${ch.c ? `
                <h2 class="chapter-title">代码示例</h2>
                <div class="code-container">
                    <div class="code-header">
                        <span class="lang">${this.language}</span>
                        <div class="actions">
                            <button class="code-btn" onclick="tutorial.copyCode('code_${ch.id}')">📋 复制代码</button>
                        </div>
                    </div>
                    <div class="code-body">
                        <pre><code id="code_${ch.id}">${this.escapeHtml(ch.c)}</code></pre>
                    </div>
                </div>` : ''}
                
                ${ch.et ? `
                <h2 class="chapter-title">常见错误</h2>
                <div class="error-block">
                    <h4>${ch.et}</h4>
                    <pre><code>${this.escapeHtml(ch.ec || '')}</code></pre>
                </div>` : ''}
                
                ${ch.q && ch.q.length > 0 ? `
                <h2 class="chapter-title">练习题</h2>
                <div class="quiz-section">
                    <h4>📝 本节练习</h4>
                    ${ch.q.map((q, idx) => `
                        <div class="quiz-item">
                            <p>${typeof q === 'object' ? q.q : q}</p>
                            ${typeof q === 'object' ? `
                            <input type="text" class="quiz-input" id="answer_${ch.id}_${idx}" placeholder="请输入你的答案...">
                            <div class="btn-group">
                                <button class="btn btn-primary" onclick="tutorial.checkAnswer(${ch.id}, ${idx})">检查答案</button>
                                <button class="btn btn-secondary" onclick="tutorial.showAnswer(${ch.id}, ${idx})">查看答案</button>
                            </div>
                            <div class="quiz-result" id="result_${ch.id}_${idx}"></div>
                            <div class="answer-section" id="answer_section_${ch.id}_${idx}">
                                <strong>参考答案：</strong>
                                <pre>${this.escapeHtml(q.a || '')}</pre>
                            </div>` : ''}
                        </div>
                    `).join('')}
                </div>` : ''}
                
                <h2 class="chapter-title">学习笔记</h2>
                <div class="note-section">
                    <textarea class="note-textarea" id="note_${ch.id}" placeholder="在这里记录你的学习笔记..." oninput="tutorial.saveNote(${ch.id})"></textarea>
                </div>
                
                <div class="btn-group">
                    <button class="btn btn-success" onclick="tutorial.markComplete(${ch.id})">✅ 标记为已完成</button>
                </div>
                
                <div class="chapter-nav">
                    <button class="nav-btn" onclick="tutorial.prevChapter()" ${ch.id === 1 ? 'disabled' : ''}>⬅ 上一章</button>
                    <button class="nav-btn" onclick="tutorial.nextChapter()" ${ch.id === this.chapters.length ? 'disabled' : ''}>下一章 ➡</button>
                </div>
            </div>
        `).join('');
    }
    
    updateProgress() {
        const progress = this.getProgress();
        const total = this.chapters.length;
        const completed = progress.length;
        const percent = Math.round((completed / total) * 100);
        
        const fill = document.getElementById('progressFill');
        const text = document.getElementById('progressText');
        if (fill) fill.style.width = percent + '%';
        if (text) text.textContent = '学习进度: ' + percent + '% (' + completed + '/' + total + ')';
    }
    
    showChapter(id) {
        // 隐藏所有章节
        document.querySelectorAll('.chapter-content').forEach(el => {
            el.classList.remove('active');
        });
        
        // 显示当前章节
        const chapter = document.getElementById('chapter_' + id);
        if (chapter) {
            chapter.classList.add('active');
        }
        
        // 更新菜单状态
        document.querySelectorAll('.sidebar-item').forEach(el => {
            el.classList.remove('active');
        });
        
        const menuItem = document.getElementById('menu_' + id);
        if (menuItem) {
            menuItem.classList.add('active');
        }
        
        this.currentChapter = id;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.updateProgress();
    }
    
    prevChapter() {
        if (this.currentChapter > 1) {
            this.showChapter(this.currentChapter - 1);
        }
    }
    
    nextChapter() {
        if (this.currentChapter < this.chapters.length) {
            this.showChapter(this.currentChapter + 1);
        }
    }
    
    copyCode(id) {
        const code = document.getElementById(id)?.textContent || '';
        navigator.clipboard.writeText(code).then(() => {
            this.showToast('代码已复制到剪贴板！');
        });
    }
    
    checkAnswer(chId, qIdx) {
        const input = document.getElementById('answer_' + chId + '_' + qIdx);
        const result = document.getElementById('result_' + chId + '_' + qIdx);
        const chapter = this.chapters.find(c => c.id === chId);
        
        if (!input || !result || !chapter) return;
        
        const userAnswer = input.value.trim();
        const correctAnswer = chapter.q[qIdx]?.a || '';
        
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            result.className = 'quiz-result correct';
            result.textContent = '✅ 回答正确！';
        } else {
            result.className = 'quiz-result incorrect';
            result.textContent = '❌ 回答不正确，请再想想。';
        }
    }
    
    showAnswer(chId, qIdx) {
        const section = document.getElementById('answer_section_' + chId + '_' + qIdx);
        if (section) {
            section.classList.toggle('show');
        }
    }
    
    markComplete(id) {
        const progress = this.getProgress();
        if (!progress.includes(id)) {
            progress.push(id);
            localStorage.setItem(this.prefixes.progress, JSON.stringify(progress));
        }
        
        const statusEl = document.getElementById('status_' + id);
        if (statusEl) {
            statusEl.textContent = '✅ 已完成';
            statusEl.style.color = '#10b981';
        }
        
        const menuEl = document.getElementById('menu_' + id);
        if (menuEl) {
            menuEl.classList.add('completed');
        }
        
        this.showToast('恭喜！已完成本章学习！');
    }
    
    getProgress() {
        const stored = localStorage.getItem(this.prefixes.progress);
        return stored ? JSON.parse(stored) : [];
    }
    
    loadProgress() {
        const progress = this.getProgress();
        progress.forEach(id => {
            const statusEl = document.getElementById('status_' + id);
            if (statusEl) {
                statusEl.textContent = '✅ 已完成';
                statusEl.style.color = '#10b981';
            }
            
            const menuEl = document.getElementById('menu_' + id);
            if (menuEl) {
                menuEl.classList.add('completed');
            }
        });
    }
    
    saveNote(id) {
        const notes = this.getNotes();
        const textarea = document.getElementById('note_' + id);
        if (textarea) {
            notes[id] = textarea.value;
            localStorage.setItem(this.prefixes.notes, JSON.stringify(notes));
        }
    }
    
    getNotes() {
        const stored = localStorage.getItem(this.prefixes.notes);
        return stored ? JSON.parse(stored) : {};
    }
    
    loadNotes() {
        const notes = this.getNotes();
        Object.keys(notes).forEach(id => {
            const textarea = document.getElementById('note_' + id);
            if (textarea) {
                textarea.value = notes[id];
            }
        });
    }
    
    search() {
        const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
        document.querySelectorAll('.sidebar-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) || query === '' ? '' : 'none';
        });
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
    }
    
    bindEvents() {
        // 绑定键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevChapter();
            } else if (e.key === 'ArrowRight') {
                this.nextChapter();
            }
        });
    }
}