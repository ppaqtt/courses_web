window.TUTORIAL_DATA_lua = [
  {
    "id": 1,
    "t": "Lua 简介：轻量级嵌入式脚本语言",
    "p": [
      "Lua 由巴西 PUC-Rio 团队于 1993 年发布，强调轻量、可嵌入与可移植",
      "解释执行、字节码编译，核心极小，常嵌入游戏、Nginx 与 Redis 等宿主",
      "Lua 5.4 引入整数与浮点子类型、常量属性、close 变量与分代垃圾回收",
      "语法简洁，唯一的数据结构是表 table，函数是一等值，支持元表与协程"
    ],
    "c": "print(\"Hello, Lua 5.4!\")\nlocal version = _VERSION\nprint(\"当前版本: \" .. version)\nlocal t = { name = \"Lua\", year = 1993, langs = { \"Lua\", \"C\" } }\nprint(string.format(\"%s 诞生于 %d 年\", t.name, t.year))\nprint(\"嵌入语言数量: \" .. #t.langs)\nprint(\"整数类型: \" .. math.type(42))\nprint(\"布尔值: \" .. tostring(not nil))",
    "et": "❌ 常见错误",
    "ec": "把 Lua 当成独立应用语言：Lua 通常嵌入宿主程序，标准库很小，文件与网络能力常依赖宿主或第三方库，需要先确认运行环境。",
    "q": [
      {
        "q": "Lua 诞生于哪所机构？",
        "a": "巴西 PUC-Rio"
      },
      {
        "q": "Lua 唯一的内置复合数据结构是什么？",
        "a": "表 table"
      }
    ]
  },
  {
    "id": 2,
    "t": "安装与工具链：lua、luac 与 luarocks",
    "p": [
      "macOS 可用 brew install lua luarocks，Ubuntu 用 apt install lua5.4 luarocks",
      "lua 运行脚本，lua -i 进入交互式解释器，luac 编译字节码",
      "luarocks 是包管理器，可安装 busted、luasocket、dkjson 等库",
      "也可从源码编译，通过 make linux 或 make macosx 生成解释器"
    ],
    "c": "# macOS 安装\nbrew install lua luarocks\n\n# Ubuntu 安装\nsudo apt install lua5.4 luarocks\n\nlua -v\nluarocks --version\n\n# 运行脚本与交互式解释器\nlua hello.lua\nlua -i\n\n# 编译字节码\nluac -o hello.luac hello.lua",
    "et": "❌ 常见错误",
    "ec": "安装多个 Lua 版本后命令指向错误版本：不同版本的 C 模块 ABI 不兼容，应使用 lua5.4 明确版本，并让 luarocks 与解释器版本匹配。",
    "q": [
      {
        "q": "把 Lua 源码编译成字节码的命令？",
        "a": "luac"
      },
      {
        "q": "Lua 的包管理器叫什么？",
        "a": "luarocks"
      }
    ]
  },
  {
    "id": 3,
    "t": "变量与常量：local、全局与 const",
    "p": [
      "local 声明局部变量，作用域限于当前块，应作为默认写法使用",
      "未用 local 直接赋值会创建全局变量，污染 _ENV 且难以追踪",
      "Lua 5.4 支持 local MAX <const> = 100 声明不可重新赋值的常量",
      "local x <close> 可让变量离开作用域时自动调用 __close 元方法"
    ],
    "c": "local name = \"Lua\"\nlocal version = 5.4\ncount = 10\nlocal MAX <const> = 100\n\nprint(name, version, count, MAX)\ndo\n    local name = \"inner\"\n    print(name)\nend\nprint(name)\n-- MAX = 200  -- 编译期报错: attempt to assign to const variable",
    "et": "❌ 常见错误",
    "ec": "在函数中忘记写 local 直接给变量赋值：会创建或覆盖全局变量，多个模块互相污染；应在函数内始终用 local 声明。",
    "q": [
      {
        "q": "声明局部变量用什么关键字？",
        "a": "local"
      },
      {
        "q": "Lua 5.4 如何声明常量？",
        "a": "local X <const> = 值"
      }
    ]
  },
  {
    "id": 4,
    "t": "数据类型：nil、boolean、number 与 table",
    "p": [
      "基本类型有 nil、boolean、number、string、function、table、thread 与 userdata",
      "number 在 5.4 分为 integer 与 float，可用 math.type 区分",
      "只有 nil 与 false 为假，数字 0 与空字符串都为真",
      "table 是唯一复合结构，同时充当数组、字典与对象容器三种角色"
    ],
    "c": "local n = 42\nlocal f = 3.14\nlocal s = \"text\"\nlocal b = true\nlocal nothing = nil\nlocal t = { 1, 2, key = \"value\" }\n\nprint(math.type(n), math.type(f))\nprint(type(s), type(b), type(nothing), type(t))\nprint(n // 5, n / 5)\nprint(#t, t.key)\nprint(tostring(n) .. s)",
    "et": "❌ 常见错误",
    "ec": "把 0 或空字符串当假值：Lua 中只有 nil 与 false 为假，if 0 then 会进入分支，判断空串需显式比较 s == \"\"。",
    "q": [
      {
        "q": "Lua 中哪些值为假？",
        "a": "只有 nil 与 false"
      },
      {
        "q": "42 与 3.14 在 5.4 中分别是什么子类型？",
        "a": "integer 与 float"
      }
    ]
  },
  {
    "id": 5,
    "t": "运算符与表达式：整除、幂与拼接",
    "p": [
      "算术运算符包括 + - * / // % ^，/ 总返回浮点，// 是整除",
      ".. 拼接字符串，长度运算符 # 可用于字符串与顺序列表类型",
      "比较运算符返回布尔值，1 == 1.0 为 true，类型不同通常不等",
      "and 与 or 返回操作数本身，可用于提供默认值与短路求值"
    ],
    "c": "local a, b = 7, 2\nprint(a / b)\nprint(a // b)\nprint(a % b)\nprint(2 ^ 10)\nprint(\"a\" .. \"b\")\nprint(#\"hello\")\nprint(not nil, nil or \"default\")\nprint(1 == 1.0)\nprint(1 == \"1\")",
    "et": "❌ 常见错误",
    "ec": "用 + 拼接字符串：Lua 的 + 只做数值运算，字符串拼接必须用 ..，否则会尝试把字符串转成数字并报错。",
    "q": [
      {
        "q": "Lua 中 7 / 2 的结果是什么？",
        "a": "3.5，浮点数"
      },
      {
        "q": "字符串拼接使用哪个运算符？",
        "a": ".."
      }
    ]
  },
  {
    "id": 6,
    "t": "字符串：格式化、查找与长字符串",
    "p": [
      "string.format 支持 %s、%d、%.2f 等格式，是输出的主要方式",
      "string.sub、string.find、string.gsub、string.rep 覆盖常用操作",
      "长字符串用 [[...]] 或 [=[...]=] 包裹，可跨行且不处理转义",
      "字符串不可变，所有修改操作都会返回一个新的字符串副本对象内容"
    ],
    "c": "local name = \"Lua\"\nlocal n = 3\nprint(string.format(\"Hello, %s! n^2=%d\", name, n * n))\nprint((\"abc\"):upper())\nprint(string.sub(\"hello\", 2, 4))\nprint(string.rep(\"ab\", 3))\nlocal replaced = (\"a,b,c\"):gsub(\",\", \";\")\nprint(replaced)\nlocal long = [[\n第一行\n第二行]]\nprint(long)\nprint((\"%d-%s\"):format(7, \"x\"))",
    "et": "❌ 常见错误",
    "ec": "用 # 获取含中文的字符串长度：Lua 按字节计数，UTF-8 汉字通常占 3 字节；需要字符数应使用 utf8.len。",
    "q": [
      {
        "q": "求字符串长度用什么运算符？",
        "a": "#"
      },
      {
        "q": "UTF-8 字符数用哪个函数？",
        "a": "utf8.len"
      }
    ]
  },
  {
    "id": 7,
    "t": "表与集合：数组、字典与遍历",
    "p": [
      "表用 {} 创建，array 部分从 1 开始，索引连续时 # 返回长度",
      "table.insert、table.remove、table.concat、table.sort 是常用函数",
      "ipairs 按整数索引遍历，pairs 遍历全部键值，顺序不保证",
      "数组与字典可混用，但稀疏数组的 # 行为不确定，应避免依赖这种结果"
    ],
    "c": "local list = { 10, 20, 30 }\ntable.insert(list, 40)\ntable.insert(list, 1, 5)\nprint(#list, list[1], list[#list])\n\nfor i, v in ipairs(list) do\n    io.write(i, \"=\", v, \" \")\nend\nprint()\n\nlocal map = { name = \"Ada\", age = 36 }\nmap.city = \"Beijing\"\nfor k, v in pairs(map) do\n    print(k, v)\nend\ntable.sort(list)\nprint(table.concat(list, \",\"))",
    "et": "❌ 常见错误",
    "ec": "对含 nil 的稀疏表使用 #：长度运算符只对序列有确定结果，空洞会导致长度不可预测，应自己维护计数。",
    "q": [
      {
        "q": "数组遍历用哪个迭代函数？",
        "a": "ipairs"
      },
      {
        "q": "字典遍历用哪个迭代函数？",
        "a": "pairs"
      }
    ]
  },
  {
    "id": 8,
    "t": "条件分支：if、elseif 与真值规则",
    "p": [
      "if/elseif/else 以 then 引导分支，以 end 结束",
      "条件可以是任意值，只有 nil 与 false 会被视为假值",
      "and/or 可用于默认值，但值为 false 时需改用显式判断",
      "Lua 没有 switch，可用 if 链或表驱动的分派方式替代"
    ],
    "c": "local score = 85\nif score >= 90 then\n    print(\"A\")\nelseif score >= 60 then\n    print(\"B\")\nelse\n    print(\"C\")\nend\n\nlocal x = 0\nif x then print(\"只有 nil 和 false 为假\") end\n\nlocal value = nil\nlocal result = value and \"有值\" or \"默认值\"\nprint(result)",
    "et": "❌ 常见错误",
    "ec": "用 a and b or c 提供默认值：当 b 为 false 或 nil 时会错误返回 c；需要保留 false 时应写显式 if 判断。",
    "q": [
      {
        "q": "Lua 的 if 分支用什么关键字引导？",
        "a": "then"
      },
      {
        "q": "Lua 有 switch 语句吗？",
        "a": "没有，可用 if 链或表驱动替代"
      }
    ]
  },
  {
    "id": 9,
    "t": "循环与递归：for、while 与尾递归",
    "p": [
      "数值 for 为 for i = 1, 10, 2 do，包含起始与结束值",
      "泛型 for 常用 ipairs 与 pairs 遍历表与数组元素",
      "while 先判断后执行，repeat 先执行后判断，至少执行一次",
      "Lua 支持尾递归优化，递归调用位于 return 时不会增长栈"
    ],
    "c": "for i = 1, 3 do print(\"i=\" .. i) end\nfor i = 10, 1, -5 do print(i) end\n\nlocal n = 0\nwhile n < 2 do n = n + 1 end\nrepeat n = n - 1 until n == 0\nprint(\"n=\" .. n)\n\nlocal function factorial(x)\n    if x <= 1 then return 1 end\n    return x * factorial(x - 1)\nend\nprint(factorial(5))",
    "et": "❌ 常见错误",
    "ec": "在数值 for 中修改循环变量：Lua 的循环变量是内部副本，修改它不会改变迭代次数，应在循环体内用额外变量累计。",
    "q": [
      {
        "q": "repeat 与 while 的关键区别？",
        "a": "repeat 至少执行一次"
      },
      {
        "q": "什么情况下递归不会增长调用栈？",
        "a": "尾递归，递归调用直接位于 return 中"
      }
    ]
  },
  {
    "id": 10,
    "t": "函数基础：定义、多返回值与默认参数",
    "p": [
      "function name(args) ... end 定义函数，函数是一等值可赋给变量",
      "Lua 函数可返回多个值，调用处可用多个变量同时接收返回值结果",
      "Lua 没有语法级默认参数，常用 arg or default 模式模拟",
      "调用时参数不足补 nil，多余参数被忽略，可用 select 处理变长参数"
    ],
    "c": "local function greet(name, prefix)\n    prefix = prefix or \"Hello\"\n    return prefix .. \", \" .. name\nend\nprint(greet(\"Lua\"))\nprint(greet(\"Groovy\", \"Hi\"))\n\nlocal function minmax(a, b)\n    if a < b then return a, b end\n    return b, a\nend\nlocal lo, hi = minmax(5, 3)\nprint(lo, hi)",
    "et": "❌ 常见错误",
    "ec": "以为函数参数按引用传递：Lua 传递的是值的引用，表可被修改，但重新赋值参数不会影响调用方的变量本身。",
    "q": [
      {
        "q": "Lua 函数可以返回几个值？",
        "a": "任意多个"
      },
      {
        "q": "调用时参数不足会怎样？",
        "a": "缺失参数补 nil"
      }
    ]
  },
  {
    "id": 11,
    "t": "函数进阶：变长参数与高阶函数",
    "p": [
      "变长参数用 ... 声明，函数内用 {...} 或 select 访问",
      "select(\"#\", ...) 返回参数个数，select(n, ...) 返回第 n 个起的参数",
      "函数可作为参数与返回值，map、filter、reduce 均可用表与函数实现",
      "闭包让函数携带状态，适合回调函数、迭代器与模块封装等常见场景"
    ],
    "c": "local function sum(...)\n    local total = 0\n    for _, v in ipairs({ ... }) do total = total + v end\n    return total, select(\"#\", ...)\nend\nprint(sum(1, 2, 3, 4))\n\nlocal function map(t, f)\n    local out = {}\n    for i, v in ipairs(t) do out[i] = f(v) end\n    return out\nend\nprint(table.concat(map({ 1, 2, 3 }, function(x) return x * x end), \",\"))",
    "et": "❌ 常见错误",
    "ec": "把 ... 直接存进表却忽略 nil：{...} 会丢失中间的空洞，需要精确参数列表时应使用 table.pack 与 table.unpack。",
    "q": [
      {
        "q": "变长参数在函数内如何声明？",
        "a": "用三个点 ..."
      },
      {
        "q": "获取变长参数个数用什么？",
        "a": "select(\"#\", ...)"
      }
    ]
  },
  {
    "id": 12,
    "t": "作用域与闭包：upvalue",
    "p": [
      "local 变量的作用域从声明处开始，到所在的代码块结束时为止",
      "内层函数引用外层 local 变量时形成 upvalue，可读写",
      "每次执行外层函数都会创建新的 upvalue，闭包状态互相独立",
      "循环体内用 local 保存当前值，可避免闭包共享同一个变量实例"
    ],
    "c": "local function counter()\n    local count = 0\n    return function()\n        count = count + 1\n        return count\n    end\nend\nlocal c1 = counter()\nprint(c1())\nprint(c1())\nlocal c2 = counter()\nprint(c2())\n\nlocal fns = {}\nfor i = 1, 3 do\n    fns[i] = function() return i end\nend\nprint(fns[1](), fns[2](), fns[3]())",
    "et": "❌ 常见错误",
    "ec": "在循环外声明 local 变量并在闭包中使用：所有闭包共享同一个 upvalue，最终都看到循环结束后的值。",
    "q": [
      {
        "q": "内层函数引用的外层局部变量叫什么？",
        "a": "upvalue"
      },
      {
        "q": "每次调用 counter 会共享 count 吗？",
        "a": "不会，每次创建独立 upvalue"
      }
    ]
  },
  {
    "id": 13,
    "t": "类与对象：表、元表与 __index",
    "p": [
      "Lua 没有 class 关键字，用 table 加 metatable 模拟对象",
      "__index 元方法在表缺少键时触发，可实现方法查找与继承",
      "构造函数通常命名为 new，用 setmetatable 绑定方法表",
      "冒号语法 obj:method() 会自动把 obj 作为第一个参数 self 传入"
    ],
    "c": "local Account = {}\nAccount.__index = Account\n\nfunction Account.new(owner, balance)\n    local self = setmetatable({}, Account)\n    self.owner = owner\n    self.balance = balance or 0\n    return self\nend\n\nfunction Account:deposit(amount)\n    self.balance = self.balance + amount\n    return self\nend\n\nfunction Account:describe()\n    return string.format(\"%s: %.2f\", self.owner, self.balance)\nend\n\nlocal a = Account.new(\"Ada\", 100):deposit(50)\nprint(a:describe())",
    "et": "❌ 常见错误",
    "ec": "定义方法时用点号却用冒号调用：function Account.deposit(self, x) 与 obj:deposit(x) 匹配，混用会导致 self 变成普通参数错位。",
    "q": [
      {
        "q": "模拟类的方法查找依赖哪个元方法？",
        "a": "__index"
      },
      {
        "q": "冒号调用会自动传入什么？",
        "a": "对象本身作为 self"
      }
    ]
  },
  {
    "id": 14,
    "t": "继承与多态：元表链",
    "p": [
      "继承通过让子类元表的 __index 指向父类表来实现继承机制",
      "子类可重写方法，调用父类方法需显式地通过父类表来查找方法调用",
      "多态由运行时查表决定，同一方法名可以绑定不同的实现函数版本实现",
      "instanceof 可用 getmetatable 或 isa 辅助函数判断"
    ],
    "c": "local Animal = {}\nAnimal.__index = Animal\n\nfunction Animal.new(name)\n    return setmetatable({ name = name }, Animal)\nend\n\nfunction Animal:speak()\n    return \"...\"\nend\n\nlocal Dog = setmetatable({}, { __index = Animal })\nDog.__index = Dog\n\nfunction Dog.new(name)\n    return setmetatable(Animal.new(name), Dog)\nend\n\nfunction Dog:speak()\n    return \"Woof, I am \" .. self.name\nend\n\nlocal d = Dog.new(\"Rex\")\nprint(d:speak())\nprint(getmetatable(d) == Dog)",
    "et": "❌ 常见错误",
    "ec": "只设置 Dog.__index = Animal 而忘记把 Dog 的元表指向 Animal：实例查找会停在 Dog，父类方法不可见，需要同时设置两层 __index。",
    "q": [
      {
        "q": "子类元表的 __index 指向谁以实现继承？",
        "a": "父类表"
      },
      {
        "q": "判断对象元表用什么函数？",
        "a": "getmetatable"
      }
    ]
  },
  {
    "id": 15,
    "t": "接口与抽象：duck typing",
    "p": [
      "Lua 没有 interface 关键字，通过约定方法名实现鸭子类型",
      "调用前可用 type(obj.method) == \"function\" 检查能力",
      "抽象基类可用表加 error(\"must implement\") 模拟",
      "协议式设计应写文档并配合测试，避免隐式的约定失控导致问题风险"
    ],
    "c": "local function run_all(items)\n    for _, item in ipairs(items) do\n        assert(type(item.run) == \"function\", \"对象缺少 run 方法\")\n        print(item:run())\n    end\nend\n\nlocal Runner = {}\nfunction Runner:run() return \"running\" end\n\nlocal Flyer = {}\nfunction Flyer:run() return \"flying\" end\n\nrun_all({ Runner, Flyer })",
    "et": "❌ 常见错误",
    "ec": "依赖对象一定有某方法而不做检查：对象缺少方法时会抛 attempt to call a nil value；公共接口应显式校验或提供默认实现。",
    "q": [
      {
        "q": "Lua 的接口通过什么机制实现？",
        "a": "鸭子类型与约定方法名"
      },
      {
        "q": "调用前如何检查对象是否有某方法？",
        "a": "type(obj.method) == \"function\""
      }
    ]
  },
  {
    "id": 16,
    "t": "泛型与类型参数：动态表达",
    "p": [
      "Lua 没有泛型，通用容器用表与函数实现，类型在运行时才确定",
      "鸭子类型让同一函数可处理不同元素，只要它支持所需操作即可方法",
      "需要约束时可在函数入口用 assert 与 type 校验参数",
      "元表与 __call、__index 可构建领域特定抽象，但应保持简单"
    ],
    "c": "local function new_stack()\n    return { items = {} }\nend\n\nlocal function push(stack, value)\n    table.insert(stack.items, value)\nend\n\nlocal function pop(stack)\n    return table.remove(stack.items)\nend\n\nlocal s = new_stack()\npush(s, \"a\")\npush(s, 42)\nprint(pop(s), pop(s))\n\nlocal function identity(x) return x end\nprint(identity(\"任意类型\"))",
    "et": "❌ 常见错误",
    "ec": "期待容器自动校验元素类型：Lua 不检查泛型，任何值都能放入表中；需要在插入时显式检查并抛出清晰错误。",
    "q": [
      {
        "q": "Lua 支持泛型吗？",
        "a": "不支持，用表与运行时校验表达"
      },
      {
        "q": "如何模拟通用容器？",
        "a": "用表保存元素并提供 push/pop 函数"
      }
    ]
  },
  {
    "id": 17,
    "t": "错误处理：error、pcall 与 xpcall",
    "p": [
      "error 抛出错误，可传字符串或带 code 与 message 的表",
      "pcall 捕获错误并返回 ok 与结果，程序不会因此中断执行",
      "xpcall 可附加消息处理器，常用于生成 traceback",
      "assert 在条件为假时抛错，适合参数校验与不变量检查场景"
    ],
    "c": "local function divide(a, b)\n    if b == 0 then\n        error({ code = \"DIV_ZERO\", message = \"除数不能为 0\" }, 2)\n    end\n    return a / b\nend\n\nlocal ok, result = pcall(divide, 10, 0)\nprint(ok, result and result.code)\n\nlocal ok2, err = xpcall(divide, function(e)\n    return \"trace: \" .. tostring(e.message or e)\nend, 1, 0)\nprint(ok2, err)\n\nprint(pcall(divide, 10, 2))",
    "et": "❌ 常见错误",
    "ec": "用 pcall 包住代码却不检查返回值：错误会被静默吞掉；应始终判断 ok，并记录或重新抛出错误信息。",
    "q": [
      {
        "q": "pcall 返回哪些值？",
        "a": "ok 布尔值与函数结果或错误对象"
      },
      {
        "q": "xpcall 的消息处理器何时执行？",
        "a": "发生错误时，用于生成 traceback"
      }
    ]
  },
  {
    "id": 18,
    "t": "文件 I/O：io.open 与 io.lines",
    "p": [
      "io.open 返回文件句柄，模式有 r、w、a、rb、wb 等",
      "read(\"a\") 读全部内容，read(\"l\") 读一行，read(\"n\") 读数字",
      "io.lines 自动关闭文件，适合逐行处理超大文件数据场景",
      "写文件后应 close，或使用 with 模式确保异常时释放"
    ],
    "c": "local path = \"out.txt\"\nlocal f = assert(io.open(path, \"w\"))\nf:write(\"hello\\n\", \"lua\\n\")\nf:close()\n\nfor line in io.lines(path) do\n    print(\"行:\", line)\nend\n\nlocal rf = assert(io.open(path, \"r\"))\nlocal content = rf:read(\"a\")\nrf:close()\nprint(\"字节数:\", #content)\n\nlocal ok = os.remove(path)\nprint(\"删除:\", ok)",
    "et": "❌ 常见错误",
    "ec": "打开文件后忘记 close：文件句柄会泄漏，写入内容可能未刷盘；应使用 io.lines 或确保 close 在 finally 逻辑中执行。",
    "q": [
      {
        "q": "读取整个文件用什么模式？",
        "a": "read(\"a\")"
      },
      {
        "q": "逐行读取并自动关闭用什么？",
        "a": "io.lines"
      }
    ]
  },
  {
    "id": 19,
    "t": "模式匹配：Lua patterns",
    "p": [
      "Lua 使用自己的模式语法，不是 PCRE，%d、%a、%s 表示字符类",
      "string.match 返回捕获，string.find 返回起止位置",
      "gsub 支持函数或表作为替换，可以动态生成替换结果文本内容",
      "魔法字符需用 % 转义，如 %. 用于匹配字面量点号字符本身"
    ],
    "c": "local text = \"订单 A123，电话 010-1234\"\nlocal code, digits = text:match(\"([A-Z]%d%d%d)\")\nprint(code, digits)\n\nlocal area, num = text:match(\"(%d%d%d)-(%d%d%d%d)\")\nprint(area, num)\n\nprint((text:gsub(\"%d+\", \"#\")))\nfor word in text:gmatch(\"%a+\") do\n    io.write(word, \" \")\nend\nprint()\n\nlocal function trim(s) return (s:gsub(\"^%s+\", \"\"):gsub(\"%s+$\", \"\")) end\nprint(trim(\"  trim  \"))",
    "et": "❌ 常见错误",
    "ec": "把正则表达式直接传给 Lua 模式：\\d、+?、(?=) 等语法不被支持，应改写为 %d、-、%f 等 Lua 模式写法。",
    "q": [
      {
        "q": "Lua 模式中 %d 表示什么？",
        "a": "数字字符类"
      },
      {
        "q": "匹配字面量点号应怎么写？",
        "a": "%."
      }
    ]
  },
  {
    "id": 20,
    "t": "模块与包：require 与 luarocks",
    "p": [
      "模块通常返回一个 table，并在文件末尾写 return M",
      "require 按 package.path 查找模块，并缓存到 package.loaded",
      "package.path 可追加自定义搜索路径，如 ./?.lua",
      "luarocks 安装的库会自动加入搜索路径，版本由 rockspec 描述"
    ],
    "c": "package.preload[\"mymodule\"] = function()\n    local M = {}\n    function M.greet(name)\n        return \"Hello, \" .. name\n    end\n    return M\nend\n\nlocal mymodule = require(\"mymodule\")\nprint(mymodule.greet(\"Lua\"))\nprint(package.path)",
    "et": "❌ 常见错误",
    "ec": "require 模块名与文件名大小写不一致：Linux 区分大小写，Windows 可能不区分，部署到 Linux 后容易找不到模块。",
    "q": [
      {
        "q": "模块文件末尾通常返回什么？",
        "a": "一个表 M"
      },
      {
        "q": "require 的模块缓存在哪里？",
        "a": "package.loaded"
      }
    ]
  },
  {
    "id": 21,
    "t": "标准库速查与工具链",
    "p": [
      "包管理：luarocks install 安装库，list 查看，remove 卸载",
      "测试框架 busted，格式化工具 StyLua，静态检查 luacheck",
      "调试可用 lua-debug 扩展或内置 debug 库打印 traceback",
      "运行时 lua main.lua，字节码用 luac，交互式用 lua -i"
    ],
    "c": "# 包管理：LuaRocks\nluarocks install dkjson\nluarocks list\nluarocks remove dkjson\n\n# 测试：busted\nluarocks install busted\nbusted\nbusted --coverage\n\n# 格式化：StyLua\nstylua .\nstylua --check .\n\n# 静态检查：luacheck\nluacheck .\nluacheck --no-unused-args src/\n\n# 调试：debug.traceback 或 lua-debug 扩展\nlua -e 'print(debug.traceback(\"trace\"))'\n\n# 运行\nlua main.lua",
    "et": "❌ 常见错误",
    "ec": "在项目目录外运行 luacheck 或 busted：默认配置与路径不匹配，会扫描错目录或找不到模块；应在项目根目录执行并配置 .luacheckrc。",
    "q": [
      {
        "q": "Lua 的格式化工具是什么？",
        "a": "StyLua"
      },
      {
        "q": "静态检查工具是什么？",
        "a": "luacheck"
      }
    ]
  },
  {
    "id": 22,
    "t": "并发与异步：协程",
    "p": [
      "Lua 协程是协作式并发，同一时刻只有一个协程真正在执行运行",
      "coroutine.create 创建，resume 启动或恢复，yield 挂起",
      "coroutine.status 返回 suspended、running 或 dead",
      "协程适合生产者消费者、迭代器与异步流程，并不提供抢占式线程调度"
    ],
    "c": "local function producer()\n    return coroutine.create(function()\n        for i = 1, 3 do\n            coroutine.yield(i)\n        end\n        return \"done\"\n    end)\nend\n\nlocal co = producer()\nwhile true do\n    local ok, value = coroutine.resume(co)\n    if not ok or coroutine.status(co) == \"dead\" then\n        print(\"结束:\", value)\n        break\n    end\n    print(\"收到:\", value)\nend",
    "et": "❌ 常见错误",
    "ec": "在协程外调用 yield：主协程中 yield 会报 attempt to yield from outside a coroutine；应把逻辑放入 create 或 wrap 的协程中。",
    "q": [
      {
        "q": "启动或恢复协程用什么函数？",
        "a": "coroutine.resume"
      },
      {
        "q": "协程挂起用什么函数？",
        "a": "coroutine.yield"
      }
    ]
  },
  {
    "id": 23,
    "t": "性能优化：局部化与预分配",
    "p": [
      "把频繁访问的全局函数缓存为 local，减少全局表的哈希查找开销",
      "避免在热循环中创建临时表与字符串，复用已有对象或缓冲区内存空间",
      "为数组预分配空间，减少 rehash 与扩容带来的额外开销成本",
      "LuaJIT 可显著加速数值与循环，但需注意它与 5.4 的语法差异"
    ],
    "c": "local function sum(n)\n    local total = 0\n    for i = 1, n do total = total + i end\n    return total\nend\n\nlocal start = os.clock()\nprint(sum(1000000))\nprint(string.format(\"耗时: %.4f s\", os.clock() - start))\n\nlocal t = {}\nfor i = 1, 100000 do t[i] = i end\n\nlocal parts = {}\nfor i = 1, 10000 do parts[#parts + 1] = tostring(i) end\nprint(#table.concat(parts))",
    "et": "❌ 常见错误",
    "ec": "在循环中反复拼接字符串：Lua 字符串不可变，每次 .. 都创建新串；应把片段存入表再用 table.concat 一次拼接。",
    "q": [
      {
        "q": "为什么要把全局函数缓存为 local？",
        "a": "减少全局表哈希查找"
      },
      {
        "q": "大字符串拼接推荐什么方式？",
        "a": "table.concat"
      }
    ]
  },
  {
    "id": 24,
    "t": "测试：busted",
    "p": [
      "busted 用 describe 与 it 组织用例，断言风格接近自然语言",
      "assert.are.equal、assert.is_true、assert.has_error 是常用断言",
      "before_each 与 after_each 管理测试夹具",
      "busted --coverage 可生成覆盖率报告，配合 luacov 使用"
    ],
    "c": "-- spec/calc_spec.lua\nlocal calc = require(\"calc\")\n\ndescribe(\"calc.add\", function()\n    it(\"返回两数之和\", function()\n        assert.are.equal(5, calc.add(2, 3))\n    end)\n\n    it(\"支持负数\", function()\n        assert.are.equal(-1, calc.add(2, -3))\n    end)\nend)",
    "et": "❌ 常见错误",
    "ec": "测试文件不以 _spec.lua 结尾：busted 默认只发现匹配规则的文件，测试显示 0 个用例；应遵循命名约定或用 --pattern 指定。",
    "q": [
      {
        "q": "busted 中组织用例的函数是什么？",
        "a": "describe 与 it"
      },
      {
        "q": "断言相等用什么？",
        "a": "assert.are.equal"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧：print、traceback 与 luacheck",
    "p": [
      "临时 print 或 io.write 输出变量，定位后及时删除",
      "debug.traceback 可打印调用栈，xpcall 中作为消息处理器",
      "luacheck 能发现未定义全局、未使用变量与可疑代码问题",
      "lua -i 可在脚本结束后进入交互式环境检查运行状态与变量当前值"
    ],
    "c": "local function risky(x)\n    if x == nil then\n        error(\"x 不能为 nil\", 2)\n    end\n    return x * 2\nend\n\nlocal ok, err = pcall(risky, nil)\nprint(ok, err)\n\nprint(debug.traceback(\"调用栈\", 1))\n\n-- 运行: lua -e \"print(_VERSION)\"\n-- 静态检查: luacheck main.lua\n-- 交互调试: lua -i main.lua\nfor i = 1, 2 do\n    print(i, type(i))\nend",
    "et": "❌ 常见错误",
    "ec": "只打印变量值不看类型：nil 与 false 的输出容易混淆，应同时打印 type(v)，必要时用 debug.traceback 查看调用来源。",
    "q": [
      {
        "q": "打印调用栈用什么函数？",
        "a": "debug.traceback"
      },
      {
        "q": "发现未定义全局变量的工具？",
        "a": "luacheck"
      }
    ]
  },
  {
    "id": 26,
    "t": "与 C 及系统互操作",
    "p": [
      "Lua C API 允许宿主注册函数、读写表与调用 Lua 代码",
      "package.loadlib 可加载动态库，require 会查找 package.cpath",
      "LuaJIT 的 FFI 可直接声明并调用 C 函数，无需编写 C 模块",
      "io.popen 与 os.execute 可调用系统命令，但要防范命令注入"
    ],
    "c": "-- 1) LuaJIT FFI（需 luajit）\n-- local ffi = require(\"ffi\")\n-- ffi.cdef[[ int puts(const char *s); ]]\n-- ffi.C.puts(\"hello from C\")\n\n-- 2) 标准 Lua：require 一个用 C API 编译的 .so\n-- local mylib = require(\"mylib\")\n\n-- 3) 调用系统命令（注意输入可信）\nlocal pipe = assert(io.popen(\"uname -s\"))\nprint(\"系统: \" .. pipe:read(\"l\"))\npipe:close()\n\nprint(\"cpath: \" .. package.cpath)",
    "et": "❌ 常见错误",
    "ec": "把用户输入拼进 os.execute 命令：会遭受命令注入；应避免拼接，或使用参数化接口与严格白名单校验。",
    "q": [
      {
        "q": "标准 Lua 加载动态库用什么函数？",
        "a": "package.loadlib"
      },
      {
        "q": "LuaJIT 调用 C 函数使用什么机制？",
        "a": "FFI"
      }
    ]
  },
  {
    "id": 27,
    "t": "设计模式：模块、策略与单例",
    "p": [
      "模块模式用 local 表封装私有状态，只导出必要的公共函数",
      "策略模式用表存放函数，按名称动态选择具体算法的实现与调用方式",
      "单例可通过 package.loaded 缓存模块实例来实现单例",
      "装饰器用包装函数增强行为，保持原有接口不变以及对外的函数调用方式"
    ],
    "c": "local Logger = {}\nLogger.__index = Logger\nfunction Logger.new(prefix) return setmetatable({ prefix = prefix }, Logger) end\nfunction Logger:log(msg) print(\"[\" .. self.prefix .. \"] \" .. msg) end\n\nlocal strategies = {\n    add = function(a, b) return a + b end,\n    mul = function(a, b) return a * b end,\n}\n\nlocal log = Logger.new(\"app\")\nlog:log(\"add=\" .. strategies.add(2, 3))\n\npackage.loaded.config = { env = \"dev\" }\nprint(require(\"config\").env)",
    "et": "❌ 常见错误",
    "ec": "用全局表保存单例状态：任何代码都能修改它，测试之间互相污染；应把状态放在 local 中，仅通过模块函数访问。",
    "q": [
      {
        "q": "模块模式如何隐藏私有状态？",
        "a": "用 local 表，不导出"
      },
      {
        "q": "策略模式通常用什么存放算法？",
        "a": "以名称为键的函数表"
      }
    ]
  },
  {
    "id": 28,
    "t": "数据库访问：LuaSQL",
    "p": [
      "LuaSQL 提供 sqlite3、mysql 等驱动，需先安装对应 rock",
      "环境对象创建连接，连接对象执行 SQL 语句与准备语句查询操作",
      "prepare 加 bind_values 可绑定参数，避免 SQL 注入",
      "查询游标用 fetch 逐行读取，使用结束后关闭游标与连接对象"
    ],
    "c": "local luasql = require(\"luasql.sqlite3\")\nlocal env = luasql.sqlite3()\nlocal conn = assert(env:connect(\"demo.db\"))\n\nconn:execute(\"CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY, name TEXT)\")\nlocal stmt = assert(conn:prepare(\"INSERT INTO user(name) VALUES (?)\"))\nstmt:bind_values(\"Ada\")\nstmt:execute()\nstmt:close()\n\nlocal cur = assert(conn:execute(\"SELECT id, name FROM user\"))\nlocal row = cur:fetch({}, \"a\")\nwhile row do\n    print(row.id, row.name)\n    row = cur:fetch({}, \"a\")\nend\ncur:close()\nconn:close()\nenv:close()",
    "et": "❌ 常见错误",
    "ec": "用字符串拼接 SQL：用户输入可改变语句结构，造成注入；应使用 prepare 与 bind_values 绑定参数。",
    "q": [
      {
        "q": "LuaSQL 绑定参数用什么方法？",
        "a": "bind_values"
      },
      {
        "q": "关闭资源时最后关闭什么？",
        "a": "环境对象 env"
      }
    ]
  },
  {
    "id": 29,
    "t": "网络编程与 HTTP 客户端",
    "p": [
      "LuaSocket 提供 TCP、UDP 与 HTTP 客户端能力",
      "socket.http 请求 HTTP，ssl.https 请求 HTTPS，后者需 luasec",
      "ltn12.sink.table 可把响应体收集到表，再拼接成字符串",
      "dkjson 负责 JSON 编解码，需通过 luarocks 安装"
    ],
    "c": "local https = require(\"ssl.https\")\nlocal ltn12 = require(\"ltn12\")\nlocal json = require(\"dkjson\")\n\nlocal body = {}\nlocal ok, code = https.request({\n    url = \"https://httpbin.org/get\",\n    method = \"GET\",\n    headers = { [\"Accept\"] = \"application/json\" },\n    sink = ltn12.sink.table(body),\n})\nprint(ok, code)\nlocal data = table.concat(body)\nlocal obj = json.decode(data)\nprint(obj and obj.url)",
    "et": "❌ 常见错误",
    "ec": "用 socket.http 访问 HTTPS 地址：会因协议不支持而失败；应改用 ssl.https 并安装 luasec，或交给宿主提供的 HTTP 客户端。",
    "q": [
      {
        "q": "HTTPS 请求需要哪个模块？",
        "a": "ssl.https，依赖 luasec"
      },
      {
        "q": "JSON 解码用什么库？",
        "a": "dkjson"
      }
    ]
  },
  {
    "id": 30,
    "t": "安全编程：沙箱与输入校验",
    "p": [
      "不要对不可信字符串直接调用 load，必要时用受限环境限制能力",
      "禁止把用户输入拼进 SQL 与系统命令，使用参数绑定与白名单",
      "文件路径需拒绝 .. 与绝对路径，防止目录穿越攻击路径风险问题",
      "限制反序列化与动态库加载，避免执行任意恶意代码的注入风险问题"
    ],
    "c": "local function safe_read(name)\n    assert(type(name) == \"string\", \"文件名必须是字符串\")\n    assert(not name:find(\"..\", 1, true), \"禁止 .. 路径\")\n    local f = io.open(name, \"r\")\n    if not f then return nil, \"无法打开\" end\n    local data = f:read(\"a\")\n    f:close()\n    return data\nend\n\nprint(safe_read(\"demo.txt\"))\nprint(safe_read(\"../etc/passwd\"))\n\nlocal env = { print = print }\nlocal chunk = assert(load(\"return 1 + 1\", \"sandbox\", \"t\", env))\nprint(chunk())",
    "et": "❌ 常见错误",
    "ec": "用 load 执行用户提交的表达式并传入完整全局环境：攻击者可访问 os.execute 等危险函数；应传入最小环境并移除敏感库。",
    "q": [
      {
        "q": "沙箱执行 load 时第三、四个参数是什么？",
        "a": "模式与受限环境表"
      },
      {
        "q": "如何防止目录穿越？",
        "a": "拒绝包含 .. 的路径并做白名单校验"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战：命令行文件统计工具",
    "p": [
      "脚本参数在全局 arg 表中，arg[1] 才是第一个实际参数",
      "io.open 打开文件，read(\"a\") 读取文件的全部内容",
      "用 gsub 统计换行数，字符串长度即为字节数的统计结果数值",
      "错误写 io.stderr，os.exit(1) 返回非零退出码"
    ],
    "c": "local function main(args)\n    if #args == 0 then\n        io.stderr:write(\"用法: lua wc.lua FILE...\\n\")\n        os.exit(1)\n    end\n    for _, path in ipairs(args) do\n        local f = io.open(path, \"r\")\n        if not f then\n            io.stderr:write(\"无法打开: \" .. path .. \"\\n\")\n        else\n            local content = f:read(\"a\")\n            f:close()\n            local lines = select(2, content:gsub(\"\\n\", \"\\n\"))\n            print(string.format(\"%d\\t%d\\t%s\", lines, #content, path))\n        end\n    end\nend\n\nmain(arg)",
    "et": "❌ 常见错误",
    "ec": "直接用 arg[1] 而不检查参数个数：没有参数时得到 nil，io.open(nil) 会报错；应先判断 #arg 并打印用法。",
    "q": [
      {
        "q": "Lua 脚本参数存放在哪个全局表？",
        "a": "arg"
      },
      {
        "q": "统计换行数可用什么方法？",
        "a": "gsub(\"\\n\", ...) 的第二个返回值"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战：LuaSocket 简易 HTTP 服务",
    "p": [
      "socket.bind 监听地址与端口，accept 接收客户端连接",
      "HTTP 请求以空行结束，逐行读取直到遇到空字符串的结束标志",
      "响应需包含状态行、Content-Type、Content-Length 与空行",
      "生产环境应使用 OpenResty 或成熟框架处理并发与解析"
    ],
    "c": "local socket = require(\"socket\")\n\nlocal server = assert(socket.bind(\"127.0.0.1\", 8080))\nprint(\"监听 http://127.0.0.1:8080\")\n\nwhile true do\n    local client = server:accept()\n    client:settimeout(2)\n    local request = client:receive(\"l\")\n    while request and request ~= \"\" do\n        request = client:receive(\"l\")\n    end\n    local body = \"Hello from Lua!\"\n    client:send(\"HTTP/1.1 200 OK\\r\\n\")\n    client:send(\"Content-Type: text/plain\\r\\n\")\n    client:send(\"Content-Length: \" .. #body .. \"\\r\\n\\r\\n\")\n    client:send(body)\n    client:close()\nend",
    "et": "❌ 常见错误",
    "ec": "响应缺少 Content-Length 或空行分隔：客户端会一直等待响应结束；HTTP 头与正文之间必须有一个空行，并给出正确长度。",
    "q": [
      {
        "q": "监听端口用什么函数？",
        "a": "socket.bind"
      },
      {
        "q": "HTTP 头与正文之间用什么分隔？",
        "a": "一个空行"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建、部署与发布",
    "p": [
      "纯 Lua 项目可直接打包源码，用 lua main.lua 运行",
      "luarocks make 按 rockspec 安装，luarocks pack 生成压缩包",
      "字节码可用 luac 编译，但必须与目标 Lua 版本保持一致",
      "嵌入宿主时链接 liblua，或使用 OpenResty 等集成发行版"
    ],
    "c": "# 按 rockspec 本地安装\nluarocks make app-1.0-1.rockspec\n\n# 打包与上传\nluarocks pack app 1.0-1\nluarocks upload app-1.0-1.rockspec --api-key=...\n\n# 纯脚本发布\nzip -r app.zip app.lua lib/\n\n# 嵌入宿主：链接 liblua5.4，或使用 OpenResty\n# Docker 运行\ndocker run --rm -v \"$PWD\":/app -w /app lua:5.4 lua app.lua",
    "et": "❌ 常见错误",
    "ec": "把 Lua 5.4 字节码交给 5.3 解释器：字节码格式与版本绑定，会报版本不匹配；分发时应统一解释器版本或直接发布源码。",
    "q": [
      {
        "q": "根据 rockspec 安装用什么命令？",
        "a": "luarocks make"
      },
      {
        "q": "打包 Lua 库用什么命令？",
        "a": "luarocks pack"
      }
    ]
  },
  {
    "id": 34,
    "t": "最佳实践与代码风格",
    "p": [
      "始终使用 local，模块只导出必要接口，避免污染全局命名环境",
      "函数保持短小，错误用返回值或 pcall 显式处理并记录信息",
      "用 StyLua 统一格式，luacheck 纳入 CI 检查",
      "为公共模块编写 busted 测试，覆盖边界条件与错误路径分支"
    ],
    "c": "local M = {}\n\nlocal function clamp(value, min, max)\n    if value < min then return min end\n    if value > max then return max end\n    return value\nend\n\nfunction M.normalize(values)\n    local out = {}\n    for i, v in ipairs(values) do\n        out[i] = clamp(v, 0, 100)\n    end\n    return out\nend\n\nreturn M",
    "et": "❌ 常见错误",
    "ec": "在模块中大量创建全局函数：不同模块会互相覆盖，且难以测试；应使用 local M = {} 并 return M 导出。",
    "q": [
      {
        "q": "模块应如何导出接口？",
        "a": "用 local M = {} 并在末尾 return M"
      },
      {
        "q": "Lua 代码静态检查用什么？",
        "a": "luacheck"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "先掌握表、函数、闭包与元表，这是 Lua 最核心的抽象概念知识",
      "深入协程、模式匹配、错误处理以及 C API 互操作调用能力",
      "工程化补齐 luarocks、busted、StyLua 与 luacheck",
      "方向包括 OpenResty、游戏脚本、嵌入式扩展与 Redis 脚本"
    ],
    "c": "local roadmap = {\n    { \"语法\", \"local、表、元表、错误处理\" },\n    { \"进阶\", \"协程、闭包、模式匹配、C API\" },\n    { \"工程\", \"LuaRocks、busted、StyLua、luacheck\" },\n    { \"方向\", \"OpenResty、游戏脚本、嵌入式扩展\" },\n}\n\nfor i, item in ipairs(roadmap) do\n    print(string.format(\"%d. %-6s %s\", i, item[1], item[2]))\nend\nprint(\"下一步：用 busted 为你的模块补全测试\")",
    "et": "❌ 常见错误",
    "ec": "只背语法不读宿主文档：Lua 的能力边界由宿主决定，OpenResty、Redis 与游戏引擎的 API 差异很大，需要结合场景学习。",
    "q": [
      {
        "q": "Lua 最核心的复合数据结构是什么？",
        "a": "表 table"
      },
      {
        "q": "Web 方向常用的 Lua 集成是什么？",
        "a": "OpenResty"
      }
    ]
  }
];
