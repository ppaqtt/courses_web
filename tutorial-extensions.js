/**
 * 编程语言教程系统 - 扩展功能模块
 * 包含：视频教程、语音朗读、代码历史、调试器、格式化、作业系统、
 * 代码审查、学习小组、知识点分析、学习曲线、推荐系统、API文档、
 * 代码模板、键盘快捷键、代码折叠、项目模板、代码挑战、自定义主题、学习目标
 */

// ==================== 视频教程整合 ====================
const VideoTutorials = {
    videos: {
        python: [
            { id: 1, title: { zh: 'Python入门介绍', en: 'Python Introduction' }, duration: '15:30', url: '#', chapter: 1 },
            { id: 2, title: { zh: '变量与数据类型', en: 'Variables and Data Types' }, duration: '20:15', url: '#', chapter: 2 },
            { id: 3, title: { zh: '流程控制语句', en: 'Control Flow' }, duration: '25:45', url: '#', chapter: 3 },
            { id: 4, title: { zh: '函数定义与调用', en: 'Functions' }, duration: '18:20', url: '#', chapter: 5 },
            { id: 5, title: { zh: '面向对象编程', en: 'Object-Oriented Programming' }, duration: '30:00', url: '#', chapter: 7 }
        ],
        javascript: [
            { id: 1, title: { zh: 'JavaScript基础', en: 'JavaScript Basics' }, duration: '18:00', url: '#', chapter: 1 },
            { id: 2, title: { zh: '数据类型详解', en: 'Data Types' }, duration: '22:30', url: '#', chapter: 2 },
            { id: 3, title: { zh: '异步编程入门', en: 'Async Programming' }, duration: '28:15', url: '#', chapter: 7 }
        ],
        java: [
            { id: 1, title: { zh: 'Java环境搭建', en: 'Java Setup' }, duration: '12:00', url: '#', chapter: 1 },
            { id: 2, title: { zh: '类与对象', en: 'Classes and Objects' }, duration: '25:00', url: '#', chapter: 6 }
        ],
        cpp: [
            { id: 1, title: { zh: 'C++入门', en: 'C++ Introduction' }, duration: '20:00', url: '#', chapter: 1 },
            { id: 2, title: { zh: '指针与内存', en: 'Pointers and Memory' }, duration: '35:00', url: '#', chapter: 6 }
        ],
        csharp: [
            { id: 1, title: { zh: 'C#基础语法', en: 'C# Basics' }, duration: '18:30', url: '#', chapter: 1 },
            { id: 2, title: { zh: 'LINQ查询', en: 'LINQ Queries' }, duration: '22:00', url: '#', chapter: 9 }
        ],
        go: [
            { id: 1, title: { zh: 'Go语言入门', en: 'Go Introduction' }, duration: '15:00', url: '#', chapter: 1 },
            { id: 2, title: { zh: '并发编程', en: 'Concurrent Programming' }, duration: '30:00', url: '#', chapter: 8 }
        ],
        rust: [
            { id: 1, title: { zh: 'Rust所有权系统', en: 'Ownership System' }, duration: '25:00', url: '#', chapter: 2 },
            { id: 2, title: { zh: '模式匹配', en: 'Pattern Matching' }, duration: '20:00', url: '#', chapter: 6 }
        ],
        typescript: [
            { id: 1, title: { zh: 'TypeScript类型系统', en: 'Type System' }, duration: '22:00', url: '#', chapter: 2 },
            { id: 2, title: { zh: '泛型详解', en: 'Generics' }, duration: '25:00', url: '#', chapter: 5 }
        ],
        php: [
            { id: 1, title: { zh: 'PHP入门', en: 'PHP Introduction' }, duration: '18:00', url: '#', chapter: 1 },
            { id: 2, title: { zh: '数据库操作', en: 'Database Operations' }, duration: '28:00', url: '#', chapter: 9 }
        ],
        swift: [
            { id: 1, title: { zh: 'Swift基础', en: 'Swift Basics' }, duration: '20:00', url: '#', chapter: 1 },
            { id: 2, title: { zh: '闭包与函数', en: 'Closures and Functions' }, duration: '25:00', url: '#', chapter: 7 }
        ]
    },
    
    getByLanguage(language) {
        return this.videos[language] || [];
    },
    
    getByChapter(language, chapter) {
        return this.videos[language]?.filter(v => v.chapter === chapter) || [];
    },
    
    render(containerId, language) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const videos = this.getByLanguage(language);
        
        if (videos.length === 0) {
            container.innerHTML = '<p class="no-data">暂无视频教程</p>';
            return;
        }
        
        container.innerHTML = `
            <h3>📹 视频教程</h3>
            <div class="video-list">
                ${videos.map(v => `
                    <div class="video-card" onclick="VideoTutorials.play(${v.id}, '${language}')">
                        <div class="video-thumbnail">
                            <span class="play-icon">▶</span>
                            <span class="video-duration">${v.duration}</span>
                        </div>
                        <div class="video-info">
                            <div class="video-title">${v.title[currentLanguage]}</div>
                            <div class="video-meta">章节 ${v.chapter}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    play(id, language) {
        const video = this.videos[language]?.find(v => v.id === id);
        if (!video) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content video-modal">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h3>${video.title[currentLanguage]}</h3>
                <div class="video-player">
                    <div class="video-placeholder">
                        <span class="big-play-icon">▶</span>
                        <p>视频播放器</p>
                        <p class="video-url">${video.url}</p>
                    </div>
                </div>
                <div class="video-controls">
                    <button class="btn-primary">播放</button>
                    <button class="btn-secondary">下载视频</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

// ==================== 语音朗读 ====================
const TextToSpeech = {
    synth: window.speechSynthesis,
    
    speak(text, rate = 1) {
        if (!this.synth) {
            alert('您的浏览器不支持语音朗读功能');
            return;
        }
        
        this.synth.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en-US';
        utterance.rate = rate;
        utterance.pitch = 1;
        
        this.synth.speak(utterance);
    },
    
    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
    },
    
    toggleReading(selector) {
        const element = document.querySelector(selector);
        if (!element) return;
        
        if (this.synth?.speaking) {
            this.stop();
        } else {
            const text = element.textContent;
            this.speak(text);
        }
    },
    
    renderButton(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <button class="speak-btn" onclick="TextToSpeech.toggleReading('.chapter-content')">
                🔊 ${t('speak')}
            </button>
        `;
    },
    
    isSpeaking() {
        return this.synth?.speaking || false;
    }
};

// ==================== 代码执行历史 ====================
const CodeHistory = {
    KEY: 'code_execution_history',
    
    get() {
        const stored = localStorage.getItem(this.KEY);
        return stored ? JSON.parse(stored) : [];
    },
    
    add(code, language, output, timestamp = Date.now()) {
        const history = this.get();
        history.unshift({
            id: timestamp,
            code,
            language,
            output,
            timestamp,
            formattedTime: new Date(timestamp).toLocaleString()
        });
        
        // 保留最近50条
        if (history.length > 50) {
            history.pop();
        }
        
        localStorage.setItem(this.KEY, JSON.stringify(history));
    },
    
    clear() {
        localStorage.removeItem(this.KEY);
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const history = this.get();
        
        if (history.length === 0) {
            container.innerHTML = `
                <div class="no-data">
                    <div class="icon">📜</div>
                    <p>暂无代码执行历史</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="history-header">
                <h3>📜 代码执行历史</h3>
                <button class="btn-secondary" onclick="CodeHistory.clear(); CodeHistory.render('${containerId}')">清空</button>
            </div>
            <div class="history-list">
                ${history.map(item => `
                    <div class="history-item">
                        <div class="history-meta">
                            <span class="history-lang">${item.language}</span>
                            <span class="history-time">${item.formattedTime}</span>
                        </div>
                        <pre class="history-code">${item.code}</pre>
                        ${item.output ? `<div class="history-output">${item.output}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// ==================== 代码调试器 ====================
const CodeDebugger = {
    breakpoints: [],
    currentLine: 0,
    variables: {},
    
    addBreakpoint(line) {
        if (!this.breakpoints.includes(line)) {
            this.breakpoints.push(line);
            this.breakpoints.sort((a, b) => a - b);
        }
    },
    
    removeBreakpoint(line) {
        this.breakpoints = this.breakpoints.filter(l => l !== line);
    },
    
    toggleBreakpoint(line) {
        if (this.breakpoints.includes(line)) {
            this.removeBreakpoint(line);
        } else {
            this.addBreakpoint(line);
        }
        return this.breakpoints.includes(line);
    },
    
    step() {
        this.currentLine++;
        this.checkBreakpoint();
    },
    
    stepOver() {
        this.currentLine++;
        this.checkBreakpoint();
    },
    
    continue() {
        const nextBreakpoint = this.breakpoints.find(b => b > this.currentLine);
        if (nextBreakpoint) {
            this.currentLine = nextBreakpoint;
        } else {
            this.currentLine = 999;
        }
    },
    
    checkBreakpoint() {
        return this.breakpoints.includes(this.currentLine);
    },
    
    reset() {
        this.currentLine = 0;
        this.variables = {};
    },
    
    evaluate(code) {
        try {
            const result = new Function(code)();
            return { success: true, result };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="debugger-panel">
                <h3>🔧 调试器</h3>
                <div class="debugger-controls">
                    <button class="debug-btn" onclick="CodeDebugger.reset()">🔄 重置</button>
                    <button class="debug-btn" onclick="CodeDebugger.step()">▶ 单步</button>
                    <button class="debug-btn" onclick="CodeDebugger.stepOver()">⏭️ 跳过</button>
                    <button class="debug-btn" onclick="CodeDebugger.continue()">➡️ 继续</button>
                </div>
                <div class="breakpoints-section">
                    <h4>断点 (${this.breakpoints.length})</h4>
                    <div class="breakpoints-list">
                        ${this.breakpoints.length > 0 
                            ? this.breakpoints.map(b => `<span class="breakpoint-item">行 ${b} <button onclick="CodeDebugger.removeBreakpoint(${b}); CodeDebugger.render('${containerId}')">×</button></span>`).join('')
                            : '<p>暂无断点</p>'}
                    </div>
                </div>
                <div class="variables-section">
                    <h4>变量</h4>
                    <div class="variables-list">
                        ${Object.keys(this.variables).length > 0
                            ? Object.entries(this.variables).map(([name, value]) => `<div>${name} = ${JSON.stringify(value)}</div>`).join('')
                            : '<p>运行代码查看变量</p>'}
                    </div>
                </div>
            </div>
        `;
    }
};

// ==================== 代码格式化 ====================
const CodeFormatter = {
    format(code, language) {
        const formatters = {
            javascript: this.formatJavaScript,
            typescript: this.formatJavaScript,
            python: this.formatPython,
            java: this.formatJava,
            cpp: this.formatCpp,
            csharp: this.formatCSharp,
            go: this.formatGo,
            rust: this.formatRust,
            php: this.formatPhp,
            swift: this.formatSwift
        };
        
        const formatter = formatters[language] || ((c) => c);
        return formatter(code);
    },
    
    formatJavaScript(code) {
        return this._indent(code);
    },
    
    formatPython(code) {
        return code;
    },
    
    formatJava(code) {
        return this._indent(code);
    },
    
    formatCpp(code) {
        return this._indent(code);
    },
    
    formatCSharp(code) {
        return this._indent(code);
    },
    
    formatGo(code) {
        return this._indent(code);
    },
    
    formatRust(code) {
        return this._indent(code);
    },
    
    formatPhp(code) {
        return this._indent(code);
    },
    
    formatSwift(code) {
        return this._indent(code);
    },
    
    _indent(code) {
        let indentLevel = 0;
        const lines = code.split('\n');
        const result = [];
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (trimmed.endsWith('}') || trimmed.endsWith('};')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            result.push('    '.repeat(indentLevel) + trimmed);
            
            if (trimmed.endsWith('{') && !trimmed.startsWith('}')) {
                indentLevel++;
            }
        });
        
        return result.join('\n');
    },
    
    minify(code) {
        return code.replace(/\s+/g, ' ').trim();
    },
    
    beautify(code, language) {
        return this.format(code, language);
    }
};

// ==================== 作业提交系统 ====================
const AssignmentSystem = {
    assignments: {
        python: [
            { id: 1, title: { zh: '变量与表达式', en: 'Variables and Expressions' }, chapter: 2, points: 10, deadline: '2026-08-01' },
            { id: 2, title: { zh: '条件语句练习', en: 'Conditional Statements' }, chapter: 3, points: 15, deadline: '2026-08-05' },
            { id: 3, title: { zh: '循环结构', en: 'Loops' }, chapter: 4, points: 15, deadline: '2026-08-10' },
            { id: 4, title: { zh: '函数实现', en: 'Functions' }, chapter: 5, points: 20, deadline: '2026-08-15' },
            { id: 5, title: { zh: '面向对象项目', en: 'OOP Project' }, chapter: 7, points: 30, deadline: '2026-08-20' }
        ],
        javascript: [
            { id: 1, title: { zh: '基础语法练习', en: 'Basic Syntax' }, chapter: 1, points: 10, deadline: '2026-08-01' },
            { id: 2, title: { zh: 'DOM操作', en: 'DOM Operations' }, chapter: 6, points: 25, deadline: '2026-08-10' },
            { id: 3, title: { zh: '异步编程', en: 'Async Programming' }, chapter: 7, points: 30, deadline: '2026-08-15' }
        ],
        java: [
            { id: 1, title: { zh: '类与对象', en: 'Classes' }, chapter: 6, points: 20, deadline: '2026-08-05' },
            { id: 2, title: { zh: '继承与多态', en: 'Inheritance' }, chapter: 7, points: 25, deadline: '2026-08-10' }
        ],
        cpp: [
            { id: 1, title: { zh: '指针练习', en: 'Pointers' }, chapter: 6, points: 25, deadline: '2026-08-05' },
            { id: 2, title: { zh: 'STL应用', en: 'STL' }, chapter: 9, points: 30, deadline: '2026-08-15' }
        ]
    },
    
    submissions: {},
    
    getByLanguage(language) {
        return this.assignments[language] || [];
    },
    
    getSubmission(language, assignmentId) {
        const key = `${language}_${assignmentId}`;
        return this.submissions[key] || null;
    },
    
    submit(language, assignmentId, code) {
        const key = `${language}_${assignmentId}`;
        this.submissions[key] = {
            code,
            submittedAt: new Date().toISOString(),
            status: 'pending',
            score: null,
            feedback: ''
        };
        localStorage.setItem('assignments_submissions', JSON.stringify(this.submissions));
        return this.submissions[key];
    },
    
    render(containerId, language) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const assignments = this.getByLanguage(language);
        
        if (assignments.length === 0) {
            container.innerHTML = '<p class="no-data">暂无作业</p>';
            return;
        }
        
        container.innerHTML = `
            <h3>📝 作业列表</h3>
            <div class="assignments-list">
                ${assignments.map(a => {
                    const submission = this.getSubmission(language, a.id);
                    return `
                        <div class="assignment-card ${submission?.status === 'graded' ? 'completed' : ''}">
                            <div class="assignment-header">
                                <h4>${a.title[currentLanguage]}</h4>
                                <span class="assignment-points">${a.points}分</span>
                            </div>
                            <div class="assignment-meta">
                                <span>章节 ${a.chapter}</span>
                                <span>截止: ${a.deadline}</span>
                                ${submission ? `<span>状态: ${submission.status}</span>` : ''}
                                ${submission?.score !== null ? `<span>得分: ${submission.score}/${a.points}</span>` : ''}
                            </div>
                            ${!submission ? `
                                <button class="btn-primary" onclick="AssignmentSystem.showSubmit('${language}', ${a.id})">提交作业</button>
                            ` : `
                                <button class="btn-secondary" onclick="AssignmentSystem.showSubmit('${language}', ${a.id}, true)">重新提交</button>
                            `}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    },
    
    showSubmit(language, assignmentId, edit = false) {
        const assignment = this.assignments[language]?.find(a => a.id === assignmentId);
        if (!assignment) return;
        
        const submission = this.getSubmission(language, assignmentId);
        const initialCode = submission?.code || '';
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content assignment-modal">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h3>${assignment.title[currentLanguage]}</h3>
                <p>章节 ${assignment.chapter} · ${assignment.points}分</p>
                <p>截止日期: ${assignment.deadline}</p>
                <div class="form-group">
                    <label>代码</label>
                    <textarea id="assignmentCode" rows="15">${initialCode}</textarea>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">取消</button>
                    <button class="btn-primary" onclick="AssignmentSystem.doSubmit('${language}', ${assignment.id})">提交</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    doSubmit(language, assignmentId) {
        const code = document.getElementById('assignmentCode').value;
        if (!code.trim()) {
            alert('请填写代码');
            return;
        }
        
        this.submit(language, assignmentId, code);
        
        const modal = document.querySelector('.modal-overlay');
        modal.remove();
        
        this.render('assignmentsContainer', language);
        SnippetManager.showToast('作业已提交！等待批改');
    }
};

// ==================== 代码审查 ====================
const CodeReview = {
    reviews: [],
    
    submitReview(code, language, comments) {
        const review = {
            id: Date.now(),
            code,
            language,
            comments,
            submittedAt: new Date().toISOString(),
            status: 'pending'
        };
        this.reviews.push(review);
        localStorage.setItem('code_reviews', JSON.stringify(this.reviews));
        return review;
    },
    
    getReviews() {
        const stored = localStorage.getItem('code_reviews');
        return stored ? JSON.parse(stored) : [];
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const reviews = this.getReviews();
        
        container.innerHTML = `
            <h3>🔍 代码审查</h3>
            <div class="review-form">
                <textarea id="reviewCode" placeholder="粘贴你想要审查的代码..."></textarea>
                <textarea id="reviewComments" placeholder="添加审查意见..."></textarea>
                <button class="btn-primary" onclick="CodeReview.doSubmit()">提交审查</button>
            </div>
            <div class="reviews-list">
                ${reviews.length > 0 ? reviews.map(r => `
                    <div class="review-card">
                        <div class="review-header">
                            <span class="review-lang">${r.language}</span>
                            <span class="review-time">${new Date(r.submittedAt).toLocaleString()}</span>
                        </div>
                        <pre class="review-code">${r.code}</pre>
                        <div class="review-comments">${r.comments}</div>
                    </div>
                `).join('') : '<p class="no-data">暂无审查记录</p>'}
            </div>
        `;
    },
    
    doSubmit() {
        const code = document.getElementById('reviewCode').value;
        const comments = document.getElementById('reviewComments').value;
        
        if (!code.trim()) {
            alert('请输入代码');
            return;
        }
        
        this.submitReview(code, 'javascript', comments);
        this.render('reviewContainer');
        SnippetManager.showToast('审查请求已提交');
    }
};

// ==================== 学习小组 ====================
const StudyGroups = {
    groups: [
        { id: 1, name: { zh: 'Python学习小组', en: 'Python Study Group' }, members: 128, description: { zh: '一起学习Python，讨论问题', en: 'Learn Python together' }, active: true },
        { id: 2, name: { zh: 'JavaScript交流群', en: 'JavaScript Group' }, members: 256, description: { zh: '前端开发交流', en: 'Frontend development' }, active: true },
        { id: 3, name: { zh: 'Java进阶组', en: 'Java Advanced' }, members: 89, description: { zh: '企业级Java开发', en: 'Enterprise Java' }, active: true },
        { id: 4, name: { zh: '算法讨论组', en: 'Algorithm Group' }, members: 167, description: { zh: '刷题交流，算法分享', en: 'Algorithm sharing' }, active: true }
    ],
    
    userGroups: [],
    
    join(groupId) {
        if (!this.userGroups.includes(groupId)) {
            this.userGroups.push(groupId);
            localStorage.setItem('user_groups', JSON.stringify(this.userGroups));
        }
    },
    
    leave(groupId) {
        this.userGroups = this.userGroups.filter(g => g !== groupId);
        localStorage.setItem('user_groups', JSON.stringify(this.userGroups));
    },
    
    isJoined(groupId) {
        return this.userGroups.includes(groupId);
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <h3>👥 学习小组</h3>
            <div class="groups-list">
                ${this.groups.map(g => `
                    <div class="group-card">
                        <div class="group-header">
                            <h4>${g.name[currentLanguage]}</h4>
                            <span class="group-members">${g.members}人</span>
                        </div>
                        <p>${g.description[currentLanguage]}</p>
                        <button class="${this.isJoined(g.id) ? 'btn-secondary' : 'btn-primary'}" 
                            onclick="StudyGroups.toggleGroup(${g.id}, '${containerId}')">
                            ${this.isJoined(g.id) ? '退出' : '加入'}
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    toggleGroup(groupId, containerId) {
        if (this.isJoined(groupId)) {
            this.leave(groupId);
        } else {
            this.join(groupId);
        }
        this.render(containerId);
    }
};

// ==================== 知识点掌握度分析 ====================
const KnowledgeAnalysis = {
    knowledgePoints: {
        python: [
            { id: 'variables', name: { zh: '变量与数据类型', en: 'Variables' }, chapter: 2 },
            { id: 'control_flow', name: { zh: '流程控制', en: 'Control Flow' }, chapter: 3 },
            { id: 'functions', name: { zh: '函数', en: 'Functions' }, chapter: 5 },
            { id: 'oop', name: { zh: '面向对象', en: 'OOP' }, chapter: 7 },
            { id: 'data_structures', name: { zh: '数据结构', en: 'Data Structures' }, chapter: 4 },
            { id: 'files', name: { zh: '文件操作', en: 'File Operations' }, chapter: 8 },
            { id: 'errors', name: { zh: '错误处理', en: 'Error Handling' }, chapter: 9 }
        ],
        javascript: [
            { id: 'basics', name: { zh: '基础语法', en: 'Basics' }, chapter: 1 },
            { id: 'types', name: { zh: '数据类型', en: 'Types' }, chapter: 2 },
            { id: 'async', name: { zh: '异步编程', en: 'Async' }, chapter: 7 },
            { id: 'dom', name: { zh: 'DOM操作', en: 'DOM' }, chapter: 6 },
            { id: 'es6', name: { zh: 'ES6+', en: 'ES6+' }, chapter: 8 }
        ]
    },
    
    mastery: {},
    
    getMastery(language, pointId) {
        return this.mastery[`${language}_${pointId}`] || 0;
    },
    
    setMastery(language, pointId, value) {
        this.mastery[`${language}_${pointId}`] = Math.min(100, Math.max(0, value));
        localStorage.setItem('knowledge_mastery', JSON.stringify(this.mastery));
    },
    
    analyze(language) {
        const points = this.knowledgePoints[language] || [];
        return points.map(p => ({
            ...p,
            mastery: this.getMastery(language, p.id)
        }));
    },
    
    render(containerId, language) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const analysis = this.analyze(language);
        
        container.innerHTML = `
            <h3>📊 知识点掌握度</h3>
            <div class="mastery-list">
                ${analysis.map(p => `
                    <div class="mastery-item">
                        <div class="mastery-header">
                            <span class="mastery-name">${p.name[currentLanguage]}</span>
                            <span class="mastery-value">${p.mastery}%</span>
                        </div>
                        <div class="mastery-bar">
                            <div class="mastery-fill" style="width: ${p.mastery}%"></div>
                        </div>
                        <div class="mastery-level">${this.getLevel(p.mastery)}</div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    getLevel(mastery) {
        if (mastery >= 90) return { zh: '精通', en: 'Mastered' };
        if (mastery >= 70) return { zh: '熟练', en: 'Proficient' };
        if (mastery >= 50) return { zh: '掌握', en: 'Knowledgeable' };
        if (mastery >= 30) return { zh: '了解', en: 'Familiar' };
        return { zh: '入门', en: 'Beginner' };
    }
};

// ==================== 学习曲线图表 ====================
const LearningAnalytics = {
    generateData() {
        const days = [];
        const hours = [];
        const chapters = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push(date.toLocaleDateString('zh-CN', { weekday: 'short' }));
            hours.push(Math.random() * 2 + 0.5);
            chapters.push(Math.floor(Math.random() * 3));
        }
        
        return { days, hours, chapters };
    },
    
    renderBarChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const data = this.generateData();
        
        container.innerHTML = `
            <div class="chart-container">
                <h4>📈 每日学习时间</h4>
                <div class="bar-chart">
                    ${data.days.map((day, i) => `
                        <div class="bar-item">
                            <div class="bar" style="height: ${(data.hours[i] / 2.5) * 100}%">
                                <span class="bar-value">${data.hours[i].toFixed(1)}h</span>
                            </div>
                            <span class="bar-label">${day}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },
    
    renderLineChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const data = this.generateData();
        
        container.innerHTML = `
            <div class="chart-container">
                <h4>📚 完成章节趋势</h4>
                <div class="line-chart">
                    <svg viewBox="0 0 400 150" class="chart-svg">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.3" />
                                <stop offset="100%" style="stop-color:#667eea;stop-opacity:0" />
                            </linearGradient>
                        </defs>
                        <polyline 
                            points="${data.chapters.map((c, i) => `${i * 57 + 25},${120 - c * 30}`).join(' ')}" 
                            fill="none" 
                            stroke="#667eea" 
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <polygon 
                            points="25,130 ${data.chapters.map((c, i) => `${i * 57 + 25},${120 - c * 30}`).join(' ')} ${(data.chapters.length - 1) * 57 + 25},130" 
                            fill="url(#lineGradient)"
                        />
                        ${data.chapters.map((c, i) => `
                            <circle cx="${i * 57 + 25}" cy="${120 - c * 30}" r="4" fill="#667eea" />
                            <text x="${i * 57 + 25}" y="145" text-anchor="middle" font-size="10">${data.days[i]}</text>
                        `).join('')}
                    </svg>
                </div>
            </div>
        `;
    }
};

// ==================== 推荐系统 ====================
const RecommendationSystem = {
    getRecommendations(language) {
        const stats = LearningStats.get();
        const progress = stats.languagesProgress[language] || [];
        const completed = progress.length;
        
        const recommendations = [];
        
        if (completed < 3) {
            recommendations.push({
                type: 'chapter',
                title: { zh: '继续学习基础', en: 'Continue Basics' },
                content: { zh: `建议完成第 ${completed + 1} 章的学习`, en: `Complete chapter ${completed + 1}` },
                action: `tutorial-${language}.html#ch${completed + 1}`
            });
        }
        
        if (completed >= 5 && completed < 8) {
            recommendations.push({
                type: 'practice',
                title: { zh: '加强练习', en: 'Practice More' },
                content: { zh: '建议多做练习题巩固知识', en: 'Do more exercises' },
                action: `tutorial-${language}.html`
            });
        }
        
        if (completed >= 8) {
            recommendations.push({
                type: 'project',
                title: { zh: '实战项目', en: 'Project Practice' },
                content: { zh: '尝试完成综合实战项目', en: 'Complete the final project' },
                action: `tutorial-${language}.html#ch10`
            });
        }
        
        if (Object.keys(stats.languagesProgress).length < 2) {
            recommendations.push({
                type: 'language',
                title: { zh: '学习新语言', en: 'Learn New Language' },
                content: { zh: '掌握一门语言后可以学习其他语言', en: 'Learn another language' },
                action: 'programming-languages-tutorial.html'
            });
        }
        
        return recommendations;
    },
    
    render(containerId, language) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const recommendations = this.getRecommendations(language);
        
        container.innerHTML = `
            <h3>💡 推荐学习</h3>
            <div class="recommendations-list">
                ${recommendations.map(r => `
                    <div class="recommendation-card" onclick="window.location.href='${r.action}'">
                        <div class="rec-icon">${this.getIcon(r.type)}</div>
                        <div class="rec-content">
                            <h4>${r.title[currentLanguage]}</h4>
                            <p>${r.content[currentLanguage]}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    getIcon(type) {
        const icons = {
            chapter: '📖',
            practice: '💻',
            project: '🎯',
            language: '🌐'
        };
        return icons[type] || '💡';
    }
};

// ==================== API文档查询 ====================
const APIDocs = {
    docs: {
        python: {
            builtins: [
                { name: 'print', desc: { zh: '打印输出', en: 'Print output' }, usage: 'print(value)' },
                { name: 'len', desc: { zh: '获取长度', en: 'Get length' }, usage: 'len(obj)' },
                { name: 'str', desc: { zh: '转换为字符串', en: 'Convert to string' }, usage: 'str(value)' },
                { name: 'int', desc: { zh: '转换为整数', en: 'Convert to int' }, usage: 'int(value)' },
                { name: 'float', desc: { zh: '转换为浮点数', en: 'Convert to float' }, usage: 'float(value)' },
                { name: 'list', desc: { zh: '创建列表', en: 'Create list' }, usage: 'list(iterable)' },
                { name: 'dict', desc: { zh: '创建字典', en: 'Create dict' }, usage: 'dict(items)' },
                { name: 'range', desc: { zh: '创建范围', en: 'Create range' }, usage: 'range(start, end, step)' }
            ],
            string: [
                { name: 'upper', desc: { zh: '转大写', en: 'Uppercase' }, usage: 'str.upper()' },
                { name: 'lower', desc: { zh: '转小写', en: 'Lowercase' }, usage: 'str.lower()' },
                { name: 'split', desc: { zh: '分割字符串', en: 'Split string' }, usage: 'str.split(sep)' },
                { name: 'join', desc: { zh: '连接字符串', en: 'Join strings' }, usage: 'str.join(iterable)' },
                { name: 'replace', desc: { zh: '替换字符串', en: 'Replace string' }, usage: 'str.replace(old, new)' }
            ],
            list: [
                { name: 'append', desc: { zh: '添加元素', en: 'Append element' }, usage: 'list.append(item)' },
                { name: 'remove', desc: { zh: '移除元素', en: 'Remove element' }, usage: 'list.remove(item)' },
                { name: 'sort', desc: { zh: '排序', en: 'Sort' }, usage: 'list.sort()' },
                { name: 'reverse', desc: { zh: '反转', en: 'Reverse' }, usage: 'list.reverse()' },
                { name: 'slice', desc: { zh: '切片', en: 'Slice' }, usage: 'list[start:end]' }
            ]
        },
        javascript: {
            console: [
                { name: 'log', desc: { zh: '打印日志', en: 'Log' }, usage: 'console.log(value)' },
                { name: 'error', desc: { zh: '错误信息', en: 'Error' }, usage: 'console.error(value)' },
                { name: 'warn', desc: { zh: '警告信息', en: 'Warn' }, usage: 'console.warn(value)' }
            ],
            array: [
                { name: 'push', desc: { zh: '添加元素', en: 'Push' }, usage: 'arr.push(item)' },
                { name: 'pop', desc: { zh: '移除最后元素', en: 'Pop' }, usage: 'arr.pop()' },
                { name: 'map', desc: { zh: '映射', en: 'Map' }, usage: 'arr.map(fn)' },
                { name: 'filter', desc: { zh: '过滤', en: 'Filter' }, usage: 'arr.filter(fn)' },
                { name: 'reduce', desc: { zh: '归约', en: 'Reduce' }, usage: 'arr.reduce(fn, init)' },
                { name: 'forEach', desc: { zh: '遍历', en: 'ForEach' }, usage: 'arr.forEach(fn)' }
            ],
            string: [
                { name: 'split', desc: { zh: '分割', en: 'Split' }, usage: 'str.split(sep)' },
                { name: 'trim', desc: { zh: '去除空格', en: 'Trim' }, usage: 'str.trim()' },
                { name: 'substring', desc: { zh: '截取', en: 'Substring' }, usage: 'str.substring(start, end)' },
                { name: 'includes', desc: { zh: '包含', en: 'Includes' }, usage: 'str.includes(search)' }
            ]
        }
    },
    
    search(language, query) {
        const langDocs = this.docs[language] || {};
        const results = [];
        
        Object.values(langDocs).forEach(category => {
            category.forEach(doc => {
                if (doc.name.toLowerCase().includes(query.toLowerCase())) {
                    results.push(doc);
                }
            });
        });
        
        return results;
    },
    
    render(containerId, language) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const langDocs = this.docs[language] || {};
        
        container.innerHTML = `
            <h3>📖 API文档</h3>
            <div class="api-search">
                <input type="text" id="apiSearch" placeholder="搜索API..." oninput="APIDocs.filterDocs('${language}')">
            </div>
            <div class="api-categories" id="apiCategories">
                ${Object.entries(langDocs).map(([category, docs]) => `
                    <div class="api-category">
                        <h4>${category}</h4>
                        <div class="api-list">
                            ${docs.map(doc => `
                                <div class="api-item">
                                    <span class="api-name">${doc.name}</span>
                                    <span class="api-usage">${doc.usage}</span>
                                    <span class="api-desc">${doc.desc[currentLanguage]}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    filterDocs(language) {
        const query = document.getElementById('apiSearch').value.toLowerCase();
        const container = document.getElementById('apiCategories');
        
        if (!query) {
            this.render('apiDocsContainer', language);
            return;
        }
        
        const results = this.search(language, query);
        
        container.innerHTML = `
            <div class="api-category">
                <h4>搜索结果</h4>
                <div class="api-list">
                    ${results.map(doc => `
                        <div class="api-item">
                            <span class="api-name">${doc.name}</span>
                            <span class="api-usage">${doc.usage}</span>
                            <span class="api-desc">${doc.desc[currentLanguage]}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};

// ==================== 代码模板库 ====================
const CodeTemplates = {
    templates: {
        python: [
            { id: 1, name: { zh: 'Hello World', en: 'Hello World' }, code: 'print("Hello, World!")' },
            { id: 2, name: { zh: '函数定义', en: 'Function' }, code: 'def function_name(params):\n    """docstring"""\n    return value' },
            { id: 3, name: { zh: '类定义', en: 'Class' }, code: 'class MyClass:\n    def __init__(self):\n        pass\n    \n    def method(self):\n        pass' },
            { id: 4, name: { zh: '循环结构', en: 'Loop' }, code: 'for item in iterable:\n    # do something\n    pass\n\nwhile condition:\n    # do something\n    pass' },
            { id: 5, name: { zh: '条件判断', en: 'Condition' }, code: 'if condition:\n    # do something\nelif another_condition:\n    # do something else\nelse:\n    # default' },
            { id: 6, name: { zh: '文件操作', en: 'File' }, code: 'with open("file.txt", "r") as f:\n    content = f.read()\n\nwith open("file.txt", "w") as f:\n    f.write(content)' },
            { id: 7, name: { zh: '异常处理', en: 'Exception' }, code: 'try:\n    # risky code\nexcept Exception as e:\n    # handle error\n    print(f"Error: {e}")\nfinally:\n    # cleanup' },
            { id: 8, name: { zh: '列表推导', en: 'List Comprehension' }, code: 'result = [x for x in iterable if condition]' }
        ],
        javascript: [
            { id: 1, name: { zh: 'Hello World', en: 'Hello World' }, code: 'console.log("Hello, World!");' },
            { id: 2, name: { zh: '函数定义', en: 'Function' }, code: 'function name(params) {\n    return value;\n}\n\nconst arrow = (params) => value;' },
            { id: 3, name: { zh: '类定义', en: 'Class' }, code: 'class MyClass {\n    constructor() {}\n    method() {}\n}' },
            { id: 4, name: { zh: '异步函数', en: 'Async' }, code: 'async function fetchData() {\n    const response = await fetch(url);\n    return response.json();\n}' },
            { id: 5, name: { zh: '数组方法', en: 'Array' }, code: 'const result = arr.map(fn).filter(fn).reduce(fn);' },
            { id: 6, name: { zh: 'Promise', en: 'Promise' }, code: 'new Promise((resolve, reject) => {\n    // async operation\n}).then(result => {})\n  .catch(error => {});' }
        ],
        java: [
            { id: 1, name: { zh: 'Hello World', en: 'Hello World' }, code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}' },
            { id: 2, name: { zh: '类定义', en: 'Class' }, code: 'public class MyClass {\n    private String name;\n    \n    public MyClass(String name) {\n        this.name = name;\n    }\n}' }
        ],
        cpp: [
            { id: 1, name: { zh: 'Hello World', en: 'Hello World' }, code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}' },
            { id: 2, name: { zh: '类定义', en: 'Class' }, code: 'class MyClass {\nprivate:\n    int x;\npublic:\n    MyClass(int val) : x(val) {}\n    int getX() { return x; }\n};' }
        ]
    },
    
    getByLanguage(language) {
        return this.templates[language] || [];
    },
    
    render(containerId, language) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const templates = this.getByLanguage(language);
        
        container.innerHTML = `
            <h3>📋 代码模板</h3>
            <div class="templates-list">
                ${templates.map(t => `
                    <div class="template-card">
                        <div class="template-header">
                            <span class="template-name">${t.name[currentLanguage]}</span>
                            <button class="btn-secondary" onclick="CodeTemplates.copy('${t.code}')">复制</button>
                        </div>
                        <pre class="template-code">${t.code}</pre>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    copy(code) {
        navigator.clipboard.writeText(code).then(() => {
            SnippetManager.showToast('已复制到剪贴板');
        });
    }
};

// ==================== 键盘快捷键 ====================
const KeyboardShortcuts = {
    shortcuts: [
        { key: 'Ctrl + Enter', action: { zh: '运行代码', en: 'Run Code' } },
        { key: 'Ctrl + S', action: { zh: '保存代码片段', en: 'Save Snippet' } },
        { key: 'Ctrl + /', action: { zh: '注释代码', en: 'Comment Code' } },
        { key: 'Ctrl + D', action: { zh: '复制行', en: 'Duplicate Line' } },
        { key: 'Ctrl + Z', action: { zh: '撤销', en: 'Undo' } },
        { key: 'Ctrl + Shift + Z', action: { zh: '重做', en: 'Redo' } },
        { key: 'Ctrl + F', action: { zh: '搜索', en: 'Search' } },
        { key: 'Esc', action: { zh: '关闭弹窗', en: 'Close Modal' } }
    ],
    
    enabled: true,
    
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    },
    
    init() {
        document.addEventListener('keydown', (e) => {
            if (!this.enabled) return;
            
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                document.querySelector('.run-btn')?.click();
            }
            
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                document.querySelector('.save-btn')?.click();
            }
            
            if (e.key === 'Escape') {
                document.querySelector('.modal-overlay')?.remove();
            }
        });
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <h3>⌨️ 快捷键</h3>
            <div class="shortcuts-list">
                ${this.shortcuts.map(s => `
                    <div class="shortcut-item">
                        <span class="shortcut-key">${s.key}</span>
                        <span class="shortcut-action">${s.action[currentLanguage]}</span>
                    </div>
                `).join('')}
            </div>
            <button class="btn-secondary" onclick="KeyboardShortcuts.toggle()">
                ${this.enabled ? '禁用' : '启用'}快捷键
            </button>
        `;
    }
};

// ==================== 代码折叠 ====================
const CodeFolding = {
    toggle(codeId) {
        const code = document.getElementById(codeId);
        if (!code) return;
        
        code.classList.toggle('collapsed');
    },
    
    init() {
        document.querySelectorAll('.code-block').forEach(block => {
            if (block.textContent.length > 200) {
                const toggleBtn = document.createElement('button');
                toggleBtn.className = 'fold-btn';
                toggleBtn.textContent = '▼';
                toggleBtn.onclick = () => this.toggle(block.id);
                block.parentNode.insertBefore(toggleBtn, block);
            }
        });
    }
};

// ==================== 项目模板 ====================
const ProjectTemplates = {
    templates: [
        {
            id: 1,
            name: { zh: '待办事项应用', en: 'Todo App' },
            language: 'javascript',
            description: { zh: '使用JavaScript创建一个简单的待办事项应用', en: 'Create a todo app with JavaScript' },
            features: ['添加任务', '删除任务', '标记完成', '任务列表'],
            difficulty: 'beginner'
        },
        {
            id: 2,
            name: { zh: '计算器', en: 'Calculator' },
            language: 'javascript',
            description: { zh: '创建一个网页计算器应用', en: 'Create a web calculator' },
            features: ['基本运算', '清除功能', '小数点支持'],
            difficulty: 'beginner'
        },
        {
            id: 3,
            name: { zh: '学生管理系统', en: 'Student Manager' },
            language: 'python',
            description: { zh: '使用Python创建学生信息管理系统', en: 'Student management system in Python' },
            features: ['添加学生', '查询信息', '成绩统计', '数据持久化'],
            difficulty: 'intermediate'
        },
        {
            id: 4,
            name: { zh: '图书管理系统', en: 'Library System' },
            language: 'cpp',
            description: { zh: '使用C++创建图书管理系统', en: 'Library management in C++' },
            features: ['图书借阅', '归还管理', '库存统计'],
            difficulty: 'intermediate'
        },
        {
            id: 5,
            name: { zh: '博客系统', en: 'Blog System' },
            language: 'php',
            description: { zh: '使用PHP创建简单博客系统', en: 'Simple blog in PHP' },
            features: ['文章发布', '评论功能', '分类管理'],
            difficulty: 'advanced'
        }
    ],
    
    getByLanguage(language) {
        return this.templates.filter(t => t.language === language || language === 'all');
    },
    
    render(containerId, language = 'all') {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const templates = this.getByLanguage(language);
        
        container.innerHTML = `
            <h3>🎯 项目模板</h3>
            <div class="project-templates">
                ${templates.map(t => `
                    <div class="project-card">
                        <div class="project-header">
                            <h4>${t.name[currentLanguage]}</h4>
                            <span class="project-difficulty ${t.difficulty}">${this.getDifficultyLabel(t.difficulty)}</span>
                        </div>
                        <p>${t.description[currentLanguage]}</p>
                        <div class="project-features">
                            ${t.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                        </div>
                        <button class="btn-primary" onclick="ProjectTemplates.openProject(${t.id})">开始项目</button>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    getDifficultyLabel(difficulty) {
        const labels = {
            beginner: { zh: '入门', en: 'Beginner' },
            intermediate: { zh: '中级', en: 'Intermediate' },
            advanced: { zh: '高级', en: 'Advanced' }
        };
        return labels[difficulty]?.[currentLanguage] || difficulty;
    },
    
    openProject(id) {
        const project = this.templates.find(t => t.id === id);
        if (!project) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content project-modal">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h3>${project.name[currentLanguage]}</h3>
                <p>${project.description[currentLanguage]}</p>
                <h4>功能需求</h4>
                <ul>
                    ${project.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <h4>技术栈</h4>
                <p>${project.language}</p>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">关闭</button>
                    <button class="btn-primary" onclick="window.location.href='tutorial-${project.language}.html'">开始学习</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

// ==================== 代码挑战 ====================
const CodeChallenges = {
    challenges: [
        {
            id: 1,
            title: { zh: 'Hello World', en: 'Hello World' },
            difficulty: 'easy',
            language: 'all',
            description: { zh: '输出 "Hello, World!"', en: 'Print "Hello, World!"' },
            template: {
                python: 'print("Hello, World!")',
                javascript: 'console.log("Hello, World!");',
                java: 'System.out.println("Hello, World!");',
                cpp: 'cout << "Hello, World!" << endl;'
            },
            testCases: [
                { input: '', expected: 'Hello, World!' }
            ]
        },
        {
            id: 2,
            title: { zh: '计算两数之和', en: 'Sum of Two Numbers' },
            difficulty: 'easy',
            language: 'all',
            description: { zh: '接收两个数字，返回它们的和', en: 'Take two numbers and return their sum' },
            template: {
                python: 'def add(a, b):\n    return a + b',
                javascript: 'function add(a, b) {\n    return a + b;\n}',
                java: 'public static int add(int a, int b) {\n    return a + b;\n}',
                cpp: 'int add(int a, int b) {\n    return a + b;\n}'
            },
            testCases: [
                { input: '2, 3', expected: '5' },
                { input: '10, 20', expected: '30' },
                { input: '-5, 5', expected: '0' }
            ]
        },
        {
            id: 3,
            title: { zh: '阶乘计算', en: 'Factorial' },
            difficulty: 'medium',
            language: 'all',
            description: { zh: '计算一个数的阶乘', en: 'Calculate factorial of a number' },
            template: {
                python: 'def factorial(n):\n    # 你的代码',
                javascript: 'function factorial(n) {\n    // 你的代码\n}',
                java: 'public static int factorial(int n) {\n    // 你的代码\n}',
                cpp: 'int factorial(int n) {\n    // 你的代码\n}'
            },
            testCases: [
                { input: '5', expected: '120' },
                { input: '0', expected: '1' },
                { input: '3', expected: '6' }
            ]
        },
        {
            id: 4,
            title: { zh: '斐波那契数列', en: 'Fibonacci' },
            difficulty: 'medium',
            language: 'all',
            description: { zh: '生成斐波那契数列的第n项', en: 'Generate nth Fibonacci number' },
            template: {
                python: 'def fibonacci(n):\n    # 你的代码',
                javascript: 'function fibonacci(n) {\n    // 你的代码\n}',
                java: 'public static int fibonacci(int n) {\n    // 你的代码\n}',
                cpp: 'int fibonacci(int n) {\n    // 你的代码\n}'
            },
            testCases: [
                { input: '1', expected: '1' },
                { input: '5', expected: '5' },
                { input: '10', expected: '55' }
            ]
        },
        {
            id: 5,
            title: { zh: '反转字符串', en: 'Reverse String' },
            difficulty: 'easy',
            language: 'all',
            description: { zh: '反转输入的字符串', en: 'Reverse a string' },
            template: {
                python: 'def reverse_string(s):\n    return s[::-1]',
                javascript: 'function reverseString(s) {\n    return s.split("").reverse().join("");\n}',
                java: 'public static String reverseString(String s) {\n    return new StringBuilder(s).reverse().toString();\n}',
                cpp: 'string reverseString(string s) {\n    reverse(s.begin(), s.end());\n    return s;\n}'
            },
            testCases: [
                { input: '"hello"', expected: 'olleh' },
                { input: '"world"', expected: 'dlrow' }
            ]
        }
    ],
    
    currentChallenge: null,
    
    getChallenges(language) {
        if (language === 'all') return this.challenges;
        return this.challenges.filter(c => c.language === language || c.language === 'all');
    },
    
    render(containerId, language) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const challenges = this.getChallenges(language);
        
        container.innerHTML = `
            <h3>⚡ 代码挑战</h3>
            <div class="challenges-list">
                ${challenges.map(c => `
                    <div class="challenge-card" onclick="CodeChallenges.openChallenge(${c.id})">
                        <div class="challenge-header">
                            <h4>${c.title[currentLanguage]}</h4>
                            <span class="challenge-difficulty ${c.difficulty}">${this.getDifficultyLabel(c.difficulty)}</span>
                        </div>
                        <p>${c.description[currentLanguage]}</p>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    getDifficultyLabel(difficulty) {
        const labels = {
            easy: { zh: '简单', en: 'Easy' },
            medium: { zh: '中等', en: 'Medium' },
            hard: { zh: '困难', en: 'Hard' }
        };
        return labels[difficulty]?.[currentLanguage] || difficulty;
    },
    
    openChallenge(id) {
        const challenge = this.challenges.find(c => c.id === id);
        if (!challenge) return;
        
        this.currentChallenge = challenge;
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content challenge-modal">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h3>${challenge.title[currentLanguage]}</h3>
                <div class="challenge-info">
                    <span class="challenge-difficulty ${challenge.difficulty}">${this.getDifficultyLabel(challenge.difficulty)}</span>
                </div>
                <p>${challenge.description[currentLanguage]}</p>
                <h4>测试用例</h4>
                <div class="test-cases">
                    ${challenge.testCases.map((tc, i) => `
                        <div class="test-case">
                            <span>输入: ${tc.input}</span>
                            <span>预期: ${tc.expected}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="code-editor-small">
                    <textarea id="challengeCode" rows="10">${challenge.template['javascript'] || challenge.template['python'] || ''}</textarea>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">关闭</button>
                    <button class="btn-primary" onclick="CodeChallenges.runChallenge()">运行测试</button>
                </div>
                <div class="challenge-result" id="challengeResult"></div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    runChallenge() {
        if (!this.currentChallenge) return;
        
        const code = document.getElementById('challengeCode').value;
        const resultDiv = document.getElementById('challengeResult');
        
        try {
            const passed = this.currentChallenge.testCases.every(tc => {
                try {
                    const func = new Function(code);
                    const result = func();
                    return String(result) === tc.expected;
                } catch {
                    return false;
                }
            });
            
            if (passed) {
                resultDiv.innerHTML = `
                    <div class="quiz-result correct">
                        <span class="result-icon">✅</span>
                        <span class="result-text">恭喜！所有测试通过！</span>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="quiz-result incorrect">
                        <span class="result-icon">❌</span>
                        <span class="result-text">测试未通过，请检查代码</span>
                    </div>
                `;
            }
        } catch (error) {
            resultDiv.innerHTML = `
                <div class="quiz-result incorrect">
                    <span class="result-icon">⚠️</span>
                    <span class="result-text">代码错误: ${error.message}</span>
                </div>
            `;
        }
    }
};

// ==================== 自定义主题 ====================
const CustomThemes = {
    themes: {
        default: {
            name: { zh: '默认', en: 'Default' },
            primary: '#667eea',
            secondary: '#764ba2',
            background: '#ffffff',
            text: '#1e293b'
        },
        dark: {
            name: { zh: '深色', en: 'Dark' },
            primary: '#667eea',
            secondary: '#764ba2',
            background: '#0f172a',
            text: '#f1f5f9'
        },
        ocean: {
            name: { zh: '海洋', en: 'Ocean' },
            primary: '#0ea5e9',
            secondary: '#0284c7',
            background: '#f0f9ff',
            text: '#0c4a6e'
        },
        forest: {
            name: { zh: '森林', en: 'Forest' },
            primary: '#22c55e',
            secondary: '#16a34a',
            background: '#f0fdf4',
            text: '#14532d'
        },
        sunset: {
            name: { zh: '日落', en: 'Sunset' },
            primary: '#f97316',
            secondary: '#ea580c',
            background: '#fff7ed',
            text: '#7c2d12'
        },
        purple: {
            name: { zh: '紫色', en: 'Purple' },
            primary: '#a855f7',
            secondary: '#9333ea',
            background: '#faf5ff',
            text: '#581c87'
        }
    },
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;
        
        document.documentElement.style.setProperty('--accent-color', theme.primary);
        document.documentElement.style.setProperty('--accent-hover', theme.secondary);
        document.documentElement.style.setProperty('--bg-primary', theme.background);
        document.documentElement.style.setProperty('--text-primary', theme.text);
        
        localStorage.setItem('custom_theme', themeName);
    },
    
    getCurrentTheme() {
        return localStorage.getItem('custom_theme') || 'default';
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const currentTheme = this.getCurrentTheme();
        
        container.innerHTML = `
            <h3>🎨 自定义主题</h3>
            <div class="theme-list">
                ${Object.entries(this.themes).map(([key, theme]) => `
                    <div class="theme-card ${currentTheme === key ? 'active' : ''}" 
                         onclick="CustomThemes.applyTheme('${key}'); CustomThemes.render('${containerId}')">
                        <div class="theme-preview" style="background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary})"></div>
                        <span>${theme.name[currentLanguage]}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// ==================== 学习目标设定 ====================
const LearningGoals = {
    goals: [],
    
    addGoal(title, targetDate, type = 'chapter') {
        const goal = {
            id: Date.now(),
            title,
            targetDate,
            type,
            createdAt: new Date().toISOString(),
            completed: false,
            progress: 0
        };
        this.goals.push(goal);
        localStorage.setItem('learning_goals', JSON.stringify(this.goals));
        return goal;
    },
    
    completeGoal(id) {
        const goal = this.goals.find(g => g.id === id);
        if (goal) {
            goal.completed = true;
            goal.progress = 100;
            localStorage.setItem('learning_goals', JSON.stringify(this.goals));
        }
    },
    
    deleteGoal(id) {
        this.goals = this.goals.filter(g => g.id !== id);
        localStorage.setItem('learning_goals', JSON.stringify(this.goals));
    },
    
    loadGoals() {
        const stored = localStorage.getItem('learning_goals');
        this.goals = stored ? JSON.parse(stored) : [];
        return this.goals;
    },
    
    getProgress(id) {
        const goal = this.goals.find(g => g.id === id);
        return goal?.progress || 0;
    },
    
    updateProgress(id, progress) {
        const goal = this.goals.find(g => g.id === id);
        if (goal) {
            goal.progress = Math.min(100, Math.max(0, progress));
            if (goal.progress >= 100) {
                goal.completed = true;
            }
            localStorage.setItem('learning_goals', JSON.stringify(this.goals));
        }
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        this.loadGoals();
        
        container.innerHTML = `
            <h3>🎯 学习目标</h3>
            <button class="btn-primary" onclick="LearningGoals.showAddGoal()">+ 添加目标</button>
            <div class="goals-list">
                ${this.goals.length > 0 ? this.goals.map(g => `
                    <div class="goal-card ${g.completed ? 'completed' : ''}">
                        <div class="goal-header">
                            <h4>${g.title}</h4>
                            <span class="goal-status">${g.completed ? '已完成' : '进行中'}</span>
                        </div>
                        <div class="goal-meta">
                            <span>截止: ${g.targetDate}</span>
                        </div>
                        <div class="goal-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${g.progress}%"></div>
                            </div>
                            <span>${g.progress}%</span>
                        </div>
                        <div class="goal-actions">
                            ${!g.completed ? `<button class="btn-secondary" onclick="LearningGoals.updateProgress(${g.id}, 100)">标记完成</button>` : ''}
                            <button class="btn-danger" onclick="LearningGoals.deleteGoal(${g.id}); LearningGoals.render('${containerId}')">删除</button>
                        </div>
                    </div>
                `).join('') : '<p class="no-data">暂无学习目标</p>'}
            </div>
        `;
    },
    
    showAddGoal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content goal-modal">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h3>添加学习目标</h3>
                <div class="form-group">
                    <label>目标名称</label>
                    <input type="text" id="goalTitle" placeholder="例如：完成Python教程">
                </div>
                <div class="form-group">
                    <label>截止日期</label>
                    <input type="date" id="goalDate">
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">取消</button>
                    <button class="btn-primary" onclick="LearningGoals.doAddGoal()">添加</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    doAddGoal() {
        const title = document.getElementById('goalTitle').value;
        const date = document.getElementById('goalDate').value;
        
        if (!title || !date) {
            alert('请填写完整信息');
            return;
        }
        
        this.addGoal(title, date);
        
        const modal = document.querySelector('.modal-overlay');
        modal.remove();
        
        this.render('goalsContainer');
        SnippetManager.showToast('目标已添加');
    }
};

// ==================== 初始化扩展功能 ====================
function initExtensions() {
    KeyboardShortcuts.init();
    CodeFolding.init();
}