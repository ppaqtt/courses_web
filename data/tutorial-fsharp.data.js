window.TUTORIAL_DATA_fsharp = [
  {
    "id": 1,
    "t": "F# 简介与历史",
    "p": [
      "F# 源自 ML 家族，2005 年随 .NET 2.0 发布，2010 年进入 Visual Studio，现由 FSharp 基金会维护",
      "默认不可变、以表达式为中心，支持类型推断、判别联合、模式匹配与异步编程",
      "运行在 .NET 上，可与 C# 库双向互操作，也能通过 Fable 编译到 JavaScript",
      "适合数据处理、金融计算、领域建模与后端服务，语法简洁且编译期检查严格"
    ],
    "c": "module Hello\n\n[<EntryPoint>]\nlet main argv =\n    printfn \"Hello, World!\"\n    // 不可变绑定\n    let name = \"F#\"\n    printfn \"你好, %s\" name\n    // 管道与高阶函数\n    let squares =\n        [ 1 .. 5 ]\n        |> List.map (fun x -> x * x)\n    printfn \"平方: %A\" squares\n    // 判别联合 + 模式匹配\n    let describe n =\n        match n with\n        | 0 -> \"零\"\n        | n when n > 0 -> \"正数\"\n        | _ -> \"负数\"\n    printfn \"%d 是%s\" 42 (describe 42)\n    0",
    "et": "❌ 常见错误",
    "ec": "把 F# 当成 C# 写，使用 var 与分号、在函数里写 return 语句。F# 以表达式为一切，最后一个表达式就是返回值，函数体不需要 return，也不使用花括号包裹语句块。",
    "q": [
      {
        "q": "F# 程序的入口点如何标记？",
        "a": "[<EntryPoint>] 标注的 let main argv 函数，返回整数退出码"
      },
      {
        "q": "F# 函数体如何返回值？",
        "a": "最后一个表达式的值即返回值，无需 return"
      }
    ]
  },
  {
    "id": 2,
    "t": "安装与开发工具链",
    "p": [
      "安装 .NET SDK 后即自带 F# 模板与编译器，dotnet --info 查看 SDK 与运行时版本",
      "dotnet new console -lang F# 创建控制台项目，dotnet run 编译并运行，dotnet build 只编译",
      "dotnet fsi 启动交互式脚本环境，可直接执行 .fsx 文件，适合探索 API 与小工具",
      "编辑器推荐 VS Code + Ionide 或 Visual Studio，格式化用 fantomas，测试用 Expecto 或 xUnit"
    ],
    "c": "// 工具链速览：依次执行以下命令\n// dotnet --info\n// dotnet new console -lang F# -o demo\n// cd demo && dotnet run\n// dotnet fsi                      交互式环境\n// dotnet fsi script.fsx           运行脚本\n// dotnet add package Newtonsoft.Json\n// dotnet test                     运行测试\n// dotnet fantomas .               格式化（需安装 dotnet tool install -g fantomas）\nmodule Tooling\n\n[<EntryPoint>]\nlet main _ =\n    let sdk = System.Environment.Version\n    printfn \".NET 运行时: %O\" sdk\n    printfn \"F# 版本: %s\" (typeof<int list>.Assembly.GetName().Version.ToString())\n    printfn \"交互式: dotnet fsi；构建: dotnet build；运行: dotnet run\"\n    0",
    "et": "❌ 常见错误",
    "ec": "在项目外直接 dotnet fsi 运行依赖 NuGet 包的代码，结果提示找不到命名空间。脚本需要先用 #r \"nuget: PackageName, Version\" 引用包，或在项目目录下用 dotnet run 运行。",
    "q": [
      {
        "q": "创建 F# 控制台项目的命令？",
        "a": "dotnet new console -lang F#"
      },
      {
        "q": "F# 交互式环境怎么启动？",
        "a": "dotnet fsi"
      }
    ]
  },
  {
    "id": 3,
    "t": "值与不可变绑定",
    "p": [
      "let 绑定默认不可变，同名 let 是遮蔽（shadowing）而不是修改，旧绑定仍然存在",
      "需要可变状态时显式写 let mutable x = 0，再用 x <- x + 1 赋值，作用域尽量小",
      "绑定可附带类型标注 let x: int = 1，也可解构元组与记录 let (a, b) = pair",
      "模块级 let 在首次访问时求值，函数体内的 let 每次调用重新求值"
    ],
    "c": "module Bindings\n\n[<EntryPoint>]\nlet main _ =\n    // 不可变绑定\n    let radius = 2.0\n    let area = System.Math.PI * radius * radius\n    printfn \"面积: %.2f\" area\n\n    // 遮蔽：新绑定覆盖可见性，旧值不受影响\n    let radius = radius * 2.0\n    printfn \"新半径: %.2f\" radius\n\n    // 显式可变，仅在小范围内使用\n    let mutable counter = 0\n    counter <- counter + 1\n    counter <- counter + 1\n    printfn \"计数: %d\" counter\n\n    // 解构绑定\n    let (x, y) = (3, 4)\n    printfn \"x=%d y=%d\" x y\n    0",
    "et": "❌ 常见错误",
    "ec": "写 let x = 1 后又写 x <- 2，编译器报错“值不可变”。要么把绑定改成 let mutable x = 1，要么用新的 let 绑定遮蔽旧值，后者更符合函数式风格。",
    "q": [
      {
        "q": "F# 中如何声明可变变量？",
        "a": "let mutable x = 0"
      },
      {
        "q": "同名 let 重新绑定叫什么？",
        "a": "遮蔽（shadowing）"
      }
    ]
  },
  {
    "id": 4,
    "t": "类型系统与类型推断",
    "p": [
      "F# 是静态强类型语言，Hindley-Milner 风格推断让大多数绑定无需写类型标注",
      "基础类型：int、float、decimal、bool、char、string、unit，数值后缀如 1.0f 表示 float32",
      "函数类型写作 int -> string -> bool，箭头右结合；元组类型写作 int * string",
      "编译器从使用方式反推类型，遇到歧义时用标注消解，例如 let f (x: float) = x + 1.0"
    ],
    "c": "module Types\n\n// 推断为 int -> int\nlet double x = x * 2\n\n// 显式标注：float -> float\nlet half (x: float) : float = x / 2.0\n\n// 元组与记录类型\ntype Point = { X: float; Y: float }\n\nlet distance (a: Point) (b: Point) =\n    let dx = a.X - b.X\n    let dy = a.Y - b.Y\n    sqrt (dx * dx + dy * dy)\n\n[<EntryPoint>]\nlet main _ =\n    printfn \"%d\" (double 21)\n    printfn \"%.2f\" (half 5.0)\n    let p1 = { X = 0.0; Y = 0.0 }\n    let p2 = { X = 3.0; Y = 4.0 }\n    printfn \"距离: %.1f\" (distance p1 p2)\n    printfn \"类型推断完成\"\n    0",
    "et": "❌ 常见错误",
    "ec": "混用 int 与 float 做算术，如 1 + 1.0，F# 不会隐式转换而是直接报类型错误。应显式写 float 1 + 1.0，或统一使用同一类型，避免运行期精度问题。",
    "q": [
      {
        "q": "F# 中函数类型的箭头含义？",
        "a": "参数类型 -> 返回类型，多个参数依次用箭头连接"
      },
      {
        "q": "int 与 float 相加需要怎么做？",
        "a": "显式转换，如 float 1 + 1.0"
      }
    ]
  },
  {
    "id": 5,
    "t": "运算符与表达式",
    "p": [
      "算术运算符 + - * / %%，整除用 /（整数相除会截断），幂运算用 ** 且只接受 float",
      "比较运算符 = <> < > 可用于结构比较，字符串与元组也能直接比较",
      "管道 |> 把左边结果作为右边函数的最后一个参数，组合 >> 把两个函数串成新函数",
      "F# 中一切皆表达式，if、match、try 都返回一个值，可直接赋给 let"
    ],
    "c": "module Operators\n\n[<EntryPoint>]\nlet main _ =\n    printfn \"7 / 2 = %d\" (7 / 2)\n    printfn \"7 %% 2 = %d\" (7 % 2)\n    printfn \"2.0 ** 10.0 = %.1f\" (2.0 ** 10.0)\n\n    // 结构比较\n    printfn \"%b\" ([ 1; 2 ] = [ 1; 2 ])\n    printfn \"%b\" (\"abc\" < \"abd\")\n\n    // 管道：数据流从左到右\n    let result =\n        [ 1 .. 10 ]\n        |> List.filter (fun x -> x % 2 = 0)\n        |> List.map (fun x -> x * x)\n        |> List.sum\n    printfn \"偶数和平方: %d\" result\n    // 函数组合\n    let inc = (+) 1\n    let doubled = (*) 2\n    let incThenDouble = inc >> doubled\n    printfn \"%d\" (incThenDouble 5)\n    0",
    "et": "❌ 常见错误",
    "ec": "用 / 对两个整数做除法期待小数结果，如 1 / 2 得到 0。需要浮点结果时应写 1.0 / 2.0 或 float 1 / float 2，并用 %% 而非 % 在 printf 中转义百分号。",
    "q": [
      {
        "q": "管道运算符是什么？",
        "a": "|>"
      },
      {
        "q": "两个函数组合成新函数用什么运算符？",
        "a": ">>"
      }
    ]
  },
  {
    "id": 6,
    "t": "字符串与文本处理",
    "p": [
      "字符串是 .NET 的 System.String，不可变且 UTF-16 编码，支持插值 $\"Hello, {name}\"",
      "常用方法：Trim、ToUpper、Split、Replace、Substring、StartsWith，均为 BCL 实例方法",
      "String.concat 与 String.Join 拼接集合，sprintf 生成格式化字符串，StringBuilder 适合大量拼接",
      "多行字符串用三引号 \"\"\"...\"\"\"，原样保留换行，适合 SQL 与模板"
    ],
    "c": "module Strings\n\n[<EntryPoint>]\nlet main _ =\n    let name = \"F#\"\n    printfn $\"你好, {name}!\"\n    printfn \"长度: %d\" name.Length\n\n    let text = \"  alpha,beta,gamma  \"\n    let parts = text.Trim().Split(',')\n    printfn \"分段: %A\" parts\n    printfn \"大写: %s\" (text.ToUpper())\n    printfn \"替换: %s\" (text.Replace(\"beta\", \"BETA\"))\n\n    // 集合拼接\n    let joined = String.concat \"-\" parts\n    printfn \"拼接: %s\" joined\n    // 三引号多行字符串\n    let sql = \"\"\"\nSELECT id, name\nFROM users\nWHERE active = true\n\"\"\"\n    printfn \"%s\" (sql.Trim())\n    0",
    "et": "❌ 常见错误",
    "ec": "在循环里用 s += item 拼接大量字符串，每次都会分配新字符串导致 O(n²) 开销。应使用 StringBuilder 或 String.concat，在 F# 中也可用 String.Join 一次性合并集合。",
    "q": [
      {
        "q": "字符串插值的前缀是什么？",
        "a": "$（如 $\"你好, {name}\"）"
      },
      {
        "q": "大量拼接应使用什么类型？",
        "a": "System.Text.StringBuilder"
      }
    ]
  },
  {
    "id": 7,
    "t": "列表、元组与集合",
    "p": [
      "F# 列表是不可变单链表，写作 [1; 2; 3]，用 :: 在头部追加，[] 为空表",
      "元组是固定长度异构组合，如 (1, \"a\")，模式匹配可一次解构多个值",
      "数组 int[] 可变且连续存储，适合数值计算；序列 seq 是惰性 IEnumerable",
      "Map 与 Set 是不可变有序结构，按键查找 O(log n)，增删返回新集合"
    ],
    "c": "module Collections\n\n[<EntryPoint>]\nlet main _ =\n    // 不可变列表\n    let nums = [ 1; 2; 3 ]\n    let more = 0 :: nums\n    printfn \"列表: %A\" more\n    printfn \"长度: %d\" (List.length more)\n\n    // 元组\n    let pair = (1, \"one\")\n    let (n, label) = pair\n    printfn \"%d = %s\" n label\n\n    // 数组可原地修改\n    let arr = [| 1; 2; 3 |]\n    arr.[0] <- 10\n    printfn \"数组: %A\" arr\n    // Map 与 Set\n    let scores = Map.ofList [ (\"Ada\", 90); (\"Linus\", 85) ]\n    printfn \"Ada: %d\" scores.[\"Ada\"]\n    let unique = Set.ofList [ 3; 1; 2; 1 ]\n    printfn \"集合: %A\" (Set.toList unique)\n    0",
    "et": "❌ 常见错误",
    "ec": "对 list 使用 arr.[0] <- x 试图原地修改，编译器会报列表不可变。列表只能通过 :: 构造新表，需要原地更新请改用数组 [| ... |]，并注意并发访问安全。",
    "q": [
      {
        "q": "F# 列表在头部追加元素的运算符？",
        "a": "::"
      },
      {
        "q": "不可变键值集合类型是什么？",
        "a": "Map"
      }
    ]
  },
  {
    "id": 8,
    "t": "条件与分支",
    "p": [
      "if ... then ... else ... 是表达式，两个分支必须返回相同类型，else 不可省略",
      "只有副作用的 if 不带 else 时返回 unit，此时 then 分支也必须是 unit",
      "match 比 if 链更清晰，支持常量、类型、列表、记录与守卫 when 分支",
      "match 必须穷尽所有情况，否则编译警告；用 _ -> 兜底但会掩盖遗漏"
    ],
    "c": "module Branching\n\nlet grade score =\n    if score >= 90 then \"优秀\"\n    elif score >= 60 then \"及格\"\n    else \"不及格\"\n\nlet describe value =\n    match value with\n    | 0 -> \"零\"\n    | n when n > 0 -> \"正数\"\n    | _ -> \"负数\"\nlet classify (xs: int list) =\n    match xs with\n    | [] -> \"空列表\"\n    | [ _ ] -> \"单元素\"\n    | _ :: _ :: _ -> \"多元素\"\n[<EntryPoint>]\nlet main _ =\n    printfn \"%s\" (grade 95)\n    printfn \"%s\" (describe -3)\n    printfn \"%s\" (classify [ 1; 2; 3 ])\n    let label = if System.DateTime.Now.Hour < 12 then \"上午\" else \"下午\"\n    printfn \"%s\" label\n    0",
    "et": "❌ 常见错误",
    "ec": "在 if 分支里一边返回 int 一边返回 string，或用 if 做语句而不写 else，导致类型不匹配。F# 的 if 是表达式，两个分支类型必须统一；纯副作用时用 if ... then ... 返回 unit。",
    "q": [
      {
        "q": "F# 的 if 是什么？",
        "a": "表达式，必须返回一个值"
      },
      {
        "q": "match 分支中的守卫关键字？",
        "a": "when"
      }
    ]
  },
  {
    "id": 9,
    "t": "递归与高阶函数",
    "p": [
      "递归函数用 rec 关键字声明，如 let rec fact n = ...，否则函数体内无法引用自身",
      "尾递归把中间结果放入累加器参数，.NET JIT 可优化为循环，避免栈溢出",
      "List.map、List.filter、List.fold、List.sumBy 是日常主力，优先用库函数而非手写递归",
      "序列 seq 惰性求值，可用 Seq 模块处理无限或超大集合"
    ],
    "c": "module Recursion\nlet rec factorial n =\n    if n <= 1 then 1\n    else n * factorial (n - 1)\n// 尾递归：累加器在参数中\nlet factorialTail n =\n    let rec loop acc k =\n        if k <= 1 then acc\n        else loop (acc * k) (k - 1)\n    loop 1 n\n[<EntryPoint>]\nlet main _ =\n    printfn \"5! = %d\" (factorial 5)\n    printfn \"10! = %d\" (factorialTail 10)\n    let nums = [ 1 .. 6 ]\n    let evens = List.filter (fun x -> x % 2 = 0) nums\n    let sumSquares = evens |> List.sumBy (fun x -> x * x)\n    printfn \"偶数平方和: %d\" sumSquares\n    let product = List.fold (*) 1 nums\n    printfn \"乘积: %d\" product\n    // seq 惰性：只取前 5 个\n    Seq.initInfinite (fun i -> i * i)\n    |> Seq.take 5\n    |> Seq.iter (printf \"%d \")\n    0",
    "et": "❌ 常见错误",
    "ec": "写递归时忘记 rec 关键字，编译器提示“未定义的值”。若是深层递归还应改为尾递归或使用 Seq/List 模块的高阶函数，否则大输入可能触发堆栈溢出。",
    "q": [
      {
        "q": "声明递归函数的关键字？",
        "a": "rec"
      },
      {
        "q": "把中间结果带入下一层递归的参数叫什么？",
        "a": "累加器（accumulator）"
      }
    ]
  },
  {
    "id": 10,
    "t": "函数定义与调用",
    "p": [
      "函数用 let 定义，参数以空格分隔：let add x y = x + y，调用同样不加括号与逗号",
      "F# 函数默认柯里化，add 2 返回一个等待 y 的函数，便于部分应用",
      "多参数也可写成元组形式 let add (x, y) = x + y，但会失去部分应用能力",
      "类型标注可写在参数后：let add (x: int) (y: int) : int = x + y"
    ],
    "c": "module Functions\n\n// 柯里化函数\nlet add x y = x + y\n\n// 元组参数：必须一次传完\nlet addTuple (x, y) = x + y\n\n// 带标注与守卫的函数\nlet classify (n: int) =\n    if n < 0 then \"负数\"\n    elif n = 0 then \"零\"\n    else \"正数\"\n// 递归需要 rec\nlet rec gcd a b =\n    if b = 0 then a else gcd b (a % b)\n[<EntryPoint>]\nlet main _ =\n    printfn \"%d\" (add 2 3)\n    let add10 = add 10\n    printfn \"%d\" (add10 5)\n    printfn \"%d\" (addTuple (2, 3))\n    printfn \"%s\" (classify -1)\n    printfn \"gcd = %d\" (gcd 48 18)\n    0",
    "et": "❌ 常见错误",
    "ec": "调用 F# 函数时习惯性写成 add(2, 3)，结果被当成只传了一个元组参数，编译报类型不匹配。F# 函数应用用空格：add 2 3；只有定义成元组参数时才写 (2, 3)。",
    "q": [
      {
        "q": "F# 调用两参数函数的正确写法？",
        "a": "add 2 3（空格分隔，不加括号与逗号）"
      },
      {
        "q": "柯里化的好处是什么？",
        "a": "可以部分应用，先传部分参数得到新函数"
      }
    ]
  },
  {
    "id": 11,
    "t": "函数进阶：柯里化与管道",
    "p": [
      "部分应用：只传部分参数得到新函数，如 let inc = (+) 1，是配置与复用的常用手段",
      "函数组合 f >> g 表示先 f 后 g，f << g 表示先 g 后 f，两者都返回新函数",
      "管道 x |> f 等价 f x，多步处理时按数据流顺序书写，可读性远高于嵌套调用",
      "闭包捕获外部绑定，捕获的是不可变值；需要累积状态时应显式用 fold 或 mutable"
    ],
    "c": "module HigherOrder\n\nlet clamp lo hi value =\n    min hi (max lo value)\nlet parse (s: string) =\n    match System.Int32.TryParse s with\n    | true, v -> Some v\n    | _ -> None\n[<EntryPoint>]\nlet main _ =\n    let clamp0To100 = clamp 0 100\n    printfn \"%d\" (clamp0To100 150)\n    // 管道：从左到右读\n    let result =\n        \"42\"\n        |> parse\n        |> Option.map (fun v -> v * 2)\n        |> Option.defaultValue 0\n    printfn \"解析结果: %d\" result\n    let normalize = clamp0To100 >> (+) 1\n    printfn \"%d\" (normalize 200)\n    let factor = 3\n    let scale = fun x -> x * factor\n    printfn \"%d\" (List.sumBy scale [ 1; 2; 3 ])\n    0",
    "et": "❌ 常见错误",
    "ec": "把管道写反，如 10 |> (fun x -> x + 1) 之外又套了括号导致类型错误；或误以为 x |> f 会修改 x。管道只是函数应用的语法糖，值本身始终不可变。",
    "q": [
      {
        "q": "先 f 后 g 的函数组合怎么写？",
        "a": "f >> g"
      },
      {
        "q": "管道运算符的等价形式？",
        "a": "x |> f 等价于 f x"
      }
    ]
  },
  {
    "id": 12,
    "t": "模式匹配",
    "p": [
      "match ... with 支持常量、变量、元组、记录、列表与类型模式，分支自上而下匹配",
      "function 关键字省略参数，直接写 match 分支，适合作为高阶函数的参数",
      "活动模式（Active Pattern）用 |Regex|_| 之类把解析逻辑封装成可复用匹配器",
      "列表模式 []、[x]、x :: rest 可精确描述结构，比手写 Length 判断更安全"
    ],
    "c": "module Matching\n\ntype Shape =\n    | Circle of radius: float\n    | Rect of width: float * height: float\nlet area shape =\n    match shape with\n    | Circle r -> System.Math.PI * r * r\n    | Rect (w, h) -> w * h\n// 活动模式：识别偶数\nlet (|Even|Odd|) n =\n    if n % 2 = 0 then Even else Odd\nlet describeList xs =\n    match xs with\n    | [] -> \"空\"\n    | [ x ] -> sprintf \"单个: %d\" x\n    | x :: _ -> sprintf \"首元素: %d\" x\n[<EntryPoint>]\nlet main _ =\n    printfn \"%.2f\" (area (Circle 2.0))\n    printfn \"%.2f\" (area (Rect (3.0, 4.0)))\n    let label n = match n with Even -> \"偶\" | Odd -> \"奇\"\n    printfn \"%s %s\" (label 4) (label 7)\n    printfn \"%s\" (describeList [ 9; 8; 7 ])\n    0",
    "et": "❌ 常见错误",
    "ec": "match 分支没有覆盖全部情况，编译器给出不完整匹配警告，运行时遇到未处理值抛 MatchFailureException。应补全分支或用 _ 兜底，但兜底不应掩盖真实业务遗漏。",
    "q": [
      {
        "q": "省略参数直接写 match 的关键字？",
        "a": "function"
      },
      {
        "q": "F# 中把解析逻辑封装成可复用匹配器叫什么？",
        "a": "活动模式（Active Pattern）"
      }
    ]
  },
  {
    "id": 13,
    "t": "记录与判别联合",
    "p": [
      "记录 type User = { Name: string; Age: int } 是具名不可变结构，字段访问用 user.Name",
      "复制更新 { user with Age = 37 } 返回新记录，原记录保持不变",
      "判别联合 type Result = Ok of int | Error of string 表示多选一，是领域建模核心工具",
      "联合类型分支可携带不同数据，配合模式匹配能穷尽处理所有情况，避免非法状态"
    ],
    "c": "module Domain\n\ntype User =\n    { Name: string\n      Age: int }\n\ntype Payment =\n    | Cash of amount: decimal\n    | Card of number: string * amount: decimal\n    | Failed of reason: string\n\nlet describe payment =\n    match payment with\n    | Cash amount -> sprintf \"现金 %.2f\" amount\n    | Card (last4, amount) -> sprintf \"卡 %s 支付 %.2f\" last4 amount\n    | Failed reason -> sprintf \"失败: %s\" reason\n[<EntryPoint>]\nlet main _ =\n    let user = { Name = \"Ada\"; Age = 36 }\n    let older = { user with Age = 37 }\n    printfn \"%s %d -> %d\" user.Name user.Age older.Age\n    printfn \"%s\" (describe (Cash 99.5m))\n    printfn \"%s\" (describe (Card (\"****1234\", 20.0m)))\n    printfn \"%s\" (describe (Failed \"余额不足\"))\n    0",
    "et": "❌ 常见错误",
    "ec": "用一堆可空字符串字段表示状态，导致“已支付但失败原因非空”这类非法组合。应把状态建模为判别联合，让每个分支只携带该状态合法的数据，编译器帮你排除错误。",
    "q": [
      {
        "q": "复制记录并改字段的语法？",
        "a": "{ record with Field = value }"
      },
      {
        "q": "表示多选一的类型叫什么？",
        "a": "判别联合（Discriminated Union）"
      }
    ]
  },
  {
    "id": 14,
    "t": "多态与类型参数",
    "p": [
      "泛型用 'a 表示，如 let identity (x: 'a) = x，编译器自动推断并实例化",
      "泛型容器 List<'T>、Map<'Key, 'Value>、Option<'T> 在 F# 中写作 'T list 等前缀形式",
      "类型约束用 when 'a : comparison 或 :> IDisposable，限制泛型可用的操作",
      "SRTP（静态解析类型参数）用 inline 与 ^T，可在编译期为不同类型生成特化代码"
    ],
    "c": "module Generics\n\n// 泛型函数：对任意类型都成立\nlet identity (x: 'a) = x\n\nlet pairUp (a: 'a) (b: 'b) = (a, b)\n\n// 约束：要求可比较\nlet maxOf (a: 'a) (b: 'a) : 'a when 'a: comparison =\n    if a >= b then a else b\n\n// 泛型记录\ntype Box<'T> = { Value: 'T }\n// inline + SRTP：支持任意有 + 运算符的类型\nlet inline addTwice x = x + x\n[<EntryPoint>]\nlet main _ =\n    printfn \"%d\" (identity 42)\n    printfn \"%s\" (identity \"hi\")\n    printfn \"%A\" (pairUp 1 \"one\")\n    printfn \"%d\" (maxOf 3 9)\n    printfn \"%s\" (maxOf \"apple\" \"pear\")\n    printfn \"%d\" ({ Value = 7 }).Value\n    printfn \"%d\" (addTwice 21)\n    0",
    "et": "❌ 常见错误",
    "ec": "在泛型函数里直接对 'a 做算术或比较，编译器报“类型参数不支持该运算符”。应添加约束（如 'a: comparison）或对数值使用 inline 与 SRTP，否则需显式转换。",
    "q": [
      {
        "q": "F# 泛型类型参数的写法？",
        "a": "'a（如 'a list）"
      },
      {
        "q": "要求泛型可比较的约束怎么写？",
        "a": "when 'a: comparison"
      }
    ]
  },
  {
    "id": 15,
    "t": "模块、命名空间与抽象",
    "p": [
      "module 把相关函数与类型组织在一起，顶层模块名通常与文件名一致",
      "namespace 用于跨文件组织，同一命名空间可分布在多个文件中，适合大型项目",
      "private 修饰符限制可见性，模块内 private 函数外部无法调用；.fsi 签名文件可进一步约束 API",
      "内部实现细节通过签名文件隐藏，只暴露稳定接口，降低耦合与破坏性变更风险"
    ],
    "c": "module Counter\n\n// 内部状态类型不对外暴露\ntype private State = { Count: int }\n\nlet empty = { Count = 0 }\n\nlet increment state =\n    { state with Count = state.Count + 1 }\n\nlet value state = state.Count\n\nlet private isValid state = state.Count >= 0\n\nlet reset state =\n    if isValid state then { Count = 0 } else empty\n\n[<EntryPoint>]\nlet main _ =\n    let c1 = increment (increment empty)\n    printfn \"计数: %d\" (value c1)\n    printfn \"重置: %d\" (value (reset c1))\n    printfn \"私有类型无法在模块外构造\"\n    0",
    "et": "❌ 常见错误",
    "ec": "把所有类型和函数都设为 public，外部代码直接依赖内部表示，重构时连锁破坏。应从窄接口开始，用 private 与 .fsi 签名文件显式声明公共 API。",
    "q": [
      {
        "q": "限制模块内函数可见性的修饰符？",
        "a": "private"
      },
      {
        "q": "约束模块公开 API 的签名文件扩展名？",
        "a": ".fsi"
      }
    ]
  },
  {
    "id": 16,
    "t": "接口与对象表达式",
    "p": [
      "接口用 type IShape = abstract Area: unit -> float 声明，实现时用 interface IShape with",
      "对象表达式 { new IShape with member _.Area() = ... } 可现场创建匿名实现，适合测试替身",
      "接口继承用 interface IDisposable，F# 会要求实现 Dispose；use 绑定自动调用 Dispose",
      "优先用函数与判别联合建模，只有在需要与 C# 互操作或运行时多态时才引入接口"
    ],
    "c": "module Interfaces\ntype IShape =\n    abstract member Area: unit -> float\n    abstract member Name: string\ntype Circle(radius: float) =\n    interface IShape with\n        member _.Area() = System.Math.PI * radius * radius\n        member _.Name = \"圆\"\ntype Square(side: float) =\n    interface IShape with\n        member _.Area() = side * side\n        member _.Name = \"正方形\"\nlet printArea (shape: IShape) =\n    printfn \"%s 面积 %.2f\" shape.Name (shape.Area())\n[<EntryPoint>]\nlet main _ =\n    printArea (Circle 2.0)\n    printArea (Square 3.0)\n    // 对象表达式：匿名实现\n    let triangle =\n        { new IShape with\n            member _.Area() = 0.5 * 3.0 * 4.0\n            member _.Name = \"三角形\" }\n    printArea triangle\n    0",
    "et": "❌ 常见错误",
    "ec": "在 F# 中为了“面向对象”给每个类型都加接口，导致类型层次臃肿。F# 更适合用判别联合与高阶函数表达多态，接口保留给 C# 互操作与插件边界。",
    "q": [
      {
        "q": "F# 声明接口成员的关键字？",
        "a": "abstract member"
      },
      {
        "q": "现场创建接口匿名实现的语法？",
        "a": "{ new IShape with member ... }"
      }
    ]
  },
  {
    "id": 17,
    "t": "错误处理：Option、Result 与异常",
    "p": [
      "Option<'T> 用 Some / None 表示可能缺失的值，避免 null 扩散到调用链",
      "Result<'T, 'E> 用 Ok / Error 表示可能失败的计算，错误类型可自定义为判别联合",
      "Option.map/bind 与 Result.map/bind 可串联计算，失败时自动短路",
      "异常用于真正的意外情况，用 try ... with 捕获，业务错误优先用 Result 显式返回"
    ],
    "c": "module Errors\ntype ParseError =\n    | Empty\n    | NotNumber of string\n    | OutOfRange of int\nlet parseAge (text: string) : Result<int, ParseError> =\n    if System.String.IsNullOrWhiteSpace text then Error Empty\n    else\n        match System.Int32.TryParse text with\n        | false, _ -> Error (NotNumber text)\n        | true, n when n < 0 || n > 150 -> Error (OutOfRange n)\n        | true, n -> Ok n\nlet describe result =\n    match result with\n    | Ok age -> sprintf \"年龄 %d\" age\n    | Error e -> sprintf \"错误: %A\" e\n[<EntryPoint>]\nlet main _ =\n    [ \"36\"; \"\"; \"abc\" ] |> List.iter (parseAge >> describe >> printfn \"%s\")\n    printfn \"%A\" (parseAge \"21\" |> Result.map ((*) 2))\n    try\n        failwith \"意外错误\"\n    with ex ->\n        printfn \"捕获: %s\" ex.Message\n    0",
    "et": "❌ 常见错误",
    "ec": "用异常表达可预期的业务失败，如找不到用户就 throw，调用方容易漏捕获。可预期失败应返回 Result 并由调用方显式分支处理，异常只留给程序缺陷与外部故障。",
    "q": [
      {
        "q": "表示可能缺失值的类型？",
        "a": "Option<'T>（Some/None）"
      },
      {
        "q": "表示成功或失败的通用类型？",
        "a": "Result<'T, 'E>（Ok/Error）"
      }
    ]
  },
  {
    "id": 18,
    "t": "文件与 IO 操作",
    "p": [
      "System.IO.File.ReadAllText/WriteAllText 一行完成读写，适合中小文件与配置",
      "大文件用 StreamReader 配合 use 绑定逐行读取，use 保证异常时也能释放句柄",
      "File.Exists、Directory.CreateDirectory、Path.Combine 处理路径，避免手写拼接分隔符",
      "异步 IO 用 File.ReadAllTextAsync 与 Async.AwaitTask，避免阻塞线程池"
    ],
    "c": "module FileIO\n\nopen System\nopen System.IO\n\n[<EntryPoint>]\nlet main _ =\n    let path = Path.Combine(Path.GetTempPath(), \"fsharp-demo.txt\")\n    // 写入与追加\n    File.WriteAllText(path, \"第一行\\n第二行\\n\")\n    File.AppendAllText(path, \"追加行\\n\")\n    // 一次读取\n    let content = File.ReadAllText(path)\n    printfn \"字符数: %d\" content.Length\n    // 逐行读取，use 自动释放\n    use reader = new StreamReader(path)\n    let mutable line = reader.ReadLine()\n    while not (isNull line) do\n        printfn \"行: %s\" line\n        line <- reader.ReadLine()\n    // 检查元数据后删除\n    let info = FileInfo(path)\n    printfn \"大小: %d 字节\" info.Length\n    File.Delete(path)\n    0",
    "et": "❌ 常见错误",
    "ec": "打开 StreamReader 后不释放，Windows 上文件会被占用，无法删除或重写。应使用 use 绑定，确保即使读取过程中抛出异常也会调用 Dispose 关闭句柄。",
    "q": [
      {
        "q": "一行读取整个文本文件的 API？",
        "a": "File.ReadAllText"
      },
      {
        "q": "F# 中自动释放 IDisposable 的关键字？",
        "a": "use"
      }
    ]
  },
  {
    "id": 19,
    "t": "正则表达式",
    "p": [
      "F# 直接使用 .NET 的 System.Text.RegularExpressions，Regex.IsMatch 判断是否匹配",
      "Regex.Match 返回首个匹配对象，Groups 访问捕获组，Regex.Matches 返回全部匹配集合",
      "Regex.Replace 支持替换字符串与 MatchEvaluator 委托，可在替换时做计算",
      "频繁使用的模式应创建 Regex 实例并加 RegexOptions.Compiled，避免重复解析"
    ],
    "c": "module RegexDemo\n\nopen System.Text.RegularExpressions\n\nlet emailPattern =\n    Regex(@\"[\\w.+-]+@[\\w-]+\\.[\\w.]+\", RegexOptions.Compiled)\n\nlet extractEmails text =\n    emailPattern.Matches text\n    |> Seq.cast<Match>\n    |> Seq.map (fun m -> m.Value)\n    |> List.ofSeq\n\nlet normalize text =\n    Regex.Replace(text, @\"\\s+\", \" \").Trim()\n[<EntryPoint>]\nlet main _ =\n    let text = \"联系 ada@example.com 或 bob@test.org\"\n    printfn \"%A\" (extractEmails text)\n    let m = Regex.Match(\"2026-11-15\", @\"(\\d{4})-(\\d{2})-(\\d{2})\")\n    if m.Success then\n        printfn \"年=%s 月=%s 日=%s\" m.Groups.[1].Value m.Groups.[2].Value m.Groups.[3].Value\n    printfn \"%s\" (normalize \"hello   world\\n\\tagain\")\n    printfn \"%b\" (Regex.IsMatch(\"abc123\", @\"\\d+\"))\n    0",
    "et": "❌ 常见错误",
    "ec": "在普通字符串里写正则 \\d+，F# 会把它当作转义字符而报错或得到错误结果。应使用以 @ 开头的逐字字符串，或把反斜杠写成两个，让反斜杠原样传给正则引擎。",
    "q": [
      {
        "q": "F# 中写正则字面量推荐什么字符串？",
        "a": "逐字字符串 @\"...\""
      },
      {
        "q": "获取所有匹配用什么方法？",
        "a": "Regex.Matches"
      }
    ]
  },
  {
    "id": 20,
    "t": "项目结构与包管理",
    "p": [
      ".fsproj 描述项目：TargetFramework、Compile 项按顺序列出源文件，顺序决定编译依赖",
      "NuGet 是默认包管理器：dotnet add package Name 添加依赖，dotnet restore 还原",
      "Paket 提供集中式依赖管理与锁文件，适合多项目仓库，配置文件为 paket.dependencies",
      "多项目解决方案用 dotnet new sln 与 dotnet sln add，项目间用 ProjectReference 引用"
    ],
    "c": "// demo.fsproj 关键内容：\n// <Project Sdk=\"Microsoft.NET.Sdk\">\n//   <PropertyGroup>\n//     <OutputType>Exe</OutputType>\n//     <TargetFramework>net8.0</TargetFramework>\n//   </PropertyGroup>\n//   <ItemGroup>\n//     <Compile Include=\"Domain.fs\" />\n//     <Compile Include=\"Program.fs\" />\n//   </ItemGroup>\n//   <ItemGroup>\n//     <PackageReference Include=\"FSharp.SystemTextJson\" Version=\"1.3.13\" />\n//   </ItemGroup>\n// </Project>\n// 命令：dotnet new sln -n Demo && dotnet sln add src/App/App.fsproj\n//       dotnet add package Newtonsoft.Json\nmodule Project\n\n[<EntryPoint>]\nlet main _ =\n    printfn \"源文件顺序即编译顺序：Domain.fs 在 Program.fs 之前\"\n    printfn \"包管理: dotnet add package / dotnet restore / Paket\"\n    printfn \"解决方案: dotnet new sln / dotnet sln add\"\n    0",
    "et": "❌ 常见错误",
    "ec": "在 fsproj 中随意调整 Compile 顺序，或在文件后添加依赖它的代码，导致“未定义类型”错误。F# 按文件顺序编译，被依赖的类型与模块必须排在前面。",
    "q": [
      {
        "q": "添加 NuGet 包的命令？",
        "a": "dotnet add package 包名"
      },
      {
        "q": "fsproj 中 Compile 项的顺序有什么影响？",
        "a": "决定编译顺序，被依赖文件必须在前"
      }
    ]
  },
  {
    "id": 21,
    "t": "标准库速查与工具链",
    "p": [
      "包管理 NuGet（dotnet add package/restore）或 Paket；构建 dotnet build；运行 dotnet run",
      "测试 Expecto、xUnit、NUnit，统一用 dotnet test 执行；格式化 fantomas；静态检查 FSharpLint",
      "调试 dotnet fsi 逐行验证、VS/Ionide 断点、#time 计时、dotnet-trace 采样",
      "常用模块：List、Array、Seq、Map、Set、Option、Result、String、Async、Task"
    ],
    "c": "module Stdlib\n\n[<EntryPoint>]\nlet main _ =\n    // 构建: dotnet build   运行: dotnet run   发布: dotnet publish -c Release\n    // 包管理: dotnet add package / dotnet restore / paket install\n    // 测试: dotnet test（Expecto / xUnit）  格式化: dotnet fantomas .\n    // 调试: dotnet fsi / VS 断点 / dotnet-trace / #time\n    let nums = [ 3; 1; 4; 1; 5 ]\n\n    printfn \"排序去重: %A\" (List.distinct (List.sort nums))\n    printfn \"最大值: %d\" (List.max nums)\n    printfn \"分组: %A\" (nums |> List.countBy id)\n\n    let table = Map.ofList [ (\"a\", 1); (\"b\", 2) ]\n    printfn \"查找: %A\" (Map.tryFind \"b\" table)\n    printfn \"键: %A\" (table |> Map.toList |> List.map fst)\n\n    let total =\n        nums\n        |> Seq.filter (fun x -> x % 2 = 1)\n        |> Seq.sum\n    printfn \"奇数和: %d\" total\n    0",
    "et": "❌ 常见错误",
    "ec": "在需要频繁索引与修改时仍使用 list，导致 O(n) 查找与大量复制。应根据访问模式选择：顺序处理用 list，随机访问与数值计算用 array，大数据流式处理用 Seq。",
    "q": [
      {
        "q": "运行 F# 测试的统一命令？",
        "a": "dotnet test"
      },
      {
        "q": "F# 官方格式化工具？",
        "a": "fantomas"
      }
    ]
  },
  {
    "id": 22,
    "t": "并发与异步",
    "p": [
      "async { ... } 构建异步工作流，用 let! 等待，Async.RunSynchronously 或 Async.StartAsTask 启动",
      "Async.Parallel 并行执行多个工作流并收集结果，Async.Sequential 保持顺序",
      "Task 用于与 .NET 生态互操作，task { ... } 计算表达式可直接 await Task",
      "MailboxProcessor 是基于消息的轻量代理，适合实现状态机与串行化访问"
    ],
    "c": "module Concurrency\n\nlet fetch id = async {\n    do! Async.Sleep 100\n    return id * id\n}\nlet counter = MailboxProcessor.Start(fun inbox ->\n    let rec loop total = async {\n        let! msg = inbox.Receive()\n        match msg with\n        | Some reply ->\n            reply.Reply (total + 1)\n            return! loop (total + 1)\n        | None -> return ()\n    }\n    loop 0)\n[<EntryPoint>]\nlet main _ =\n    [ 1 .. 5 ]\n    |> List.map fetch\n    |> Async.Parallel\n    |> Async.RunSynchronously\n    |> printfn \"结果: %A\"\n    printfn \"计数: %d\" (counter.PostAndReply(fun ch -> Some ch))\n    0",
    "et": "❌ 常见错误",
    "ec": "在 async 工作流里调用 Async.RunSynchronously 或 .Result，造成线程阻塞甚至死锁。工作流内部应使用 let! 与 do! 组合异步操作，只在程序入口同步等待一次。",
    "q": [
      {
        "q": "async 工作流中等待异步结果的关键字？",
        "a": "let!"
      },
      {
        "q": "并行运行多个 async 的函数？",
        "a": "Async.Parallel"
      }
    ]
  },
  {
    "id": 23,
    "t": "性能优化",
    "p": [
      "列表适合顺序处理但有链表开销，数值密集或需随机访问时改用数组或 Span",
      "避免在循环中反复分配：复用 StringBuilder、预分配数组、使用结构体减少装箱",
      "Seq 是惰性的，多次枚举会重复计算，必要时先 Seq.toArray 或 Seq.cache",
      "先测量再优化：Stopwatch 或 BenchmarkDotNet 给出可信数据，避免凭直觉改写"
    ],
    "c": "module Performance\n\nopen System.Diagnostics\nopen System.Text\nlet sumList n = [ 1 .. n ] |> List.sum\nlet sumArray n =\n    Array.init n (fun i -> i + 1) |> Array.sum\nlet buildWithSb n =\n    let sb = StringBuilder()\n    for i in 1 .. n do\n        sb.Append(i).Append(',') |> ignore\n    sb.ToString()\n[<EntryPoint>]\nlet main _ =\n    let time f =\n        let sw = Stopwatch.StartNew()\n        let r = f ()\n        printfn \"耗时 %d ms, 结果 %A\" sw.ElapsedMilliseconds r\n    time (fun () -> sumList 100000)\n    time (fun () -> sumArray 100000)\n    time (fun () -> buildWithSb 10000 |> fun s -> s.Length)\n    let cached =\n        Seq.init 1000 (fun i -> i * i) |> Seq.filter (fun x -> x % 2 = 0) |> Seq.cache\n    printfn \"两次求和: %d\" (Seq.sum cached + Seq.sum cached)\n    0",
    "et": "❌ 常见错误",
    "ec": "对 Seq 结果重复枚举，以为它像数组一样缓存，实际每次都从头计算，性能可能成倍下降。需要多次访问时应调用 Seq.cache 或先转换为数组。",
    "q": [
      {
        "q": "对序列结果缓存以避免重复计算？",
        "a": "Seq.cache"
      },
      {
        "q": "数值计算中比 list 更合适的结构？",
        "a": "数组（array）"
      }
    ]
  },
  {
    "id": 24,
    "t": "测试：Expecto 与 xUnit",
    "p": [
      "Expecto 用 testList/testCase 组合测试，Expect.equal 等断言失败时输出差异详情",
      "xUnit 用 [<Fact>] 与 [<Theory>] 特性标注，dotnet test 通过测试适配器发现并执行",
      "测试应覆盖正常路径、边界值与错误分支，Result 的错误分支尤其需要断言",
      "用 FsCheck 做基于属性的测试，随机生成输入验证“对所有输入都成立”的性质"
    ],
    "c": "module Tests\n\nopen Expecto\n\nlet add x y = x + y\n\nlet safeDiv a b =\n    if b = 0 then Error \"除零\" else Ok (a / b)\n\nlet tests =\n    testList \"数学\" [\n        testCase \"加法\" <| fun () ->\n            Expect.equal (add 2 3) 5 \"2 + 3 应等于 5\"\n\n        testCase \"正常除法\" <| fun () ->\n            Expect.equal (safeDiv 6 2) (Ok 3) \"6 / 2 应等于 3\"\n\n        testCase \"除零返回 Error\" <| fun () ->\n            Expect.equal (safeDiv 1 0) (Error \"除零\") \"除零应失败\"\n    ]\n\n[<EntryPoint>]\nlet main argv =\n    // 运行: dotnet run --project tests 或 dotnet test\n    runTestsWithCLIArgs [] argv tests",
    "et": "❌ 常见错误",
    "ec": "只测试成功路径，不测边界与错误分支，导致除零、空输入等问题上线才暴露。应针对每个 Result 的 Error 分支与边界值写断言，并让测试在 CI 中强制通过。",
    "q": [
      {
        "q": "Expecto 中定义一组测试的函数？",
        "a": "testList"
      },
      {
        "q": "运行 .NET 测试的统一命令？",
        "a": "dotnet test"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧",
    "p": [
      "dotnet fsi 可逐行粘贴代码验证假设，用 val it 查看推断类型与求值结果",
      "在交互式环境中 #time \"on\" 打开耗时统计，#quit 退出，适合定位慢表达式",
      "IDE 断点是最直接的手段，条件断点与“仅命中时中断”可减少无效停顿",
      "Debug.Assert 与结构化日志适合排查并发与偶发问题，避免只依赖 printfn"
    ],
    "c": "module Debugging\n\nopen System.Diagnostics\n\nlet divide a b =\n    Debug.Assert(b <> 0, \"除数不能为零\")\n    a / b\n\nlet buggySum xs =\n    // 假设错误：空列表时直接取 Head\n    List.head xs + List.sum xs\n[<EntryPoint>]\nlet main _ =\n    // 交互式调试：dotnet fsi 后输入 #time \"on\";; 并逐步求值\n    printfn \"divide = %d\" (divide 10 2)\n    try\n        printfn \"%d\" (buggySum [])\n    with ex ->\n        printfn \"异常类型: %s\" (ex.GetType().Name)\n        printfn \"消息: %s\" ex.Message\n    let sw = Stopwatch.StartNew()\n    let total = [ 1 .. 100000 ] |> List.sum\n    sw.Stop()\n    printfn \"求和 %d 用时 %d ms\" total sw.ElapsedMilliseconds\n    0",
    "et": "❌ 常见错误",
    "ec": "只用 printfn 打日志且不删除，生产环境输出大量噪声甚至泄露数据。应改用 ILogger 或结构化日志按级别输出，调试输出在提交前清理，敏感字段必须脱敏。",
    "q": [
      {
        "q": "F# 交互式环境的耗时统计指令？",
        "a": "#time \"on\""
      },
      {
        "q": "仅在 Debug 配置生效的断言类？",
        "a": "System.Diagnostics.Debug.Assert"
      }
    ]
  },
  {
    "id": 26,
    "t": "互操作与系统调用",
    "p": [
      "P/Invoke 用 [<DllImport>] extern 声明 C 函数，需匹配调用约定与参数类型",
      "结构体传给原生代码时用 [<StructLayout(LayoutKind.Sequential)>] 保证内存布局一致",
      "调用 C# 库无需特殊处理，直接 open 命名空间并实例化；反向由 C# 引用 F# 项目",
      "跨语言边界注意字符串编码、生命周期与异常转换，避免把托管对象指针传给原生代码"
    ],
    "c": "module Interop\n\nopen System\nopen System.Runtime.InteropServices\n\n[<DllImport(\"libc\", EntryPoint = \"getpid\", CallingConvention = CallingConvention.Cdecl)>]\nextern int getpid()\n\n[<Struct>]\ntype Point =\n    { X: int\n      Y: int }\n\n[<DllImport(\"user32.dll\", CharSet = CharSet.Unicode)>]\nextern int MessageBox(IntPtr hWnd, string text, string caption, uint32 flags)\n[<EntryPoint>]\nlet main _ =\n    try\n        printfn \"进程号: %d\" (getpid())\n    with ex ->\n        printfn \"当前平台不可用: %s\" ex.Message\n    let p = { X = 1; Y = 2 }\n    printfn \"结构体: %d,%d\" p.X p.Y\n    printfn \"调用 C# 库: %s\" (String.Join(\"-\", [| \"a\"; \"b\" |]))\n    0",
    "et": "❌ 常见错误",
    "ec": "声明 DllImport 时写错库名或调用约定，运行时报 EntryPointNotFoundException 或栈损坏。应确认目标平台库名、字符集与 CallingConvention，并用 try 包裹以处理平台差异。",
    "q": [
      {
        "q": "声明原生函数导入的特性？",
        "a": "[<DllImport>]"
      },
      {
        "q": "保证结构体内存布局一致的特性？",
        "a": "[<StructLayout(LayoutKind.Sequential)>]"
      }
    ]
  },
  {
    "id": 27,
    "t": "函数式架构与设计模式",
    "p": [
      "用判别联合建模领域状态，配合模式匹配消除非法状态，比继承层次更易扩展",
      "管道式设计把业务拆成小函数，用 >> 与 |> 组合，每一步都可独立测试",
      "Result 串联形成“铁路式”流程，错误在链路中短路，避免层层嵌套 if",
      "依赖注入用函数参数传递（如 save: User -> Result<unit, Error>），比容器更轻量可测"
    ],
    "c": "module Architecture\n\ntype Customer =\n    { Id: int\n      Email: string\n      Active: bool }\ntype Error =\n    | NotFound\n    | Inactive\n    | SaveFailed of string\nlet save (c: Customer) : Result<unit, Error> =\n    if c.Email.Contains \"@\" then Ok ()\n    else Error (SaveFailed \"邮箱格式错误\")\nlet process (load: int -> Result<Customer, Error>) id =\n    load id\n    |> Result.bind (fun c -> if c.Active then Ok c else Error Inactive)\n    |> Result.map (fun c -> { c with Email = c.Email.Trim().ToLowerInvariant() })\n    |> Result.bind save\n[<EntryPoint>]\nlet main _ =\n    let store = Map.ofList [ 1, { Id = 1; Email = \" Ada@Example.COM \"; Active = true } ]\n    let load id = Map.tryFind id store |> Option.map Ok |> Option.defaultValue (Error NotFound)\n    printfn \"%A\" (process load 1)\n    printfn \"%A\" (process load 99)\n    0",
    "et": "❌ 常见错误",
    "ec": "为了套用设计模式引入大量接口与工厂，反而掩盖了简单数据流。F# 应优先用联合类型与纯函数组合表达业务，只有真正需要运行时替换或互操作时才引入接口。",
    "q": [
      {
        "q": "串联 Result 计算的函数？",
        "a": "Result.bind"
      },
      {
        "q": "F# 中轻量依赖注入的常见方式？",
        "a": "把依赖作为函数参数传入"
      }
    ]
  },
  {
    "id": 28,
    "t": "数据库访问",
    "p": [
      "ADO.NET 是 .NET 数据访问基础：DbConnection、DbCommand、DbDataReader 配合参数化查询",
      "SQLite 适合嵌入式与本地开发，包 Microsoft.Data.Sqlite；生产常用 PostgreSQL/SQL Server",
      "查询结果用 Seq 或 List 映射为记录，读取时按列序号或列名取值并处理 DBNull",
      "写操作放事务中，使用参数占位符而非字符串拼接，避免 SQL 注入并提升执行计划复用"
    ],
    "c": "// 保存为 db.fsx，运行：dotnet fsi db.fsx\n#r \"nuget: Microsoft.Data.Sqlite, 8.0.0\"\n\nopen Microsoft.Data.Sqlite\n\ntype User = { Id: int; Name: string }\nlet main () =\n    use conn = new SqliteConnection(\"Data Source=:memory:\")\n    conn.Open()\n    use create = conn.CreateCommand()\n    create.CommandText <- \"CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL)\"\n    create.ExecuteNonQuery() |> ignore\n    use insert = conn.CreateCommand()\n    insert.CommandText <- \"INSERT INTO users (id, name) VALUES ($id, $name)\"\n    insert.Parameters.AddWithValue(\"$id\", 1) |> ignore\n    insert.Parameters.AddWithValue(\"$name\", \"Ada\") |> ignore\n    insert.ExecuteNonQuery() |> ignore\n    use select = conn.CreateCommand()\n    select.CommandText <- \"SELECT id, name FROM users ORDER BY id\"\n    use reader = select.ExecuteReader()\n    let users =\n        [ while reader.Read() do\n              yield { Id = reader.GetInt32(0); Name = reader.GetString(1) } ]\n    printfn \"%A\" users\nmain ()",
    "et": "❌ 常见错误",
    "ec": "用字符串拼接生成 SQL，如 \"WHERE name = '\" + name + \"'\"，既易被注入又无法复用执行计划。应使用 $name 参数占位符并通过 Parameters.AddWithValue 传值。",
    "q": [
      {
        "q": "SQLite 的 .NET 驱动包名？",
        "a": "Microsoft.Data.Sqlite"
      },
      {
        "q": "防止 SQL 注入的关键做法？",
        "a": "使用参数化查询而不是拼接字符串"
      }
    ]
  },
  {
    "id": 29,
    "t": "网络编程与 HTTP",
    "p": [
      "HttpClient 是发起 HTTP 请求的标准方式，应复用单例而不是每次 new，避免端口耗尽",
      "GetStringAsync/GetAsync 返回 Task，F# 用 Async.AwaitTask 接入异步工作流",
      "System.Text.Json 提供 JsonSerializer，可序列化记录并配置命名策略与忽略 null",
      "服务端可用 ASP.NET Core Minimal API 或 HttpListener，注意设置超时与取消令牌"
    ],
    "c": "module HttpDemo\nopen System\nopen System.Net.Http\nopen System.Text.Json\ntype Repo = { name: string; stargazers_count: int }\nlet fetchRepos () = async {\n    use client = new HttpClient()\n    client.DefaultRequestHeaders.UserAgent.ParseAdd(\"fsharp-demo\")\n    client.Timeout <- TimeSpan.FromSeconds 10.0\n    let! json =\n        client.GetStringAsync(\"https://api.github.com/users/dotnet/repos\")\n        |> Async.AwaitTask\n    return JsonSerializer.Deserialize<Repo[]>(json)\n}\n[<EntryPoint>]\nlet main _ =\n    try\n        let repos = fetchRepos () |> Async.RunSynchronously\n        repos\n        |> Array.sortByDescending (fun r -> r.stargazers_count)\n        |> Array.truncate 3\n        |> Array.iter (fun r -> printfn \"%s: %d\" r.name r.stargazers_count)\n    with ex ->\n        printfn \"请求失败: %s\" ex.Message\n    0",
    "et": "❌ 常见错误",
    "ec": "每次请求都 new HttpClient 且不释放，短时间高频调用会耗尽本地端口并抛 SocketException。应复用长生命周期的 HttpClient，或用 IHttpClientFactory 管理连接。",
    "q": [
      {
        "q": "F# 中等待 Task 的辅助函数？",
        "a": "Async.AwaitTask"
      },
      {
        "q": "为什么不应每次请求新建 HttpClient？",
        "a": "会造成连接与端口耗尽，应复用实例"
      }
    ]
  },
  {
    "id": 30,
    "t": "安全编程",
    "p": [
      "密码存储用 PBKDF2（Rfc2898DeriveBytes）或 bcrypt/argon2，每用户独立随机盐，绝不明文保存",
      "比较敏感数据用 CryptographicOperations.FixedTimeEquals，避免时序侧信道泄露",
      "所有外部输入校验长度、格式与范围；数据库用参数化查询，文件路径做规范化校验",
      "传输启用 TLS，密钥放环境变量或密钥管理服务，禁止写入源码与日志"
    ],
    "c": "module Security\n\nopen System\nopen System.Security.Cryptography\nopen System.Text\nlet hashPassword (password: string) (salt: byte[]) =\n    use pbkdf2 = new Rfc2898DeriveBytes(password, salt, 210000, HashAlgorithmName.SHA256)\n    pbkdf2.GetBytes 32\nlet verify password salt expected =\n    let actual = hashPassword password salt\n    CryptographicOperations.FixedTimeEquals(actual, expected)\nlet isValidEmail (email: string) =\n    not (String.IsNullOrWhiteSpace email) &&\n    email.Length <= 254 &&\n    email.Contains(\"@\") &&\n    not (email.Contains(\" \"))\n[<EntryPoint>]\nlet main _ =\n    let salt = RandomNumberGenerator.GetBytes 16\n    let stored = hashPassword \"s3cret\" salt\n    printfn \"长度: %d 字节\" stored.Length\n    printfn \"校验正确密码: %b\" (verify \"s3cret\" salt stored)\n    printfn \"校验错误密码: %b\" (verify \"wrong\" salt stored)\n    printfn \"邮箱合法: %b %b\" (isValidEmail \"ada@example.com\") (isValidEmail \"bad input\")\n    0",
    "et": "❌ 常见错误",
    "ec": "用 MD5/SHA1 直接哈希密码且不加盐，彩虹表可瞬间反查。应使用 PBKDF2 等慢哈希并保存每个用户独立的随机盐，同时设置足够的迭代次数。",
    "q": [
      {
        "q": "安全比较两个字节数组的函数？",
        "a": "CryptographicOperations.FixedTimeEquals"
      },
      {
        "q": "保存密码时应使用哪类算法？",
        "a": "慢哈希（PBKDF2/bcrypt/argon2）加随机盐"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战：命令行工具",
    "p": [
      "入口点 main argv 直接拿到参数数组，按模式匹配参数个数并给出用法提示",
      "System.CommandLine 或 Argu 可自动解析选项与子命令，生成帮助并做类型转换",
      "成功返回 0，参数错误返回非 0；错误信息写 stderr，正常结果写 stdout，便于脚本组合",
      "处理文件时先校验存在性与大小，避免把整个大文件一次性读入内存造成内存峰值"
    ],
    "c": "module WordCount\n\nopen System\nopen System.IO\n\nlet countWords (text: string) =\n    text.Split([| ' '; '\\t'; '\\n'; '\\r' |], StringSplitOptions.RemoveEmptyEntries)\n    |> Array.countBy id\n[<EntryPoint>]\nlet main argv =\n    match argv with\n    | [| path |] when File.Exists path ->\n        let counts =\n            File.ReadAllText path\n            |> countWords\n            |> Array.sortByDescending snd\n            |> Array.truncate 10\n        counts |> Array.iter (fun (w, n) -> printfn \"%-20s %d\" w n)\n        0\n    | [| path |] ->\n        eprintfn \"文件不存在: %s\" path\n        1\n    | _ ->\n        eprintfn \"用法: wordcount <文件>\"\n        2",
    "et": "❌ 常见错误",
    "ec": "在 main 里直接 argv.[0] 取参数，用户不传参数时抛越界异常并打印难懂的堆栈。应先对 argv 做模式匹配，分别处理正常、文件不存在与用法错误三种情况。",
    "q": [
      {
        "q": "F# 入口点返回值的含义？",
        "a": "进程退出码，0 表示成功"
      },
      {
        "q": "错误信息应写入哪个流？",
        "a": "stderr（eprintfn）"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战：Web 服务",
    "p": [
      "HttpListener 无需额外依赖即可在本地起 HTTP 服务，前缀必须以斜杠结尾并授予权限",
      "读取请求路径与方法，按路由返回状态码、Content-Type 与 JSON 响应体",
      "循环处理请求时用 async 或 Task 避免阻塞，生产项目建议直接用 ASP.NET Core",
      "用 try/finally 确保监听器停止，端口通过参数传入，便于部署与测试"
    ],
    "c": "module WebService\nopen System\nopen System.Net\nopen System.Text\nlet respond (ctx: HttpListenerContext) code (body: string) =\n    let bytes = Encoding.UTF8.GetBytes body\n    ctx.Response.StatusCode <- code\n    ctx.Response.ContentType <- \"application/json; charset=utf-8\"\n    ctx.Response.ContentLength64 <- int64 bytes.Length\n    ctx.Response.OutputStream.Write(bytes, 0, bytes.Length)\n    ctx.Response.Close()\n[<EntryPoint>]\nlet main argv =\n    let port = if argv.Length > 0 then int argv.[0] else 8080\n    let listener = new HttpListener()\n    listener.Prefixes.Add(sprintf \"http://localhost:%d/\" port)\n    listener.Start()\n    printfn \"监听 http://localhost:%d/\" port\n    while true do\n        let ctx = listener.GetContext()\n        match ctx.Request.Url.AbsolutePath with\n        | \"/health\" -> respond ctx 200 \"\"\"{\"status\":\"ok\"}\"\"\"\n        | \"/\" -> respond ctx 200 \"\"\"{\"message\":\"hello fsharp\"}\"\"\"\n        | _ -> respond ctx 404 \"\"\"{\"error\":\"not found\"}\"\"\"\n    0",
    "et": "❌ 常见错误",
    "ec": "HttpListener 前缀写成 http://localhost:8080 而缺少结尾斜杠时，启动会抛 ArgumentException。前缀必须形如 http://localhost:8080/，绑定外部地址还需相应授权。",
    "q": [
      {
        "q": "HttpListener 注册前缀的集合属性？",
        "a": "Prefixes"
      },
      {
        "q": "设置响应内容类型的属性？",
        "a": "Response.ContentType"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建、部署与发布",
    "p": [
      "dotnet publish -c Release 生成可部署产物，-r 指定 RID 与 --self-contained 打包运行时",
      "PublishSingleFile、PublishTrimmed、ReadyToRun 可减小体积与启动时间，但需验证反射兼容性",
      "容器部署用多阶段 Dockerfile：SDK 镜像构建，aspnet/runtime 镜像运行，减小最终镜像",
      "版本号写在 fsproj 的 Version/AssemblyVersion，CI 中用 Git 标签注入并产出可追溯制品"
    ],
    "c": "// 发布命令速查：\n// dotnet publish -c Release -o out\n// dotnet publish -c Release -r linux-x64 --self-contained true -p:PublishSingleFile=true\n// dotnet publish -c Release -p:PublishTrimmed=true -p:ReadyToRun=true\n// Dockerfile:\n//   FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build\n//   WORKDIR /src && COPY . . && RUN dotnet publish -c Release -o /app\n//   FROM mcr.microsoft.com/dotnet/runtime:8.0\n//   WORKDIR /app && COPY --from=build /app . && ENTRYPOINT [\"dotnet\", \"App.dll\"]\nmodule Release\n\n[<EntryPoint>]\nlet main _ =\n    let asm = System.Reflection.Assembly.GetExecutingAssembly()\n    let info = asm.GetName()\n    printfn \"程序集: %s\" info.Name\n    printfn \"版本: %O\" info.Version\n    printfn \"运行时: %O\" System.Environment.Version\n    printfn \"发布: dotnet publish -c Release -r linux-x64 --self-contained\"\n    0",
    "et": "❌ 常见错误",
    "ec": "开启 PublishTrimmed 后仍大量使用反射或动态类型，发布后运行时报 MissingMethodException。裁剪前应验证依赖，或对相关程序集配置 TrimmerRootAssembly 保留。",
    "q": [
      {
        "q": "发布 F# 应用的命令？",
        "a": "dotnet publish -c Release"
      },
      {
        "q": "把运行时一起打包的选项？",
        "a": "--self-contained true"
      }
    ]
  },
  {
    "id": 34,
    "t": "最佳实践与代码风格",
    "p": [
      "默认使用不可变绑定与纯函数，副作用集中在程序边界，便于测试与并行化",
      "用 Option/Result 替代 null 与异常控制流，避免 NullReferenceException 扩散",
      "函数保持短小、命名表达意图；模块按领域划分，公开 API 尽量少",
      "启用 TreatWarningsAsErrors 与 FSharpLint，提交前用 dotnet fantomas 统一格式"
    ],
    "c": "module BestPractices\ntype Customer =\n    { Id: int\n      Email: string option }\ntype Error =\n    | InvalidId\n    | MissingEmail\nlet validate customer =\n    if customer.Id <= 0 then Error InvalidId\n    else\n        match customer.Email with\n        | None -> Error MissingEmail\n        | Some email when System.String.IsNullOrWhiteSpace email -> Error MissingEmail\n        | Some _ -> Ok customer\n[<EntryPoint>]\nlet main _ =\n    let ok = { Id = 1; Email = Some \"ada@example.com\" }\n    let bad = { Id = 0; Email = None }\n    match validate ok with\n    | Ok c -> printfn \"通过: %d\" c.Id\n    | Error _ -> printfn \"失败\"\n    match validate bad with\n    | Ok _ -> printfn \"不应发生\"\n    | Error _ -> printfn \"预期失败: 缺少邮箱或 ID 非法\"\n    0",
    "et": "❌ 常见错误",
    "ec": "在 F# 里沿用 C# 风格到处用 null 表示缺失，导致模式匹配无法穷尽且容易空引用。应使用 Option，并在边界处用 Option.ofObj 把外部 null 转成 None。",
    "q": [
      {
        "q": "F# 中表示缺失值的首选类型？",
        "a": "Option<'T>"
      },
      {
        "q": "把可能为 null 的引用转为 Option 的函数？",
        "a": "Option.ofObj"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "路线：绑定与函数 → 判别联合与模式匹配 → 集合与管道 → 异步与并发 → 项目实战",
      "推荐资源：F# 官方文档、F# for Fun and Profit、《Domain Modeling Made Functional》",
      "进阶方向：Fable 前端、FParsec 解析、类型提供器、ASP.NET Core 与云原生部署",
      "坚持用 dotnet fsi 做小实验，读 FSharp.Core 源码，并为开源项目贡献代码"
    ],
    "c": "module Roadmap\n\nlet topics =\n    [ \"基础\", [ \"let 绑定\"; \"函数与柯里化\"; \"模式匹配\"; \"判别联合\" ]\n      \"数据\", [ \"List/Array/Seq\"; \"Map/Set\"; \"管道与组合\" ]\n      \"工程\", [ \"dotnet CLI\"; \"NuGet/Paket\"; \"Expecto/xUnit\"; \"fantomas\" ]\n      \"进阶\", [ \"async/task\"; \"MailboxProcessor\"; \"类型提供器\"; \"Fable\" ] ]\n\n[<EntryPoint>]\nlet main _ =\n    topics\n    |> List.iter (fun (name, items) ->\n        printfn \"%s: %s\" name (String.concat \" / \" items))\n\n    printfn \"文档: https://learn.microsoft.com/dotnet/fsharp/\"\n    printfn \"社区: https://fsharp.org 与 https://fsharpforfunandprofit.com\"\n    printfn \"下一步: 用判别联合建模订单，写 Expecto 测试并发布为容器镜像\"\n    printfn \"当前运行时: %O\" System.Environment.Version\n    0",
    "et": "❌ 常见错误",
    "ec": "只读语法不写项目，遇到类型推断错误就加大量标注硬凑。应从领域建模入手，先用联合类型描述业务，再让编译器引导补全分支，逐步建立函数式思维。",
    "q": [
      {
        "q": "F# 领域建模的核心类型工具？",
        "a": "判别联合（Discriminated Union）"
      },
      {
        "q": "推荐的 F# 学习网站？",
        "a": "F# for Fun and Profit（fsharpforfunandprofit.com）"
      }
    ]
  }
];
