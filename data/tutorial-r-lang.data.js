window.TUTORIAL_DATA_r_lang = [
  {
    "id": 1,
    "t": "R 4.x 简介与历史",
    "p": [
      "R 由 Ross Ihaka 与 Robert Gentleman 于 1993 年在新西兰奥克兰大学开发，1995 年以 GPL 发布",
      "R 是 S 语言的自由实现，2000 年发布 1.0 版本，现由 R Core Team 维护，最新为 4.x 系列",
      "R 专为统计计算与数据可视化设计，内置向量化运算、缺失值处理与丰富的绘图函数",
      "CRAN 收录两万多个扩展包，tidyverse、data.table、ggplot2 构成数据分析的主力生态",
      "常见用途：统计分析、机器学习、生物信息、金融建模、报表与 R Markdown 可复现报告"
    ],
    "c": "#!/usr/bin/env Rscript\ncat(\"Hello, R!\\n\")\n\ncat(\"版本:\", R.version.string, \"\\n\")\ncat(\"平台:\", R.version$platform, \"\\n\")\ncat(\"主版本:\", as.character(getRversion()), \"\\n\")\n\nname <- \"R\"\nyear <- 1993\ncat(\"语言:\", name, \"，诞生于\", year, \"年\\n\")\ncat(\"下一年:\", year + 1, \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "初学者常把 R 与 RStudio 混淆：R 是语言与解释器，RStudio 只是 IDE。另一个常见错误是认为 R 只能做统计，实际上它也是完整的编程语言，支持函数式编程、面向对象与包开发。",
    "q": [
      {
        "q": "R 的两位最初作者是谁？",
        "a": "Ross Ihaka 与 Robert Gentleman。"
      },
      {
        "q": "R 与 S 语言是什么关系？",
        "a": "R 是 S 语言的自由实现，语法与语义大量继承自 S。"
      }
    ]
  },
  {
    "id": 2,
    "t": "安装 R 与工具链",
    "p": [
      "从 CRAN 下载 R，或使用系统包管理器安装；RStudio 是最流行的 IDE，Positron 与 VS Code 也可用",
      "Rscript 用于非交互执行脚本，R 命令进入交互控制台，R --version 查看版本信息",
      "install.packages 从 CRAN 安装包，pak 安装更快，devtools 用于开发与检查自己的包",
      "renv 为每个项目创建隔离的包环境，renv.lock 记录精确版本，便于复现",
      ".libPaths() 查看库路径，R_LIBS_USER 环境变量可自定义用户库位置"
    ],
    "c": "#!/usr/bin/env Rscript\ncat(\"R 可执行文件:\", R.home(\"bin\"), \"\\n\")\ncat(\"版本:\", R.version.string, \"\\n\")\ncat(\"库路径:\\n\")\nprint(.libPaths())\n\n# 命令行速查\n# R --version                    查看版本\n# Rscript app.R                  非交互运行脚本\n# R                              进入交互控制台\n# install.packages(\"pak\")        安装包管理工具\n# pak::pkg_install(\"tidyverse\")  安装依赖\n\npkg <- \"stats\"\ncat(\"stats 是否可用:\", requireNamespace(pkg, quietly = TRUE), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "直接以管理员权限把包装进系统库，升级 R 后旧包容易失效。应在项目中使用 renv 隔离依赖，或把包安装到用户库；混用多个库路径而不检查 .libPaths() 也会加载到错误版本。",
    "q": [
      {
        "q": "如何非交互运行 R 脚本？",
        "a": "Rscript app.R。"
      },
      {
        "q": "renv 的作用是什么？",
        "a": "为项目创建隔离的包环境，并用 renv.lock 锁定精确版本。"
      }
    ]
  },
  {
    "id": 3,
    "t": "变量、赋值与常量",
    "p": [
      "R 用 <- 赋值，也可用 = 或 assign()；推荐 <-，在函数调用中 = 专用于参数匹配",
      "变量名区分大小写，可包含字母、数字、点和下划线，但不能以数字或下划线开头",
      "R 没有真正的常量，约定用大写命名表示常量，并可用 lockBinding 锁定绑定",
      "ls() 列出变量，rm() 删除变量，exists() 判断存在，gc() 触发垃圾回收"
    ],
    "c": "#!/usr/bin/env Rscript\nx <- 42\ny <- 3.14          # 函数调用中 = 用于传参\nname <- \"R\"\nassign(\"z\", 100)\n\ncat(\"x =\", x, \"y =\", y, \"name =\", name, \"z =\", z, \"\\n\")\ncat(\"变量列表:\", ls(), \"\\n\")\ncat(\"是否存在 x:\", exists(\"x\"), \"\\n\")\nrm(x)\ncat(\"删除后是否存在:\", exists(\"x\"), \"\\n\")\n\nMAX_SIZE <- 100   # 常量用大写命名约定\nlockBinding(\"MAX_SIZE\", environment())\ncat(\"上限:\", MAX_SIZE, \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "R 没有真正的常量，给大写变量重新赋值不会报错，只会覆盖。用 = 在顶层赋值虽可运行，但在函数调用中 = 是参数匹配，混用会让人误解；变量名以数字或下划线开头会直接报语法错误。",
    "q": [
      {
        "q": "R 中推荐使用哪个赋值符号？",
        "a": "<-，函数调用中的 = 专用于参数匹配。"
      },
      {
        "q": "如何查看当前环境中的变量？",
        "a": "使用 ls()，删除用 rm()，判断存在用 exists()。"
      }
    ]
  },
  {
    "id": 4,
    "t": "数据类型与缺失值",
    "p": [
      "基本类型：double、integer（加 L 后缀）、character、logical、complex、raw",
      "NA 表示缺失值且有类型，NaN 表示非数字，NULL 表示空对象且长度为 0",
      "用 typeof 查看存储类型，class 查看类，is.* 判断类型，as.* 强制转换",
      "向量是同类型元素的有序集合，列表可容纳不同类型，数据框是等长向量的列表",
      "因子（factor）用于分类变量，内部以整数编码并附带水平 levels"
    ],
    "c": "#!/usr/bin/env Rscript\nnum <- 3.14\nint <- 42L\nchr <- \"text\"\nlgl <- TRUE\ncplx <- 2 + 3i\nraw_v <- charToRaw(\"R\")\n\ncat(\"typeof:\", typeof(num), typeof(int), typeof(chr), \"\\n\")\ncat(\"class:\", class(num), class(int), class(lgl), \"\\n\")\ncat(\"整数后缀 L:\", is.integer(int), is.double(num), \"\\n\")\ncat(\"复数:\", Re(cplx), Im(cplx), \"\\n\")\ncat(\"原始字节:\", raw_v, \"\\n\")\ncat(\"NA:\", is.na(NA), \"NaN:\", is.nan(NaN), \"\\n\")\ncat(\"NULL 长度:\", length(NULL), \"\\n\")\ncat(\"转换:\", as.numeric(\"12.5\"), as.character(100), \"\\n\")\nf <- factor(c(\"低\", \"高\", \"低\"))\ncat(\"因子水平:\", levels(f), as.integer(f), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "NA 是有类型的缺失值，NULL 是空对象，二者不能混用；对含 NA 的向量求均值忘记 na.rm = TRUE 会得到 NA。用 == 判断 NA 永远返回 NA，应使用 is.na()。",
    "q": [
      {
        "q": "NA 与 NULL 有什么区别？",
        "a": "NA 是缺失值占位且有类型，NULL 是空对象，长度为 0。"
      },
      {
        "q": "如何判断一个值是否为缺失值？",
        "a": "使用 is.na(x)，不要用 x == NA。"
      }
    ]
  },
  {
    "id": 5,
    "t": "运算符与向量化",
    "p": [
      "算术运算符 + - * / ^，%% 取余，%/% 整除，%*% 矩阵乘法",
      "比较运算符产生逻辑向量，== != < > <= >=；用 identical 判断完全相等",
      "逻辑运算 & | ! 向量化，&& || 只取首元素并短路，适合 if 条件",
      "%in% 判断成员，%o% 外积，: 与 seq 生成序列，运算符优先级可用括号明确"
    ],
    "c": "#!/usr/bin/env Rscript\na <- 10\nb <- 3\ncat(a + b, a - b, a * b, a / b, \"\\n\")\ncat(\"整除:\", a %/% b, \"取余:\", a %% b, \"\\n\")\ncat(\"幂:\", a^2, \"\\n\")\ncat(\"比较:\", a > b, a == b, a != b, \"\\n\")\ncat(\"逻辑:\", (a > 5) & (b > 5), (a > 5) || (b > 5), \"\\n\")\ncat(\"向量化:\", (1:5) * 2, \"\\n\")\ncat(\"成员:\", 3 %in% 1:5, \"\\n\")\nm1 <- matrix(1:4, 2)\nm2 <- matrix(5:8, 2)\nprint(m1 %*% m2)\ncat(\"三元:\", ifelse(a > b, \"a 大\", \"b 大\"), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "R 的比较与逻辑运算默认向量化，if 条件却只接受长度为 1 的逻辑值，传入向量会报错或只取首元素。&& 与 || 只比较首元素，& 与 | 才逐元素运算，混用会导致意外结果。",
    "q": [
      {
        "q": "R 中如何判断元素是否在向量中？",
        "a": "使用 x %in% y，返回逻辑向量。"
      },
      {
        "q": "& 与 && 有什么区别？",
        "a": "& 逐元素运算，&& 只比较首个元素并支持短路。"
      }
    ]
  },
  {
    "id": 6,
    "t": "字符串处理",
    "p": [
      "paste 与 paste0 拼接字符串，sprintf 做格式化，nchar 统计字符数",
      "substr 截取，strsplit 切分，toupper 与 tolower 转换大小写，trimws 去除空白",
      "字符串默认按字节处理，需注意编码；用 enc2utf8 统一为 UTF-8 避免乱码",
      "stringr 包提供 str_detect、str_replace、str_extract 等一致命名的函数",
      "正则函数 grepl、sub、gsub 既可处理单个字符串，也可直接作用于字符向量"
    ],
    "c": "#!/usr/bin/env Rscript\nname <- \"R\"\nver <- \"4.4\"\ncat(paste(\"语言:\", name, \"版本:\", ver), \"\\n\")\ncat(paste0(name, \"-\", ver), \"\\n\")\ncat(sprintf(\"%s 版本 %.1f\\n\", name, 4.4))\ncat(\"长度:\", nchar(name), \"\\n\")\ncat(\"截取:\", substr(\"tidyverse\", 1, 4), \"\\n\")\ncat(\"大写:\", toupper(name), \"小写:\", tolower(\"ABC\"), \"\\n\")\ncat(\"切分:\", strsplit(\"a,b,c\", \",\")[[1]], \"\\n\")\ncat(\"替换:\", sub(\"R\", \"R 语言\", \"R 教程\"), \"\\n\")\ncat(\"拼接:\", paste(c(\"a\", \"b\"), collapse = \"-\"), \"\\n\")\ncat(\"去空格:\", trimws(\"  hi  \"), \"\\n\")\nvec <- c(\"apple\", \"banana\")\ncat(\"匹配:\", grepl(\"^a\", vec), \"\\n\")\ncat(\"统一编码:\", enc2utf8(\"中文\"), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "paste 默认用空格分隔，paste0 不分隔，混用会得到多余空格。substr 的起止位置按字符计，处理多字节字符需注意编码；把字符串列误当成因子再修改，会触发无效因子水平警告。",
    "q": [
      {
        "q": "如何拼接字符串且不加空格？",
        "a": "使用 paste0()，或 paste(..., sep = \"\")。"
      },
      {
        "q": "sub 与 gsub 有什么区别？",
        "a": "sub 只替换第一个匹配，gsub 替换所有匹配。"
      }
    ]
  },
  {
    "id": 7,
    "t": "向量、列表与数据框",
    "p": [
      "用 c() 创建向量，seq() 生成序列，rep() 重复元素，向量索引从 1 开始",
      "负索引排除元素，逻辑索引按条件筛选，names() 可为元素命名",
      "列表用 list() 创建，支持异质元素，用 $ 或 [[ ]] 提取，[ ] 返回子列表",
      "矩阵用 matrix() 创建，数组用 array()，数据框用 data.frame() 组合等长向量"
    ],
    "c": "#!/usr/bin/env Rscript\nv <- c(3, 1, 4, 1, 5)\ncat(\"向量:\", v, \"\\n\")\ncat(\"长度:\", length(v), \"排序:\", sort(v), \"\\n\")\ncat(\"去重:\", unique(v), \"\\n\")\ncat(\"索引:\", v[2], v[c(1, 3)], v[-1], \"\\n\")\ncat(\"逻辑索引:\", v[v > 2], \"\\n\")\ncat(\"序列:\", seq(1, 10, by = 2), \"\\n\")\ncat(\"重复:\", rep(c(\"a\", \"b\"), times = 2), \"\\n\")\nlst <- list(name = \"R\", years = c(1993, 2000), nested = list(ok = TRUE))\ncat(\"列表元素:\", lst$name, lst[[\"years\"]], \"\\n\")\ncat(\"列表长度:\", length(lst), \"\\n\")\nm <- matrix(1:6, nrow = 2)\ncat(\"矩阵维度:\", dim(m), \"\\n\")\ndf <- data.frame(x = 1:3, y = c(\"a\", \"b\", \"c\"))\nprint(df)\ncat(\"数据框列数:\", ncol(df), \"行数:\", nrow(df), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "R 的索引从 1 开始，用 0 下标不会报错但会返回空结果，容易静默出错。负索引表示排除而非从末尾取值；对列表用 [ ] 得到子列表，用 [[ ]] 才取出元素本身。",
    "q": [
      {
        "q": "R 的向量索引从几开始？",
        "a": "从 1 开始，0 下标会返回空结果。"
      },
      {
        "q": "列表的 [ ] 与 [[ ]] 有什么区别？",
        "a": "[ ] 返回子列表，[[ ]] 取出元素本身。"
      }
    ]
  },
  {
    "id": 8,
    "t": "条件分支",
    "p": [
      "if/else if/else 的条件必须是长度为 1 的逻辑值，不能直接传入向量",
      "ifelse 是向量化三元运算，按元素返回结果，适合整列条件赋值",
      "switch 按字符或数值选择分支，适合多路枚举；cut 可把连续变量分箱",
      "stopifnot 用于断言前置条件，条件不满足时立即报错，适合参数校验"
    ],
    "c": "#!/usr/bin/env Rscript\nscore <- 82\nif (score >= 90) {\n  cat(\"优秀\\n\")\n} else if (score >= 60) {\n  cat(\"及格\\n\")\n} else {\n  cat(\"不及格\\n\")\n}\n\ncat(ifelse(score >= 60, \"通过\", \"未通过\"), \"\\n\")\ncat(if (score > 80) \"高于八十\" else \"不高于八十\", \"\\n\")\n\nlevel <- switch(\n  as.character(cut(score, c(0, 60, 90, 100), labels = c(\"C\", \"B\", \"A\"))),\n  A = \"优秀\", B = \"及格\", C = \"不及格\"\n)\ncat(\"等级:\", level, \"\\n\")\n\nstopifnot(score >= 0, score <= 100)\ncat(\"分数合法\\n\")",
    "et": "❌ 常见错误",
    "ec": "ifelse 会先计算两个分支再选择，分支包含错误或副作用时仍会执行。if 的条件必须是长度为 1 的逻辑值，传入 NA 会报 missing value where TRUE/FALSE needed。",
    "q": [
      {
        "q": "ifelse 与 if 有什么区别？",
        "a": "ifelse 向量化，按元素返回；if 只接受长度为 1 的逻辑值。"
      },
      {
        "q": "stopifnot 的作用是什么？",
        "a": "断言条件为真，不满足时立即抛出错误，常用于参数校验。"
      }
    ]
  },
  {
    "id": 9,
    "t": "循环与 apply 家族",
    "p": [
      "for (x in seq) 遍历序列，while 与 repeat 需配合 break 退出",
      "next 跳过本次迭代，break 终止循环；循环变量在循环外仍然可见",
      "优先使用向量化与 apply 家族，循环在 R 中通常较慢且代码更冗长",
      "seq_along 比 1:length(x) 更安全，后者在长度为 0 时会产生意外序列",
      "lapply 返回列表，sapply 尝试简化，vapply 指定返回类型更可靠"
    ],
    "c": "#!/usr/bin/env Rscript\nfor (i in 1:5) {\n  if (i == 2) next\n  if (i == 5) break\n  cat(\"for:\", i, \"\\n\")\n}\n\nn <- 0\nwhile (n < 3) {\n  cat(\"while:\", n, \"\\n\")\n  n <- n + 1\n}\n\nrepeat {\n  n <- n - 1\n  if (n <= 0) break\n}\ncat(\"repeat 结束, n =\", n, \"\\n\")\n\nfor (i in seq_along(letters[1:3])) {\n  cat(\"seq_along:\", i, letters[i], \"\\n\")\n}\ncat(\"lapply:\", unlist(lapply(1:3, function(x) x^2)), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "用 1:length(x) 遍历时，若 x 长度为 0 会得到 1:0 即 c(1, 0)，导致越界访问，应使用 seq_along(x)。在循环中不断追加向量会反复复制，性能极差，应先预分配。",
    "q": [
      {
        "q": "为什么推荐 seq_along(x)？",
        "a": "长度为 0 时返回空整数向量，不会产生 1:0 这种意外序列。"
      },
      {
        "q": "lapply、sapply、vapply 有什么区别？",
        "a": "lapply 返回列表，sapply 尝试简化，vapply 需指定返回类型更安全。"
      }
    ]
  },
  {
    "id": 10,
    "t": "函数基础",
    "p": [
      "函数用 function(参数) 定义，最后一个表达式的值即返回值，也可显式 return",
      "参数可有默认值，调用时按位置或名称匹配，未匹配的参数进入 ...",
      "R 函数默认返回最后一个表达式的值，invisible 可隐藏返回值",
      "函数是普通对象，可赋值、传参、存入列表，支持高阶函数与匿名函数",
      "参数名可以缩写匹配，但依赖缩写会显著降低可读性，建议始终写完整名称"
    ],
    "c": "#!/usr/bin/env Rscript\ngreet <- function(name, greeting = \"Hello\") {\n  paste0(greeting, \", \", name, \"!\")\n}\n\nadd <- function(a, b = 0) {\n  a + b\n}\n\naverage <- function(...) {\n  nums <- c(...)\n  if (length(nums) == 0) return(NA_real_)\n  mean(nums)\n}\n\ncat(greet(\"R\"), \"\\n\")\ncat(greet(\"R\", greeting = \"你好\"), \"\\n\")\ncat(add(3, 4), add(5), \"\\n\")\ncat(\"平均:\", average(80, 90, 100), \"\\n\")\ninvisible(add(1, 2))",
    "et": "❌ 常见错误",
    "ec": "函数参数按名称匹配，拼错参数名会被当成未使用参数进入 ...，从而静默失效。忘记 return 并不是错误，但最后一个表达式若不是期望值，会返回意外结果，应保持函数结尾清晰。",
    "q": [
      {
        "q": "R 函数如何返回多个值？",
        "a": "返回 list，再通过 $ 或 [[ ]] 取出各元素。"
      },
      {
        "q": "invisible 的作用是什么？",
        "a": "返回结果但不自动打印，常用于赋值型函数。"
      }
    ]
  },
  {
    "id": 11,
    "t": "函数进阶与函数式编程",
    "p": [
      "... 允许传入任意数量参数，常用于包装函数与把参数转发给内部函数",
      "do.call 用列表作为参数调用函数，Reduce、Filter、Map 提供函数式组合",
      "match.arg 校验枚举参数，missing 判断参数是否缺省，on.exit 注册退出清理",
      "递归适合树形结构，但要注意栈深度；R 不会自动优化尾递归，深层递归应改为迭代",
      "函数式编程强调无副作用与函数组合，比显式循环更易并行化、测试与推理"
    ],
    "c": "#!/usr/bin/env Rscript\napply_all <- function(x, fun, ...) {\n  lapply(x, fun, ...)\n}\nprint(apply_all(1:3, function(n) n^2))\n\nsum_all <- function(...) {\n  Reduce(`+`, list(...))\n}\ncat(\"Reduce:\", sum_all(1, 2, 3, 4), \"\\n\")\n\nstats <- function(x, na.rm = TRUE) {\n  list(mean = mean(x, na.rm = na.rm), sd = sd(x, na.rm = na.rm))\n}\nprint(do.call(stats, list(x = c(1, 2, 3, NA))))\n\nfactorial_r <- function(n) {\n  if (n <= 1) 1 else n * factorial_r(n - 1)\n}\ncat(\"5! =\", factorial_r(5), \"\\n\")\ncat(\"Map:\", unlist(Map(function(a, b) a + b, 1:3, 4:6)), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "把 ... 继续传给内部函数时，可能把无关参数一起传下去导致报错。do.call 需要参数列表，直接传向量会按位置拆分；递归过深会触发表达式嵌套上限，应考虑迭代实现。",
    "q": [
      {
        "q": "do.call 的作用是什么？",
        "a": "用列表作为参数调用函数，适合参数数量动态变化的场景。"
      },
      {
        "q": "Reduce 适合解决什么问题？",
        "a": "把二元函数依次应用到序列元素上，例如求和、求积、合并。"
      }
    ]
  },
  {
    "id": 12,
    "t": "作用域与闭包",
    "p": [
      "R 采用词法作用域：函数在定义环境查找变量，而不是在调用环境查找",
      "<<- 会向外层环境查找并修改已有变量，常用于闭包计数器，但滥用会破坏可预测性",
      "函数工厂返回闭包，捕获参数形成私有状态，可实现记忆化与配置封装",
      "environment() 查看函数环境，globalenv() 是全局环境，parent.env 逐层向上",
      "闭包让状态私有化，比全局变量更安全，但要注意缓存增长带来的内存占用"
    ],
    "c": "#!/usr/bin/env Rscript\nx <- 10\nf <- function() {\n  y <- 5\n  x + y\n}\ncat(\"词法作用域:\", f(), \"\\n\")\ncounter <- function() {\n  count <- 0\n  function() {\n    count <<- count + 1\n    count\n  }\n}\nc1 <- counter()\ncat(c1(), c1(), c1(), \"\\n\")\n\nmultiplier <- function(factor) {\n  function(x) x * factor\n}\ndouble <- multiplier(2)\ncat(\"闭包乘法:\", double(21), \"\\n\")\n\ncat(\"全局变量:\", exists(\"x\", envir = globalenv()), \"\\n\")\ncat(\"函数环境:\", environmentName(environment(f)), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "用 <- 在函数内赋值会创建局部变量，不能修改全局变量；要修改外层变量需用 <<-，但滥用会破坏可预测性。在函数中依赖全局变量会让结果随环境变化，难以测试。",
    "q": [
      {
        "q": "R 的作用域规则是什么？",
        "a": "词法作用域，函数在定义环境及其父环境中查找变量。"
      },
      {
        "q": "<<- 与 <- 有什么区别？",
        "a": "<- 在当前环境创建变量，<<- 向外层环境查找并修改已有变量。"
      }
    ]
  },
  {
    "id": 13,
    "t": "类与对象：S3 与 R6",
    "p": [
      "S3 是最常用的对象系统：用 structure 设置 class 属性，用泛型函数分派方法",
      "方法命名规则为 泛型.类名，如 print.point，调度器通过 UseMethod 查找",
      "R6 包提供封装、可变对象与继承，语法接近主流面向对象语言，适合状态较多的系统",
      "对象可携带属性 attributes，用 attr 设置，用 str 查看结构",
      "S4 提供更严格的类定义与槽位类型检查，适合复杂类型体系与大型包开发"
    ],
    "c": "#!/usr/bin/env Rscript\nnew_point <- function(x, y) {\n  structure(list(x = x, y = y), class = \"point\")\n}\nprint.point <- function(p, ...) {\n  cat(\"<point>\", p$x, \",\", p$y, \"\\n\")\n}\n\np <- new_point(1, 2)\nprint(p)\ncat(\"类:\", class(p), \"\\n\")\ncat(\"是否 point:\", inherits(p, \"point\"), \"\\n\")\ncat(\"x 坐标:\", p$x, \"\\n\")\n\n# R6 提供可变对象与封装\nlibrary(R6)\nCounter <- R6Class(\"Counter\",\n  public = list(\n    value = 0,\n    add = function(n = 1) { self$value <- self$value + n; invisible(self) }\n  )\n)\ncounter <- Counter$new()\ncounter$add(3)\ncat(\"R6 计数:\", counter$value, \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "S3 对象只是带 class 属性的普通列表，字段缺失不会在创建时报错，只会在方法运行时失败。print 方法命名必须是 print.类名，写成 print_point 不会被分派。",
    "q": [
      {
        "q": "S3 方法如何命名？",
        "a": "泛型名.类名，例如 print.point 对应 print 泛型。"
      },
      {
        "q": "R6 与 S3 的主要区别是什么？",
        "a": "R6 提供引用语义、封装与继承，对象可变；S3 基于普通对象与泛型分派。"
      }
    ]
  },
  {
    "id": 14,
    "t": "继承与模块化组合",
    "p": [
      "S3 通过 class 向量实现继承，第一个元素是具体类，后续是父类",
      "子类方法可调用 NextMethod() 委托给父类实现，形成方法链",
      "R6 用 inherit 参数继承父类，子类可重写方法并用 super$method 调用",
      "R 没有内置 mixin 语法，可用函数列表、环境或 S3 组合模拟能力混入",
      "组合优于继承：把能力拆成小函数或独立对象，可减少继承层级与模块之间的耦合"
    ],
    "c": "#!/usr/bin/env Rscript\nnew_animal <- function(name, ...) {\n  structure(list(name = name, ...), class = c(\"dog\", \"animal\"))\n}\nspeak <- function(x, ...) UseMethod(\"speak\")\nspeak.animal <- function(x, ...) paste(x$name, \"发出声音\")\nspeak.dog <- function(x, ...) paste(NextMethod(), \"并摇尾巴\")\n\nd <- new_animal(\"旺财\", age = 3)\ncat(speak(d), \"\\n\")\ncat(\"类向量:\", class(d), \"\\n\")\ncat(\"继承判断:\", inherits(d, \"animal\"), \"\\n\")\n\nWalker <- list(walk = function(x) paste(x$name, \"在走路\"))\ncat(\"组合能力:\", with(Walker, walk(d)), \"\\n\")\n\n# R6 继承：Dog <- R6Class(\"Dog\", inherit = Animal)",
    "et": "❌ 常见错误",
    "ec": "class 向量顺序决定方法查找顺序，父类放在子类前面会导致子类方法永远不被调用。NextMethod 只能在方法内部调用，直接调用会报错；继承过深会让调试和推理变得困难。",
    "q": [
      {
        "q": "S3 如何调用父类方法？",
        "a": "在方法内部调用 NextMethod()。"
      },
      {
        "q": "S3 的继承如何表示？",
        "a": "用 class 向量，按从具体到宽泛的顺序排列类名。"
      }
    ]
  },
  {
    "id": 15,
    "t": "接口、抽象与多态",
    "p": [
      "UseMethod 实现基于类别的多态分派，调用时自动选择最匹配的方法",
      "default 方法作为兜底，未匹配类时执行，可抛出清晰错误",
      "S4 支持多重分派与签名匹配，适合复杂类型体系；R6 用方法重写实现多态",
      "抽象约定可用 stop 强制子类实现，或在泛型中检查必需字段",
      "多态让调用方只依赖统一接口，新增类型时无需修改原有调用代码，扩展性更好"
    ],
    "c": "#!/usr/bin/env Rscript\nshape_area <- function(shape) UseMethod(\"shape_area\")\nshape_area.circle <- function(shape) pi * shape$r^2\nshape_area.rect <- function(shape) shape$w * shape$h\nshape_area.default <- function(shape) stop(\"不支持的形状: \", class(shape)[1])\n\ncircle <- structure(list(r = 2), class = \"circle\")\nrect <- structure(list(w = 3, h = 4), class = \"rect\")\nfor (s in list(circle, rect)) {\n  cat(class(s)[1], \"面积:\", round(shape_area(s), 2), \"\\n\")\n}\n\ntryCatch(\n  shape_area(list()),\n  error = function(e) cat(\"错误:\", conditionMessage(e), \"\\n\")\n)\n\nrequired_fields <- function(x, fields) {\n  missing <- setdiff(fields, names(x))\n  if (length(missing)) stop(\"缺少字段: \", paste(missing, collapse = \", \"))\n  invisible(TRUE)\n}\nrequired_fields(circle, c(\"r\"))",
    "et": "❌ 常见错误",
    "ec": "UseMethod 只能用于泛型函数的第一层分派，在方法内部再次调用同名泛型可能递归。default 方法若直接 stop，会丢失具体类的信息，应输出 class 与可用的方法名。",
    "q": [
      {
        "q": "UseMethod 的作用是什么？",
        "a": "根据对象类分派到具体方法，实现 S3 多态。"
      },
      {
        "q": "default 方法有什么用？",
        "a": "在没有匹配方法时兜底，可给出清晰的错误或通用处理。"
      }
    ]
  },
  {
    "id": 16,
    "t": "类型系统与泛型函数（R 无泛型参数）",
    "p": [
      "R 是动态类型语言，对象有隐含类与显式类，typeof 反映存储方式",
      "class 返回类属性，is.* 与 as.* 提供类型判断与转换，优先用 inherits 判断继承",
      "S4 提供正式类定义与槽位类型检查，R6 提供引用语义的类，两者都支持方法分派",
      "R 没有静态语言那样的泛型类型参数；R 中的泛型函数指按类分派的方法",
      "S4 与 R6 各有适用场景，简单脚本用 S3 即可，复杂系统再引入正式类型定义"
    ],
    "c": "#!/usr/bin/env Rscript\nx <- 1:5\ncat(\"typeof:\", typeof(x), \"class:\", class(x), \"\\n\")\ncat(\"隐式类:\", class(1L), class(1.5), class(\"a\"), \"\\n\")\ncat(\"is.numeric:\", is.numeric(x), \"\\n\")\ncat(\"as.character:\", as.character(x), \"\\n\")\n\ndf <- data.frame(a = 1:2)\ncat(\"data.frame 类:\", class(df), \"\\n\")\n\nsetClass(\"Person\", slots = list(name = \"character\", age = \"numeric\"))\np <- new(\"Person\", name = \"Alice\", age = 30)\ncat(\"S4 对象:\", p@name, p@age, \"\\n\")\ncat(\"是否 S4:\", isS4(p), \"\\n\")\n\nstopifnot(is.character(p@name))\ncat(\"槽位类型校验通过\\n\")",
    "et": "❌ 常见错误",
    "ec": "typeof 返回存储类型，class 返回类属性，用 typeof 判断业务类型会出错。S4 槽位访问必须用 @，用 $ 会报错；向 S4 对象赋未声明槽位会被拒绝。",
    "q": [
      {
        "q": "typeof 与 class 有什么区别？",
        "a": "typeof 返回存储类型，class 返回对象的类属性。"
      },
      {
        "q": "R 有 Java 那样的泛型吗？",
        "a": "没有泛型类型参数；R 的泛型函数指按对象类分派的函数。"
      }
    ]
  },
  {
    "id": 17,
    "t": "错误处理与条件系统",
    "p": [
      "stop 抛出错误，warning 发出警告，message 输出消息，三者都是条件系统的一部分",
      "tryCatch 捕获并处理 error、warning、message，finally 保证清理逻辑执行",
      "try 返回 try-error 对象，适合简单容错；withCallingHandlers 可在警告后继续执行",
      "自定义条件类可继承 error，配合 conditionMessage 与 conditionCall 提供上下文",
      "不要静默吞掉错误，至少记录日志或重新抛出，避免调用方使用无效结果"
    ],
    "c": "#!/usr/bin/env Rscript\ndivide <- function(a, b) {\n  if (b == 0) stop(\"除数不能为零\", call. = FALSE)\n  a / b\n}\nsafe_divide <- function(a, b) {\n  tryCatch(\n    divide(a, b),\n    error = function(e) {\n      warning(\"捕获错误: \", conditionMessage(e))\n      NA_real_\n    },\n    finally = cat(\"计算结束\\n\")\n  )\n}\ncat(safe_divide(10, 2), \"\\n\")\ncat(safe_divide(1, 0), \"\\n\")\nresult <- try(divide(1, 0), silent = TRUE); cat(\"try 结果类型:\", class(result), \"\\n\")\nwithCallingHandlers(\n  log(-1),\n  warning = function(w) {\n    cat(\"警告:\", conditionMessage(w), \"\\n\")\n    invokeRestart(\"muffleWarning\")\n  }\n)",
    "et": "❌ 常见错误",
    "ec": "tryCatch 捕获错误后若不重新抛出，调用方无法感知失败，可能继续使用无效结果。warning 不是错误，默认不会中断执行，需要 withCallingHandlers 或 options(warn = 2) 才能转为错误。",
    "q": [
      {
        "q": "如何捕获错误并继续执行？",
        "a": "使用 tryCatch(expr, error = function(e) ...) 或 try(expr, silent = TRUE)。"
      },
      {
        "q": "finally 什么时候执行？",
        "a": "无论是否发生错误都会执行，适合关闭连接、恢复选项。"
      }
    ]
  },
  {
    "id": 18,
    "t": "文件与 IO",
    "p": [
      "read.csv 与 read.table 读取表格，readLines 读取文本行，write.csv 写出数据",
      "file() 与 connections 支持分块读写、追加、压缩文件与网络连接",
      "file.exists、dir.exists、dir.create、file.path 构成跨平台路径操作基础",
      "处理大文件应分块读取，或用 data.table::fread 与 readr 提升速度并指定编码",
      "写文件时注意 row.names = FALSE 与 fileEncoding，避免多出索引列或中文乱码"
    ],
    "c": "#!/usr/bin/env Rscript\npath <- file.path(tempdir(), \"demo.csv\")\ndf <- data.frame(name = c(\"Alice\", \"Bob\"), score = c(90, 85))\nwrite.csv(df, path, row.names = FALSE, fileEncoding = \"UTF-8\")\ncat(\"文件存在:\", file.exists(path), \"大小:\", file.size(path), \"\\n\")\n\nback <- read.csv(path, stringsAsFactors = FALSE, fileEncoding = \"UTF-8\")\nprint(back)\ncat(\"行数:\", nrow(back), \"列名:\", names(back), \"\\n\")\n\nlines <- readLines(path, n = 2, encoding = \"UTF-8\")\ncat(\"前两行:\\n\", paste(lines, collapse = \"\\n\"), \"\\n\")\n\ncon <- file(path, open = \"a\", encoding = \"UTF-8\")\nwriteLines(\"Carol,95\", con)\nclose(con)\n\ncat(\"目录:\", dirname(path), \"\\n\")\nunlink(path)\ncat(\"删除后存在:\", file.exists(path), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "read.csv 默认会改写不合法的列名，用原始列名访问可能失败。忘记设置 fileEncoding 读取中文文件会产生乱码；写文件未加 row.names = FALSE 会多出一列行索引。",
    "q": [
      {
        "q": "如何读取大文件的前几行？",
        "a": "readLines(path, n = 100)，按需分批读取。"
      },
      {
        "q": "写 CSV 时如何避免多出行索引列？",
        "a": "设置 row.names = FALSE。"
      }
    ]
  },
  {
    "id": 19,
    "t": "正则表达式与文本提取",
    "p": [
      "grepl 判断是否匹配，grep 返回位置，sub 与 gsub 替换首个或全部匹配",
      "regexpr 与 gregexpr 定位匹配，regmatches 提取结果，支持 perl = TRUE 使用高级语法",
      "元字符需转义：\\d 数字、\\w 单词字符、\\s 空白、^ $ 锚点、.* 任意内容",
      "stringr 提供 str_detect、str_extract、str_replace_all 等统一接口，正则行为更可预测",
      "R 字符串中的反斜杠要写两次，例如正则 \\d 在代码中写成 \"\\\\d\""
    ],
    "c": "#!/usr/bin/env Rscript\nlog <- \"2026-11-15 10:23:45 ERROR 数据库连接失败\"\ncat(\"是否含 ERROR:\", grepl(\"ERROR\", log), \"\\n\")\ncat(\"提取日期:\", sub(\"^(\\\\d{4}-\\\\d{2}-\\\\d{2}).*\", \"\\\\1\", log), \"\\n\")\ncat(\"替换:\", gsub(\"ERROR\", \"错误\", log), \"\\n\")\ncat(\"全部数字:\", regmatches(log, gregexpr(\"\\\\d+\", log))[[1]], \"\\n\")\n\nm <- regexpr(\"(?<=ERROR ).*\", log, perl = TRUE)\ncat(\"错误信息:\", regmatches(log, m), \"\\n\")\n\ntext <- c(\"apple\", \"banana\", \"cherry\")\ncat(\"匹配项:\", text[grepl(\"an\", text)], \"\\n\")\ncat(\"忽略大小写:\", grepl(\"APPLE\", text, ignore.case = TRUE), \"\\n\")\n\nlibrary(stringr)\ncat(\"str_replace_all:\", str_replace_all(log, \"\\\\d\", \"#\"), \"\\n\")\ncat(\"str_detect:\", str_detect(text, \"^b\"), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "正则中的反斜杠在 R 字符串里要写两次，例如 \\d 必须写成 \"\\\\d\"。grepl 返回逻辑向量，grep 返回位置，混用会让后续索引出错；sub 只替换首个匹配，替换全部要用 gsub。",
    "q": [
      {
        "q": "如何提取字符串中的所有数字？",
        "a": "regmatches(x, gregexpr(\"\\\\d+\", x))。"
      },
      {
        "q": "grepl 与 grep 的区别是什么？",
        "a": "grepl 返回逻辑向量，grep 返回匹配元素的位置。"
      }
    ]
  },
  {
    "id": 20,
    "t": "包管理与 CRAN 生态",
    "p": [
      "install.packages 从 CRAN 安装，library 与 require 加载，requireNamespace 只检查可用性",
      "CRAN 包需通过 R CMD check；BiocManager 管理 Bioconductor 生物信息包",
      "renv 为项目锁定依赖版本，pak 提供快速并行安装，devtools 简化包开发",
      "查看包信息用 packageVersion、packageDescription 与 help(package = \"dplyr\")",
      "发布自己的包需编写 DESCRIPTION、NAMESPACE、文档与测试，并通过 CRAN 检查"
    ],
    "c": "#!/usr/bin/env Rscript\n# 包管理命令：\n# install.packages(\"dplyr\")       从 CRAN 安装\n# pak::pkg_install(\"ggplot2\")     更快的安装器\n# renv::init()                    为项目创建隔离环境\n# renv::snapshot()                写入 renv.lock\n# renv::restore()                 按锁文件恢复\n\npkgs <- c(\"stats\", \"utils\", \"jsonlite\")\nfor (p in pkgs) {\n  cat(p, \"可用:\", requireNamespace(p, quietly = TRUE), \"\\n\")\n}\n\ncat(\"库路径:\\n\")\nprint(.libPaths())\ncat(\"stats 版本:\", as.character(packageVersion(\"stats\")), \"\\n\")\ncat(\"已安装包数量:\", nrow(installed.packages()), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "install.packages 安装后忘记 library 加载，或把包名写成变量而不是字符串，会报找不到对象。不同 R 版本共享库路径容易加载到不兼容的二进制包，应使用 renv 隔离。",
    "q": [
      {
        "q": "renv 如何锁定依赖？",
        "a": "renv::snapshot() 写入 renv.lock，renv::restore() 按锁文件恢复。"
      },
      {
        "q": "如何只检查包是否可用而不加载？",
        "a": "requireNamespace(\"pkg\", quietly = TRUE)。"
      }
    ]
  },
  {
    "id": 21,
    "t": "标准库速查与工具链",
    "p": [
      "包管理：install.packages、pak::pkg_install 与 renv::restore，项目依赖用 renv 锁定",
      "测试：testthat，运行 testthat::test_dir(\"tests/testthat\") 或 R CMD check",
      "格式化：styler，styler::style_dir(\"R\")；静态检查用 lintr",
      "调试：browser()、debug()、traceback()，RStudio 可点击行号设置断点",
      "运行与构建：Rscript app.R、R CMD build、R CMD check、devtools::document()"
    ],
    "c": "#!/usr/bin/env Rscript\n# 包管理：install.packages / pak / renv\n# 测试：testthat —— testthat::test_dir(\"tests/testthat\")\n# 格式化：styler —— styler::style_dir(\"R\")\n# 调试：browser() 或 RStudio 断点，命令行 Rscript -e\n# 构建检查：R CMD build . 与 R CMD check pkg_1.0.0.tar.gz\n# 文档：roxygen2 + devtools::document()\n\ncat(\"Rscript:\", file.path(R.home(\"bin\"), \"Rscript\"), \"\\n\")\ncat(\"R 版本:\", as.character(getRversion()), \"\\n\")\n\ninfo <- sessionInfo()\ncat(\"已加载的命名空间:\", length(info$loadedOnly), \"\\n\")\ncat(\"平台:\", info$platform, \"\\n\")\n\ncat(\"工作目录:\", getwd(), \"\\n\")\ncat(\"可用核心:\", parallel::detectCores(), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "在脚本中没有加载 testthat 就直接调用 expect_* 会报错；测试文件不在 tests/testthat 下，R CMD check 不会执行。用 Rscript 运行时缺少库路径，需要 library 或激活 renv。",
    "q": [
      {
        "q": "如何运行所有 testthat 测试？",
        "a": "testthat::test_dir(\"tests/testthat\")，或在包目录执行 R CMD check。"
      },
      {
        "q": "styler 的作用是什么？",
        "a": "按统一风格自动格式化 R 代码，减少风格差异。"
      }
    ]
  },
  {
    "id": 22,
    "t": "并发与并行计算",
    "p": [
      "parallel 包提供 mclapply（Unix 多进程）与 makeCluster/parLapply（跨平台）",
      "future 包统一并行后端，plan(multisession) 后 future()/value() 即可异步执行",
      "foreach 配合 doParallel 提供并行 for 循环，需注意随机数与全局变量导出",
      "并发不等于更快：任务太短时调度开销占主导，应先测量再决定是否并行",
      "并行写同一文件或共享随机数会破坏可复现性，应分片处理并设置独立种子"
    ],
    "c": "#!/usr/bin/env Rscript\nlibrary(parallel)\nnums <- 1:8\nslow_square <- function(n) {\n  Sys.sleep(0.1)\n  n^2\n}\n\ncat(\"串行结果:\", unlist(lapply(nums, slow_square)), \"\\n\")\ncat(\"多核结果:\", unlist(mclapply(nums, slow_square, mc.cores = 2)), \"\\n\")\n\ncl <- makeCluster(2)\nclusterExport(cl, \"slow_square\")\npar_result <- parLapply(cl, nums, slow_square)\nstopCluster(cl)\ncat(\"集群结果:\", unlist(par_result), \"\\n\")\n\n# future 包提供统一并行接口\n# library(future); plan(multisession); f <- future({ 1 + 1 }); value(f)",
    "et": "❌ 常见错误",
    "ec": "mclapply 在 Windows 上不可用，应改用 parLapply 集群。并行任务共享全局变量时，子进程可能看不到，需要 clusterExport；并行写同一文件会产生竞态。",
    "q": [
      {
        "q": "mclapply 与 parLapply 有什么区别？",
        "a": "mclapply 基于 fork，仅限类 Unix；parLapply 使用显式集群，可跨平台。"
      },
      {
        "q": "并行计算为什么有时更慢？",
        "a": "任务过短时进程创建与数据复制的调度开销超过计算收益。"
      }
    ]
  },
  {
    "id": 23,
    "t": "性能优化",
    "p": [
      "向量化是 R 性能的核心：用向量运算替代逐元素循环，底层由 C 实现",
      "预分配输出向量，避免在循环中不断增长对象；用 vapply 代替 sapply 获得稳定类型",
      "用 Rprof 与 profvis 分析热点，用 bench 或 microbenchmark 做微基准测试",
      "大数据用 data.table 或 arrow，减少数据复制，必要时用 Rcpp 重写瓶颈",
      "优化前先测量，优先解决算法复杂度问题，再考虑用编译代码重写底层瓶颈"
    ],
    "c": "#!/usr/bin/env Rscript\nset.seed(1)\nn <- 1e6\nsystem.time({\n  out <- numeric(n)\n  for (i in seq_len(n)) out[i] <- i^2\n})\n\nsystem.time({\n  vec <- (1:n)^2\n})\ncat(\"结果一致:\", identical(out, vec), \"\\n\")\n\nRprof(tmp <- tempfile())\ninvisible(lapply(1:1000, function(i) sum((1:100)^2)))\nRprof(NULL)\ncat(\"性能采样摘要:\\n\")\nprint(summaryRprof(tmp))\n\ncat(\"内存:\", format(object.size(vec), units = \"MB\"), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "在循环中用 c() 或 rbind() 逐步增长对象会反复复制，复杂度呈平方增长。sapply 会自动简化结果，类型不稳定时可能返回矩阵；应使用 vapply 明确返回类型。",
    "q": [
      {
        "q": "如何分析 R 代码的性能瓶颈？",
        "a": "使用 Rprof 或 profvis 采样，查看耗时最长的调用。"
      },
      {
        "q": "为什么预分配向量很重要？",
        "a": "避免循环中反复扩容复制，显著降低时间与内存开销。"
      }
    ]
  },
  {
    "id": 24,
    "t": "测试与 testthat",
    "p": [
      "testthat 用 test_that 描述用例，expect_equal、expect_error、expect_true 编写断言",
      "测试文件放在 tests/testthat/，文件名以 test- 开头，运行 test_dir 或 R CMD check",
      "用 skip_if_not 跳过不满足条件的测试，用 snapshot 测试复杂输出",
      "covr 统计覆盖率，usethis 生成测试骨架，持续集成中自动运行检查",
      "测试应覆盖正常路径、边界值与错误分支，避免依赖外部网络与随机状态"
    ],
    "c": "#!/usr/bin/env Rscript\n# tests/testthat/test-math.R\nlibrary(testthat)\n\nadd <- function(a, b) a + b\nsafe_div <- function(a, b) {\n  if (b == 0) stop(\"除数不能为零\")\n  a / b\n}\n\ntest_that(\"加法返回正确结果\", {\n  expect_equal(add(2, 3), 5)\n  expect_type(add(1L, 2L), \"integer\")\n})\n\ntest_that(\"除法处理零\", {\n  expect_error(safe_div(1, 0), \"除数不能为零\")\n  expect_equal(safe_div(10, 2), 5)\n})\n\ntest_that(\"向量长度与内容\", {\n  expect_length(1:10, 10)\n  expect_true(all((1:5)^2 == c(1, 4, 9, 16, 25)))\n})\ncat(\"可直接用 testthat::test_file() 运行本文件\\n\")",
    "et": "❌ 常见错误",
    "ec": "testthat 的 expect_equal 使用容差比较数值，expect_identical 才严格比较类型与值，混用会漏掉类型问题。测试依赖全局状态或随机数未设种子，会导致结果不可复现。",
    "q": [
      {
        "q": "testthat 如何断言会抛出错误？",
        "a": "expect_error(expr, \"错误信息片段\")。"
      },
      {
        "q": "expect_equal 与 expect_identical 有什么区别？",
        "a": "前者允许数值容差，后者要求类型与值完全一致。"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧",
    "p": [
      "browser() 在函数中插入断点，进入交互环境后可查看和修改变量",
      "debug(f) 逐步执行函数，undebug(f) 取消；traceback() 查看最近错误的调用栈",
      "options(error = recover) 在出错时进入浏览器，逐层检查调用帧",
      "RStudio 点击行号左侧设置断点，使用 Source 运行；str 与 print 快速检查对象",
      "在包代码中不要遗留 browser()，会导致 R CMD check 与生产脚本挂起"
    ],
    "c": "#!/usr/bin/env Rscript\nf <- function(x) {\n  if (x < 0) stop(\"x 不能为负\")\n  sqrt(x)\n}\n\ng <- function(x) f(x)\n\nresult <- tryCatch(g(-1), error = function(e) e)\ncat(\"错误信息:\", conditionMessage(result), \"\\n\")\ncat(\"调用栈层数:\", length(sys.calls()), \"\\n\")\n\n# 调试命令：\n# browser()                 插入断点，进入交互调试\n# debug(f)                  调试整个函数\n# traceback()               查看最近错误调用栈\n# options(error = recover)  出错时进入浏览器\n# RStudio 点击行号左侧设置断点，再用 Source 运行\n# str(x) / print(x)         检查对象结构\n\ncat(\"函数参数:\", names(formals(f)), \"\\n\")\ncat(\"函数体行数:\", length(deparse(body(f))), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "只在出错后看最后一行信息，容易忽略真正的调用栈，应使用 traceback() 与 options(error = recover)。在包代码中遗留 browser() 会让 R CMD check 或生产脚本直接挂起。",
    "q": [
      {
        "q": "如何在 R 中设置断点？",
        "a": "在函数中写 browser()，或在 RStudio 点击行号左侧。"
      },
      {
        "q": "如何查看最近一次错误的调用栈？",
        "a": "执行 traceback()，或设置 options(error = recover)。"
      }
    ]
  },
  {
    "id": 26,
    "t": "与系统及 C++ 互操作",
    "p": [
      "system2 调用外部命令并捕获输出，system 只返回退出码，参数应分开传递",
      "Sys.which 查找可执行文件，Sys.getenv 读取环境变量，Sys.info 获取系统信息",
      "Rcpp 让 C++ 函数可直接在 R 中调用，.Call 与 .C 是底层接口",
      "processx 提供更细粒度的子进程控制，可管道通信、设置超时与信号",
      "调用外部命令时避免拼接用户输入，防止 shell 注入与路径穿越"
    ],
    "c": "#!/usr/bin/env Rscript\ncat(\"系统信息:\", Sys.info()[[\"sysname\"]], \"\\n\")\ncat(\"R 路径:\", R.home(), \"\\n\")\ncat(\"which Rscript:\", Sys.which(\"Rscript\"), \"\\n\")\n\nout <- system2(\"uname\", \"-s\", stdout = TRUE, stderr = TRUE)\ncat(\"uname:\", out, \"\\n\")\n\nstatus <- system2(\"mkdir\", c(\"-p\", file.path(tempdir(), \"ffi_demo\")))\ncat(\"返回码:\", status, \"\\n\")\n\ncat(\"环境变量 HOME:\", Sys.getenv(\"HOME\"), \"\\n\")\ncat(\"临时目录文件数:\", length(list.files(tempdir())), \"\\n\")\n\n# Rcpp::sourceCpp(code = '\n#   #include <Rcpp.h>\n#   [[Rcpp::export]]\n#   int add(int a, int b) { return a + b; }\n# ')\n# add(1L, 2L)",
    "et": "❌ 常见错误",
    "ec": "system2 的参数要分开传，拼接成一个字符串会经过 shell，存在注入风险。调用编译代码时类型不匹配可能导致崩溃；修改 C++ 代码后忘记重新 sourceCpp 会继续运行旧版本。",
    "q": [
      {
        "q": "Rcpp 的作用是什么？",
        "a": "在 R 中直接调用 C++ 函数，把性能瓶颈下沉到编译代码。"
      },
      {
        "q": "system2 与 system 有什么区别？",
        "a": "system2 可捕获输出并分开传递参数，system 只返回退出码。"
      }
    ]
  },
  {
    "id": 27,
    "t": "设计模式实践",
    "p": [
      "策略模式把函数作为参数传入，按不同算法复用同一流程，避免冗长分支",
      "函数工厂返回定制函数，实现配置化与依赖注入，让调用方只关心接口",
      "记忆化用闭包缓存计算结果，适合重复调用的纯函数，可显著减少重复计算",
      "split-apply-combine 是 R 的经典数据处理模式，对应 split、lapply 与合并",
      "设计模式应减少重复与耦合，不要为了套用模式而引入不必要的抽象层"
    ],
    "c": "#!/usr/bin/env Rscript\nsummarize_by <- function(x, strategy) {\n  split(x, strategy(x))\n}\n\nprices <- c(10, 20, 30, 40)\ncat(\"按奇偶分组:\\n\")\nprint(summarize_by(prices, function(x) x %% 2))\n\nmemoize <- function(f) {\n  cache <- list()\n  function(x) {\n    key <- as.character(x)\n    if (is.null(cache[[key]])) cache[[key]] <<- f(x)\n    cache[[key]]\n  }\n}\nslow_square <- memoize(function(x) { Sys.sleep(0.01); x^2 })\ncat(\"首次:\", slow_square(12), \"缓存:\", slow_square(12), \"\\n\")\n\nmake_formatter <- function(prefix) function(x) paste0(prefix, x)\nfmt <- make_formatter(\"# \")\ncat(fmt(\"日志\"), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "用全局变量在函数间传递状态，会让流程难以追踪；闭包缓存若不限制大小会持续占用内存。split-apply-combine 结果用 do.call(rbind) 合并时，列类型可能被强制转换。",
    "q": [
      {
        "q": "记忆化如何实现？",
        "a": "用闭包保存缓存列表，命中则返回缓存，否则计算并写入。"
      },
      {
        "q": "split-apply-combine 对应哪些函数？",
        "a": "split 分组、lapply 或 purrr::map 应用、do.call(rbind) 或 dplyr 合并。"
      }
    ]
  },
  {
    "id": 28,
    "t": "数据库访问",
    "p": [
      "DBI 定义统一数据库接口，RSQLite、RPostgres、RMariaDB 提供具体驱动",
      "dbConnect 连接，dbGetQuery 查询，dbExecute 执行写操作，dbWriteTable 写表",
      "参数化查询用 params 列表防止 SQL 注入，事务用 dbBegin、dbCommit、dbRollback",
      "dbplyr 可把 dplyr 管道翻译为 SQL，延迟到 collect() 才真正执行",
      "数据库连接应及时关闭，批量写入用事务包裹可显著提升性能并保证一致性"
    ],
    "c": "#!/usr/bin/env Rscript\nlibrary(DBI)\nlibrary(RSQLite)\n\ncon <- dbConnect(SQLite(), \":memory:\")\ndbExecute(con, \"CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)\")\ndbExecute(con, \"INSERT INTO users (name, age) VALUES (?, ?)\", params = list(\"Alice\", 30))\ndbExecute(con, \"INSERT INTO users (name, age) VALUES (?, ?)\", params = list(\"Bob\", 25))\n\nprint(dbGetQuery(con, \"SELECT * FROM users ORDER BY age\"))\ncat(\"行数:\", dbGetQuery(con, \"SELECT COUNT(*) AS n FROM users\")$n, \"\\n\")\n\ndf <- data.frame(name = \"Carol\", age = 28)\ndbWriteTable(con, \"users\", df, append = TRUE)\n\ndbBegin(con)\ndbExecute(con, \"UPDATE users SET age = age + 1 WHERE name = ?\", params = list(\"Alice\"))\ndbCommit(con)\nprint(dbGetQuery(con, \"SELECT name, age FROM users\"))\n\ndbDisconnect(con)",
    "et": "❌ 常见错误",
    "ec": "SQL 拼接用户输入会导致注入，应使用 params 参数化。dbGetQuery 返回 data.frame，列名可能被数据库改写；忘记 dbDisconnect 会积累连接，事务未提交会丢失写入。",
    "q": [
      {
        "q": "DBI 如何防止 SQL 注入？",
        "a": "使用 ? 占位符并通过 params 列表绑定参数。"
      },
      {
        "q": "如何开启事务？",
        "a": "dbBegin(con) 后执行操作，成功 dbCommit，失败 dbRollback。"
      }
    ]
  },
  {
    "id": 29,
    "t": "网络编程与 HTTP",
    "p": [
      "httr 封装 HTTP 请求，GET 与 POST 返回响应对象，status_code 判断状态",
      "content 解析响应体，支持 JSON、文本与原始字节；timeout 与 user_agent 可配置",
      "jsonlite 的 fromJSON 与 toJSON 处理 JSON，curl 包提供更底层连接控制",
      "服务端可用 plumber 把 R 函数发布为 REST API，或用 Shiny 提供交互界面",
      "网络请求应处理超时、非 2xx 状态与解析失败，避免把错误页当正常数据"
    ],
    "c": "#!/usr/bin/env Rscript\nlibrary(httr)\nlibrary(jsonlite)\n\nres <- GET(\"https://api.github.com/repos/wch/r-source\",\n           timeout(10), user_agent(\"r-tutorial\"))\nif (status_code(res) == 200) {\n  data <- content(res, as = \"parsed\", type = \"application/json\")\n  cat(\"仓库:\", data$full_name, \"\\n\")\n  cat(\"星标:\", data$stargazers_count, \"\\n\")\n} else {\n  cat(\"请求失败:\", status_code(res), \"\\n\")\n}\n\ncat(\"JSON 解析:\", fromJSON('{\"name\":\"R\",\"version\":4.4}')$name, \"\\n\")\ncat(\"URL 编码:\", URLencode(\"R 语言 教程\"), \"\\n\")\n\n# plumber 可把函数发布为 HTTP API\n# library(plumber)\n# pr <- pr(\"api.R\"); pr$run(port = 8000)",
    "et": "❌ 常见错误",
    "ec": "GET 请求未检查 status_code 就解析内容，会把错误页当成 JSON。httr 默认不抛异常，需要自己判断；未设置 timeout 会让请求长时间阻塞，拖垮批处理任务。",
    "q": [
      {
        "q": "httr 如何判断请求成功？",
        "a": "检查 status_code(res) == 200，或 http_status(res)$category == \"Success\"。"
      },
      {
        "q": "如何解析 JSON 响应？",
        "a": "content(res, as = \"parsed\", type = \"application/json\") 或 fromJSON。"
      }
    ]
  },
  {
    "id": 30,
    "t": "安全编程",
    "p": [
      "永远不要对不可信输入执行 eval(parse())，它会执行任意 R 代码",
      "SQL 使用参数化查询或 dbQuoteString，避免拼接用户输入",
      "密码与令牌通过环境变量或密钥管理服务读取，不要写进脚本与仓库",
      "文件路径要规范化并校验，防止 ../ 目录穿越；输出 HTML 时转义特殊字符",
      "依赖包应来自可信源并定期更新，避免供应链攻击与已知安全漏洞带来的风险"
    ],
    "c": "#!/usr/bin/env Rscript\n# 1. 不要对不可信输入使用 eval(parse())\nexpr <- \"1 + 1\"\nif (grepl(\"^[0-9+*() -]+$\", expr)) {\n  cat(\"白名单校验通过:\", eval(parse(text = expr)), \"\\n\")\n} else {\n  cat(\"输入包含不允许的字符，拒绝执行\\n\")\n}\n# 2. SQL 使用参数化查询，避免拼接字符串\nlibrary(DBI)\ncon <- dbConnect(RSQLite::SQLite(), \":memory:\")\ndbExecute(con, \"CREATE TABLE t (name TEXT)\")\ninput <- \"a'; DROP TABLE t; --\"\ndbExecute(con, \"INSERT INTO t (name) VALUES (?)\", params = list(input))\ncat(\"安全写入行数:\", dbGetQuery(con, \"SELECT COUNT(*) AS n FROM t\")$n, \"\\n\")\ndbDisconnect(con)\n# 3. 密码从环境变量读取，不写进脚本\npass <- Sys.getenv(\"APP_PASSWORD\", unset = NA)\ncat(\"是否配置密码:\", !is.na(pass), \"\\n\")\n# 4. 校验文件路径，避免目录穿越\nsafe_path <- function(name) {\n  if (grepl(\"\\\\.\\\\.|/\", name)) stop(\"非法文件名\")\n  file.path(tempdir(), name)\n}\ncat(\"安全路径:\", safe_path(\"report.csv\"), \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "对用户输入执行 eval(parse()) 等于允许任意代码执行，是最危险的写法之一。SQL 拼接、路径穿越与把密钥写入脚本同样是常见漏洞；输出 HTML 时也要转义特殊字符。",
    "q": [
      {
        "q": "为什么应避免 eval(parse())？",
        "a": "它会执行任意 R 代码，用户输入可导致远程代码执行。"
      },
      {
        "q": "DBI 如何安全地接收用户输入？",
        "a": "使用 ? 占位符与 params 列表，或 dbQuoteString 转义。"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战：命令行工具",
    "p": [
      "commandArgs(trailingOnly = TRUE) 获取脚本参数，Rscript 用于非交互运行",
      "optparse 提供选项解析，支持短选项、长选项、默认值与帮助文本",
      "quit(status = ...) 返回退出码，cat 输出到标准输出，message 输出到标准错误",
      "CLI 应校验参数类型与数量，给出清晰用法提示，便于 shell 脚本调用",
      "把参数解析、计算与输出拆分为独立函数，便于测试、复用与错误处理"
    ],
    "c": "#!/usr/bin/env Rscript\nargs <- commandArgs(trailingOnly = TRUE)\nif (length(args) == 0) {\n  cat(\"用法: Rscript stats.R <数字> [<数字> ...]\\n\")\n  quit(status = 1)\n}\nnums <- suppressWarnings(as.numeric(args))\nif (anyNA(nums)) {\n  cat(\"错误: 参数必须全部是数字\\n\")\n  quit(status = 2)\n}\ncat(\"个数:\", length(nums), \"\\n\")\ncat(\"均值:\", mean(nums), \"\\n\")\ncat(\"中位数:\", median(nums), \"\\n\")\ncat(\"范围:\", range(nums), \"\\n\")\n\n# 用 optparse 处理带选项的 CLI\nlibrary(optparse)\nopt <- parse_args(OptionParser(option_list = list(\n  make_option(c(\"-v\", \"--verbose\"), action = \"store_true\", default = FALSE)\n)), args = character())\ncat(\"详细模式:\", opt$verbose, \"\\n\")",
    "et": "❌ 常见错误",
    "ec": "commandArgs() 不带 trailingOnly 会返回包含 R 自身参数的完整列表，容易解析错位。参数默认是字符型，参与数值运算前必须转换并校验；错误退出应使用非零状态码。",
    "q": [
      {
        "q": "如何读取命令行参数？",
        "a": "commandArgs(trailingOnly = TRUE)。"
      },
      {
        "q": "如何让脚本以失败状态退出？",
        "a": "quit(status = 1)，非零状态码表示失败。"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战：数据处理与可视化",
    "p": [
      "dplyr 提供 filter、select、mutate、group_by、summarise 等管道式数据操作",
      "tidyr 的 pivot_longer 与 pivot_wider 重塑数据，readr 快速读取文本表格",
      "ggplot2 用图层语法绘图：data 加 aes 加 geom，可组合标度、分面与主题",
      "Shiny 用 ui 与 server 构建交互应用，Quarto 与 R Markdown 生成可复现报告",
      "分析流程应拆分为读取、清洗、聚合、可视化与导出，便于复用与审查"
    ],
    "c": "#!/usr/bin/env Rscript\nlibrary(dplyr)\nlibrary(readr)\n\nsales <- read_csv(\n  \"date,region,amount\n2026-01-01,North,100\n2026-01-02,South,150\n2026-01-03,North,200\", show_col_types = FALSE\n)\n\nsummary <- sales |>\n  group_by(region) |>\n  summarise(total = sum(amount), avg = mean(amount), n = n()) |>\n  arrange(desc(total))\nprint(summary)\n\ncat(\"总额:\", sum(sales$amount), \"\\n\")\ncat(\"最大单笔:\", max(sales$amount), \"\\n\")\n\n# ggplot2 可视化\n# library(ggplot2)\n# ggplot(summary, aes(region, total)) + geom_col() + theme_minimal()\n# Shiny: library(shiny); runApp(\"app.R\") 发布交互式应用",
    "et": "❌ 常见错误",
    "ec": "dplyr 的 group_by 结果若忘记 ungroup，后续操作会继续按组执行。read_csv 与 read.csv 参数名不同，混用会报错；绘图前未把字符列转为因子，坐标轴顺序可能按字母排列。",
    "q": [
      {
        "q": "dplyr 的核心动词有哪些？",
        "a": "filter、select、mutate、group_by、summarise、arrange。"
      },
      {
        "q": "ggplot2 的图层语法由哪些部分组成？",
        "a": "数据、aes 映射与 geom 几何对象，可再加标度、分面与主题。"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建、部署与发布",
    "p": [
      "R CMD build 打包源码，R CMD check --as-cran 做完整检查，通过后可提交 CRAN",
      "DESCRIPTION 描述元数据与依赖，NAMESPACE 由 roxygen2 自动生成",
      "renv::snapshot 锁定依赖，Docker 镜像中 renv::restore 复现运行环境",
      "CI 可用 GitHub Actions 的 r-lib/actions，自动运行检查、测试与覆盖率",
      "发布前应更新版本号与 NEWS，确保示例、文档和测试全部通过"
    ],
    "c": "# DESCRIPTION\nPackage: logstats\nType: Package\nTitle: 日志统计工具\nVersion: 0.1.0\nAuthors@R: person(\"San\", \"Zhang\", email = \"dev@example.com\", role = c(\"aut\", \"cre\"))\nDescription: 提供日志解析与汇总功能。\nLicense: MIT + file LICENSE\nEncoding: UTF-8\nImports: jsonlite, DBI\nSuggests: testthat (>= 3.0.0)\nRoxygenNote: 7.3.1\n\n# 构建与检查\n# R CMD build .\n# R CMD check --as-cran logstats_0.1.0.tar.gz\n# Rscript -e 'devtools::check()'\n# renv::snapshot() 锁定依赖，Docker 中 renv::restore()\n# R CMD INSTALL logstats_0.1.0.tar.gz 安装到本地库",
    "et": "❌ 常见错误",
    "ec": "DESCRIPTION 缺少 Imports 或 NAMESPACE 未导出函数，R CMD check 会报错。示例中使用未声明的包、文档缺失、测试失败都会阻止 CRAN 提交；版本号未递增会被拒绝。",
    "q": [
      {
        "q": "R CMD check 的作用是什么？",
        "a": "检查包结构、文档、示例与测试是否符合 CRAN 规范。"
      },
      {
        "q": "如何锁定 R 项目依赖？",
        "a": "renv::snapshot() 写入 renv.lock，恢复用 renv::restore()。"
      }
    ]
  },
  {
    "id": 34,
    "t": "最佳实践与代码质量",
    "p": [
      "遵循 tidyverse 风格：snake_case 命名、<- 赋值、清晰的空格与缩进",
      "项目使用固定结构：R/、tests/、data/、DESCRIPTION 与 renv.lock",
      "函数保持纯粹与短小，避免副作用；用 styler 与 lintr 统一风格",
      "所有导出函数写 roxygen2 文档并配测试，提交前运行 R CMD check",
      "避免 setwd 与全局变量，使用 here 或项目相对路径提升可移植性"
    ],
    "c": "#!/usr/bin/env Rscript\n# 1. 使用 <- 赋值，函数参数用 = 传值\n# 2. 变量与函数使用 snake_case，常量用大写\n# 3. 避免在循环中增长向量，先预分配\n# 4. 用 styler::style_dir() 统一格式，lintr 做静态检查\n# 5. 每个函数保持单一职责，返回类型稳定\n# 6. 用 testthat 覆盖边界条件，提交前运行测试\n\ncheck_positive <- function(x, arg = \"x\") {\n  if (!is.numeric(x) || any(x <= 0, na.rm = TRUE)) {\n    stop(arg, \" 必须为正数\", call. = FALSE)\n  }\n  invisible(x)\n}\n\ncheck_positive(c(1, 2, 3))\ncat(\"校验通过\\n\")\ncat(\"项目结构: R/ tests/testthat/ data/ 与 DESCRIPTION\\n\")",
    "et": "❌ 常见错误",
    "ec": "在脚本中使用 setwd() 会让路径依赖调用位置，难以复现。变量命名混乱、函数过长、缺少测试都会降低可维护性；只依赖手工运行而不做 R CMD check，问题会在发布时集中爆发。",
    "q": [
      {
        "q": "styler 与 lintr 分别做什么？",
        "a": "styler 自动格式化代码，lintr 做静态检查并报告风格与潜在问题。"
      },
      {
        "q": "为什么应避免 setwd()？",
        "a": "它让路径依赖当前工作目录，换环境后脚本容易找不到文件。"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "回顾基础：向量、数据框、因子、函数、apply 家族与作用域",
      "熟悉 tidyverse 数据操作与 ggplot2 可视化，形成可复用的分析流水线",
      "工程能力：testthat、renv、R CMD check、版本控制与持续集成",
      "进阶方向：统计建模、机器学习、Shiny 应用、包开发与性能优化",
      "学习路线：语法 → 数据清洗 → 可视化 → 建模 → 可复现报告与部署"
    ],
    "c": "#!/usr/bin/env Rscript\nroadmap <- list(\n  base = c(\"向量\", \"数据框\", \"函数\", \"apply 家族\"),\n  tidyverse = c(\"dplyr\", \"tidyr\", \"readr\", \"ggplot2\"),\n  engineer = c(\"testthat\", \"renv\", \"R CMD check\", \"CI\"),\n  app = c(\"Shiny\", \"plumber\", \"R Markdown\", \"Quarto\")\n)\ncat(\"R 学习路线\\n\")\nfor (stage in names(roadmap)) {\n  cat(stage, \":\", paste(roadmap[[stage]], collapse = \", \"), \"\\n\")\n}\ncat(\"推荐练习：用 dplyr 汇总销售数据并输出图表\\n\")\ncat(\"进阶阅读：Advanced R、R Packages、ggplot2 官方文档\\n\")",
    "et": "❌ 常见错误",
    "ec": "只看教程不动手，很难理解 R 的向量化与作用域。应从一个真实数据集出发，完成清洗、可视化、建模到报告的全流程，再学习包开发与性能优化。",
    "q": [
      {
        "q": "R 学习的下一步建议是什么？",
        "a": "完成一个真实数据分析项目，再学习包开发、Shiny 与性能优化。"
      },
      {
        "q": "推荐阅读哪些 R 进阶资料？",
        "a": "《Advanced R》《R Packages》以及 ggplot2 与 tidyverse 官方文档。"
      }
    ]
  }
];
