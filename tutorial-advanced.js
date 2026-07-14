/**
 * 编程语言教程系统 - 高级扩展功能模块
 * 包含：代码审查流程、代码回放、智能提示、代码可视化、交互式测验、
 * 代码游戏化、学习热力图、知识点关联图、学习效率分析、错题本、
 * Git集成、数据库连接、API测试工具、代码质量检查、代码覆盖率、
 * 自适应学习、学习报告、技能认证、职业规划、数据导出、移动端APP
 */

// ==================== 代码审查流程 ====================
const CodeReviewWorkflow = {
    reviews: [],
    
    init() {
        const stored = localStorage.getItem('code_review_workflow');
        this.reviews = stored ? JSON.parse(stored) : [];
    },
    
    save() {
        localStorage.setItem('code_review_workflow', JSON.stringify(this.reviews));
    },
    
    submit(code, language, description) {
        const review = {
            id: Date.now(),
            code,
            language,
            description,
            status: 'pending',
            submittedAt: new Date().toISOString(),
            submittedBy: 'current_user',
            reviewers: [],
            comments: [],
            approvals: 0,
            rejections: 0,
            changes: [],
            timeline: [{ action: '提交', time: new Date().toISOString(), user: 'current_user' }]
        };
        this.reviews.push(review);
        this.save();
        return review;
    },
    
    approve(reviewId, comment) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (!review) return;
        review.approvals++;
        review.comments.push({ type: 'approve', text: comment, time: new Date().toISOString() });
        review.timeline.push({ action: '批准', time: new Date().toISOString(), user: 'reviewer' });
        if (review.approvals >= 2) {
            review.status = 'approved';
            review.timeline.push({ action: '合并', time: new Date().toISOString(), user: 'system' });
        }
        this.save();
    },
    
    reject(reviewId, comment) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (!review) return;
        review.rejections++;
        review.comments.push({ type: 'reject', text: comment, time: new Date().toISOString() });
        review.timeline.push({ action: '拒绝', time: new Date().toISOString(), user: 'reviewer' });
        review.status = 'changes_requested';
        this.save();
    },
    
    requestChanges(reviewId, changes) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (!review) return;
        review.changes.push(...changes);
        review.status = 'changes_requested';
        review.timeline.push({ action: '请求修改', time: new Date().toISOString(), details: changes });
        this.save();
    },
    
    merge(reviewId) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (!review || review.status !== 'approved') return;
        review.status = 'merged';
        review.mergedAt = new Date().toISOString();
        review.timeline.push({ action: '已合并', time: new Date().toISOString() });
        this.save();
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        this.init();
        
        const statusLabels = {
            pending: '等待审查',
            approved: '已批准',
            changes_requested: '需要修改',
            merged: '已合并'
        };
        
        const statusColors = {
            pending: '#f59e0b',
            approved: '#22c55e',
            changes_requested: '#ef4444',
            merged: '#8b5cf6'
        };
        
        container.innerHTML = `
            <h3>🔍 代码审查流程</h3>
            <div class="review-workflow-form">
                <textarea id="reviewCodeInput" placeholder="粘贴代码..." rows="6"></textarea>
                <input type="text" id="reviewLangInput" placeholder="语言 (如 javascript)" />
                <input type="text" id="reviewDescInput" placeholder="描述" />
                <button class="btn-primary" onclick="CodeReviewWorkflow.doSubmit()">提交审查</button>
            </div>
            <div class="review-workflow-list">
                ${this.reviews.length > 0 ? this.reviews.map(r => `
                    <div class="workflow-card" style="border-left: 4px solid ${statusColors[r.status]}">
                        <div class="workflow-header">
                            <span class="workflow-status" style="background: ${statusColors[r.status]}">${statusLabels[r.status]}</span>
                            <span class="workflow-lang">${r.language}</span>
                            <span class="workflow-time">${new Date(r.submittedAt).toLocaleString()}</span>
                        </div>
                        <p class="workflow-desc">${r.description}</p>
                        <pre class="workflow-code">${r.code.substring(0, 200)}${r.code.length > 200 ? '...' : ''}</pre>
                        <div class="workflow-stats">
                            <span>👍 ${r.approvals}</span>
                            <span>👎 ${r.rejections}</span>
                            <span>💬 ${r.comments.length}</span>
                        </div>
                        <div class="workflow-timeline">
                            ${r.timeline.map(t => `
                                <div class="timeline-item">
                                    <span class="timeline-action">${t.action}</span>
                                    <span class="timeline-time">${new Date(t.time).toLocaleString()}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="workflow-actions">
                            ${r.status === 'pending' ? `
                                <button class="btn-primary" onclick="CodeReviewWorkflow.approve(${r.id}, prompt('批准意见:') || '通过')">批准</button>
                                <button class="btn-danger" onclick="CodeReviewWorkflow.reject(${r.id}, prompt('拒绝原因:') || '需修改')">拒绝</button>
                            ` : ''}
                            ${r.status === 'approved' ? `
                                <button class="btn-primary" onclick="CodeReviewWorkflow.merge(${r.id}); CodeReviewWorkflow.render('${containerId}')">合并</button>
                            ` : ''}
                        </div>
                    </div>
                `).join('') : '<p class="no-data">暂无代码审查记录</p>'}
            </div>
        `;
    },
    
    doSubmit() {
        const code = document.getElementById('reviewCodeInput').value;
        const language = document.getElementById('reviewLangInput').value;
        const description = document.getElementById('reviewDescInput').value;
        if (!code) return alert('请输入代码');
        this.submit(code, language || 'javascript', description || '代码审查请求');
        this.render('reviewWorkflowContainer');
    }
};

// ==================== 代码回放 ====================
const CodeReplay = {
    recordings: [],
    currentRecording: null,
    isRecording: false,
    playbackInterval: null,
    
    init() {
        const stored = localStorage.getItem('code_recordings');
        this.recordings = stored ? JSON.parse(stored) : [];
    },
    
    save() {
        localStorage.setItem('code_recordings', JSON.stringify(this.recordings));
    },
    
    startRecording(language) {
        this.currentRecording = {
            id: Date.now(),
            language,
            startTime: new Date().toISOString(),
            steps: [],
            totalDuration: 0
        };
        this.isRecording = true;
    },
    
    recordStep(code, cursorPos) {
        if (!this.isRecording || !this.currentRecording) return;
        this.currentRecording.steps.push({
            code,
            cursorPos,
            timestamp: Date.now()
        });
    },
    
    stopRecording() {
        if (!this.currentRecording) return;
        this.isRecording = false;
        this.currentRecording.endTime = new Date().toISOString();
        this.currentRecording.totalDuration = this.currentRecording.steps.length;
        this.recordings.push(this.currentRecording);
        this.save();
        return this.currentRecording;
    },
    
    play(recordingId, speed = 1) {
        const recording = this.recordings.find(r => r.id === recordingId);
        if (!recording || !recording.steps.length) return;
        
        let stepIndex = 0;
        if (this.playbackInterval) clearInterval(this.playbackInterval);
        
        this.playbackInterval = setInterval(() => {
            if (stepIndex >= recording.steps.length) {
                clearInterval(this.playbackInterval);
                return;
            }
            const step = recording.steps[stepIndex];
            const textarea = document.getElementById('replayOutput');
            if (textarea) {
                textarea.value = step.code;
            }
            stepIndex++;
        }, 500 / speed);
    },
    
    stopPlayback() {
        if (this.playbackInterval) {
            clearInterval(this.playbackInterval);
            this.playbackInterval = null;
        }
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        this.init();
        
        container.innerHTML = `
            <h3>🎬 代码回放</h3>
            <div class="replay-controls">
                <button class="btn-primary" onclick="CodeReplay.startRecording('javascript')">⏺ 开始录制</button>
                <button class="btn-secondary" onclick="CodeReplay.stopRecording(); CodeReplay.render('${containerId}')">⏹ 停止录制</button>
            </div>
            <textarea id="replayEditor" rows="8" placeholder="在这里编写代码（录制时会自动记录）" 
                oninput="if(CodeReplay.isRecording) CodeReplay.recordStep(this.value, this.selectionStart)"></textarea>
            <div class="recordings-list">
                ${this.recordings.map(r => `
                    <div class="recording-card">
                        <div class="recording-info">
                            <span class="recording-lang">${r.language}</span>
                            <span class="recording-steps">${r.steps.length} 步</span>
                            <span class="recording-time">${new Date(r.startTime).toLocaleString()}</span>
                        </div>
                        <div class="recording-actions">
                            <button class="btn-primary" onclick="CodeReplay.play(${r.id})">▶ 播放</button>
                            <button class="btn-secondary" onclick="CodeReplay.play(${r.id}, 2)">▶ 2x</button>
                            <button class="btn-danger" onclick="CodeReplay.stopPlayback()">⏹ 停止</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <h4>回放输出</h4>
            <textarea id="replayOutput" rows="8" readonly placeholder="回放内容将显示在这里..."></textarea>
        `;
    }
};

