/**
 * 编程语言教程系统 - 共享功能模块
 * 包含：交互式代码编辑器、在线评测、成就系统、代码片段收藏、
 * 书签功能、国际化、分享功能、学习统计等
 */

// ==================== 配置 ====================
const CONFIG = {
    STORAGE_PREFIX: 'tutorial_',
    ACHIEVEMENTS_KEY: 'achievements',
    SNIPPETS_KEY: 'snippets',
    BOOKMARKS_KEY: 'bookmarks',
    STATS_KEY: 'learning_stats',
    LANGUAGE_KEY: 'language',
    DISCUSSIONS_KEY: 'discussions'
};

// ==================== 国际化支持 ====================
const i18n = {
    zh: {
        // 导航
        home: '首页',
        tutorials: '教程',
        learningPath: '学习路径',
        achievements: '成就',
        stats: '统计',
        snippets: '代码片段',
        discussions: '讨论区',
        leaderboard: '排行榜',
        
        // 进度
        progress: '学习进度',
        completed: '已完成',
        chapters: '章节',
        favorites: '收藏',
        
        // 代码编辑器
        runCode: '运行代码',
        clearCode: '清空',
        resetCode: '重置',
        output: '输出',
        running: '运行中...',
        runSuccess: '运行成功',
        runError: '运行出错',
        
        // 练习
        practice: '练习题',
        checkAnswer: '检查答案',
        showAnswer: '查看答案',
        hideAnswer: '隐藏答案',
        correct: '正确！',
        incorrect: '错误，请重试',
        yourAnswer: '你的答案',
        
        // 成就
        achievementUnlocked: '解锁成就！',
        firstChapter: '初学者',
        firstChapterDesc: '完成第一个章节',
        halfProgress: '半程达人',
        halfProgressDesc: '完成50%的学习内容',
        fullProgress: '学习大师',
        fullProgressDesc: '完成全部教程',
        streak7: '坚持不懈',
        streak7Desc: '连续学习7天',
        streak30: '学习狂人',
        streak30Desc: '连续学习30天',
        
        // 代码片段
        saveSnippet: '保存代码片段',
        snippetTitle: '标题',
        snippetCode: '代码',
        snippetLanguage: '语言',
        snippetSaved: '代码片段已保存',
        
        // 书签
        bookmarkSaved: '书签已保存',
        continueReading: '继续阅读',
        
        // 分享
        share: '分享',
        shareProgress: '分享学习进度',
        shareAchievement: '分享成就',
        
        // 统计
        totalStudyTime: '总学习时间',
        chaptersCompleted: '完成章节',
        languagesLearning: '学习语言',
        streak: '连续学习',
        days: '天',
        hours: '小时',
        minutes: '分钟',
        
        // 主题
        darkMode: '深色模式',
        lightMode: '浅色模式',
        
        // 通用
        save: '保存',
        cancel: '取消',
        delete: '删除',
        edit: '编辑',
        close: '关闭',
        search: '搜索',
        noResults: '未找到相关内容',
        loading: '加载中...',
        success: '成功',
        error: '错误',
        warning: '警告',
        info: '提示'
    },
    en: {
        // Navigation
        home: 'Home',
        tutorials: 'Tutorials',
        learningPath: 'Learning Path',
        achievements: 'Achievements',
        stats: 'Statistics',
        snippets: 'Code Snippets',
        discussions: 'Discussions',
        leaderboard: 'Leaderboard',
        
        // Progress
        progress: 'Progress',
        completed: 'Completed',
        chapters: 'Chapters',
        favorites: 'Favorites',
        
        // Code Editor
        runCode: 'Run Code',
        clearCode: 'Clear',
        resetCode: 'Reset',
        output: 'Output',
        running: 'Running...',
        runSuccess: 'Success',
        runError: 'Error',
        
        // Practice
        practice: 'Practice',
        checkAnswer: 'Check Answer',
        showAnswer: 'Show Answer',
        hideAnswer: 'Hide Answer',
        correct: 'Correct!',
        incorrect: 'Incorrect, try again',
        yourAnswer: 'Your Answer',
        
        // Achievements
        achievementUnlocked: 'Achievement Unlocked!',
        firstChapter: 'Beginner',
        firstChapterDesc: 'Complete your first chapter',
        halfProgress: 'Halfway There',
        halfProgressDesc: 'Complete 50% of content',
        fullProgress: 'Master',
        fullProgressDesc: 'Complete all tutorials',
        streak7: 'Persistent',
        streak7Desc: 'Study for 7 days in a row',
        streak30: 'Dedicated',
        streak30Desc: 'Study for 30 days in a row',
        
        // Snippets
        saveSnippet: 'Save Snippet',
        snippetTitle: 'Title',
        snippetCode: 'Code',
        snippetLanguage: 'Language',
        snippetSaved: 'Snippet saved',
        
        // Bookmark
        bookmarkSaved: 'Bookmark saved',
        continueReading: 'Continue Reading',
        
        // Share
        share: 'Share',
        shareProgress: 'Share Progress',
        shareAchievement: 'Share Achievement',
        
        // Stats
        totalStudyTime: 'Total Study Time',
        chaptersCompleted: 'Chapters Completed',
        languagesLearning: 'Languages Learning',
        streak: 'Streak',
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        
        // Theme
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        
        // Common
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        close: 'Close',
        search: 'Search',
        noResults: 'No results found',
        loading: 'Loading...',
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Info'
    }
};

