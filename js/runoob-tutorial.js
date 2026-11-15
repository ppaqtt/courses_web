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
        try {
            await this.loadChapters();
            this.render();
            this.bindEvents();
            this.loadProgress();
            this.loadNotes();
            this.showChapter(1);
        } catch (e) {
            console.error('教程初始化失败:', e);
            document.body.innerHTML = '<div style="padding:40px;text-align:center;font-family:sans-serif;"><h2 style="color:#ef4444;">页面加载失败</h2><p style="color:#64748b;">' + e.message + '</p><p style="color:#94a3b8;margin-top:20px;">请按F12查看控制台详细错误信息</p></div>';
        }
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
                        <a href="programming-languages-tutorial.html" class="nav-item">全部教程</a>
                        <a href="language-comparison.html" class="nav-item">语言对照</a>
                        <a href="concepts.html" class="nav-item">概念对照</a>
                        <a href="tutorial-hub.html" class="nav-item">学习中心</a>
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
                        <span class="lang">${this.languageLabel()}</span>
                        <div class="actions">
                            <button class="code-btn run" onclick="tutorial.runCode(${ch.id})">▶ 在线运行</button>
                            <button class="code-btn" onclick="tutorial.copyCode('code_${ch.id}')">📋 复制代码</button>
                            ${typeof CodeFormatter !== 'undefined' ? `<button class="code-btn" onclick="tutorial.formatCode(${ch.id})">🧹 格式化</button>` : ''}
                            ${typeof CodeQualityChecker !== 'undefined' ? `<button class="code-btn" onclick="tutorial.checkQuality(${ch.id})">✅ 质量检查</button>` : ''}
                            ${typeof SnippetManager !== 'undefined' ? `<button class="code-btn" onclick="tutorial.saveSnippet(${ch.id})">⭐ 收藏</button>` : ''}
                        </div>
                    </div>
                    <div class="code-body">
                        <pre><code id="code_${ch.id}">${this.escapeHtml(ch.c)}</code></pre>
                    </div>
                    <div class="code-output" id="output_${ch.id}" hidden></div>
                </div>` : ''}
                
                ${ch.et ? `
                <h2 class="chapter-title">常见错误</h2>
                <div class="error-block">
                    ${Array.isArray(ch.et) ? 
                        ch.et.map((et, i) => `
                            <h4>${et}</h4>
                            <pre><code>${this.escapeHtml(Array.isArray(ch.ec) ? (ch.ec[i] || '') : (ch.ec || ''))}</code></pre>
                        `).join('')
                        :
                        `
                            <h4>${ch.et}</h4>
                            <pre><code>${this.escapeHtml(Array.isArray(ch.ec) ? ch.ec.join('\n\n') : (ch.ec || ''))}</code></pre>
                        `
                    }
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

    languageLabel() {
        const names = {
            'html-css': 'HTML/CSS', 'r-lang': 'R', 'objectivec': 'Objective-C',
            'csharp': 'C#', 'cpp': 'C++', 'fsharp': 'F#', 'typescript': 'TypeScript',
            'javascript': 'JavaScript', 'assembly': 'Assembly', 'cobol': 'COBOL'
        };
        return names[this.language] || (this.title ? this.title.replace(/教程$/, '') : this.language);
    }

    // 教程 slug 与在线运行语言键的映射
    runnerLanguage() {
        const map = {
            'html-css': 'html',
            'r-lang': 'r',
            'shell': 'bash'
        };
        return map[this.language] || this.language;
    }

    // 在线运行：Piston 优先；失败时自动降级为复制代码
    async runCode(id) {
        const chapter = this.chapters.find(c => c.id === id);
        const output = document.getElementById('output_' + id);
        if (!chapter || !output) return;

        output.hidden = false;
        output.className = 'code-output';
        output.innerHTML = '<span class="output-running">正在提交到 Piston 在线运行服务...</span>';

        if (!window.CodeRunner) {
            this.showRunFallback(output, chapter.c, '在线运行模块未加载');
            return;
        }

        let result;
        try {
            result = await CodeRunner.runInto(output, this.runnerLanguage(), chapter.c);
        } catch (error) {
            result = { ok: false, output: '运行请求失败：' + error.message };
            this.showRunFallback(output, chapter.c, result.output);
            return;
        }

        if (!result || !result.ok) {
            this.showRunFallback(output, chapter.c, (result && result.output) || '在线执行服务暂不可用');
        }
    }

    showRunFallback(container, code, reason) {
        const existing = container.querySelector('.run-fallback');
        if (existing) existing.remove();

        const box = document.createElement('div');
        box.className = 'run-fallback';

        const text = document.createElement('span');
        text.textContent = '在线执行不可用（' + reason + '），已降级为复制代码，可在本地环境运行。';

        const button = document.createElement('button');
        button.className = 'code-btn';
        button.textContent = '📋 复制代码';
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(code).then(() => {
                this.showToast('代码已复制，请粘贴到本地编辑器运行');
            });
        });

        box.appendChild(text);
        box.appendChild(button);
        container.appendChild(box);
    }

    // 使用 tutorial-extensions.js 的格式化模块
    formatCode(id) {
        const chapter = this.chapters.find(c => c.id === id);
        const output = document.getElementById('output_' + id);
        if (!chapter || !output || typeof CodeFormatter === 'undefined') return;
        const formatted = CodeFormatter.format(chapter.c, this.runnerLanguage());
        output.hidden = false;
        output.className = 'code-output';
        output.innerHTML = '<div class="runner-output-meta">🧹 格式化结果</div>' +
            '<pre class="runner-output-text">' + this.escapeHtml(formatted) + '</pre>';
        this.showToast('已格式化，可复制到本地使用');
    }

    // 使用 tutorial-advanced.js 的代码质量检查模块
    checkQuality(id) {
        const chapter = this.chapters.find(c => c.id === id);
        const output = document.getElementById('output_' + id);
        if (!chapter || !output || typeof CodeQualityChecker === 'undefined') return;
        const report = CodeQualityChecker.check(chapter.c, this.language);
        const issues = (report.issues || []).slice(0, 6);
        output.hidden = false;
        output.className = 'code-output';
        output.innerHTML = '<div class="runner-output-meta">✅ 质量评分：' + report.score + '/100 · ' +
            report.lines + ' 行 · ' + (report.issues || []).length + ' 条提示</div>' +
            (issues.length
                ? '<ul class="runner-output-text">' + issues.map(issue =>
                    '<li>第 ' + issue.line + ' 行 [' + issue.rule + '] ' + this.escapeHtml(issue.message) + '</li>').join('') + '</ul>'
                : '<div class="runner-output-text">未发现明显问题</div>');
    }

    saveSnippet(id) {
        const chapter = this.chapters.find(c => c.id === id);
        if (!chapter || typeof SnippetManager === 'undefined') return;
        SnippetManager.showSaveDialog(chapter.c, this.language);
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