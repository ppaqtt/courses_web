document.addEventListener('DOMContentLoaded', function() {
    initCodeCopy();
    initExerciseCheck();
    initProgressTracking();
});

function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '复制';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 4px;
            color: white;
            font-size: 0.8rem;
            cursor: pointer;
            transition: background 0.3s;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', async function() {
            const code = block.querySelector('code') || block.querySelector('pre');
            if (code) {
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    const originalText = this.textContent;
                    this.textContent = '已复制';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('复制失败:', err);
                }
            }
        });
    });
}

function initExerciseCheck() {
    const exercises = document.querySelectorAll('.exercise-list li');
    
    exercises.forEach(exercise => {
        const checkBtn = document.createElement('button');
        checkBtn.className = 'check-btn';
        checkBtn.textContent = '标记完成';
        checkBtn.style.cssText = `
            margin-top: 10px;
            padding: 6px 12px;
            background: #22c55e;
            border: none;
            border-radius: 4px;
            color: white;
            font-size: 0.85rem;
            cursor: pointer;
            transition: background 0.3s;
        `;
        
        exercise.appendChild(checkBtn);
        
        checkBtn.addEventListener('click', function() {
            exercise.classList.toggle('completed');
            if (exercise.classList.contains('completed')) {
                exercise.style.background = '#dcfce7';
                this.textContent = '已完成';
                this.style.background = '#16a34a';
            } else {
                exercise.style.background = '#f1f5f9';
                this.textContent = '标记完成';
                this.style.background = '#22c55e';
            }
            updateProgress();
        });
    });
}

function initProgressTracking() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: #3b82f6;
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

function updateProgress() {
    const totalExercises = document.querySelectorAll('.exercise-list li').length;
    const completedExercises = document.querySelectorAll('.exercise-list li.completed').length;
    const progress = Math.round((completedExercises / totalExercises) * 100);
    
    let progressDisplay = document.querySelector('.progress-display');
    if (!progressDisplay) {
        progressDisplay = document.createElement('div');
        progressDisplay.className = 'progress-display';
        progressDisplay.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 10px 20px;
            border-radius: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-size: 0.9rem;
            color: #3b82f6;
            font-weight: 600;
            z-index: 1000;
        `;
        document.body.appendChild(progressDisplay);
    }
    
    progressDisplay.textContent = `学习进度: ${progress}%`;
}

function searchChapters() {
    const searchInput = document.getElementById('chapter-search');
    const query = searchInput.value.toLowerCase();
    const chapters = document.querySelectorAll('.chapter');
    
    chapters.forEach(chapter => {
        const title = chapter.querySelector('.chapter-header h2').textContent.toLowerCase();
        const content = chapter.querySelector('.chapter-content').textContent.toLowerCase();
        
        if (title.includes(query) || content.includes(query)) {
            chapter.style.display = 'block';
        } else {
            chapter.style.display = 'none';
        }
    });
}