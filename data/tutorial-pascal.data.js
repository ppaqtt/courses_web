window.TUTORIAL_DATA_pascal = [
  {
    "id": 1,
    "t": "Pascal 语言简介与历史",
    "p": [
      "Pascal 由 Niklaus Wirth 于 1970 年发布，最初用于结构化编程教学，强调清晰与可读性",
      "发展脉络：Turbo Pascal 推动了 PC 开发，Delphi 引入面向对象与可视化组件，Free Pascal 延续跨平台路线",
      "Free Pascal 支持 objfpc、delphi 等多种语法模式，可编译到 Windows、Linux、macOS 和嵌入式平台",
      "典型应用：桌面软件、教育、科学计算、遗留系统维护，以及 Lazarus 可视化应用开发"
    ],
    "c": "program Hello;\n\n{$mode objfpc}{$H+}\n\nbegin\n  WriteLn('Hello, Free Pascal!');\n  WriteLn('Pascal 由 Niklaus Wirth 于 1970 年发布。');\n  WriteLn('Free Pascal 兼容 Turbo Pascal 与 Delphi 语法。');\n  WriteLn('本教程使用 objfpc 模式演示标准 Pascal 写法。');\nend.",
    "et": "❌ 常见错误",
    "ec": "程序末尾必须写 end. 而不是 end；字符串只能使用单引号，写成双引号会编译失败；语句之间用分号，但 end 前的最后一条语句可以省略分号。",
    "q": [
      {
        "q": "Pascal 语言的设计者是谁？",
        "a": "Niklaus Wirth"
      },
      {
        "q": "Free Pascal 源程序以什么符号结束？",
        "a": "end. （带句点）"
      }
    ]
  },
  {
    "id": 2,
    "t": "安装与工具链环境",
    "p": [
      "编译器命令是 fpc，安装后可直接 fpc hello.pas 生成可执行文件；Lazarus 提供 IDE 与可视化设计器",
      "fpc 常用选项：-O2 优化、-g 生成调试信息、-dDEBUG 定义条件符号、-Fu 添加单元搜索路径",
      "包管理：fppkg 管理 Free Pascal 包，Lazarus 的 OPM 管理组件包，二者安装路径和用途不同",
      "测试用 fpcunit，格式化用 JEDI Code Format，调试可用 gdb 或 Lazarus 自带的 fpdebug"
    ],
    "c": "program Toolchain;\n\n{$mode objfpc}{$H+}\n\nbegin\n  WriteLn('Free Pascal 编译器版本：', {$I %FPCVERSION%});\n  WriteLn('目标平台：', {$I %FPCTARGETOS%}, '/', {$I %FPCTARGETCPU%});\n  WriteLn('编译：fpc -O2 hello.pas');\n  WriteLn('调试：fpc -g hello.pas，然后 gdb ./hello');\nend.",
    "et": "❌ 常见错误",
    "ec": "忘记写 {$mode objfpc}，编译器会按 Turbo Pascal 模式处理，Result、重载和高级字符串特性不可用；源文件扩展名必须是 .pas。",
    "q": [
      {
        "q": "Free Pascal 的编译命令是什么？",
        "a": "fpc"
      },
      {
        "q": "哪个选项用于生成调试信息？",
        "a": "-g"
      }
    ]
  },
  {
    "id": 3,
    "t": "变量、常量与命名",
    "p": [
      "变量在 var 段声明，常量在 const 段声明；赋值使用 :=，而 = 是比较是否相等",
      "标识符大小写不敏感，Name 与 name 视为同一个名字；习惯上变量用 PascalCase 或 camelCase",
      "常量在编译期确定，可带类型；变量声明可带初始值，全局变量默认初始化为零值",
      "局部变量不会自动初始化，字符串默认空串，数值内容不确定，使用前应先赋值"
    ],
    "c": "program Variables;\n\n{$mode objfpc}{$H+}\n\nconst\n  MaxUsers = 100;\n  Pi = 3.14159;\n\nvar\n  age: Integer;\n  price: Double;\n  name: string;\n\nbegin\n  age := 30;\n  price := 19.9;\n  name := 'Pascal';\n  WriteLn('name=', name, ' age=', age, ' price=', price:0:1);\n  WriteLn('MaxUsers=', MaxUsers, ' Pi=', Pi:0:2);\nend.",
    "et": "❌ 常见错误",
    "ec": "用 = 给变量赋值，= 在 Pascal 中是相等比较，赋值必须用 :=；另外把字符串写成双引号也会报错，Pascal 字符串只接受单引号。",
    "q": [
      {
        "q": "Pascal 中赋值运算符是什么？",
        "a": ":="
      },
      {
        "q": "Pascal 标识符区分大小写吗？",
        "a": "不区分"
      }
    ]
  },
  {
    "id": 4,
    "t": "数据类型",
    "p": [
      "整数类型有 ShortInt、Integer、Int64、QWord 等，Integer 在 64 位平台仍是 32 位",
      "浮点类型有 Single、Double、Extended；货币计算可用 Currency 减少二进制浮点误差",
      "常用类型还包括 Boolean、Char、string、以及枚举和子界类型，SizeOf 返回字节数",
      "类型转换用隐式赋值或显式类型名，字符串与数值互转使用 IntToStr、StrToInt、StrToFloat"
    ],
    "c": "program Types;\n\n{$mode objfpc}{$H+}\n\nvar\n  i: Integer;\n  big: Int64;\n  r: Double;\n  ok: Boolean;\n  ch: Char;\n  s: string;\n\nbegin\n  i := 42;\n  big := 9223372036854775807;\n  r := 2.5;\n  ok := True;\n  ch := 'A';\n  s := 'text';\n  WriteLn('Integer 大小=', SizeOf(i));\n  WriteLn('Int64 大小=', SizeOf(big));\n  WriteLn('Double 大小=', SizeOf(r));\n  WriteLn('Boolean=', ok, ' Char=', ch, ' string=', s);\nend.",
    "et": "❌ 常见错误",
    "ec": "把 Integer 当作固定的 64 位类型：FPC 在 64 位平台 Integer 仍是 32 位，需要平台相关整数时应使用 NativeInt 或 PtrInt。",
    "q": [
      {
        "q": "FPC 中 Integer 通常占几字节？",
        "a": "4 字节（32 位）"
      },
      {
        "q": "哪个函数返回类型或变量的大小？",
        "a": "SizeOf"
      }
    ]
  },
  {
    "id": 5,
    "t": "运算符与表达式",
    "p": [
      "算术运算符：+ - * / div mod；/ 总是返回浮点结果，div 是整数除法，mod 取余",
      "比较运算符：= <> < > <= >=；逻辑运算符：and or not xor，布尔运算默认短路",
      "位运算使用 and or xor not shl shr，作用于整数；集合运算使用 + - * in",
      "运算符优先级：not > 乘除 > 加减 > 比较 > and > or，复杂表达式应加括号"
    ],
    "c": "program Operators;\n\n{$mode objfpc}{$H+}\n\nvar\n  a, b: Integer;\nbegin\n  a := 7;\n  b := 2;\n  WriteLn('a div b = ', a div b);\n  WriteLn('a mod b = ', a mod b);\n  WriteLn('a / b = ', a / b:0:2);\n  WriteLn('a shl 1 = ', a shl 1);\n  WriteLn('a and b = ', a and b);\n  WriteLn('(a > b) and (b > 0) = ', (a > b) and (b > 0));\nend.",
    "et": "❌ 常见错误",
    "ec": "用 / 期望得到整数，结果却是 Real，赋给 Integer 会报类型不匹配；要整除必须用 div，取余用 mod。",
    "q": [
      {
        "q": "Pascal 中整数除法用哪个运算符？",
        "a": "div"
      },
      {
        "q": "7 mod 2 的结果是多少？",
        "a": "1"
      }
    ]
  },
  {
    "id": 6,
    "t": "字符串处理",
    "p": [
      "string 是动态字符串，下标从 1 开始，Length 返回字符数，空串长度为 0",
      "常用函数：Pos 查找子串、Copy 截取、Delete 删除、Insert 插入、UpperCase/LowerCase 转换大小写",
      "用 + 拼接字符串，IntToStr、StrToInt、FloatToStr 在数值与字符串之间转换",
      "string 在 FPC 中默认是 AnsiString，存储单字节或 UTF-8 字节序列，中文长度按字节计算"
    ],
    "c": "program Strings;\n\n{$mode objfpc}{$H+}\nuses SysUtils;\n\nvar\n  s, t: string;\nbegin\n  s := 'Free Pascal';\n  t := UpperCase(s);\n  WriteLn('长度=', Length(s));\n  WriteLn('大写=', t);\n  WriteLn('Pos(Pascal)=', Pos('Pascal', s));\n  WriteLn('Copy=', Copy(s, 6, 6));\n  WriteLn('拼接=', s + ' 3.2');\n  WriteLn('替换后=', StringReplace(s, 'Free', 'Object', []));\nend.",
    "et": "❌ 常见错误",
    "ec": "认为字符串下标从 0 开始，Copy(s, 0, 3) 的结果不符合预期；Pascal 字符串下标从 1 开始，访问 s[0] 可能读到长度信息。",
    "q": [
      {
        "q": "Pascal 字符串的第一个字符下标是多少？",
        "a": "1"
      },
      {
        "q": "哪个函数查找子串位置？",
        "a": "Pos"
      }
    ]
  },
  {
    "id": 7,
    "t": "数组与动态数组",
    "p": [
      "静态数组声明为 array[1..5] of Integer，上下界可自定义，Low/High 返回边界",
      "动态数组声明为 array of Integer，使用 SetLength 分配长度，Length 获取当前长度",
      "数组下标越界默认不检查，可加 {$R+} 开启范围检查，便于开发期发现错误",
      "多维数组用 array[1..2, 1..3] of Integer 声明，按行优先连续存储"
    ],
    "c": "program Arrays;\n\n{$mode objfpc}{$H+}\n\nvar\n  scores: array[1..5] of Integer = (88, 92, 79, 95, 70);\n  dyn: array of Integer;\n  i, sum: Integer;\nbegin\n  sum := 0;\n  for i := Low(scores) to High(scores) do\n    sum := sum + scores[i];\n  WriteLn('总分=', sum, ' 平均=', sum / Length(scores):0:1);\n\n  SetLength(dyn, 3);\n  dyn[0] := 10;\n  dyn[1] := 20;\n  dyn[2] := 30;\n  WriteLn('动态数组长度=', Length(dyn), ' 末项=', dyn[High(dyn)]);\nend.",
    "et": "❌ 常见错误",
    "ec": "动态数组没有 SetLength 就赋值，会触发访问违例；静态数组的上下界由声明决定，循环里硬编码 0 会越界。",
    "q": [
      {
        "q": "动态数组用什么函数分配长度？",
        "a": "SetLength"
      },
      {
        "q": "哪个函数返回数组的最小下标？",
        "a": "Low"
      }
    ]
  },
  {
    "id": 8,
    "t": "条件分支",
    "p": [
      "if 条件 then 语句 else 语句，多分支用 else if 串联，复合语句必须用 begin end 包住",
      "then 前不能加分号，否则分支变成空语句，else 会与错误的分支配对",
      "case 选择器必须是序数类型，分支用 冒号 和分号，else 处理未覆盖的值",
      "布尔表达式用 and/or/not，比较用 = 和 <>，不要与赋值 := 混淆"
    ],
    "c": "program Conditions;\n\n{$mode objfpc}{$H+}\n\nvar\n  score: Integer;\n  grade: Char;\nbegin\n  score := 86;\n  if score >= 90 then\n    grade := 'A'\n  else if score >= 80 then\n    grade := 'B'\n  else\n    grade := 'C';\n\n  case score div 10 of\n    9: grade := 'A';\n    8: grade := 'B';\n  else\n    grade := 'C';\n  end;\n\n  WriteLn('成绩=', score, ' 等级=', grade);\nend.",
    "et": "❌ 常见错误",
    "ec": "在 if 条件后误加分号（if x then;），使 then 分支成为空语句，后续代码无条件执行；else 前多写分号也会导致编译错误。",
    "q": [
      {
        "q": "Pascal 的 case 分支使用什么符号分隔？",
        "a": "冒号 :"
      },
      {
        "q": "if 条件后能直接加分号吗？",
        "a": "不能，会变成空语句"
      }
    ]
  },
  {
    "id": 9,
    "t": "循环与递归",
    "p": [
      "for 循环用于已知次数，循环变量由编译器管理，不能随意在循环体内修改",
      "while 先判断后执行，repeat until 先执行后判断，直到条件为真时结束",
      "break 跳出循环，continue 跳过本次迭代，Exit 直接退出当前过程或函数",
      "递归函数必须有终止条件，结果赋给 Result；深递归可能耗尽栈空间，可改用循环"
    ],
    "c": "program Loops;\n\n{$mode objfpc}{$H+}\n\nvar\n  i: Integer;\n\nfunction Factorial(n: Integer): Int64;\nbegin\n  if n <= 1 then\n    Result := 1\n  else\n    Result := n * Factorial(n - 1);\nend;\n\nbegin\n  for i := 1 to 5 do\n    Write(i, ' ');\n  WriteLn;\n\n  i := 1;\n  while i <= 5 do\n  begin\n    Write(i * i, ' ');\n    Inc(i);\n  end;\n  WriteLn;\n  WriteLn('5! = ', Factorial(5));\nend.",
    "et": "❌ 常见错误",
    "ec": "递归函数缺少终止条件会无限调用直至栈溢出；repeat until 的条件是“直到为真”，与 while 的“当为真时继续”相反，写反会多执行一轮。",
    "q": [
      {
        "q": "repeat until 与 while 的区别是什么？",
        "a": "repeat 先执行后判断，until 条件为真时结束"
      },
      {
        "q": "函数返回值存放在哪个变量？",
        "a": "Result"
      }
    ]
  },
  {
    "id": 10,
    "t": "过程与函数基础",
    "p": [
      "procedure 不返回值，function 通过 Result 返回一个值；两者都可以带参数",
      "参数声明格式为 名字: 类型，多个同类型参数可写成 a, b: Integer",
      "函数调用出现在表达式中，过程调用作为独立语句，调用时参数类型必须兼容",
      "函数和过程必须先声明后使用；实现可以放在主程序 begin 之前"
    ],
    "c": "program Functions;\n\n{$mode objfpc}{$H+}\n\nfunction Add(a, b: Integer): Integer;\nbegin\n  Result := a + b;\nend;\n\nprocedure PrintLine(ch: Char; n: Integer);\nvar\n  i: Integer;\nbegin\n  for i := 1 to n do\n    Write(ch);\n  WriteLn;\nend;\n\nbegin\n  WriteLn('3 + 5 = ', Add(3, 5));\n  PrintLine('=', 20);\nend.",
    "et": "❌ 常见错误",
    "ec": "在 function 中忘记给 Result 赋值，函数会返回该类型的默认值（数值为 0），造成隐蔽的计算错误；procedure 中写 Result 会直接编译失败。",
    "q": [
      {
        "q": "function 与 procedure 的主要区别？",
        "a": "function 通过 Result 返回值，procedure 不返回值"
      },
      {
        "q": "函数返回值赋给哪个标识符？",
        "a": "Result"
      }
    ]
  },
  {
    "id": 11,
    "t": "函数进阶：参数与重载",
    "p": [
      "参数修饰符：var 按引用传递可修改实参，const 只读引用避免复制，out 只用于输出",
      "默认参数让调用者可省略尾部参数，例如 Power(3) 等价于 Power(3, 2)",
      "overload 指令允许同名函数按参数类型或个数区分，编译器负责选择匹配版本",
      "函数可以返回记录或数组，多个返回值也可通过 var/out 参数实现"
    ],
    "c": "program Advanced;\n\n{$mode objfpc}{$H+}\n\nvar\n  x, y: Integer;\n\nfunction Power(Base: Double; Exponent: Integer = 2): Double;\nvar\n  i: Integer;\nbegin\n  Result := 1;\n  for i := 1 to Exponent do\n    Result := Result * Base;\nend;\n\nprocedure SwapValues(var A, B: Integer);\nvar\n  T: Integer;\nbegin\n  T := A; A := B; B := T;\nend;\n\nbegin\n  x := 1; y := 2;\n  SwapValues(x, y);\n  WriteLn('x=', x, ' y=', y);\n  WriteLn('3^2=', Power(3):0:0, ' 2^10=', Power(2, 10):0:0);\nend.",
    "et": "❌ 常见错误",
    "ec": "调用 var 参数时传入常量或表达式会编译错误，因为 var 需要可写变量；重载函数必须加 overload 指令，否则后定义的同名函数会覆盖前一个。",
    "q": [
      {
        "q": "哪个参数修饰符表示按引用传递并允许修改实参？",
        "a": "var"
      },
      {
        "q": "默认参数应放在参数列表的什么位置？",
        "a": "末尾"
      }
    ]
  },
  {
    "id": 12,
    "t": "作用域与模块化",
    "p": [
      "全局变量在程序头部声明，局部变量在过程或函数的 var 段声明，作用域限于所在块",
      "内层同名变量会遮蔽外层变量，需要访问全局变量时应避免重名或使用单元限定",
      "unit 是 Pascal 的模块单位，接口部分 interface 放声明，实现部分 implementation 放代码",
      "uses 子句引入单元，标准库单元如 SysUtils、Classes、Math 提供常用功能"
    ],
    "c": "program Scope;\n\n{$mode objfpc}{$H+}\n\nvar\n  counter: Integer = 0;\n\nprocedure Increase;\nvar\n  counter: Integer;\nbegin\n  counter := 100;\n  WriteLn('局部 counter=', counter);\nend;\n\nprocedure IncreaseGlobal;\nbegin\n  Inc(counter);\nend;\n\nbegin\n  Increase;\n  IncreaseGlobal;\n  IncreaseGlobal;\n  WriteLn('全局 counter=', counter);\nend.",
    "et": "❌ 常见错误",
    "ec": "局部变量与全局变量同名时，局部变量会遮蔽全局变量，误以为修改了全局值；需要操作全局变量时应换名或用单元名限定。",
    "q": [
      {
        "q": "内层同名变量对外层变量有什么影响？",
        "a": "遮蔽外层变量，外层值不变"
      },
      {
        "q": "Pascal 的模块单位叫什么？",
        "a": "unit"
      }
    ]
  },
  {
    "id": 13,
    "t": "记录、枚举与自定义类型",
    "p": [
      "record 把多个字段组合成新类型，字段用点号访问，记录可整体赋值但不能直接用 = 比较",
      "type 段用于声明类型别名、记录、枚举、集合和子界，type 后每个声明以分号结束",
      "枚举按声明顺序从 0 开始编号，Ord 取序号，Succ/Pred 取前驱后继",
      "带变体的 record 可让多个字段共享内存，读取时必须知道当前有效的是哪个变体"
    ],
    "c": "program RecordsDemo;\n\n{$mode objfpc}{$H+}\n\ntype\n  TPoint = record\n    X, Y: Integer;\n  end;\n\n  TColor = (Red, Green, Blue);\n\nvar\n  p: TPoint;\n  c: TColor;\nbegin\n  p.X := 3;\n  p.Y := 4;\n  c := Green;\n  WriteLn('点=(', p.X, ',', p.Y, ')');\n  WriteLn('颜色序号=', Ord(c));\nend.",
    "et": "❌ 常见错误",
    "ec": "在 record 定义末尾忘记写 end; 的分号，导致后续声明全部报错；枚举值不能直接用 ReadLn 读入，需要先读字符串再转换。",
    "q": [
      {
        "q": "访问记录字段使用什么符号？",
        "a": "点号 ."
      },
      {
        "q": "哪个函数返回枚举值的序号？",
        "a": "Ord"
      }
    ]
  },
  {
    "id": 14,
    "t": "文件 I/O",
    "p": [
      "文本文件用 TextFile 类型，AssignFile 关联文件名，Rewrite 创建、Reset 打开、Append 追加",
      "WriteLn 写入一行，ReadLn 读取一行，Eof 判断是否到文件末尾，CloseFile 关闭文件",
      "二进制文件用 file of 类型，配合 BlockRead/BlockWrite 按记录块读写",
      "文件操作可能抛异常，应使用 try/finally 确保 CloseFile 一定执行"
    ],
    "c": "program FileDemo;\n\n{$mode objfpc}{$H+}\nuses SysUtils;\n\nvar\n  f: TextFile;\n  line: string;\nbegin\n  AssignFile(f, 'demo.txt');\n  Rewrite(f);\n  WriteLn(f, '第一行：Free Pascal');\n  WriteLn(f, '第二行：文件 I/O');\n  CloseFile(f);\n\n  AssignFile(f, 'demo.txt');\n  Reset(f);\n  while not Eof(f) do\n  begin\n    ReadLn(f, line);\n    WriteLn('读到：', line);\n  end;\n  CloseFile(f);\nend.",
    "et": "❌ 常见错误",
    "ec": "打开文件后异常退出却没有 CloseFile，会造成句柄泄漏或缓冲数据未写入；Rewrite 会清空已有文件，对重要文件误用会直接丢失数据。",
    "q": [
      {
        "q": "创建或覆盖文件用哪个过程？",
        "a": "Rewrite"
      },
      {
        "q": "判断文件是否读完用哪个函数？",
        "a": "Eof"
      }
    ]
  },
  {
    "id": 15,
    "t": "异常处理",
    "p": [
      "try/except 捕获异常，on E: 异常类型 do 处理指定类型，E.Message 获取错误信息",
      "raise 主动抛出异常，可抛出 Exception 派生类实例，异常会沿调用栈向上传播",
      "try/finally 用于资源清理，无论是否发生异常都会执行 finally 块",
      "常见异常类：EDivByZero、EConvertError、EFOpenError、ERangeError，均继承自 Exception"
    ],
    "c": "program Errors;\n\n{$mode objfpc}{$H+}\nuses SysUtils;\n\nfunction SafeDivide(a, b: Integer): Double;\nbegin\n  if b = 0 then\n    raise EDivByZero.Create('除数不能为零');\n  Result := a / b;\nend;\n\nbegin\n  try\n    WriteLn(SafeDivide(10, 2):0:2);\n    WriteLn(SafeDivide(1, 0):0:2);\n  except\n    on E: EDivByZero do\n      WriteLn('捕获异常：', E.Message);\n  end;\nend.",
    "et": "❌ 常见错误",
    "ec": "只写 try/except 而忘记 finally 释放资源，异常路径下文件或对象会泄漏；except 不指定异常类型会吞掉所有错误，难以定位问题。",
    "q": [
      {
        "q": "捕获异常使用哪两个关键字？",
        "a": "try 和 except"
      },
      {
        "q": "无论是否异常都执行的块由哪个关键字引导？",
        "a": "finally"
      }
    ]
  },
  {
    "id": 16,
    "t": "格式化输入输出",
    "p": [
      "Write/WriteLn 支持宽度和精度：整数用 x:5，实数用 x:8:3，字符串用 s:10 右对齐",
      "负宽度表示左对齐；Format 使用 %s、%d、%f、%.2f 等占位符构造格式化字符串",
      "ReadLn 读取整行，Read 读取指定类型；输入不匹配会抛 EConvertError 或 EInOutError",
      "StrToIntDef、StrToFloatDef 在转换失败时返回默认值，适合处理不可信输入"
    ],
    "c": "program Formatting;\n\n{$mode objfpc}{$H+}\nuses SysUtils;\n\nvar\n  name: string;\n  age: Integer;\n  ratio: Double;\nbegin\n  name := 'Pascal';\n  age := 30;\n  ratio := 0.7531;\n  WriteLn('姓名: ', name:10, '|');\n  WriteLn('年龄: ', age:5);\n  WriteLn('比率: ', ratio:8:3);\n  WriteLn(Format('我叫%s，今年%d岁，完成率%.1f%%', [name, age, ratio * 100]));\n  WriteLn(Format('解析 \"%s\" -> %d', ['42', StrToIntDef('42', 0)]));\nend.",
    "et": "❌ 常见错误",
    "ec": "对整数使用 x:0:2 的精度格式会报错，宽度和精度只对浮点有效；Format 中占位符数量与参数数组不一致会抛 EConvertError。",
    "q": [
      {
        "q": "实数 ratio:8:3 表示什么？",
        "a": "总宽 8、保留 3 位小数"
      },
      {
        "q": "转换失败时返回默认值的函数是哪个？",
        "a": "StrToIntDef"
      }
    ]
  },
  {
    "id": 17,
    "t": "动态数据结构：指针与链表",
    "p": [
      "指针类型声明为 ^TNode，New 分配内存、Dispose 释放，nil 表示空指针",
      "访问指针指向记录的字段用 ^.，例如 Node^.Value；判空后才能解引用",
      "链表节点包含数据和 Next 指针，头插法只需修改新节点的 Next 和头指针",
      "遍历链表时先保存 Next 再处理当前节点，删除节点时尤其要注意顺序"
    ],
    "c": "program LinkedList;\n\n{$mode objfpc}{$H+}\n\ntype\n  PNode = ^TNode;\n  TNode = record\n    Value: Integer;\n    Next: PNode;\n  end;\n\nvar\n  Head: PNode;\n\nprocedure Prepend(var H: PNode; V: Integer);\nvar Item: PNode;\nbegin\n  New(Item);\n  Item^.Value := V; Item^.Next := H; H := Item;\nend;\n\nbegin\n  Head := nil; Prepend(Head, 1); Prepend(Head, 2);\n  while Head <> nil do\n  begin\n    Write(Head^.Value, ' ');\n    Head := Head^.Next;\n  end;\n  WriteLn;\nend.",
    "et": "❌ 常见错误",
    "ec": "指针未 New 就通过 ^.Value 赋值会触发访问违例；Dispose 后继续访问是悬空指针，删除节点时必须先保存 Next 再释放当前节点。",
    "q": [
      {
        "q": "Pascal 中分配动态内存用哪个过程？",
        "a": "New"
      },
      {
        "q": "空指针常量是什么？",
        "a": "nil"
      }
    ]
  },
  {
    "id": 18,
    "t": "日期与时间",
    "p": [
      "TDateTime 是以天为单位的浮点数，整数部分表示日期，小数部分表示当天时间",
      "Now 返回当前日期时间，Date 返回日期，Time 返回时间，三者都是 TDateTime",
      "FormatDateTime 按格式串输出，yyyy 年、mm 月、dd 日、hh 时、nn 分、ss 秒",
      "DateUtils 提供 IncDay、DaysBetween、MilliSecondsBetween 等跨日期计算函数"
    ],
    "c": "program DateTimeDemo;\n\n{$mode objfpc}{$H+}\nuses SysUtils, DateUtils;\n\nvar\n  nowTime: TDateTime;\nbegin\n  nowTime := Now;\n  WriteLn('当前时间：', FormatDateTime('yyyy-mm-dd hh:nn:ss', nowTime));\n  WriteLn('日期部分：', DateToStr(nowTime));\n  WriteLn('时间部分：', TimeToStr(nowTime));\n  WriteLn('30 天后：', FormatDateTime('yyyy-mm-dd', IncDay(nowTime, 30)));\n  WriteLn('时间戳：', DateTimeToUnix(nowTime, False));\nend.",
    "et": "❌ 常见错误",
    "ec": "把 TDateTime 当成整数时间戳直接相减；它是以天为单位的浮点数，跨时区和夏令时计算应使用 DateUtils 的函数而不是硬编码 24 小时。",
    "q": [
      {
        "q": "TDateTime 的整数部分表示什么？",
        "a": "日期"
      },
      {
        "q": "格式化日期时间用哪个函数？",
        "a": "FormatDateTime"
      }
    ]
  },
  {
    "id": 19,
    "t": "字符与编码",
    "p": [
      "Char 表示一个字符，Ord 返回其序号，Chr 把序号转回字符，'A' 的 ASCII 码是 65",
      "UpCase/LowerCase 只对 ASCII 字母生效，中文等多字节字符不会被转换",
      "string 在 FPC 中默认是 AnsiString，Length 返回字节数；UTF-8 下一个汉字通常占 3 字节",
      "按字节遍历 UTF-8 字符串可以还原原始字节，要按字符计数需使用 UTF8Length 等 Lazarus 工具"
    ],
    "c": "program CharsDemo;\n\n{$mode objfpc}{$H+}\nuses SysUtils;\n\nvar\n  ch: Char;\n  s: string;\n  i: Integer;\nbegin\n  ch := 'A';\n  WriteLn('Ord=', Ord(ch), ' Chr=', Chr(97));\n  WriteLn('UpCase=', UpCase(ch));\n\n  s := '你好，Pascal';\n  WriteLn('字节长度=', Length(s));\n  for i := 1 to Length(s) do\n    Write(s[i]);\n  WriteLn;\n  WriteLn('首字节=', Ord(s[1]));\nend.",
    "et": "❌ 常见错误",
    "ec": "用 Length 判断中文字符数，UTF-8 下一个汉字占 3 字节，Length 返回的是字节数；对含中文的字符串调用 UpCase 不会转换非 ASCII 字符。",
    "q": [
      {
        "q": "字符 'A' 的 ASCII 码是多少？",
        "a": "65"
      },
      {
        "q": "UTF-8 中一个常用汉字通常占几字节？",
        "a": "3 字节"
      }
    ]
  },
  {
    "id": 20,
    "t": "模块、库与包管理",
    "p": [
      "uses 子句引入单元，多个单元用逗号分隔；单元必须在程序或单元声明之后引入",
      "RTL 提供 SysUtils、Classes、Math、StrUtils 等基础单元，FCL 提供数据库、网络和文件工具",
      "LCL 是 Lazarus 组件库，用于跨平台图形界面；第三方组件通过 Lazarus OPM 安装",
      "fppkg 管理 Free Pascal 包，可安装、列出和更新依赖，包通常提供源码与编译配置"
    ],
    "c": "program Libraries;\n\n{$mode objfpc}{$H+}\nuses SysUtils, Math, Classes;\n\nvar\n  list: TStringList;\nbegin\n  WriteLn('2^10 = ', Power(2, 10):0:0);\n  WriteLn('sqrt(2) = ', Sqrt(2):0:4);\n  list := TStringList.Create;\n  try\n    list.Add('Pascal');\n    list.Add('Delphi');\n    list.Add('Lazarus');\n    list.Sort;\n    WriteLn('排序后：', list.CommaText);\n  finally\n    list.Free;\n  end;\nend.",
    "et": "❌ 常见错误",
    "ec": "uses 子句位置错误，放在 begin 之后或 const 之前都会编译失败；用 Create 创建的对象忘记 Free 会造成内存泄漏，应使用 try/finally。",
    "q": [
      {
        "q": "引入单元使用哪个关键字？",
        "a": "uses"
      },
      {
        "q": "哪个单元提供 Power 和 Sqrt？",
        "a": "Math"
      }
    ]
  },
  {
    "id": 21,
    "t": "标准库速查与工具链",
    "p": [
      "RTL 常用单元：System 基础类型、SysUtils 字符串与异常、Classes 容器与流、Math 数学函数",
      "包管理与依赖：fppkg install 包名，Lazarus 组件通过 OPM 安装，项目依赖记录在 .lpi/.lpk",
      "测试用 fpcunit，格式化用 JEDI Code Format，调试用 gdb 或 fpdebug，构建用 fpc 与 lazbuild",
      "编译运行：fpc -O2 -g app.pas 生成 app，直接 ./app 运行；Lazarus 项目用 lazbuild 构建"
    ],
    "c": "program ToolchainCheatSheet;\n\n{$mode objfpc}{$H+}\nuses SysUtils, Classes;\n{ 编译：fpc -O2 -g hello.pas\n  依赖：fppkg install <包名>，或使用 Lazarus 的 OPM\n  测试：fpcunit（testregistry + testrunner）\n  格式化：JEDI Code Format（jcf）\n  调试：gdb ./hello 或 fpdebug / Lazarus 调试器 }\n\nvar\n  list: TStringList;\nbegin\n  list := TStringList.Create;\n  try\n    list.CommaText := 'delta,alpha,charlie';\n    list.Sort;\n    WriteLn('排序结果：', list.CommaText);\n  finally\n    list.Free;\n  end;\nend.",
    "et": "❌ 常见错误",
    "ec": "把 fppkg 与 Lazarus OPM 混淆：fppkg 管理 FPC 包，OPM 管理 Lazarus 组件包，安装路径不同，混用会导致找不到单元。",
    "q": [
      {
        "q": "FPC 的包管理工具是什么？",
        "a": "fppkg"
      },
      {
        "q": "哪个工具用于构建 Lazarus 项目？",
        "a": "lazbuild"
      }
    ]
  },
  {
    "id": 22,
    "t": "并发与并行",
    "p": [
      "TThread 封装操作系统线程，重写 Execute 方法定义线程体，Create(False) 表示立即启动",
      "WaitFor 等待线程结束，Free 释放线程对象；线程对象不能在其内部直接 Free",
      "Synchronize 把代码切回主线程执行，适合更新界面；共享数据用 TCriticalSection 保护",
      "多线程下避免直接操作可视组件，字符串和对象引用也要注意生命周期与竞争"
    ],
    "c": "program ThreadsDemo;\n\n{$mode objfpc}{$H+}\nuses {$IFDEF UNIX}cthreads,{$ENDIF} Classes, SysUtils;\n\ntype\n  TWorker = class(TThread)\n  protected\n    procedure Execute; override;\n  end;\n\nvar\n  w: TWorker;\n\nprocedure TWorker.Execute;\nvar\n  i: Integer;\nbegin\n  for i := 1 to 5 do\n  begin\n    WriteLn('线程 ', ThreadID, ' 计数 ', i);\n    Sleep(50);\n  end;\nend;\n\nbegin\n  w := TWorker.Create(False);\n  w.WaitFor; w.Free;\n  WriteLn('主线程结束');\nend.",
    "et": "❌ 常见错误",
    "ec": "子线程直接更新界面或共享变量而不加锁，会导致竞态与崩溃；应使用 Synchronize 回到主线程，或用 TCriticalSection 保护共享数据。",
    "q": [
      {
        "q": "TThread 的线程体写在哪个方法中？",
        "a": "Execute"
      },
      {
        "q": "等待线程结束用哪个方法？",
        "a": "WaitFor"
      }
    ]
  },
  {
    "id": 23,
    "t": "性能优化",
    "p": [
      "编译时使用 -O2 或 -O3 开启优化，-Xs 去除符号信息，发布版关闭调试信息",
      "把循环不变量移到循环外，避免在热路径中重复分配对象和拼接字符串",
      "大记录参数使用 const 或 var 传递，避免按值复制；动态数组预分配 SetLength",
      "先用 MilliSecondsBetween、GetTickCount64 或 perf 测量热点，再针对性优化"
    ],
    "c": "program Performance;\n\n{$mode objfpc}{$H+}\nuses SysUtils, DateUtils;\n\nconst\n  N = 5000000;\n\nvar\n  i: Integer;\n  sum: Int64;\n  start: TDateTime;\nbegin\n  start := Now;\n  sum := 0;\n  for i := 1 to N do\n    sum := sum + i;\n  WriteLn('sum=', sum);\n  WriteLn('耗时(ms)=', MilliSecondsBetween(Now, start));\n  WriteLn('提示：使用 fpc -O2 -Xs 编译，并用 -pg 或 perf 采样分析');\nend.",
    "et": "❌ 常见错误",
    "ec": "在循环中反复创建对象或拼接字符串，产生大量堆分配；应把不变的操作移出循环并预先分配容量，再用测量工具确认瓶颈。",
    "q": [
      {
        "q": "FPC 常用的优化选项是什么？",
        "a": "-O2"
      },
      {
        "q": "优化前应该先做什么？",
        "a": "测量并定位性能热点"
      }
    ]
  },
  {
    "id": 24,
    "t": "测试",
    "p": [
      "fpcunit 是 FPC 的单元测试框架，测试类继承 TTestCase，注册到 TTestRegistry 后运行",
      "断言检查实际值与期望值，失败时抛出异常并记录用例名，便于定位问题",
      "测试覆盖正常值、边界值和非法输入，例如空串、0、负数、最大值和格式错误",
      "测试代码与产品代码分开，使用 lazbuild 或 make test 在 CI 中自动执行"
    ],
    "c": "program Tests;\n\n{$mode objfpc}{$H+}\nuses SysUtils;\n\nfunction Add(a, b: Integer): Integer;\nbegin\n  Result := a + b;\nend;\n\nprocedure CheckEquals(Expected, Actual: Integer; const Name: string);\nbegin\n  if Expected <> Actual then\n    raise Exception.CreateFmt('%s 失败：期望 %d，实际 %d', [Name, Expected, Actual]);\n  WriteLn('通过：', Name);\nend;\n\nbegin\n  CheckEquals(4, Add(2, 2), 'Add(2,2)');\n  CheckEquals(0, Add(-1, 1), 'Add(-1,1)');\n  WriteLn('全部测试通过');\nend.",
    "et": "❌ 常见错误",
    "ec": "只测试正常路径，不测 0、负数和溢出边界；测试依赖当前时间或随机数，导致结果不可重复，难以判断失败原因。",
    "q": [
      {
        "q": "FPC 常用的单元测试框架是什么？",
        "a": "fpcunit"
      },
      {
        "q": "测试应重点覆盖哪些输入？",
        "a": "正常值、边界值和非法输入"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧",
    "p": [
      "编译时加 -g 保留调试信息，用 gdb ./app 设置断点、单步、查看变量和调用栈",
      "Lazarus 提供图形化调试器 fpdebug，可断点、监视表达式和查看调用栈",
      "用 {$IFDEF DEBUG} 条件编译日志代码，发布版通过 -dRELEASE 关闭调试输出",
      "异常调试可在 except 块打印 E.ClassName 与 E.Message，再用 raise 重新抛出"
    ],
    "c": "program DebugDemo;\n\n{$mode objfpc}{$H+}\n{$IFDEF DEBUG}\n  {$DEFINE LOG}\n{$ENDIF}\nuses SysUtils;\n\nprocedure Log(const Msg: string);\nbegin\n{$IFDEF LOG}\n  WriteLn('[LOG] ', Msg);\n{$ENDIF}\nend;\n\nfunction Average(a, b: Integer): Double;\nbegin\n  Log(Format('Average(%d,%d)', [a, b]));\n  Result := (a + b) / 2;\nend;\n\nbegin\n  WriteLn(Average(3, 4):0:2);\n  WriteLn('调试：fpc -dDEBUG -g debug.pas，再运行 gdb ./debug');\nend.",
    "et": "❌ 常见错误",
    "ec": "调试输出散落在各处且没有编译开关，发布版会泄露内部信息；调试版本忘记加 -g，gdb 中看不到行号和变量名。",
    "q": [
      {
        "q": "哪个编译选项生成调试信息？",
        "a": "-g"
      },
      {
        "q": "如何定义 DEBUG 条件符号？",
        "a": "fpc -dDEBUG"
      }
    ]
  },
  {
    "id": 26,
    "t": "与系统及外部接口互操作",
    "p": [
      "RunCommand 执行外部程序并捕获输出，ExecuteProcess 可控制参数、工作目录和等待行为",
      "GetEnvironmentVariable 读取环境变量，GetEnvironmentVariableCount 可枚举所有变量",
      "调用动态库需声明 external 函数并指定库名，跨平台时要处理不同库扩展名",
      "传参时避免把未校验的用户输入拼进命令行，防止命令注入和参数注入"
    ],
    "c": "program Interop;\n\n{$mode objfpc}{$H+}\nuses SysUtils, Process;\n\nvar\n  out: string;\nbegin\n  if RunCommand('/bin/echo', ['来自 Pascal 的问候'], out) then\n    Write('外部命令输出：', out)\n  else\n    WriteLn('命令执行失败');\n  WriteLn('环境变量 HOME=', GetEnvironmentVariable('HOME'));\nend.",
    "et": "❌ 常见错误",
    "ec": "把用户输入直接拼进命令行造成命令注入；RunCommand 会等待命令结束并捕获输出，执行交互式程序会卡住，应改用 ExecuteProcess 并处理超时。",
    "q": [
      {
        "q": "哪个函数执行外部命令并捕获输出？",
        "a": "RunCommand"
      },
      {
        "q": "读取环境变量用哪个函数？",
        "a": "GetEnvironmentVariable"
      }
    ]
  },
  {
    "id": 27,
    "t": "设计模式与程序组织",
    "p": [
      "类通过 class 声明，支持继承、封装和多态；字段放在 private，方法按职责分组",
      "虚方法用 virtual 声明，子类用 override 重写，abstract 方法强制子类实现",
      "多态让调用方只依赖基类接口，新增子类无需修改调用代码，适合策略与工厂模式",
      "单元按职责拆分，接口暴露最小 API，实现细节放在 implementation 段"
    ],
    "c": "program Shapes;\n\n{$mode objfpc}{$H+}\nuses Math;\n\ntype\n  TShape = class\n    function Area: Double; virtual; abstract;\n  end;\n\n  TCircle = class(TShape)\n    Radius: Double;\n    function Area: Double; override;\n  end;\n\nvar\n  S: TShape;\n\nfunction TCircle.Area: Double;\nbegin\n  Result := Pi * Radius * Radius;\nend;\n\nbegin\n  S := TCircle.Create;\n  TCircle(S).Radius := 2;\n  WriteLn('圆面积=', S.Area:0:2);\n  S.Free;\nend.",
    "et": "❌ 常见错误",
    "ec": "子类重写虚方法时漏写 override 会隐藏父类方法而非多态；把字段声明为 public 会破坏封装，调用方可随意修改内部状态。",
    "q": [
      {
        "q": "子类重写虚方法使用哪个关键字？",
        "a": "override"
      },
      {
        "q": "抽象方法在哪个关键字后声明？",
        "a": "abstract"
      }
    ]
  },
  {
    "id": 28,
    "t": "数据库访问",
    "p": [
      "SQLDB 是 FPC 的通用数据库框架，TSQLite3Connection、TMySQLConnection 等提供具体驱动",
      "连接需要设置 DatabaseName、Transaction，查询用 TSQLQuery 的 SQL.Text 与 Open/ExecSQL",
      "参数化查询用 :name 占位并通过 Params.ParamByName 绑定，避免 SQL 注入",
      "写操作放在事务中，成功后 Commit、失败时 Rollback，最后释放 Query、Transaction 和连接"
    ],
    "c": "program DatabaseDemo;\n\n{$mode objfpc}{$H+}\nuses sqldb, sqlite3conn;\n\nvar\n  Conn: TSQLite3Connection;\n  Tx: TSQLTransaction;\n  Q: TSQLQuery;\nbegin\n  Conn := TSQLite3Connection.Create(nil);\n  Conn.DatabaseName := ':memory:';\n  Tx := TSQLTransaction.Create(nil);\n  Tx.DataBase := Conn; Conn.Transaction := Tx;\n  Q := TSQLQuery.Create(nil);\n  Q.DataBase := Conn; Q.Transaction := Tx;\n  Q.SQL.Text := 'CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT)';\n  Q.ExecSQL;\n  Q.SQL.Text := 'INSERT INTO users(name) VALUES (:name)';\n  Q.Params.ParamByName('name').AsString := 'Alice';\n  Q.ExecSQL;\n  Tx.Commit;\n  Q.SQL.Text := 'SELECT COUNT(*) AS n FROM users';\n  Q.Open;\n  WriteLn('用户数=', Q.FieldByName('n').AsInteger);\n  Q.Free; Tx.Free; Conn.Free;\nend.",
    "et": "❌ 常见错误",
    "ec": "用字符串拼接 SQL 造成注入；忘记设置 Transaction 或在写操作后不 Commit，数据不会保存；不释放 Query 和连接会造成句柄泄漏。",
    "q": [
      {
        "q": "SQLDB 中执行查询用哪个方法？",
        "a": "Open"
      },
      {
        "q": "参数化查询的占位符怎么写？",
        "a": ":name"
      }
    ]
  },
  {
    "id": 29,
    "t": "网络编程与 HTTP",
    "p": [
      "fphttpclient 提供 TFPHTTPClient，可直接 Get/Post 并读取响应正文和状态码",
      "HTTP 请求返回状态码，2xx 表示成功，4xx 客户端错误，5xx 服务端错误，应显式判断",
      "HTTPS 依赖 OpenSSL 动态库，缺少时请求会抛异常；可设置 ConnectTimeout 防止长时间阻塞",
      "复杂场景可用 fphttpserver 编写服务端，或使用 Synapse、Indy 等第三方网络库"
    ],
    "c": "program HttpDemo;\n\n{$mode objfpc}{$H+}\nuses fphttpclient;\n\nvar\n  body: string;\n  client: TFPHTTPClient;\nbegin\n  client := TFPHTTPClient.Create(nil);\n  try\n    body := client.Get('https://example.com');\n    WriteLn('状态码=', client.ResponseStatusCode);\n    WriteLn('响应长度=', Length(body));\n    WriteLn('前 80 字节：', Copy(body, 1, 80));\n  finally\n    client.Free;\n  end;\nend.",
    "et": "❌ 常见错误",
    "ec": "不检查状态码就把错误页当成功结果；HTTPS 缺少 OpenSSL 库会抛异常；网络请求未设置超时，服务器无响应时程序会长时间阻塞。",
    "q": [
      {
        "q": "TFPHTTPClient 获取网页用哪个方法？",
        "a": "Get"
      },
      {
        "q": "响应状态码保存在哪个属性？",
        "a": "ResponseStatusCode"
      }
    ]
  },
  {
    "id": 30,
    "t": "安全编程",
    "p": [
      "所有外部输入都要校验类型、长度、范围和格式，失败立即拒绝，不要继续使用脏数据",
      "字符串转整数用 TryStrToInt 或 StrToIntDef，避免异常导致程序中断",
      "数据库访问使用参数绑定，不拼接 SQL；文件路径要防止 ../ 目录穿越",
      "开启 {$R+} 和 {$Q+} 检查数组越界与整数溢出，发布前用测试覆盖恶意输入"
    ],
    "c": "program Security;\n\n{$mode objfpc}{$H+}\nuses SysUtils;\n\nfunction SafeAge(const Input: string): Integer;\nbegin\n  if not TryStrToInt(Input, Result) then\n    raise Exception.Create('年龄必须是整数');\n  if (Result < 0) or (Result > 150) then\n    raise Exception.Create('年龄超出范围');\nend;\n\nbegin\n  try\n    WriteLn('年龄=', SafeAge('42'));\n    WriteLn(SafeAge('abc'));\n  except\n    on E: Exception do\n      WriteLn('拒绝输入：', E.Message);\n  end;\nend.",
    "et": "❌ 常见错误",
    "ec": "直接信任 ReadLn 得到的字符串，用 Val 却不检查 Code，转换失败后使用未定义值；把输入拼进 SQL 会有注入风险，应使用参数绑定。",
    "q": [
      {
        "q": "转换整数且不抛异常的函数是哪个？",
        "a": "TryStrToInt 或 StrToIntDef"
      },
      {
        "q": "防止 SQL 注入的最佳做法是什么？",
        "a": "使用参数化查询绑定参数"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战：命令行工具",
    "p": [
      "ParamCount 返回参数个数，ParamStr(i) 返回第 i 个参数，ParamStr(0) 是程序路径",
      "先校验参数个数，缺参数时把用法写到标准错误并 Halt(1) 返回非零退出码",
      "TStringList.LoadFromFile 读取文本，WordCount 配合分隔符统计单词数",
      "文件不存在或无法读取会抛异常，应捕获并给出友好提示，而不是直接崩溃"
    ],
    "c": "program WordCountTool;\n\n{$mode objfpc}{$H+}\nuses SysUtils, Classes, StrUtils;\n\nvar\n  lines: TStringList;\n  i, words: Integer;\nbegin\n  if ParamCount < 1 then\n  begin\n    WriteLn(ErrOutput, '用法：', ParamStr(0), ' <文件>');\n    Halt(1);\n  end;\n  lines := TStringList.Create;\n  try\n    lines.LoadFromFile(ParamStr(1));\n    words := 0;\n    for i := 0 to lines.Count - 1 do\n      words := words + WordCount(lines[i], [' ', #9]);\n    WriteLn('行数=', lines.Count, ' 单词数=', words);\n  finally\n    lines.Free;\n  end;\nend.",
    "et": "❌ 常见错误",
    "ec": "不检查 ParamCount 就直接访问 ParamStr(1)，会得到空串并导致文件打开失败；错误信息写到标准输出且退出码为 0，脚本无法判断失败。",
    "q": [
      {
        "q": "哪个函数返回命令行参数个数？",
        "a": "ParamCount"
      },
      {
        "q": "错误信息应输出到哪个流？",
        "a": "ErrOutput（标准错误）"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战：数据处理",
    "p": [
      "用 TStringList 按行加载 CSV，设置 Delimiter 和 DelimitedText 拆分字段",
      "数值转换使用 StrToFloat 或 TryStrToFloat，空行和格式错误要跳过并计数",
      "聚合时用 Double 累加，除以记录数前判断非零，输出统一保留小数位",
      "数据量大时应流式读取或分批处理，避免把所有行和中间结果同时保存在内存"
    ],
    "c": "program CsvStats;\n\n{$mode objfpc}{$H+}\nuses SysUtils, Classes;\n\nvar\n  data: TStringList;\n  parts: TStringList;\n  i: Integer;\n  sum, value: Double;\nbegin\n  data := TStringList.Create; parts := TStringList.Create;\n  try\n    data.Text := 'name,score' + LineEnding + 'Alice,88.5' + LineEnding +\n                 'Bob,92' + LineEnding + 'Cara,79.5';\n    sum := 0;\n    for i := 1 to data.Count - 1 do\n    begin\n      parts.Delimiter := ','; parts.DelimitedText := data[i];\n      value := StrToFloat(parts[1]);\n      sum := sum + value;\n    end;\n    WriteLn('记录数=', data.Count - 1, ' 平均分=', sum / (data.Count - 1):0:2);\n  finally\n    parts.Free; data.Free;\n  end;\nend.",
    "et": "❌ 常见错误",
    "ec": "按逗号切分时未考虑字段内含逗号或空行，导致下标越界；StrToFloat 受系统区域小数点设置影响，跨环境应使用 InvariantFormatSettings。",
    "q": [
      {
        "q": "TStringList 拆分字段依赖哪两个属性？",
        "a": "Delimiter 和 DelimitedText"
      },
      {
        "q": "浮点转换失败时可用哪个安全函数？",
        "a": "TryStrToFloat"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建、部署与发布",
    "p": [
      "发布构建使用 fpc -O2 -Xs -dRELEASE，生成体积更小、无调试符号的可执行文件",
      "Lazarus 项目用 lazbuild --build-mode=Release project.lpi 构建，构建模式在项目选项中配置",
      "交叉编译需安装目标平台 units，并用 -T 指定目标系统、-P 指定目标 CPU",
      "发布包应包含可执行文件、所需动态库、配置文件和 README，并在干净环境验证"
    ],
    "c": "program BuildInfo;\n\n{$mode objfpc}{$H+}\n{$IFDEF RELEASE}\nconst\n  BuildMode = 'release';\n{$ELSE}\nconst\n  BuildMode = 'debug';\n{$ENDIF}\n\nbegin\n  WriteLn('构建模式：', BuildMode);\n  WriteLn('编译：fpc -O2 -Xs -dRELEASE app.pas');\n  WriteLn('Lazarus：lazbuild --build-mode=Release project.lpi');\n  WriteLn('发布：strip app，并附带所需 .so 与配置文件');\nend.",
    "et": "❌ 常见错误",
    "ec": "发布时使用默认调试构建，体积大且包含符号与内部路径；交叉编译前未安装目标平台 units，会报找不到 System 单元。",
    "q": [
      {
        "q": "哪个选项去除调试符号？",
        "a": "-Xs"
      },
      {
        "q": "构建 Lazarus 项目用哪个命令？",
        "a": "lazbuild"
      }
    ]
  },
  {
    "id": 34,
    "t": "最佳实践与代码风格",
    "p": [
      "命名清晰：类型用 T 前缀、字段用 F 前缀、常量全大写，过程和函数用动词开头",
      "大记录和数组参数使用 const 避免复制，需要修改时用 var，输出参数用 out",
      "开发期开启 {$R+}{$Q+} 和 -Cr -Co 检查越界与溢出，发布版再按需关闭",
      "每个单元职责单一，接口最小化，异常和资源释放路径统一，提交前运行格式化工具"
    ],
    "c": "program BestPractices;\n\n{$mode objfpc}{$H+}\n{$R+}\nuses SysUtils;\n\ntype\n  TUser = record\n    Name: string;\n    Age: Integer;\n  end;\n\nvar\n  U: TUser;\n\nfunction Describe(const User: TUser): string;\nbegin\n  Result := Format('%s(%d)', [User.Name, User.Age]);\nend;\n\nbegin\n  U.Name := 'Alice';\n  U.Age := 30;\n  WriteLn(Describe(U));\nend.",
    "et": "❌ 常见错误",
    "ec": "关闭范围检查后数组越界和整数溢出会静默发生；大记录按值传递造成复制开销，应改用 const 引用，既安全又高效。",
    "q": [
      {
        "q": "Pascal 类型名常用的前缀是什么？",
        "a": "T"
      },
      {
        "q": "哪个编译指令开启范围检查？",
        "a": "{$R+}"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "基础阶段掌握语法、类型、流程控制、过程与函数、数组和记录，能写结构化小程序",
      "进阶阶段学习类与对象、异常、泛型容器、单元化和文件数据库操作，理解 RTL 常用单元",
      "工程阶段掌握 fpcunit 测试、fppkg/OPM 依赖管理、Lazarus 界面开发和调试工具",
      "实战方向包括命令行工具、数据处理、桌面应用、跨平台发布和阅读 FPC/Lazarus 源码"
    ],
    "c": "program Roadmap;\n\n{$mode objfpc}{$H+}\n\nprocedure Step(const Name, Detail: string);\nbegin\n  WriteLn('• ', Name, '：', Detail);\nend;\n\nbegin\n  WriteLn('Free Pascal 学习路线');\n  Step('基础', '语法、类型、流程控制、过程与函数');\n  Step('进阶', '记录、类、泛型、异常、单元');\n  Step('工程', 'fpcunit 测试、fppkg、Lazarus 界面');\n  Step('实战', 'CLI 工具、文件处理、数据库与网络');\n  Step('深入', 'RTL 源码、跨平台编译、性能分析');\nend.",
    "et": "❌ 常见错误",
    "ec": "只停留在语法层面，不熟悉单元、异常和调试工具，遇到真实项目就无从下手；应通过完整小项目把知识点串起来。",
    "q": [
      {
        "q": "Pascal 进阶阶段应重点学习什么？",
        "a": "类与对象、异常、泛型容器和单元化"
      },
      {
        "q": "哪个框架用于 Pascal 单元测试？",
        "a": "fpcunit"
      }
    ]
  }
];
