document.addEventListener('DOMContentLoaded', function() {
    initChapterToggle();
    initNotesStorage();
});

function initChapterToggle() {
    const chapterHeaders = document.querySelectorAll('.chapter-header');
    
    chapterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.toggle-icon');
            
            this.classList.toggle('open');
            content.classList.toggle('active');
            
            const chapterId = this.getAttribute('data-chapter');
            saveChapterState(chapterId, content.classList.contains('active'));
        });
        
        const chapterId = header.getAttribute('data-chapter');
        const isOpen = loadChapterState(chapterId);
        if (isOpen) {
            header.classList.add('open');
            header.nextElementSibling.classList.add('active');
        }
    });
}

function saveChapterState(chapterId, isOpen) {
    const states = JSON.parse(localStorage.getItem('chapterStates') || '{}');
    states[chapterId] = isOpen;
    localStorage.setItem('chapterStates', JSON.stringify(states));
}

function loadChapterState(chapterId) {
    const states = JSON.parse(localStorage.getItem('chapterStates') || '{}');
    return states[chapterId] || false;
}

function initNotesStorage() {
    const textareas = document.querySelectorAll('.notes-area textarea');
    
    textareas.forEach(textarea => {
        const chapterId = textarea.getAttribute('data-chapter');
        const savedNotes = localStorage.getItem(`notes_${chapterId}`);
        
        if (savedNotes) {
            textarea.value = savedNotes;
        }
        
        textarea.addEventListener('input', function() {
            const chapterId = this.getAttribute('data-chapter');
            localStorage.setItem(`notes_${chapterId}`, this.value);
        });
    });
}

function toggleAllChapters(open) {
    const chapterHeaders = document.querySelectorAll('.chapter-header');
    
    chapterHeaders.forEach(header => {
        const content = header.nextElementSibling;
        
        if (open) {
            header.classList.add('open');
            content.classList.add('active');
            saveChapterState(header.getAttribute('data-chapter'), true);
        } else {
            header.classList.remove('open');
            content.classList.remove('active');
            saveChapterState(header.getAttribute('data-chapter'), false);
        }
    });
}

function clearAllNotes() {
    if (confirm('确定要清除所有笔记吗？此操作无法撤销。')) {
        const textareas = document.querySelectorAll('.notes-area textarea');
        textareas.forEach(textarea => {
            textarea.value = '';
            localStorage.removeItem(`notes_${textarea.getAttribute('data-chapter')}`);
        });
        alert('所有笔记已清除');
    }
}

function scrollToChapter(chapterId) {
    const element = document.getElementById(chapterId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const header = element.querySelector('.chapter-header');
        if (header) {
            header.click();
        }
    }
}