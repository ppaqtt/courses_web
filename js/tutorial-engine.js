class TutorialEngine {
    constructor(options) {
        this.language = options.language;
        this.title = options.title;
        this.subtitle = options.subtitle;
        this.totalChapters = options.totalChapters;
        this.chapters = [];
        
        this.prefixes = {
            progress: `${this.language}_progress`,
            notes: `${this.language}_notes`,
            bookmarks: `${this.language}_bookmarks`,
            darkmode: `${this.language}_darkmode`
        };
        
        this.init();
    }
    
    async init() {
        await this.loadChapters();
        this.renderHeader();
        this.renderToolbar();
        this.renderSidebar();
        this.renderContent();
        this.loadProgress();
        this.loadNotes();
        this.loadDarkMode();
        this.bindEvents();
        this.showChapter(1);
    }
    
    async loadChapters() {
        try {
            const response = await fetch(`data/tutorial-${this.language}.json`);
            this.chapters = await response.json();
            this.totalChapters = this.chapters.length;
        } catch (e) {
            console.error('加载章节数据失败:', e);
        }
    }
    
    escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, '&amp;')
                   .replace(/</g, '&lt;')
                   .replace(/>/g, '&gt;')
                   .replace(/"/g, '&quot;');
    }
    
    renderHeader() {
        const container = document.querySelector('.container');
        container.innerHTML = `
            <div class="header">
                <h1>${this.title}</h1>
                <p>${this.subtitle} · ${this.totalChapters}章完整教程</p>
            </div>
            <div class="toolbar">
                <div class="toolbar-left">
                    <input type="text" class="search-box" id="searchInput" placeholder="搜索教程内容..." oninput="tutorial.searchTutorial()">
                </div>
                <div class="toolbar-right">
                    <button class="btn btn-primary" onclick="tutorial.toggleDarkMode()">🌙 暗黑模式</button>
                    <button class="btn btn-secondary" onclick="tutorial.showBookmarks()">📑 收藏夹</button>
                    <button class="btn btn-secondary" onclick="tutorial.showProgress()">📊 学习进度</button>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill"></div>
                    </div>
                    <span class="progress-text" id="progressText">0/${this.totalChapters}</span>
                </div>
            </div>
            <div class="sidebar" id="sidebar">
                <h3>📚 章节导航</h3>
                <ul class="chapter-list" id="chapterList"></ul>
            </div>
            <div class="main-content" id="mainContent"></div>
        `;
    }
    
    renderToolbar() {}
    
    renderSidebar() {
        const list = document.getElementById('chapterList');
        list.innerHTML = this.chapters.map(ch => `
            <li class="chapter-item" id="ch_${ch.id}" onclick="tutorial.showChapter(${ch.id})">
                <span class="ch-title"><span class="chapter-number">${ch.id}</span>${ch.t}</span>
                <span class="check" id="check_${ch.id}"></span>
            </li>
        `).join('');
    }
    
    renderContent() {
        const main = document.getElementById('mainContent');
        main.innerHTML = this.chapters.map(ch => `
            <div class="chapter-section" id="ch${ch.id}">
                <h2><span class="tag tag-accent">第${ch.id}章</span> ${ch.t}</h2>
                ${ch.p && ch.p.length > 0 ? `
                <div class="section-content">
                    <ul>${ch.p.map(p => `<li>${p}</li>`).join('')}</ul>
                </div>` : ''}
                ${ch.c ? `
                <div class="code-block">
                    <div class="code-header">
                        <span class="code-lang">${this.language}</span>
                        <div class="code-actions">
                            <button class="code-btn" onclick="tutorial.copyCode('code_${ch.id}')">复制</button>
                        </div>
                    </div>
                    <pre id="code_${ch.id}"><code>${this.escapeHtml(ch.c)}</code></pre>
                </div>` : ''}
                ${ch.et ? `
                <div class="error-block">
                    <h4>❌ ${ch.et}</h4>
                    <pre><code>${this.escapeHtml(ch.ec || '')}</code></pre>
                </div>` : ''}
                ${ch.q && ch.q.length > 0 ? `
                <div class="quiz-section">
                    <h4>💻 练习题</h4>
                    ${ch.q.map((q, idx) => `
                        <div class="quiz-item">
                            <p>${typeof q === 'object' ? q.q : q}</p>
                            ${typeof q === 'object' ? `
                            <input type="text" class="quiz-input" id="ans_${ch.id}_${idx}" placeholder="输入你的答案...">
                            <button class="btn btn-primary" onclick="tutorial.checkAnswer(${ch.id}, ${idx})">检查答案</button>
                            <div class="quiz-result" id="res_${ch.id}_${idx}"></div>
                            <button class="btn btn-secondary" onclick="tutorial.toggleAnswer(${ch.id}, ${idx})">查看答案</button>
                            <div class="answer-section" id="ans_sec_${ch.id}_${idx}">
                                <h5>参考答案</h5>
                                <pre>${this.escapeHtml(q.a || '')}</pre>
                            </div>` : ''}
                        </div>
                    `).join('')}
                </div>` : ''}
                <div class="note-section">
                    <h4>📝 学习笔记</h4>
                    <textarea class="note-textarea" id="note_${ch.id}" placeholder="记录学习笔记..." oninput="tutorial.saveNote(${ch.id})"></textarea>
                </div>
                <button class="btn btn-primary w-full" onclick="tutorial.markComplete(${ch.id})">✅ 标记完成</button>
                <div class="chapter-nav">
                    <button class="nav-btn" onclick="tutorial.prevChapter(${ch.id})" ${ch.id == 1 ? 'disabled' : ''}>◀ 上一章</button>
                    <button class="nav-btn" onclick="tutorial.nextChapter(${ch.id})" ${ch.id == this.totalChapters ? 'disabled' : ''}>下一章 ▶</button>
                </div>
            </div>
        `).join('');
    }
    
    showChapter(id) {
        document.querySelectorAll('.chapter-section').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
        document.getElementById('ch' + id)?.classList.add('active');
        document.getElementById('ch_' + id)?.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    prevChapter(id) {
        if(id > 1) this.showChapter(id - 1);
    }
    
    nextChapter(id) {
        if(id < this.totalChapters) this.showChapter(id + 1);
    }
    
    copyCode(id) {
        const code = document.getElementById(id)?.textContent;
        if (code) {
            navigator.clipboard.writeText(code).then(() => {
                const toast = document.createElement('div');
                toast.className = 'toast show';
                toast.textContent = '代码已复制';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            });
        }
    }
    
    checkAnswer(chId, qIdx) {
        const userAns = document.getElementById('ans_' + chId + '_' + qIdx)?.value.trim();
        const chapter = this.chapters.find(c => c.id == chId);
        if (!chapter || !chapter.q[qIdx]) return;
        
        const correctAns = chapter.q[qIdx].a || '';
        const result = document.getElementById('res_' + chId + '_' + qIdx);
        
        if(userAns.toLowerCase() === correctAns.toLowerCase()) {
            result.className = 'quiz-result correct';
            result.innerHTML = '✅ 正确！';
        } else {
            result.className = 'quiz-result incorrect';
            result.innerHTML = '❌ 不正确，请重试';
        }
    }
    
    toggleAnswer(chId, qIdx) {
        const sec = document.getElementById('ans_sec_' + chId + '_' + qIdx);
        sec?.classList.toggle('show');
    }
    
    markComplete(id) {
        const progress = this.getProgress();
        if(!progress.includes(id)) {
            progress.push(id);
            localStorage.setItem(this.prefixes.progress, JSON.stringify(progress));
        }
        this.updateProgressUI();
        document.getElementById('ch_' + id)?.classList.add('completed');
    }
    
    getProgress() {
        const stored = localStorage.getItem(this.prefixes.progress);
        return stored ? JSON.parse(stored) : [];
    }
    
    loadProgress() {
        const progress = this.getProgress();
        this.updateProgressUI();
        progress.forEach(id => {
            document.getElementById('ch_' + id)?.classList.add('completed');
        });
    }
    
    updateProgressUI() {
        const progress = this.getProgress();
        const percent = Math.round((progress.length / this.totalChapters) * 100);
        const fill = document.getElementById('progressFill');
        const text = document.getElementById('progressText');
        if (fill) fill.style.width = percent + '%';
        if (text) text.textContent = progress.length + '/' + this.totalChapters;
    }
    
    saveNote(id) {
        const notes = this.getNotes();
        notes[id] = document.getElementById('note_' + id)?.value || '';
        localStorage.setItem(this.prefixes.notes, JSON.stringify(notes));
    }
    
    getNotes() {
        const stored = localStorage.getItem(this.prefixes.notes);
        return stored ? JSON.parse(stored) : {};
    }
    
    loadNotes() {
        const notes = this.getNotes();
        Object.keys(notes).forEach(id => {
            const el = document.getElementById('note_' + id);
            if(el) el.value = notes[id];
        });
    }
    
    toggleDarkMode() {
        const isDark = document.body.dataset.theme === 'dark';
        document.body.dataset.theme = isDark ? 'light' : 'dark';
        localStorage.setItem(this.prefixes.darkmode, !isDark);
    }
    
    loadDarkMode() {
        const isDark = localStorage.getItem(this.prefixes.darkmode) === 'true';
        document.body.dataset.theme = isDark ? 'dark' : 'light';
    }
    
    searchTutorial() {
        const query = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const items = document.querySelectorAll('.chapter-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });
    }
    
    showBookmarks() {
        alert('收藏夹功能开发中...');
    }
    
    showProgress() {
        const progress = this.getProgress();
        alert(`已完成章节：${progress.length}/${this.totalChapters}\n进度：${Math.round(progress.length/this.totalChapters*100)}%`);
    }
    
    bindEvents() {
        // 事件已通过onclick绑定
    }
}