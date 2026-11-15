window.TUTORIAL_DATA_c = [
  {
    "id": 1,
    "t": "C 语言简介与历史",
    "p": [
      "C 语言由 Dennis Ritchie 于 1972 年在贝尔实验室设计，最初用于重写 UNIX 操作系统",
      "标准化历程：1978 年 K&R 版、1989 年 ANSI C（C89）、1999 年 C99、2011 年 C11",
      "C 是静态类型、编译型语言，贴近硬件且可移植，常被称为系统编程的通用汇编语言",
      "典型应用：操作系统内核、嵌入式固件、数据库、编译器和高性能基础库"
    ],
    "c": "#include <stdio.h>\n\nint main(void) {\n    printf(\"Hello, C11!\\n\");\n    printf(\"C 语言由 Dennis Ritchie 于 1972 年在贝尔实验室设计。\\n\");\n    printf(\"1978 年 K&R 版，1989 年 ANSI C，2011 年发布 C11。\\n\");\n    printf(\"它贴近硬件、可移植，是系统编程的主力语言。\\n\");\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "把 C 当成 C++ 来写：使用 class、cout、引用或异常会直接编译失败。C 没有类、命名空间和异常机制，源文件应为 .c 并用 gcc 而不是 g++ 编译。",
    "q": [
      {
        "q": "C 语言最初是为哪个项目设计的？",
        "a": "贝尔实验室的 UNIX 操作系统"
      },
      {
        "q": "C11 是哪一年发布的标准？",
        "a": "2011 年"
      }
    ]
  },
  {
    "id": 2,
    "t": "安装与工具链环境",
    "p": [
      "主流编译器：GCC 与 Clang；Windows 可用 MinGW-w64 或 MSVC，macOS 自带 clang",
      "常用编译选项：-std=c11 指定标准，-Wall -Wextra 开警告，-g 生成调试信息，-O2 优化",
      "构建工具：小项目用 Makefile，跨平台项目用 CMake 生成构建文件，依赖查询用 pkg-config",
      "调试与检查：gdb 单步调试，valgrind 检查内存泄漏和越界，clang-format 统一代码风格"
    ],
    "c": "#include <stdio.h>\n\nint main(void) {\n#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201112L\n    printf(\"编译器支持 C11，__STDC_VERSION__ = %ldL\\n\", __STDC_VERSION__);\n#else\n    printf(\"当前不是 C11 模式，请加 -std=c11\\n\");\n#endif\n    printf(\"编译：gcc -std=c11 -Wall -Wextra -g hello.c -o hello\\n\");\n    printf(\"运行：./hello\\n\");\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "忘记加 -std=c11，编译器可能沿用旧标准，_Static_assert、匿名结构体等特性不可用；只运行 gcc hello.c 还会关闭大部分警告，应同时加上 -Wall -Wextra。",
    "q": [
      {
        "q": "指定 C11 标准的编译选项是什么？",
        "a": "-std=c11"
      },
      {
        "q": "哪个工具用于检测内存泄漏？",
        "a": "valgrind"
      }
    ]
  },
  {
    "id": 3,
    "t": "变量、常量与命名",
    "p": [
      "标识符由字母、数字和下划线组成，不能以数字开头，区分大小写，习惯使用 snake_case",
      "变量声明必须给出类型，C11 允许在块内任意位置声明；局部变量不会自动初始化",
      "const 修饰只读变量，编译期不能修改，但可通过指针绕过，函数参数加 const 表示不修改",
      "常量推荐用宏 #define 或 enum 表示编译期值，const int 在 C 中默认不是常量表达式"
    ],
    "c": "#include <stdio.h>\n\nint main(void) {\n    int age = 30;\n    double price = 19.9;\n    const int MAX_USERS = 100;\n    unsigned int count = 0;\n    char grade = 'A';\n\n    count = count + 1;\n    printf(\"age=%d price=%.1f max=%d count=%u grade=%c\\n\",\n           age, price, MAX_USERS, count, grade);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "使用未初始化的局部变量，其值是栈上的随机垃圾，输出和判断都不可预测；另外在 C 中 const int 默认不是常量表达式，不能用它直接声明数组长度。",
    "q": [
      {
        "q": "C 语言中变量名区分大小写吗？",
        "a": "区分，age 与 Age 是两个不同变量"
      },
      {
        "q": "哪一种写法表示编译期常量？",
        "a": "#define MAX 100 或 enum { MAX = 100 }"
      }
    ]
  },
  {
    "id": 4,
    "t": "数据类型",
    "p": [
      "基本类型：char、short、int、long、long long、float、double 和 _Bool，长度依平台而定",
      "stdint.h 提供 int8_t、uint32_t、int64_t 等定宽类型，跨平台二进制协议应优先使用",
      "sizeof 返回字节数，类型为 size_t，printf 用 %zu 输出；sizeof 是编译期运算符",
      "有符号与无符号混合运算会隐式转为无符号，负数可能变成巨大正数，应显式强制转换"
    ],
    "c": "#include <stdio.h>\n#include <limits.h>\n#include <float.h>\n\nint main(void) {\n    printf(\"char: %zu 字节, 范围 %d..%d\\n\", sizeof(char), CHAR_MIN, CHAR_MAX);\n    printf(\"int: %zu 字节, 范围 %d..%d\\n\", sizeof(int), INT_MIN, INT_MAX);\n    printf(\"long: %zu 字节\\n\", sizeof(long));\n    printf(\"double: %zu 字节, 最大 %g\\n\", sizeof(double), DBL_MAX);\n    printf(\"_Bool: %zu 字节\\n\", sizeof(_Bool));\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "误以为 long 一定是 8 字节：Windows 64 位下 long 仍是 4 字节，跨平台应使用 int64_t；printf 输出 size_t 要用 %zu，用 %d 会因类型不匹配产生未定义行为。",
    "q": [
      {
        "q": "哪个头文件提供 int32_t 这类定宽整数？",
        "a": "stdint.h"
      },
      {
        "q": "sizeof 运算符的结果类型是什么？",
        "a": "size_t"
      }
    ]
  },
  {
    "id": 5,
    "t": "运算符与表达式",
    "p": [
      "优先级：括号 > 一元 > 乘除模 > 加减 > 移位 > 关系 > 相等 > 位与异或或 > 逻辑 > 条件 > 赋值",
      "整数除法向零截断，7/2 得 3；求浮点结果需把至少一个操作数转成 double",
      "逻辑运算符 && 和 || 具有短路求值，左侧确定结果时右侧不会执行，可用于空指针保护",
      "位运算 & | ^ ~ << >> 只应对无符号整数使用，有符号溢出和非法移位属于未定义行为"
    ],
    "c": "#include <stdio.h>\n\nint main(void) {\n    int a = 7, b = 2;\n    printf(\"7/2=%d 7%%2=%d\\n\", a / b, a % b);\n    printf(\"(double)a/b=%.2f\\n\", (double)a / b);\n    printf(\"a<<1=%d a&1=%d a^b=%d\\n\", a << 1, a & 1, a ^ b);\n    int max = (a > b) ? a : b;\n    printf(\"max=%d\\n\", max);\n    int x = 1;\n    x += 4;\n    x *= 2;\n    printf(\"x=%d\\n\", x);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "用 / 做整数除法得到 3 而不是 3.5，忘记把操作数转成 double；有符号整数左移或溢出属于未定义行为，位运算应使用 unsigned 类型。",
    "q": [
      {
        "q": "表达式 7 / 2 在 C 中的结果是多少？",
        "a": "3，整数除法向零截断"
      },
      {
        "q": "&& 运算符有什么求值特性？",
        "a": "短路求值，左侧为假时不计算右侧"
      }
    ]
  },
  {
    "id": 6,
    "t": "字符串处理",
    "p": [
      "C 没有原生字符串类型，字符串是以 '\\0' 结尾的 char 数组，长度不包括结尾空字符",
      "strlen 求长度，strcmp 按字典序比较并返回负、零或正数，不能用 == 比较内容",
      "strcpy/strcat 不检查目标容量，易溢出；应使用 snprintf 或 strncpy 并手动补 '\\0'",
      "strchr/strstr 查找字符或子串，返回指针；string.h 的函数要求字符串以 '\\0' 结尾"
    ],
    "c": "#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char name[32] = \"C Language\";\n    char copy[32];\n    strcpy(copy, name);\n    strcat(copy, \" 11\");\n    printf(\"长度=%zu 内容=%s\\n\", strlen(copy), copy);\n    if (strcmp(name, \"C Language\") == 0) {\n        printf(\"字符串相等\\n\");\n    }\n    char *p = strchr(copy, 'L');\n    printf(\"首次出现 L 的位置: %s\\n\", p ? p : \"未找到\");\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "用 == 比较两个字符串只比较指针地址而不是内容，必须用 strcmp；用 strcpy 复制到空间不足的数组会缓冲区溢出，应改用 snprintf 并检查返回值。",
    "q": [
      {
        "q": "比较两个字符串内容应使用哪个函数？",
        "a": "strcmp"
      },
      {
        "q": "strlen(\"abc\") 的结果是多少？",
        "a": "3，不计算结尾的 '\\0'"
      }
    ]
  },
  {
    "id": 7,
    "t": "数组与复合数据结构",
    "p": [
      "数组长度固定，下标从 0 开始，声明 int a[5] 的有效下标是 0 到 4，越界不会报错",
      "初始化可用 {88, 92} 列表，未给出的元素自动置 0；省略长度时由初始化列表推断",
      "sizeof a / sizeof a[0] 可得数组元素个数，但数组作为函数参数后退化为指针",
      "多维数组按行优先连续存储，matrix[i][j] 等价于 *(*(matrix+i)+j)，传参需指定列数"
    ],
    "c": "#include <stdio.h>\n\nint main(void) {\n    int scores[5] = {88, 92, 79, 95, 70};\n    int sum = 0;\n    for (size_t i = 0; i < sizeof scores / sizeof scores[0]; i++) {\n        sum += scores[i];\n    }\n    printf(\"总分=%d 平均=%.1f\\n\", sum, (double)sum / 5);\n\n    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    printf(\"matrix[1][2]=%d\\n\", matrix[1][2]);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "把数组传给函数后再用 sizeof 只能得到指针大小（通常 8 字节），不是元素个数；循环会因此越界，正确做法是额外传入长度参数。",
    "q": [
      {
        "q": "int a[5] 的合法下标范围是什么？",
        "a": "0 到 4"
      },
      {
        "q": "如何在数组声明处求元素个数？",
        "a": "sizeof a / sizeof a[0]"
      }
    ]
  },
  {
    "id": 8,
    "t": "条件分支",
    "p": [
      "if/else if/else 按顺序判断，条件为整型表达式，0 为假、非 0 为真，没有布尔类型也可",
      "复合语句必须用花括号包住；即使只有一条语句，也建议加花括号避免悬空 else",
      "switch 只接受整型和枚举，case 后必须是常量表达式，break 用于跳出，否则会贯穿",
      "条件运算符 a ? b : c 是表达式，可嵌套；适合简单二选一，复杂逻辑仍用 if"
    ],
    "c": "#include <stdio.h>\n\nint main(void) {\n    int score = 86;\n    char grade;\n\n    if (score >= 90) {\n        grade = 'A';\n    } else if (score >= 80) {\n        grade = 'B';\n    } else {\n        grade = 'C';\n    }\n\n    switch (score / 10) {\n        case 9: grade = 'A'; break;\n        case 8: grade = 'B'; break;\n        default: grade = 'C'; break;\n    }\n    printf(\"成绩=%d 等级=%c\\n\", score, grade);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "switch 的 case 末尾忘记 break 会发生贯穿，继续执行下一个分支；if 后面误加分号会让分支变成空语句，后面的代码无条件执行。",
    "q": [
      {
        "q": "switch 中忘记 break 会发生什么？",
        "a": "发生贯穿，继续执行后面的 case"
      },
      {
        "q": "C 中条件表达式用什么表示假？",
        "a": "0"
      }
    ]
  },
  {
    "id": 9,
    "t": "循环与递归",
    "p": [
      "for 适合已知次数，while 适合条件循环，do-while 至少执行一次后再判断条件",
      "break 立即跳出当前循环，continue 跳过本次剩余语句进入下一次迭代",
      "递归必须有基准情形并向基准收敛，否则无限递归导致栈溢出；深递归可改写为迭代",
      "循环变量作用域限于循环体（C99 起），避免在循环条件中修改多个变量造成可读性下降"
    ],
    "c": "#include <stdio.h>\n\nlong factorial(int n) {\n    if (n <= 1) {\n        return 1;\n    }\n    return n * factorial(n - 1);\n}\n\nint main(void) {\n    for (int i = 1; i <= 5; i++) {\n        printf(\"%d! = %ld\\n\", i, factorial(i));\n    }\n    int n = 10, sum = 0;\n    while (n > 0) {\n        sum += n;\n        n--;\n    }\n    printf(\"1..10 之和 = %d\\n\", sum);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "递归缺少终止条件或没有向基准收敛，会无限调用直至栈溢出；do-while 先执行后判断，容易与 while 混淆，写反条件会多执行一次。",
    "q": [
      {
        "q": "递归函数必须具备哪两个要素？",
        "a": "基准情形和向基准收敛的递归调用"
      },
      {
        "q": "do-while 与 while 的关键区别？",
        "a": "do-while 至少执行一次循环体"
      }
    ]
  },
  {
    "id": 10,
    "t": "函数基础",
    "p": [
      "函数定义包含返回类型、函数名、参数列表和函数体；无返回值用 void，无参数写 (void)",
      "C 采用按值传递，形参是实参的副本；要修改调用者变量必须传指针",
      "函数必须先声明后使用，原型放在头文件或调用之前，避免隐式声明带来的类型截断",
      "main 的标准形式是 int main(void) 或 int main(int argc, char *argv[])，返回 0 表示成功"
    ],
    "c": "#include <stdio.h>\n\nint square(int x);\nvoid print_banner(const char *title);\n\nint main(void) {\n    print_banner(\"函数示例\");\n    for (int i = 1; i <= 4; i++) {\n        printf(\"%d 的平方是 %d\\n\", i, square(i));\n    }\n    return 0;\n}\n\nint square(int x) {\n    return x * x;\n}\n\nvoid print_banner(const char *title) {\n    printf(\"=== %s ===\\n\", title);\n}",
    "et": "❌ 常见错误",
    "ec": "调用函数前没有原型，编译器按隐式声明假设返回 int，指针或 double 返回值会被截断；正确做法是把原型放进头文件或在调用前声明。",
    "q": [
      {
        "q": "C 的参数传递方式是什么？",
        "a": "按值传递，需要修改实参时传指针"
      },
      {
        "q": "无参数函数应如何声明？",
        "a": "int main(void) 中的 (void)"
      }
    ]
  },
  {
    "id": 11,
    "t": "函数进阶：指针参数与函数指针",
    "p": [
      "指针参数可实现输出参数，调用时用 & 取地址，函数内用 * 解引用写入结果",
      "数组参数实际是指针，函数内 sizeof 得到指针大小，必须额外传入元素个数",
      "函数指针声明为 int (*fn)(int, int)，可把函数作为回调传递，实现策略切换",
      "参数加 const 表示函数不修改它，const char * 与 char * 是不同类型，提升接口安全性"
    ],
    "c": "#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\nint apply(int (*fn)(int, int), int x, int y) {\n    return fn(x, y);\n}\n\nint add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\n\nint main(void) {\n    int x = 3, y = 8;\n    swap(&x, &y);\n    printf(\"swap 后 x=%d y=%d\\n\", x, y);\n    printf(\"add=%d mul=%d\\n\", apply(add, x, y), apply(mul, x, y));\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "在函数内用 sizeof 获取数组参数长度会失败，它只是指针；另外把 const 指针传给需要 char* 的函数会产生警告，修改只读内存还可能崩溃。",
    "q": [
      {
        "q": "函数指针 int (*fn)(int, int) 表示什么？",
        "a": "指向接收两个 int、返回 int 的函数的指针"
      },
      {
        "q": "如何让函数通过参数返回结果？",
        "a": "传入指向结果变量的指针，在函数内解引用赋值"
      }
    ]
  },
  {
    "id": 12,
    "t": "作用域与模块化",
    "p": [
      "块作用域：花括号内声明的变量只在该块可见，内层同名变量会遮蔽外层变量",
      "static 局部变量只初始化一次，生命周期贯穿程序运行，但作用域仍限于所在函数",
      "文件作用域的 static 把函数或全局变量限制在本编译单元，避免符号冲突",
      "多文件程序用头文件放声明、源文件放定义，extern 声明引用其他文件的全局变量"
    ],
    "c": "#include <stdio.h>\n\nstatic int file_counter = 0;\n\nint next_id(void) {\n    static int id = 0;\n    return ++id;\n}\n\nint main(void) {\n    int i = 10;\n    file_counter++;\n    {\n        int i = 20;\n        printf(\"内层 i=%d\\n\", i);\n    }\n    int a = next_id();\n    int b = next_id();\n    printf(\"外层 i=%d 文件计数器=%d 编号=%d,%d\\n\",\n           i, file_counter, a, b);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "在头文件里直接定义全局变量，被多个源文件包含时造成重复定义链接错误；应使用 extern 声明加单个 .c 定义，或加 static 限制作用域。",
    "q": [
      {
        "q": "函数内的 static 局部变量有什么特点？",
        "a": "只初始化一次，生命周期贯穿整个程序"
      },
      {
        "q": "extern 关键字的作用是什么？",
        "a": "声明变量或函数定义在其他编译单元"
      }
    ]
  },
  {
    "id": 13,
    "t": "结构体、枚举与自定义类型",
    "p": [
      "struct 把不同类型成员组合成新类型，成员用点号访问，指针成员用 -> 访问",
      "typedef struct { ... } Person; 可省略每次写 struct 关键字，是常见写法",
      "enum 定义具名整数常量，默认从 0 递增，可读性优于魔法数字",
      "union 的所有成员共享同一块内存，大小等于最大成员，需另设标签区分当前有效成员"
    ],
    "c": "#include <stdio.h>\n\ntypedef struct {\n    char name[16];\n    int age;\n} Person;\n\ntypedef enum { ROLE_USER, ROLE_ADMIN } Role;\n\nint main(void) {\n    Person p;\n    snprintf(p.name, sizeof p.name, \"%s\", \"Alice\");\n    p.age = 30;\n    Role r = ROLE_ADMIN;\n    printf(\"%s (%d) role=%d size=%zu\\n\",\n           p.name, p.age, r, sizeof(Person));\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "struct 定义末尾忘记分号导致后续声明全部报错；用未初始化的结构体指针通过 -> 访问成员会解引用野指针，应先 malloc 或指向已有对象。",
    "q": [
      {
        "q": "访问结构体指针的成员用哪个运算符？",
        "a": "->"
      },
      {
        "q": "enum 定义的第一个枚举值默认是多少？",
        "a": "0"
      }
    ]
  },
  {
    "id": 14,
    "t": "文件 I/O",
    "p": [
      "fopen 返回 FILE*，模式 r/w/a 加 b 表示二进制；失败返回 NULL，必须检查",
      "fprintf/fscanf 按格式读写，fgets 读取一行更安全，fgetc/fputc 处理单字符",
      "fread/fwrite 按字节块读写二进制数据，适合结构体数组和图片等原始数据",
      "fclose 刷新缓冲并释放句柄；程序异常退出前应关闭文件，否则可能丢失未写入内容"
    ],
    "c": "#include <stdio.h>\n\nint main(void) {\n    const char *path = \"demo.txt\";\n    FILE *fp = fopen(path, \"w\");\n    if (fp == NULL) {\n        perror(\"fopen\");\n        return 1;\n    }\n    fprintf(fp, \"C11\\n文件 I/O\\n\");\n    fclose(fp);\n\n    char line[64];\n    fp = fopen(path, \"r\");\n    if (fp == NULL) {\n        perror(\"fopen\");\n        return 1;\n    }\n    while (fgets(line, sizeof line, fp) != NULL) {\n        printf(\"读取：%s\", line);\n    }\n    fclose(fp);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "fopen 失败返回 NULL，未检查就使用会崩溃；fgets 缓冲区过小会截断并残留换行；忘记 fclose 会泄漏文件句柄，缓冲数据也可能没有写入磁盘。",
    "q": [
      {
        "q": "fopen 打开失败时返回什么？",
        "a": "NULL"
      },
      {
        "q": "哪个函数适合按行读取文本文件？",
        "a": "fgets"
      }
    ]
  },
  {
    "id": 15,
    "t": "错误处理",
    "p": [
      "C 没有异常机制，函数通过返回值表示成功或失败，0/NULL/负数需约定清楚",
      "失败时库函数设置全局 errno，可用 perror 或 strerror(errno) 输出可读原因",
      "资源清理可用 goto cleanup 统一释放，避免多处 return 造成文件或内存泄漏",
      "对外部输入、文件操作、内存分配和系统调用都必须检查返回值，不能假设成功"
    ],
    "c": "#include <stdio.h>\n#include <errno.h>\n#include <string.h>\n\nint divide(int a, int b, int *out) {\n    if (b == 0) {\n        return -1;\n    }\n    *out = a / b;\n    return 0;\n}\n\nint main(void) {\n    int result;\n    if (divide(10, 0, &result) != 0) {\n        fprintf(stderr, \"错误：除数不能为零\\n\");\n    }\n    FILE *fp = fopen(\"missing.txt\", \"r\");\n    if (fp == NULL) {\n        fprintf(stderr, \"打开失败：%s (errno=%d)\\n\",\n                strerror(errno), errno);\n    } else {\n        fclose(fp);\n    }\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "用异常思维写 C：C 没有 try/catch，必须逐个检查返回值；只判断文件指针是否为 NULL 而不看 errno，会丢失失败的具体原因。",
    "q": [
      {
        "q": "查看错误原因的全局变量叫什么？",
        "a": "errno"
      },
      {
        "q": "如何把 errno 转成可读字符串？",
        "a": "strerror(errno) 或 perror()"
      }
    ]
  },
  {
    "id": 16,
    "t": "格式化输入输出",
    "p": [
      "printf 格式：%d 整数、%u 无符号、%ld 长整型、%f 浮点、%c 字符、%s 字符串、%p 指针",
      "宽度和精度写成 %8.2f、%-10s、%05d，分别控制总宽、小数位、左对齐和补零",
      "scanf 需要变量地址，%d 配 &x；读字符串用 %31s 限制长度，防止缓冲区溢出",
      "scanf 返回成功赋值项数，应判断是否等于预期；混用 scanf 与 fgets 要清掉残留换行"
    ],
    "c": "#include <stdio.h>\n\nint main(void) {\n    int age;\n    char name[32];\n    double score = 92.456;\n    printf(\"|%-10s|%5d|%8.2f|\\n\", \"Alice\", 30, score);\n    printf(\"十六进制=%#x 八进制=%#o 百分号=%%\\n\", 255, 8);\n    printf(\"请输入姓名和年龄：\");\n    if (scanf(\"%31s %d\", name, &age) == 2) {\n        printf(\"你好 %s，%d 岁\\n\", name, age);\n    } else {\n        printf(\"输入格式错误\\n\");\n    }\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "printf 格式符与参数类型不匹配（如用 %d 打印 double）是未定义行为，可能输出乱码；scanf(\"%d\", x) 少写 & 会向非法地址写入而崩溃。",
    "q": [
      {
        "q": "printf 中 %8.2f 的含义是什么？",
        "a": "总宽 8、保留 2 位小数的浮点数"
      },
      {
        "q": "scanf 读取 int 时为什么要加 &？",
        "a": "需要把变量地址传给函数才能写入"
      }
    ]
  },
  {
    "id": 17,
    "t": "指针与动态内存",
    "p": [
      "malloc 分配未初始化内存，calloc 分配并清零，realloc 调整大小，free 释放",
      "malloc 返回 void*，C 中可隐式转为其他指针；失败返回 NULL，解引用前必须检查",
      "指针算术以所指类型大小为步长，数组名可当指向首元素的指针使用",
      "free 后指针变成悬空指针，应置为 NULL；重复释放或越界写入会破坏堆结构"
    ],
    "c": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    size_t n = 5;\n    int *arr = malloc(n * sizeof *arr);\n    if (arr == NULL) {\n        fprintf(stderr, \"内存分配失败\\n\");\n        return 1;\n    }\n    for (size_t i = 0; i < n; i++) {\n        arr[i] = (int)(i * i);\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n\n    int *bigger = realloc(arr, 8 * sizeof *arr);\n    if (bigger == NULL) {\n        free(arr);\n        return 1;\n    }\n    free(bigger);\n    printf(\"释放完成\\n\");\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "free 后继续使用指针造成释放后使用；对同一指针重复 free 是未定义行为；malloc 返回 NULL 未检查就解引用会直接段错误。",
    "q": [
      {
        "q": "malloc 与 calloc 的区别是什么？",
        "a": "calloc 会把分配的内存清零，malloc 不清零"
      },
      {
        "q": "释放内存用哪个函数？",
        "a": "free"
      }
    ]
  },
  {
    "id": 18,
    "t": "日期与时间",
    "p": [
      "time_t 表示自 1970-01-01 UTC 起的秒数，time(NULL) 获取当前时间戳",
      "struct tm 拆解年月日时分秒，localtime 转本地时间，gmtime 转 UTC 时间",
      "strftime 按格式串输出，如 %Y-%m-%d %H:%M:%S；mktime 把 struct tm 转回时间戳",
      "clock 返回进程 CPU 时间，CLOCKS_PER_SEC 换算秒；计时更精确可用 clock_gettime"
    ],
    "c": "#include <stdio.h>\n#include <time.h>\n\nint main(void) {\n    time_t now = time(NULL);\n    struct tm *local = localtime(&now);\n\n    char buf[64];\n    strftime(buf, sizeof buf, \"%Y-%m-%d %H:%M:%S\", local);\n    printf(\"本地时间：%s\\n\", buf);\n    printf(\"时间戳：%lld\\n\", (long long)now);\n\n    clock_t start = clock();\n    volatile long sum = 0;\n    for (long i = 0; i < 1000000; i++) {\n        sum += i;\n    }\n    double sec = (double)(clock() - start) / CLOCKS_PER_SEC;\n    printf(\"CPU 用时：%.3f 秒\\n\", sec);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "把 time_t 直接当可读时间打印；localtime 返回指向静态缓冲区的指针，连续调用会互相覆盖，多线程中应使用 localtime_r。",
    "q": [
      {
        "q": "time(NULL) 返回什么？",
        "a": "当前时间的 time_t 时间戳"
      },
      {
        "q": "哪个函数把 struct tm 格式化为字符串？",
        "a": "strftime"
      }
    ]
  },
  {
    "id": 19,
    "t": "字符与编码",
    "p": [
      "char 只保证至少 8 位，是否有符号由实现决定；处理字节时应使用 unsigned char",
      "ctype.h 提供 isalpha、isdigit、isspace、tolower 等分类函数，参数必须是 unsigned char 值",
      "ASCII 用 0-127 表示英文字符；UTF-8 用 1-4 字节表示一个 Unicode 码点，中文通常占 3 字节",
      "按字节遍历 UTF-8 只能统计字节数，要按字符处理需专门的 UTF-8 解码库或手动解析首字节"
    ],
    "c": "#include <stdio.h>\n#include <ctype.h>\n#include <string.h>\n\nint main(void) {\n    const char *text = \"Hello, 世界!\";\n    int letters = 0, digits = 0, bytes = 0;\n    for (const unsigned char *p = (const unsigned char *)text; *p; p++) {\n        bytes++;\n        if (isalpha(*p)) {\n            letters++;\n        }\n        if (isdigit(*p)) {\n            digits++;\n        }\n    }\n    printf(\"字节数=%d 字母数=%d 数字数=%d\\n\", bytes, letters, digits);\n    printf(\"UTF-8 中一个汉字占 %d 字节\\n\", (int)strlen(\"世\"));\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "把中文 UTF-8 字符串按 char 逐字节处理，一个汉字占 3 字节，字符数与显示宽度不一致；ctype 函数传入负的 char 值是未定义行为，应先转 unsigned char。",
    "q": [
      {
        "q": "UTF-8 中一个常用汉字通常占几字节？",
        "a": "3 字节"
      },
      {
        "q": "isalpha 的参数应该是什么类型？",
        "a": "unsigned char 或 EOF"
      }
    ]
  },
  {
    "id": 20,
    "t": "模块、库与包管理",
    "p": [
      "静态库以 .a 结尾，链接时复制进可执行文件；共享库以 .so 结尾，运行时动态加载",
      "头文件用尖括号搜索系统路径，用双引号先搜索当前目录，编译时用 -I 添加头文件路径",
      "链接库用 -l 加 -L 指定目录，数学库要显式加 -lm，链接顺序应把库放在目标文件之后",
      "pkg-config --cflags --libs 可查询库的编译与链接参数，C 没有官方包管理器，依赖靠系统包管理"
    ],
    "c": "#include <stdio.h>\n#include <math.h>\n\nint main(void) {\n    printf(\"sqrt(2)=%.6f\\n\", sqrt(2.0));\n    printf(\"pow(2,10)=%.0f\\n\", pow(2.0, 10.0));\n    printf(\"编译：gcc -std=c11 calc.c -o calc -lm\\n\");\n    printf(\"静态库：gcc -c util.c -o util.o && ar rcs libutil.a util.o\\n\");\n    printf(\"共享库：gcc -shared -fPIC util.c -o libutil.so\\n\");\n    printf(\"查询依赖：pkg-config --cflags --libs sqlite3\\n\");\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "链接顺序错误：库必须放在使用它的目标文件之后，否则报 undefined reference；运行时找不到 .so 需要设置 LD_LIBRARY_PATH 或写入 rpath。",
    "q": [
      {
        "q": "链接数学库需要加什么选项？",
        "a": "-lm"
      },
      {
        "q": "哪个命令查询库的编译和链接参数？",
        "a": "pkg-config --cflags --libs"
      }
    ]
  },
  {
    "id": 21,
    "t": "标准库速查与工具链",
    "p": [
      "常用头文件：stdio.h 输入输出、stdlib.h 内存与转换、string.h 字符串、math.h 数学、time.h 时间",
      "C 没有官方包管理器，依赖通过系统包管理器、源码构建或 vendoring 管理，pkg-config 查询编译参数",
      "测试框架常用 Unity、CMocka、Check；clang-format 负责格式化，gdb 与 valgrind 负责调试和内存检查",
      "标准编译命令：gcc -std=c11 -Wall -Wextra -O2 app.c -o app，运行用 ./app"
    ],
    "c": "#include <stdio.h>\n#include <stdlib.h>\n\n/* 依赖：apt/dnf/brew 安装，pkg-config 查询；无官方包仓库\n   测试：Unity / CMocka / Check，示例 cc test.c -lcmocka\n   格式化：clang-format -i file.c\n   调试：gdb ./app；valgrind --leak-check=full ./app\n   编译：gcc -std=c11 -Wall -Wextra -O2 app.c -o app\n   运行：./app                                                   */\n\nstatic int cmp(const void *a, const void *b) {\n    return (*(const int *)a) - (*(const int *)b);\n}\n\nint main(void) {\n    int data[] = {5, 2, 9, 1, 7};\n    size_t n = sizeof data / sizeof data[0];\n    qsort(data, n, sizeof data[0], cmp);\n    for (size_t i = 0; i < n; i++) {\n        printf(\"%d \", data[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "把工具链命令写错，例如链接数学库写成 -lmath 而不是 -lm；另外 C 没有官方包管理器，直接复制二进制依赖而不记录版本会导致构建不可复现。",
    "q": [
      {
        "q": "C 标准库中 qsort 在哪个头文件？",
        "a": "stdlib.h"
      },
      {
        "q": "哪个工具用于检查内存泄漏？",
        "a": "valgrind"
      }
    ]
  },
  {
    "id": 22,
    "t": "并发与并行",
    "p": [
      "C11 提供 threads.h，thrd_create 创建线程，thrd_join 等待结束，编译时通常需要 -pthread",
      "多个线程共享全局变量时存在数据竞争，必须用 mtx_t 互斥量或原子操作保护",
      "mtx_init 初始化互斥量，mtx_lock/mtx_unlock 包围临界区，最后 mtx_destroy 释放",
      "线程函数签名是 int (*)(void *)，返回值通过 thrd_join 的第二个参数取出"
    ],
    "c": "#include <stdio.h>\n#include <threads.h>\n\nstatic int counter = 0;\nstatic mtx_t lock;\n\nint worker(void *arg) {\n    (void)arg;\n    for (int i = 0; i < 100000; i++) {\n        mtx_lock(&lock);\n        counter++;\n        mtx_unlock(&lock);\n    }\n    return 0;\n}\n\nint main(void) {\n    thrd_t t1, t2;\n    mtx_init(&lock, mtx_plain);\n    thrd_create(&t1, worker, NULL);\n    thrd_create(&t2, worker, NULL);\n    thrd_join(t1, NULL);\n    thrd_join(t2, NULL);\n    printf(\"counter=%d\\n\", counter);\n    mtx_destroy(&lock);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "不加锁让两个线程自增同一变量，导致丢失更新；忘记 thrd_join 就退出 main 会提前终止进程，线程结果丢失；编译时漏掉 -pthread 会链接失败。",
    "q": [
      {
        "q": "C11 中创建线程用什么函数？",
        "a": "thrd_create"
      },
      {
        "q": "保护共享计数器应使用什么同步原语？",
        "a": "互斥量 mtx_t"
      }
    ]
  },
  {
    "id": 23,
    "t": "性能优化",
    "p": [
      "先测量后优化：用 clock、clock_gettime 或 perf 定位热点，避免凭直觉改代码",
      "编译优化用 -O2 或 -O3，-march=native 可启用本机指令集，但会降低可移植性",
      "缓存友好：按行遍历二维数组、把热数据放在连续内存、减少指针追逐可显著提升速度",
      "减少堆分配和函数调用开销，热循环中避免 strlen 等重复计算，把不变量移到循环外"
    ],
    "c": "#include <stdio.h>\n#include <time.h>\n\n#define N 5000000\n\nint main(void) {\n    static int data[N];\n    for (int i = 0; i < N; i++) {\n        data[i] = i & 1023;\n    }\n\n    clock_t start = clock();\n    long long sum = 0;\n    for (int i = 0; i < N; i++) {\n        sum += data[i];\n    }\n    double sec = (double)(clock() - start) / CLOCKS_PER_SEC;\n\n    printf(\"sum=%lld 用时=%.3f 秒\\n\", sum, sec);\n    printf(\"建议：gcc -O2 -march=native，按行访问数组以利用缓存\\n\");\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "未测量就手写优化，反而破坏可读性；开启 -O2 后依赖未定义行为的代码（如有符号溢出）行为会改变，优化前应先消除 UB 并开启警告。",
    "q": [
      {
        "q": "常用的 GCC 优化等级有哪些？",
        "a": "-O1、-O2、-O3 和 -Os"
      },
      {
        "q": "为什么按行遍历二维数组更快？",
        "a": "内存按行连续存储，缓存命中率更高"
      }
    ]
  },
  {
    "id": 24,
    "t": "测试",
    "p": [
      "断言 assert 适合开发期检查前置条件和不变式，定义 NDEBUG 后会被完全移除",
      "正式项目使用 Unity、CMocka 或 Check 等框架，组织测试用例并输出通过/失败统计",
      "测试要覆盖正常值、边界值和非法输入，例如空字符串、0、负数、最大值",
      "把测试代码与产品代码分开编译，通过 make test 或 CI 自动运行，防止回归"
    ],
    "c": "#include <stdio.h>\n#include <assert.h>\n#include <string.h>\n\nstatic int reverse_str(char *s) {\n    if (s == NULL) {\n        return -1;\n    }\n    size_t n = strlen(s);\n    for (size_t i = 0; i < n / 2; i++) {\n        char t = s[i];\n        s[i] = s[n - 1 - i];\n        s[n - 1 - i] = t;\n    }\n    return 0;\n}\n\nint main(void) {\n    char buf[] = \"abc\";\n    assert(reverse_str(buf) == 0);\n    assert(strcmp(buf, \"cba\") == 0);\n    assert(reverse_str(NULL) == -1);\n    printf(\"全部断言通过\\n\");\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "在生产代码中大量使用 assert：定义 NDEBUG 后断言被完全移除，带副作用的表达式不会执行；测试应使用独立框架，不要依赖 assert 的输出。",
    "q": [
      {
        "q": "定义 NDEBUG 后 assert 会怎样？",
        "a": "被预处理移除，不产生任何代码"
      },
      {
        "q": "单元测试应重点覆盖哪些输入？",
        "a": "正常值、边界值和非法输入"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧",
    "p": [
      "编译时加 -g 生成调试符号，用 gdb ./app 后 break、run、next、print、bt 定位问题",
      "valgrind --leak-check=full 可发现内存泄漏、越界读写和未初始化使用",
      "开启 -Wall -Wextra -Werror，把警告当错误处理，很多 bug 在编译期就能暴露",
      "用带 __FILE__ 和 __LINE__ 的日志宏替代散落的 printf，发布时用宏开关关闭"
    ],
    "c": "#include <stdio.h>\n#include <assert.h>\n\n#define LOG(fmt, ...) \\\n    fprintf(stderr, \"[%s:%d] \" fmt \"\\n\", __FILE__, __LINE__, __VA_ARGS__)\n\nint checked_div(int a, int b) {\n    assert(b != 0 && \"除数不能为零\");\n    LOG(\"div %d / %d\", a, b);\n    return a / b;\n}\n\nint main(void) {\n    printf(\"结果=%d\\n\", checked_div(10, 2));\n    /* gdb 常用：break checked_div / run / bt / print a / next / continue */\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "用 printf 调试后忘记删除，改变输出时序可能掩盖竞争问题；调试版本没加 -g，gdb 中看不到行号和变量名；把日志写到 stdout 会污染程序输出。",
    "q": [
      {
        "q": "gdb 中查看调用栈用什么命令？",
        "a": "bt 或 backtrace"
      },
      {
        "q": "哪个选项让 GCC 生成调试信息？",
        "a": "-g"
      }
    ]
  },
  {
    "id": 26,
    "t": "与系统及外部接口互操作",
    "p": [
      "system 执行 shell 命令并返回退出状态，popen 可读取命令输出，pclose 回收子进程",
      "getenv 读取环境变量，返回 NULL 表示不存在；setenv 可设置，但修改只影响当前进程",
      "调用外部命令要检查返回值并避免拼接未受信任的输入，防止命令注入",
      "更底层的互操作可使用 fork/exec、dlopen/dlsym 加载动态库或直接调用系统 API"
    ],
    "c": "#define _POSIX_C_SOURCE 200809L\n#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    const char *home = getenv(\"HOME\");\n    printf(\"HOME=%s\\n\", home ? home : \"(未设置)\");\n\n    FILE *fp = popen(\"echo 来自外部命令 && uname -s\", \"r\");\n    if (fp == NULL) {\n        perror(\"popen\");\n        return 1;\n    }\n    char line[128];\n    while (fgets(line, sizeof line, fp) != NULL) {\n        printf(\"输出：%s\", line);\n    }\n    int status = pclose(fp);\n    printf(\"退出状态=%d\\n\", status);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "把用户输入直接拼进 system() 命令造成命令注入；应使用 exec 系列或严格白名单校验，并检查 system/pclose 的返回值判断命令是否成功。",
    "q": [
      {
        "q": "读取环境变量用哪个函数？",
        "a": "getenv"
      },
      {
        "q": "popen 打开的管道用什么关闭？",
        "a": "pclose"
      }
    ]
  },
  {
    "id": 27,
    "t": "设计模式与程序组织",
    "p": [
      "按职责分层：接口头文件、实现源文件、数据结构与工具函数分离，降低耦合",
      "不透明指针在头文件只声明 struct，定义藏在 .c 中，调用方无法直接修改内部字段",
      "用函数指针表模拟虚函数，实现多态与策略模式，是 C 中常见的面向对象技巧",
      "单一职责：一个模块只做一件事，通过清晰的头文件 API 暴露最小必要接口"
    ],
    "c": "#include <stdio.h>\n\ntypedef struct Shape Shape;\n\ntypedef struct {\n    double (*area)(const Shape *);\n    const char *name;\n} ShapeVTable;\n\nstruct Shape {\n    const ShapeVTable *vtable;\n    double a;\n    double b;\n};\n\nstatic double rect_area(const Shape *s) { return s->a * s->b; }\nstatic double tri_area(const Shape *s) { return 0.5 * s->a * s->b; }\n\nstatic const ShapeVTable RECT = { rect_area, \"矩形\" };\nstatic const ShapeVTable TRI = { tri_area, \"三角形\" };\n\nint main(void) {\n    Shape r = { &RECT, 3, 4 };\n    Shape t = { &TRI, 3, 4 };\n    printf(\"%s 面积=%.1f\\n\", r.vtable->name, r.vtable->area(&r));\n    printf(\"%s 面积=%.1f\\n\", t.vtable->name, t.vtable->area(&t));\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "在头文件暴露结构体内部字段，任何调用方都能修改导致封装失效；应使用不透明指针和访问函数，修改内部布局时不影响调用方。",
    "q": [
      {
        "q": "C 中如何模拟虚函数？",
        "a": "在结构体中放函数指针表，按对象类型指向不同实现"
      },
      {
        "q": "不透明指针的好处是什么？",
        "a": "隐藏结构体实现细节，调用方只能通过 API 操作"
      }
    ]
  },
  {
    "id": 28,
    "t": "数据库访问",
    "p": [
      "SQLite 是嵌入式数据库，sqlite3_open 打开数据库，:memory: 表示内存库，用完 sqlite3_close",
      "sqlite3_prepare_v2 编译 SQL，sqlite3_bind_* 绑定参数，sqlite3_step 执行并逐行取结果",
      "查询结果用 sqlite3_column_int/text 等按列读取，结束后必须 sqlite3_finalize 释放语句",
      "始终使用参数绑定而不是字符串拼接，既能防注入又能正确处理引号和二进制数据"
    ],
    "c": "#include <stdio.h>\n#include <sqlite3.h>\n\nint main(void) {\n    sqlite3 *db;\n    sqlite3_stmt *stmt;\n    if (sqlite3_open(\":memory:\", &db) != SQLITE_OK) {\n        fprintf(stderr, \"打开失败：%s\\n\", sqlite3_errmsg(db));\n        return 1;\n    }\n    sqlite3_exec(db, \"CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT)\",\n                 NULL, NULL, NULL);\n    sqlite3_prepare_v2(db, \"INSERT INTO users(name) VALUES (?)\", -1, &stmt, NULL);\n    sqlite3_bind_text(stmt, 1, \"Alice\", -1, SQLITE_STATIC);\n    sqlite3_step(stmt);\n    sqlite3_finalize(stmt);\n\n    sqlite3_prepare_v2(db, \"SELECT COUNT(*) FROM users\", -1, &stmt, NULL);\n    if (sqlite3_step(stmt) == SQLITE_ROW) {\n        printf(\"用户数=%d\\n\", sqlite3_column_int(stmt, 0));\n    }\n    sqlite3_finalize(stmt);\n    sqlite3_close(db);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "用 sprintf 拼接 SQL 造成注入；忘记 sqlite3_finalize 造成语句句柄泄漏；不检查 prepare 返回值可能解引用空语句指针。",
    "q": [
      {
        "q": "SQLite 中如何表示内存数据库？",
        "a": ":memory:"
      },
      {
        "q": "执行查询后必须调用哪个函数释放语句？",
        "a": "sqlite3_finalize"
      }
    ]
  },
  {
    "id": 29,
    "t": "网络编程与 HTTP",
    "p": [
      "TCP 客户端流程：socket 创建套接字、connect 连接服务器、send/recv 收发、close 关闭",
      "sockaddr_in 保存 IPv4 地址和端口，端口必须用 htons 转网络字节序，地址可用 inet_pton 或 htonl 填充",
      "HTTP/1.1 请求由请求行、Host 等头部、空行和可选正文组成，Connection: close 便于读取到结尾",
      "处理返回值：send/recv 可能部分收发或被信号中断，需要循环直到完成或出现错误"
    ],
    "c": "#include <stdio.h>\n#include <string.h>\n#include <unistd.h>\n#include <sys/socket.h>\n#include <netinet/in.h>\n\nint main(void) {\n    int fd = socket(AF_INET, SOCK_STREAM, 0);\n    if (fd < 0) { perror(\"socket\"); return 1; }\n    struct sockaddr_in addr = {0};\n    addr.sin_family = AF_INET;\n    addr.sin_port = htons(80);\n    addr.sin_addr.s_addr = htonl(0x5DB8D822); /* 93.184.216.34 */\n    if (connect(fd, (struct sockaddr *)&addr, sizeof addr) < 0) {\n        perror(\"connect\"); close(fd); return 1;\n    }\n    const char *req = \"GET / HTTP/1.1\\r\\nHost: example.com\\r\\nConnection: close\\r\\n\\r\\n\";\n    send(fd, req, strlen(req), 0);\n    char buf[512];\n    ssize_t n = recv(fd, buf, sizeof buf - 1, 0);\n    if (n > 0) { buf[n] = '\\0'; printf(\"收到 %zd 字节：%.40s...\\n\", n, buf); }\n    close(fd);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "忘记用 htons 转换端口字节序导致连接失败；发送后不读响应就关闭，或没有处理 EINTR 与部分发送，会把不完整请求发给服务器。",
    "q": [
      {
        "q": "端口号为什么要用 htons 转换？",
        "a": "网络字节序是大端，主机字节序可能不同"
      },
      {
        "q": "TCP 客户端连接服务器用哪个函数？",
        "a": "connect"
      }
    ]
  },
  {
    "id": 30,
    "t": "安全编程",
    "p": [
      "永远不要用 gets、strcpy、sprintf 处理外部输入，改用 fgets、snprintf 并检查截断",
      "输入校验要检查长度、字符集、数值范围和格式，非法输入立即拒绝而不是继续处理",
      "整数运算要防溢出，把字符串转整数用 strtol 并检查 errno 与 end 指针",
      "启用编译器保护：-fstack-protector-strong、-D_FORTIFY_SOURCE=2，并用 valgrind/ASan 检测越界"
    ],
    "c": "#include <stdio.h>\n#include <errno.h>\n#include <stdlib.h>\n\nint read_age(const char *s, int *out) {\n    char *end;\n    errno = 0;\n    long v = strtol(s, &end, 10);\n    if (end == s || *end != '\\0' || errno == ERANGE || v < 0 || v > 150) {\n        return -1;\n    }\n    *out = (int)v;\n    return 0;\n}\n\nint main(void) {\n    int age;\n    if (read_age(\"42\", &age) == 0) { printf(\"年龄=%d\\n\", age); }\n    if (read_age(\"999\", &age) != 0) { printf(\"拒绝越界年龄\\n\"); }\n    if (read_age(\"12abc\", &age) != 0) { printf(\"拒绝非法输入\\n\"); }\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "用 gets 或 strcpy 处理外部输入导致栈溢出；把负数字符串用 atoi 转成 size_t 会变成巨大值，必须用 strtol 并检查范围。",
    "q": [
      {
        "q": "为什么不能用 gets 读取输入？",
        "a": "它不限制长度，必然存在缓冲区溢出风险"
      },
      {
        "q": "字符串转整数时应使用哪个函数？",
        "a": "strtol 或 strtoll，并检查 errno"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战：命令行工具",
    "p": [
      "main 的 argc 是参数个数，argv 是参数字符串数组，argv[0] 是程序名，真实参数从 argv[1] 开始",
      "先校验参数个数和内容，错误时把用法写到 stderr 并返回非零退出码",
      "按字符流处理文件可统计行数、单词数和字节数，isspace 判断分隔符，EOF 结束循环",
      "用 fgetc 读取避免了行缓冲限制，适合实现类似 wc 的通用统计工具"
    ],
    "c": "#include <stdio.h>\n#include <ctype.h>\n\nint main(int argc, char *argv[]) {\n    if (argc != 2) { fprintf(stderr, \"用法：%s <文件>\\n\", argv[0]); return 1; }\n    FILE *fp = fopen(argv[1], \"r\");\n    if (fp == NULL) { perror(argv[1]); return 1; }\n    long chars = 0, words = 0, lines = 0;\n    int ch, in_word = 0;\n    while ((ch = fgetc(fp)) != EOF) {\n        chars++;\n        if (ch == '\\n') { lines++; }\n        if (isspace(ch)) { in_word = 0; }\n        else if (!in_word) { in_word = 1; words++; }\n    }\n    fclose(fp);\n    printf(\"%ld 行 %ld 词 %ld 字节\\n\", lines, words, chars);\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "不检查 argc 就直接访问 argv[1] 造成越界；错误信息写到 stdout 而不是 stderr，且忘记返回非零退出码，脚本无法判断执行失败。",
    "q": [
      {
        "q": "argv[0] 保存的是什么？",
        "a": "程序自身的名字"
      },
      {
        "q": "命令行工具出错时应把信息写到哪？",
        "a": "stderr，并返回非零退出码"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战：数据处理",
    "p": [
      "按行读取 CSV，用 strchr 或 strtok 定位分隔符，跳过表头和空行，逐字段解析",
      "数值转换用 strtod/strtol 并检查 end 指针，避免 atof 静默把非法输入当 0",
      "统计时用 double 累加浮点数，注意除以记录数前判断非零，输出统一格式",
      "数据量大时应动态扩容数组或流式处理，避免一次性把整个文件读入内存"
    ],
    "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main(void) {\n    const char *csv = \"Alice,88.5\\nBob,92\\nCara,79.5\\n\";\n    FILE *fp = tmpfile();\n    if (fp == NULL) { perror(\"tmpfile\"); return 1; }\n    fputs(csv, fp);\n    rewind(fp);\n\n    char line[64];\n    double sum = 0;\n    int count = 0;\n    while (fgets(line, sizeof line, fp) != NULL) {\n        char *comma = strchr(line, ',');\n        if (comma == NULL) { continue; }\n        char *end;\n        double v = strtod(comma + 1, &end);\n        if (end != comma + 1) { sum += v; count++; }\n    }\n    fclose(fp);\n    if (count > 0) { printf(\"记录=%d 平均分=%.2f\\n\", count, sum / count); }\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "用 fscanf(\"%s\") 读取含逗号的整行导致字段错位；未处理空行和末尾换行；浮点累加精度误差应用 double，并统一输出格式。",
    "q": [
      {
        "q": "解析浮点数应使用哪个函数？",
        "a": "strtod，并检查 end 指针"
      },
      {
        "q": "为什么不能直接用 atof？",
        "a": "它无法区分非法输入和数字 0"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建、部署与发布",
    "p": [
      "发布构建使用 -O2 -DNDEBUG，定义版本宏，生成的可执行文件可用 strip 去除调试符号",
      "Makefile 用目标、依赖和命令组织构建，命令前必须是 Tab；CMake 适合跨平台多目标项目",
      "静态链接便于分发但体积大，动态链接需确保目标机器有所需 .so 或设置 rpath",
      "发布包应包含可执行文件、README、许可证和校验和，并在干净环境做一次安装验证"
    ],
    "c": "#include <stdio.h>\n\n#ifndef VERSION\n#define VERSION \"0.1.0\"\n#endif\n\nint main(void) {\n    printf(\"app %s\\n\", VERSION);\n#ifdef NDEBUG\n    printf(\"构建：release\\n\");\n#else\n    printf(\"构建：debug\\n\");\n#endif\n    /* make release:\n       gcc -std=c11 -O2 -DNDEBUG -DVERSION=\\\"1.0.0\\\" app.c -o app\n       strip app\n       tar czf app-1.0.0-linux-x64.tar.gz app README.md LICENSE */\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "Makefile 中命令行前用空格而不是 Tab，报 missing separator；发布时忘记 -O2 和 strip，或者把调试符号与内部路径带进生产包。",
    "q": [
      {
        "q": "发布构建通常定义哪个宏关闭断言？",
        "a": "NDEBUG"
      },
      {
        "q": "Makefile 的命令行必须以什么开头？",
        "a": "Tab 制表符"
      }
    ]
  },
  {
    "id": 34,
    "t": "最佳实践与代码风格",
    "p": [
      "命名统一：变量和函数用 snake_case，宏和枚举常量用全大写，类型名可用 PascalCase",
      "函数参数加 const 表达只读意图，返回错误码用统一约定，资源释放集中处理",
      "每个源文件保持单一职责，头文件只放声明并加 include guard 或 #pragma once",
      "始终开启 -Wall -Wextra，CI 中使用 -Werror，提交前运行 clang-format 保持风格一致"
    ],
    "c": "#include <stdio.h>\n#include <stddef.h>\n\nstatic size_t str_len(const char *s) {\n    const char *p = s;\n    while (*p != '\\0') {\n        p++;\n    }\n    return (size_t)(p - s);\n}\n\nstatic void print_user(const char *name, int age) {\n    printf(\"%-10s %3d\\n\", name, age);\n}\n\nint main(void) {\n    print_user(\"Alice\", 30);\n    print_user(\"Bob\", 7);\n    printf(\"长度=%zu\\n\", str_len(\"Pascal\"));\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "忽略编译器警告，尤其是隐式转换和未使用变量，它们常掩盖真实 bug；函数参数该加 const 却没加，容易误改调用方数据。",
    "q": [
      {
        "q": "C 语言常用的变量命名风格是什么？",
        "a": "snake_case"
      },
      {
        "q": "头文件为什么需要 include guard？",
        "a": "防止被重复包含导致重复定义"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "第一阶段掌握语法、类型、运算符、流程控制、函数和数组，能独立写几百行程序",
      "第二阶段深入指针、动态内存、结构体、文件 I/O 和模块化，理解编译链接过程",
      "第三阶段学习 gdb、valgrind、单元测试、Makefile/CMake 和代码规范，形成工程能力",
      "进阶方向包括系统编程、网络、多线程、嵌入式与阅读 Linux 内核等开源项目源码"
    ],
    "c": "#include <stdio.h>\n\nstatic void step(int no, const char *topic, const char *detail) {\n    printf(\"%2d. %-12s %s\\n\", no, topic, detail);\n}\n\nint main(void) {\n    puts(\"C 语言学习路线\");\n    step(1, \"语法基础\", \"类型、运算符、流程控制、函数\");\n    step(2, \"内存与指针\", \"数组、指针、malloc/free、结构体\");\n    step(3, \"工程能力\", \"多文件、Makefile/CMake、gdb、单元测试\");\n    step(4, \"系统编程\", \"文件、进程、线程、socket、sqlite3\");\n    step(5, \"深入方向\", \"阅读 Linux 内核与开源 C 项目源码\");\n    return 0;\n}",
    "et": "❌ 常见错误",
    "ec": "只背语法不动手，遇到指针和链接错误就放弃；应通过小项目逐步增加难度，并用调试器和测试验证每一步的理解。",
    "q": [
      {
        "q": "学习 C 的第二阶段应重点掌握什么？",
        "a": "指针、动态内存、结构体、文件和模块化"
      },
      {
        "q": "提升工程能力推荐哪些工具？",
        "a": "gdb、valgrind、单元测试框架、Makefile/CMake"
      }
    ]
  }
];
