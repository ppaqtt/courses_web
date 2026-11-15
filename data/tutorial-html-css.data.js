window.TUTORIAL_DATA_html_css = [
  {
    "id": 1,
    "t": "HTML 与 CSS 简介：从超文本到现代网页",
    "p": [
      "HTML 由 Tim Berners-Lee 于 1991 年提出，用标签描述文档结构，浏览器解析后渲染成页面",
      "HTML5 在 2014 年成为 W3C 推荐标准，新增语义标签、音视频、表单控件与 Canvas 等能力",
      "CSS 于 1996 年发布 1.0，负责表现层；CSS3 按模块拆分，选择器、动画、布局各自独立演进",
      "结构与样式分离：HTML 表达含义，CSS 控制外观，JavaScript 负责行为，三者职责清晰",
      "浏览器把 HTML 解析为 DOM 树，再结合 CSSOM 计算样式，完成布局、绘制与合成"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>我的第一个网页</title>\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; background: #f5f7fb; color: #1f2933; }\n    main { max-width: 40rem; margin: 4rem auto; padding: 2rem; background: #fff; border-radius: 12px; }\n    h1 { color: #2563eb; margin-top: 0; }\n  </style>\n</head>\n<body>\n  <main>\n    <h1>你好，HTML 与 CSS！</h1>\n    <p>这是用语义标签与层叠样式表写成的第一个页面。</p>\n  </main>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "把 HTML 当成编程语言，试图在标签里写条件与循环。HTML 是声明式标记，只描述结构与含义；交互逻辑应交给 CSS 或 JavaScript，否则既无法运行也难以维护。",
    "q": [
      {
        "q": "HTML 与 CSS 各自负责什么？",
        "a": "HTML 描述内容的结构与语义，CSS 负责版式、颜色和视觉效果；两者分离，便于维护与无障碍访问。"
      },
      {
        "q": "为什么说 HTML 不是编程语言？",
        "a": "它没有变量、分支、循环等执行逻辑，只由浏览器解析成 DOM 树，属于声明式标记语言。"
      },
      {
        "q": "CSS3 的“模块化”指什么？",
        "a": "CSS3 不再是一个大而全的规范，而是拆成选择器、动画、Grid、色彩等多个独立模块分批演进。"
      }
    ]
  },
  {
    "id": 2,
    "t": "开发环境与工具链：编辑器、DevTools 与本地服务器",
    "p": [
      "编辑器选择 VS Code 或 WebStorm，安装 HTML CSS Support、Live Server、Prettier 插件提升效率",
      "浏览器 DevTools 的 Elements、Styles、Network、Lighthouse 面板是日常调试主战场",
      "用 python3 -m http.server 或 npx serve 启动本地服务器，避免 file:// 下的路径与跨域限制",
      "用 W3C Nu Html Checker 或 html-validate 校验文档，用 stylelint 检查 CSS 规范",
      "建立固定目录：index.html、css/、js/、assets/，为后续构建工具预留入口"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>环境自检</title>\n  <!-- 启动本地服务器：python3 -m http.server 5500 -->\n  <!-- 校验标记：npx html-validate index.html -->\n  <!-- 检查样式：npx stylelint \"css/**/*.css\" -->\n  <link rel=\"stylesheet\" href=\"css/style.css\">\n</head>\n<body>\n  <main class=\"card\">\n    <h1>工具链已就绪</h1>\n    <p>在浏览器按 F12 打开 DevTools，切换到 Elements 面板查看本段文字。</p>\n  </main>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "直接双击 HTML 用 file:// 打开，导致相对路径、fetch 与 Service Worker 失效；或者只装编辑器却不装格式化与校验工具，问题积累到上线才暴露。",
    "q": [
      {
        "q": "为什么建议用本地服务器而不是 file:// 打开页面？",
        "a": "本地服务器提供正确的 HTTP 协议、MIME 类型与同源环境，路径解析和网络请求行为才与线上一致。"
      },
      {
        "q": "DevTools 的 Network 面板能解决什么问题？",
        "a": "查看每个资源的请求状态、耗时和大小，定位 404、缓存未命中、图片过大等加载问题。"
      }
    ]
  },
  {
    "id": 3,
    "t": "HTML 文档结构与基础语法",
    "p": [
      "文档以 <!DOCTYPE html> 开头，进入标准模式，避免浏览器用怪异模式解析盒模型",
      "html 根元素必须声明 lang，head 内放字符集、视口、标题、描述与样式表链接",
      "标签由开始标签、属性、内容和结束标签组成，空元素如 img、br 不需要闭合",
      "属性值用双引号包裹，布尔属性只需写名字，属性名与值均不区分大小写但约定小写",
      "body 只承载可见内容，用 header、main、footer 划分页面区域，一个页面只应有一个 main"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <meta name=\"description\" content=\"演示标准 HTML 文档结构\">\n  <title>文档结构 | 我的站点</title>\n  <link rel=\"icon\" href=\"assets/favicon.ico\">\n</head>\n<body>\n  <!-- 页眉：全站导航 -->\n  <header>\n    <nav aria-label=\"主导航\"><a href=\"/\">首页</a></nav>\n  </header>\n  <main id=\"content\">\n    <h1>标准文档骨架</h1>\n    <p>head 存放元信息，body 存放可见内容。</p>\n  </main>\n  <footer><p>© 2026 我的站点</p></footer>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "漏写 DOCTYPE 会让浏览器进入怪异模式，盒模型与行高计算随之改变；把标题、段落直接堆在 body 下而不使用 main、header 等结构，会削弱语义与可访问性。",
    "q": [
      {
        "q": "DOCTYPE 的作用是什么？",
        "a": "告诉浏览器使用标准模式渲染，避免怪异模式下盒模型和样式计算的差异。"
      },
      {
        "q": "一个页面可以有多个 main 元素吗？",
        "a": "不应有。main 表示页面主内容，规范要求每个文档最多一个可见的 main。"
      },
      {
        "q": "lang 属性有什么实际用途？",
        "a": "帮助屏幕阅读器选择发音、辅助翻译与拼写检查，也影响部分字体的字形选择。"
      }
    ]
  },
  {
    "id": 4,
    "t": "文本内容与语义化标签",
    "p": [
      "标题只用 h1 到 h6，按层级递进，不要为了字号跳到 h4，样式交给 CSS 控制",
      "段落用 p，强调用 strong（重要）与 em（语气），不要用 b、i 表达语义",
      "列表分 ul、ol、dl 三种，导航与菜单本质上是链接列表，应使用 ul 包裹 li",
      "引用用 blockquote 配 cite 属性，行内引用用 q，代码用 code 与 pre 保留空白",
      "语义标签让搜索引擎和读屏软件理解内容层次，比一堆 div 更有价值"
    ],
    "c": "<article>\n  <header>\n    <h1>为什么语义化值得坚持</h1>\n    <p><time datetime=\"2026-03-01\">2026 年 3 月 1 日</time> · 作者：林一</p>\n  </header>\n  <p>语义化不是<em>形式主义</em>，它让机器和人都能读懂结构。请记住 <strong>内容优先</strong>。</p>\n  <section>\n    <h2>三个直接收益</h2>\n    <ul>\n      <li>读屏软件可以按标题跳转</li>\n      <li>搜索引擎能识别主题与层级</li>\n      <li>样式改版时结构保持稳定</li>\n    </ul>\n  </section>\n  <blockquote cite=\"https://www.w3.org/TR/html52/\">\n    <p>作者应使用最具语义的元素，而不是仅用于表现的元素。</p>\n  </blockquote>\n  <p>安装命令写作 <code>npm install</code>，多行代码放在 pre 中。</p>\n</article>",
    "et": "❌ 常见错误",
    "ec": "用 div 加 class 模拟标题和列表，导致读屏软件无法导航；或者为了字号使用 h4 跳过 h2，破坏大纲层级。标题层级应由内容结构决定。",
    "q": [
      {
        "q": "strong 与 b 的区别是什么？",
        "a": "strong 表示内容重要，具有语义；b 只是视觉加粗，不传达额外含义。"
      },
      {
        "q": "什么场合应该用 dl？",
        "a": "描述“名称—值”成对出现的数据，例如术语表、元数据列表、参数说明。"
      }
    ]
  },
  {
    "id": 5,
    "t": "链接、图片与资源路径",
    "p": [
      "a 的 href 支持绝对 URL、根相对路径与文档相对路径，站内跳转优先用相对路径",
      "图片必须写 alt，描述图像传达的信息；纯装饰图用 alt=\"\" 让读屏软件跳过",
      "显式写 width 与 height 可预留空间，减少布局偏移，是 CLS 优化的关键一步",
      "picture 与 srcset 让浏览器按视口和像素密度选择 AVIF、WebP 或 JPEG 资源",
      "外链加 rel=\"noopener noreferrer\"，锚点跳转用 id 定位，不要用空 href"
    ],
    "c": "<header>\n  <nav aria-label=\"站点导航\">\n    <a href=\"index.html\">首页</a>\n    <a href=\"/blog/\" aria-current=\"page\">博客</a>\n    <a href=\"https://developer.mozilla.org/zh-CN/\" rel=\"noopener noreferrer\">MDN</a>\n  </nav>\n</header>\n<main>\n  <figure>\n    <picture>\n      <source media=\"(min-width: 800px)\" srcset=\"assets/hero-large.avif\" type=\"image/avif\">\n      <img src=\"assets/hero-small.jpg\" alt=\"黄昏时分城市天际线的剪影\"\n           width=\"640\" height=\"360\" loading=\"lazy\">\n    </picture>\n    <figcaption>图 1：浏览器会按视口宽度选择图片资源</figcaption>\n  </figure>\n  <p><a href=\"#contact\">跳转到联系方式</a></p>\n</main>",
    "et": "❌ 常见错误",
    "ec": "图片不写 alt 或把文件名当 alt，读屏软件只能读出无意义字符；忘记写 width 和 height 会造成图片加载后页面跳动。外链不加 noopener 还存在安全风险。",
    "q": [
      {
        "q": "alt 为空字符串和完全省略 alt 有何不同？",
        "a": "alt=\"\" 表示装饰性图片，读屏软件跳过；省略 alt 时部分读屏软件会朗读文件名，语义更差。"
      },
      {
        "q": "srcset 与 sizes 分别解决什么问题？",
        "a": "srcset 提供多分辨率候选，sizes 告诉浏览器图片在不同视口下的显示宽度，以便选出最合适的资源。"
      }
    ]
  },
  {
    "id": 6,
    "t": "表格与数据展示",
    "p": [
      "表格只用于二维数据，不要用来做页面布局，布局请使用 Flexbox 或 Grid",
      "caption 提供表格标题，thead、tbody、tfoot 划分区域，便于样式与语义表达",
      "表头单元格用 th 并加 scope=\"col\" 或 scope=\"row\"，读屏软件据此关联数据",
      "合并单元格用 colspan 与 rowspan，合并后要重新核对每行单元格数量",
      "宽表格放在 overflow-x auto 的容器中，移动端可横向滚动而不撑破页面"
    ],
    "c": "<table>\n  <caption>2026 年第一季度销售汇总（单位：万元）</caption>\n  <thead>\n    <tr>\n      <th scope=\"col\">区域</th>\n      <th scope=\"col\">一月</th>\n      <th scope=\"col\">二月</th>\n      <th scope=\"col\">合计</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr><th scope=\"row\">华东</th><td>120</td><td>135</td><td>255</td></tr>\n    <tr><th scope=\"row\">华北</th><td>98</td><td>110</td><td>208</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><th scope=\"row\">总计</th><td>218</td><td>245</td><td>463</td></tr>\n  </tfoot>\n</table>",
    "et": "❌ 常见错误",
    "ec": "用 table 搭页面布局，导致 DOM 臃肿、响应式困难；省略 thead 与 scope，读屏软件无法把数据单元格与表头关联，表格信息对残障用户不可用。",
    "q": [
      {
        "q": "th 的 scope 属性有什么作用？",
        "a": "声明表头作用于列还是行，帮助辅助技术把数据单元格与对应表头关联起来。"
      },
      {
        "q": "为什么表格不应作为布局工具？",
        "a": "表格语义是数据关系，用它布局会破坏文档大纲、增加嵌套，并且难以适配不同屏幕。"
      }
    ]
  },
  {
    "id": 7,
    "t": "表单与输入控件",
    "p": [
      "每个输入控件都要有 label，用 for 与 id 关联，或把控件嵌套在 label 内部",
      "input 的 type 决定键盘布局与校验行为，email、tel、number、date 要选对",
      "required、minlength、pattern 提供原生校验，但服务端仍必须重新校验",
      "fieldset 与 legend 把相关控件分组，select 用 optgroup 分组选项",
      "form 的 action 与 method 明确提交地址与方式，敏感操作使用 POST"
    ],
    "c": "<form action=\"/subscribe\" method=\"post\" novalidate>\n  <fieldset>\n    <legend>订阅产品更新</legend>\n    <p>\n      <label for=\"email\">邮箱地址</label>\n      <input id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\"\n             placeholder=\"you@example.com\" required>\n    </p>\n    <p>\n      <label for=\"topic\">关注主题</label>\n      <select id=\"topic\" name=\"topic\">\n        <optgroup label=\"前端\">\n          <option value=\"html\">HTML</option>\n          <option value=\"css\" selected>CSS</option>\n        </optgroup>\n      </select>\n    </p>\n    <p>\n      <label for=\"note\">备注</label>\n      <textarea id=\"note\" name=\"note\" rows=\"3\" maxlength=\"200\"></textarea>\n    </p>\n    <button type=\"submit\">提交订阅</button>\n  </fieldset>\n</form>",
    "et": "❌ 常见错误",
    "ec": "只写 placeholder 不写 label，输入后提示消失、读屏软件也读不出字段含义；button 不写 type，在表单中默认是 submit，容易触发意外提交。",
    "q": [
      {
        "q": "label 的 for 必须和什么对应？",
        "a": "对应控件的 id，二者一致才能建立标签与控件的关联，点击标签即可聚焦控件。"
      },
      {
        "q": "为什么客户端校验不能替代服务端校验？",
        "a": "浏览器校验可以被禁用或绕过，只有服务端校验才能保证数据安全与完整性。"
      }
    ]
  },
  {
    "id": 8,
    "t": "CSS 引入方式与选择器基础",
    "p": [
      "CSS 有三种引入方式：外部样式表 link、内部 style、行内 style，工程中优先外部样式表",
      "基础选择器包括类型、类、ID、通配符，类选择器可复用，ID 应唯一且少用于样式",
      "组合器有后代（空格）、子元素（>）、相邻兄弟（+）、通用兄弟（~），用于精确匹配",
      "属性选择器如 [disabled]、[type=\"email\"]，伪类如 :first-child 可减少多余类名",
      "浏览器从右向左匹配选择器，末尾选择器越具体，筛选成本通常越低"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>选择器演示</title>\n  <style>\n    body { font-family: system-ui, sans-serif; }\n    .nav > li { display: inline-block; margin-right: 1rem; }\n    .nav a { color: #2563eb; text-decoration: none; }\n    .nav a:hover, .nav a:focus-visible { text-decoration: underline; }\n    li:first-child a { font-weight: 700; }\n    a[aria-current=\"page\"] { color: #b91c1c; }\n  </style>\n</head>\n<body>\n  <ul class=\"nav\">\n    <li><a href=\"/\" aria-current=\"page\">首页</a></li>\n    <li><a href=\"/docs/\">文档</a></li>\n  </ul>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "滥用 ID 选择器写样式，导致复用困难与优先级过高；或者用 div div span 这类深层后代选择器，既脆弱又拖慢匹配。优先用类名和低特异性选择器。",
    "q": [
      {
        "q": "类选择器和 ID 选择器的主要区别？",
        "a": "类可以复用、一个元素可有多个；ID 在文档中唯一且特异性更高，适合锚点而非批量样式。"
      },
      {
        "q": "子元素组合器和后代组合器有何不同？",
        "a": "> 只匹配直接子元素，空格匹配任意层级后代，前者范围更可控。"
      }
    ]
  },
  {
    "id": 9,
    "t": "盒模型与尺寸计算",
    "p": [
      "每个元素都是一个盒子，由 content、padding、border、margin 四层组成",
      "默认 content-box 下 width 只算内容，设置 border-box 后宽度包含内边距与边框",
      "用 *, *::before, *::after { box-sizing: border-box } 统一盒模型，减少计算错误",
      "垂直相邻的外边距会发生折叠，取较大值；Flex 与 Grid 子项之间不会折叠",
      "margin 可为负值，padding 不可为负；百分比 padding 以包含块宽度为基准"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>盒模型</title>\n  <style>\n    *, *::before, *::after { box-sizing: border-box; }\n    body { background: #eef2f7; font-family: system-ui, sans-serif; }\n    .card { width: 320px; padding: 24px; border: 2px solid #cbd5e1;\n            margin: 16px auto; background: #fff; border-radius: 8px; }\n    .card p { margin: 0 0 12px; }\n    .badge { display: inline-block; padding: 4px 10px; border: 1px solid #2563eb; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <span class=\"badge\">新</span>\n    <p>宽度 320px 已包含内边距与边框，因为启用了 border-box。</p>\n  </div>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "设置了 width: 100% 再加 padding，元素总宽超出容器导致横向滚动；这是 content-box 的典型陷阱。统一使用 border-box 并检查父容器宽度即可避免。",
    "q": [
      {
        "q": "border-box 与 content-box 的区别？",
        "a": "border-box 的 width 包含 padding 和 border；content-box 的 width 只包含内容，padding 与 border 额外增加总宽。"
      },
      {
        "q": "为什么两个段落的上下 margin 没有叠加成 40px？",
        "a": "垂直相邻的外边距会折叠，最终取两者中较大的值，而不是相加。"
      }
    ]
  },
  {
    "id": 10,
    "t": "层叠、继承与优先级",
    "p": [
      "层叠按来源与重要性排序：用户代理样式、作者样式、用户样式，!important 会反转顺序",
      "优先级用四元组表示：(行内, ID, 类/属性/伪类, 元素/伪元素)，逐位比较而非相加",
      "继承只发生在可继承属性上，如 color、font、line-height，margin 与 border 不继承",
      "用 :where() 包裹选择器可把特异性归零，适合做基础样式与主题覆盖",
      "!important 应是最后手段，滥用后只能靠更高优先级或再次 !important 覆盖"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>层叠与优先级</title>\n  <style>\n    :root { --brand: #2563eb; }\n    body { color: #1f2933; font-family: system-ui, sans-serif; }\n    a { color: inherit; }\n    .nav a { color: var(--brand); }\n    .nav .active { color: #b91c1c; }\n    .nav a.active { font-weight: 700; }\n    :where(.nav) a { text-decoration: none; }\n  </style>\n</head>\n<body>\n  <nav class=\"nav\">\n    <a href=\"/\">首页</a>\n    <a class=\"active\" href=\"/docs/\">文档</a>\n  </nav>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "把优先级理解为数字相加，误以为 11 个类能压过 1 个 ID；实际上 ID 位更高，永远胜出。另一个误区是靠 !important 打架，最终样式无法维护。",
    "q": [
      {
        "q": ".nav .active 与 .nav a.active 哪个优先级更高？",
        "a": "后者，类数为 2 且元素数为 1，而前者只有 2 个类，逐位比较时后者在元素位占优。"
      },
      {
        "q": ":where() 有什么用？",
        "a": "它把参数内选择器的特异性清零，便于编写易覆盖的基础样式。"
      }
    ]
  },
  {
    "id": 11,
    "t": "颜色、单位与自定义属性",
    "p": [
      "颜色可用关键字、十六进制、rgb()、hsl() 表示，hsl 便于按色相批量调整明暗",
      "绝对单位 px 适合边框与固定尺寸，相对单位 rem、em、ch、vw 适合排版与响应式",
      "rem 基于根元素字号，em 基于当前元素字号，嵌套使用 em 容易层层放大",
      "CSS 自定义属性 --token 通过 var() 使用，可继承、可在媒体查询中整体切换主题",
      "clamp(最小值, 首选值, 最大值) 一行实现流体字号，减少断点数量"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>颜色与单位</title>\n  <style>\n    :root {\n      --brand-h: 220;\n      --brand: hsl(var(--brand-h) 90% 50%);\n      --space: 1rem;\n      --radius: 10px;\n    }\n    body { margin: 0; padding: var(--space); font-family: system-ui, sans-serif; }\n    .hero {\n      background: hsl(var(--brand-h) 90% 96%);\n      border: 1px solid hsl(var(--brand-h) 70% 80%); border-radius: var(--radius);\n      padding: calc(var(--space) * 2);\n    }\n    .hero h1 { color: var(--brand); font-size: clamp(1.5rem, 4vw, 3rem); margin: 0 0 var(--space); }\n  </style>\n</head>\n<body>\n  <section class=\"hero\"><h1>流体排版与主题变量</h1></section>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "在多层嵌套元素上重复使用 em 设置字号，字号会按父级逐层相乘而失控；另一个问题是把颜色硬编码到几十处，改主题时只能全局搜索替换。",
    "q": [
      {
        "q": "rem 与 em 的参照对象分别是什么？",
        "a": "rem 参照根元素 html 的字号，em 参照当前元素自身的字号。"
      },
      {
        "q": "自定义属性为什么能实现主题切换？",
        "a": "它可被继承，只需在根元素或某个容器上重新定义变量值，所有引用 var() 的样式会同步变化。"
      }
    ]
  },
  {
    "id": 12,
    "t": "字体排版与文本样式",
    "p": [
      "font-family 应给出字体栈：系统 UI 字体优先，再回退到通用族名 sans-serif",
      "用 font-size 与 line-height 建立垂直节奏，正文行高建议 1.5 到 1.75",
      "正文字号用 rem，标题用 clamp 做流体缩放，避免小屏标题过大",
      "限制行宽在 60 到 75 个字符，可用 max-width: 65ch 提升长文可读性",
      "text-wrap: balance 让标题换行更均衡，中文可用 letter-spacing 微调字距"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>排版</title>\n  <style>\n    body {\n      font-family: -apple-system, \"Segoe UI\", \"PingFang SC\", \"Noto Sans SC\", sans-serif;\n      color: #24292f;\n      line-height: 1.7;\n      font-size: 1rem;\n    }\n    article { max-width: 65ch; margin: 3rem auto; padding: 0 1.25rem; }\n    h1 { font-size: clamp(1.75rem, 3vw, 2.5rem); line-height: 1.25; text-wrap: balance; }\n    .lead { font-size: 1.125rem; color: #57606a; letter-spacing: 0.01em; }\n    ::selection { background: #fde68a; }\n  </style>\n</head>\n<body>\n  <article>\n    <h1>好排版让内容自己说话</h1>\n    <p class=\"lead\">限制行宽、稳定行高，并给标题留出呼吸空间。</p>\n  </article>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "只写 font-family: \"微软雅黑\" 导致 macOS 与 Linux 回退到衬线字体；或者正文 line-height 用固定 px，字号一变就拥挤。字体栈与相对行高才能跨平台稳定。",
    "q": [
      {
        "q": "为什么字体栈最后要写通用族名？",
        "a": "当前面字体都缺失时，浏览器仍能按 sans-serif 或 serif 选择同类字体，避免回退到不合适的默认字体。"
      },
      {
        "q": "65ch 中的 ch 代表什么？",
        "a": "当前字体中数字 0 的宽度，用来近似控制每行字符数，提升阅读节奏。"
      }
    ]
  },
  {
    "id": 13,
    "t": "Flexbox 弹性布局",
    "p": [
      "给容器设置 display: flex 后，子项沿主轴排列，默认主轴为水平方向",
      "justify-content 控制主轴对齐，align-items 控制交叉轴对齐，gap 设置项目间距",
      "flex: 1 等价于 flex-grow 1、flex-shrink 1、flex-basis 0%，常用于等分空间",
      "flex-wrap: wrap 允许换行，适合标签列表与卡片行；容器不要固定高度以免裁切",
      "子项可用 align-self 单独覆盖交叉轴对齐，用 order 调整视觉顺序而不改 DOM"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Flexbox 导航</title>\n  <style>\n    .bar { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;\n           padding: 1rem 1.5rem; background: #0f172a; color: #e2e8f0; }\n    .brand { font-weight: 700; margin-right: auto; }\n    .menu { display: flex; gap: 1rem; list-style: none; margin: 0; padding: 0; }\n    .menu a { color: inherit; text-decoration: none; } .menu a:hover { color: #60a5fa; }\n    @media (max-width: 30rem) { .menu { width: 100%; justify-content: space-between; } }\n  </style>\n</head>\n<body>\n  <header class=\"bar\">\n    <span class=\"brand\">Atlas</span>\n    <ul class=\"menu\">\n      <li><a href=\"/docs/\">文档</a></li>\n      <li><a href=\"/blog/\">博客</a></li>\n      <li><a href=\"/about/\">关于</a></li>\n    </ul>\n  </header>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "给 Flex 容器写死高度又开启换行，子项会被压扁或溢出；另一个高频错误是以为 justify-content 能控制垂直居中，实际交叉轴要用 align-items。",
    "q": [
      {
        "q": "flex: 1 的完整含义是什么？",
        "a": "flex-grow 为 1、flex-shrink 为 1、flex-basis 为 0%，项目按比例瓜分剩余空间。"
      },
      {
        "q": "如何在 Flex 中把某个元素推到最右侧？",
        "a": "给该元素设置 margin-left: auto，或给左侧元素设置 margin-right: auto。"
      }
    ]
  },
  {
    "id": 14,
    "t": "Grid 网格布局",
    "p": [
      "display: grid 建立二维网格，grid-template-columns 与 rows 定义轨道尺寸",
      "repeat(auto-fit, minmax(220px, 1fr)) 是最常用的响应式卡片列写法",
      "gap 同时控制行列间距，比给子项加 margin 更干净，也不会产生边缘多余间距",
      "grid-column 与 grid-row 可让项目跨越多列多行，用 / 或 span 指定范围",
      "命名区域 grid-template-areas 适合整页布局，媒体查询中只需重写区域模板"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Grid 画廊</title>\n  <style>\n    .gallery {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      gap: 1rem;\n      padding: 1rem;\n    }\n    .gallery figure { margin: 0; background: #f1f5f9; border-radius: 10px; overflow: hidden; }\n    .gallery img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }\n    .gallery figcaption { padding: 0.75rem 1rem; font-size: 0.9rem; color: #475569; }\n  </style>\n</head>\n<body>\n  <section class=\"gallery\">\n    <figure><img src=\"assets/one.jpg\" alt=\"山谷晨雾\"><figcaption>晨雾</figcaption></figure>\n    <figure><img src=\"assets/two.jpg\" alt=\"海边礁石\"><figcaption>礁石</figcaption></figure>\n    <figure><img src=\"assets/three.jpg\" alt=\"城市夜景\"><figcaption>夜色</figcaption></figure>\n  </section>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "用固定列数加百分比宽度，窗口一变就换行错位；或者给网格子项再加 margin，导致 gap 与 margin 叠加。用 auto-fit 与 gap 才能自适应。",
    "q": [
      {
        "q": "auto-fit 与 auto-fill 的区别？",
        "a": "auto-fit 会折叠空轨道让项目拉伸填满，auto-fill 保留空轨道，项目不会被拉宽。"
      },
      {
        "q": "1fr 代表什么？",
        "a": "一份剩余空间，fr 是网格专用的弹性单位，按比例分配可用宽度。"
      }
    ]
  },
  {
    "id": 15,
    "t": "响应式设计与媒体查询",
    "p": [
      "移动优先：先写小屏基础样式，再用 min-width 媒体查询逐步增强大屏布局",
      "用 meta viewport 让移动端布局视口与设备宽度一致，避免页面被整体缩小",
      "断点应依据内容换行位置而非具体机型，常见值为 48rem、64rem、80rem",
      "优先使用流式布局、clamp 与 minmax 减少断点数量，媒体查询只处理结构性变化",
      "响应式图片配合 srcset 与 picture，针对不同视口加载不同尺寸资源"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>响应式布局</title>\n  <style>\n    .layout { display: grid; gap: 1rem; padding: 1rem; grid-template-areas: \"main\" \"side\"; }\n    .main { grid-area: main; }\n    .side { grid-area: side; background: #f1f5f9; padding: 1rem; border-radius: 8px; }\n    h1 { font-size: clamp(1.5rem, 5vw, 2.75rem); margin-top: 0; }\n    @media (min-width: 48rem) {\n      .layout { grid-template-columns: 2fr 1fr; grid-template-areas: \"main side\"; padding: 2rem; }\n    }\n  </style>\n</head>\n<body>\n  <div class=\"layout\">\n    <main class=\"main\"><h1>移动优先的内容布局</h1><p>窄屏纵向堆叠，宽屏变为两栏。</p></main>\n    <aside class=\"side\">侧栏在宽屏时出现于右侧。</aside>\n  </div>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "漏写 viewport，移动端按 980px 虚拟视口渲染，整页被缩小；或者用 max-width 从桌面端向下覆盖，断点越写越多，最终难以维护。",
    "q": [
      {
        "q": "移动优先的媒体查询应该用 min-width 还是 max-width？",
        "a": "用 min-width，从小屏基础样式出发，随视口变大逐步叠加增强规则。"
      },
      {
        "q": "断点应该按 iPhone 型号设定吗？",
        "a": "不应。断点应观察内容在何处变得拥挤或空荡，按内容需要设定。"
      }
    ]
  },
  {
    "id": 16,
    "t": "定位、层叠上下文与 z-index",
    "p": [
      "position 有 static、relative、absolute、fixed、sticky 五种，relative 常作为定位参照",
      "absolute 相对最近的非 static 祖先定位，没有则相对初始包含块",
      "sticky 在滚动到阈值前表现为相对定位，常用于吸顶导航，需要设置 top",
      "z-index 只在定位元素或创建层叠上下文的元素上生效，不是任意元素都能比较",
      "transform、opacity、filter 会创建新的层叠上下文，可能让 z-index 失效"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>定位与层叠</title>\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; }\n    .topbar { position: sticky; top: 0; z-index: 10; background: #0f172a; color: #fff; padding: 1rem; }\n    .card { position: relative; max-width: 28rem; margin: 2rem auto; padding: 1.5rem;\n            background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; }\n    .badge { position: absolute; top: -0.75rem; right: -0.75rem; z-index: 1;\n             background: #dc2626; color: #fff; padding: 0.25rem 0.6rem; border-radius: 999px; }\n    .content { min-height: 120vh; padding: 1rem; }\n  </style>\n</head>\n<body>\n  <header class=\"topbar\">滚动时我保持吸顶</header>\n  <div class=\"card\"><span class=\"badge\">NEW</span><p>角标相对卡片绝对定位。</p></div>\n  <div class=\"content\">向下滚动查看 sticky 效果。</div>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "给元素加 z-index 却不设置 position，样式完全无效；或者父元素有 transform，形成新层叠上下文，子元素的 z-index 只在父级内比较，怎么加都盖不住外部元素。",
    "q": [
      {
        "q": "absolute 元素的定位参照是谁？",
        "a": "最近的 position 不为 static 的祖先元素；若不存在，则相对初始包含块定位。"
      },
      {
        "q": "sticky 为什么有时不生效？",
        "a": "常见原因是未设置 top、父容器 overflow 被设为 hidden 或 auto，或父容器高度不足。"
      }
    ]
  },
  {
    "id": 17,
    "t": "过渡、动画与动效可访问性",
    "p": [
      "transition 用于属性值变化时的平滑过渡，需要指定属性、时长、缓动与延迟",
      "@keyframes 定义多阶段动画，animation 控制名称、时长、次数与填充模式",
      "只对 transform 与 opacity 做动画，能交给合成器处理，避免触发布局与重绘",
      "用 prefers-reduced-motion 媒体查询尊重系统“减少动态效果”设置",
      "动效应服务于反馈与引导，时长通常在 150 到 300 毫秒之间，避免过度炫技"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>过渡与动画</title>\n  <style>\n    .btn { padding: 0.7rem 1.4rem; border: 0; border-radius: 8px; background: #2563eb;\n           color: #fff; cursor: pointer; transition: transform 180ms ease, background 180ms ease; }\n    .btn:hover { background: #1d4ed8; transform: translateY(-2px); }\n    .dot { width: 12px; height: 12px; border-radius: 50%; background: #16a34a;\n           animation: pulse 1.6s ease-in-out infinite; }\n    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .4; transform: scale(.8); } }\n    @media (prefers-reduced-motion: reduce) {\n      .btn, .dot { transition: none; animation: none; }\n    }\n  </style>\n</head>\n<body>\n  <p><button class=\"btn\" type=\"button\">悬停查看过渡</button> <span class=\"dot\"></span></p>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "对 width、top、margin 等属性做动画，每帧都触发布局重排，低端设备明显卡顿；另外忽略 prefers-reduced-motion，会让易晕动人群感到不适。",
    "q": [
      {
        "q": "为什么优先对 transform 做动画？",
        "a": "transform 与 opacity 可在合成层处理，不触发布局和重绘，性能更好。"
      },
      {
        "q": "如何尊重用户的减少动效设置？",
        "a": "使用 @media (prefers-reduced-motion: reduce) 关闭或缩短动画与过渡。"
      }
    ]
  },
  {
    "id": 18,
    "t": "伪类与伪元素",
    "p": [
      "伪类描述元素状态或位置，如 :hover、:focus-visible、:nth-child、:not",
      "伪元素 ::before 与 ::after 用于生成装饰内容，必须设置 content 才会显示",
      "用 ::before 画对勾、下划线或图标，可减少额外标签，且不影响文本语义",
      ":focus-visible 只在键盘操作时显示焦点环，兼顾美观与无障碍",
      "结构性伪类 :first-child、:last-child、:nth-of-type 可替代大量工具类"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>伪类与伪元素</title>\n  <style>\n    .list { list-style: none; padding: 0; max-width: 24rem; margin: 2rem auto; }\n    .list li { position: relative; padding: 0.5rem 0 0.5rem 1.75rem; border-bottom: 1px solid #e2e8f0; }\n    .list li::before { content: \"✓\"; position: absolute; left: 0; color: #16a34a; font-weight: 700; }\n    .list li:nth-child(odd) { background: #f8fafc; }\n    .list li:last-child { border-bottom: 0; }\n    a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }\n    a:hover { color: #b91c1c; }\n  </style>\n</head>\n<body>\n  <ul class=\"list\">\n    <li>语义化标记</li>\n    <li>响应式布局</li>\n    <li><a href=\"/a11y/\">键盘可访问</a></li>\n  </ul>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "用 ::before 插入关键文字内容，读屏软件通常读不到伪元素内容，信息就丢失了；另一个错误是只写 :hover 而忽略键盘焦点，键盘用户无法感知当前元素。",
    "q": [
      {
        "q": "伪元素 ::before 为什么有时不显示？",
        "a": "多半是缺少 content 属性，伪元素必须有 content 才会生成盒子。"
      },
      {
        "q": ":focus-visible 与 :focus 的区别？",
        "a": "focus 在鼠标点击时也触发，focus-visible 只在键盘导航等需要明显焦点的场景显示。"
      }
    ]
  },
  {
    "id": 19,
    "t": "背景、渐变、阴影与边框",
    "p": [
      "background 可同时设置颜色、图片、位置、尺寸与重复方式，简写时注意覆盖关系",
      "linear-gradient 与 radial-gradient 可叠加多层背景，用逗号分隔，先写的在上层",
      "box-shadow 支持多层阴影，用 inset 做内阴影，避免大面积高模糊阴影拖慢绘制",
      "border-radius 可分别设置四个角，用 50% 做圆形头像，用 999px 做胶囊按钮",
      "用 background-clip: text 配 color: transparent 可实现文字渐变，注意降级可读性"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>背景与阴影</title>\n  <style>\n    body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; }\n    .hero { padding: 4rem 1.5rem; text-align: center; color: #fff;\n            background: radial-gradient(circle at 20% 20%, #60a5fa, transparent 45%),\n                        linear-gradient(135deg, #1e3a8a, #0f172a); }\n    .hero h1 { margin: 0 0 1rem; font-size: clamp(1.6rem, 4vw, 2.6rem); }\n    .pill { display: inline-block; padding: 0.45rem 1rem; border-radius: 999px;\n            background: rgba(255,255,255,.15); box-shadow: inset 0 0 0 1px rgba(255,255,255,.35); }\n    .avatar { width: 64px; height: 64px; border-radius: 50%; margin: 1rem auto 0;\n              box-shadow: 0 10px 25px rgba(15, 23, 42, .35); background: #fff; }\n  </style>\n</head>\n<body>\n  <section class=\"hero\">\n    <h1>多层背景与柔和阴影</h1>\n    <span class=\"pill\">CSS 渐变</span>\n    <div class=\"avatar\"></div>\n  </section>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "在简写 background 中先写图片再写颜色，颜色把渐变盖住；或者给大量元素叠加高模糊大阴影，滚动时出现明显掉帧。",
    "q": [
      {
        "q": "多层背景的绘制顺序是怎样的？",
        "a": "逗号分隔时，先声明的背景在最上层，后声明的在下层，最后绘制的颜色在最底。"
      },
      {
        "q": "box-shadow 的 inset 关键字表示什么？",
        "a": "把阴影绘制在元素内部，形成内阴影效果。"
      }
    ]
  },
  {
    "id": 20,
    "t": "图片、媒体与自适应展示",
    "p": [
      "img 设置 max-width: 100% 与 height: auto 可防止图片撑破容器",
      "object-fit: cover 让图片裁剪填充，contain 完整显示，配合 object-position 控制焦点",
      "aspect-ratio 固定宽高比，加载前即预留空间，避免布局偏移",
      "video 提供 controls、poster 与 track 字幕，autoplay 时需 muted 才被浏览器允许",
      "使用懒加载 loading=\"lazy\" 与 decoding=\"async\"，减少首屏带宽与主线程压力"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>媒体展示</title>\n  <style>\n    .media { max-width: 42rem; margin: 2rem auto; font-family: system-ui, sans-serif; }\n    .cover { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 12px; display: block; }\n    .thumb { width: 120px; height: 120px; object-fit: contain; background: #f1f5f9; border-radius: 8px; }\n    video { width: 100%; border-radius: 12px; background: #000; }\n  </style>\n</head>\n<body>\n  <div class=\"media\">\n    <img class=\"cover\" src=\"assets/landscape.jpg\" alt=\"雪山倒映在湖面\" width=\"1280\" height=\"720\" loading=\"lazy\">\n    <img class=\"thumb\" src=\"assets/logo.svg\" alt=\"Atlas 标志\" width=\"120\" height=\"120\">\n    <video controls muted playsinline poster=\"assets/poster.jpg\" preload=\"metadata\">\n      <source src=\"assets/intro.webm\" type=\"video/webm\">\n      <track kind=\"captions\" src=\"assets/intro.vtt\" srclang=\"zh\" label=\"中文字幕\" default>\n      您的浏览器不支持视频播放。\n    </video>\n  </div>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "只设置 width 不设 height 导致图片比例失真；或给 img 设置固定 height 又用 cover，却没设 object-position，人物头部被裁掉。用 aspect-ratio 与 object-fit 组合更稳。",
    "q": [
      {
        "q": "object-fit: cover 与 contain 的区别？",
        "a": "cover 保持比例填满容器并裁剪溢出部分，contain 保持比例完整显示，可能留下空白。"
      },
      {
        "q": "为什么要给 img 写 width 和 height？",
        "a": "浏览器可提前算好占位比例，图片加载后不发生布局偏移，改善 CLS。"
      }
    ]
  },
  {
    "id": 21,
    "t": "前端工程化工具链：依赖、测试、格式化与构建",
    "p": [
      "包管理器 npm、pnpm 通过 package.json 管理依赖，用 lock 文件锁定版本",
      "构建工具 Vite 提供开发服务器、热更新与生产打包，产物带内容哈希便于缓存",
      "Sass 或 PostCSS 处理嵌套、变量与浏览器前缀，Autoprefixer 按目标浏览器补全",
      "Prettier 统一格式，Stylelint 检查 CSS 规范，两者应接入编辑器与提交钩子",
      "测试与调试：Playwright 做端到端测试，axe 检查无障碍，Chrome DevTools 定位性能瓶颈"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>工具链清单</title>\n  <!-- 包管理器/依赖：npm install -D vite sass postcss autoprefixer\n       格式化：npx prettier --write \"src/**/*.{html,css}\"\n       规范检查：npx stylelint \"src/**/*.css\"\n       测试框架：npm install -D @playwright/test @axe-core/playwright\n       调试器：Chrome DevTools / npx vite --debug\n       构建：npx vite build      运行：npx vite --port 5173 -->\n  <link rel=\"stylesheet\" href=\"/src/style.css\">\n</head>\n<body>\n  <main>\n    <h1>HTML/CSS 工具链</h1>\n    <p>开发用 Vite 热更新，发布用构建产物。</p>\n  </main>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "只把依赖装在全局，团队成员与环境不一致导致构建失败；或者提交 node_modules 却不提交 lock 文件，版本漂移后线上样式与本地不同。",
    "q": [
      {
        "q": "为什么生产构建的文件名要带哈希？",
        "a": "内容变化时文件名随之变化，可设置长期强缓存，同时避免旧缓存命中。"
      },
      {
        "q": "Prettier 与 Stylelint 的职责如何区分？",
        "a": "Prettier 负责代码格式，Stylelint 负责规则与潜在错误，例如非法属性、重复选择器。"
      }
    ]
  },
  {
    "id": 22,
    "t": "现代 CSS：容器查询、:has() 与嵌套",
    "p": [
      "容器查询 @container 依据父容器宽度调整子元素，比媒体查询更适合可复用组件",
      "使用前需在容器上声明 container-type: inline-size，并可用 container-name 命名",
      ":has() 让父元素根据后代状态改变样式，可实现表单校验态、卡片选中态",
      "CSS 嵌套让选择器写在父规则内部，用 & 引用父选择器，减少重复前缀",
      "subgrid 让网格子项继承父网格轨道，解决多层卡片对齐问题"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>现代 CSS</title>\n  <style>\n    .card { container-type: inline-size; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; } .card__body { display: block; }\n    @container (min-width: 380px) { .card__body { display: grid; grid-template-columns: 1fr 2fr; gap: 1rem; align-items: center; } }\n    form:has(input:invalid) button { opacity: 0.5; cursor: not-allowed; }\n    .nav {\n      display: flex; gap: 1rem;\n      & a { color: #2563eb; text-decoration: none; }\n      & a:hover { text-decoration: underline; }\n    }\n  </style>\n</head>\n<body>\n  <article class=\"card\">\n    <div class=\"card__body\">\n      <strong>容器查询</strong>\n      <p>容器变宽时，卡片内部自动变为两栏。</p>\n    </div>\n  </article>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "在未声明 container-type 的元素上使用 @container，规则永远不生效；或者嵌套时忘记写 &，后代选择器与预期不符。",
    "q": [
      {
        "q": "容器查询与媒体查询的核心差异？",
        "a": "容器查询看父容器尺寸，组件放到任何位置都能自适应；媒体查询只看视口。"
      },
      {
        "q": ":has() 能解决什么老问题？",
        "a": "过去父元素无法根据子元素状态改样式，需要 JavaScript 加类；现在可直接用 :has() 选择。"
      }
    ]
  },
  {
    "id": 23,
    "t": "前端性能优化：加载、渲染与字体",
    "p": [
      "关键 CSS 内联到 head，其余样式异步加载，减少首屏阻塞",
      "用 preload 提前加载关键字体与首屏图片，用 preconnect 预热第三方域名",
      "字体设置 font-display: swap 并使用子集化，避免文字长时间不可见",
      "图片使用 AVIF 或 WebP、正确尺寸与懒加载，避免下载后再缩小显示",
      "对长列表使用 content-visibility: auto 跳过屏外渲染，降低初始布局成本"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>性能优化</title>\n  <link rel=\"preconnect\" href=\"https://fonts.example.com\" crossorigin>\n  <link rel=\"preload\" href=\"assets/inter-subset.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n  <link rel=\"stylesheet\" href=\"css/main.css\">\n  <style>\n    /* 首屏关键样式内联，避免额外往返 */\n    .hero { min-height: 60vh; display: grid; place-items: center; background: #0f172a; color: #fff; }\n    @font-face {\n      font-family: \"Inter\";\n      src: url(\"assets/inter-subset.woff2\") format(\"woff2\");\n      font-display: swap;\n    }\n  </style>\n</head>\n<body>\n  <section class=\"hero\"><h1>首屏快速出现</h1></section>\n  <img src=\"assets/below-fold.jpg\" alt=\"首屏以下的图片\" width=\"1280\" height=\"720\" loading=\"lazy\" decoding=\"async\">\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "把所有 CSS 与字体都塞进 head 且不设 font-display，首屏被阻塞数秒；或给首屏大图加 loading=\"lazy\"，反而延迟最大内容绘制 LCP。",
    "q": [
      {
        "q": "首屏图片应该懒加载吗？",
        "a": "不应。懒加载会推迟 LCP，首屏主图应正常加载，甚至用 preload 提升优先级。"
      },
      {
        "q": "font-display: swap 的效果是什么？",
        "a": "先用回退字体显示文本，自定义字体加载完成后再替换，避免文字不可见。"
      }
    ]
  },
  {
    "id": 24,
    "t": "可访问性与自动化测试",
    "p": [
      "为图片写 alt、为表单写 label、为按钮写可读文本，是无障碍的最低要求",
      "提供跳转到主内容的 skip link，让键盘用户跳过重复导航",
      "用 aria-expanded、aria-controls 描述折叠面板状态，但优先使用原生语义元素",
      "颜色对比度至少达到 4.5:1，不能只用颜色传达状态，需配合文字或图标",
      "用 axe-core、Lighthouse 与 Playwright 做自动化检查，并保留键盘走查"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>无障碍页面</title>\n  <style>\n    .skip { position: absolute; left: -999px; top: 0; background: #000; color: #fff; padding: 0.5rem 1rem; }\n    .skip:focus { left: 0; z-index: 100; }\n    nav a { margin-right: 1rem; }\n  </style>\n</head>\n<body>\n  <a class=\"skip\" href=\"#main\">跳到主内容</a>\n  <nav aria-label=\"主导航\"><a href=\"/\">首页</a><a href=\"/docs/\">文档</a></nav>\n  <main id=\"main\" tabindex=\"-1\">\n    <h1>可被辅助技术理解的页面</h1>\n    <button type=\"button\" aria-expanded=\"false\" aria-controls=\"panel\">展开详情</button>\n    <div id=\"panel\" hidden>面板内容</div>\n  </main>\n  <!-- 测试：npx playwright test；npx @axe-core/cli http://localhost:5173 -->\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "用 div 加 onclick 当按钮，键盘无法聚焦也无法回车触发；或者只靠红绿颜色区分状态，色盲用户无法判断。必须使用原生控件并补充文本提示。",
    "q": [
      {
        "q": "skip link 的作用是什么？",
        "a": "让键盘与读屏用户直接跳到主内容，跳过每页重复的导航链接。"
      },
      {
        "q": "为什么说原生 button 优于 div 模拟？",
        "a": "原生按钮自带键盘焦点、回车与空格触发、禁用态与语义，辅助技术可直接识别。"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧：DevTools 与布局排查",
    "p": [
      "Elements 面板可实时修改 DOM 与样式，Styles 中划掉的规则说明被覆盖或无效",
      "Computed 面板查看最终计算值与盒模型，能快速定位尺寸与间距来源",
      "Layout 面板开启 Grid 与 Flex 叠加线，直观看到轨道、间隙与对齐",
      "Rendering 面板可模拟 prefers-reduced-motion、色盲与低对比度场景",
      "用 console 的 $0 引用当前选中元素，用 document.querySelector 快速验证选择器"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>调试练习</title>\n  <style>\n    .wrap { display: flex; gap: 12px; padding: 16px; background: #f8fafc; }\n    .box { flex: 1; min-width: 0; padding: 16px; background: #fff; border: 1px solid #cbd5e1; }\n    /* 调试时临时加描边，快速看清元素边界\n       * { outline: 1px solid rgba(255,0,0,.25); } */\n    .box--overflow { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n  </style>\n</head>\n<body>\n  <div class=\"wrap\">\n    <div class=\"box\">第一列</div>\n    <div class=\"box box--overflow\">这一列的内容很长很长，需要省略号而不是撑破布局</div>\n  </div>\n  <!-- 在 Console 中执行：$0.style.outline = '2px solid red' -->\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "只在编辑器里猜样式，从不打开 Computed 面板确认最终值；或者改完 DevTools 忘记同步回源码，刷新后样式“消失”，浪费大量时间。",
    "q": [
      {
        "q": "Styles 面板中带删除线的声明代表什么？",
        "a": "该声明被更高优先级或后出现的规则覆盖，当前未生效。"
      },
      {
        "q": "如何快速查看某个元素的盒模型尺寸？",
        "a": "选中元素后查看 Computed 面板底部的盒模型图，或 Layout 面板的盒模型示意。"
      }
    ]
  },
  {
    "id": 26,
    "t": "与外部系统互操作：嵌入、字体与第三方资源",
    "p": [
      "iframe 可嵌入地图、视频与第三方表单，必须设置 title 供读屏软件识别",
      "iframe 使用 sandbox 限制脚本与表单能力，用 loading=\"lazy\" 延迟加载",
      "第三方字体用 preconnect 预热连接，并准备本地回退字体栈",
      "外部样式与脚本可用 Subresource Integrity 校验文件哈希，防止被篡改",
      "嵌入内容可能带来 Cookie 与隐私问题，必要时使用两阶段点击加载"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>嵌入外部内容</title>\n  <link rel=\"preconnect\" href=\"https://www.youtube-nocookie.com\" crossorigin>\n  <style>\n    .embed { position: relative; aspect-ratio: 16 / 9; background: #0f172a; border-radius: 12px; overflow: hidden; }\n    .embed iframe { width: 100%; height: 100%; border: 0; display: block; }\n    .map { width: 100%; height: 320px; border: 1px solid #cbd5e1; border-radius: 8px; }\n  </style>\n</head>\n<body>\n  <div class=\"embed\">\n    <iframe src=\"https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ\"\n            title=\"课程介绍视频\" loading=\"lazy\"\n            sandbox=\"allow-scripts allow-same-origin allow-presentation\"\n            allow=\"accelerometer; encrypted-media; picture-in-picture\"></iframe>\n  </div>\n  <iframe class=\"map\" src=\"https://example.com/map\" title=\"公司位置地图\" loading=\"lazy\"></iframe>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "iframe 不写 title，读屏软件只能读出“框架”；或者无条件允许所有 sandbox 权限，第三方内容一旦被入侵就能操作主页面。最小权限原则同样适用于嵌入。",
    "q": [
      {
        "q": "iframe 的 title 为什么重要？",
        "a": "读屏软件用它说明框架内容，缺失时用户无法判断该区域是什么。"
      },
      {
        "q": "sandbox 属性的作用是什么？",
        "a": "默认禁用脚本、表单、弹窗等能力，按需逐项放开，降低第三方内容带来的风险。"
      }
    ]
  },
  {
    "id": 27,
    "t": "设计系统与代码架构",
    "p": [
      "设计令牌把颜色、间距、字号、圆角抽成 CSS 变量，主题切换只需改一层",
      "组件样式采用 BEM 命名：block__element--modifier，避免选择器互相污染",
      "分层组织样式：重置层、基础层、组件层、工具层，用 @layer 明确覆盖顺序",
      "页面只组合组件，不直接写零散样式，保证同一组件在各页面表现一致",
      "文档化组件状态：默认、悬停、焦点、禁用、加载、空状态，缺一不可"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>设计令牌与 BEM</title>\n  <style>\n    :root { --color-brand: #2563eb; --space-3: 0.75rem; --space-4: 1rem; --radius-md: 8px; }\n    .card { border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: var(--space-4); }\n    .card__title { margin: 0 0 var(--space-3); font-size: 1.125rem; }\n    .card__meta { color: #64748b; font-size: 0.875rem; }\n    .card--featured { border-color: var(--color-brand); box-shadow: 0 8px 24px rgba(37, 99, 235, .12); }\n    .btn { display: inline-block; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); }\n    .btn--primary { background: var(--color-brand); color: #fff; }\n  </style>\n</head>\n<body>\n  <article class=\"card card--featured\">\n    <h2 class=\"card__title\">统一的设计令牌</h2>\n    <p class=\"card__meta\">间距、颜色与圆角全部来自变量。</p>\n    <a class=\"btn btn--primary\" href=\"/start/\">开始阅读</a>\n  </article>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "每个页面各写一套按钮样式，改主色时要改几十个文件；或者选择器层层嵌套，组件一挪位置就失效。令牌加 BEM 才能让样式可预测、可复用。",
    "q": [
      {
        "q": "BEM 三个部分分别代表什么？",
        "a": "block 独立组件，element 组件内部元素，modifier 组件或元素的状态变体。"
      },
      {
        "q": "设计令牌有什么好处？",
        "a": "把设计决策集中为变量，主题切换与全局调整只需修改一处，减少不一致。"
      }
    ]
  },
  {
    "id": 28,
    "t": "内容数据组织与结构化标记",
    "p": [
      "data-* 属性把状态与配置写在 DOM 上，CSS 可据此设置样式，避免额外类名",
      "表格与定义列表适合展示结构化数据，列名、单位与顺序都要写清楚",
      "JSON-LD 用 script type=\"application/ld+json\" 向搜索引擎描述实体",
      "Open Graph 的 meta 标签控制分享卡片标题、描述与图片",
      "数据与展示分离：页面只负责呈现，真实数据由构建流程或接口注入"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>结构化数据</title>\n  <meta property=\"og:title\" content=\"CSS Grid 实战\">\n  <meta property=\"og:description\" content=\"从零掌握二维布局\">\n  <style>\n    .course[data-status=\"open\"] { border-left: 4px solid #16a34a; }\n    .course[data-status=\"closed\"] { border-left: 4px solid #94a3b8; opacity: .7; }\n    .course { padding: 0.75rem 1rem; border: 1px solid #e2e8f0; margin-bottom: 0.5rem; }\n  </style>\n  <script type=\"application/ld+json\">\n  {\"@context\":\"https://schema.org\",\"@type\":\"Course\",\"name\":\"CSS Grid 实战\",\n   \"description\":\"从零掌握二维布局\",\"provider\":{\"@type\":\"Organization\",\"name\":\"Atlas 学堂\"}}\n  </script>\n</head>\n<body>\n  <section class=\"course\" data-status=\"open\" data-lessons=\"12\">\n    <h2>CSS Grid 实战</h2>\n    <p>12 节课，状态：开放报名</p>\n  </section>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "把业务数据直接硬编码进样式类名，例如 .status-3，含义不可读；或者 JSON-LD 与页面可见内容不一致，搜索引擎会判定为误导。",
    "q": [
      {
        "q": "data-* 属性适合存什么？",
        "a": "适合存与元素相关的小型状态或配置，如 data-status、data-count，便于 CSS 与脚本读取。"
      },
      {
        "q": "JSON-LD 对页面有什么作用？",
        "a": "用结构化数据描述页面实体，帮助搜索引擎生成富摘要，提高搜索结果的可读性。"
      }
    ]
  },
  {
    "id": 29,
    "t": "网络与 HTTP：缓存、预加载与 CDN",
    "p": [
      "浏览器请求经历 DNS 解析、TCP 与 TLS 握手、发送请求、接收响应与渲染",
      "静态资源用 Cache-Control 设置强缓存，HTML 用 no-cache 保证及时更新",
      "带内容哈希的文件可设置 max-age 一年并标记 immutable，实现长期缓存",
      "preconnect 提前建连，dns-prefetch 提前解析域名，preload 提前抓取关键资源",
      "CDN 就近分发静态资源，配合 gzip 或 brotli 压缩显著减小传输体积"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>网络优化标记</title>\n  <link rel=\"dns-prefetch\" href=\"//cdn.example.com\">\n  <link rel=\"preconnect\" href=\"https://cdn.example.com\" crossorigin>\n  <link rel=\"preload\" href=\"https://cdn.example.com/fonts/inter.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n  <link rel=\"prefetch\" href=\"/next-page.html\">\n  <link rel=\"stylesheet\" href=\"https://cdn.example.com/css/app.9f3c1a.css\">\n  <style>\n    body { font-family: \"Inter\", system-ui, sans-serif; margin: 0; }\n    /* HTML 响应头建议：Cache-Control: no-cache\n       哈希资源建议：Cache-Control: public, max-age=31536000, immutable */\n  </style>\n</head>\n<body>\n  <h1>关键资源优先加载</h1>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "给 HTML 设置长达一年的强缓存，用户永远看不到新版本；或者 preload 了实际用不到的字体，反而与关键资源抢带宽。缓存策略要按资源类型区分。",
    "q": [
      {
        "q": "为什么 HTML 通常不设长期强缓存？",
        "a": "HTML 是资源入口，缓存过久会导致用户拿不到新的资源引用，无法更新页面。"
      },
      {
        "q": "preload 与 prefetch 的优先级差异？",
        "a": "preload 针对当前页面马上要用的资源，优先级高；prefetch 针对未来可能访问的资源，空闲时加载。"
      }
    ]
  },
  {
    "id": 30,
    "t": "前端安全编程",
    "p": [
      "用 Content-Security-Policy 限制脚本与资源来源，降低 XSS 注入风险",
      "外链加 rel=\"noopener noreferrer\"，防止新页面通过 window.opener 操纵原页面",
      "第三方脚本与样式使用 integrity 与 crossorigin 做子资源完整性校验",
      "表单敏感字段设置 autocomplete，提交地址必须使用 HTTPS",
      "不要用 innerHTML 拼接用户输入，服务端与客户端都要做输出转义"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta http-equiv=\"Content-Security-Policy\"\n        content=\"default-src 'self'; img-src 'self' https:; style-src 'self' 'unsafe-inline'; script-src 'self'\">\n  <meta name=\"referrer\" content=\"strict-origin-when-cross-origin\">\n  <title>安全页面</title>\n  <link rel=\"stylesheet\"\n        href=\"https://cdn.example.com/lib/normalize.css\"\n        integrity=\"sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC\"\n        crossorigin=\"anonymous\">\n</head>\n<body>\n  <form action=\"https://api.example.com/subscribe\" method=\"post\" autocomplete=\"on\">\n    <label for=\"card\">卡号</label>\n    <input id=\"card\" name=\"card\" type=\"text\" inputmode=\"numeric\" autocomplete=\"cc-number\" required>\n    <button type=\"submit\">提交</button>\n  </form>\n  <a href=\"https://example.com\" target=\"_blank\" rel=\"noopener noreferrer\">安全外链</a>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "为了省事在 CSP 中写 script-src 'unsafe-inline'，XSS 防护几乎失效；或者 target=\"_blank\" 不带 noopener，新页面可篡改原页面地址。",
    "q": [
      {
        "q": "CSP 能防御哪类攻击？",
        "a": "主要缓解 XSS 与数据注入，通过白名单限制脚本、样式、图片等资源来源。"
      },
      {
        "q": "integrity 属性校验什么？",
        "a": "用哈希校验下载的第三方资源内容是否被篡改，不匹配则拒绝执行或应用。"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战基础：个人作品集首页",
    "p": [
      "先画信息结构：页头导航、首屏介绍、项目列表、技能标签、页脚联系",
      "用设计令牌统一颜色与间距，移动优先编写单栏布局，再增强为两栏",
      "项目卡片用 Grid 的 auto-fit 实现自适应列数，图片统一比例避免跳动",
      "交互只保留必要动效：链接悬停、按钮过渡与进入视口的淡入效果出现",
      "上线前检查语义结构、alt 文本、对比度、键盘可访问与移动端表现"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>林一 · 前端作品集</title>\n  <style>\n    :root { --ink: #0f172a; --muted: #64748b; --brand: #2563eb; --bg: #f8fafc; } * { box-sizing: border-box; }\n    body { margin: 0; font-family: system-ui, sans-serif; color: var(--ink); background: var(--bg); }\n    .wrap { width: min(72rem, 100% - 2rem); margin-inline: auto; } header { padding: 1.25rem 0; border-bottom: 1px solid #e2e8f0; }\n    nav { display: flex; gap: 1.25rem; } nav a { color: var(--muted); text-decoration: none; }\n    .hero { padding: 4rem 0 3rem; } .hero h1 { font-size: clamp(2rem, 6vw, 3.5rem); margin: 0 0 1rem; }\n    .projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; padding-bottom: 4rem; }\n    .project { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; }\n    footer { border-top: 1px solid #e2e8f0; padding: 2rem 0; color: var(--muted); }\n  </style>\n</head>\n<body>\n  <header><div class=\"wrap\"><nav><a href=\"#work\">作品</a><a href=\"#contact\">联系</a></nav></div></header>\n  <main class=\"wrap\"><section class=\"hero\"><h1>用 HTML 与 CSS 构建清晰的界面</h1><p>我是林一，专注语义化与可访问的前端开发。</p></section>\n    <section id=\"work\" class=\"projects\"><article class=\"project\"><h2>数据看板</h2><p>Grid 布局与主题变量。</p></article><article class=\"project\"><h2>文档站点</h2><p>排版与响应式导航。</p></article></section>\n  </main>\n  <footer id=\"contact\"><div class=\"wrap\">联系：hello@example.com</div></footer>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "首屏塞满动效与自动播放视频，加载慢且分散注意力；或者项目卡片写死 3 列，窄屏严重溢出。先保证内容与可访问性，再谈视觉表现。",
    "q": [
      {
        "q": "作品集首屏最重要的信息是什么？",
        "a": "是谁、做什么、如何联系，以及一到两个最能代表能力的作品入口。"
      },
      {
        "q": "卡片网格如何做到自适应列数？",
        "a": "使用 repeat(auto-fit, minmax(240px, 1fr))，容器变窄时自动减少列数。"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战进阶：深色模式与响应式落地页",
    "p": [
      "用 prefers-color-scheme 媒体查询或手动切换 data-theme，实现双主题",
      "颜色全部走 CSS 变量，深色主题下只覆盖变量值，不改组件结构",
      "深色背景上避免纯白文字，用略降亮度的灰色降低眩光，保持对比度达标",
      "落地页采用首屏、特性、案例、行动号召的叙事结构，滚动节奏清晰",
      "用 clamp 与 Grid 构建流式布局，减少断点，兼顾超宽屏与手机"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Atlas · 深色落地页</title>\n  <style>\n    :root { --bg: #f8fafc; --surface: #fff; --text: #0f172a; --muted: #475569; --brand: #2563eb; --border: #e2e8f0; }\n    @media (prefers-color-scheme: dark) { :root { --bg: #0b1220; --surface: #111a2e; --text: #e5e7eb; --muted: #94a3b8; --brand: #60a5fa; --border: #1f2a44; } }\n    * { box-sizing: border-box; } body { margin: 0; background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; }\n    .hero { min-height: 88vh; display: grid; place-items: center; text-align: center; padding: 2rem; }\n    .hero h1 { font-size: clamp(2rem, 7vw, 4.5rem); line-height: 1.1; margin: 0 0 1rem; }\n    .hero p { color: var(--muted); max-width: 42ch; margin: 0 auto 2rem; }\n    .cta { background: var(--brand); color: #fff; padding: 0.9rem 1.75rem; border-radius: 999px; text-decoration: none; font-weight: 600; }\n    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; padding: 3rem 1.5rem; }\n    .feature { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 1.5rem; }\n  </style>\n</head>\n<body>\n  <main><section class=\"hero\"><div><h1>为暗光环境设计的界面</h1><p>同一套结构，两套色彩令牌，自动跟随系统主题。</p><a class=\"cta\" href=\"#features\">查看特性</a></div></section>\n    <section id=\"features\" class=\"features\">\n      <article class=\"feature\"><h2>变量驱动</h2><p>主题只覆盖颜色令牌。</p></article><article class=\"feature\"><h2>对比达标</h2><p>正文对比度不低于 4.5:1。</p></article><article class=\"feature\"><h2>流式排版</h2><p>clamp 适配所有屏幕。</p></article>\n    </section>\n  </main>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "深色模式直接把背景设为纯黑、文字设为纯白，长时间阅读对比过强；或者只改背景不改边框和阴影，卡片在深色下边界消失。必须整套令牌一起调整。",
    "q": [
      {
        "q": "深色主题为什么不应使用纯黑背景配纯白文字？",
        "a": "极端对比会产生眩光与视觉疲劳，使用深灰背景与略暗文字更舒适，同时保持对比度达标。"
      },
      {
        "q": "手动手动切换主题时，变量应定义在哪里？",
        "a": "定义在 :root，通过 html[data-theme=\"dark\"] 覆盖对应变量即可。"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建、部署与发布",
    "p": [
      "生产构建会压缩 HTML、CSS 与 JavaScript，并为静态资源生成内容哈希文件名",
      "构建产物目录通常是 dist，只把它部署到静态托管，源码与依赖不进入线上",
      "常见托管：GitHub Pages、Netlify、Vercel、对象存储加 CDN，均支持自定义域名与 HTTPS",
      "发布前跑一次构建与预览，确认相对路径、base 配置与 404 页面正常",
      "发布后检查缓存头、Lighthouse 分数与真实设备表现，保留回滚版本"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>生产构建产物</title>\n  <!-- 构建：npm run build（Vite 输出 dist/）\n       预览：npm run preview\n       部署：将 dist/ 推送到静态托管，或 GitHub Pages 的 gh-pages 分支\n       回滚：保留上一次哈希产物，切换别名指向即可 -->\n  <link rel=\"stylesheet\" href=\"/assets/main.7c9e2f.css\">\n  <script type=\"module\" src=\"/assets/app.4b81d0.js\" defer></script>\n</head>\n<body>\n  <main id=\"app\">\n    <h1>构建后可长期缓存</h1>\n    <p>文件名带哈希，内容变化时浏览器会自动请求新文件。</p>\n  </main>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "把源码目录直接上传到静态托管，导致源文件、node_modules 暴露；或者部署到子路径却不设置 base，所有绝对路径资源 404。",
    "q": [
      {
        "q": "为什么只部署 dist 目录？",
        "a": "dist 是压缩、哈希并经过处理的产物，体积更小且不暴露源码与开发依赖。"
      },
      {
        "q": "部署到子路径时要改什么？",
        "a": "设置构建工具的 base 或 publicPath，确保资源引用带上子路径前缀。"
      }
    ]
  },
  {
    "id": 34,
    "t": "HTML 与 CSS 最佳实践",
    "p": [
      "语义优先：用合适的元素表达含义，类名只负责样式，不承担语义职责分工",
      "渐进增强：先保证无 JavaScript 也能阅读与提交表单，再叠加增强体验",
      "样式采用低特异性选择器，避免 !important 链，保持可覆盖性",
      "统一命名与文件组织方式，组件样式就近维护，公共令牌集中管理复用",
      "性能与可访问性是默认要求：图片有尺寸与 alt、焦点可见、对比度达标"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <meta name=\"description\" content=\"HTML 与 CSS 最佳实践清单\">\n  <title>最佳实践清单</title>\n  <style>\n    body { font-family: system-ui, sans-serif; line-height: 1.7; max-width: 65ch; margin: 3rem auto; padding: 0 1rem; }\n    .checklist { list-style: none; padding: 0; }\n    .checklist li { padding: 0.4rem 0 0.4rem 1.6rem; position: relative; }\n    .checklist li::before { content: \"✓\"; position: absolute; left: 0; color: #16a34a; }\n    a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }\n  </style>\n</head>\n<body>\n  <main>\n    <h1>发布前自检清单</h1>\n    <ul class=\"checklist\">\n      <li>每个页面只有一个 h1，标题层级连续</li><li>图片有 alt 与宽高，首屏图不懒加载</li>\n      <li>表单控件都有 label，错误提示可被读出</li><li>键盘可完成全部操作，焦点清晰可见</li>\n      <li>没有用 !important 掩盖优先级问题</li>\n    </ul>\n  </main>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "为了快速上线堆叠 !important 与行内样式，后续每次改版都要加更高优先级；或者把交互完全依赖 JavaScript，脚本失败时页面无法阅读。",
    "q": [
      {
        "q": "渐进增强的核心思想是什么？",
        "a": "以可用的基础体验为起点，再为支持新能力的浏览器叠加增强，而不是让核心功能依赖最新特性。"
      },
      {
        "q": "为什么强调低特异性选择器？",
        "a": "低特异性更容易被合理覆盖，减少 !important 与深层嵌套，样式更可维护。"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "已掌握文档结构、语义标签、表单、盒模型、层叠、Flex、Grid 与响应式",
      "继续深入 CSS 容器查询、子网格、动画性能与设计令牌体系等主题与工具",
      "补齐浏览器渲染原理：解析、样式计算、布局、绘制与合成等阶段知识",
      "学习可访问性标准 WCAG 与自动化测试，把无障碍纳入日常流程",
      "用真实项目巩固：个人站点、组件库、营销页，并持续做性能审计与优化"
    ],
    "c": "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>学习路线</title>\n  <style>\n    body { font-family: system-ui, sans-serif; background: #f8fafc; margin: 0; padding: 2rem; }\n    .roadmap { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); max-width: 72rem; margin: 0 auto; }\n    .step { background: #fff; border: 1px solid #e2e8f0; border-top: 4px solid #2563eb; border-radius: 12px; padding: 1.25rem; }\n    .step h2 { margin: 0 0 0.5rem; font-size: 1.1rem; }\n    .step p { margin: 0; color: #475569; font-size: 0.925rem; }\n  </style>\n</head>\n<body>\n  <main>\n    <h1>HTML 与 CSS 学习路线</h1>\n    <section class=\"roadmap\">\n      <article class=\"step\"><h2>1. 结构与语义</h2><p>文档骨架、语义标签、表单与表格。</p></article>\n      <article class=\"step\"><h2>2. 布局与样式</h2><p>盒模型、层叠、Flex、Grid、响应式。</p></article>\n      <article class=\"step\"><h2>3. 工程与质量</h2><p>构建工具、格式化、测试、可访问性。</p></article>\n      <article class=\"step\"><h2>4. 实战与发布</h2><p>作品集、落地页、性能审计、部署上线。</p></article>\n    </section>\n  </main>\n</body>\n</html>",
    "et": "❌ 常见错误",
    "ec": "只收藏教程不动手，遇到真实页面仍不会拆分结构；或者过早追逐新特性，却忽略语义、对比度、键盘操作这些基础。项目驱动才是最快路径。",
    "q": [
      {
        "q": "接下来最值得投入的学习方向？",
        "a": "浏览器渲染原理与可访问性，这两项决定了你能否写出既快又人人可用的页面。"
      },
      {
        "q": "如何检验自己已经掌握布局？",
        "a": "不看教程，仅用 Grid 或 Flex 复刻一个真实网站的首屏，并在手机与桌面都不溢出。"
      }
    ]
  }
];