// 当前语言
let currentLanguage = localStorage.getItem(CONFIG.LANGUAGE_KEY) || 'zh';

// 获取翻译文本
function t(key) {
    return i18n[currentLanguage][key] || key;
}

// 切换语言
function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    localStorage.setItem(CONFIG.LANGUAGE_KEY, currentLanguage);
    updateAllText();
    return currentLanguage;
}

// 更新所有文本
function updateAllText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLanguage][key]) {
            el.textContent = i18n[currentLanguage][key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18n[currentLanguage][key]) {
            el.placeholder = i18n[currentLanguage][key];
        }
    });
}

// ==================== 学习统计数据管理 ====================
const LearningStats = {
    // 获取统计数据
    get() {
        const stored = localStorage.getItem(CONFIG.STATS_KEY);
        return stored ? JSON.parse(stored) : {
            totalStudyTime: 0,
            sessions: [],
            chaptersCompleted: [],
            dailyStreak: 0,
            lastStudyDate: null,
            achievements: [],
            languagesProgress: {}
        };
    },
    
    // 保存统计数据
    save(data) {
        localStorage.setItem(CONFIG.STATS_KEY, JSON.stringify(data));
    },
    
    // 记录学习会话
    recordSession(duration, language) {
        const stats = this.get();
        const now = new Date();
        const today = now.toDateString();
        
        stats.totalStudyTime += duration;
        stats.sessions.push({
            date: now.toISOString(),
            duration: duration,
            language: language
        });
        
        // 更新连续学习天数
        if (stats.lastStudyDate) {
            const lastDate = new Date(stats.lastStudyDate);
            const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                stats.dailyStreak++;
            } else if (diffDays > 1) {
                stats.dailyStreak = 1;
            }
        } else {
            stats.dailyStreak = 1;
        }
        stats.lastStudyDate = today;
        
        this.save(stats);
        this.checkAchievements();
    },
    
    // 记录完成章节
    recordChapterCompletion(language, chapter) {
        const stats = this.get();
        const key = `${language}_${chapter}`;
        if (!stats.chaptersCompleted.includes(key)) {
            stats.chaptersCompleted.push(key);
            
            // 更新语言进度
            if (!stats.languagesProgress[language]) {
                stats.languagesProgress[language] = [];
            }
            if (!stats.languagesProgress[language].includes(chapter)) {
                stats.languagesProgress[language].push(chapter);
            }
            
            this.save(stats);
            this.checkAchievements();
        }
    },
    
    // 检查成就
    checkAchievements() {
        const stats = this.get();
        const achievements = AchievementSystem.achievements;
        
        achievements.forEach(achievement => {
            if (!stats.achievements.includes(achievement.id) && achievement.check(stats)) {
                stats.achievements.push(achievement.id);
                this.save(stats);
                AchievementSystem.unlock(achievement);
            }
        });
    }
};