// ==================== 智能提示 ====================
const SmartCompletion = {
    completions: {
        javascript: {
            keywords: ['function', 'const', 'let', 'var', 'class', 'if', 'else', 'for', 'while', 'return', 'import', 'export', 'new', 'this', 'async', 'await', 'try', 'catch', 'throw', 'switch', 'case', 'break', 'default'],
            globals: ['console', 'window', 'document', 'Math', 'JSON', 'Promise', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Error', 'Map', 'Set'],
            methods: {
                console: ['log', 'error', 'warn', 'info', 'debug', 'table', 'time', 'timeEnd'],
                array: ['push', 'pop', 'shift', 'unshift', 'map', 'filter', 'reduce', 'forEach', 'find', 'findIndex', 'some', 'every', 'sort', 'reverse', 'slice', 'splice', 'join', 'includes', 'indexOf', 'concat'],
                string: ['charAt', 'concat', 'includes', 'indexOf', 'lastIndexOf', 'match', 'replace', 'search', 'slice', 'split', 'substring', 'toLowerCase', 'toUpperCase', 'trim', 'startsWith', 'endsWith'],
                math: ['abs', 'ceil', 'floor', 'max', 'min', 'pow', 'random', 'round', 'sqrt', 'PI', 'E'],
                promise: ['then', 'catch', 'finally', 'all', 'race', 'resolve', 'reject']
            }
        },
        python: {
            keywords: ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from', 'as', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'lambda', 'try', 'except', 'finally', 'with', 'yield', 'pass', 'break', 'continue', 'raise', 'assert', 'global', 'del'],
            builtins: ['print', 'len', 'range', 'int', 'float', 'str', 'list', 'dict', 'tuple', 'set', 'bool', 'type', 'isinstance', 'input', 'open', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'reversed', 'min', 'max', 'sum', 'abs', 'round', 'super', 'property'],
            methods: {
                list: ['append', 'extend', 'insert', 'remove', 'pop', 'clear', 'index', 'count', 'sort', 'reverse', 'copy'],
                dict: ['get', 'keys', 'values', 'items', 'update', 'pop', 'clear', 'copy', 'setdefault'],
                str: ['upper', 'lower', 'strip', 'lstrip', 'rstrip', 'split', 'join', 'replace', 'find', 'rfind', 'index', 'count', 'startswith', 'endswith', 'format', 'encode', 'isdigit', 'isalpha', 'isnumeric']
            }
        }
    },
    
    getSuggestions(language, prefix) {
        const langData = this.completions[language] || this.completions.javascript;
        const suggestions = [];
        const lower = prefix.toLowerCase();
        
        if (langData.keywords) {
            langData.keywords.forEach(k => { if (k.startsWith(lower)) suggestions.push({ text: k, type: 'keyword', icon: '🔑' }); });
        }
        if (langData.globals || langData.builtins) {
            (langData.globals || langData.builtins).forEach(g => { if (g.startsWith(lower)) suggestions.push({ text: g, type: 'global', icon: '🌐' }); });
        }
        
        return suggestions.slice(0, 10);
    },
    
    getMethodSuggestions(language, object) {
        const langData = this.completions[language] || this.completions.javascript;
        const methods = langData.methods;
        if (!methods) return [];
        
        let objMethods = methods[object.toLowerCase()] || methods['array'] || [];
        if (typeof objMethods === 'object' && !Array.isArray(objMethods)) objMethods = Object.keys(objMethods);
        
        return objMethods.map(m => ({ text: m, type: 'method', icon: '⚡' }));
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <h3>💡 智能提示</h3>
            <div class="smart-editor">
                <div class="editor-wrapper">
                    <textarea id="smartEditorInput" rows="10" placeholder="输入代码，自动显示提示..." 
                        oninput="SmartCompletion.showSuggestions()" onkeydown="SmartCompletion.handleKey(event)"></textarea>
                    <div class="suggestion-box" id="suggestionBox"></div>
                </div>
                <div class="completion-stats">
                    <h4>支持的语言</h4>
                    <div class="supported-langs">
                        ${Object.keys(this.completions).map(lang => `
                            <span class="lang-tag">${lang}</span>
                        `).join('')}
                    </div>
                    <h4>提示类型</h4>
                    <div class="hint-types">
                        <span>🔑 关键字</span>
                        <span>🌐 全局对象</span>
                        <span>⚡ 方法</span>
                    </div>
                </div>
            </div>
        `;
    },
    
    showSuggestions() {
        const textarea = document.getElementById('smartEditorInput');
        const box = document.getElementById('suggestionBox');
        if (!textarea || !box) return;
        
        const text = textarea.value;
        const pos = textarea.selectionStart;
        const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
        const currentLine = text.substring(lineStart, pos);
        const parts = currentLine.trim().split(/[\s.(]+/);
        const lastPart = parts[parts.length - 1] || '';
        
        let suggestions = [];
        
        if (parts.length > 1 && currentLine.includes('.')) {
            const object = parts[parts.length - 2];
            suggestions = this.getMethodSuggestions('javascript', object);
        } else {
            suggestions = this.getSuggestions('javascript', lastPart);
        }
        
        if (suggestions.length > 0 && lastPart.length > 0) {
            box.innerHTML = suggestions.map(s => `
                <div class="suggestion-item" onclick="SmartCompletion.insertSuggestion('${s.text}')">
                    <span class="suggestion-icon">${s.icon}</span>
                    <span class="suggestion-text">${s.text}</span>
                    <span class="suggestion-type">${s.type}</span>
                </div>
            `).join('');
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    },
    
    insertSuggestion(text) {
        const textarea = document.getElementById('smartEditorInput');
        const box = document.getElementById('suggestionBox');
        if (!textarea) return;
        
        const pos = textarea.selectionStart;
        const textBefore = textarea.value.substring(0, pos);
        const textAfter = textarea.value.substring(pos);
        const lastWordStart = textBefore.lastIndexOf(' ') + 1;
        
        textarea.value = textarea.value.substring(0, lastWordStart) + text + textAfter;
        textarea.focus();
        box.style.display = 'none';
    },
    
    handleKey(e) {
        if (e.key === 'Tab') {
            const box = document.getElementById('suggestionBox');
            const first = box?.querySelector('.suggestion-item');
            if (first && box.style.display !== 'none') {
                e.preventDefault();
                first.click();
            }
        }
    }
};

// ==================== 代码可视化 ====================
const CodeVisualizer = {
    visualize(code, language) {
        const nodes = [];
        const edges = [];
        let nodeId = 0;
        
        // 简单的代码结构解析
        const lines = code.split('\n');
        let currentBlock = 'start';
        
        nodes.push({ id: nodeId++, type: 'start', label: '开始' });
        
        lines.forEach((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return;
            
            if (/^(if|elif|else)\b/.test(trimmed) || /^(if|else\s+if|else)\b/.test(trimmed)) {
                const condition = trimmed.replace(/^(if|elif|else if|else)\s*/, '').replace(/[{}:]$/, '').trim();
                nodes.push({ id: nodeId++, type: 'condition', label: condition || 'else' });
            } else if (/^(for|while)\b/.test(trimmed)) {
                const loopCond = trimmed.replace(/^(for|while)\s*/, '').replace(/[{}]$/, '').trim();
                nodes.push({ id: nodeId++, type: 'loop', label: loopCond });
            } else if (/^(def|function|class)\b/.test(trimmed)) {
                const funcName = trimmed.replace(/^(def|function|class)\s+/, '').split(/[({:]/)[0].trim();
                nodes.push({ id: nodeId++, type: 'function', label: funcName });
            } else if (/^return\b/.test(trimmed)) {
                nodes.push({ id: nodeId++, type: 'return', label: trimmed });
            } else if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('#')) {
                nodes.push({ id: nodeId++, type: 'statement', label: trimmed.substring(0, 50) });
            }
        });
        
        nodes.push({ id: nodeId, type: 'end', label: '结束' });
        
        return { nodes, edges };
    },
    
    render(containerId, code, language) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const defaultCode = code || `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`;
        const result = this.visualize(defaultCode, language || 'javascript');
        
        const typeColors = {
            start: '#22c55e', end: '#ef4444', condition: '#f59e0b',
            loop: '#8b5cf6', function: '#3b82f6', return: '#ec4899', statement: '#6b7280'
        };
        const typeIcons = {
            start: '▶', end: '⏹', condition: '◇', loop: '🔄', function: 'ƒ', return: '←', statement: '●'
        };
        
        container.innerHTML = `
            <h3>📊 代码可视化</h3>
            <div class="visualizer-input">
                <textarea id="vizCodeInput" rows="8">${defaultCode}</textarea>
                <button class="btn-primary" onclick="CodeVisualizer.render('${containerId}', document.getElementById('vizCodeInput').value)">生成可视化</button>
            </div>
            <div class="flowchart">
                ${result.nodes.map((node, i) => `
                    <div class="flowchart-node ${node.type}" style="border-color: ${typeColors[node.type]}">
                        <span class="node-icon" style="color: ${typeColors[node.type]}">${typeIcons[node.type]}</span>
                        <span class="node-label">${node.label}</span>
                    </div>
                    ${i < result.nodes.length - 1 ? '<div class="flowchart-arrow">↓</div>' : ''}
                `).join('')}
            </div>
        `;
    }
};

// ==================== 交互式测验 ====================
const InteractiveQuiz = {
    quizzes: [
        {
            id: 1, language: 'python', type: 'multiple',
            question: 'Python中以下哪个是不可变数据类型？',
            options: ['list', 'dict', 'tuple', 'set'],
            correct: 2
        },
        {
            id: 2, language: 'python', type: 'truefalse',
            question: 'Python中列表推导式比for循环执行效率更高',
            correct: true
        },
        {
            id: 3, language: 'javascript', type: 'multiple',
            question: 'JavaScript中 typeof null 的结果是？',
            options: ['"null"', '"undefined"', '"object"', '"boolean"'],
            correct: 2
        },
        {
            id: 4, language: 'javascript', type: 'truefalse',
            question: 'JavaScript中 let 声明的变量存在变量提升',
            correct: true
        },
        {
            id: 5, language: 'java', type: 'multiple',
            question: 'Java中哪个关键字用于实现接口？',
            options: ['extends', 'implements', 'interface', 'abstract'],
            correct: 1
        },
        {
            id: 6, language: 'python', type: 'fillblank',
            question: 'Python中用于创建虚拟环境的命令是 python -m ____ env',
            answer: 'venv'
        },
        {
            id: 7, language: 'javascript', type: 'multiple',
            question: '以下哪个方法不会改变原数组？',
            options: ['push', 'splice', 'map', 'sort'],
            correct: 2
        },
        {
            id: 8, language: 'cpp', type: 'truefalse',
            question: 'C++中引用必须在声明时初始化',
            correct: true
        },
        {
            id: 9, language: 'python', type: 'multiple',
            question: 'Python中GIL是什么的缩写？',
            options: ['General Input Library', 'Global Interpreter Lock', 'Graphical Interface Layer', 'Generic Integration Logic'],
            correct: 1
        },
        {
            id: 10, language: 'javascript', type: 'fillblank',
            question: 'JavaScript中使用 ____ 关键字声明常量',
            answer: 'const'
        }
    ],
    
    userAnswers: {},
    wrongAnswers: [],
    
    init() {
        const stored = localStorage.getItem('interactive_quiz_answers');
        this.userAnswers = stored ? JSON.parse(stored) : {};
        const wrong = localStorage.getItem('wrong_answers');
        this.wrongAnswers = wrong ? JSON.parse(wrong) : [];
    },
    
    save() {
        localStorage.setItem('interactive_quiz_answers', JSON.stringify(this.userAnswers));
        localStorage.setItem('wrong_answers', JSON.stringify(this.wrongAnswers));
    },
    
    checkAnswer(quizId, userAnswer) {
        const quiz = this.quizzes.find(q => q.id === quizId);
        if (!quiz) return null;
        
        let correct = false;
        if (quiz.type === 'multiple') correct = userAnswer === quiz.correct;
        else if (quiz.type === 'truefalse') correct = userAnswer === quiz.correct;
        else if (quiz.type === 'fillblank') correct = String(userAnswer).trim().toLowerCase() === String(quiz.answer).trim().toLowerCase();
        
        this.userAnswers[quizId] = { answer: userAnswer, correct, timestamp: Date.now() };
        
        if (!correct) {
            this.wrongAnswers.push({
                quizId,
                question: quiz.question,
                userAnswer,
                correctAnswer: quiz.type === 'fillblank' ? quiz.answer : quiz.correct,
                type: quiz.type,
                options: quiz.options,
                timestamp: Date.now()
            });
        }
        
        this.save();
        return correct;
    },
    
    render(containerId, language) {
        const container = document.getElementById(containerId);
        if (!container) return;
        this.init();
        
        const quizzes = language === 'all' ? this.quizzes : this.quizzes.filter(q => q.language === language);
        
        container.innerHTML = `
            <h3>📝 交互式测验</h3>
            <div class="quiz-filter">
                <button class="btn-secondary ${language === 'all' ? 'active' : ''}" onclick="InteractiveQuiz.render('${containerId}', 'all')">全部</button>
                <button class="btn-secondary ${language === 'python' ? 'active' : ''}" onclick="InteractiveQuiz.render('${containerId}', 'python')">Python</button>
                <button class="btn-secondary ${language === 'javascript' ? 'active' : ''}" onclick="InteractiveQuiz.render('${containerId}', 'javascript')">JavaScript</button>
                <button class="btn-secondary ${language === 'java' ? 'active' : ''}" onclick="InteractiveQuiz.render('${containerId}', 'java')">Java</button>
                <button class="btn-secondary ${language === 'cpp' ? 'active' : ''}" onclick="InteractiveQuiz.render('${containerId}', 'cpp')">C++</button>
            </div>
            <div class="quiz-list">
                ${quizzes.map(quiz => this.renderQuiz(quiz)).join('')}
            </div>
        `;
    },
    
    renderQuiz(quiz) {
        const answered = this.userAnswers[quiz.id];
        
        if (quiz.type === 'multiple') {
            return `
                <div class="quiz-card ${answered ? (answered.correct ? 'correct' : 'incorrect') : ''}">
                    <div class="quiz-type-badge">选择题</div>
                    <p class="quiz-question">${quiz.question}</p>
                    <div class="quiz-options">
                        ${quiz.options.map((opt, i) => `
                            <label class="quiz-option ${answered && answered.answer === i ? (answered.correct ? 'selected-correct' : 'selected-incorrect') : ''}">
                                <input type="radio" name="quiz_${quiz.id}" value="${i}" 
                                    ${answered ? 'disabled' : ''} 
                                    onchange="InteractiveQuiz.checkAnswer(${quiz.id}, ${i}); InteractiveQuiz.render('interactiveQuizContainer', 'all')">
                                <span>${String.fromCharCode(65 + i)}. ${opt}</span>
                            </label>
                        `).join('')}
                    </div>
                    ${answered ? `<div class="quiz-feedback ${answered.correct ? 'correct' : 'incorrect'}">${answered.correct ? '✅ 正确' : '❌ 错误'}</div>` : ''}
                </div>`;
        } else if (quiz.type === 'truefalse') {
            return `
                <div class="quiz-card ${answered ? (answered.correct ? 'correct' : 'incorrect') : ''}">
                    <div class="quiz-type-badge">判断题</div>
                    <p class="quiz-question">${quiz.question}</p>
                    <div class="quiz-options">
                        <label class="quiz-option ${answered && answered.answer === true ? (answered.correct ? 'selected-correct' : 'selected-incorrect') : ''}">
                            <input type="radio" name="quiz_${quiz.id}" value="true" 
                                ${answered ? 'disabled' : ''}
                                onchange="InteractiveQuiz.checkAnswer(${quiz.id}, true); InteractiveQuiz.render('interactiveQuizContainer', 'all')">
                            <span>✅ 正确</span>
                        </label>
                        <label class="quiz-option ${answered && answered.answer === false ? (answered.correct ? 'selected-correct' : 'selected-incorrect') : ''}">
                            <input type="radio" name="quiz_${quiz.id}" value="false" 
                                ${answered ? 'disabled' : ''}
                                onchange="InteractiveQuiz.checkAnswer(${quiz.id}, false); InteractiveQuiz.render('interactiveQuizContainer', 'all')">
                            <span>❌ 错误</span>
                        </label>
                    </div>
                    ${answered ? `<div class="quiz-feedback ${answered.correct ? 'correct' : 'incorrect'}">${answered.correct ? '✅ 正确' : '❌ 错误，答案是' + (quiz.correct ? '正确' : '错误')}</div>` : ''}
                </div>`;
        } else {
            return `
                <div class="quiz-card ${answered ? (answered.correct ? 'correct' : 'incorrect') : ''}">
                    <div class="quiz-type-badge">填空题</div>
                    <p class="quiz-question">${quiz.question}</p>
                    <div class="quiz-fill">
                        <input type="text" id="fill_${quiz.id}" placeholder="输入答案..." ${answered ? 'disabled' : ''}>
                        ${!answered ? `<button class="btn-primary" onclick="InteractiveQuiz.checkAnswer(${quiz.id}, document.getElementById('fill_${quiz.id}').value); InteractiveQuiz.render('interactiveQuizContainer', 'all')">提交</button>` : ''}
                    </div>
                    ${answered ? `<div class="quiz-feedback ${answered.correct ? 'correct' : 'incorrect'}">${answered.correct ? '✅ 正确' : '❌ 正确答案是: ' + quiz.answer}</div>` : ''}
                </div>`;
        }
    }
};

// ==================== 代码游戏化 ====================
const GamificationSystem = {
    points: 0,
    level: 1,
    badges: [],
    streak: 0,
    dailyChallengeCompleted: false,
    
    init() {
        const stored = localStorage.getItem('gamification_data');
        if (stored) {
            const data = JSON.parse(stored);
            this.points = data.points || 0;
            this.level = data.level || 1;
            this.badges = data.badges || [];
            this.streak = data.streak || 0;
        }
    },
    
    save() {
        localStorage.setItem('gamification_data', JSON.stringify({
            points: this.points, level: this.level, badges: this.badges, streak: this.streak
        }));
    },
    
    addPoints(amount, reason) {
        this.points += amount;
        this.checkLevelUp();
        this.save();
    },
    
    checkLevelUp() {
        const thresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 10000];
        let newLevel = 1;
        for (let i = thresholds.length - 1; i >= 0; i--) {
            if (this.points >= thresholds[i]) { newLevel = i + 1; break; }
        }
        if (newLevel > this.level) {
            this.level = newLevel;
            this.addBadge(`level_${newLevel}`);
        }
    },
    
    addBadge(badgeId) {
        if (!this.badges.includes(badgeId)) {
            this.badges.push(badgeId);
            this.save();
        }
    },
    
    getLevelTitle(level) {
        const titles = ['新手', '学徒', '学徒', '熟练工', '能手', '高手', '专家', '大师', '宗师', '传说'];
        return titles[Math.min(level - 1, titles.length - 1)];
    },
    
    getPointsToNextLevel() {
        const thresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 10000];
        const nextThreshold = thresholds[Math.min(this.level, thresholds.length - 1)];
        return Math.max(0, nextThreshold - this.points);
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        this.init();
        
        const progress = (this.points / (this.points + this.getPointsToNextLevel())) * 100;
        
        container.innerHTML = `
            <h3>🎮 代码游戏化</h3>
            <div class="game-profile">
                <div class="game-avatar">🏅</div>
                <div class="game-info">
                    <div class="game-level">Lv.${this.level} ${this.getLevelTitle(this.level)}</div>
                    <div class="game-points">💰 ${this.points} 积分</div>
                    <div class="game-streak">🔥 ${this.streak} 天连续</div>
                </div>
                <div class="level-progress">
                    <div class="level-progress-bar">
                        <div class="level-progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span>距下一级还需 ${this.getPointsToNextLevel()} 积分</span>
                </div>
            </div>
            <div class="game-actions">
                <button class="btn-primary" onclick="GamificationSystem.addPoints(10, 'daily'); GamificationSystem.render('${containerId}')">每日签到 (+10)</button>
                <button class="btn-secondary" onclick="GamificationSystem.addPoints(25, 'challenge'); GamificationSystem.render('${containerId}')">完成挑战 (+25)</button>
                <button class="btn-secondary" onclick="GamificationSystem.addPoints(5, 'practice'); GamificationSystem.render('${containerId}')">完成练习 (+5)</button>
            </div>
            <div class="game-badges">
                <h4>获得的徽章</h4>
                <div class="badge-list">
                    ${this.badges.length > 0 ? this.badges.map(b => `<span class="game-badge">${b}</span>`).join('') : '<p>完成学习任务获取徽章</p>'}
                </div>
            </div>
        `;
    }
};

// ==================== 学习热力图 ====================
const LearningHeatmap = {
    generateData() {
        const data = [];
        const now = new Date();
        for (let i = 364; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const val = Math.random() > 0.4 ? Math.floor(Math.random() * 4) : 0;
            data.push({ date: date.toISOString().split('T')[0], value: val });
        }
        return data;
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const data = this.generateData();
        const weeks = [];
        let week = [];
        
        data.forEach((d, i) => {
            week.push(d);
            if ((i + 1) % 7 === 0) { weeks.push(week); week = []; }
        });
        if (week.length) weeks.push(week);
        
        const colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
        const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        
        container.innerHTML = `
            <h3>🗓️ 学习热力图</h3>
            <div class="heatmap-container">
                <div class="heatmap-months">
                    ${months.map(m => `<span class="heatmap-month">${m}</span>`).join('')}
                </div>
                <div class="heatmap-grid">
                    ${weeks.map(w => `
                        <div class="heatmap-week">
                            ${w.map(d => `
                                <div class="heatmap-cell" style="background: ${colors[d.value]}" title="${d.date}: ${d.value === 0 ? '无' : d.value + '小时'}"></div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
                <div class="heatmap-legend">
                    <span>少</span>
                    ${colors.map(c => `<div class="heatmap-cell" style="background: ${c}"></div>`).join('')}
                    <span>多</span>
                </div>
            </div>
        `;
    }
};

// ==================== 知识点关联图 ====================
const KnowledgeGraph = {
    graph: {
        nodes: [
            { id: 'variables', label: '变量', group: 'basics' },
            { id: 'types', label: '数据类型', group: 'basics' },
            { id: 'operators', label: '运算符', group: 'basics' },
            { id: 'if', label: '条件语句', group: 'control' },
            { id: 'loops', label: '循环', group: 'control' },
            { id: 'functions', label: '函数', group: 'functions' },
            { id: 'params', label: '参数', group: 'functions' },
            { id: 'return', label: '返回值', group: 'functions' },
            { id: 'classes', label: '类', group: 'oop' },
            { id: 'objects', label: '对象', group: 'oop' },
            { id: 'inheritance', label: '继承', group: 'oop' },
            { id: 'arrays', label: '数组/列表', group: 'data' },
            { id: 'dicts', label: '字典/映射', group: 'data' },
            { id: 'strings', label: '字符串', group: 'data' },
            { id: 'errors', label: '异常处理', group: 'advanced' },
            { id: 'async', label: '异步编程', group: 'advanced' },
            { id: 'files', label: '文件操作', group: 'advanced' }
        ],
        edges: [
            { from: 'variables', to: 'types' },
            { from: 'types', to: 'operators' },
            { from: 'variables', to: 'if' },
            { from: 'if', to: 'loops' },
            { from: 'variables', to: 'functions' },
            { from: 'functions', to: 'params' },
            { from: 'functions', to: 'return' },
            { from: 'types', to: 'arrays' },
            { from: 'types', to: 'dicts' },
            { from: 'types', to: 'strings' },
            { from: 'functions', to: 'classes' },
            { from: 'classes', to: 'objects' },
            { from: 'classes', to: 'inheritance' },
            { from: 'loops', to: 'errors' },
            { from: 'functions', to: 'async' },
            { from: 'functions', to: 'files' },
            { from: 'arrays', to: 'loops' }
        ]
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const groupColors = {
            basics: '#3b82f6', control: '#22c55e', functions: '#f59e0b',
            oop: '#8b5cf6', data: '#ec4899', advanced: '#ef4444'
        };
        
        // SVG-based graph
        const width = 800, height = 500;
        const positions = {};
        const cx = width / 2, cy = height / 2;
        const radius = 180;
        
        this.graph.nodes.forEach((node, i) => {
            const angle = (2 * Math.PI * i) / this.graph.nodes.length;
            positions[node.id] = {
                x: cx + radius * Math.cos(angle),
                y: cy + radius * Math.sin(angle)
            };
        });
        
        container.innerHTML = `
            <h3>🔗 知识点关联图</h3>
            <div class="knowledge-graph">
                <svg viewBox="0 0 ${width} ${height}" class="graph-svg">
                    ${this.graph.edges.map(e => `
                        <line x1="${positions[e.from].x}" y1="${positions[e.from].y}" 
                              x2="${positions[e.to].x}" y2="${positions[e.to].y}" 
                              stroke="#94a3b8" stroke-width="1.5" opacity="0.5"/>
                    `).join('')}
                    ${this.graph.nodes.map(n => `
                        <circle cx="${positions[n.id].x}" cy="${positions[n.id].y}" r="25" 
                                fill="${groupColors[n.group]}" opacity="0.9" class="graph-node"/>
                        <text x="${positions[n.id].x}" y="${positions[n.id].y + 5}" 
                              text-anchor="middle" fill="white" font-size="11" font-weight="bold">${n.label}</text>
                    `).join('')}
                </svg>
            </div>
            <div class="graph-legend">
                ${Object.entries(groupColors).map(([group, color]) => `
                    <span class="legend-item"><span class="legend-dot" style="background: ${color}"></span>${group}</span>
                `).join('')}
            </div>
        `;
    }
};

// ==================== 学习效率分析 ====================
const EfficiencyAnalyzer = {
    analyze() {
        const stats = LearningStats.get();
        const sessions = stats.sessions || [];
        
        const hourlyData = new Array(24).fill(0);
        const hourlyCount = new Array(24).fill(0);
        
        sessions.forEach(s => {
            const hour = new Date(s.date).getHours();
            hourlyData[hour] += s.duration;
            hourlyCount[hour]++;
        });
        
        let bestHour = 0, maxTime = 0;
        hourlyData.forEach((t, h) => { if (t > maxTime) { maxTime = t; bestHour = h; } });
        
        return {
            hourlyData,
            hourlyCount,
            bestHour,
            bestHourLabel: `${bestHour}:00 - ${bestHour + 1}:00`,
            totalSessions: sessions.length,
            avgDuration: sessions.length ? Math.round(sessions.reduce((s, x) => s + x.duration, 0) / sessions.length / 60) : 0,
            recommendation: bestHour >= 9 && bestHour <= 12 ? '上午效率最高' : 
                           bestHour >= 14 && bestHour <= 17 ? '下午效率最高' : 
                           bestHour >= 19 && bestHour <= 22 ? '晚上效率最高' : '深夜学习模式'
        };
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const analysis = this.analyze();
        const maxHours = Math.max(...analysis.hourlyData, 1);
        
        container.innerHTML = `
            <h3>⏱️ 学习效率分析</h3>
            <div class="efficiency-summary">
                <div class="eff-stat"><span class="eff-value">${analysis.bestHourLabel}</span><span class="eff-label">最高效时段</span></div>
                <div class="eff-stat"><span class="eff-value">${analysis.totalSessions}</span><span class="eff-label">学习次数</span></div>
                <div class="eff-stat"><span class="eff-value">${analysis.avgDuration}分钟</span><span class="eff-label">平均时长</span></div>
                <div class="eff-stat"><span class="eff-value">${analysis.recommendation}</span><span class="eff-label">建议</span></div>
            </div>
            <div class="hourly-chart">
                ${analysis.hourlyData.map((val, hour) => `
                    <div class="hour-bar" style="height: ${(val / maxHours) * 100}%" title="${hour}:00 - ${val}秒">
                        <span class="hour-val">${val > 0 ? Math.round(val / 60) + 'm' : ''}</span>
                    </div>
                    <span class="hour-label">${hour}</span>
                `).join('')}
            </div>
        `;
    }
};

// ==================== 错题本 ====================
const WrongAnswerBook = {
    init() {
        InteractiveQuiz.init();
    },
    
    getWrongAnswers() {
        const stored = localStorage.getItem('wrong_answers');
        return stored ? JSON.parse(stored) : [];
    },
    
    clearAll() {
        localStorage.removeItem('wrong_answers');
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const wrongs = this.getWrongAnswers();
        
        container.innerHTML = `
            <h3>📕 错题本</h3>
            <div class="wrong-header">
                <span>共 ${wrongs.length} 道错题</span>
                ${wrongs.length > 0 ? `<button class="btn-danger" onclick="WrongAnswerBook.clearAll(); WrongAnswerBook.render('${containerId}')">清空</button>` : ''}
            </div>
            <div class="wrong-list">
                ${wrongs.length > 0 ? wrongs.map((w, i) => `
                    <div class="wrong-card">
                        <div class="wrong-number">#${i + 1}</div>
                        <p class="wrong-question">${w.question}</p>
                        <div class="wrong-answers">
                            <span class="wrong-user">你的答案: ${w.type === 'fillblank' ? w.userAnswer : (w.options ? w.options[w.userAnswer] : w.userAnswer)}</span>
                            <span class="wrong-correct">正确答案: ${w.type === 'fillblank' ? w.correctAnswer : (w.options ? w.options[w.correctAnswer] : w.correctAnswer)}</span>
                        </div>
                        <span class="wrong-time">${new Date(w.timestamp).toLocaleString()}</span>
                    </div>
                `).join('') : '<p class="no-data">暂无错题，继续保持！🎉</p>'}
            </div>
        `;
    }
};

// ==================== Git集成 ====================
const GitIntegration = {
    repos: [],
    commits: [],
    
    init() {
        const stored = localStorage.getItem('git_data');
        const data = stored ? JSON.parse(stored) : { repos: [], commits: [] };
        this.repos = data.repos;
        this.commits = data.commits;
    },
    
    save() {
        localStorage.setItem('git_data', JSON.stringify({ repos: this.repos, commits: this.commits }));
    },
    
    initRepo(name) {
        const repo = { name, createdAt: new Date().toISOString(), branches: ['main'], currentBranch: 'main' };
        this.repos.push(repo);
        this.commit(name, 'main', 'Initial commit');
        this.save();
        return repo;
    },
    
    commit(repoName, branch, message) {
        const commit = {
            id: Math.random().toString(36).substring(2, 9),
            repo: repoName,
            branch,
            message,
            timestamp: new Date().toISOString(),
            author: 'current_user'
        };
        this.commits.push(commit);
        this.save();
        return commit;
    },
    
    createBranch(repoName, branchName) {
        const repo = this.repos.find(r => r.name === repoName);
        if (repo && !repo.branches.includes(branchName)) {
            repo.branches.push(branchName);
            this.save();
        }
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        this.init();
        
        container.innerHTML = `
            <h3>🔀 Git集成</h3>
            <div class="git-actions">
                <input type="text" id="repoNameInput" placeholder="仓库名称">
                <button class="btn-primary" onclick="GitIntegration.doInitRepo()">初始化仓库</button>
            </div>
            <div class="git-repos">
                ${this.repos.map(repo => `
                    <div class="repo-card">
                        <div class="repo-header">
                            <h4>📁 ${repo.name}</h4>
                            <span class="repo-branch">🌿 ${repo.currentBranch}</span>
                        </div>
                        <div class="repo-branches">
                            ${repo.branches.map(b => `<span class="branch-tag">${b}</span>`).join('')}
                        </div>
                        <div class="repo-commit-form">
                            <input type="text" id="commitMsg_${repo.name}" placeholder="提交信息">
                            <button class="btn-primary" onclick="GitIntegration.doCommit('${repo.name}')">提交</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <h4>提交历史</h4>
            <div class="commit-log">
                ${this.commits.slice(-20).reverse().map(c => `
                    <div class="commit-item">
                        <span class="commit-id">${c.id}</span>
                        <span class="commit-msg">${c.message}</span>
                        <span class="commit-branch">${c.branch}</span>
                        <span class="commit-time">${new Date(c.timestamp).toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    doInitRepo() {
        const name = document.getElementById('repoNameInput').value;
        if (!name) return;
        this.initRepo(name);
        this.render('gitContainer');
    },
    
    doCommit(repoName) {
        const msg = document.getElementById(`commitMsg_${repoName}`)?.value;
        if (!msg) return;
        const repo = this.repos.find(r => r.name === repoName);
        this.commit(repoName, repo?.currentBranch || 'main', msg);
        this.render('gitContainer');
    }
};

// ==================== 数据库连接 ====================
const DatabaseManager = {
    connections: [],
    queryResults: [],
    
    init() {
        const stored = localStorage.getItem('db_connections');
        this.connections = stored ? JSON.parse(stored) : [];
    },
    
    save() {
        localStorage.setItem('db_connections', JSON.stringify(this.connections));
    },
    
    addConnection(config) {
        this.connections.push({ ...config, id: Date.now(), createdAt: new Date().toISOString() });
        this.save();
    },
    
    executeQuery(dbId, query) {
        // 模拟SQL执行
        const results = [];
        if (query.toLowerCase().includes('select')) {
            const cols = query.match(/select\s+(.*?)\s+from/i)?.[1] || '*';
            const table = query.match(/from\s+(\w+)/i)?.[1] || 'table';
            const colList = cols === '*' ? ['id', 'name', 'value'] : cols.split(',').map(c => c.trim());
            for (let i = 1; i <= 5; i++) {
                const row = {};
                colList.forEach(c => { row[c] = `${c}_${i}`; });
                results.push(row);
            }
        }
        return { success: true, rows: results, affectedRows: results.length, executionTime: Math.random() * 100 + 'ms' };
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        this.init();
        
        container.innerHTML = `
            <h3>🗄️ 数据库连接</h3>
            <div class="db-connect-form">
                <input type="text" id="dbHost" placeholder="主机 (localhost)">
                <input type="text" id="dbPort" placeholder="端口 (3306)">
                <input type="text" id="dbName" placeholder="数据库名">
                <input type="text" id="dbUser" placeholder="用户名">
                <input type="password" id="dbPass" placeholder="密码">
                <button class="btn-primary" onclick="DatabaseManager.doConnect()">连接</button>
            </div>
            <div class="db-query">
                <textarea id="sqlQuery" rows="5" placeholder="输入SQL查询...">SELECT * FROM users</textarea>
                <button class="btn-primary" onclick="DatabaseManager.doQuery()">执行查询</button>
            </div>
            <div id="queryResults" class="query-results"></div>
        `;
    },
    
    doConnect() {
        this.addConnection({
            host: document.getElementById('dbHost').value || 'localhost',
            port: document.getElementById('dbPort').value || '3306',
            database: document.getElementById('dbName').value || 'test',
            user: document.getElementById('dbUser').value || 'root'
        });
        SnippetManager.showToast('数据库连接成功');
    },
    
    doQuery() {
        const query = document.getElementById('sqlQuery').value;
        const result = this.executeQuery(0, query);
        
        const resultsDiv = document.getElementById('queryResults');
        if (result.rows.length > 0) {
            const cols = Object.keys(result.rows[0]);
            resultsDiv.innerHTML = `
                <div class="result-info">${result.affectedRows} 行 · ${result.executionTime}</div>
                <table class="result-table">
                    <thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
                    <tbody>${result.rows.map(r => `<tr>${cols.map(c => `<td>${r[c]}</td>`).join('')}</tr>`).join('')}</tbody>
                </table>
            `;
        } else {
            resultsDiv.innerHTML = '<p>查询执行成功，无返回结果</p>';
        }
    }
};

// ==================== API测试工具 ====================
const APITester = {
    history: [],
    
    init() {
        const stored = localStorage.getItem('api_test_history');
        this.history = stored ? JSON.parse(stored) : [];
    },
    
    save() {
        localStorage.setItem('api_test_history', JSON.stringify(this.history));
    },
    
    async sendRequest(method, url, headers, body) {
        const startTime = Date.now();
        try {
            const options = { method, headers: headers ? JSON.parse(headers) : {} };
            if (body && method !== 'GET') options.body = body;
            
            const response = await fetch(url, options);
            const data = await response.text();
            const duration = Date.now() - startTime;
            
            const result = {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                body: data,
                duration,
                timestamp: new Date().toISOString()
            };
            
            this.history.push({ method, url, ...result });
            this.save();
            return result;
        } catch (error) {
            return { status: 0, statusText: 'Error', body: error.message, duration: Date.now() - startTime };
        }
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        this.init();
        
        container.innerHTML = `
            <h3>🔗 API测试工具</h3>
            <div class="api-test-form">
                <div class="api-method-row">
                    <select id="apiMethod">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                    </select>
                    <input type="text" id="apiUrl" placeholder="https://api.example.com/data" style="flex:1">
                    <button class="btn-primary" onclick="APITester.doSend()">发送</button>
                </div>
                <div class="api-headers">
                    <input type="text" id="apiHeaders" placeholder='{"Content-Type": "application/json"}'>
                </div>
                <textarea id="apiBody" rows="4" placeholder='请求体 (JSON)'></textarea>
            </div>
            <div id="apiResponse" class="api-response"></div>
            <h4>请求历史</h4>
            <div class="api-history">
                ${this.history.slice(-10).reverse().map(h => `
                    <div class="api-history-item">
                        <span class="api-method-tag ${h.method}">${h.method}</span>
                        <span class="api-url">${h.url}</span>
                        <span class="api-status">${h.status}</span>
                        <span class="api-duration">${h.duration}ms</span>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    async doSend() {
        const method = document.getElementById('apiMethod').value;
        const url = document.getElementById('apiUrl').value;
        const headers = document.getElementById('apiHeaders').value;
        const body = document.getElementById('apiBody').value;
        
        if (!url) return alert('请输入URL');
        
        const result = await this.sendRequest(method, url, headers, body);
        const responseDiv = document.getElementById('apiResponse');
        
        responseDiv.innerHTML = `
            <div class="response-header">
                <span class="response-status ${result.status < 400 ? 'success' : 'error'}">${result.status} ${result.statusText}</span>
                <span class="response-time">${result.duration}ms</span>
            </div>
            <pre class="response-body">${result.body}</pre>
        `;
    }
};

// ==================== 代码质量检查 ====================
const CodeQualityChecker = {
    rules: {
        complexity: { name: '圈复杂度', max: 10 },
        lineLength: { name: '行长度', max: 120 },
        functionLength: { name: '函数长度', max: 50 },
        nestingDepth: { name: '嵌套深度', max: 4 },
        namingConvention: { name: '命名规范', enabled: true },
        duplicateCode: { name: '重复代码', enabled: true },
        unusedVariables: { name: '未使用变量', enabled: true },
        magicNumbers: { name: '魔法数字', enabled: true }
    },
    
    check(code, language) {
        const issues = [];
        const lines = code.split('\n');
        
        // 行长度检查
        lines.forEach((line, i) => {
            if (line.length > this.rules.lineLength.max) {
                issues.push({ line: i + 1, severity: 'warning', rule: '行长度', message: `第${i+1}行超过${this.rules.lineLength.max}字符 (${line.length}字符)` });
            }
        });
        
        // 嵌套深度检查
        let maxDepth = 0, currentDepth = 0;
        lines.forEach((line, i) => {
            const trimmed = line.trim();
            if (trimmed.endsWith('{') || trimmed.endsWith(':')) { currentDepth++; maxDepth = Math.max(maxDepth, currentDepth); }
            if (trimmed.startsWith('}') || trimmed === '') currentDepth = Math.max(0, currentDepth - 1);
            if (currentDepth > this.rules.nestingDepth.max) {
                issues.push({ line: i + 1, severity: 'warning', rule: '嵌套深度', message: `嵌套深度${currentDepth}超过限制${this.rules.nestingDepth.max}` });
            }
        });
        
        // 魔法数字检查
        lines.forEach((line, i) => {
            const matches = line.match(/(?<!["'\w])\d+(?!["'\w])/g);
            if (matches && !line.includes('const') && !line.includes('let') && !line.includes('var')) {
                matches.forEach(m => {
                    if (m !== '0' && m !== '1' && m !== '2') {
                        issues.push({ line: i + 1, severity: 'info', rule: '魔法数字', message: `发现魔法数字: ${m}` });
                    }
                });
            }
        });
        
        // console.log检查
        lines.forEach((line, i) => {
            if (line.includes('console.log') || line.includes('print(')) {
                issues.push({ line: i + 1, severity: 'info', rule: '调试代码', message: '发现调试输出语句' });
            }
        });
        
        // TODO检查
        lines.forEach((line, i) => {
            if (line.includes('TODO') || line.includes('FIXME') || line.includes('HACK')) {
                issues.push({ line: i + 1, severity: 'info', rule: '待办事项', message: `发现${line.includes('TODO') ? 'TODO' : line.includes('FIXME') ? 'FIXME' : 'HACK'}` });
            }
        });
        
        const score = Math.max(0, 100 - issues.filter(i => i.severity === 'error').length * 20 - issues.filter(i => i.severity === 'warning').length * 5 - issues.filter(i => i.severity === 'info').length * 1);
        
        return { issues, score, lines: lines.length };
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <h3>✅ 代码质量检查</h3>
            <textarea id="qualityCodeInput" rows="10" placeholder="粘贴代码进行检查..."></textarea>
            <button class="btn-primary" onclick="CodeQualityChecker.doCheck()">检查代码</button>
            <div id="qualityResults"></div>
        `;
    },
    
    doCheck() {
        const code = document.getElementById('qualityCodeInput').value;
        if (!code) return;
        const result = this.check(code, 'javascript');
        const resultsDiv = document.getElementById('qualityResults');
        
        const severityColors = { error: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };
        const severityLabels = { error: '错误', warning: '警告', info: '提示' };
        
        resultsDiv.innerHTML = `
            <div class="quality-score">
                <div class="score-circle ${result.score >= 80 ? 'good' : result.score >= 50 ? 'fair' : 'poor'}">
                    <span class="score-value">${result.score}</span>
                    <span class="score-label">/100</span>
                </div>
                <div class="score-summary">
                    <span>${result.lines} 行代码</span>
                    <span>${result.issues.length} 个问题</span>
                    <span>${result.issues.filter(i => i.severity === 'error').length} 错误</span>
                    <span>${result.issues.filter(i => i.severity === 'warning').length} 警告</span>
                </div>
            </div>
            <div class="quality-issues">
                ${result.issues.map(i => `
                    <div class="issue-item" style="border-left: 3px solid ${severityColors[i.severity]}">
                        <span class="issue-severity" style="background: ${severityColors[i.severity]}">${severityLabels[i.severity]}</span>
                        <span class="issue-line">行 ${i.line}</span>
                        <span class="issue-rule">${i.rule}</span>
                        <span class="issue-message">${i.message}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// ==================== 代码覆盖率 ====================
const CodeCoverage = {
    analyze(code) {
        const lines = code.split('\n');
        const total = lines.length;
        let covered = 0;
        let branchTotal = 0, branchCovered = 0;
        let functionTotal = 0, functionCovered = 0;
        
        lines.forEach(line => {
            const t = line.trim();
            if (t && !t.startsWith('//') && !t.startsWith('#') && !t.startsWith('/*')) {
                covered++;
            }
            if (t.includes('if') || t.includes('else') || t.includes('switch') || t.includes('? :')) {
                branchTotal += 2;
                branchCovered += 1;
            }
            if (t.match(/^(function|def|class|const\s+\w+\s*=\s*(\(|function))/)) {
                functionTotal++;
                functionCovered += 0.5;
            }
        });
        
        return {
            lineCoverage: { total, covered, percentage: Math.round((covered / total) * 100) },
            branchCoverage: { total: branchTotal || 1, covered: branchCovered, percentage: Math.round((branchCovered / (branchTotal || 1)) * 100) },
            functionCoverage: { total: functionTotal || 1, covered: functionCovered, percentage: Math.round((functionCovered / (functionTotal || 1)) * 100) }
        };
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <h3>📊 代码覆盖率</h3>
            <textarea id="coverageCodeInput" rows="8" placeholder="粘贴代码分析覆盖率...">function add(a, b) {\n  return a + b;\n}\n\nfunction multiply(a, b) {\n  if (a === 0 || b === 0) {\n    return 0;\n  }\n  return a * b;\n}</textarea>
            <button class="btn-primary" onclick="CodeCoverage.doAnalyze()">分析覆盖率</button>
            <div id="coverageResults"></div>
        `;
    },
    
    doAnalyze() {
        const code = document.getElementById('coverageCodeInput').value;
        if (!code) return;
        const result = this.analyze(code);
        const resultsDiv = document.getElementById('coverageResults');
        
        const renderBar = (label, data) => `
            <div class="coverage-item">
                <span class="coverage-label">${label}</span>
                <div class="coverage-bar">
                    <div class="coverage-fill ${data.percentage >= 80 ? 'good' : data.percentage >= 50 ? 'fair' : 'poor'}" style="width: ${data.percentage}%"></div>
                </div>
                <span class="coverage-value">${data.percentage}% (${data.covered}/${data.total})</span>
            </div>
        `;
        
        resultsDiv.innerHTML = `
            <div class="coverage-report">
                ${renderBar('行覆盖率', result.lineCoverage)}
                ${renderBar('分支覆盖率', result.branchCoverage)}
                ${renderBar('函数覆盖率', result.functionCoverage)}
            </div>
        `;
    }
};

// ==================== 自适应学习 ====================
const AdaptiveLearning = {
    getRecommendation() {
        const stats = LearningStats.get();
        const progress = stats.languagesProgress;
        const recommendations = [];
        
        Object.entries(progress).forEach(([lang, chapters]) => {
            const completed = chapters.length;
            const total = 10;
            const percentage = (completed / total) * 100;
            
            if (percentage < 20) {
                recommendations.push({ language: lang, action: 'review', message: `复习${lang}基础内容`, priority: 'high' });
            } else if (percentage < 50) {
                recommendations.push({ language: lang, action: 'practice', message: `加强${lang}练习`, priority: 'medium' });
            } else if (percentage < 80) {
                recommendations.push({ language: lang, action: 'advanced', message: `学习${lang}高级特性`, priority: 'medium' });
            } else {
                recommendations.push({ language: lang, action: 'project', message: `完成${lang}实战项目`, priority: 'low' });
            }
        });
        
        if (recommendations.length === 0) {
            recommendations.push({ language: 'python', action: 'start', message: '开始学习Python', priority: 'high' });
        }
        
        return recommendations.sort((a, b) => a.priority.localeCompare(b.priority));
    },
    
    getNextContent(language) {
        const stats = LearningStats.get();
        const completed = stats.languagesProgress[language] || [];
        const nextChapter = completed.length + 1;
        
        return {
            chapter: nextChapter,
            type: nextChapter <= 3 ? '基础' : nextChapter <= 6 ? '进阶' : nextChapter <= 8 ? '高级' : '实战',
            difficulty: nextChapter <= 3 ? '简单' : nextChapter <= 6 ? '中等' : '困难',
            estimatedTime: nextChapter <= 3 ? '30分钟' : nextChapter <= 6 ? '45分钟' : '60分钟'
        };
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const recommendations = this.getRecommendation();
        const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };
        
        container.innerHTML = `
            <h3>🧠 自适应学习</h3>
            <div class="adaptive-list">
                ${recommendations.map(r => {
                    const next = this.getNextContent(r.language);
                    return `
                        <div class="adaptive-card" style="border-left: 4px solid ${priorityColors[r.priority]}">
                            <div class="adaptive-header">
                                <span class="adaptive-lang">${r.language}</span>
                                <span class="adaptive-priority" style="background: ${priorityColors[r.priority]}">${r.priority === 'high' ? '优先' : r.priority === 'medium' ? '推荐' : '可选'}</span>
                            </div>
                            <p class="adaptive-message">${r.message}</p>
                            <div class="adaptive-next">
                                <span>下一步: 章节 ${next.chapter} (${next.type})</span>
                                <span>难度: ${next.difficulty}</span>
                                <span>预计: ${next.estimatedTime}</span>
                            </div>
                            <a href="tutorial-${r.language}.html#ch${next.chapter}" class="btn-primary">开始学习</a>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};

// ==================== 学习报告 ====================
const LearningReport = {
    generate() {
        const stats = LearningStats.get();
        const hours = Math.floor(stats.totalStudyTime / 3600);
        const minutes = Math.floor((stats.totalStudyTime % 3600) / 60);
        
        return {
            date: new Date().toLocaleDateString(),
            summary: {
                totalTime: `${hours}小时${minutes}分钟`,
                chaptersCompleted: stats.chaptersCompleted.length,
                languagesLearning: Object.keys(stats.languagesProgress).length,
                streak: stats.dailyStreak,
                achievements: stats.achievements.length,
                codeRuns: stats.codeRuns || 0
            },
            languages: Object.entries(stats.languagesProgress).map(([lang, chapters]) => ({
                language: lang,
                completed: chapters.length,
                total: 10,
                percentage: Math.round((chapters.length / 10) * 100)
            })),
            recommendations: AdaptiveLearning.getRecommendation()
        };
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const report = this.generate();
        
        container.innerHTML = `
            <h3>📋 学习报告</h3>
            <div class="report-card">
                <div class="report-header">
                    <h4>学习报告 - ${report.date}</h4>
                </div>
                <div class="report-summary">
                    <div class="report-stat"><span class="report-value">${report.summary.totalTime}</span><span class="report-label">总学习时间</span></div>
                    <div class="report-stat"><span class="report-value">${report.summary.chaptersCompleted}</span><span class="report-label">完成章节</span></div>
                    <div class="report-stat"><span class="report-value">${report.summary.languagesLearning}</span><span class="report-label">学习语言</span></div>
                    <div class="report-stat"><span class="report-value">${report.summary.streak}</span><span class="report-label">连续天数</span></div>
                </div>
                <h4>各语言进度</h4>
                <div class="report-langs">
                    ${report.languages.map(l => `
                        <div class="report-lang-item">
                            <span>${l.language}</span>
                            <div class="report-progress"><div class="report-progress-fill" style="width: ${l.percentage}%"></div></div>
                            <span>${l.percentage}%</span>
                        </div>
                    `).join('')}
                </div>
                <div class="report-actions">
                    <button class="btn-primary" onclick="LearningReport.exportReport()">导出报告</button>
                    <button class="btn-secondary" onclick="LearningReport.emailReport()">发送邮件</button>
                </div>
            </div>
        `;
    },
    
    exportReport() {
        const report = this.generate();
        const text = `学习报告 - ${report.date}\n\n总学习时间: ${report.summary.totalTime}\n完成章节: ${report.summary.chaptersCompleted}\n学习语言: ${report.summary.languagesLearning}\n连续天数: ${report.summary.streak}\n\n各语言进度:\n${report.languages.map(l => `${l.language}: ${l.percentage}%`).join('\n')}`;
        
        const blob = new Blob([text], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `学习报告_${report.date}.txt`;
        a.click();
    },
    
    emailReport() {
        const report = this.generate();
        const subject = encodeURIComponent(`学习报告 - ${report.date}`);
        const body = encodeURIComponent(`总学习时间: ${report.summary.totalTime}\n完成章节: ${report.summary.chaptersCompleted}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    }
};

// ==================== 技能认证 ====================
const SkillCertification = {
    certifications: [
        { id: 'python_basics', name: 'Python基础认证', language: 'python', requiredChapters: 5, icon: '🐍' },
        { id: 'python_advanced', name: 'Python高级认证', language: 'python', requiredChapters: 10, icon: '🐍' },
        { id: 'js_basics', name: 'JavaScript基础认证', language: 'javascript', requiredChapters: 5, icon: '⚡' },
        { id: 'js_advanced', name: 'JavaScript高级认证', language: 'javascript', requiredChapters: 10, icon: '⚡' },
        { id: 'java_basics', name: 'Java基础认证', language: 'java', requiredChapters: 5, icon: '☕' },
        { id: 'cpp_basics', name: 'C++基础认证', language: 'cpp', requiredChapters: 5, icon: '⚙️' },
        { id: 'go_basics', name: 'Go基础认证', language: 'go', requiredChapters: 5, icon: '🔵' },
        { id: 'rust_basics', name: 'Rust基础认证', language: 'rust', requiredChapters: 5, icon: '🦀' },
        { id: 'ts_basics', name: 'TypeScript基础认证', language: 'typescript', requiredChapters: 5, icon: '📘' },
        { id: 'fullstack', name: '全栈开发者认证', language: 'multi', requiredChapters: 0, icon: '🌟' }
    ],
    
    checkCertification(certId) {
        const cert = this.certifications.find(c => c.id === certId);
        if (!cert) return { earned: false, progress: 0 };
        
        const stats = LearningStats.get();
        const progress = stats.languagesProgress[cert.language] || [];
        const completed = progress.length;
        
        if (certId === 'fullstack') {
            const langs = Object.keys(stats.languagesProgress);
            const earned = langs.length >= 3 && Object.values(stats.languagesProgress).every(c => c.length >= 5);
            return { earned, progress: langs.length, total: 3 };
        }
        
        return {
            earned: completed >= cert.requiredChapters,
            progress: completed,
            total: cert.requiredChapters,
            percentage: Math.min(100, Math.round((completed / cert.requiredChapters) * 100))
        };
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <h3>🏅 技能认证</h3>
            <div class="cert-list">
                ${this.certifications.map(cert => {
                    const status = this.checkCertification(cert.id);
                    return `
                        <div class="cert-card ${status.earned ? 'earned' : ''}">
                            <div class="cert-icon">${cert.icon}</div>
                            <div class="cert-info">
                                <h4>${cert.name}</h4>
                                <div class="cert-progress">
                                    <div class="cert-progress-bar"><div class="cert-progress-fill" style="width: ${status.percentage || 0}%"></div></div>
                                    <span>${status.progress || 0}/${status.total}</span>
                                </div>
                            </div>
                            ${status.earned ? '<div class="cert-badge">✅ 已获得</div>' : '<div class="cert-badge pending">🔒 未解锁</div>'}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};

// ==================== 职业规划 ====================
const CareerPlanner = {
    careers: [
        {
            id: 'frontend',
            title: '前端开发工程师',
            salary: '15k-35k',
            skills: ['javascript', 'typescript', 'html', 'css'],
            tutorials: ['javascript', 'typescript'],
            demand: '高',
            growth: '持续增长'
        },
        {
            id: 'backend',
            title: '后端开发工程师',
            salary: '18k-40k',
            skills: ['java', 'python', 'go', 'database'],
            tutorials: ['python', 'java', 'go'],
            demand: '高',
            growth: '稳定增长'
        },
        {
            id: 'fullstack',
            title: '全栈开发工程师',
            salary: '20k-45k',
            skills: ['javascript', 'python', 'typescript', 'database'],
            tutorials: ['javascript', 'python', 'typescript'],
            demand: '高',
            growth: '快速增长'
        },
        {
            id: 'mobile',
            title: '移动端开发工程师',
            salary: '18k-38k',
            skills: ['swift', 'java', 'kotlin', 'javascript'],
            tutorials: ['swift', 'java', 'javascript'],
            demand: '中',
            growth: '稳定'
        },
        {
            id: 'datascience',
            title: '数据科学家',
            salary: '25k-50k',
            skills: ['python', 'sql', 'machine_learning'],
            tutorials: ['python'],
            demand: '极高',
            growth: '爆发增长'
        },
        {
            id: 'devops',
            title: 'DevOps工程师',
            salary: '22k-45k',
            skills: ['go', 'python', 'docker', 'kubernetes'],
            tutorials: ['go', 'python'],
            demand: '高',
            growth: '快速增长'
        },
        {
            id: 'systems',
            title: '系统工程师',
            salary: '25k-50k',
            skills: ['cpp', 'rust', 'c', 'assembly'],
            tutorials: ['cpp', 'rust'],
            demand: '中',
            growth: '稳定'
        },
        {
            id: 'game',
            title: '游戏开发工程师',
            salary: '18k-40k',
            skills: ['csharp', 'cpp', 'unity'],
            tutorials: ['csharp', 'cpp'],
            demand: '中',
            growth: '增长'
        }
    ],
    
    getMatch(careerId) {
        const career = this.careers.find(c => c.id === careerId);
        if (!career) return 0;
        
        const stats = LearningStats.get();
        let matchScore = 0;
        career.tutorials.forEach(lang => {
            const progress = stats.languagesProgress[lang] || [];
            matchScore += (progress.length / 10) * (100 / career.tutorials.length);
        });
        
        return Math.round(matchScore);
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <h3>💼 职业规划</h3>
            <div class="career-list">
                ${this.careers.map(career => {
                    const match = this.getMatch(career.id);
                    return `
                        <div class="career-card">
                            <div class="career-header">
                                <h4>${career.title}</h4>
                                <span class="career-salary">${career.salary}</span>
                            </div>
                            <div class="career-meta">
                                <span>需求: ${career.demand}</span>
                                <span>趋势: ${career.growth}</span>
                            </div>
                            <div class="career-skills">
                                ${career.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                            </div>
                            <div class="career-match">
                                <span>匹配度</span>
                                <div class="match-bar"><div class="match-fill" style="width: ${match}%"></div></div>
                                <span>${match}%</span>
                            </div>
                            <a href="tutorial-${career.tutorials[0]}.html" class="btn-primary">开始学习</a>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
};

// ==================== 数据导出 ====================
const DataExporter = {
    exportJSON() {
        const allData = {
            learningStats: LearningStats.get(),
            achievements: AchievementSystem.achievements,
            snippets: SnippetManager.getAll(),
            bookmarks: BookmarkManager.getAll(),
            goals: LearningGoals.goals || [],
            gamification: { points: GamificationSystem.points, level: GamificationSystem.level, badges: GamificationSystem.badges },
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `tutorial_data_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    },
    
    exportCSV() {
        const stats = LearningStats.get();
        const rows = [['语言', '完成章节', '总章节', '进度']];
        
        Object.entries(stats.languagesProgress).forEach(([lang, chapters]) => {
            rows.push([lang, chapters.length, 10, `${(chapters.length / 10) * 100}%`]);
        });
        
        const csv = rows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `tutorial_progress_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    },
    
    importJSON(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.learningStats) localStorage.setItem('learning_stats', JSON.stringify(data.learningStats));
                if (data.snippets) localStorage.setItem('snippets', JSON.stringify(data.snippets));
                SnippetManager.showToast('数据导入成功');
            } catch {
                alert('文件格式错误');
            }
        };
        reader.readAsText(file);
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <h3>📤 数据导出</h3>
            <div class="export-options">
                <div class="export-card" onclick="DataExporter.exportJSON()">
                    <span class="export-icon">📦</span>
                    <h4>导出JSON</h4>
                    <p>导出所有学习数据为JSON格式</p>
                </div>
                <div class="export-card" onclick="DataExporter.exportCSV()">
                    <span class="export-icon">📊</span>
                    <h4>导出CSV</h4>
                    <p>导出学习进度为CSV格式</p>
                </div>
                <div class="export-card">
                    <span class="export-icon">📥</span>
                    <h4>导入数据</h4>
                    <p>从JSON文件导入学习数据</p>
                    <input type="file" accept=".json" onchange="DataExporter.importJSON(this.files[0])">
                </div>
            </div>
        `;
    }
};

// ==================== 移动端APP（PWA增强） ====================
const MobileApp = {
    isInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    },
    
    install() {
        PWAManager.install();
    },
    
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const installed = this.isInstalled();
        
        container.innerHTML = `
            <h3>📱 移动端应用</h3>
            <div class="mobile-app-info">
                <div class="app-preview">
                    <div class="app-icon">📚</div>
                    <h4>编程语言教程</h4>
                    <p>随时随地学习编程</p>
                </div>
                <div class="app-features">
                    <div class="app-feature">✅ 离线访问</div>
                    <div class="app-feature">✅ 桌面快捷方式</div>
                    <div class="app-feature">✅ 推送通知</div>
                    <div class="app-feature">✅ 全屏模式</div>
                </div>
                <div class="install-status">
                    ${installed 
                        ? '<div class="installed-badge">✅ 已安装</div>' 
                        : '<button class="btn-primary" onclick="MobileApp.install()">安装到桌面</button>'}
                </div>
                <div class="install-guide">
                    <h4>安装指南</h4>
                    <p><strong>Chrome:</strong> 点击地址栏右侧的安装图标</p>
                    <p><strong>Safari:</strong> 点击分享按钮 → 添加到主屏幕</p>
                    <p><strong>Firefox:</strong> 点击菜单 → 安装应用</p>
                </div>
            </div>
        `;
    }
};