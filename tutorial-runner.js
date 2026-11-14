/**
 * 在线代码运行服务
 *
 * 主后端：Piston（https://emkc.org/api/v2/piston/execute）
 * 备用后端：Judge0 CE（https://ce.judge0.com）
 *
 * 说明：Piston 公共 API 自 2026-02-15 起改为白名单制，直接调用会返回 401。
 * 因此这里保留 Piston 作为首选，并在不可用时自动切换到 Judge0，
 * 保证“运行”按钮仍然可用。若你有自建 Piston，可修改 config.pistonEndpoint。
 */
(function (global) {
    const RUNNERS = {
        python: { piston: 'python', judge0: 92, fileName: 'main.py' },
        javascript: { local: 'javascript' },
        java: { piston: 'java', judge0: 91, fileName: 'Main.java' },
        cpp: { piston: 'c++', judge0: 54, fileName: 'main.cpp' },
        csharp: { piston: 'csharp', judge0: 51, fileName: 'Program.cs' },
        go: { piston: 'go', judge0: 95, fileName: 'main.go' },
        rust: { piston: 'rust', judge0: 73, fileName: 'main.rs' },
        typescript: { piston: 'typescript', judge0: 94, fileName: 'main.ts' },
        php: { piston: 'php', judge0: 68, fileName: 'main.php' },
        swift: { piston: 'swift', judge0: 83, fileName: 'main.swift' },
        kotlin: { piston: 'kotlin', judge0: 78, fileName: 'main.kt' },
        ruby: { piston: 'ruby', judge0: 72, fileName: 'main.rb' },
        sql: { piston: 'sqlite3', judge0: 82, fileName: 'main.sql' },
        c: { piston: 'c', judge0: 48, fileName: 'main.c' },
        dart: { piston: 'dart', judge0: 90, fileName: 'main.dart' },
        scala: { piston: 'scala', judge0: 81, fileName: 'Main.scala' },
        r: { piston: 'rscript', judge0: 80, fileName: 'main.r' },
        lua: { piston: 'lua', judge0: 64, fileName: 'main.lua' },
        bash: { piston: 'bash', judge0: 46, fileName: 'main.sh' },
        html: { local: 'html' },
        css: { local: 'css' },
        haskell: { piston: 'haskell', judge0: 61, fileName: 'Main.hs' },
        elixir: { piston: 'elixir', judge0: 57, fileName: 'main.exs' },
        clojure: { piston: 'clojure', judge0: 86, fileName: 'main.clj' },
        fsharp: { piston: 'fsharp.net', judge0: 87, fileName: 'main.fsx' },
        erlang: { piston: 'erlang', judge0: 58, fileName: 'main.erl' },
        ocaml: { piston: 'ocaml', judge0: 65, fileName: 'main.ml' },
        perl: { piston: 'perl', judge0: 85, fileName: 'main.pl' },
        pascal: { piston: 'pascal', judge0: 67, fileName: 'main.pas' },
        groovy: { piston: 'groovy', judge0: 88, fileName: 'main.groovy' },
        objectivec: { piston: null, judge0: 79, fileName: 'main.m' },
        assembly: { piston: 'nasm', judge0: 45, fileName: 'main.asm' },
        prolog: { piston: 'prolog', judge0: 69, fileName: 'main.pro' },
        fortran: { piston: 'fortran', judge0: 59, fileName: 'main.f90' }
    };

    const ALIASES = {
        'python': 'python', 'py': 'python', 'python3': 'python',
        'javascript': 'javascript', 'js': 'javascript', 'node': 'javascript', 'node.js': 'javascript',
        'java': 'java',
        'c++': 'cpp', 'cpp': 'cpp', 'cplusplus': 'cpp',
        'c#': 'csharp', 'csharp': 'csharp', 'csharp.net': 'csharp', '.net': 'csharp',
        'go': 'go', 'golang': 'go',
        'rust': 'rust', 'rs': 'rust',
        'typescript': 'typescript', 'ts': 'typescript',
        'php': 'php',
        'swift': 'swift',
        'kotlin': 'kotlin', 'kt': 'kotlin',
        'ruby': 'ruby', 'rb': 'ruby',
        'sql': 'sql', 'sqlite': 'sql', 'sqlite3': 'sql',
        'c': 'c',
        'dart': 'dart',
        'scala': 'scala',
        'r': 'r', 'rscript': 'r',
        'lua': 'lua',
        'bash': 'bash', 'sh': 'bash', 'shell': 'bash',
        'html': 'html', 'html5': 'html',
        'css': 'css', 'css3': 'css',
        'haskell': 'haskell', 'hs': 'haskell',
        'elixir': 'elixir', 'ex': 'elixir',
        'clojure': 'clojure', 'clj': 'clojure',
        'f#': 'fsharp', 'fsharp': 'fsharp', 'fs': 'fsharp',
        'erlang': 'erlang', 'erl': 'erlang',
        'ocaml': 'ocaml', 'ml': 'ocaml',
        'perl': 'perl', 'pl': 'perl',
        'pascal': 'pascal', 'delphi': 'pascal',
        'groovy': 'groovy',
        'objective-c': 'objectivec', 'objectivec': 'objectivec', 'objc': 'objectivec',
        'assembly': 'assembly', 'asm': 'assembly', 'nasm': 'assembly',
        'prolog': 'prolog',
        'fortran': 'fortran', 'f90': 'fortran'
    };

    const DEFAULT_CONFIG = {
        pistonEndpoint: 'https://emkc.org/api/v2/piston/execute',
        pistonRuntimesEndpoint: 'https://emkc.org/api/v2/piston/runtimes',
        judge0Endpoint: 'https://ce.judge0.com/submissions?base64_encoded=true&wait=true',
        timeout: 30000,
        prefer: 'auto'
    };

    const PISTON_FLAG = 'tutorial_piston_unavailable';

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function encodeBase64(value) {
        const bytes = new TextEncoder().encode(String(value == null ? '' : value));
        let binary = '';
        bytes.forEach(byte => {
            binary += String.fromCharCode(byte);
        });
        return btoa(binary);
    }

    function decodeBase64(value) {
        if (!value) return '';
        try {
            const binary = atob(value);
            const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
            return new TextDecoder('utf-8').decode(bytes);
        } catch (e) {
            return String(value);
        }
    }

    async function fetchJSON(url, options, timeout) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout || DEFAULT_CONFIG.timeout);
        try {
            const response = await fetch(url, Object.assign({}, options, { signal: controller.signal }));
            const text = await response.text();
            let data = null;
            try {
                data = text ? JSON.parse(text) : null;
            } catch (e) {
                data = { message: text };
            }
            return { ok: response.ok, status: response.status, data };
        } finally {
            clearTimeout(timer);
        }
    }

    function compareVersion(a, b) {
        const pa = String(a).split(/[^\d]+/).filter(Boolean).map(Number);
        const pb = String(b).split(/[^\d]+/).filter(Boolean).map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const diff = (pa[i] || 0) - (pb[i] || 0);
            if (diff) return diff;
        }
        return String(a).localeCompare(String(b));
    }

    const CodeRunner = {
        config: Object.assign({}, DEFAULT_CONFIG),
        runners: RUNNERS,
        _runtimeCache: null,
        _runtimePromise: null,
        _pistonUnavailable: false,

        init(options) {
            if (options) Object.assign(this.config, options);
            try {
                this._pistonUnavailable = sessionStorage.getItem(PISTON_FLAG) === '1';
            } catch (e) {
                this._pistonUnavailable = false;
            }
            return this;
        },

        enablePiston() {
            this._pistonUnavailable = false;
            try { sessionStorage.removeItem(PISTON_FLAG); } catch (e) { /* ignore */ }
        },

        normalize(value) {
            if (value && typeof value === 'object' && value.key) {
                return { key: value.key, name: value.name || value.key, catalog: value };
            }
            const raw = String(value == null ? '' : value).trim();
            let catalog = null;
            if (typeof global.getCatalogLanguage === 'function') {
                catalog = global.getCatalogLanguage(raw);
            }
            const key = (catalog && catalog.key) || ALIASES[raw.toLowerCase()] || ALIASES[raw] || raw.toLowerCase();
            return {
                key: key,
                name: (catalog && catalog.name) || raw || key,
                catalog: catalog
            };
        },

        isRunnable(value) {
            const lang = this.normalize(value);
            return Boolean(RUNNERS[lang.key]);
        },

        async run(language, code, options) {
            const lang = this.normalize(language);
            const baseRunner = RUNNERS[lang.key];
            const opts = options || {};
            const source = String(code == null ? '' : code);

            if (!baseRunner) {
                return {
                    ok: false,
                    output: '暂不支持运行 ' + (lang.name || language) + '。',
                    backend: 'none'
                };
            }
            if (!source.trim()) {
                return { ok: false, output: '代码为空，请先输入要运行的内容。', backend: 'none' };
            }

            const runner = Object.assign({ key: lang.key }, baseRunner);

            if (runner.local === 'javascript') {
                return this.runLocalJavaScript(source);
            }
            if (runner.local === 'html' || runner.local === 'css') {
                return this.runPreview(runner.local, source);
            }

            const errors = [];
            if (this.config.prefer !== 'judge0' && runner.piston && !this._pistonUnavailable) {
                try {
                    return await this.runPiston(runner, source, opts);
                } catch (error) {
                    errors.push('Piston: ' + error.message);
                    if (error.pistonUnavailable) {
                        this._pistonUnavailable = true;
                        try { sessionStorage.setItem(PISTON_FLAG, '1'); } catch (e) { /* ignore */ }
                    }
                }
            }

            if (runner.judge0) {
                try {
                    const result = await this.runJudge0(runner, source, opts);
                    if (errors.length) {
                        result.notice = 'Piston 不可用，已自动切换到 Judge0。';
                    }
                    return result;
                } catch (error) {
                    errors.push('Judge0: ' + error.message);
                }
            }

            return {
                ok: false,
                output: '代码执行服务暂不可用。\n' + errors.join('\n'),
                backend: 'none',
                notice: 'Piston 公共 API 已改为白名单制；可配置自建 Piston，或稍后重试 Judge0。'
            };
        },

        fileNameFor(runner, code) {
            if (runner.key === 'java') {
                return 'Main.java';
            }
            return runner.fileName || 'main.txt';
        },

        adaptJavaSource(code) {
            // Judge0 会把源码写成 Main.java；把首个 public class 重命名为 Main，
            // 避免 "class X is public, should be declared in X.java" 的编译错误。
            const match = code.match(/public\s+(?:final\s+|abstract\s+)?class\s+(\w+)/);
            if (!match || match[1] === 'Main') return code;
            const name = match[1];
            return code.replace(new RegExp('\\b' + name + '\\b', 'g'), 'Main');
        },

        async runPiston(runner, code, options) {
            const runtime = await this.resolvePistonRuntime(runner.piston);
            if (!runtime) {
                throw new Error('该语言不在 Piston 运行时列表中');
            }
            const sourceCode = runner.key === 'java' ? this.adaptJavaSource(code) : code;
            const body = {
                language: runtime.language,
                version: runtime.version,
                files: [{ name: this.fileNameFor(runner, code), content: sourceCode }],
                stdin: options.stdin || '',
                compile_timeout: 10000,
                run_timeout: 10000
            };
            const response = await fetchJSON(this.config.pistonEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }, this.config.timeout);

            if (!response.ok) {
                const message = (response.data && (response.data.message || response.data.error)) || ('HTTP ' + response.status);
                const error = new Error(message);
                if (response.status === 401 || response.status === 403 || response.status === 429) {
                    error.pistonUnavailable = true;
                }
                throw error;
            }

            const data = response.data || {};
            const run = data.run || {};
            const compile = data.compile || {};
            const compileError = [compile.stderr, compile.output].filter(Boolean).join('\n').trim();
            const runError = [run.stderr].filter(Boolean).join('\n').trim();
            const output = [compile.stdout, compile.stderr, run.stdout, run.stderr]
                .filter(part => part && String(part).trim())
                .join('\n')
                .trim();

            return {
                ok: !compileError && (run.code === 0 || run.code == null) && !run.signal,
                output: output || '(无输出)',
                stdout: run.stdout || '',
                stderr: runError,
                compileOutput: compileError,
                backend: 'Piston',
                backendLabel: 'Piston',
                language: data.language || runtime.language,
                version: data.version || runtime.version
            };
        },

        async resolvePistonRuntime(language) {
            if (!this._runtimePromise) {
                this._runtimePromise = fetchJSON(this.config.pistonRuntimesEndpoint, { method: 'GET' }, 15000)
                    .then(response => {
                        if (!response.ok || !Array.isArray(response.data)) return null;
                        this._runtimeCache = response.data;
                        return response.data;
                    })
                    .catch(() => null);
            }
            const runtimes = this._runtimeCache || await this._runtimePromise;
            if (!runtimes) return null;
            const matches = runtimes.filter(runtime =>
                runtime.language === language ||
                (Array.isArray(runtime.aliases) && runtime.aliases.includes(language))
            );
            if (!matches.length) return null;
            matches.sort((a, b) => compareVersion(b.version, a.version));
            return matches[0];
        },

        async runJudge0(runner, code, options) {
            const sourceCode = runner.key === 'java' ? this.adaptJavaSource(code) : code;
            const body = {
                language_id: runner.judge0,
                source_code: encodeBase64(sourceCode),
                stdin: encodeBase64(options.stdin || '')
            };
            const response = await fetchJSON(this.config.judge0Endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }, this.config.timeout);

            if (!response.ok) {
                const message = (response.data && (response.data.message || response.data.error)) || ('HTTP ' + response.status);
                const error = new Error(message);
                error.rateLimited = response.status === 429;
                throw error;
            }

            const data = response.data || {};
            const status = data.status || {};
            const statusId = status.id;
            const stdout = decodeBase64(data.stdout);
            const stderr = decodeBase64(data.stderr);
            const compileOutput = decodeBase64(data.compile_output);
            const message = decodeBase64(data.message);
            const output = [stdout, stderr, compileOutput, message]
                .filter(part => part && String(part).trim())
                .join('\n')
                .trim();

            return {
                ok: statusId === 3 || statusId === 4,
                output: output || '(无输出)',
                stdout: stdout,
                stderr: stderr,
                compileOutput: compileOutput,
                status: status.description || '',
                backend: 'Judge0',
                backendLabel: 'Judge0',
                language: runner.language || '',
                version: ''
            };
        },

        async runLocalJavaScript(code) {
            const logs = [];
            const format = value => {
                if (typeof value === 'string') return value;
                if (value === undefined) return 'undefined';
                try { return JSON.stringify(value, null, 2); } catch (e) { return String(value); }
            };
            const sandboxConsole = {
                log: (...args) => logs.push(args.map(format).join(' ')),
                info: (...args) => logs.push(args.map(format).join(' ')),
                warn: (...args) => logs.push('[warn] ' + args.map(format).join(' ')),
                error: (...args) => logs.push('[error] ' + args.map(format).join(' '))
            };

            try {
                const hasAwait = /(^|[^\w$])await([^\w$]|$)/.test(code);
                const fn = hasAwait
                    ? new (Object.getPrototypeOf(async function () {}).constructor)('console', code)
                    : new Function('console', code);
                const result = await fn(sandboxConsole);
                if (!logs.length && result !== undefined) {
                    logs.push('返回值: ' + format(result));
                }
                return {
                    ok: true,
                    output: logs.length ? logs.join('\n') : '(无输出)',
                    backend: '浏览器',
                    backendLabel: '浏览器（本地）'
                };
            } catch (error) {
                return {
                    ok: false,
                    output: '运行出错: ' + error.message,
                    backend: '浏览器',
                    backendLabel: '浏览器（本地）'
                };
            }
        },

        runPreview(kind, code) {
            const html = kind === 'css'
                ? '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><style>body{margin:0;font-family:sans-serif}</style></head><body>' + code + '</body></html>'
                : code;
            return {
                ok: true,
                output: '已在浏览器中渲染预览。',
                previewHtml: html,
                backend: '浏览器',
                backendLabel: '浏览器预览'
            };
        },

        renderOutput(container, result) {
            if (!container) return;
            container.hidden = false;
            container.classList.remove('success', 'error');
            container.classList.add(result && result.ok ? 'success' : 'error');
            container.innerHTML = '';

            if (result && result.previewHtml) {
                const frame = document.createElement('iframe');
                frame.className = 'runner-preview-frame';
                frame.setAttribute('sandbox', 'allow-scripts');
                frame.setAttribute('title', '代码预览');
                frame.srcdoc = result.previewHtml;
                container.appendChild(frame);
            } else {
                const pre = document.createElement('pre');
                pre.className = 'runner-output-text';
                pre.textContent = (result && result.output) || '(无输出)';
                container.appendChild(pre);
            }

            const meta = document.createElement('div');
            meta.className = 'runner-output-meta';
            const parts = [];
            if (result && result.backendLabel) parts.push(result.backendLabel);
            if (result && result.language) parts.push(result.language);
            if (result && result.version) parts.push(result.version);
            if (result && result.status) parts.push(result.status);
            if (result && result.elapsed) parts.push(result.elapsed + ' ms');
            meta.textContent = parts.join(' · ');
            if (result && result.notice) {
                const notice = document.createElement('div');
                notice.className = 'runner-output-notice';
                notice.textContent = result.notice;
                container.appendChild(notice);
            }
            if (meta.textContent) container.appendChild(meta);
        },

        recordRun() {
            try {
                if (typeof global.LearningStats === 'undefined') return;
                const stats = global.LearningStats.get();
                stats.codeRuns = (stats.codeRuns || 0) + 1;
                global.LearningStats.save(stats);
                if (typeof global.LearningStats.checkAchievements === 'function') {
                    global.LearningStats.checkAchievements();
                }
            } catch (e) {
                /* 统计失败不影响运行 */
            }
        },

        async runInto(outputElement, language, code, options) {
            if (!outputElement) return null;
            outputElement.hidden = false;
            outputElement.classList.remove('success', 'error');
            outputElement.innerHTML = '<span class="output-running">运行中...</span>';
            const started = Date.now();
            let result;
            try {
                result = await this.run(language, code, options);
            } catch (error) {
                result = { ok: false, output: '运行请求失败: ' + error.message, backend: 'none' };
            }
            result.elapsed = Date.now() - started;
            this.renderOutput(outputElement, result);
            if (result.ok) this.recordRun();
            return result;
        }
    };

    const CodeRunnerUI = {
        open(options) {
            const opts = options || {};
            const language = opts.language;
            const original = opts.code || '';
            const title = opts.title || '运行示例';

            const overlay = document.createElement('div');
            overlay.className = 'runner-modal-overlay';
            overlay.innerHTML = `
                <div class="runner-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
                    <div class="runner-modal-head">
                        <div>
                            <strong>${escapeHtml(title)}</strong>
                            <span class="runner-lang">${escapeHtml(typeof language === 'string' ? language : (language && language.name) || '')}</span>
                        </div>
                        <button type="button" class="runner-close" aria-label="关闭">×</button>
                    </div>
                    <textarea class="runner-code" spellcheck="false"></textarea>
                    <div class="runner-actions">
                        <button type="button" class="btn-primary runner-run">▶ 运行</button>
                        <button type="button" class="btn-secondary runner-reset">重置</button>
                        <span class="runner-hint-inline">Ctrl / ⌘ + Enter 运行</span>
                    </div>
                    <div class="runner-output" hidden></div>
                    <p class="runner-hint">代码会发送到在线执行服务；若 Piston 公共 API 限流，会自动切换 Judge0。</p>
                </div>
            `;
            document.body.appendChild(overlay);

            const textarea = overlay.querySelector('.runner-code');
            const output = overlay.querySelector('.runner-output');
            const runButton = overlay.querySelector('.runner-run');
            const resetButton = overlay.querySelector('.runner-reset');
            textarea.value = original;

            const close = () => {
                document.removeEventListener('keydown', onKeydown);
                overlay.remove();
            };
            const onKeydown = event => {
                if (event.key === 'Escape') close();
                if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                    event.preventDefault();
                    run();
                }
            };
            const run = async () => {
                runButton.disabled = true;
                runButton.textContent = '运行中...';
                try {
                    await CodeRunner.runInto(output, language, textarea.value);
                } finally {
                    runButton.disabled = false;
                    runButton.textContent = '▶ 运行';
                }
            };

            runButton.addEventListener('click', run);
            resetButton.addEventListener('click', () => {
                textarea.value = original;
                output.hidden = true;
                output.innerHTML = '';
            });
            overlay.querySelector('.runner-close').addEventListener('click', close);
            overlay.addEventListener('click', event => {
                if (event.target === overlay) close();
            });
            document.addEventListener('keydown', onKeydown);
            textarea.focus();
            return overlay;
        }
    };

    CodeRunner.init();
    global.CodeRunner = CodeRunner;
    global.CodeRunnerUI = CodeRunnerUI;
})(window);