// ==================== 成就系统 ====================
const AchievementSystem = {
    achievements: [
        {
            id: 'first_chapter',
            icon: '🎓',
            title: { zh: '初学者', en: 'Beginner' },
            desc: { zh: '完成第一个章节', en: 'Complete your first chapter' },
            check: (stats) => stats.chaptersCompleted.length >= 1
        },
        {
            id: 'five_chapters',
            icon: '📚',
            title: { zh: '学习者', en: 'Learner' },
            desc: { zh: '完成5个章节', en: 'Complete 5 chapters' },
            check: (stats) => stats.chaptersCompleted.length >= 5
        },
        {
            id: 'ten_chapters',
            icon: '📖',
            title: { zh: '知识达人', en: 'Knowledge Seeker' },
            desc: { zh: '完成10个章节', en: 'Complete 10 chapters' },
            check: (stats) => stats.chaptersCompleted.length >= 10
        },
        {
            id: 'full_tutorial',
            icon: '🏆',
            title: { zh: '教程大师', en: 'Tutorial Master' },
            desc: { zh: '完成一个完整教程', en: 'Complete a full tutorial' },
            check: (stats) => {
                const langs = stats.languagesProgress;
                return Object.values(langs).some(chapters => chapters.length >= 10);
            }
        },
        {
            id: 'streak_7',
            icon: '🔥',
            title: { zh: '坚持不懈', en: 'Persistent' },
            desc: { zh: '连续学习7天', en: 'Study for 7 days in a row' },
            check: (stats) => stats.dailyStreak >= 7
        },
        {
            id: 'streak_30',
            icon: '💪',
            title: { zh: '学习狂人', en: 'Dedicated' },
            desc: { zh: '连续学习30天', en: 'Study for 30 days in a row' },
            check: (stats) => stats.dailyStreak >= 30
        },
        {
            id: 'multi_lang',
            icon: '🌐',
            title: { zh: '多语言学习者', en: 'Polyglot' },
            desc: { zh: '学习3种不同语言', en: 'Learn 3 different languages' },
            check: (stats) => Object.keys(stats.languagesProgress).length >= 3
        },
        {
            id: 'code_runner',
            icon: '⚡',
            title: { zh: '代码跑者', en: 'Code Runner' },
            desc: { zh: '运行代码50次', en: 'Run code 50 times' },
            check: (stats) => (stats.codeRuns || 0) >= 50
        },
        {
            id: 'snippet_collector',
            icon: '📋',
            title: { zh: '代码收藏家', en: 'Snippet Collector' },
            desc: { zh: '保存10个代码片段', en: 'Save 10 code snippets' },
            check: (stats) => (stats.snippetsSaved || 0) >= 10
        },
        {
            id: 'hour_study',
            icon: '⏰',
            title: { zh: '一小时达人', en: 'Hour Expert' },
            desc: { zh: '累计学习1小时', en: 'Study for 1 hour total' },
            check: (stats) => stats.totalStudyTime >= 3600
        },
        {
            id: 'five_hours',
            icon: '⏱️',
            title: { zh: '学习爱好者', en: 'Study Enthusiast' },
            desc: { zh: '累计学习5小时', en: 'Study for 5 hours total' },
            check: (stats) => stats.totalStudyTime >= 18000
        },
        {
            id: 'master',
            icon: '👑',
            title: { zh: '学习大师', en: 'Master' },
            desc: { zh: '完成所有教程', en: 'Complete all tutorials' },
            check: (stats) => {
                const langs = stats.languagesProgress;
                return Object.keys(langs).length >= 10 && 
                    Object.values(langs).every(chapters => chapters.length >= 10);
            }
        }
    ],
    
    // 解锁成就
    unlock(achievement) {
        this.showNotification(achievement);
        this.updateUI();
    },
    
    // 显示成就通知
    showNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-content">
                <div class="achievement-title">${t('achievementUnlocked')}</div>
                <div class="achievement-name">${achievement.title[currentLanguage]}</div>
                <div class="achievement-desc">${achievement.desc[currentLanguage]}</div>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    },
    
    // 更新UI
    updateUI() {
        const container = document.getElementById('achievementsContainer');
        if (!container) return;
        
        const stats = LearningStats.get();
        const unlockedIds = stats.achievements;
        
        container.innerHTML = this.achievements.map(a => `
            <div class="achievement-card ${unlockedIds.includes(a.id) ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${a.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-title">${a.title[currentLanguage]}</div>
                    <div class="achievement-desc">${a.desc[currentLanguage]}</div>
                </div>
                ${unlockedIds.includes(a.id) ? '<span class="achievement-badge">✓</span>' : ''}
            </div>
        `).join('');
    },
    
    // 获取进度
    getProgress() {
        const stats = LearningStats.get();
        return {
            unlocked: stats.achievements.length,
            total: this.achievements.length
        };
    }
};

// ==================== 代码片段收藏 ====================
const SnippetManager = {
    // 获取所有片段
    getAll() {
        const stored = localStorage.getItem(CONFIG.SNIPPETS_KEY);
        return stored ? JSON.parse(stored) : [];
    },
    
    // 保存片段
    save(snippet) {
        const snippets = this.getAll();
        snippet.id = Date.now();
        snippet.createdAt = new Date().toISOString();
        snippets.push(snippet);
        localStorage.setItem(CONFIG.SNIPPETS_KEY, JSON.stringify(snippets));
        
        // 更新统计
        const stats = LearningStats.get();
        stats.snippetsSaved = (stats.snippetsSaved || 0) + 1;
        LearningStats.save(stats);
        LearningStats.checkAchievements();
        
        return snippet;
    },
    
    // 删除片段
    delete(id) {
        const snippets = this.getAll().filter(s => s.id !== id);
        localStorage.setItem(CONFIG.SNIPPETS_KEY, JSON.stringify(snippets));
    },
    
    // 按语言筛选
    getByLanguage(language) {
        return this.getAll().filter(s => s.language === language);
    },
    
    // 搜索片段
    search(query) {
        const snippets = this.getAll();
        const q = query.toLowerCase();
        return snippets.filter(s => 
            s.title.toLowerCase().includes(q) || 
            s.code.toLowerCase().includes(q)
        );
    },
    
    // 显示保存对话框
    showSaveDialog(code, language) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content snippet-modal">
                <h3>${t('saveSnippet')}</h3>
                <div class="form-group">
                    <label>${t('snippetTitle')}</label>
                    <input type="text" id="snippetTitle" placeholder="输入标题...">
                </div>
                <div class="form-group">
                    <label>${t('snippetLanguage')}</label>
                    <input type="text" id="snippetLanguage" value="${language}" readonly>
                </div>
                <div class="form-group">
                    <label>${t('snippetCode')}</label>
                    <textarea id="snippetCode" rows="8">${code}</textarea>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t('cancel')}</button>
                    <button class="btn-primary" onclick="SnippetManager.confirmSave(this.closest('.modal-overlay'))">${t('save')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    // 确认保存
    confirmSave(modal) {
        const title = document.getElementById('snippetTitle').value.trim();
        const language = document.getElementById('snippetLanguage').value;
        const code = document.getElementById('snippetCode').value;
        
        if (!title) {
            alert('请输入标题');
            return;
        }
        
        this.save({ title, language, code });
        modal.remove();
        this.showToast(t('snippetSaved'));
    },
    
    // 显示提示
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};

