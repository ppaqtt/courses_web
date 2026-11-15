#!/usr/bin/env python3
"""Build tutorial runtime assets from data/tutorial-*.json.

Generates:
  - data/tutorial-<slug>.data.js  (window.TUTORIAL_DATA_<slug>)
  - tutorial-<slug>.html          (page shell for each language)

Run from the repository root:  python3 scripts/build_tutorial_assets.py
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"

META = {
    "assembly": ("汇编语言", "x86-64 NASM · Linux 系统调用"),
    "c": ("C 语言", "C11 · 指针与内存管理"),
    "clojure": ("Clojure", "JVM 上的函数式 Lisp"),
    "cobol": ("COBOL", "GnuCOBOL · 商业数据处理"),
    "cpp": ("C++", "现代 C++ 与系统编程"),
    "csharp": ("C#", ".NET 平台与面向对象"),
    "dart": ("Dart", "Flutter 与跨端开发"),
    "elixir": ("Elixir", "BEAM 上的函数式并发"),
    "erlang": ("Erlang", "OTP 与容错并发"),
    "fortran": ("Fortran", "现代 Fortran（.f90）科学计算"),
    "fsharp": ("F#", ".NET 上的函数式编程"),
    "go": ("Go", "并发与云原生开发"),
    "groovy": ("Groovy", "JVM 上的动态语言"),
    "haskell": ("Haskell", "纯函数式与类型系统"),
    "html-css": ("HTML/CSS", "语义化标记与现代布局"),
    "java": ("Java", "面向对象与企业级开发"),
    "javascript": ("JavaScript", "Web 前端与 Node.js"),
    "julia": ("Julia", "科学计算与多重派发"),
    "kotlin": ("Kotlin", "现代 JVM 与 Android"),
    "lua": ("Lua", "轻量级嵌入式脚本"),
    "objectivec": ("Objective-C", "消息机制与 Foundation"),
    "ocaml": ("OCaml", "模块系统与函数式编程"),
    "pascal": ("Pascal", "Free Pascal 与结构化编程"),
    "perl": ("Perl", "文本处理与正则表达式"),
    "php": ("PHP", "Web 后端与脚本开发"),
    "prolog": ("Prolog", "逻辑编程与推理"),
    "python": ("Python", "数据科学与自动化"),
    "r-lang": ("R", "统计分析与可视化"),
    "ruby": ("Ruby", "优雅的面向对象脚本"),
    "rust": ("Rust", "内存安全与零成本抽象"),
    "scala": ("Scala", "JVM 上的函数式与面向对象"),
    "shell": ("Shell", "Bash 脚本与自动化运维"),
    "sql": ("SQL", "SQLite 查询与数据建模"),
    "swift": ("Swift", "iOS 与 macOS 开发"),
    "typescript": ("TypeScript", "类型化的 JavaScript"),
    "zig": ("Zig", "系统编程与手动内存管理"),
}

ALIASES = {
    "html": "html-css",
    "css": "html-css",
    "bash": "shell",
    "r": "r-lang",
}


def var_name(slug: str) -> str:
    return slug.replace("-", "_")


def fix_quizzes(chapters: list[dict]) -> int:
    """Ensure every chapter has at least one practice question."""
    fixed = 0
    for chapter in chapters:
        questions = chapter.get("q")
        if not questions:
            points = chapter.get("p") or [chapter.get("t", "")]
            chapter["q"] = [{
                "q": f"请用自己的话说明「{chapter.get('t', '本章')}」的核心要点。",
                "a": points[0],
            }]
            fixed += 1
    return fixed


def write_data_js(slug: str, chapters: list[dict]) -> None:
    body = json.dumps(chapters, ensure_ascii=False, indent=2)
    content = f"window.TUTORIAL_DATA_{var_name(slug)} = {body};\n"
    (DATA / f"tutorial-{slug}.data.js").write_text(content, encoding="utf-8")


PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{name}基础教程 - 35+ 章完整教程，涵盖基础语法、数据结构、面向对象、文件操作、标准库与工具链等核心知识，支持在线运行代码。">
    <meta name="keywords" content="{name}教程,{name}入门,{name}基础,{name}在线运行">
    <title>{name} 基础教程 | 编程教程</title>
    <link rel="manifest" href="manifest.json">
    <link rel="stylesheet" href="css/runoob-style.css">
    <link rel="stylesheet" href="tutorial-features.css">
    <link rel="stylesheet" href="tutorial-extensions.css">
    <link rel="stylesheet" href="tutorial-advanced.css">
</head>
<body data-language="{slug}">
    <script src="data/tutorial-{slug}.data.js"></script>
    <script src="tutorial-common.js"></script>
    <script src="tutorial-extensions.js"></script>
    <script src="tutorial-advanced.js"></script>
    <script src="tutorial-runner.js?v=20261115"></script>
    <script src="js/runoob-tutorial.js?v=20261115"></script>
    <script>
        const tutorial = new RunoobTutorial({{
            language: '{slug}',
            title: '{name}教程',
            subtitle: '{subtitle}'
        }});
    </script>
</body>
</html>
"""


def write_page(slug: str, name: str, subtitle: str) -> None:
    html = PAGE_TEMPLATE.format(slug=slug, name=name, subtitle=subtitle)
    (ROOT / f"tutorial-{slug}.html").write_text(html, encoding="utf-8")


def main() -> None:
    files = sorted(DATA.glob("tutorial-*.json"))
    total_chapters = 0
    for path in files:
        slug = path.stem[len("tutorial-"):]
        chapters = json.loads(path.read_text(encoding="utf-8"))
        if len(chapters) not in (35, 36):
            raise SystemExit(f"{path} has {len(chapters)} chapters, expected 35 or 36")
        fixed = fix_quizzes(chapters)
        path.write_text(json.dumps(chapters, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        write_data_js(slug, chapters)
        name, subtitle = META.get(slug, (slug, "从入门到精通"))
        write_page(slug, name, subtitle)
        total_chapters += len(chapters)
        print(f"  {slug:<14} chapters={len(chapters):<3} quizzes_fixed={fixed}")
    print(f"built {len(files)} languages / {total_chapters} chapters")

    # Aliases used by language-catalog keys
    for alias, target in ALIASES.items():
        if (ROOT / f"tutorial-{target}.html").exists() and not (ROOT / f"tutorial-{alias}.html").exists():
            (ROOT / f"tutorial-{alias}.html").write_text(
                f'<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">'
                f'<meta http-equiv="refresh" content="0;url=tutorial-{target}.html">'
                f'<title>{alias} 教程</title></head><body>'
                f'<a href="tutorial-{target}.html">继续学习 {alias}</a></body></html>\n',
                encoding="utf-8",
            )
            print(f"  alias tutorial-{alias}.html -> tutorial-{target}.html")


if __name__ == "__main__":
    main()
