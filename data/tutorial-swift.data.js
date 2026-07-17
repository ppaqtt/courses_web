window.TUTORIAL_DATA_swift = [
  {
    "id": 1,
    "t": "Swift简介",
    "p": [
      "诞生背景：Swift由Apple于2014年WWDC发布，由Chris Lattner主导设计，旨在替代Objective-C成为Apple平台主力开发语言",
      "设计理念：安全、快速、表达力强，融合了Objective-C、Rust、Haskell等语言的优点",
      "开源之路：2015年12月开源，支持Linux平台，社区活跃，版本迭代快速",
      "应用场景：iOS/macOS/watchOS/tvOS应用开发、服务端开发(Vapor/Perfect)、机器学习(Swift for TensorFlow)",
      "核心特性：类型安全、可选类型、闭包、协议导向编程、值类型优先、自动引用计数(ARC)"
    ],
    "c": "// Swift版本信息\n// Swift 5.9+ 是当前主流版本\n\n// 第一个Swift程序\nprint(\"Hello, Swift!\")\n\n// Swift是类型安全的语言\nlet language: String = \"Swift\"\nlet year: Int = 2014\nprint(\"\\(language)诞生于\\(year)年\")",
    "et": "❌ 常见错误",
    "ec": "混淆Swift与SwiftUI：Swift是编程语言，SwiftUI是UI框架，两者不是同一个概念\n以为Swift只能在Apple平台使用：Swift已开源，也支持Linux和Windows上的服务端开发",
    "q": [
      {
        "q": "Swift是在哪一年发布的？",
        "a": "2014年"
      }
    ]
  },
  {
    "id": 2,
    "t": "Xcode配置",
    "p": [
      "Xcode安装：从Mac App Store下载Xcode，需要macOS系统，Xcode是Apple官方IDE",
      "Playground：Swift Playground是交互式学习环境，可即时查看代码执行结果，适合学习与原型设计",
      "项目创建：通过Xcode创建项目，选择iOS/macOS等平台模板，配置组织标识符和签名",
      "命令行工具：安装Xcode Command Line Tools后可在终端使用swift命令编译运行Swift代码"
    ],
    "c": "// 终端中检查Swift版本\n// $ swift --version\n\n// 终端中运行Swift REPL\n// $ swift\n// > print(\"Hello from REPL\")\n\n// 编译运行Swift文件\n// $ swift hello.swift\n\n// 使用Swift Package Manager初始化项目\n// $ mkdir MyProject && cd MyProject\n// $ swift package init --type executable\n// $ swift run",
    "et": "❌ 常见错误",
    "ec": "未安装Command Line Tools：终端执行swift命令报错，需先运行 xcode-select --install\n签名配置缺失：真机调试时报签名错误，需在Xcode中配置Team和Bundle Identifier",
    "q": [
      {
        "q": "在终端中查看Swift版本的命令是什么？",
        "a": "swift --version"
      }
    ]
  },
  {
    "id": 3,
    "t": "第一个Swift程序",
    "p": [
      "print函数：使用print()输出内容到控制台，支持字符串插值 \\(变量名)",
      "程序入口：Swift程序从源文件顶部代码开始执行，不需要main函数（Swift 5.3+），也可用@main标记入口",
      "字符串插值：使用\\(expression)在字符串中嵌入表达式，这是Swift的特色功能",
      "语句结尾：Swift语句末尾不需要分号，但同一行多条语句需要分号分隔"
    ],
    "c": "// 第一个Swift程序\nprint(\"Hello, World!\")\n\n// 字符串插值\nlet name = \"Swift学习者\"\nlet year = 2024\nprint(\"你好，\\(name)！现在是\\(year)年\")\n\n// 简单计算\nlet a = 10\nlet b = 20\nprint(\"\\(a) + \\(b) = \\(a + b)\")\n\n// 多条语句同行需要分号\nlet x = 1; let y = 2\nprint(\"x=\\(x), y=\\(y)\")",
    "et": "❌ 常见错误",
    "ec": "字符串插值格式错误：print(\"姓名：name\") 不会替换变量，应使用 print(\"姓名：\\(name)\")\n使用var而非let：对于不会改变的值应使用let声明常量，这是Swift的最佳实践",
    "q": [
      {
        "q": "用字符串插值输出\"我今年X岁\"（X为变量age的值）",
        "a": "let age = 20 print(\"我今年\\(age)岁\")"
      }
    ]
  },
  {
    "id": 4,
    "t": "注释与分号",
    "p": [
      "单行注释：使用 // 开头，// 后面的内容不会被执行",
      "多行注释：使用 /* */ 包裹，支持嵌套注释（Swift特色，不同于C/Java）",
      "文档注释：使用 /// 开头生成Quick Help文档，Xcode可自动显示",
      "分号规则：Swift语句末尾无需分号，但同一行多条语句必须用分号分隔"
    ],
    "c": "// 这是单行注释\nlet greeting = \"Hello\"  // 行末注释\n\n/* 这是多行注释\n   可以跨越多行 */\n\n/* Swift支持嵌套注释 /* 像这样 */\n   在C语言中这是不允许的 */\n\n/// 这是文档注释\n/// 用于生成代码文档\n/// - Parameter name: 用户名\n/// - Returns: 问候语\nfunc sayHello(to name: String) -> String {\n    return \"Hello, \\(name)!\"\n}\n\n// 同一行多条语句需要分号\nlet a = 1; let b = 2; print(a + b)",
    "et": "❌ 常见错误",
    "ec": "多行注释未闭合：忘记写 */ 导致后续代码都被当作注释\n不必要的分号：Swift中每行末尾加分号虽然不报错，但不符合代码规范，应省略",
    "q": [
      {
        "q": "Swift的多行注释相比C语言有什么特殊之处？",
        "a": "B"
      }
    ]
  },
  {
    "id": 5,
    "t": "变量与常量",
    "p": [
      "let常量：使用let声明常量，一旦赋值不可修改，Swift推荐优先使用let",
      "var变量：使用var声明变量，值可以修改，仅在需要改变值时使用var",
      "类型推断：Swift编译器能自动推断变量类型，无需显式声明，但也可显式指定类型",
      "命名规则：支持Unicode字符命名，不能包含数学符号、箭头、空白字符，不能以数字开头"
    ],
    "c": "// 常量声明\nlet pi = 3.14159\nlet companyName: String = \"Apple\"\n\n// 变量声明\nvar score = 0\nscore = 100  // 合法，var可以修改\n\n// 类型推断与显式声明\nlet age = 25           // 推断为Int\nlet price: Double = 9.99  // 显式声明Double\n\n// 多重声明\nvar x = 0, y = 0, z = 0\n\n// 支持Unicode命名\nlet 你好 = \"Hello\"\nlet 🐱 = \"Cat\"\nprint(你好)\nprint(🐱)",
    "et": "❌ 常见错误",
    "ec": "修改常量：let x = 1; x = 2 编译错误，常量一旦赋值不可修改\n类型不匹配：var name: String = 42 编译错误，类型不匹配需先转换",
    "q": [
      {
        "q": "以下哪种情况应使用let而非var？",
        "a": "B"
      }
    ]
  },
  {
    "id": 6,
    "t": "整数与浮点数",
    "p": [
      "整数类型：Int（有符号，默认）、UInt（无符号），以及Int8/16/32/64等固定位宽类型",
      "浮点类型：Double（64位，默认浮点推断类型）、Float（32位），精度分别为15位和6位",
      "数值字面量：支持十进制、二进制(0b)、八进制(0o)、十六进制(0x)、科学计数法",
      "数值可读性：可用下划线分隔大数字提升可读性，如 1_000_000"
    ],
    "c": "// 整数\nlet decimal = 17\nlet binary = 0b10001      // 二进制 = 17\nlet octal = 0o21          // 八进制 = 17\nlet hex = 0x11            // 十六进制 = 17\n\n// 浮点数\nlet d: Double = 3.14159   // 64位，15位精度\nlet f: Float = 3.14       // 32位，6位精度\nlet scientific = 1.25e2   // 科学计数法 = 125.0\n\n// 数值可读性\nlet bigNumber = 1_000_000\nlet million = 1_000_000.0\n\n// 类型推断\nlet inferredDouble = 3.14  // 推断为Double\nlet inferredInt = 42       // 推断为Int\n\n// Int的范围\nprint(Int.min)  // 平台相关：-9223372036854775808（64位）\nprint(Int.max)  // 9223372036854775807",
    "et": "❌ 常见错误",
    "ec": "整数除法：5 / 2 结果为2（整数除法），若要得到2.5需写 5.0 / 2 或 Double(5) / 2\nFloat与Double混用：let x: Float = 3.14 + 0.1 需注意Float精度不足，默认浮点字面量为Double",
    "q": [
      {
        "q": "表达式 7 / 2 的结果是什么类型和值？",
        "a": "Int类型，值为3（整数除法截断小数）"
      }
    ]
  },
  {
    "id": 7,
    "t": "布尔与元组",
    "p": [
      "Bool类型：只有true和false两个值，Swift不支持非零即真，条件判断必须是Bool类型",
      "元组(Tuple)：将多个值组合为单一复合值，使用括号创建，可包含不同类型",
      "元组解构：可将元组的元素分解为单独的常量或变量，也可通过索引或命名访问",
      "元组适用场景：函数返回多个值、临时组合数据，不适合复杂数据结构（应用结构体）"
    ],
    "c": "// 布尔类型\nlet isSwift = true\nlet isOld = false\n\n// Swift中条件必须是Bool\n// if 1 { }  // 编译错误！\nif isSwift {\n    print(\"正在学习Swift\")\n}\n\n// 元组\nlet httpError = (404, \"Not Found\")\nprint(httpError.0)  // 404\nprint(httpError.1)  // Not Found\n\n// 命名元组\nlet user = (name: \"Alice\", age: 25)\nprint(user.name)    // Alice\nprint(user.age)     // 25\n\n// 元组解构\nlet (statusCode, statusMessage) = httpError\nprint(\"状态码: \\(statusCode)\")\nprint(\"消息: \\(statusMessage)\")\n\n// 忽略部分值\nlet (justCode, _) = httpError\nprint(justCode)  // 404",
    "et": "❌ 常见错误",
    "ec": "非Bool条件：if score { } 在Swift中编译错误，必须写 if score > 0 { }\n元组索引越界：访问tuple.5但元组只有3个元素会导致编译错误",
    "q": [
      {
        "q": "如何创建一个包含姓名(String)和年龄(Int)的命名元组？",
        "a": "let person = (name: \"Tom\", age: 30)"
      }
    ]
  },
  {
    "id": 8,
    "t": "可选类型(Optional)",
    "p": [
      "可选类型概念：Optional表示变量可能有值也可能为nil，是Swift安全的核心特性",
      "声明可选：在类型后加问号，如 var name: String? 表示name可能为nil",
      "强制解包：使用!强制获取可选值，若为nil则运行时崩溃，务必确定非nil才使用",
      "可选绑定：使用if let或guard let安全解包，是推荐的可选值处理方式",
      "隐式解包：使用!声明(如var x: Int!)，访问时自动解包，但为nil仍会崩溃"
    ],
    "c": "// 声明可选类型\nvar name: String? = \"Alice\"\nvar address: String? = nil\n\n// 强制解包（危险！）\nprint(name!)  // Alice\n// print(address!)  // 运行时崩溃！\n\n// 可选绑定（安全）\nif let userName = name {\n    print(\"用户名: \\(userName)\")\n} else {\n    print(\"用户名为空\")\n}\n\n// guard let（提前退出）\nfunc greet(_ name: String?) {\n    guard let name = name else {\n        print(\"没有名字\")\n        return\n    }\n    print(\"你好, \\(name)\")\n}\n\n// 可选链\nlet upperName = name?.uppercased()  // 可能为nil\n\n// nil合并运算符 ??\nlet displayName = name ?? \"匿名用户\"\n\n// 隐式解包可选\nvar forcedName: String! = \"Bob\"\nprint(forcedName)  // 直接使用，不需要!",
    "et": "❌ 常见错误",
    "ec": "强制解包nil：var x: Int? = nil; print(x!) 运行时崩溃，应使用可选绑定\n忘记解包：let len = name?.count 结果仍为Int?，不能直接当Int使用",
    "q": [
      {
        "q": "使用可选绑定安全地解包可选变量 age: Int? 并打印",
        "a": "if let age = age { print(\"年龄: \\(age)\") }"
      }
    ]
  },
  {
    "id": 9,
    "t": "字符串基础",
    "p": [
      "字符串创建：使用双引号创建String类型，Swift的String是值类型（结构体），赋值时拷贝",
      "字符串插值：\\(expression)语法在字符串中嵌入任意表达式，支持函数调用和运算",
      "多行字符串：使用三个双引号\"\"\"创建多行字符串，换行和缩进有特殊规则",
      "字符类型：Character表示单个Unicode标量，可用for-in遍历字符串的每个字符"
    ],
    "c": "// 创建字符串\nlet greeting = \"Hello, Swift!\"\nlet empty = String()        // 空字符串\nlet alsoEmpty = \"\"          // 空字符串字面量\n\n// 字符串插值\nlet score = 95\nlet message = \"你的分数是\\(score)分，\\(score >= 60 ? \"及格\" : \"不及格\")\"\n\n// 多行字符串\nlet poem = \"\"\"\n白日依山尽，\n黄河入海流。\n欲穷千里目，\n更上一层楼。\n\"\"\"\n\n// 遍历字符\nfor char in \"Hello\" {\n    print(char)\n}\n\n// 字符串属性\nlet text = \"Swift\"\nprint(text.count)       // 5\nprint(text.isEmpty)     // false\nprint(text.hasPrefix(\"Sw\"))  // true\nprint(text.hasSuffix(\"ft\"))  // true",
    "et": "❌ 常见错误",
    "ec": "使用==比较字符串与字符：单个字符的字符串和Character类型不同，需要注意类型匹配\n多行字符串缩进问题：关闭的\"\"\"的缩进决定了内容缩进基线，缩进不正确会导致字符串中有额外空格",
    "q": [
      {
        "q": "如何判断一个字符串是否为空？",
        "a": "str.isEmpty"
      }
    ]
  },
  {
    "id": 10,
    "t": "字符串操作",
    "p": [
      "拼接与修改：使用+和+=拼接字符串，append()追加字符，String是值类型修改会创建新副本",
      "索引操作：使用startIndex、endIndex和index(_:offsetBy:)访问指定位置字符",
      "子字符串：使用下标获取子串，结果为SubString类型（共享原字符串内存），用完应转为String",
      "常用方法：uppercased()、lowercased()、contains()、replacingOccurrences()、split()等"
    ],
    "c": "// 拼接\nvar str = \"Hello\"\nstr += \", Swift\"    // \"Hello, Swift\"\nstr.append(\"!\")     // \"Hello, Swift!\"\n\n// 索引操作\nlet text = \"Swift\"\nlet first = text[text.startIndex]  // \"S\"\nlet last = text[text.index(before: text.endIndex)]  // \"t\"\nlet third = text[text.index(text.startIndex, offsetBy: 2)]  // \"i\"\n\n// 插入与删除\nvar greeting = \"Helo\"\ngreeting.insert(\"l\", at: greeting.index(greeting.startIndex, offsetBy: 2))\ngreeting.remove(at: greeting.index(before: greeting.endIndex))\n\n// 子字符串\nlet full = \"Hello, World!\"\nlet index = full.firstIndex(of: \",\")!\nlet sub = full[full.startIndex..<index]  // SubString\nlet subStr = String(sub)  // 转为String\n\n// 常用方法\nlet upper = \"hello\".uppercased()     // \"HELLO\"\nlet lower = \"HELLO\".lowercased()     // \"hello\"\nlet has = \"Swift\".contains(\"ift\")    // true\nlet replaced = \"aabbcc\".replacingOccurrences(of: \"bb\", with: \"XX\")  // \"aaXXcc\"\nlet parts = \"a,b,c\".split(separator: \",\")  // [\"a\", \"b\", \"c\"]",
    "et": "❌ 常见错误",
    "ec": "使用整数索引：text[0] 在Swift中编译错误，必须使用text[text.startIndex]\nSubString未转String：SubString共享原字符串内存，长期持有会阻止原字符串释放，用完应转String",
    "q": [
      {
        "q": "获取字符串\"Swift\"中第3个字符",
        "a": "let s = \"Swift\" let char = s[s.index(s.startIndex, offsetBy: 2)] // \"i\""
      }
    ]
  },
  {
    "id": 11,
    "t": "类型转换",
    "p": [
      "数值类型转换：Int与Double/Float之间必须显式转换，Swift不会隐式转换",
      "整数与浮点互转：Int(3.14)截断为3，Double(3)变为3.0",
      "字符串与数值转换：使用Int(\"42\")等初始化器，返回可选值因为可能转换失败",
      "类型判断：使用is运算符判断类型，使用as和as?进行类型转换"
    ],
    "c": "// 数值类型转换\nlet intVal: Int = 42\nlet doubleVal: Double = Double(intVal)  // 42.0\nlet floatVal: Float = Float(intVal)     // 42.0\nlet backToInt: Int = Int(3.99)          // 3（截断）\n\n// 混合运算必须统一类型\nlet a: Int = 10\nlet b: Double = 3.14\n// let c = a + b  // 编译错误！\nlet c = Double(a) + b  // 13.14\n\n// 字符串与数值转换\nlet strToNum = Int(\"42\")         // Optional(42)\nlet strToDouble = Double(\"3.14\") // Optional(3.14)\nlet invalid = Int(\"hello\")       // nil\nlet numToStr = String(42)        // \"42\"\n\n// 安全转换\nif let number = Int(\"123\") {\n    print(\"转换成功: \\(number)\")\n} else {\n    print(\"转换失败\")\n}\n\n// 类型检查与转换\nclass Animal {}\nclass Dog: Animal {}\nlet pet: Animal = Dog()\nif pet is Dog {\n    let dog = pet as! Dog\n    print(\"这是一只狗\")\n}\n// 安全转换\nif let dog = pet as? Dog {\n    print(\"安全转换: 这是一只狗\")\n}",
    "et": "❌ 常见错误",
    "ec": "隐式类型转换：let x: Double = 42 编译错误，需写 let x: Double = 42.0 或 Double(42)\n忽略转换失败：Int(\"abc\")! 强制解包会崩溃，应用if let安全解包",
    "q": [
      {
        "q": "如何将字符串\"3.14\"安全地转换为Double？",
        "a": "if let num = Double(\"3.14\") { print(num) }"
      }
    ]
  },
  {
    "id": 12,
    "t": "运算符",
    "p": [
      "算术运算符：+、-、*、/、%（取余），注意整数除法截断，溢出运算符&+、&-、&*",
      "比较运算符：==、!=、>、=、<=，以及===和!==（引用比较）",
      "逻辑运算符：!（非）、&&（与）、||（或），短路求值",
      "范围运算符：a...b（闭范围）、a..<b（半开范围）、a...（单侧范围）",
      "nil合并：?? 运算符，为nil时提供默认值"
    ],
    "c": "// 算术运算\nprint(10 + 3)    // 13\nprint(10 - 3)    // 7\nprint(10 * 3)    // 30\nprint(10 / 3)    // 3（整数除法）\nprint(10 % 3)    // 1\n\n// 溢出运算符\nlet overflow = UInt8.max &+ 1  // 溢出后回到0\n\n// 比较运算\nprint(5 > 3)     // true\nprint(\"apple\" < \"banana\")  // true（字典序）\n\n// 逻辑运算\nlet x = true, y = false\nprint(!x)         // false\nprint(x && y)     // false\nprint(x || y)     // true\n\n// 范围运算符\nfor i in 1...5 { print(i) }    // 1,2,3,4,5\nfor i in 1..<5 { print(i) }    // 1,2,3,4\nlet names = [\"A\", \"B\", \"C\", \"D\"]\nprint(names[2...])  // [\"C\", \"D\"]\n\n// nil合并\nlet nickname: String? = nil\nlet name = nickname ?? \"匿名\"  // \"匿名\"",
    "et": "❌ 常见错误",
    "ec": "混淆==和===：==比较值相等性，===比较引用是否指向同一对象\n范围运算符方向：3...1 是空范围，遍历不会执行，范围必须a ≤ b",
    "q": [
      {
        "q": "1...5 和 1..",
        "a": "1...5包含1,2,3,4,5；1..<5包含1,2,3,4"
      }
    ]
  },
  {
    "id": 13,
    "t": "if-else语句",
    "p": [
      "基本语法：if 条件 { } else { }，条件必须是Bool类型，大括号不可省略",
      "多条件：使用else if处理多个条件分支，从上到下依次判断",
      "条件绑定：在if条件中使用if let解包可选值，同时判断是否为nil",
      "guard语句：提前退出，当条件不满足时立即return，避免嵌套过深"
    ],
    "c": "// 基本if-else\nlet age = 20\nif age >= 18 {\n    print(\"成年人\")\n} else {\n    print(\"未成年人\")\n}\n\n// 多条件判断\nlet score = 85\nif score >= 90 {\n    print(\"优秀\")\n} else if score >= 80 {\n    print(\"良好\")\n} else if score >= 60 {\n    print(\"及格\")\n} else {\n    print(\"不及格\")\n}\n\n// 条件绑定\nlet userName: String? = \"Alice\"\nif let name = userName {\n    print(\"欢迎, \\(name)\")\n} else {\n    print(\"请登录\")\n}\n\n// guard语句\nfunc greet(_ name: String?) {\n    guard let name = name else {\n        print(\"没有名字\")\n        return\n    }\n    print(\"你好, \\(name)\")\n}\n\n// 组合条件\nlet isVIP = true\nlet balance = 100\nif isVIP && balance >= 50 {\n    print(\"VIP优惠\")\n}",
    "et": "❌ 常见错误",
    "ec": "省略大括号：if condition { } 的大括号不可省略，即使只有一行代码\n条件非Bool：if score { } 编译错误，必须写 if score > 0 { }",
    "q": [
      {
        "q": "编写if-else语句判断成绩等级（90+优秀，80-89良好，60-79及格，",
        "a": "let score = 85 if score >= 90 { print(\"优秀\") } else if score >= 80 { print(\"良好\") } else if score >= 60 { print(\"及格\") } else { print(\"不及格\") }"
      }
    ]
  },
  {
    "id": 14,
    "t": "switch语句",
    "p": [
      "基本语法：switch value { case pattern: code }，每个case必须有可执行语句",
      "无break：Swift的switch默认不会贯穿，不需要写break",
      "支持类型：不仅支持整数，还支持字符串、浮点数、元组等多种类型",
      "区间匹配：case 1...5: 匹配范围内的值",
      "值绑定：case let x: 在case中绑定匹配的值",
      "where子句：添加额外条件判断"
    ],
    "c": "// 基本switch\nlet day = 3\nswitch day {\ncase 1:\n    print(\"星期一\")\ncase 2:\n    print(\"星期二\")\ncase 3:\n    print(\"星期三\")\ndefault:\n    print(\"其他\")\n}\n\n// 字符串匹配\nlet fruit = \"apple\"\nswitch fruit {\ncase \"apple\":\n    print(\"苹果\")\ncase \"banana\":\n    print(\"香蕉\")\ndefault:\n    print(\"其他水果\")\n}\n\n// 区间匹配\nlet score = 85\nswitch score {\ncase 90...100:\n    print(\"优秀\")\ncase 80..<90:\n    print(\"良好\")\ncase 60..<80:\n    print(\"及格\")\ndefault:\n    print(\"不及格\")\n}\n\n// 元组匹配\nlet point = (3, 4)\nswitch point {\ncase (0, 0):\n    print(\"原点\")\ncase (_, 0):\n    print(\"在x轴上\")\ncase (0, _):\n    print(\"在y轴上\")\ncase (-10...10, -10...10):\n    print(\"在10x10范围内\")\ndefault:\n    print(\"在范围外\")\n}\n\n// 值绑定与where\nlet coordinate = (2, 3)\nswitch coordinate {\ncase let (x, y) where x == y:\n    print(\"在对角线上\")\ncase let (x, y):\n    print(\"x:\\(x), y:\\(y)\")\n}",
    "et": "❌ 常见错误",
    "ec": "case为空：每个case必须有至少一条可执行语句，不能写case 1: break\n遗漏default：除非覆盖所有可能值，否则必须有default分支",
    "q": [
      {
        "q": "用switch语句匹配季节（3-5春，6-8夏，9-11秋，12-2冬）",
        "a": "let month = 4 switch month { case 3...5: print(\"春季\") case 6...8: print(\"夏季\") case 9...11: print(\"秋季\") case 12, 1, 2: print(\"冬季\") default: print(\"无效月份\") }"
      }
    ]
  },
  {
    "id": 15,
    "t": "三目运算符",
    "p": [
      "语法：条件 ? 表达式1 : 表达式2，条件为true返回表达式1，否则返回表达式2",
      "简洁替代：用于简化简单的if-else判断，使代码更紧凑",
      "嵌套使用：可以嵌套但可读性降低，不建议超过两层",
      "可选绑定：可结合可选值使用，如 name ?? \"默认值\""
    ],
    "c": "// 基本三目运算\nlet age = 20\nlet status = age >= 18 ? \"成年\" : \"未成年\"\nprint(status)  // 成年\n\n// 比较大小\nlet x = 10, y = 20\nlet maxVal = x > y ? x : y  // 20\nlet minVal = x < y ? x : y  // 10\n\n// 字符串应用\nlet score = 85\nlet grade = score >= 60 ? \"及格\" : \"不及格\"\n\n// 嵌套三目（不推荐过于复杂）\nlet level = score >= 90 ? \"优秀\" : score >= 80 ? \"良好\" : score >= 60 ? \"及格\" : \"不及格\"\n\n// 与nil合并结合\nlet userName: String? = nil\nlet displayName = userName ?? \"匿名用户\"\n\n// 复杂表达式\nlet a = 5\nlet result = a > 0 ? \"正数\" : a < 0 ? \"负数\" : \"零\"",
    "et": "❌ 常见错误",
    "ec": "过度嵌套：三层以上的三目表达式难以阅读，应改用if-else\n类型不匹配：三目运算符的两个分支必须返回相同类型",
    "q": [
      {
        "q": "用三目运算符判断一个数是奇数还是偶数",
        "a": "let n = 7 let result = n % 2 == 0 ? \"偶数\" : \"奇数\""
      }
    ]
  },
  {
    "id": 16,
    "t": "for循环",
    "p": [
      "for-in循环：遍历序列、集合、范围等可迭代对象",
      "范围循环：for i in 1...5 遍历范围内的整数",
      "数组遍历：for element in array 遍历数组元素",
      "enumerated：同时获取索引和值，for (index, value) in array.enumerated()",
      "字典遍历：for (key, value) in dictionary 遍历键值对"
    ],
    "c": "// 范围循环\nfor i in 1...5 {\n    print(i)  // 1,2,3,4,5\n}\n\n// 半开范围\nfor i in 1..<5 {\n    print(i)  // 1,2,3,4\n}\n\n// 数组遍历\nlet fruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits {\n    print(fruit)\n}\n\n// 带索引遍历\nfor (index, fruit) in fruits.enumerated() {\n    print(\"\\(index): \\(fruit)\")\n}\n\n// 字典遍历\nlet scores = [\"Alice\": 90, \"Bob\": 85]\nfor (name, score) in scores {\n    print(\"\\(name): \\(score)\")\n}\n\n// 跳过元素\nfor i in 1...10 where i % 2 == 0 {\n    print(i)  // 2,4,6,8,10\n}",
    "et": "❌ 常见错误",
    "ec": "修改遍历的集合：在for-in循环中不能修改正在遍历的集合\n索引越界：使用数组索引时要确保索引在有效范围内",
    "q": [
      {
        "q": "用for循环输出1到10的平方数",
        "a": "for i in 1...10 { print(\"\\(i)² = \\(i * i)\") }"
      }
    ]
  },
  {
    "id": 17,
    "t": "while循环",
    "p": [
      "while循环：先判断条件再执行循环体，条件为true时继续循环",
      "repeat-while：先执行循环体再判断条件，至少执行一次（类似do-while）",
      "循环控制：break跳出循环，continue跳过当前迭代",
      "循环标签：使用标签(label)配合break/continue控制嵌套循环"
    ],
    "c": "// while循环\nvar count = 0\nwhile count < 5 {\n    print(\"count: \\(count)\")\n    count += 1\n}\n\n// repeat-while循环（至少执行一次）\nvar num = 0\nrepeat {\n    print(\"num: \\(num)\")\n    num += 1\n} while num < 5\n\n// break跳出循环\nvar i = 0\nwhile i < 10 {\n    if i == 5 {\n        break\n    }\n    print(i)\n    i += 1\n}\n\n// continue跳过迭代\nvar j = 0\nwhile j < 10 {\n    j += 1\n    if j % 2 == 0 {\n        continue\n    }\n    print(j)\n}",
    "et": "❌ 常见错误",
    "ec": "无限循环：忘记更新循环变量导致条件永远为true\n混淆while和repeat-while：repeat-while至少执行一次",
    "q": [
      {
        "q": "用while循环计算1到100的和",
        "a": "var sum = 0 var n = 1 while n <= 100 { sum += n n += 1 } print(sum)"
      }
    ]
  },
  {
    "id": 18,
    "t": "函数基础",
    "p": [
      "函数声明：func 函数名(参数列表) -&gt; 返回类型 { }",
      "参数标签：Swift函数有外部标签和内部标签，外部标签用于调用",
      "默认参数：可为参数提供默认值，调用时可省略",
      "可变参数：使用...表示可变数量的参数，类型为数组",
      "无返回值：返回类型为Void或省略-&gt;返回类型"
    ],
    "c": "// 基本函数\nfunc greet(name: String) -> String {\n    return \"Hello, \\(name)!\"\n}\nprint(greet(name: \"Alice\"))\n\n// 无返回值函数\nfunc sayHello(to name: String) {\n    print(\"Hello, \\(name)!\")\n}\nsayHello(to: \"Bob\")\n\n// 多参数函数\nfunc add(a: Int, b: Int) -> Int {\n    return a + b\n}\nprint(add(a: 10, b: 20))\n\n// 默认参数\nfunc introduce(name: String, age: Int = 18) {\n    print(\"\\(name)今年\\(age)岁\")\n}\nintroduce(name: \"Tom\")\nintroduce(name: \"Jerry\", age: 20)\n\n// 可变参数\nfunc sum(numbers: Int...) -> Int {\n    var total = 0\n    for num in numbers {\n        total += num\n    }\n    return total\n}\nprint(sum(numbers: 1, 2, 3, 4, 5))\n\n// 省略外部标签\nfunc calculate(_ a: Int, plus b: Int) -> Int {\n    return a + b\n}\nprint(calculate(5, plus: 3))",
    "et": "❌ 常见错误",
    "ec": "调用时缺少参数标签：Swift默认需要参数标签，除非使用_省略\n返回类型不匹配：声明了返回类型但没有return语句",
    "q": [
      {
        "q": "定义一个函数计算两个数的乘积",
        "a": "func multiply(a: Int, b: Int) -> Int { return a * b } print(multiply(a: 5, b: 6))"
      }
    ]
  },
  {
    "id": 19,
    "t": "函数高级",
    "p": [
      "返回元组：函数可返回多个值，通过元组实现",
      "函数类型：函数本身也是一种类型，可以作为参数或返回值",
      "嵌套函数：在函数内部定义函数",
      "重载：同一函数名但参数类型/数量不同",
      "泛型函数：使用占位符类型编写通用函数"
    ],
    "c": "// 返回元组\nfunc minMax(array: [Int]) -> (min: Int, max: Int) {\n    var currentMin = array[0]\n    var currentMax = array[0]\n    for value in array {\n        if value < currentMin { currentMin = value }\n        if value > currentMax { currentMax = value }\n    }\n    return (currentMin, currentMax)\n}\nlet result = minMax(array: [3, 1, 4, 1, 5])\nprint(\"min: \\(result.min), max: \\(result.max)\")\n\n// 函数类型\nfunc addTwoInts(_ a: Int, _ b: Int) -> Int {\n    return a + b\n}\nvar mathFunction: (Int, Int) -> Int = addTwoInts\nprint(mathFunction(2, 3))\n\n// 函数作为参数\nfunc printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {\n    print(\"结果: \\(mathFunction(a, b))\")\n}\nprintMathResult(addTwoInts, 5, 3)\n\n// 函数作为返回值\nfunc stepForward(_ input: Int) -> Int {\n    return input + 1\n}\nfunc chooseStepFunction(backward: Bool) -> (Int) -> Int {\n    return backward ? { $0 - 1 } : stepForward\n}\nvar step = chooseStepFunction(backward: false)\nprint(step(10))\n\n// 泛型函数\nfunc swapTwoValues<T>(_ a: inout T, _ b: inout T) {\n    let temp = a\n    a = b\n    b = temp\n}\nvar x = 10, y = 20\nswapTwoValues(&x, &y)",
    "et": "❌ 常见错误",
    "ec": "忽略返回值：返回可选元组时未检查是否为nil\n函数类型不匹配：传递的函数类型必须与参数类型完全一致",
    "q": [
      {
        "q": "定义一个函数返回两个数的和与差",
        "a": "func sumAndDifference(a: Int, b: Int) -> (sum: Int, diff: Int) { return (a + b, a - b) } let result = sumAndDifference(a: 10, b: 3)"
      }
    ]
  },
  {
    "id": 20,
    "t": "闭包",
    "p": [
      "闭包概念：自包含的函数代码块，可以作为参数传递或返回",
      "闭包表达式：{ (参数列表) -&gt; 返回类型 in 语句 }",
      "尾随闭包：函数最后一个参数是闭包时可写在函数括号外面",
      "值捕获：闭包可以捕获其定义周围环境中的常量和变量",
      "逃逸闭包：闭包在函数返回后才执行，需要标注@escaping"
    ],
    "c": "// 闭包表达式\nlet numbers = [3, 1, 4, 1, 5, 9]\nlet sorted = numbers.sorted { (a: Int, b: Int) -> Bool in\n    return a < b\n}\n\n// 简化闭包\nlet sorted2 = numbers.sorted { $0 < $1 }\n\n// 尾随闭包\nlet mapped = numbers.map { (num) -> String in\n    return \"数字: \\(num)\"\n}\n\n// 值捕获\nfunc makeIncrementer(incrementAmount: Int) -> () -> Int {\n    var total = 0\n    func incrementer() -> Int {\n        total += incrementAmount\n        return total\n    }\n    return incrementer\n}\nlet incrementByTwo = makeIncrementer(incrementAmount: 2)\nprint(incrementByTwo())  // 2\nprint(incrementByTwo())  // 4\n\n// 逃逸闭包\nvar completionHandlers: [() -> Void] = []\nfunc someFunctionWithEscapingClosure(completion: @escaping () -> Void) {\n    completionHandlers.append(completion)\n}\n\n// 自动闭包\nfunc serveCustomer(_ provider: @autoclosure () -> String) {\n    print(\"服务: \\(provider())\")\n}\nserveCustomer(\"咖啡\")",
    "et": "❌ 常见错误",
    "ec": "忘记in关键字：闭包表达式中参数列表后必须有in关键字\n值捕获导致的循环引用：在类中使用闭包时要注意self的循环引用",
    "q": [
      {
        "q": "用闭包对数组[5,2,9,1]进行降序排序",
        "a": "let arr = [5,2,9,1] let sorted = arr.sorted { $0 > $1 }"
      }
    ]
  },
  {
    "id": 21,
    "t": "数组",
    "p": [
      "数组创建：使用[]创建，元素类型必须相同，Swift数组是值类型",
      "访问元素：使用下标访问，arr[index]，越界会运行时崩溃",
      "添加删除：append()添加，remove(at:)删除，insert(_:at:)插入",
      "遍历方式：for-in、enumerated()、forEach",
      "常用方法：count、isEmpty、contains()、sort()、filter()、map()、reduce()"
    ],
    "c": "// 创建数组\nvar fruits = [\"apple\", \"banana\", \"cherry\"]\nlet emptyArr = [String]()\nlet repeated = Array(repeating: 0, count: 5)\n\n// 访问元素\nprint(fruits[0])    // apple\nprint(fruits.count) // 3\n\n// 添加元素\nfruits.append(\"date\")\nfruits += [\"elderberry\"]\n\n// 插入元素\nfruits.insert(\"blueberry\", at: 2)\n\n// 删除元素\nlet removed = fruits.remove(at: 0)\n\n// 遍历数组\nfor fruit in fruits {\n    print(fruit)\n}\n\n// 带索引遍历\nfor (index, fruit) in fruits.enumerated() {\n    print(\"\\(index): \\(fruit)\")\n}\n\n// 高阶函数\nlet numbers = [1, 2, 3, 4, 5]\nlet doubled = numbers.map { $0 * 2 }\nlet even = numbers.filter { $0 % 2 == 0 }\nlet sum = numbers.reduce(0, +)",
    "et": "❌ 常见错误",
    "ec": "索引越界：访问arr[10]但数组只有5个元素会崩溃\n修改let数组：let声明的数组不能修改元素或添加删除",
    "q": [
      {
        "q": "用map将数组[1,2,3,4,5]中的每个元素平方",
        "a": "let numbers = [1,2,3,4,5] let squares = numbers.map { $0 * $0 }"
      }
    ]
  },
  {
    "id": 22,
    "t": "集合",
    "p": [
      "集合特点：元素无序、不重复，需要元素实现Hashable协议",
      "创建集合：使用Set&lt;Type&gt;()或[值]创建",
      "集合操作：交集(&amp;)、并集(union)、差集(subtracting)、补集(symmetricDifference)",
      "成员检测：contains()检测元素是否存在",
      "子集超集：isSubset、isSuperset判断集合关系"
    ],
    "c": "// 创建集合\nvar letters = Set<Character>()\nvar fruits: Set = [\"apple\", \"banana\", \"cherry\"]\n\n// 添加元素\nfruits.insert(\"date\")\n\n// 删除元素\nfruits.remove(\"banana\")\n\n// 成员检测\nif fruits.contains(\"apple\") {\n    print(\"包含苹果\")\n}\n\n// 集合操作\nlet setA: Set = [1, 2, 3, 4]\nlet setB: Set = [3, 4, 5, 6]\n\nlet union = setA.union(setB)        // [1,2,3,4,5,6]\nlet intersection = setA.intersection(setB)  // [3,4]\nlet difference = setA.subtracting(setB)     // [1,2]\nlet symmetric = setA.symmetricDifference(setB)  // [1,2,5,6]\n\n// 集合关系\nlet subset: Set = [1, 2]\nprint(subset.isSubset(of: setA))   // true\nprint(setA.isSuperset(of: subset)) // true\n\n// 遍历集合\nfor fruit in fruits {\n    print(fruit)\n}",
    "et": "❌ 常见错误",
    "ec": "元素重复：集合自动去重，添加重复元素不会报错但不会添加\n元素无序：集合中的元素顺序不确定，不能通过索引访问",
    "q": [
      {
        "q": "求两个集合[1,2,3]和[3,4,5]的交集",
        "a": "let a: Set = [1,2,3] let b: Set = [3,4,5] let result = a.intersection(b)"
      }
    ]
  },
  {
    "id": 23,
    "t": "字典",
    "p": [
      "字典特点：键值对集合，键唯一，需要键实现Hashable协议",
      "创建字典：使用[Key: Value]()或[key: value]创建",
      "访问值：使用dict[key]，返回可选值（键不存在时为nil）",
      "修改值：dict[key] = value，存在则更新，不存在则添加",
      "遍历方式：for (key, value)、keys、values"
    ],
    "c": "// 创建字典\nvar scores = [\"Alice\": 90, \"Bob\": 85, \"Charlie\": 95]\nlet emptyDict = [String: Int]()\n\n// 访问值\nif let score = scores[\"Alice\"] {\n    print(\"Alice的分数: \\(score)\")\n}\n\n// 修改值\nscores[\"Bob\"] = 88\nscores[\"David\"] = 80\n\n// 删除值\nscores[\"Charlie\"] = nil\nlet removed = scores.removeValue(forKey: \"Bob\")\n\n// 遍历字典\nfor (name, score) in scores {\n    print(\"\\(name): \\(score)\")\n}\n\n// 遍历键或值\nfor name in scores.keys {\n    print(name)\n}\nfor score in scores.values {\n    print(score)\n}\n\n// 转换为数组\nlet names = Array(scores.keys)\nlet values = Array(scores.values)\n\n// 字典合并\nvar dict1 = [\"a\": 1, \"b\": 2]\nvar dict2 = [\"b\": 3, \"c\": 4]\ndict1.merge(dict2) { (_, new) in new }",
    "et": "❌ 常见错误",
    "ec": "强制解包字典值：dict[key]! 若键不存在会崩溃，应用if let安全解包\n字典无序：字典中的键值对顺序不确定（Swift 3.0+已变为有序）",
    "q": [
      {
        "q": "创建一个字典存储学生姓名和分数，并添加新学生",
        "a": "var students = [\"张三\": 85, \"李四\": 90] students[\"王五\"] = 95"
      }
    ]
  },
  {
    "id": 24,
    "t": "类",
    "p": [
      "类定义：class 类名 { }，Swift的类是引用类型",
      "属性：存储属性和计算属性，可设置属性观察器",
      "初始化：init()方法初始化实例，所有存储属性必须初始化",
      "方法：实例方法和类型方法(static/class)",
      "访问控制：public、internal、fileprivate、private"
    ],
    "c": "// 类定义\nclass Person {\n    var name: String\n    var age: Int\n    \n    init(name: String, age: Int) {\n        self.name = name\n        self.age = age\n    }\n    \n    func introduce() {\n        print(\"我是\\(name)，今年\\(age)岁\")\n    }\n    \n    static func species() {\n        print(\"人类\")\n    }\n}\n\n// 创建实例\nlet person = Person(name: \"张三\", age: 25)\nperson.introduce()\nPerson.species()\n\n// 继承\nclass Student: Person {\n    var studentID: String\n    \n    init(name: String, age: Int, studentID: String) {\n        self.studentID = studentID\n        super.init(name: name, age: age)\n    }\n    \n    override func introduce() {\n        super.introduce()\n        print(\"我的学号是\\(studentID)\")\n    }\n}\n\n// 计算属性\nclass Circle {\n    var radius: Double\n    var area: Double {\n        return Double.pi * radius * radius\n    }\n    \n    init(radius: Double) {\n        self.radius = radius\n    }\n}\n\n// 属性观察器\nclass Counter {\n    var count = 0 {\n        willSet {\n            print(\"即将变为\\(newValue)\")\n        }\n        didSet {\n            print(\"已经从\\(oldValue)变为\\(count)\")\n        }\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "忘记调用super.init：子类初始化必须调用父类的初始化方法\n属性未初始化：所有存储属性必须在init结束前赋值",
    "q": [
      {
        "q": "定义一个Car类，包含品牌和速度属性，以及加速方法",
        "a": "class Car { var brand: String var speed: Double init(brand: String, speed: Double) { self.brand = brand self.speed = speed } func accelerate(by amount: Double) { speed += amount } }"
      }
    ]
  },
  {
    "id": 25,
    "t": "结构体",
    "p": [
      "结构体定义：struct 结构体名 { }，Swift的结构体是值类型",
      "值类型特性：赋值时会创建副本，传递时也是传递副本",
      "自动初始化：结构体有自动生成的成员初始化器",
      "与类区别：结构体不支持继承，更轻量，适合简单数据结构",
      "常用场景：表示点、颜色、尺寸等简单数据模型"
    ],
    "c": "// 结构体定义\nstruct Point {\n    var x: Double\n    var y: Double\n    \n    func distance(to other: Point) -> Double {\n        let dx = x - other.x\n        let dy = y - other.y\n        return sqrt(dx * dx + dy * dy)\n    }\n    \n    mutating func moveBy(dx: Double, dy: Double) {\n        x += dx\n        y += dy\n    }\n}\n\n// 使用结构体\nvar p1 = Point(x: 1, y: 2)\nlet p2 = Point(x: 4, y: 6)\nprint(p1.distance(to: p2))\n\np1.moveBy(dx: 1, dy: 1)\n\n// 值类型特性\nvar p3 = p1\np3.x = 100\nprint(p1.x)  // 2，不受影响\n\n// 颜色结构体\nstruct Color {\n    let red: Double\n    let green: Double\n    let blue: Double\n    \n    static let black = Color(red: 0, green: 0, blue: 0)\n    static let white = Color(red: 1, green: 1, blue: 1)\n}\n\n// 尺寸结构体\nstruct Size {\n    var width: Double\n    var height: Double\n    \n    var area: Double {\n        return width * height\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "在非mutating方法中修改属性：结构体方法需要mutating关键字才能修改属性\n混淆值类型和引用类型：结构体赋值会创建副本",
    "q": [
      {
        "q": "定义一个Rectangle结构体，包含宽高和计算面积的属性",
        "a": "struct Rectangle { var width: Double var height: Double var area: Double { return width * height } }"
      }
    ]
  },
  {
    "id": 26,
    "t": "枚举",
    "p": [
      "枚举定义：enum 枚举名 { case 值1, 值2, 值3 }",
      "关联值：枚举成员可关联不同类型的值",
      "原始值：枚举成员可存储原始值（整数、字符串、字符）",
      "枚举方法：枚举可定义实例方法和类型方法",
      "模式匹配：使用switch匹配枚举值，可绑定关联值"
    ],
    "c": "// 基本枚举\nenum CompassDirection {\n    case north\n    case south\n    case east\n    case west\n}\n\nvar direction = CompassDirection.north\ndirection = .south\n\n// 关联值\nenum Barcode {\n    case upc(Int, Int, Int, Int)\n    case qrCode(String)\n}\n\nvar productBarcode = Barcode.upc(8, 85909, 51226, 3)\nproductBarcode = .qrCode(\"ABCDEFGHIJKLMNOP\")\n\n// 原始值\nenum Planet: Int {\n    case mercury = 1\n    case venus\n    case earth\n    case mars\n}\n\nlet earth = Planet(rawValue: 3)\n\n// switch匹配\nswitch direction {\ncase .north:\n    print(\"向北\")\ncase .south:\n    print(\"向南\")\ncase .east:\n    print(\"向东\")\ncase .west:\n    print(\"向西\")\n}\n\n// 匹配关联值\nswitch productBarcode {\ncase .upc(let a, let b, let c, let d):\n    print(\"UPC: \\(a)-\\(b)-\\(c)-\\(d)\")\ncase .qrCode(let code):\n    print(\"QR码: \\(code)\")\n}\n\n// 枚举方法\nenum Temperature {\n    case celsius(Double)\n    case fahrenheit(Double)\n    \n    func toCelsius() -> Double {\n        switch self {\n        case .celsius(let temp):\n            return temp\n        case .fahrenheit(let temp):\n            return (temp - 32) * 5 / 9\n        }\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "忘记处理所有case：switch必须穷举所有枚举值，或添加default\n混淆关联值和原始值：关联值是成员携带的数据，原始值是成员本身的值",
    "q": [
      {
        "q": "定义一个枚举表示交通信号灯（红、黄、绿）",
        "a": "enum TrafficLight { case red case yellow case green }"
      }
    ]
  },
  {
    "id": 27,
    "t": "协议",
    "p": [
      "协议定义：protocol 协议名 { }，定义方法和属性的蓝图",
      "遵循协议：class/struct/enum 类型名: 协议名 { }",
      "协议属性：声明属性的类型和读写权限",
      "协议方法：声明方法签名，不实现具体逻辑",
      "协议扩展：为协议提供默认实现"
    ],
    "c": "// 协议定义\nprotocol Vehicle {\n    var speed: Double { get set }\n    var description: String { get }\n    \n    func accelerate()\n    func brake()\n}\n\n// 遵循协议\nclass Car: Vehicle {\n    var speed: Double = 0\n    \n    var description: String {\n        return \"汽车速度: \\(speed) km/h\"\n    }\n    \n    func accelerate() {\n        speed += 10\n    }\n    \n    func brake() {\n        speed = max(0, speed - 5)\n    }\n}\n\n// 协议作为类型\nfunc testVehicle(_ vehicle: Vehicle) {\n    vehicle.accelerate()\n    print(vehicle.description)\n}\n\n// 协议扩展\nextension Vehicle {\n    func stop() {\n        speed = 0\n    }\n    \n    var isMoving: Bool {\n        return speed > 0\n    }\n}\n\n// 多个协议\nprotocol Flyable {\n    func fly()\n}\n\nclass Airplane: Vehicle, Flyable {\n    var speed: Double = 0\n    \n    var description: String {\n        return \"飞机速度: \\(speed) km/h\"\n    }\n    \n    func accelerate() {\n        speed += 50\n    }\n    \n    func brake() {\n        speed = max(0, speed - 20)\n    }\n    \n    func fly() {\n        print(\"飞机起飞\")\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "未实现协议要求：遵循协议必须实现所有required属性和方法\n协议类型无法直接实例化：协议本身不能创建对象",
    "q": [
      {
        "q": "定义一个Shape协议，包含计算面积的方法",
        "a": "protocol Shape { func calculateArea() -> Double }"
      }
    ]
  },
  {
    "id": 28,
    "t": "扩展",
    "p": [
      "扩展语法：extension 类型名 { }",
      "添加计算属性：扩展可以添加计算属性，不能添加存储属性",
      "添加方法：扩展可以添加实例方法和类型方法",
      "添加初始化器：扩展可以添加便捷初始化器",
      "扩展协议：为协议提供默认实现或添加新方法"
    ],
    "c": "// 扩展Int\nextension Int {\n    var isEven: Bool {\n        return self % 2 == 0\n    }\n    \n    var isOdd: Bool {\n        return !isEven\n    }\n    \n    func squared() -> Int {\n        return self * self\n    }\n    \n    mutating func square() {\n        self = self * self\n    }\n}\n\nlet number = 4\nprint(number.isEven)  // true\nprint(number.squared())  // 16\n\n// 扩展String\nextension String {\n    var length: Int {\n        return self.count\n    }\n    \n    func repeated(_ times: Int) -> String {\n        return String(repeating: self, count: times)\n    }\n    \n    func trimmed() -> String {\n        return self.trimmingCharacters(in: .whitespacesAndNewlines)\n    }\n}\n\nlet str = \"  hello  \"\nprint(str.trimmed())  // \"hello\"\n\n// 扩展数组\nextension Array where Element: Numeric {\n    var sum: Element {\n        return reduce(0, +)\n    }\n}\n\nlet numbers = [1, 2, 3, 4, 5]\nprint(numbers.sum)  // 15\n\n// 扩展自定义类型\nstruct Point {\n    var x: Double\n    var y: Double\n}\n\nextension Point {\n    init(_ x: Double, _ y: Double) {\n        self.x = x\n        self.y = y\n    }\n    \n    var magnitude: Double {\n        return sqrt(x * x + y * y)\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "扩展中添加存储属性：扩展只能添加计算属性，不能添加存储属性\n扩展中重写方法：扩展不能重写现有方法，只能添加新方法",
    "q": [
      {
        "q": "扩展String，添加一个反转字符串的方法",
        "a": "extension String { func reversedString() -> String { return String(self.reversed()) } }"
      }
    ]
  },
  {
    "id": 29,
    "t": "泛型",
    "p": [
      "泛型函数：使用占位符类型编写通用函数",
      "泛型类型：结构体、类、枚举都可以是泛型的",
      "类型约束：限制泛型参数必须遵循特定协议",
      "关联类型：在协议中使用associatedtype定义关联类型",
      "泛型扩展：为泛型类型添加扩展"
    ],
    "c": "// 泛型函数\nfunc swapTwoValues<T>(_ a: inout T, _ b: inout T) {\n    let temp = a\n    a = b\n    b = temp\n}\n\nvar x = 10, y = 20\nswapTwoValues(&x, &y)\n\nvar str1 = \"hello\", str2 = \"world\"\nswapTwoValues(&str1, &str2)\n\n// 泛型结构体\nstruct Stack<Element> {\n    var items = [Element]()\n    \n    mutating func push(_ item: Element) {\n        items.append(item)\n    }\n    \n    mutating func pop() -> Element? {\n        return items.popLast()\n    }\n    \n    var count: Int {\n        return items.count\n    }\n}\n\nvar stack = Stack<Int>()\nstack.push(1)\nstack.push(2)\nstack.push(3)\n\n// 类型约束\nfunc findIndex<T: Equatable>(of valueToFind: T, in array: [T]) -> Int? {\n    for (index, value) in array.enumerated() {\n        if value == valueToFind {\n            return index\n        }\n    }\n    return nil\n}\n\n// 关联类型\nprotocol Container {\n    associatedtype ItemType\n    mutating func append(_ item: ItemType)\n    var count: Int { get }\n    subscript(i: Int) -> ItemType { get }\n}\n\nextension Stack: Container {\n    typealias ItemType = Element\n    \n    mutating func append(_ item: Element) {\n        push(item)\n    }\n    \n    subscript(i: Int) -> Element {\n        return items[i]\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "忘记类型约束：使用==比较时需要Equatable约束\n泛型类型使用时未指定具体类型：Stack&lt;Int&gt;不能写成Stack",
    "q": [
      {
        "q": "定义一个泛型函数返回数组中的最大值",
        "a": "func findMax(in array: [T]) -> T? { guard !array.isEmpty else { return nil } var max = array[0] for item in array { if item > max { max = item } } return max }"
      }
    ]
  },
  {
    "id": 30,
    "t": "错误处理",
    "p": [
      "错误类型：枚举实现Error协议表示错误类型",
      "抛出错误：使用throw关键字抛出错误",
      "捕获错误：使用do-catch语句捕获和处理错误",
      "可选绑定：使用try?将错误转换为可选值",
      "强制尝试：使用try!强制尝试，错误时崩溃"
    ],
    "c": "// 定义错误类型\nenum NetworkError: Error {\n    case noInternet\n    case serverError(code: Int)\n    case invalidResponse\n    case timeout\n}\n\n// 抛出错误的函数\nfunc fetchData(from url: String) throws -> String {\n    guard url.hasPrefix(\"https\") else {\n        throw NetworkError.invalidResponse\n    }\n    \n    let random = Int.random(in: 0...3)\n    switch random {\n    case 0: throw NetworkError.noInternet\n    case 1: throw NetworkError.serverError(code: 500)\n    case 2: throw NetworkError.timeout\n    default: return \"数据获取成功\"\n    }\n}\n\n// do-catch处理错误\ndo {\n    let data = try fetchData(from: \"https://example.com\")\n    print(data)\n} catch NetworkError.noInternet {\n    print(\"无网络连接\")\n} catch NetworkError.serverError(let code) {\n    print(\"服务器错误: \\(code)\")\n} catch NetworkError.timeout {\n    print(\"请求超时\")\n} catch {\n    print(\"未知错误: \\(error)\")\n}\n\n// try? 转换为可选值\nlet result = try? fetchData(from: \"https://example.com\")\nprint(result ?? \"获取失败\")\n\n// try! 强制尝试\nlet data = try! fetchData(from: \"https://example.com\")\n\n// defer 延迟执行\nfunc processFile() throws {\n    print(\"打开文件\")\n    defer {\n        print(\"关闭文件\")\n    }\n    throw NetworkError.invalidResponse\n}",
    "et": "❌ 常见错误",
    "ec": "忘记try关键字：调用throws函数必须使用try\n不处理错误：调用throws函数必须在do-catch中或用try?/try!",
    "q": [
      {
        "q": "定义一个除法函数，当除数为0时抛出错误",
        "a": "enum DivisionError: Error { case divisionByZero } func divide(_ a: Double, by b: Double) throws -> Double { guard b != 0 else { throw DivisionError.divisionByZero } return a / b }"
      }
    ]
  },
  {
    "id": 31,
    "t": "内存管理",
    "p": [
      "引用计数：Swift使用ARC自动管理内存，通过引用计数跟踪对象",
      "强引用：默认引用是强引用，会增加引用计数",
      "弱引用：weak引用不增加引用计数，对象销毁时自动置nil",
      "无主引用：unowned引用不增加引用计数，对象销毁时不置nil",
      "循环引用：两个对象互相强引用导致内存泄漏"
    ],
    "c": "// 强引用\nclass Person {\n    let name: String\n    init(name: String) {\n        self.name = name\n        print(\"\\(name)被创建\")\n    }\n    deinit {\n        print(\"\\(name)被销毁\")\n    }\n}\n\nvar p1: Person? = Person(name: \"张三\")\nvar p2 = p1\nvar p3 = p1\np1 = nil\np2 = nil\np3 = nil\n\n// 循环引用\nclass Teacher {\n    let name: String\n    var student: Student?\n    init(name: String) { self.name = name }\n    deinit { print(\"\\(name)老师被销毁\") }\n}\n\nclass Student {\n    let name: String\n    weak var teacher: Teacher?  // 使用weak打破循环\n    init(name: String) { self.name = name }\n    deinit { print(\"\\(name)学生被销毁\") }\n}\n\n// 闭包循环引用\nclass HTMLElement {\n    let name: String\n    let text: String?\n    \n    lazy var asHTML: () -> String = { [unowned self] in\n        if let text = self.text {\n            return \"<\\(self.name)>\\(text)</\\(self.name)>\"\n        } else {\n            return \"<\\(self.name) />\"\n        }\n    }\n    \n    init(name: String, text: String? = nil) {\n        self.name = name\n        self.text = text\n    }\n    \n    deinit {\n        print(\"\\(name)被销毁\")\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "循环引用导致内存泄漏：类之间互相强引用时需要使用weak/unowned\n闭包中引用self导致循环：需要使用[weak self]或[unowned self]",
    "q": [
      {
        "q": "定义两个类A和B，避免它们之间的循环引用",
        "a": "class A { var b: B? deinit { print(\"A被销毁\") } } class B { weak var a: A? // 使用weak deinit { print(\"B被销毁\") } }"
      }
    ]
  },
  {
    "id": 32,
    "t": "访问控制",
    "p": [
      "public：最高级别，可被其他模块访问",
      "internal：默认级别，只能在当前模块内部访问",
      "fileprivate：只能在当前文件中访问",
      "private：只能在当前声明所在的作用域访问",
      "open：允许在其他模块继承和重写"
    ],
    "c": "// 访问控制级别\npublic class PublicClass {\n    public var publicVar = 0\n    internal var internalVar = 1\n    fileprivate var fileprivateVar = 2\n    private var privateVar = 3\n    \n    public func publicMethod() {}\n    private func privateMethod() {}\n}\n\n// fileprivate示例\nclass BankAccount {\n    fileprivate var balance = 0.0\n    \n    fileprivate func deposit(amount: Double) {\n        balance += amount\n    }\n}\n\nextension BankAccount {\n    func withdraw(amount: Double) {\n        if amount <= balance {\n            balance -= amount  // 在同一文件中可以访问fileprivate\n        }\n    }\n}\n\n// private示例\nclass Person {\n    private var age = 0\n    \n    func setAge(_ newAge: Int) {\n        if newAge >= 0 {\n            age = newAge\n        }\n    }\n    \n    func getAge() -> Int {\n        return age\n    }\n}\n\n// 访问控制与继承\nopen class Vehicle {\n    open func drive() {}\n    public func stop() {}\n}\n\npublic class Car: Vehicle {\n    override open func drive() {}\n}",
    "et": "❌ 常见错误",
    "ec": "从外部访问private属性：private属性只能在类内部访问\n访问控制过严：过度使用private会导致测试困难",
    "q": [
      {
        "q": "定义一个类，使用private保护内部属性，提供公开的访问方法",
        "a": "class User { private var password: String = \"\" func setPassword(_ newPassword: String) { password = newPassword } func checkPassword(_ input: String) -> Bool { return password == input } }"
      }
    ]
  },
  {
    "id": 33,
    "t": "运算符重载",
    "p": [
      "运算符重载：为自定义类型提供标准运算符的实现",
      "中缀运算符：+、-、*、/等二元运算符",
      "前缀后缀：++、--、-等一元运算符",
      "复合赋值：+=、-=等复合赋值运算符",
      "等价运算符：==、!=用于比较相等性"
    ],
    "c": "// 结构体定义\nstruct Vector2D {\n    var x: Double\n    var y: Double\n}\n\n// 重载加法运算符\nfunc + (left: Vector2D, right: Vector2D) -> Vector2D {\n    return Vector2D(x: left.x + right.x, y: left.y + right.y)\n}\n\n// 重载减法运算符\nfunc - (left: Vector2D, right: Vector2D) -> Vector2D {\n    return Vector2D(x: left.x - right.x, y: left.y - right.y)\n}\n\n// 重载乘法运算符（标量乘法）\nfunc * (vector: Vector2D, scalar: Double) -> Vector2D {\n    return Vector2D(x: vector.x * scalar, y: vector.y * scalar)\n}\n\n// 重载复合赋值运算符\nfunc += (left: inout Vector2D, right: Vector2D) {\n    left = left + right\n}\n\n// 重载等价运算符\nfunc == (left: Vector2D, right: Vector2D) -> Bool {\n    return left.x == right.x && left.y == right.y\n}\n\nfunc != (left: Vector2D, right: Vector2D) -> Bool {\n    return !(left == right)\n}\n\n// 使用重载的运算符\nvar v1 = Vector2D(x: 1, y: 2)\nvar v2 = Vector2D(x: 3, y: 4)\nvar v3 = v1 + v2\nv1 += v2\nprint(v1 == v2)\n\n// 前缀运算符\nprefix func - (vector: Vector2D) -> Vector2D {\n    return Vector2D(x: -vector.x, y: -vector.y)\n}\n\nlet negative = -v1",
    "et": "❌ 常见错误",
    "ec": "忘记实现Equatable：自定义类型默认不支持==比较\n运算符重载顺序错误：参数顺序会影响运算结果",
    "q": [
      {
        "q": "为Vector2D重载点积运算符",
        "a": "func * (left: Vector2D, right: Vector2D) -> Double { return left.x * right.x + left.y * right.y }"
      }
    ]
  },
  {
    "id": 34,
    "t": "类型转换",
    "p": [
      "is操作符：检查实例是否属于特定子类",
      "as?操作符：条件向下转型，成功返回可选值，失败返回nil",
      "as!操作符：强制向下转型，失败会崩溃",
      "Any和AnyObject：Any表示任意类型，AnyObject表示任意类实例",
      "类型检查：使用switch进行类型检查和转换"
    ],
    "c": "// 类层次结构\nclass Animal {\n    func makeSound() {\n        print(\"动物叫声\")\n    }\n}\n\nclass Dog: Animal {\n    func bark() {\n        print(\"汪汪汪\")\n    }\n}\n\nclass Cat: Animal {\n    func meow() {\n        print(\"喵喵喵\")\n    }\n}\n\n// 创建实例\nlet dog = Dog()\nlet cat = Cat()\nlet animal: Animal = Dog()\n\n// is 类型检查\nprint(dog is Animal)   // true\nprint(dog is Dog)      // true\nprint(dog is Cat)      // false\n\n// as? 条件转换\nif let d = animal as? Dog {\n    d.bark()\n} else if let c = animal as? Cat {\n    c.meow()\n}\n\n// as! 强制转换\nlet d = animal as! Dog\nd.bark()\n\n// switch类型检查\nlet animals: [Animal] = [Dog(), Cat(), Dog()]\nfor animal in animals {\n    switch animal {\n    case let dog as Dog:\n        dog.bark()\n    case let cat as Cat:\n        cat.meow()\n    default:\n        animal.makeSound()\n    }\n}\n\n// Any和AnyObject\nvar things: [Any] = []\nthings.append(42)\nthings.append(\"hello\")\nthings.append(Cat())\nthings.append(3.14)",
    "et": "❌ 常见错误",
    "ec": "强制转换失败：使用as!时如果类型不匹配会崩溃\n混淆Any和AnyObject：Any可以表示任意类型，AnyObject只能表示类实例",
    "q": [
      {
        "q": "定义一个数组存储不同类型的对象，使用switch遍历",
        "a": "let mixed: [Any] = [1, \"hello\", 3.14, true] for item in mixed { switch item { case let i as Int: print(\"整数: \\(i)\") case let s as String: print(\"字符串: \\(s)\") case let d as Double: print(\"浮点数: \\(d)\") case let b as Bool: print(\"布尔值: \\(b)\") default: print(\"其他类型\") } }"
      }
    ]
  },
  {
    "id": 35,
    "t": "Swift进阶与项目实战",
    "p": [
      "并发编程：使用async/await进行异步编程",
      "Combine框架：响应式编程框架",
      "SwiftUI：声明式UI框架",
      "单元测试：使用XCTest编写测试用例",
      "项目架构：MVC、MVVM、VIPER等架构模式"
    ],
    "c": "// async/await 异步编程\nfunc fetchData() async throws -> String {\n    let url = URL(string: \"https://api.example.com/data\")!\n    let (data, _) = try await URLSession.shared.data(from: url)\n    return String(data: data, encoding: .utf8)!\n}\n\n// 调用异步函数\nTask {\n    do {\n        let data = try await fetchData()\n        print(data)\n    } catch {\n        print(\"获取数据失败: \\(error)\")\n    }\n}\n\n// SwiftUI 示例\nimport SwiftUI\n\nstruct ContentView: View {\n    @State private var count = 0\n    \n    var body: some View {\n        VStack {\n            Text(\"计数: \\(count)\")\n                .font(.title)\n            Button(\"增加\") {\n                count += 1\n            }\n            .padding()\n            .background(Color.blue)\n            .foregroundColor(.white)\n            .cornerRadius(10)\n        }\n    }\n}\n\n// 单元测试示例\nimport XCTest\n\nclass MathTests: XCTestCase {\n    func testAddition() {\n        let result = 2 + 2\n        XCTAssertEqual(result, 4)\n    }\n    \n    func testMultiplication() {\n        let result = 3 * 4\n        XCTAssertEqual(result, 12)\n    }\n}\n\n// MVVM 架构示例\nclass UserViewModel: ObservableObject {\n    @Published var users: [User] = []\n    \n    func fetchUsers() async {\n        // 网络请求获取用户数据\n        self.users = []\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "异步函数调用错误：async函数必须在Task或其他async函数中调用\nSwiftUI属性使用错误：@State必须用于结构体，@ObservedObject用于引用类型",
    "q": [
      {
        "q": "使用async/await定义一个异步函数获取用户信息",
        "a": "struct User: Codable { let id: Int let name: String } func fetchUser(id: Int) async throws -> User { let url = URL(string: \"https://api.example.com/users/\\(id)\")! let (data, _) = try await URLSession.shared.data(from: url) return try JSONDecoder().decode(User.self, from: data) }"
      }
    ]
  }
];