// ==================== 书签功能 ====================
const BookmarkManager = {
    // 保存书签
    save(language, chapter, scrollPosition = 0) {
        const bookmarks = this.getAll();
        const existing = bookmarks.findIndex(b => b.language === language);
        
        const bookmark = {
            language,
            chapter,
            scrollPosition,
            savedAt: new Date().toISOString()
        };
        
        if (existing !== -1) {
            bookmarks[existing] = bookmark;
        } else {
            bookmarks.push(bookmark);
        }
        
        localStorage.setItem(CONFIG.BOOKMARKS_KEY, JSON.stringify(bookmarks));
        this.showToast(t('bookmarkSaved'));
    },
    
    // 获取所有书签
    getAll() {
        const stored = localStorage.getItem(CONFIG.BOOKMARKS_KEY);
        return stored ? JSON.parse(stored) : [];
    },
    
    // 获取特定语言的书签
    get(language) {
        const bookmarks = this.getAll();
        return bookmarks.find(b => b.language === language);
    },
    
    // 恢复书签位置
    restore(language) {
        const bookmark = this.get(language);
        if (bookmark) {
            const element = document.getElementById(`ch${bookmark.chapter}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return true;
            }
        }
        return false;
    },
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};

// ==================== 交互式代码编辑器 ====================
const CodeEditor = {
    // 支持的语言及其运行方式
    supportedLanguages: {
        javascript: { name: 'JavaScript', runnable: true },
        typescript: { name: 'TypeScript', runnable: true },
        python: { name: 'Python', runnable: false },
        java: { name: 'Java', runnable: false },
        cpp: { name: 'C++', runnable: false },
        csharp: { name: 'C#', runnable: false },
        go: { name: 'Go', runnable: false },
        rust: { name: 'Rust', runnable: false },
        php: { name: 'PHP', runnable: false },
        swift: { name: 'Swift', runnable: false }
    },
    
    // 创建编辑器
    create(containerId, language, initialCode = '') {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const langConfig = this.supportedLanguages[language] || { name: language, runnable: false };
        
        container.innerHTML = `
            <div class="code-editor">
                <div class="editor-header">
                    <span class="editor-lang">${langConfig.name}</span>
                    <div class="editor-actions">
                        <button class="editor-btn" onclick="CodeEditor.save('${containerId}')">💾</button>
                        <button class="editor-btn" onclick="CodeEditor.reset('${containerId}')">🔄</button>
                        ${langConfig.runnable ? `<button class="editor-btn run-btn" onclick="CodeEditor.run('${containerId}', '${language}')">▶ ${t('runCode')}</button>` : ''}
                    </div>
                </div>
                <div class="editor-body">
                    <textarea class="editor-textarea" id="${containerId}_code" spellcheck="false">${initialCode}</textarea>
                </div>
                <div class="editor-output" id="${containerId}_output" style="display: none;">
                    <div class="output-header">${t('output')}</div>
                    <pre class="output-content"></pre>
                </div>
            </div>
        `;
    },
    
    // 运行代码
    run(containerId, language) {
        const code = document.getElementById(`${containerId}_code`).value;
        const outputContainer = document.getElementById(`${containerId}_output`);
        const outputContent = outputContainer.querySelector('.output-content');
        
        outputContainer.style.display = 'block';
        outputContent.innerHTML = `<span class="output-running">${t('running')}</span>`;
        
        try {
            // 重定向console.log
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
            };
            
            // 执行代码
            const result = new Function(code)();
            
            // 恢复console.log
            console.log = originalLog;
            
            // 显示输出
            if (logs.length > 0) {
                outputContent.innerHTML = logs.join('\n');
                outputContent.classList.add('success');
            } else if (result !== undefined) {
                outputContent.innerHTML = `返回值: ${result}`;
                outputContent.classList.add('success');
            } else {
                outputContent.innerHTML = t('runSuccess');
                outputContent.classList.add('success');
            }
            
            // 记录运行次数
            const stats = LearningStats.get();
            stats.codeRuns = (stats.codeRuns || 0) + 1;
            LearningStats.save(stats);
            LearningStats.checkAchievements();
            
        } catch (error) {
            outputContent.innerHTML = `${t('runError')}: ${error.message}`;
            outputContent.classList.add('error');
        }
    },
    
    // 保存代码片段
    save(containerId) {
        const code = document.getElementById(`${containerId}_code`).value;
        const langSelect = containerId.replace('_editor', '');
        SnippetManager.showSaveDialog(code, langSelect);
    },
    
    // 重置代码
    reset(containerId) {
        const textarea = document.getElementById(`${containerId}_code`);
        textarea.value = textarea.getAttribute('data-initial') || '';
    },
    
    // 高亮语法（简单实现）
    highlight(code, language) {
        const keywords = {
            javascript: ['const', 'let', 'var', 'function', 'class', 'if', 'else', 'for', 'while', 'return', 'import', 'export', 'from', 'new', 'this', 'async', 'await', 'try', 'catch', 'throw'],
            python: ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'lambda', 'try', 'except', 'finally'],
            java: ['public', 'private', 'protected', 'class', 'interface', 'extends', 'implements', 'static', 'final', 'void', 'int', 'String', 'boolean', 'if', 'else', 'for', 'while', 'return', 'new', 'this', 'import', 'package'],
        };
        
        const langKeywords = keywords[language] || [];
        let highlighted = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        // 注释
        highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="code-comment">$1</span>');
        highlighted = highlighted.replace(/(#.*$)/gm, '<span class="code-comment">$1</span>');
        
        // 字符串
        highlighted = highlighted.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, '<span class="code-string">$&</span>');
        
        // 关键字
        langKeywords.forEach(kw => {
            const regex = new RegExp(`\\b(${kw})\\b`, 'g');
            highlighted = highlighted.replace(regex, '<span class="code-keyword">$1</span>');
        });
        
        // 数字
        highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="code-number">$1</span>');
        
        return highlighted;
    }
};

// ==================== 在线评测系统 ====================
const QuizSystem = {
    // 评测结果
    evaluate(quizId, userAnswer, correctAnswer, type = 'text') {
        const result = {
            correct: false,
            feedback: ''
        };
        
        if (type === 'text') {
            result.correct = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
        } else if (type === 'code') {
            // 简单的代码比较（实际应用中需要更复杂的逻辑）
            const normalizedUser = userAnswer.replace(/\s+/g, ' ').trim();
            const normalizedCorrect = correctAnswer.replace(/\s+/g, ' ').trim();
            result.correct = normalizedUser === normalizedCorrect;
        } else if (type === 'multiple') {
            result.correct = userAnswer === correctAnswer;
        }
        
        result.feedback = result.correct ? t('correct') : t('incorrect');
        
        // 记录答题
        if (result.correct) {
            const stats = LearningStats.get();
            stats.correctAnswers = (stats.correctAnswers || 0) + 1;
            LearningStats.save(stats);
        }
        
        return result;
    },
    
    // 显示结果
    showResult(containerId, result) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="quiz-result ${result.correct ? 'correct' : 'incorrect'}">
                <span class="result-icon">${result.correct ? '✅' : '❌'}</span>
                <span class="result-text">${result.feedback}</span>
            </div>
        `;
    }
};

// ==================== 分享功能 ====================
const ShareManager = {
    // 分享到社交媒体
    share(platform, data) {
        const url = encodeURIComponent(data.url || window.location.href);
        const text = encodeURIComponent(data.text || '');
        const title = encodeURIComponent(data.title || '');
        
        const urls = {
            twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            weibo: `https://service.weibo.com/share/share.php?url=${url}&title=${title}`,
            wechat: '' // 微信需要特殊处理
        };
        
        if (urls[platform]) {
            if (platform === 'wechat') {
                this.showQRCode(data);
            } else {
                window.open(urls[platform], '_blank', 'width=600,height=400');
            }
        }
    },
    
    // 显示二维码（微信分享）
    showQRCode(data) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content share-modal">
                <h3>微信分享</h3>
                <p>请截图保存后分享到微信</p>
                <div class="share-qrcode">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.url || window.location.href)}" alt="QR Code">
                </div>
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t('close')}</button>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    // 生成分享图片
    generateImage(data) {
        // 使用Canvas生成分享图片
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 450;
        const ctx = canvas.getContext('2d');
        
        // 背景
        const gradient = ctx.createLinearGradient(0, 0, 800, 450);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 450);
        
        // 标题
        ctx.fillStyle = 'white';
        ctx.font = 'bold 36px Arial';
        ctx.fillText(data.title || '编程语言教程', 50, 80);
        
        // 统计信息
        ctx.font = '24px Arial';
        ctx.fillText(data.stats || '已完成 50% 的学习内容', 50, 140);
        
        // 提示
        ctx.font = '18px Arial';
        ctx.fillText('扫码开始学习', 50, 380);
        
        return canvas.toDataURL('image/png');
    },
    
    // 复制链接
    copyLink() {
        navigator.clipboard.writeText(window.location.href).then(() => {
            SnippetManager.showToast('链接已复制到剪贴板');
        });
    }
};

