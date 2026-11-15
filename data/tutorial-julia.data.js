window.TUTORIAL_DATA_julia = [
  {
    "id": 1,
    "t": "Julia 简介与历史",
    "p": [
      "Julia 由 Jeff Bezanson、Stefan Karpinski 等四人于 2012 年发布，语法接近 MATLAB 与 Python",
      "基于 LLVM 的即时编译：代码在运行时按具体类型编译，兼顾脚本灵活性与 C 级性能",
      "核心设计是多重派发：函数行为由全部参数类型共同决定，而非只看接收者",
      "主要应用于数值计算、机器学习、数据科学、金融建模与科学仿真等领域"
    ],
    "c": "println(\"Hello, Julia!\")\nprintln(\"欢迎学习 Julia 1.8+ 教程\")\n\na, b = 3, 4\nprintln(\"$a + $b = $(a + b)\")\nprintln(\"Julia 版本: \", VERSION)\nprintln(\"2 的平方根: \", sqrt(2))\nprintln(\"sqrt(2) 的类型: \", typeof(sqrt(2)))\n\nfunction greet(name)\n    \"你好，\" * name * \"！\"\nend\nprintln(greet(\"世界\"))",
    "et": "❌ 把 Julia 当成 Python 或 MATLAB 的方言，忽略类型与多重派发",
    "ec": "Julia 是独立的动态语言：默认整数是 Int、除法返回 Float64、索引从 1 开始。照搬 Python 的 0 基索引或整数除法会直接得到错误结果或下标越界。",
    "q": [
      {
        "q": "Julia 的代码靠什么获得接近 C 的性能？",
        "a": "基于 LLVM 的即时编译，按调用时的具体参数类型生成特化机器码。"
      },
      {
        "q": "Julia 的索引从几开始？",
        "a": "从 1 开始，lastindex(v) 给出最后一个合法下标。"
      }
    ]
  },
  {
    "id": 2,
    "t": "安装与工具链",
    "p": [
      "官方推荐用 juliaup 安装，可并存多个 Julia 版本并一键切换，免去手动配置路径",
      "VS Code 安装 Julia 扩展即可获得语法高亮、补全、调试与内置 REPL 集成",
      "REPL 有四种模式：代码、] 包管理、? 帮助、; shell，按退格键返回代码模式",
      "项目环境由 Project.toml 与 Manifest.toml 描述，保证依赖版本可复现"
    ],
    "c": "# 安装 juliaup（Linux/macOS）\n# curl -fsSL https://install.julialang.org | sh\njulia --version\njulia -e 'println(\"当前版本 \", VERSION)'\njulia -e 'using Pkg; Pkg.status()'\n\n# REPL 四种模式：\n#   julia>   代码模式\n#   ]        包管理模式（Pkg）\n#   ?        帮助模式，例如 ?println\n#   ;        shell 模式，;ls\n# 按退格键从特殊模式回到代码模式",
    "et": "❌ 直接下载压缩包后忘记把 bin 目录加入 PATH",
    "ec": "手动安装时需把解压目录下的 bin 加入 PATH，否则终端找不到 julia 命令。用 juliaup 安装可自动处理版本与路径，升级时也不必重新配置环境变量。",
    "q": [
      {
        "q": "在 REPL 中如何进入包管理模式？",
        "a": "按 ] 键，提示符变为 (@v1.x) pkg>，按退格键返回。"
      },
      {
        "q": "检查当前项目依赖状态的命令是什么？",
        "a": "在 Pkg 模式输入 status，或执行 julia -e 'using Pkg; Pkg.status()'。"
      }
    ]
  },
  {
    "id": 3,
    "t": "变量与常量",
    "p": [
      "Julia 变量无需声明类型，赋值即创建绑定；同一个名字可先后绑定不同类型",
      "const 声明常量，全局常量能让编译器做更好优化，但不会强制深层不可变",
      "变量名区分大小写，习惯上用蛇形命名：函数与变量小写，类型用大驼峰",
      "let 块与函数体创建局部作用域，函数中访问全局变量会带来明显的性能损失"
    ],
    "c": "x = 10\ny = 3.5\nname = \"Julia\"\nconst MAX_POINTS = 100\n\nprintln(typeof(x), \" \", typeof(y))\nx = 2.5                     # 变量可以重新绑定为其他类型\nprintln(\"x = $x, 类型 = \", typeof(x))\nprintln(\"MAX_POINTS = $MAX_POINTS\")\n\nlet z = 42                  # let 引入局部作用域\n    println(\"z = $z\")\nend\n# println(z)                # 取消注释会抛 UndefVarError",
    "et": "❌ 在函数里直接给全局变量赋值，以为修改了全局值",
    "ec": "函数内赋值会新建同名局部变量，全局绑定不变，还可能触发性能警告。应显式写 global x = ...，更好的做法是把状态作为参数传入或放进可变结构体。",
    "q": [
      {
        "q": "如何声明一个全局常量并让编译器优化？",
        "a": "const MAX = 100，类型与值都应在使用前确定。"
      },
      {
        "q": "let 块的作用是什么？",
        "a": "创建局部作用域，块内变量在块结束后不可见。"
      }
    ]
  },
  {
    "id": 4,
    "t": "数据类型",
    "p": [
      "整数分 Int8/16/32/64/128 与 UInt 系列，默认整数字面量是 Int，即平台字长",
      "浮点有 Float16/32/64，默认 1.0 是 Float64；此外还有 Bool、Char 与 String",
      "数值类型构成抽象层次：Integer、AbstractFloat、Real、Number 逐级抽象",
      "内置 Rational、Complex、BigInt、BigFloat，分别表示精确分数、复数与大数"
    ],
    "c": "println(typeof(1), \" \", typeof(1.0), \" \", typeof(1 // 2))\nprintln(typeof('中'), \" UTF-8 字节数 \", sizeof(string('中')))\nprintln(typeof(\"中\"), \" 字符串字节数 \", sizeof(\"中\"))\n\nprintln(1 + 2.0, \" -> \", typeof(1 + 2.0))     # 自动类型提升\nprintln(2 + 3im, \" -> \", typeof(2 + 3im))\nprintln(big(2)^100)                            # BigInt\nprintln(0x01, \" -> \", typeof(0x01))\nprintln(Int('A'), \" \", Char(66))\nprintln(typemax(Int8), \" \", typemin(Int8))",
    "et": "❌ 以为 Int 在不同平台上宽度相同，或把整数除法当成浮点除法",
    "ec": "Int 的宽度等于平台字长，64 位系统是 Int64。两个整数相除的 / 返回 Float64，要整除必须用 div(a, b)，取余用 rem 或 mod。",
    "q": [
      {
        "q": "1 // 2 得到什么类型？",
        "a": "Rational{Int}，即精确的 1//2，而不是 0.5。"
      },
      {
        "q": "如何查看一个值的具体类型？",
        "a": "typeof(x)，例如 typeof(1.0) 返回 Float64。"
      }
    ]
  },
  {
    "id": 5,
    "t": "运算符",
    "p": [
      "算术运算符有 + - * / ^，其中 / 总返回浮点，整除用 div，取余用 rem 或 mod",
      "比较运算符可以链式书写：1 < 2 < 3 等价于 1 < 2 && 2 < 3",
      "逻辑运算 && || ! 短路求值；位运算 & | xor ~ << >> 不做短路",
      "运算符加点即广播，可逐元素作用于数组，例如 a .+ b、sin.(x)"
    ],
    "c": "a, b = 7, 2\nprintln(a + b, \" \", a - b, \" \", a * b, \" \", a / b)\nprintln(div(a, b), \" \", rem(a, b), \" \", mod(a, b), \" \", a^b)\nprintln(1 < 2 < 3)                  # 链式比较\nprintln(!(a == b) && a > b)\nprintln(0b1010 & 0b0110, \" \", 0b1010 | 0b0110, \" \", xor(0b1010, 0b0110))\nprintln(1 << 4, \" \", 16 >> 2)\n\nxs = [1, 2, 3]\nprintln(xs .+ 10)                   # 广播加法\nprintln(sin.(xs))\nprintln(sum(xs) / length(xs))",
    "et": "❌ 对数组直接写 a + 1，误以为会自动逐元素相加",
    "ec": "标量与数组运算必须用广播点语法 a .+ 1，否则没有匹配的方法而报错。广播还能组合函数，如 sin.(xs)，它比手动 map 更简洁且性能相同。",
    "q": [
      {
        "q": "整除与取余分别用什么函数？",
        "a": "div(a, b) 与 rem(a, b)，mod 在负数场景与 rem 结果不同。"
      },
      {
        "q": "如何对向量每个元素求平方？",
        "a": "xs .^ 2，点号表示广播。"
      }
    ]
  },
  {
    "id": 6,
    "t": "字符串",
    "p": [
      "Julia 的 String 是不可变 UTF-8 编码，length 返回字符数，sizeof 返回字节数",
      "字符串不能按整数下标逐字符遍历，非 ASCII 字符需用 nextind/prevind 推进索引",
      "用 $ 插值变量或表达式；字符串拼接用 *，重复用 repeat，比较用 ==",
      "常用函数有 split、join、strip、startswith、endswith、replace、occursin"
    ],
    "c": "s = \"Julia 中文\"\nprintln(length(s), \" 个字符, \", sizeof(s), \" 字节\")\nprintln(s[1], \" \", s[6])\nprintln(\"首索引 \", firstindex(s), \" 末索引 \", lastindex(s))\n\ni = nextind(s, 6)\nprintln(s[i:end])                    # 从空格之后取到结尾\n\nprintln(uppercase(s), \" / \", lowercase(s))\nprintln(join(split(\"a,b,c\", ','), \" | \"))\nprintln(\"abc\" * \"def\", \" \", repeat(\"ha\", 3))\nprintln(lpad(42, 5, '0'), \" \", strip(\"  hi  \"))\nprintln(\"值: $s, 长度 $(length(s))\")",
    "et": "❌ 用 s[1:3] 截取含中文的字符串，结果报 StringIndexError",
    "ec": "UTF-8 中一个汉字占 3 字节，直接按字节下标切片可能切在字符中间。应使用 nextind/prevind 计算合法索引，或先 collect(s) 转成字符数组再处理。",
    "q": [
      {
        "q": "length(\"中文\") 与 sizeof(\"中文\") 分别是多少？",
        "a": "length 为 2（字符数），sizeof 为 6（UTF-8 字节数）。"
      },
      {
        "q": "如何安全截取第 7 个字符到结尾？",
        "a": "s[nextind(s, 6):end]，或直接用合法索引 s[7:end]。"
      }
    ]
  },
  {
    "id": 7,
    "t": "集合与数组",
    "p": [
      "数组 Array{T,N} 是类型与维数参数化的密集容器，索引从 1 开始而不是 0",
      "向量是一维数组，矩阵是二维数组；[1 2; 3 4] 按行书写，逗号分隔则按列拼接",
      "Dict 是哈希表，Set 是集合；元组 Tuple 不可变且长度固定，适合返回多值",
      "推导式 [f(x) for x in xs if cond] 简洁生成数组，view 可避免切片拷贝"
    ],
    "c": "v = [10, 20, 30]\npush!(v, 40)\nprintln(v, \" 长度 \", length(v), \" 首元素 \", v[1])\n\nm = [1 2 3; 4 5 6]\nprintln(size(m), \" m[2,3]=\", m[2, 3])\n\nd = Dict(\"a\" => 1, \"b\" => 2)\nd[\"c\"] = 3\nprintln(get(d, \"z\", 0), \" \", sort(collect(keys(d))))\n\nst = Set([1, 2, 2, 3])\nprintln(st, \" 包含 2: \", 2 in st)\n\nt = (1, \"two\", 3.0)\nprintln(t[2], \" \", length(t))\nprintln([x^2 for x in 1:5 if isodd(x)])",
    "et": "❌ 用 v[0] 访问数组第一个元素，或对元组调用 push!",
    "ec": "Julia 索引从 1 开始，v[0] 会抛 BoundsError。元组是不可变类型，没有 push!；需要可变序列请用 Vector，需要固定长度异构组合用元组。",
    "q": [
      {
        "q": "矩阵 [1 2; 3 4] 的 size 是多少？",
        "a": "(2, 2)，分号换行、空格分列。"
      },
      {
        "q": "如何获取字典中不存在的键而不报错？",
        "a": "get(d, key, 默认值)，或 haskey 先判断。"
      }
    ]
  },
  {
    "id": 8,
    "t": "条件分支",
    "p": [
      "if/elseif/else 是表达式，每个分支的最后一个值即整体返回值",
      "三元运算符 a ? b : c 适合短表达式；ifelse 是函数，会先求值两个分支",
      "&& 与 || 可用于条件执行：条件 && 副作用，常用于提前返回或断言",
      "Julia 的条件必须是 Bool，不存在把 0、空字符串当假的隐式转换"
    ],
    "c": "function grade(score)\n    if score >= 90\n        \"A\"\n    elseif score >= 60\n        \"B\"\n    else\n        \"C\"\n    end\nend\n\nprintln(grade(95), \" \", grade(72), \" \", grade(30))\n\nx = 5\nprintln(x > 0 ? \"正数\" : \"非正数\")\nx > 0 && println(\"短路与：x 为正\")\nx < 0 || println(\"短路或：x 不为负\")\n\nlabel = if iseven(x)\n    \"偶数\"\nelse\n    \"奇数\"\nend\nprintln(label)",
    "et": "❌ 写 if x 期待 0 被当作假，或把 = 当成比较运算符",
    "ec": "Julia 要求条件严格为 Bool，if 0 会抛 TypeError，必须写 if x != 0。比较相等用 ==，单个 = 是赋值，容易造成难以发现的逻辑错误。",
    "q": [
      {
        "q": "if 块的最后一行表达式会怎样？",
        "a": "作为整个 if 表达式的值返回，可直接赋给变量。"
      },
      {
        "q": "ifelse 与三元运算符的关键差别？",
        "a": "ifelse 是函数，两个分支都会先求值；三元运算符只求值选中的分支。"
      }
    ]
  },
  {
    "id": 9,
    "t": "循环与递归",
    "p": [
      "for 可遍历范围、数组、字典与任何可迭代对象，循环变量默认是局部变量",
      "while 适合次数未知的循环；break 跳出，continue 跳过本次剩余语句",
      "递归是 Julia 的常用写法，配合多重派发可实现清晰的基准情形与递归情形",
      "enumerate 同时给索引与值，zip 并行遍历多个集合，eachindex 安全遍历索引"
    ],
    "c": "function factorial(n)\n    n <= 1 && return 1\n    n * factorial(n - 1)\nend\n\ntotal = 0\nfor i in 1:100\n    i % 3 == 0 && continue\n    total += i\nend\nprintln(\"1..100 中非 3 倍数之和 = $total\")\nprintln(\"5! = \", factorial(5))\n\nfor (i, name) in enumerate([\"甲\", \"乙\", \"丙\"])\n    println(i, \": \", name)\nend\n\nfor (a, b) in zip([1, 2], [\"一\", \"二\"])\n    println(a, \" => \", b)\nend",
    "et": "❌ 在函数里写 for i in 1:n 后，循环外继续使用 i",
    "ec": "循环变量是循环体的局部变量，循环结束后不可见，访问会抛 UndefVarError。需要在循环外使用结果时，应在循环前定义累加变量并在循环内更新。",
    "q": [
      {
        "q": "如何同时遍历下标和元素？",
        "a": "for (i, x) in enumerate(xs)，下标默认从 1 开始。"
      },
      {
        "q": "递归函数必须有什么？",
        "a": "能终止递归的基准情形，否则会栈溢出。"
      }
    ]
  },
  {
    "id": 10,
    "t": "函数基础",
    "p": [
      "函数用 function 定义或用 f(x) = 表达式的短形式，返回值即最后表达式",
      "return 可显式返回值；返回多个值实际是元组，可用 a, b = f() 解构",
      "可选参数给默认值，关键字参数用分号分隔，调用时必须写出参数名",
      "可变参数用 xs... 收集为元组；文档字符串写在函数定义前，可用 ? 查看"
    ],
    "c": "# 计算矩形面积与周长，scale 为缩放系数\nfunction rect(w, h=1.0; scale=1.0)\n    area = w * h * scale^2\n    perim = 2 * (w + h) * scale\n    return area, perim\nend\n\na, p = rect(3, 4)\nprintln(\"面积 $a，周长 $p\")\nprintln(rect(2; scale=10))\n\nfunction sum_all(xs...)\n    sum(xs)\nend\nprintln(sum_all(1, 2, 3, 4))\n\nsquare(x) = x^2\nprintln(square(9))",
    "et": "❌ 给可选参数加类型后，仍按位置传入关键字参数",
    "ec": "分号后的参数是关键字参数，必须写 scale=10 而不能只写 10。位置参数与关键字参数混用时，关键字参数永远放在分号之后，否则会报方法不匹配。",
    "q": [
      {
        "q": "如何定义带默认值的位置参数？",
        "a": "function f(x, y=1) ... end，调用 f(3) 时 y 取 1。"
      },
      {
        "q": "函数返回多个值的本质是什么？",
        "a": "返回一个元组，可用多重赋值解构。"
      }
    ]
  },
  {
    "id": 11,
    "t": "函数进阶与多重派发",
    "p": [
      "多重派发让同名函数拥有多个方法，调用时按全部实参类型选择最具体的方法",
      "methods(f) 查看所有方法，@which f(x) 查看某次调用命中的方法",
      "匿名函数写作 x -> x^2，适合 map、filter、reduce 等高阶函数",
      "函数组合用 ∘，管道用 |>，do 块可把函数作为最后一个参数传入"
    ],
    "c": "struct Circle\n    r::Float64\nend\n\narea(w, h) = w * h\narea(c::Circle) = π * c.r^2\n\nprintln(area(3, 4), \" \", area(Circle(2.0)))\nprintln(methods(area))\n\nf = x -> x^2\nprintln(map(f, [1, 2, 3]))\nprintln(reduce(+, 1:5), \" \", filter(isodd, 1:10))\n\nadd(x, y) = x + y\ndouble = (x -> 2x) ∘ inc\nprintln(double(5))\nprintln(5 |> inc |> (x -> x * 2))",
    "et": "❌ 为同一函数写出参数类型完全相同的两个方法，后一个静默覆盖前一个",
    "ec": "Julia 允许重定义方法，同签名会替换旧实现而不报错，容易丢失逻辑。新增行为时应改变参数类型或参数个数，并用 methods(f) 确认方法列表符合预期。",
    "q": [
      {
        "q": "如何查看某个调用命中了哪个方法？",
        "a": "using InteractiveUtils 后调用 @which f(args)。"
      },
      {
        "q": "∘ 与 |> 的区别？",
        "a": "f ∘ g 生成新函数 f(g(x))；x |> f 立即把 x 传给 f。"
      }
    ]
  },
  {
    "id": 12,
    "t": "作用域与闭包",
    "p": [
      "Julia 有全局、局部、硬作用域与软作用域之分，函数与 let 块内部是硬作用域",
      "在函数内给全局变量赋值会创建同名局部变量，需要 global 才能修改全局绑定",
      "闭包会捕获外部局部变量，多个闭包可以共享同一份捕获的变量绑定",
      "循环体在函数内是硬作用域；在脚本顶层循环给新变量赋值会受到软作用域限制"
    ],
    "c": "function make_counter()\n    count = 0\n    function incr()\n        count += 1\n        return count\n    end\n    incr\nend\n\nc1 = make_counter()\nc2 = make_counter()\nprintln(c1(), \" \", c1(), \" \", c1())\nprintln(c2())\n\nx = 1\nf() = x + 1                 # 捕获全局 x，调用时读取当前值\nx = 10\nprintln(f())\n\nlet y = 5\n    g = () -> y * 2\n    println(g())\nend",
    "et": "❌ 在脚本顶层循环中给新变量赋值，却期待它成为全局变量",
    "ec": "顶层循环是软作用域：循环内新赋值的变量不会自动成为全局变量，循环外访问会未定义。把逻辑包进函数，或在使用前显式 global 声明，可避免此类问题。",
    "q": [
      {
        "q": "两个闭包捕获同一局部变量时会互相影响吗？",
        "a": "会，它们共享同一份捕获的变量绑定。"
      },
      {
        "q": "如何在函数内修改全局变量？",
        "a": "使用 global 关键字声明，例如 global counter += 1。"
      }
    ]
  },
  {
    "id": 13,
    "t": "结构体",
    "p": [
      "struct 定义不可变复合类型，字段类型可写成具体类型或类型参数 T",
      "mutable struct 的字段可修改；不可变结构体改字段需构造新实例",
      "构造器分内层与外层：内层校验字段，外层可用 promote 做类型提升",
      "@kwdef 生成关键字构造器；fieldnames、getfield 可反射访问字段"
    ],
    "c": "struct Point{T<:Real}\n    x::T\n    y::T\nend\n\nPoint(x::Real, y::Real) = Point(promote(x, y)...)\n\nmutable struct Counter\n    n::Int\nend\n\np = Point(1, 2.5)            # 外层构造器提升为 Float64\nprintln(p, \" \", p.x, \" \", typeof(p))\n\nc = Counter(0)\nc.n += 1\nprintln(\"n = \", c.n)\n\nprintln(fieldnames(Point))\nprintln(getfield(p, :y))\nprintln(Point{Float64}(3.0, 4.0))",
    "et": "❌ 对不可变 struct 的字段赋值，或忘记定义外层构造器",
    "ec": "不可变结构体的字段在构造后不能修改，p.x = 2 会报错，应构造新实例。字段类型不同时，内层构造器不会自动提升，需要自己写外层构造器调用 promote。",
    "q": [
      {
        "q": "不可变结构体如何修改字段？",
        "a": "用构造器创建新实例，例如 Point(2.0, p.y)。"
      },
      {
        "q": "fieldnames(Point) 返回什么？",
        "a": "返回字段名元组 (:x, :y)。"
      }
    ]
  },
  {
    "id": 14,
    "t": "多态与类型层次",
    "p": [
      "Julia 没有类继承，只有类型层次：抽象类型作父节点，具体类型用 <: 声明子类型",
      "抽象类型不能实例化，只用于组织类型树并声明接口约定，行为由子类型实现",
      "多态由多重派发实现：为同一函数的不同子类型写方法，运行时自动分派",
      "supertype 查看父类型，subtypes 查看直接子类型，isa 判断实例是否属于某类型"
    ],
    "c": "abstract type Shape end\n\nstruct Circle <: Shape\n    r::Float64\nend\n\nstruct Rect <: Shape\n    w::Float64\n    h::Float64\nend\n\narea(s::Circle) = π * s.r^2\narea(s::Rect) = s.w * s.h\n\nfor s in (Circle(1.0), Rect(2.0, 3.0))\n    println(typeof(s), \" 面积 = \", round(area(s), digits=2))\nend\nprintln(Circle <: Shape, \" \", supertype(Circle))",
    "et": "❌ 试图用继承复用字段，或直接实例化抽象类型",
    "ec": "Julia 的抽象类型没有字段，Shape(1) 会报错。复用应通过组合：把公共字段放进具体结构体，或定义带参数的抽象类型，再让子类型实现接口函数。",
    "q": [
      {
        "q": "Julia 如何实现运行时多态？",
        "a": "为抽象类型的各子类型定义同名方法，由多重派发选择实现。"
      },
      {
        "q": "如何判断某类型是否为 Shape 的子类型？",
        "a": "使用 Circle <: Shape，实例则用 isa(s, Shape)。"
      }
    ]
  },
  {
    "id": 15,
    "t": "接口、协议与抽象",
    "p": [
      "Julia 的接口是约定而非声明：只要类型实现了所需函数，就能用于相应算法",
      "常见接口包括 iterate 可迭代、show 显示、== 相等、isless 排序、hash 哈希",
      "扩展 Base 函数需写成 Base.show(io, x)，避免直接覆盖造成方法冲突",
      "可用 hasmethod 检查方法是否存在；特征模式常用单例类型表达能力"
    ],
    "c": "struct Temp\n    celsius::Float64\nend\n\nBase.show(io::IO, t::Temp) = print(io, t.celsius, \"°C\")\nBase.:(==)(a::Temp, b::Temp) = a.celsius == b.celsius\nBase.isless(a::Temp, b::Temp) = a.celsius < b.celsius\n\nfunction Base.iterate(t::Temp, i=1)\n    i > 2 && return nothing\n    value = i == 1 ? t.celsius : t.celsius * 9 / 5 + 32\n    return (value, i + 1)\nend\nBase.length(::Temp) = 2\n\nt = Temp(25.0)\nprintln(t, \" \", t == Temp(25.0), \" \", Temp(10.0) < Temp(20.0))\nprintln(collect(t))\nprintln(join([string(x) for x in t], \", \"))",
    "et": "❌ 直接定义 show(x) 而不写 Base.show(io::IO, x)，导致显示异常",
    "ec": "Julia 的显示接口是双参数形式，第一个参数是 IO。只写单参数版本不会被调用，还会与 Base 中的方法混淆；扩展 Base 函数必须显式写 Base. 前缀。",
    "q": [
      {
        "q": "一个类型要能用于 for 循环需实现什么？",
        "a": "实现 Base.iterate，返回 (值, 下一状态)，结束返回 nothing。"
      },
      {
        "q": "为什么不能给函数定义同签名的重复方法？",
        "a": "同签名会覆盖旧方法且不报错，容易悄悄改变行为。"
      }
    ]
  },
  {
    "id": 16,
    "t": "泛型与类型参数",
    "p": [
      "参数化类型写作 struct Box{T}，T 可为任意类型，也可约束为 T<:Number",
      "where 子句声明方法上的类型参数，Vector{<:Real} 表示元素为实数的任意向量",
      "Julia 的类型参数在编译期确定，能生成特化代码，减少运行时开销",
      "Union{Int,String} 表示并集类型；Any 是顶层类型，Union{} 是底层类型"
    ],
    "c": "struct Box{T}\n    value::T\nend\n\nunwrap(b::Box{T}) where {T} = b.value\nBase.show(io::IO, b::Box{T}) where {T} = print(io, \"Box{\", T, \"}(\", b.value, \")\")\n\nb1 = Box(42)\nb2 = Box(\"hi\")\nprintln(b1, \" \", b2)\nprintln(unwrap(b1), \" \", unwrap(b2))\n\ntotal(xs::AbstractVector{<:Number}) = sum(xs)\nprintln(total([1, 2, 3]), \" \", total([1.0, 2.5]))\n\nprintln(typeof(Box{Int}), \" \", Box{Int} <: Box)\nprintln(Box(1) isa Box{<:Integer})",
    "et": "❌ 以为 Vector{Int} 与 Vector{Float64} 可以互相赋值",
    "ec": "参数化类型默认不变，Vector{Int} 不是 Vector{Float64} 的子类型，传参会报 MethodError。需要同时接受两者时，应写 AbstractVector{<:Real} 这类带约束的签名。",
    "q": [
      {
        "q": "如何让函数接受任意数值元素向量？",
        "a": "参数写成 xs::AbstractVector{<:Real}。"
      },
      {
        "q": "Box 与 Box{Int} 是什么关系？",
        "a": "Box 是 UnionAll 类型，Box{Int} 是它的具体实例化。"
      }
    ]
  },
  {
    "id": 17,
    "t": "错误处理",
    "p": [
      "异常用 throw 抛出、try/catch 捕获；缺失值可用 nothing 或 missing 表示",
      "catch e 捕获异常对象，finally 无论是否异常都会执行，适合释放资源",
      "自定义异常只需定义 struct MyError <: Exception，并实现 Base.showerror",
      "@assert 做断言，@warn/@error 写日志；不要在正常控制流中滥用异常"
    ],
    "c": "struct ValidationError <: Exception\n    msg::String\nend\nBase.showerror(io::IO, e::ValidationError) = print(io, \"校验失败: \", e.msg)\n\nfunction parse_age(s)\n    n = tryparse(Int, s)\n    n === nothing && throw(ValidationError(\"不是整数\"))\n    0 <= n <= 150 || throw(ValidationError(\"年龄越界\"))\n    n\nend\n\nfor s in (\"30\", \"abc\", \"-5\")\n    try\n        println(\"年龄: \", parse_age(s))\n    catch e\n        println(\"捕获: \", sprint(showerror, e))\n    finally\n        println(\"--- 检查结束\")\n    end\nend",
    "et": "❌ 捕获异常后只写 catch 而不绑定变量，或吞掉错误继续执行",
    "ec": "catch e 才能拿到异常对象；裸 catch 会丢失信息。捕获后若无法恢复，应重新 throw 或记录日志，不要静默返回错误的值，否则问题会延迟暴露。",
    "q": [
      {
        "q": "try/catch 中 finally 何时执行？",
        "a": "无论是否抛出异常都会执行，常用于关闭文件或释放锁。"
      },
      {
        "q": "如何基于错误信息生成字符串？",
        "a": "sprint(showerror, e)。"
      }
    ]
  },
  {
    "id": 18,
    "t": "文件 I/O",
    "p": [
      "open(path, \"r\") do io ... end 是推荐写法，块结束时自动关闭文件句柄",
      "read(path, String) 一次读入全部内容，readlines 读成行数组，eachline 惰性逐行",
      "写入用 open(path, \"w\") 或 \"a\" 追加模式，print/println 直接写入 IO 对象",
      "路径处理用 joinpath、basename、dirname；临时文件用 mktemp 或 tempname"
    ],
    "c": "path = \"demo.txt\"\nopen(path, \"w\") do io\n    println(io, \"第一行\")\n    println(io, \"第二行\")\nend\nprintln(readlines(path))\n\nopen(path, \"a\") do io\n    print(io, \"追加内容\")\nend\nprintln(read(path, String))\nprintln(filesize(path), \" 字节\")\n\nfor (i, line) in enumerate(eachline(path))\n    println(i, \": \", chomp(line))\nend\nrm(path)",
    "et": "❌ 打开文件后忘记关闭，或对同一文件重复打开写入导致内容被覆盖",
    "ec": "忘记 close 会泄漏句柄，在 Windows 上还会阻止删除。用 do 块可自动关闭；写模式 \"w\" 每次都会清空文件，追加内容必须用 \"a\" 模式。",
    "q": [
      {
        "q": "为什么推荐 open 的 do 块写法？",
        "a": "块结束自动关闭文件，即使中途抛异常也能释放资源。"
      },
      {
        "q": "逐行读取大文件应使用什么？",
        "a": "eachline，它惰性产生行，不会一次性读入内存。"
      }
    ]
  },
  {
    "id": 19,
    "t": "正则表达式",
    "p": [
      "Julia 用 r\"...\" 构造 PCRE2 正则，i、m、s、x 等标志写在结尾引号后",
      "match 返回首个匹配对象，可用 m.match 与 m.captures 取整体与分组",
      "eachmatch 返回所有匹配的迭代器，适合逐条提取结构化信息",
      "replace 可配合正则与替换串，split 支持正则分隔符，occursin 判断是否包含"
    ],
    "c": "s = \"订单 A100 金额 250 元，订单 B200 金额 89 元\"\n\nm = match(r\"([A-Z])(\\d+)\", s)\nprintln(m.match, \" \", m.captures)\n\nfor mm in eachmatch(r\"订单\\s+([A-Z]\\d+).*?(\\d+)\", s)\n    println(mm[1], \" => \", mm[2])\nend\n\nprintln(occursin(r\"\\d{3}\", s))\nprintln(replace(s, r\"订单\" => \"单号\"))\nprintln(replace(\"a1b2\", r\"(\\d)\" => s\"<\\1>\"))\nprintln(split(\"a, b;;c\", r\"[,;]+\\s*\"))\nprintln(join([m.match for m in eachmatch(r\"\\d+\", s)], \",\"))",
    "et": "❌ 在普通字符串里写 \"\\\\d+\" 当作正则，导致反斜杠被二次转义",
    "ec": "普通字符串会处理转义序列，写正则容易多一层反斜杠。应使用 r\"\\d+\" 原始字符串宏，正则内容原样传递；替换串则用 s\"...\" 支持 \\1 反向引用。",
    "q": [
      {
        "q": "match 与 eachmatch 的区别？",
        "a": "match 返回第一个匹配，eachmatch 返回所有匹配的迭代器。"
      },
      {
        "q": "如何用正则拆分字符串？",
        "a": "split(s, r\"[,;]+\")。"
      }
    ]
  },
  {
    "id": 20,
    "t": "模块与包管理",
    "p": [
      "module 定义命名空间，export 列出对外名称，using 引入并展开导出名",
      "import 只引入模块名，调用时需写限定名，可避免命名冲突",
      "Pkg 管理依赖：add、rm、update、status、instantiate，环境由 Project.toml 记录",
      "开发本地包用 Pkg.develop(path=...)，切换环境用 Pkg.activate 指定目录"
    ],
    "c": "module Geometry\nexport area, Circle\n\nstruct Circle\n    r::Float64\nend\n\narea(c::Circle) = π * c.r^2\nend\n\nusing .Geometry\nprintln(Geometry.area(Circle(2.0)))\n\n# 在项目目录中执行：\n# julia --project=. -e 'using Pkg; Pkg.add(\"DataFrames\")'\n# julia --project=. -e 'using Pkg; Pkg.status()'\n# julia --project=. -e 'using Pkg; Pkg.instantiate()'\n# julia --project=. -e 'using Pkg; Pkg.rm(\"DataFrames\")'",
    "et": "❌ 在脚本里重复写 using 却从不创建 Project.toml，依赖无法复现",
    "ec": "全局环境的依赖会随机器变化，他人无法还原。应为项目执行 Pkg.activate(\".\") 或使用 --project=. 启动，让依赖写入 Project.toml 与 Manifest.toml 并纳入版本控制。",
    "q": [
      {
        "q": "using 与 import 的区别？",
        "a": "using 展开导出名称，import 只引入模块名、需写限定名。"
      },
      {
        "q": "如何安装并记录一个依赖？",
        "a": "在项目环境中执行 Pkg.add(\"包名\")，会更新 Project.toml。"
      }
    ]
  },
  {
    "id": 21,
    "t": "标准库速查与工具链",
    "p": [
      "包管理用内置 Pkg，项目由 Project.toml 指定环境，命令前加 --project=.",
      "测试框架是标准库 Test，用 @testset 与 @test 组织，Pkg.test 一键运行",
      "格式化用 JuliaFormatter.jl，交互调试用 Debugger.jl 的 @enter 与 @run",
      "性能剖析用 BenchmarkTools 与 Profile；代码检查可用 JET.jl 做静态分析"
    ],
    "c": "# ---- 包管理 ----\n# julia --project=. -e 'using Pkg; Pkg.add(\"DataFrames\")'\n# julia --project=. -e 'using Pkg; Pkg.update(); Pkg.status()'\n# julia --project=. -e 'using Pkg; Pkg.test()'\n# ---- 测试 ----\n# julia --project=. test/runtests.jl\n# ---- 格式化与调试 ----\n# julia -e 'using JuliaFormatter; format(\".\")'\n# julia -e 'using Debugger; @enter myfunc(3)'\n# ---- 运行与打包 ----\n# julia src/main.jl\n# julia --project=. src/main.jl\n# julia -e 'using PackageCompiler; create_app(\".\", \"build\")'\nusing Test, Dates\n@testset \"工具链自检\" begin\n    @test today() isa Date\n    @test 2^10 == 1024\nend\nprintln(\"自检完成\")",
    "et": "❌ 直接运行 julia src/main.jl 却期待加载项目依赖，结果报包找不到",
    "ec": "不加 --project 时 Julia 使用默认全局环境，项目依赖不可见。应统一用 julia --project=. 启动，脚本内需要临时切换时调用 Pkg.activate(\".\")。",
    "q": [
      {
        "q": "运行项目测试的标准命令？",
        "a": "julia --project=. -e 'using Pkg; Pkg.test()'。"
      },
      {
        "q": "JuliaFormatter 如何格式化整个目录？",
        "a": "using JuliaFormatter; format(\".\")。"
      }
    ]
  },
  {
    "id": 22,
    "t": "并发与异步",
    "p": [
      "Task 是 Julia 的轻量协程，@async 立即调度，@sync 等待块内所有任务完成",
      "Channel 是带缓冲的消息队列，put! 写入、take! 读取、close 关闭",
      "多线程用 Threads.@spawn 创建任务，Threads.@threads 并行化 for 循环",
      "共享数据要加锁或使用原子操作，避免数据竞争；启动时用 -t 指定线程数"
    ],
    "c": "using Base.Threads\n\nch = Channel{Int}(4)\n@sync begin\n    @async begin\n        for i in 1:5\n            put!(ch, i * i)\n        end\n        close(ch)\n    end\n    @async for v in ch\n        println(\"收到 $v（线程 $(threadid())）\")\n    end\nend\n\nresults = zeros(Int, 4)\n@threads for i in 1:4\n    results[i] = i^2\nend\nprintln(results)\n\nt = @spawn sum(1:1_000_000)\nprintln(fetch(t))",
    "et": "❌ 多个线程同时 push! 同一个普通数组，造成数据损坏或计数错误",
    "ec": "Array 不是线程安全的，并发写入会丢数据。应使用 Lock 加锁、Channel 传递结果，或按索引写入互不重叠的位置；启动时用 julia -t 4 才会真正多线程。",
    "q": [
      {
        "q": "如何等待 @sync 块内所有任务结束？",
        "a": "@sync 会自动等待块内由 @async 或 @spawn 启动的任务。"
      },
      {
        "q": "Channel 满了以后 put! 会怎样？",
        "a": "会阻塞直到有消费者取走数据，这是一种背压机制。"
      }
    ]
  },
  {
    "id": 23,
    "t": "性能优化",
    "p": [
      "性能第一原则是类型稳定：函数返回类型应当能够由参数类型推断出来",
      "@code_warntype 标红类型不稳定处；避免全局变量，必要时声明为 const",
      "用 view 避免切片拷贝，@inbounds 跳过边界检查，@simd 提示向量化",
      "BenchmarkTools 的 @btime 做可靠计时，@allocated 观察内存分配"
    ],
    "c": "using BenchmarkTools, InteractiveUtils\n\nfunction bad(n)\n    s = 0\n    for i in 1:n\n        s += i\n    end\n    s\nend\n\ngood(n) = n * (n + 1) ÷ 2\n\n@btime bad(10^6)\n@btime good(10^6)\n\n@code_warntype good(10)\n\nconst TABLE = Dict(1 => \"一\", 2 => \"二\")\nf(x) = get(TABLE, x, \"?\")\nprintln(f(2))\nprintln(\"分配字节数: \", @allocated good(1000))",
    "et": "❌ 在全局作用域循环里操作全局变量，然后抱怨代码比 C 慢几十倍",
    "ec": "全局变量类型不稳定，每次读写都可能触发动态查找与装箱。应把热点逻辑放进函数，把类型不变的全局量声明为 const，并用 @code_warntype 确认没有红色 Any。",
    "q": [
      {
        "q": "如何检查函数是否存在类型不稳定？",
        "a": "using InteractiveUtils 后调用 @code_warntype f(参数)。"
      },
      {
        "q": "@btime 与 @time 的区别？",
        "a": "@btime 多次采样并统计开销，结果更可靠；@time 只跑一次。"
      }
    ]
  },
  {
    "id": 24,
    "t": "测试",
    "p": [
      "测试写在 test/runtests.jl，用 using Test 引入标准库，Pkg.test() 执行",
      "@test 断言表达式为真，@test_throws 断言抛出指定异常，≈ 用于浮点近似",
      "@testset 分组并汇总结果，支持嵌套；失败时给出表达式与上下文",
      "测试应覆盖正常路径、边界值与错误路径，确保重构时外部行为保持不变"
    ],
    "c": "using Test\n\nmodule Calc\nexport add, divide\nadd(a, b) = a + b\nfunction divide(a, b)\n    b == 0 && throw(DivideError())\n    a / b\nend\nend\n\n@testset \"Calc 测试\" begin\n    @test Calc.add(2, 3) == 5\n    @test Calc.divide(10, 4) ≈ 2.5\n    @test_throws DivideError Calc.divide(1, 0)\n    @testset \"边界情况\" begin\n        @test Calc.add(0, 0) == 0\n        @test Calc.divide(0, 5) == 0\n    end\nend",
    "et": "❌ 只用 == 比较浮点结果，测试随机失败",
    "ec": "浮点运算存在舍入误差，0.1 + 0.2 == 0.3 为 false。应使用 ≈（isapprox）并必要时指定 rtol，或比较 round 后的值，避免测试结果依赖平台与编译器优化。",
    "q": [
      {
        "q": "如何断言某调用会抛异常？",
        "a": "@test_throws 异常类型 表达式。"
      },
      {
        "q": "测试文件应放在哪里？",
        "a": "包的 test/runtests.jl，Pkg.test() 会自动执行。"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧",
    "p": [
      "日志用 @debug/@info/@warn/@error，配合 Logging 包可自定义日志处理器",
      "Debugger.jl 提供 @enter 单步进入函数，@run 运行到断点，可查看局部变量",
      "@which 查看调用的方法，@code_lowered 看降级代码，@code_typed 看类型推断",
      "宏在编译期把代码展开为普通表达式，@enter、@code_warntype 都是宏，可用 macroexpand 查看结果",
      "JET.jl 静态检查类型错误，Profile 与 PProf 定位热点，栈信息用 catch_backtrace"
    ],
    "c": "using Logging\n\nfunction risky(x)\n    @debug \"进入 risky\" x\n    x < 0 && @warn \"收到负数\" x\n    x == 0 && error(\"x 不能为 0\")\n    sqrt(x)\nend\n\nwith_logger(ConsoleLogger(stderr, Logging.Debug)) do\n    println(risky(4))\nend\n\ntry\n    risky(0)\ncatch e\n    println(\"错误类型: \", typeof(e))\n    println(\"栈帧数: \", length(stacktrace(catch_backtrace())))\nend",
    "et": "❌ 在热循环里大量使用 @info 打印，调试完忘记删除导致性能骤降",
    "ec": "日志即使级别被过滤也有调用开销，热路径中应使用 @debug 并配置级别，或先用 Debugger 定位。提交前搜索残留的 println 与 @info，避免污染标准输出。",
    "q": [
      {
        "q": "如何进入函数逐行调试？",
        "a": "using Debugger 后执行 @enter f(args)。"
      },
      {
        "q": "如何查看某次调用实际命中的方法？",
        "a": "@which f(args)。"
      }
    ]
  },
  {
    "id": 26,
    "t": "FFI 与系统互操作",
    "p": [
      "ccall 直接调用 C 函数，需声明返回类型与参数类型元组，注意类型映射",
      "@ccall 提供更接近 C 的调用语法，可用 :: 指定返回类型",
      "Libdl 动态加载共享库；unsafe_wrap 可把裸指针包装成数组，必须保证生命周期",
      "调用外部命令用 run 或 read；与 Python 互操作可用 PyCall 或 PythonCall"
    ],
    "c": "len = ccall(:strlen, Csize_t, (Cstring,), \"Julia FFI\")\nprintln(\"strlen = \", len)\n\nffi_len = @ccall strlen(\"Julia FFI\")::Csize_t\nprintln(\"strlen(@ccall) = \", ffi_len)\n\nptr = Libc.malloc(16)\ntry\n    unsafe_store!(Ptr{UInt8}(ptr), 0x41)\n    println(\"首字节: \", unsafe_load(Ptr{UInt8}(ptr)))\nfinally\n    Libc.free(ptr)\nend\n\nprintln(strip(read(`echo 来自外部命令`, String)))\nprintln(\"命令成功: \", success(`true`))",
    "et": "❌ 把 Julia 字符串直接传给需要 Cstring 的 C 函数后长期保存该指针",
    "ec": "Julia 字符串不保证以 NUL 结尾，GC 也可能移动对象；Cstring 只在调用期间有效。若 C 侧要保存指针，应复制到 malloc 的内存或使用 GC.@preserve 保护。",
    "q": [
      {
        "q": "ccall 的第二个参数是什么？",
        "a": "C 函数的返回类型，如 Csize_t、Cint。"
      },
      {
        "q": "如何安全执行外部命令并读取输出？",
        "a": "read(`cmd args`, String)，参数分开写可避免 shell 注入。"
      }
    ]
  },
  {
    "id": 27,
    "t": "设计模式",
    "p": [
      "用单例类型配合多重派发实现策略模式，比冗长的条件分支更容易扩展",
      "组合优于继承：把行为拆成小函数，用结构体字段保存可替换的组件",
      "可调用对象通过 (obj)(args) 定义，让实例像函数一样使用",
      "记忆化用 Dict 加 get! 实现；避免类型盗版——不要给他人类型乱加方法"
    ],
    "c": "abstract type Strategy end\nstruct Add <: Strategy end\nstruct Mul <: Strategy end\n\napply(::Add, a, b) = a + b\napply(::Mul, a, b) = a * b\n\nstruct Calculator{S<:Strategy}\n    strategy::S\nend\n(c::Calculator)(a, b) = apply(c.strategy, a, b)\n\nadd = Calculator(Add())\nmul = Calculator(Mul())\nprintln(add(3, 4), \" \", mul(3, 4))\n\nconst memo = Dict{Int,Int}()\nfunction fib(n)\n    n <= 1 && return n\n    get!(memo, n) do\n        fib(n - 1) + fib(n - 2)\n    end\nend\nprintln(fib(30))",
    "et": "❌ 用大量 if/elseif 判断类型来实现行为分派，新增类型时到处改代码",
    "ec": "这类分支违背开闭原则且易漏改。应把行为写成按类型分派的方法，新增类型只需新增一组方法；同时不要给 Base 或他人包的类型随意加方法，避免类型盗版。",
    "q": [
      {
        "q": "如何让结构体实例像函数一样调用？",
        "a": "定义 (c::Calculator)(a, b) = ...。"
      },
      {
        "q": "记忆化缓存的常见实现？",
        "a": "用 Dict 保存参数到结果的映射，配合 get! 计算并写入。"
      }
    ]
  },
  {
    "id": 28,
    "t": "数据库访问",
    "p": [
      "Julia 通过 DBInterface 统一数据库接口，SQLite.jl、LibPQ.jl、MySQL.jl 都实现它",
      "SQLite.DB 打开数据库，DBInterface.execute 执行 SQL 并返回可迭代结果",
      "始终使用参数化查询，把变量作为参数传入，避免拼接 SQL 导致注入",
      "查询结果可直接传给 DataFrame 构造器，便于用 DataFrames 做后续分析"
    ],
    "c": "using SQLite, DBInterface, DataFrames\n\ndb = SQLite.DB(\":memory:\")\nDBInterface.execute(db, \"\"\"\nCREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)\n\"\"\")\nDBInterface.execute(db, \"INSERT INTO users (name, age) VALUES (?, ?)\", (\"小明\", 28))\nDBInterface.execute(db, \"INSERT INTO users (name, age) VALUES (?, ?)\", (\"小红\", 34))\n\ndf = DataFrame(DBInterface.execute(db, \"SELECT * FROM users ORDER BY age DESC\"))\nprintln(df)\n\nstmt = DBInterface.prepare(db, \"SELECT name FROM users WHERE age > ?\")\nprintln(collect(DBInterface.execute(stmt, (30,))))\nclose(db)",
    "et": "❌ 用字符串拼接把用户输入放进 SQL，例如 \"... WHERE name = '\" * name * \"'\"",
    "ec": "拼接会让 ' OR 1=1 -- 之类的输入改变语义，造成注入。应使用 ? 占位符并把值作为第二个参数传入，驱动会负责转义与类型绑定。",
    "q": [
      {
        "q": "SQLite 内存数据库的连接字符串是什么？",
        "a": "SQLite.DB(\":memory:\")。"
      },
      {
        "q": "如何防止 SQL 注入？",
        "a": "使用参数化查询，把变量作为 execute 的第二个参数传入。"
      }
    ]
  },
  {
    "id": 29,
    "t": "网络与 HTTP",
    "p": [
      "HTTP.jl 同时提供客户端与服务端：HTTP.get 发请求，HTTP.serve 启服务",
      "HTTP.Router 按方法与路径注册处理函数，处理函数接收请求并返回 Response",
      "响应体可返回字符串或字节数组，JSON 用 JSON3.jl 或 JSON.jl 编解码",
      "生产环境应设置超时、限制请求体大小，并在反向代理之后运行服务"
    ],
    "c": "using HTTP, JSON3\n\nrouter = HTTP.Router()\nHTTP.@register(router, \"GET\", \"/hello\", req -> HTTP.Response(200, \"你好，Julia!\"))\nHTTP.@register(router, \"GET\", \"/api/user/\", req -> begin\n    body = JSON3.write((name=\"小明\", age=28))\n    HTTP.Response(200, [\"Content-Type\" => \"application/json\"], body)\nend)\n\nserver = HTTP.serve!(router, 8080)\nprintln(\"已启动 http://127.0.0.1:8080/hello\")\n\nsleep(1)\nresp = HTTP.get(\"http://127.0.0.1:8080/hello\")\nprintln(resp.status, \" \", String(resp.body))\n\nclose(server)\nprintln(\"服务已关闭\")",
    "et": "❌ 在服务处理函数中执行长时间阻塞操作，导致其他请求全部排队",
    "ec": "Julia 的 HTTP 服务默认在少量任务上处理请求，阻塞调用会拖慢并发。应把耗时任务交给 @async 或线程池，并设置客户端超时与请求体大小上限。",
    "q": [
      {
        "q": "HTTP.jl 如何注册路由？",
        "a": "HTTP.@register(router, \"GET\", \"/path\", handler)。"
      },
      {
        "q": "响应 JSON 需要设置什么头？",
        "a": "Content-Type: application/json，响应体为 JSON 字符串。"
      }
    ]
  },
  {
    "id": 30,
    "t": "安全编程",
    "p": [
      "绝不把用户输入交给 eval 或 include_string 执行，这是最危险的注入入口",
      "SQL 使用参数绑定；命令行参数用 Cmd 数组形式，避免 shell 拼接",
      "密钥从环境变量读取，不要写进源码；密码存储需加盐并使用慢哈希",
      "固定依赖版本并审查来源，定期在 Pkg.update 后跑测试，避免供应链风险"
    ],
    "c": "using SHA, Random\n\nfunction hash_password(pw::AbstractString, salt::AbstractString)\n    bytes2hex(sha256(salt * pw))\nend\n\nsalt = randstring(16)\nh = hash_password(\"s3cret!\", salt)\nprintln(\"盐: \", salt)\nprintln(\"摘要前 16 位: \", first(h, 16))\n\nfunction valid_age(s)\n    m = match(r\"^\\d{1,3}$\", strip(s))\n    m === nothing && throw(ArgumentError(\"年龄必须是 1-3 位数字\"))\n    parse(Int, m.match)\nend\nprintln(valid_age(\" 42 \"))\n\nkey = get(ENV, \"APP_API_KEY\", \"\")\nisempty(key) && @warn \"未设置 APP_API_KEY，示例服务拒绝启动\"\nprintln(\"密钥长度: \", length(key))",
    "et": "❌ 用 sha256 直接存密码，或把密钥硬编码在源码与提交记录里",
    "ec": "普通哈希速度太快，易被字典与暴力破解；密码应使用 bcrypt/scrypt/Argon2 并加随机盐。密钥放环境变量或密钥管理服务，且不要提交到 Git 历史中。",
    "q": [
      {
        "q": "为什么不能用 eval 处理用户输入？",
        "a": "eval 会执行任意 Julia 代码，等同于把服务器控制权交给攻击者。"
      },
      {
        "q": "密码存储应使用什么算法？",
        "a": "bcrypt、scrypt 或 Argon2 等带盐的慢哈希。"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战：命令行工具",
    "p": [
      "命令行工具从 ARGS 读取参数，用 exit(main(ARGS)) 返回退出码",
      "参数解析可用 ArgParse.jl，定义选项、默认值与帮助信息更规范",
      "文件处理要检查 isfile、捕获 IO 异常，并给出可读的错误提示",
      "输出对齐用 lpad/rpad，错误信息写 stderr，正常结果写 stdout"
    ],
    "c": "function main(args)\n    isempty(args) && begin\n        println(stderr, \"用法: julia wc.jl <文件...>\")\n        return 1\n    end\n    total = 0\n    for path in args\n        if !isfile(path)\n            println(stderr, \"跳过不存在的文件: \", path)\n            continue\n        end\n        n = countlines(path)\n        total += n\n        println(lpad(n, 6), \"  \", path)\n    end\n    println(lpad(total, 6), \"  总计\")\n    return 0\nend\n\nexit(main(ARGS))",
    "et": "❌ 把退出码写成字符串或忘记 exit，脚本总是以 0 结束",
    "ec": "Shell 依据退出码判断成功与否，失败时若仍返回 0，CI 与调用方会误判。应让 main 返回整数并以 exit(main(ARGS)) 结束，参数错误时返回非零值。",
    "q": [
      {
        "q": "Julia 脚本如何获取命令行参数？",
        "a": "全局常量 ARGS，类型为 Vector{String}。"
      },
      {
        "q": "为什么错误信息写 stderr？",
        "a": "避免与正常输出混在一起，便于管道与重定向分别处理。"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战：服务与数据处理",
    "p": [
      "数据处理流程通常是读取、清洗、分组聚合、输出，DataFrames 提供完整能力",
      "CSV.read 读入表格，filter 按条件筛选，transform 新增列",
      "groupby 加 combine 做分组统计，sort! 排序，describe 查看分布",
      "对外提供结果可包一层 HTTP 服务，把查询参数映射为数据处理逻辑"
    ],
    "c": "using DataFrames, CSV, Statistics\n\ncsv = \"\"\"name,dept,salary\n小明,研发,18000\n小红,研发,22000\n小刚,市场,15000\n小美,市场,16000\n\"\"\"\ndf = CSV.read(IOBuffer(csv), DataFrame)\nprintln(size(df))\n\nresult = combine(groupby(df, :dept),\n    :salary => mean => :avg,\n    :salary => maximum => :max_salary,\n    nrow => :人数)\nsort!(result, :avg, rev=true)\nprintln(result)\n\nprintln(filter(row -> row.salary > 16000, df))\nprintln(describe(df, :mean, :min, :max))",
    "et": "❌ 用普通字符串手写 CSV 解析，遇到引号、逗号或换行就出错",
    "ec": "CSV 格式有转义、引号包裹与编码等细节，手写解析极易翻车。应使用 CSV.jl，并显式指定分隔符、缺失值表示与列类型，避免自动推断带来的意外。",
    "q": [
      {
        "q": "如何按部门计算平均工资？",
        "a": "combine(groupby(df, :dept), :salary => mean => :avg)。"
      },
      {
        "q": "过滤行的推荐写法？",
        "a": "filter(:salary => >(16000), df) 或 filter(row -> ..., df)。"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建部署与发布",
    "p": [
      "Project.toml 记录名称、UUID、版本与兼容范围，Manifest.toml 锁定精确版本",
      "PackageCompiler.jl 可把项目编译成独立可执行程序，缩短启动时间",
      "容器部署建议固定 Julia 基础镜像版本，构建阶段执行 Pkg.instantiate",
      "发布遵循语义化版本；注册包需通过 General 仓库的自动合并流程"
    ],
    "c": "# Project.toml 关键字段\n# name = \"MyApp\"\n# uuid = \"b7f3c2a1-5d4e-4f6a-9c8b-1a2d3e4f5a6b\"  # 用 UUIDs.uuid4() 生成\n# version = \"0.1.0\"\n# [deps]\n# DataFrames = \"a93c6f00-e57d-5684-b7b6-d8193f3e46c0\"\n# [compat]\n# DataFrames = \"1\"\n# --- 构建独立应用 ---\n# julia -e 'using Pkg; Pkg.add(\"PackageCompiler\")'\n# julia -e 'using PackageCompiler; create_app(\".\", \"build\"; incremental=false)'\n# ./build/bin/MyApp\n# --- Docker 部署 ---\n# FROM julia:1.10-bookworm\n# COPY . /app\n# WORKDIR /app\n# RUN julia --project=. -e 'using Pkg; Pkg.instantiate()'\n# CMD [\"julia\", \"--project=.\", \"src/main.jl\"]",
    "et": "❌ 提交了 Project.toml 却删除 Manifest.toml，导致线上依赖版本漂移",
    "ec": "只有 Project.toml 时，解析依赖可能得到不同的次版本，行为随之变化。应用项目应提交 Manifest.toml 锁定精确版本，用 Pkg.instantiate 在部署环境还原。",
    "q": [
      {
        "q": "生成包 UUID 的命令？",
        "a": "julia -e 'using UUIDs; println(uuid4())'。"
      },
      {
        "q": "PackageCompiler 的作用？",
        "a": "把 Julia 项目与运行时打包成独立可执行程序，降低启动延迟。"
      }
    ]
  },
  {
    "id": 34,
    "t": "最佳实践",
    "p": [
      "函数保持小而纯，输入输出明确；把副作用集中在边界层，便于测试",
      "全局变量尽量用 const，热路径避免动态类型与不必要的内存分配",
      "命名遵循官方风格指南，类型用大驼峰，函数用蛇形，模块名首字母大写",
      "写文档字符串、补测试、用 JuliaFormatter 统一格式，提交前跑测试"
    ],
    "c": "# 返回去均值并缩放到单位方差的向量\nfunction normalized(xs::AbstractVector{<:Real})\n    isempty(xs) && throw(ArgumentError(\"输入不能为空\"))\n    μ = sum(xs) / length(xs)\n    σ = sqrt(sum((x - μ)^2 for x in xs) / length(xs))\n    σ == 0 && return zeros(eltype(xs), length(xs))\n    [(x - μ) / σ for x in xs]\nend\n\nprintln(round.(normalized([1.0, 2.0, 3.0]), digits=3))\nprintln(round.(normalized([5.0, 5.0]), digits=3))\n\n# 约定：函数名小写蛇形，类型名大驼峰，常量全大写\nconst CACHE = Dict{String,Int}()\ncache_hit(k) = get(CACHE, k, nothing)\nprintln(cache_hit(\"missing\"))",
    "et": "❌ 在模块顶层创建未加 const 的全局容器，并在函数中频繁读写",
    "ec": "非 const 全局变量类型可能变化，编译器无法生成高效代码，还容易引发并发问题。应改为 const 绑定，或把状态封装进结构体并作为参数传递。",
    "q": [
      {
        "q": "Julia 官方推荐的函数命名风格？",
        "a": "小写字母加下划线，例如 calculate_area。"
      },
      {
        "q": "为什么要给公共函数写文档字符串？",
        "a": "便于 ? 查询与生成文档，也强制作者说明参数与返回值。"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "复习路径：语法与类型、函数与派发、工程能力、生态与项目四阶段推进",
      "深入方向包括性能优化、并行计算、机器学习、微分方程与数据可视化",
      "推荐阅读官方手册、Julia Discourse 论坛与 JuliaHub 上的真实项目源码",
      "下一步选一个真实问题做成包，经历设计、测试、文档与发布全流程"
    ],
    "c": "println(\"Julia 学习路线\")\n\ntopics = [\"多重派发\", \"类型稳定\", \"包管理\", \"测试\", \"并发\", \"FFI\"]\nfor (i, t) in enumerate(topics)\n    println(lpad(i, 2), \". \", t)\nend\n\nstages = [\n    (\"语法与类型\", 1:9),\n    (\"函数与派发\", 10:16),\n    (\"工程能力\", 17:25),\n    (\"生态与项目\", 26:34),\n]\nfor (name, range) in stages\n    println(rpad(name, 12), \"第 \", first(range), \"-\", last(range), \" 章\")\nend\nprintln(\"下一步：选一个真实项目，写成带测试与文档的 Julia 包\")",
    "et": "❌ 只背语法不动手，遇到真实数据与性能问题仍无从下手",
    "ec": "Julia 的价值在类型与派发带来的工程能力，必须通过项目体会。建议每学完一个阶段就写一个小工具或分析脚本，并补测试与基准，形成可复用的代码资产。",
    "q": [
      {
        "q": "学习 Julia 后适合先做哪类项目？",
        "a": "从熟悉的领域入手，如数据清洗、数值模拟或小工具，再逐步引入并发与性能优化。"
      },
      {
        "q": "为什么强调把代码做成包？",
        "a": "包迫使你设计接口、写测试与文档，是工程能力提升最快的路径。"
      }
    ]
  }
];