// ==================== 讨论区功能 ====================
const DiscussionSystem = {
    // 获取讨论
    getAll(pageId) {
        const stored = localStorage.getItem(CONFIG.DISCUSSIONS_KEY);
        const all = stored ? JSON.parse(stored) : {};
        return all[pageId] || [];
    },
    
    // 添加评论
    addComment(pageId, content, parentId = null) {
        const stored = localStorage.getItem(CONFIG.DISCUSSIONS_KEY);
        const all = stored ? JSON.parse(stored) : {};
        
        if (!all[pageId]) all[pageId] = [];
        
        const comment = {
            id: Date.now(),
            content,
            parentId,
            author: '访客用户',
            timestamp: new Date().toISOString(),
            likes: 0
        };
        
        if (parentId) {
            const parent = this.findComment(all[pageId], parentId);
            if (parent) {
                if (!parent.replies) parent.replies = [];
                parent.replies.push(comment);
            }
        } else {
            all[pageId].push(comment);
        }
        
        localStorage.setItem(CONFIG.DISCUSSIONS_KEY, JSON.stringify(all));
        return comment;
    },
    
    // 查找评论
    findComment(comments, id) {
        for (const comment of comments) {
            if (comment.id === id) return comment;
            if (comment.replies) {
                const found = this.findComment(comment.replies, id);
                if (found) return found;
            }
        }
        return null;
    },
    
    // 点赞
    like(pageId, commentId) {
        const stored = localStorage.getItem(CONFIG.DISCUSSIONS_KEY);
        const all = stored ? JSON.parse(stored) : {};
        
        const comment = this.findComment(all[pageId], commentId);
        if (comment) {
            comment.likes = (comment.likes || 0) + 1;
            localStorage.setItem(CONFIG.DISCUSSIONS_KEY, JSON.stringify(all));
        }
        return comment?.likes || 0;
    },
    
    // 渲染讨论区
    render(containerId, pageId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const comments = this.getAll(pageId);
        
        container.innerHTML = `
            <div class="discussion-section">
                <h3>💬 讨论区 (${comments.length})</h3>
                <div class="comment-form">
                    <textarea id="newComment" placeholder="写下你的想法..."></textarea>
                    <button class="btn-primary" onclick="DiscussionSystem.submit('${containerId}', '${pageId}')">发表评论</button>
                </div>
                <div class="comments-list">
                    ${this.renderComments(comments, pageId)}
                </div>
            </div>
        `;
    },
    
    // 渲染评论列表
    renderComments(comments, pageId, level = 0) {
        if (!comments.length) return '<p class="no-comments">暂无评论，快来发表吧！</p>';
        
        return comments.map(comment => `
            <div class="comment ${level > 0 ? 'reply' : ''}" data-id="${comment.id}">
                <div class="comment-header">
                    <span class="comment-author">${comment.author}</span>
                    <span class="comment-time">${this.formatTime(comment.timestamp)}</span>
                </div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-actions">
                    <button class="action-btn" onclick="DiscussionSystem.toggleLike('${pageId}', ${comment.id})">👍 ${comment.likes || 0}</button>
                    <button class="action-btn" onclick="DiscussionSystem.showReplyForm(${comment.id})">回复</button>
                </div>
                <div class="reply-form" id="reply-${comment.id}" style="display: none;">
                    <textarea id="reply-text-${comment.id}" placeholder="写下回复..."></textarea>
                    <button class="btn-primary" onclick="DiscussionSystem.submitReply('${pageId}', ${comment.id})">发送</button>
                </div>
                ${comment.replies ? `<div class="replies">${this.renderComments(comment.replies, pageId, level + 1)}</div>` : ''}
            </div>
        `).join('');
    },
    
    // 提交评论
    submit(containerId, pageId) {
        const textarea = document.getElementById('newComment');
        const content = textarea.value.trim();
        if (!content) return;
        
        this.addComment(pageId, content);
        this.render(containerId, pageId);
    },
    
    // 提交回复
    submitReply(pageId, parentId) {
        const textarea = document.getElementById(`reply-text-${parentId}`);
        const content = textarea.value.trim();
        if (!content) return;
        
        this.addComment(pageId, content, parentId);
        this.render('discussionContainer', pageId);
    },
    
    // 显示回复表单
    showReplyForm(commentId) {
        const form = document.getElementById(`reply-${commentId}`);
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    },
    
    // 点赞
    toggleLike(pageId, commentId) {
        const likes = this.like(pageId, commentId);
        this.render('discussionContainer', pageId);
    },
    
    // 格式化时间
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;
        
        return date.toLocaleDateString();
    }
};

// ==================== 学习路径规划 ====================
const LearningPath = {
    // 预设学习路径
    paths: {
        frontend: {
            title: { zh: '前端开发工程师', en: 'Frontend Developer' },
            description: { zh: '成为专业的前端开发工程师', en: 'Become a professional frontend developer' },
            steps: [
                { lang: 'javascript', order: 1, required: true },
                { lang: 'typescript', order: 2, required: true },
                { lang: 'python', order: 3, required: false }
            ]
        },
        backend: {
            title: { zh: '后端开发工程师', en: 'Backend Developer' },
            description: { zh: '成为专业的后端开发工程师', en: 'Become a professional backend developer' },
            steps: [
                { lang: 'python', order: 1, required: true },
                { lang: 'java', order: 2, required: true },
                { lang: 'go', order: 3, required: false }
            ]
        },
        fullstack: {
            title: { zh: '全栈开发工程师', en: 'Fullstack Developer' },
            description: { zh: '掌握前后端开发技术', en: 'Master both frontend and backend' },
            steps: [
                { lang: 'javascript', order: 1, required: true },
                { lang: 'python', order: 2, required: true },
                { lang: 'typescript', order: 3, required: true },
                { lang: 'go', order: 4, required: false }
            ]
        },
        mobile: {
            title: { zh: '移动端开发工程师', en: 'Mobile Developer' },
            description: { zh: '开发iOS和Android应用', en: 'Develop iOS and Android apps' },
            steps: [
                { lang: 'javascript', order: 1, required: true },
                { lang: 'swift', order: 2, required: true },
                { lang: 'java', order: 3, required: false }
            ]
        },
        dataScience: {
            title: { zh: '数据科学家', en: 'Data Scientist' },
            description: { zh: '数据分析和机器学习', en: 'Data analysis and machine learning' },
            steps: [
                { lang: 'python', order: 1, required: true },
                { lang: 'javascript', order: 2, required: false },
                { lang: 'rust', order: 3, required: false }
            ]
        },
        systems: {
            title: { zh: '系统工程师', en: 'Systems Engineer' },
            description: { zh: '高性能系统开发', en: 'High-performance systems development' },
            steps: [
                { lang: 'cpp', order: 1, required: true },
                { lang: 'rust', order: 2, required: true },
                { lang: 'go', order: 3, required: true }
            ]
        }
    },
    
    // 获取用户进度
    getProgress(pathId) {
        const path = this.paths[pathId];
        if (!path) return null;
        
        const stats = LearningStats.get();
        const steps = path.steps.map(step => {
            const progress = stats.languagesProgress[step.lang] || [];
            return {
                ...step,
                completed: progress.length,
                total: 10,
                percentage: Math.round((progress.length / 10) * 100)
            };
        });
        
        const overallProgress = steps.reduce((sum, step) => sum + step.percentage, 0) / steps.length;
        
        return {
            ...path,
            steps,
            overallProgress: Math.round(overallProgress)
        };
    },
    
    // 渲染路径
    renderPaths(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = Object.entries(this.paths).map(([id, path]) => {
            const progress = this.getProgress(id);
            return `
                <div class="path-card" onclick="LearningPath.showPathDetail('${id}')">
                    <div class="path-header">
                        <h3>${path.title[currentLanguage]}</h3>
                        <div class="path-progress">${progress.overallProgress}%</div>
                    </div>
                    <p class="path-desc">${path.description[currentLanguage]}</p>
                    <div class="path-steps">
                        ${progress.steps.map(step => `
                            <div class="step-indicator ${step.percentage >= 100 ? 'completed' : ''}">
                                <span class="step-lang">${step.lang}</span>
                                <div class="step-progress-bar">
                                    <div class="step-progress-fill" style="width: ${step.percentage}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // 显示路径详情
    showPathDetail(pathId) {
        const path = this.paths[pathId];
        const progress = this.getProgress(pathId);
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content path-detail-modal">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h2>${path.title[currentLanguage]}</h2>
                <p>${path.description[currentLanguage]}</p>
                <div class="path-detail-progress">
                    <div class="overall-progress">
                        <span>${t('progress')}</span>
                        <span class="progress-value">${progress.overallProgress}%</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${progress.overallProgress}%"></div>
                    </div>
                </div>
                <div class="path-steps-detail">
                    ${progress.steps.map(step => `
                        <div class="step-card ${step.percentage >= 100 ? 'completed' : ''}" onclick="window.location.href='tutorial-${step.lang}.html'">
                            <div class="step-info">
                                <span class="step-number">第${step.order}步</span>
                                <span class="step-name">${step.lang}</span>
                            </div>
                            <div class="step-progress-info">
                                <span>${step.completed}/${step.total} ${t('chapters')}</span>
                                <div class="mini-progress">
                                    <div style="width: ${step.percentage}%"></div>
                                </div>
                            </div>
                            ${step.required ? '<span class="required-badge">必修</span>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
};

// ==================== 排行榜系统 ====================
const Leaderboard = {
    // 获取排行榜数据（模拟）
    get() {
        // 在实际应用中，这里会从服务器获取
        // 这里使用本地存储模拟
        const stored = localStorage.getItem('tutorial_leaderboard');
        if (stored) return JSON.parse(stored);
        
        // 模拟数据
        return [
            { rank: 1, name: '学习达人', chapters: 85, streak: 45, avatar: '👨‍💻' },
            { rank: 2, name: '代码爱好者', chapters: 72, streak: 30, avatar: '👩‍💻' },
            { rank: 3, name: '编程新手', chapters: 65, streak: 25, avatar: '🧑‍💻' },
            { rank: 4, name: '技术探索者', chapters: 58, streak: 20, avatar: '👨‍🎓' },
            { rank: 5, name: '知识追求者', chapters: 45, streak: 15, avatar: '👩‍🎓' }
        ];
    },
    
    // 获取用户排名
    getUserRank() {
        const stats = LearningStats.get();
        const totalChapters = stats.chaptersCompleted.length;
        const streak = stats.dailyStreak;
        
        // 计算分数
        const score = totalChapters * 10 + streak * 5;
        
        return {
            score,
            chapters: totalChapters,
            streak
        };
    },
    
    // 渲染排行榜
    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const leaderboard = this.get();
        const userRank = this.getUserRank();
        
        container.innerHTML = `
            <div class="leaderboard-section">
                <h3>🏆 ${t('leaderboard')}</h3>
                <div class="user-rank-card">
                    <div class="your-rank">你的排名</div>
                    <div class="rank-score">${userRank.score}分</div>
                    <div class="rank-details">
                        <span>${userRank.chapters} ${t('chapters')}</span>
                        <span>${userRank.streak} ${t('days')}</span>
                    </div>
                </div>
                <div class="leaderboard-list">
                    ${leaderboard.map(item => `
                        <div class="leaderboard-item">
                            <span class="rank-number ${item.rank <= 3 ? 'top-' + item.rank : ''}">${item.rank}</span>
                            <span class="avatar">${item.avatar}</span>
                            <span class="name">${item.name}</span>
                            <span class="stats">${item.chapters}章 · ${item.streak}天</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};

// ==================== 每日学习提醒 ====================
const StudyReminder = {
    // 设置提醒
    set(time) {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    localStorage.setItem('study_reminder_time', time);
                    this.scheduleNotification(time);
                    return true;
                }
            });
        }
        return false;
    },
    
    // 调度通知
    scheduleNotification(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const now = new Date();
        const scheduled = new Date();
        scheduled.setHours(hours, minutes, 0, 0);
        
        if (scheduled <= now) {
            scheduled.setDate(scheduled.getDate() + 1);
        }
        
        const timeout = scheduled - now;
        
        setTimeout(() => {
            if (Notification.permission === 'granted') {
                new Notification('学习提醒', {
                    body: '该继续学习啦！保持好习惯！',
                    icon: '/favicon.ico'
                });
            }
            this.scheduleNotification(time);
        }, timeout);
    },
    
    // 获取设置
    getSetting() {
        return localStorage.getItem('study_reminder_time') || '';
    },
    
    // 显示设置界面
    showSettings() {
        const currentTime = this.getSetting();
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content reminder-modal">
                <h3>⏰ 每日学习提醒</h3>
                <p>设置每天的学习提醒时间</p>
                <div class="time-picker">
                    <input type="time" id="reminderTime" value="${currentTime || '20:00'}">
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t('cancel')}</button>
                    <button class="btn-primary" onclick="StudyReminder.saveSetting(this.closest('.modal-overlay'))">${t('save')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },
    
    // 保存设置
    saveSetting(modal) {
        const time = document.getElementById('reminderTime').value;
        if (this.set(time)) {
            modal.remove();
            SnippetManager.showToast('提醒已设置');
        } else {
            alert('请允许通知权限');
        }
    }
};

// ==================== PWA支持 ====================
const PWAManager = {
    // 注册Service Worker
    async register() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered:', registration);
                return registration;
            } catch (error) {
                console.log('Service Worker registration failed:', error);
                return null;
            }
        }
        return null;
    },
    
    // 检查更新
    async checkUpdate() {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                registration.update();
            }
        }
    },
    
    // 显示安装提示
    showInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            const banner = document.createElement('div');
            banner.className = 'install-banner';
            banner.innerHTML = `
                <span>📥 安装应用到桌面，随时随地学习</span>
                <button onclick="PWAManager.install()">安装</button>
                <button onclick="this.parentElement.remove()">稍后</button>
            `;
            document.body.appendChild(banner);
        });
    },
    
    // 执行安装
    async install() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            console.log('Install outcome:', outcome);
            this.deferredPrompt = null;
        }
    }
};

// ==================== 初始化 ====================
function initTutorialSystem() {
    // 加载语言设置
    currentLanguage = localStorage.getItem(CONFIG.LANGUAGE_KEY) || 'zh';
    updateAllText();
    
    // 记录学习会话开始
    window.studyStartTime = Date.now();
    
    // 页面关闭时记录学习时间
    window.addEventListener('beforeunload', () => {
        const duration = Math.floor((Date.now() - window.studyStartTime) / 1000);
        if (duration > 60) { // 至少1分钟才记录
            const lang = document.body.dataset.language || 'unknown';
            LearningStats.recordSession(duration, lang);
        }
    });
    
    // 初始化PWA
    PWAManager.register();
    PWAManager.showInstallPrompt();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTutorialSystem);
} else {
    initTutorialSystem();
}