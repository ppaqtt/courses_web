window.TUTORIAL_DATA_csharp = 
[
  {
    "id": 1,
    "t": "C#简介与.NET平台",
    "p": [
      "C#由微软Anders Hejlsberg主导开发，2000年发布，是现代、类型安全、面向对象的编程语言。",
      ".NET平台包含CLR（公共语言运行时）和FCL（框架类库），提供跨语言互操作性。",
      ".NET演进历程：.NET Framework→.NET Core→.NET 5/6/7/8，当前统一为.NET 8及后续版本。",
      "应用领域广泛：Web开发(ASP.NET Core)、桌面应用(WPF/WinForms)、移动开发(MAUI)、游戏开发(Unity)、云计算(Azure)。",
      "核心语言特性：强类型、自动垃圾回收(GC)、泛型、LINQ、异步编程、模式匹配等。"
    ],
    "c": "using System;\nnamespace CSharpIntro\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Console.WriteLine(\"欢迎来到C#世界！\");\n            Console.WriteLine($\"当前.NET版本: {Environment.Version}\");\n            Console.WriteLine($\"操作系统: {Environment.OSVersion}\");\n            Console.WriteLine($\"64位系统: {Environment.Is64BitOperatingSystem}\");\n        }\n    }\n}",
    "et": "Main方法签名错误",
    "ec": "// 错误：Main首字母小写\nstatic void main(string[] args) // ❌ C#区分大小写\n\n// 正确：Main首字母大写\nstatic void Main(string[] args) // ✅\n\n// .NET 6+支持顶级语句\nConsole.WriteLine(\"Hello\"); // ✅",
    "q": [
      {
        "q": "C#运行在什么平台上？两个核心组件是什么？",
        "a": "运行在.NET平台上，核心组件是CLR（公共语言运行时）和FCL（框架类库）。"
      }
    ]
  },
  {
    "id": 2,
    "t": "开发环境配置",
    "p": [
      "安装.NET SDK后可在终端使用dotnet命令创建、编译、运行项目。",
      "IDE选择：Visual Studio 2022(Windows)、VS Code(轻量跨平台+C# Dev Kit扩展)、JetBrains Rider(跨平台)。",
      "项目类型：console(控制台)、classlib(类库)、webapi(Web API)、xunit(测试)等，使用dotnet new命令创建。",
      "NuGet包管理：通过dotnet add package命令添加第三方库。"
    ],
    "c": "# 检查.NET SDK版本\ndotnet --version\n\n# 创建控制台项目\ndotnet new console -n MyFirstApp\n\n# 运行项目\ncd MyFirstApp\ndotnet run\n\n# 添加NuGet包\ndotnet add package Newtonsoft.Json\n\n# 发布项目\ndotnet publish -c Release",
    "et": "未安装SDK运行dotnet命令",
    "ec": "// 错误：终端提示\"dotnet不是内部或外部命令\"\n// 解决方法：1.下载.NET SDK 2.安装后重启终端 3.运行dotnet --version验证",
    "q": [
      {
        "q": "写出创建名为HelloCSharp的控制台项目并运行的命令",
        "a": "dotnet new console -n HelloCSharp && cd HelloCSharp && dotnet run"
      }
    ]
  },
  {
    "id": 3,
    "t": "第一个C#程序",
    "p": [
      "程序结构：using声明→namespace命名空间→class类→Main方法，这是C#程序的基本骨架。",
      "顶级语句(.NET 6+)：无需显式定义namespace、class、Main方法。",
      "Console类：WriteLine输出到控制台、ReadLine读取用户输入。",
      "字符串插值：使用$前缀，在花括号中嵌入变量，如$\"{name}你好\"。"
    ],
    "c": "using System;\nnamespace HelloWorld\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Console.WriteLine(\"请输入你的名字：\");\n            string name = Console.ReadLine();\n            Console.WriteLine($\"你好，{name}！欢迎学习C#！\");\n            Console.WriteLine(\"当前时间: \" + DateTime.Now);\n        }\n    }\n}",
    "et": "缺少using或分号",
    "ec": "// 错误1：缺少using System\nConsole.WriteLine(\"Hello\"); // ❌ Console未定义\n// 错误2：缺少分号\nConsole.WriteLine(\"Hello\") // ❌\n// 正确写法\nusing System;\nConsole.WriteLine(\"Hello\"); // ✅",
    "q": [
      {
        "q": "编写程序读取用户年龄，输出\"你今年X岁，10年后X+10岁\"",
        "a": "Console.WriteLine(\"请输入年龄：\");\nint age=int.Parse(Console.ReadLine());\nConsole.WriteLine($\"你今年{age}岁，10年后{age+10}岁\");"
      }
    ]
  },
  {
    "id": 4,
    "t": "注释与命名规范",
    "p": [
      "单行注释//，多行注释/* */，XML文档注释///可生成API文档。",
      "PascalCase：类名、方法名、属性名；camelCase：局部变量、方法参数；_camelCase：私有字段。",
      "接口以I前缀开头如IRepository，常量全大写如MAX_SIZE。",
      "命名原则：有意义、避免缩写、不使用C#关键字。"
    ],
    "c": "using System;\n/// <summary>学生管理类</summary>\nclass StudentManager\n{\n    private int _studentCount; // 私有字段\n    public int StudentCount { get; set; } // 属性PascalCase\n    \n    /* 添加学生方法 */\n    public void AddStudent(string name, int age) // 方法PascalCase\n    {\n        int maxAge = 150; // 局部变量camelCase\n    }\n}\ninterface IStudentRepository // 接口I前缀\n{ \n    Student GetStudent(int id); \n}",
    "et": "命名不规范",
    "ec": "// ❌ 不规范命名\nclass student_manager { }  // 应改为StudentManager\nint Num = 150;             // 局部变量应改为num\nstring s = \"张三\";         // 应改为name\n// ✅ 规范命名\nclass StudentManager { }\nint num = 150;\nstring name = \"张三\";",
    "q": [
      {
        "q": "指出不规范命名：class user_info、int Num、interface repository",
        "a": "user_info→UserInfo(PascalCase无下划线)；Num→num(camelCase)；repository→IRepository(I前缀)"
      }
    ]
  },
  {
    "id": 5,
    "t": "基本数据类型",
    "p": [
      "整数类型：sbyte/byte(8位)、short/ushort(16位)、int/uint(32位)、long/ulong(64位)。",
      "浮点类型：float(7位精度,f后缀)、double(15位精度,默认)、decimal(28位精度,m后缀,适合财务计算)。",
      "布尔类型bool只有true/false两个值，不可用0/1替代。",
      "char单字符(单引号)、string字符串(双引号,引用类型)。",
      "值类型在栈上分配(int,double,bool,char,struct)，引用类型在堆上分配(string,object,class)。"
    ],
    "c": "using System;\nclass Program\n{\n    static void Main()\n    {\n        int age = 25;\n        long population = 7800000000L;\n        float price = 19.99f;\n        double pi = 3.14159265358979;\n        decimal money = 9999.99m;\n        bool isStudent = true;\n        char grade = 'A';\n        string name = \"张三\";\n        \n        Console.WriteLine($\"int占{sizeof(int)}字节\");\n        Console.WriteLine($\"{name}成绩{grade}，年龄{age}\");\n        Console.WriteLine($\"价格: {money:C}\");\n    }\n}",
    "et": "浮点后缀遗漏和精度问题",
    "ec": "float f = 3.14;   // ❌ 默认是double类型\nfloat f = 3.14f;  // ✅ 添加f后缀\ndouble a = 0.1 + 0.2;\nif(a == 0.3){}      // ❌ 精度问题\nif(Math.Abs(a - 0.3) < 0.0001){} // ✅ 比较差值",
    "q": [
      {
        "q": "存储商品价格应用什么类型？为什么？",
        "a": "使用decimal(后缀m)，因为float/double存在精度问题，decimal有28-29位精度专为财务计算设计。"
      }
    ]
  },
  {
    "id": 6,
    "t": "变量与常量",
    "p": [
      "变量声明：类型 变量名=值; 必须先声明后使用。",
      "var关键字：编译器自动推断类型，必须初始化，var x=10等同于int x=10。",
      "const：编译时常量，声明时必须赋值，不可修改，隐式静态。",
      "readonly：运行时常量，可在构造函数中赋值后不可修改。"
    ],
    "c": "using System;\nclass Config\n{\n    public const string AppName = \"MyApp\";\n    public readonly DateTime CreateTime;\n    \n    public Config() \n    { \n        CreateTime = DateTime.Now; \n    }\n}\nclass Program\n{\n    static void Main()\n    {\n        int count = 10;\n        var age = 25; \n        var message = \"Hello\";\n        const double PI = 3.14159;\n        \n        Console.WriteLine($\"应用名称: {Config.AppName}\");\n        Console.WriteLine($\"PI = {PI}\");\n    }\n}",
    "et": "var和const使用不当",
    "ec": "var x;          // ❌ var必须初始化\nvar x = 10;     // ✅\nconst int MAX;  // ❌ const必须赋初值\nconst int MAX = 100; // ✅\nMAX = 200;      // ❌ 常量不可修改",
    "q": [
      {
        "q": "const和readonly的区别？",
        "a": "const编译时确定值，隐式静态，声明时必须赋值；readonly运行时确定，可在构造函数中赋值，实例字段。"
      }
    ]
  },
  {
    "id": 7,
    "t": "类型转换",
    "p": [
      "隐式转换：小范围类型→大范围类型自动转换(int→long, float→double)，不会丢失精度。",
      "显式转换：(类型)值，大范围→小范围可能丢失精度或溢出。",
      "Convert类：Convert.ToInt32/ToString等，提供安全的类型转换方法。",
      "Parse/TryParse：字符串→数值转换，Parse失败抛出异常，TryParse返回bool更安全。"
    ],
    "c": "using System;\nclass Program\n{\n    static void Main()\n    {\n        int num = 100; \n        long bigNum = num; // 隐式转换\n        \n        double pi = 3.14; \n        int i = (int)pi; // 显式转换，i=3\n        \n        int converted = Convert.ToInt32(\"123\");\n        int parsed = int.Parse(\"456\");\n        \n        if (int.TryParse(\"abc\", out int result))\n            Console.WriteLine(result);\n        else\n            Console.WriteLine(\"解析失败\");\n    }\n}",
    "et": "无效字符串解析",
    "ec": "int n = int.Parse(\"hello\"); // ❌ 抛出FormatException\n// 正确：使用TryParse\nif(int.TryParse(\"hello\", out int r))\n    Console.WriteLine(r);\nelse \n    Console.WriteLine(\"无效数字\"); // ✅",
    "q": [
      {
        "q": "安全将字符串转整数，无效时提示用户",
        "a": "string input = Console.ReadLine();\nif(int.TryParse(input, out int num)) \n    Console.WriteLine(num);\nelse \n    Console.WriteLine(\"请输入有效数字\");"
      }
    ]
  },
  {
    "id": 8,
    "t": "运算符",
    "p": [
      "算术运算符：+ - * / %，整数除法会截断小数部分，注意溢出使用checked。",
      "关系运算符：== != > < >= <=，返回bool值，浮点类型不建议用==比较。",
      "逻辑运算符：&&(短路与)、||(短路或)、!(非)。",
      "赋值运算符：= += -= *= /= %= ??=，??空合并运算符，?.空条件运算符，?:三元运算符。"
    ],
    "c": "using System;\nclass Program\n{\n    static void Main()\n    {\n        int a = 17, b = 5;\n        Console.WriteLine($\"17/5={a/b}\");   // 3\n        Console.WriteLine($\"17%5={a%b}\");     // 2\n        \n        int x = 5;\n        Console.WriteLine($\"x++={x++}\"); // 5\n        Console.WriteLine($\"++x={++x}\"); // 7\n        \n        string category = 20 >= 18 ? \"成年\" : \"未成年\";\n        string name = null;\n        Console.WriteLine(name ?? \"匿名\");\n        \n        string s = null;\n        Console.WriteLine($\"长度:{s?.Length}\");\n    }\n}",
    "et": "整数除法丢失精度",
    "ec": "double r = 1 / 2;      // ❌ 结果是0\ndouble r = 1.0 / 2;    // ✅ 结果是0.5\ndouble r = (double)1 / 2; // ✅ 结果是0.5",
    "q": [
      {
        "q": "10/3和10.0/3的结果分别是什么？",
        "a": "10/3=3(整数除法截断)；10.0/3=3.333...(至少一个浮点操作数)。"
      }
    ]
  },
  {
    "id": 9,
    "t": "if-else语句",
    "p": [
      "语法：if(条件){}else{}，条件必须是bool类型，不能用整数。",
      "else if链：多条件依次判断，命中后跳过后续条件判断。",
      "嵌套if：if语句内部嵌套if语句，建议嵌套不超过3层。",
      "C#条件必须是bool：if(1)不允许，必须写成if(true)或if(condition)。"
    ],
    "c": "using System;\nclass Program\n{\n    static void Main()\n    {\n        int score = 85;\n        if(score >= 90) Console.WriteLine(\"优秀\");\n        else if(score >= 80) Console.WriteLine(\"良好\");\n        else if(score >= 60) Console.WriteLine(\"及格\");\n        else Console.WriteLine(\"不及格\");\n        \n        // 嵌套if示例\n        int age = 25; \n        bool hasLicense = true;\n        if(age >= 18)\n        {\n            if(hasLicense) Console.WriteLine(\"可驾驶\");\n            else Console.WriteLine(\"需考驾照\");\n        }\n    }\n}",
    "et": "条件使用非bool值",
    "ec": "int c = 5;\nif(c){}     // ❌ 不能用int作条件\nif(c = 5){}   // ❌ 这是赋值不是比较\nif(c > 0){}   // ✅ 比较返回bool\nif(c == 5){}  // ✅ 相等比较",
    "q": [
      {
        "q": "编写判断闰年的程序",
        "a": "int year = int.Parse(Console.ReadLine());\nif((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) \n    Console.WriteLine($\"{year}是闰年\");\nelse \n    Console.WriteLine($\"{year}不是闰年\");"
      }
    ]
  },
  {
    "id": 10,
    "t": "switch语句",
    "p": [
      "基本语法：switch(表达式){case值:break;default:break;}，每个case必须有break。",
      "支持的类型：int、string、enum、bool等。",
      "模式匹配(C#7+)：case when条件模式、case类型模式。",
      "switch表达式(C#8+)：value switch{模式=>结果,...}，更简洁的写法。"
    ],
    "c": "using System;\nclass Program\n{\n    static void Main()\n    {\n        string day = \"Monday\";\n        switch(day)\n        {\n            case \"Monday\": case \"Tuesday\": case \"Wednesday\":\n            case \"Thursday\": case \"Friday\":\n                Console.WriteLine(\"工作日\"); \n                break;\n            case \"Saturday\": case \"Sunday\":\n                Console.WriteLine(\"周末\"); \n                break;\n            default: \n                Console.WriteLine(\"无效\"); \n                break;\n        }\n        \n        int score = 85;\n        string grade = score switch\n        { \n            >= 90 => \"A\", \n            >= 80 => \"B\", \n            >= 70 => \"C\", \n            >= 60 => \"D\", \n            _ => \"F\" \n        };\n        Console.WriteLine($\"等级:{grade}\");\n    }\n}",
    "et": "case穿透缺少break",
    "ec": "switch(x)\n{\n    case 1: Console.WriteLine(\"一\"); // ❌ 缺少break会穿透\n    case 2: Console.WriteLine(\"二\"); break;\n}\n// 正确：合并case\ncase 1: case 2: Console.WriteLine(\"一或二\"); break; // ✅",
    "q": [
      {
        "q": "用switch表达式根据月份返回天数(2月按28天算)",
        "a": "int days = month switch{ 2 => 28, 4 or 6 or 9 or 11 => 30, _ => 31 };"
      }
    ]
  },
  {
    "id": 11,
    "t": "for循环",
    "p": [
      "语法：for(初始化;条件;迭代){}，三部分都可省略。",
      "执行流程：初始化→判断条件→执行循环体→迭代→判断条件→...",
      "嵌套for：二维遍历场景常用，注意性能影响。",
      "break跳出整个循环，continue跳过当前次迭代。"
    ],
    "c": "using System;\nclass Program\n{\n    static void Main()\n    {\n        int sum = 0;\n        for(int i = 1; i <= 10; i++) \n            sum += i;\n        Console.WriteLine($\"1-10和:{sum}\");\n        \n        // 九九乘法表\n        for(int i = 1; i <= 9; i++)\n        {\n            for(int j = 1; j <= i; j++)\n                Console.Write($\"{j}×{i}={i*j}\t\");\n            Console.WriteLine();\n        }\n        \n        for(int i = 1; i <= 10; i++)\n        {\n            if(i == 3) continue;\n            if(i == 8) break;\n            Console.Write(i + \" \"); // 1 2 4 5 6 7\n        }\n    }\n}",
    "et": "循环条件错误导致死循环",
    "ec": "for(int i = 0; i < 10; i--){} // ❌ i递减，永远小于10\nfor(int i = 0; i < 10; i++){} // ✅ i递增",
    "q": [
      {
        "q": "输出1-100中能被3整除但不能被5整除的数",
        "a": "for(int i = 1; i <= 100; i++)\n    if(i % 3 == 0 && i % 5 != 0)\n        Console.WriteLine(i);"
      }
    ]
  },
  {
    "id": 12,
    "t": "while与do-while",
    "p": [
      "while循环：先判断条件后执行，可能0次执行。",
      "do-while循环：先执行后判断条件，至少执行1次，末尾有分号。",
      "选择建议：确定至少执行一次用do-while，否则用while。",
      "常见用途：读取用户输入直到有效、游戏主循环等。"
    ],
    "c": "using System;\nclass Program\n{\n    static void Main()\n    {\n        // while猜数字游戏\n        int target = 42, guess;\n        while(true)\n        {\n            guess = int.Parse(Console.ReadLine());\n            if(guess == target)\n            {\n                Console.WriteLine(\"对了!\");\n                break;\n            }\n            else if(guess < target) \n                Console.WriteLine(\"太小\");\n            else \n                Console.WriteLine(\"太大\");\n        }\n        \n        // do-while：至少执行一次\n        int n;\n        do\n        {\n            Console.Write(\"输入正整数:\");\n            n = int.Parse(Console.ReadLine());\n        }\n        while(n <= 0);\n        Console.WriteLine($\"你输入:{n}\");\n    }\n}",
    "et": "忘记更新循环变量",
    "ec": "int i = 0;\nwhile(i < 10)\n{\n    Console.WriteLine(i);\n} // ❌ 死循环，缺少i++\n\nwhile(i < 10)\n{\n    Console.WriteLine(i);\n    i++;\n} // ✅",
    "q": [
      {
        "q": "用while计算1+2+...+n",
        "a": "int n = int.Parse(Console.ReadLine()), sum = 0, i = 1;\nwhile(i <= n)\n{\n    sum += i;\n    i++;\n}\nConsole.WriteLine($\"和:{sum}\");"
      }
    ]
  },
  {
    "id": 13,
    "t": "foreach循环",
    "p": [
      "语法：foreach(类型 变量 in 集合){}，自动遍历每个元素。",
      "适用范围：数组、List、Dictionary等实现IEnumerable接口的集合。",
      "只读特性：不能修改元素值(值类型)，不能增删集合元素。",
      "与for对比：更简洁安全，但无法获取索引。"
    ],
    "c": "using System;\nusing System.Collections.Generic;\nclass Program\n{\n    static void Main()\n    {\n        string[] fruits = {\"苹果\",\"香蕉\",\"橙子\"};\n        foreach(string f in fruits) \n            Console.WriteLine(f);\n        \n        List<int> scores = new List<int>{95, 88, 92};\n        int total = 0;\n        foreach(int s in scores) \n            total += s;\n        Console.WriteLine($\"平均:{(double)total/scores.Count:F1}\");\n        \n        var ages = new Dictionary<string, int>\n        {\n            {\"张三\", 20},\n            {\"李四\", 22}\n        };\n        foreach(var kv in ages) \n            Console.WriteLine($\"{kv.Key}:{kv.Value}岁\");\n    }\n}",
    "et": "foreach中修改集合",
    "ec": "List<int> nums = new List<int>{1, 2, 3, 4, 5};\nforeach(int n in nums) \n    if(n % 2 == 0) nums.Remove(n); // ❌ 抛出异常\n\n// 正确方法：RemoveAll\nnums.RemoveAll(n => n % 2 == 0); // ✅\n\n// 或使用倒序for循环\nfor(int i = nums.Count - 1; i >= 0; i--) \n    if(nums[i] % 2 == 0) nums.RemoveAt(i); // ✅",
    "q": [
      {
        "q": "foreach中能否修改集合元素？为什么？",
        "a": "不能修改值类型元素(迭代变量是只读副本)，也不能增删集合(会抛出InvalidOperationException)。需修改用for循环，需删除用RemoveAll或倒序for。"
      }
    ]
  },
  {
    "id": 14,
    "t": "一维数组",
    "p": [
      "声明方式：int[] arr = new int[5];或int[] arr = {1,2,3};数组大小固定。",
      "索引从0开始，越界访问抛出IndexOutOfRangeException。",
      "Array类静态方法：Sort/Reverse/IndexOf/Clear等。",
      "遍历方式：for(可用索引)或foreach(只读)。"
    ],
    "c": "using System;\nclass Program\n{\n    static void Main()\n    {\n        int[] arr = {85, 92, 76, 95, 88};\n        \n        Array.Sort(arr);\n        Console.WriteLine(\"排序:\" + string.Join(\",\", arr));\n        \n        Array.Reverse(arr);\n        Console.WriteLine(\"反转:\" + string.Join(\",\", arr));\n        \n        Console.WriteLine($\"92的索引:{Array.IndexOf(arr, 92)}\");\n        \n        int max = arr[0], min = arr[0], sum = 0;\n        foreach(int s in arr)\n        {\n            max = Math.Max(max, s);\n            min = Math.Min(min, s);\n            sum += s;\n        }\n        Console.WriteLine($\"最大:{max},最小:{min},平均:{(double)sum/arr.Length:F1}\");\n    }\n}",
    "et": "数组越界访问",
    "ec": "int[] arr = {1, 2, 3};\nConsole.WriteLine(arr[3]); // ❌ 越界，最大索引是2\n\nConsole.WriteLine(arr[arr.Length - 1]); // ✅ 获取最后一个元素\nConsole.WriteLine(arr[^1]); // ✅ C#8+支持从末尾索引",
    "q": [
      {
        "q": "输入5个整数，输出最大值、最小值和平均值",
        "a": "int[] nums = new int[5];\nfor(int i = 0; i < 5; i++) \n    nums[i] = int.Parse(Console.ReadLine());\nint mx = nums[0], mn = nums[0], s = 0;\nforeach(int x in nums)\n{\n    mx = Math.Max(mx, x);\n    mn = Math.Min(mn, x);\n    s += x;\n}\nConsole.WriteLine($\"最大:{mx},最小:{mn},平均:{(double)s/5}\");"
      }
    ]
  },
  {
    "id": 15,
    "t": "多维数组",
    "p": [
      "矩形数组：int[,] arr = new int[3,4];每行长度相同，用[,]访问。",
      "交错数组：int[][] arr = new int[3][];每行可不同长度，用[][]访问。",
      "GetLength(0)获取行数，GetLength(1)获取列数。",
      "遍历方式：嵌套for循环。"
    ],
    "c": "using System;\nclass Program\n{\n    static void Main()\n    {\n        int[,] matrix = {{1,2,3},{4,5,6},{7,8,9}};\n        Console.WriteLine($\"行:{matrix.GetLength(0)},列:{matrix.GetLength(1)}\");\n        \n        for(int i = 0; i < matrix.GetLength(0); i++)\n        {\n            for(int j = 0; j < matrix.GetLength(1); j++)\n                Console.Write($\"{matrix[i,j]}\t\");\n            Console.WriteLine();\n        }\n        \n        int[][] jagged = new int[3][];\n        jagged[0] = new int[]{1, 2}; \n        jagged[1] = new int[]{3, 4, 5}; \n        jagged[2] = new int[]{6};\n        \n        for(int i = 0; i < jagged.Length; i++)\n        {\n            for(int j = 0; j < jagged[i].Length; j++) \n                Console.Write(jagged[i][j] + \" \");\n            Console.WriteLine();\n        }\n    }\n}",
    "et": "混淆矩形和交错数组语法",
    "ec": "int[,] rect = new int[3, 4];\nrect[0][1] = 5; // ❌ 矩形数组不能用[][]访问\nrect[0, 1] = 5;  // ✅\n\nint[][] jagged = new int[3][];\njagged[0, 1] = 5;  // ❌ 交错数组不能用[,]访问\njagged[0][1] = 5; // ✅(需先初始化jagged[0])",
    "q": [
      {
        "q": "3x3矩阵计算主对角线元素之和",
        "a": "int[,] m = {{1,2,3},{4,5,6},{7,8,9}}; int s = 0;\nfor(int i = 0; i < 3; i++) \n    s += m[i, i];\nConsole.WriteLine($\"主对角线和:{s}\"); // 结果15"
      }
    ]
  },
  {
    "id": 16,
    "t": "字符串操作",
    "p": [
      "string不可变性：每次\"修改\"都会创建新字符串，频繁操作用StringBuilder。",
      "常用方法：Length, Substring, Split, Join, Replace, Trim, ToUpper/ToLower, Contains。",
      "比较方式：==值比较，Equals方法，CompareTo方法。",
      "StringBuilder：Append/Insert/Remove/Replace，频繁字符串拼接性能更优。",
      "格式化：$\"{value}\"插值，ToString(\"格式\")方法。"
    ],
    "c": "using System;\nusing System.Text;\nclass Program\n{\n    static void Main()\n    {\n        string s = \"  Hello, C# World!  \";\n        Console.WriteLine($\"长度:{s.Length}\");\n        Console.WriteLine($\"Trim:'{s.Trim()}'\");\n        Console.WriteLine($\"大写:{s.ToUpper()}\");\n        Console.WriteLine($\"包含C#:{s.Contains(\"C#\")}\");\n        Console.WriteLine($\"子串:{s.Substring(4, 5)}\");\n        \n        string[] fruits = \"苹果,香蕉,橙子\".Split(',');\n        Console.WriteLine(string.Join(\" | \", fruits));\n        Console.WriteLine(s.Replace(\"C#\", \"CSharp\"));\n        \n        StringBuilder sb = new StringBuilder();\n        for(int i = 0; i < 1000; i++) \n            sb.Append($\"行{i},\");\n        \n        Console.WriteLine($\"{99.9:C}\"); // ¥99.90\n    }\n}",
    "et": "循环中用+拼接字符串",
    "ec": "string s = \"\";\nfor(int i = 0; i < 10000; i++) \n    s += i; // ❌ 创建10000个临时对象，性能差\n\nStringBuilder sb = new StringBuilder();\nfor(int i = 0; i < 10000; i++) \n    sb.Append(i); // ✅ 性能优异\nstring result = sb.ToString();",
    "q": [
      {
        "q": "统计句子中每个单词出现次数",
        "a": "var words = \"hello world hello csharp\".Split(\" \");\nvar count = new Dictionary<string, int>();\nforeach(var w in words)\n    count[w] = count.GetValueOrDefault(w, 0) + 1;\nforeach(var kv in count) \n    Console.WriteLine($\"{kv.Key}:{kv.Value}次\");"
      }
    ]
  },
  {
    "id": 17,
    "t": "方法定义",
    "p": [
      "声明语法：访问修饰符 返回类型 方法名(参数列表){方法体}。",
      "参数传递：值参数(默认)、ref引用参数、out输出参数、params可变参数。",
      "return语句返回结果，void表示无返回值。",
      "递归：方法调用自身，必须有终止条件。"
    ],
    "c": "using System;\nclass Calculator\n{\n    public int Add(int a, int b) => a + b;\n    \n    public void Swap(ref int a, ref int b)\n    {\n        int temp = a;\n        a = b;\n        b = temp;\n    }\n    \n    public void Divide(int a, int b, out int quotient, out int remainder)\n    {\n        quotient = a / b;\n        remainder = a % b;\n    }\n    \n    public int Sum(params int[] nums)\n    {\n        int total = 0;\n        foreach(int n in nums) \n            total += n;\n        return total;\n    }\n    \n    public long Factorial(int n) => n <= 1 ? 1 : n * Factorial(n - 1);\n}\nclass Program\n{\n    static void Main()\n    {\n        var calc = new Calculator();\n        Console.WriteLine(calc.Add(3, 5));\n        \n        int x = 10, y = 20;\n        calc.Swap(ref x, ref y);\n        Console.WriteLine($\"x={x},y={y}\");\n        \n        calc.Divide(17, 5, out int q, out int r);\n        Console.WriteLine($\"17÷5={q}余{r}\");\n        \n        Console.WriteLine(calc.Sum(1, 2, 3, 4, 5));\n        Console.WriteLine($\"5!={calc.Factorial(5)}\");\n    }\n}",
    "et": "ref/out参数未初始化",
    "ec": "int a; // 未赋值\ncalc.Swap(ref a, ref b); // ❌ ref参数必须先初始化\n\nint a = 10; // ✅\ncalc.Swap(ref a, ref b);\n\n// out参数不需要预先初始化\ncalc.Divide(17, 5, out int q, out int r); // ✅",
    "q": [
      {
        "q": "ref和out参数的区别",
        "a": "ref调用前必须初始化，方法内可不修改；out调用前不需要初始化，方法内必须赋值。ref双向传递，out主要用于返回多个值。"
      }
    ]
  },
  {
    "id": 18,
    "t": "方法重载",
    "p": [
      "重载概念：同名方法，参数列表不同(类型/数量/顺序)，与返回类型无关。",
      "编译器根据调用时的参数选择最匹配的版本。",
      "常见场景：同一操作支持不同参数类型、不同参数数量。",
      "ref/out也构成重载差异。"
    ],
    "c": "using System;\nclass Printer\n{\n    public void Print(int v) \n    { \n        Console.WriteLine($\"整数:{v}\"); \n    }\n    \n    public void Print(double v) \n    { \n        Console.WriteLine($\"浮点:{v:F2}\"); \n    }\n    \n    public void Print(string v) \n    { \n        Console.WriteLine($\"字符串:{v}\"); \n    }\n    \n    public int Max(int a, int b) => a > b ? a : b;\n    \n    public int Max(int a, int b, int c) => Max(Max(a, b), c);\n}\nclass Program\n{\n    static void Main()\n    {\n        var p = new Printer();\n        p.Print(42); \n        p.Print(3.14); \n        p.Print(\"Hello\");\n        \n        Console.WriteLine(new Printer().Max(3, 5));\n        Console.WriteLine(new Printer().Max(3, 5, 8));\n    }\n}",
    "et": "仅返回类型不同的重载",
    "ec": "int GetValue() { return 1; }\ndouble GetValue() { return 1.0; } // ❌ 仅返回类型不同不构成重载\n\nint GetValue(int x) { return x; } // ✅ 参数列表不同\ndouble GetValue(double x) { return x; } // ✅ 参数列表不同",
    "q": [
      {
        "q": "void Set(int x)和int Set(int x)是否合法重载？",
        "a": "不合法，仅返回类型不同不构成重载，编译器无法根据返回类型区分调用。"
      }
    ]
  },
  {
    "id": 19,
    "t": "可选与命名参数",
    "p": [
      "可选参数：声明时指定默认值，如void Foo(int x, int y = 10)。",
      "命名参数：调用时使用参数名:值形式，可按任意顺序传递。",
      "可选参数必须在必选参数之后，默认值必须是编译时常量。",
      "命名参数可跳过可选参数，提高代码可读性。"
    ],
    "c": "using System;\nclass Config\n{\n    public void Create(string name, string ext = \".txt\", bool overwrite = false)\n    {\n        Console.WriteLine($\"创建:{name}{ext},覆盖:{overwrite}\");\n    }\n}\nclass Program\n{\n    static void Main()\n    {\n        var c = new Config();\n        c.Create(\"data\");                    // data.txt,覆盖:False\n        c.Create(\"log\", \".log\");              // log.log,覆盖:False\n        c.Create(\"config\", overwrite: true);    // config.txt,覆盖:True\n        c.Create(ext: \".tmp\", name: \"cache\");    // cache.tmp,覆盖:False\n    }\n}",
    "et": "可选参数在必选参数之前",
    "ec": "void Foo(int x = 1, int y) {} // ❌ 可选参数不能在必选参数之前\nvoid Foo(int y, int x = 1) {} // ✅\n\nFoo(10);     // y=10, x=1\nFoo(10, 20);  // y=10, x=20",
    "q": [
      {
        "q": "Foo(int a, int b = 5, int c = 10)只传a和c=20怎么写？",
        "a": "Foo(a: 1, c: 20); 或 Foo(1, c: 20); b使用默认值5。"
      }
    ]
  },
  {
    "id": 20,
    "t": "类与对象",
    "p": [
      "类是蓝图/模板，对象是类的实例，使用new关键字创建。",
      "访问修饰符：public(公开)/private(私有)/protected(受保护)/internal(内部)。",
      "字段(存储数据，通常private)vs属性(受控访问，get/set)。",
      "this关键字：引用当前实例，区分同名参数。"
    ],
    "c": "using System;\nclass Person\n{\n    private string _name; \n    private int _age;\n    \n    public string Name\n    { \n        get => _name; \n        set => _name = value; \n    }\n    \n    public int Age\n    { \n        get => _age; \n        set \n        { \n            if(value >= 0 && value <= 150) \n                _age = value; \n            else \n                Console.WriteLine(\"年龄无效\"); \n        } \n    }\n    \n    public Person(string name, int age)\n    {\n        _name = name;\n        _age = age;\n    }\n    \n    public void Introduce() => Console.WriteLine($\"我叫{_name}，{_age}岁\");\n}\nclass Program\n{\n    static void Main()\n    {\n        var p = new Person(\"张三\", 25);\n        p.Introduce();\n        \n        p.Age = -5; // 年龄无效\n        p.Name = \"李四\"; \n        p.Introduce();\n    }\n}",
    "et": "直接暴露public字段",
    "ec": "class Person { public int Age; } // ❌ 无验证逻辑\nPerson p = new Person(); \np.Age = -100; // 可赋任意值\n\nclass Person \n{ \n    private int _age; // ✅ 使用私有字段+属性\n    public int Age\n    { \n        get => _age; \n        set \n        { \n            if(value >= 0) \n                _age = value; \n        } \n    } \n}",
    "q": [
      {
        "q": "类和对象的关系？如何创建对象？",
        "a": "类是模板/蓝图，对象是类的实例。使用new关键字创建：Person p = new Person(\"张三\", 25);"
      }
    ]
  },
  {
    "id": 21,
    "t": "属性(Property)",
    "p": [
      "自动属性：public string Name { get; set; }编译器自动生成私有字段。",
      "只读属性：只有get访问器或get+init访问器。",
      "init访问器(C#9+)：只在初始化时赋值，之后不可修改。",
      "表达式体属性：public string Info => $\"{Name}({Id})\";"
    ],
    "c": "using System;\nclass Student\n{\n    public string Name { get; set; }\n    public int Id { get; set; }\n    public DateTime EnrollDate { get; } = DateTime.Now;\n    public string Major { get; init; }\n    public string Info => $\"{Name}(ID:{Id})\";\n    \n    private double _score;\n    public double Score\n    { \n        get => _score; \n        set => _score = value >= 0 && value <= 100 ? value : throw new ArgumentException(); \n    }\n}\nclass Program\n{\n    static void Main()\n    {\n        var s = new Student { Name = \"张三\", Id = 1001, Major = \"计算机\" };\n        s.Score = 95;\n        // s.Major = \"数学\"; // ❌ init访问器不可再赋值\n        Console.WriteLine(s.Info);\n    }\n}",
    "et": "类外修改只读属性",
    "ec": "var s = new Student();\ns.EnrollDate = DateTime.Now; // ❌ 只读属性不可赋值\n\npublic DateTime EnrollDate { get; } = DateTime.Now; // ✅ 声明时赋值",
    "q": [
      {
        "q": "get/set、get/init、只有get各适用什么场景？",
        "a": "get/set：可读写随时修改；get/init：初始化后不可变，适合配置项；只有get：完全只读，构造/声明时确定。"
      }
    ]
  },
  {
    "id": 22,
    "t": "构造函数",
    "p": [
      "构造函数：与类同名无返回类型，new创建对象时自动调用用于初始化。",
      "不定义构造函数时编译器生成无参默认构造函数，自定义后不再生成。",
      "构造函数链：this()调用其他构造函数减少重复代码。",
      "静态构造函数：static修饰，只执行一次，用于初始化静态成员。"
    ],
    "c": "using System;\nclass Rectangle\n{\n    public double Width { get; set; } \n    public double Height { get; set; }\n    public static int Count { get; private set; }\n    \n    public Rectangle() : this(1, 1) { }\n    public Rectangle(double side) : this(side, side) { }\n    public Rectangle(double w, double h)\n    {\n        Width = w;\n        Height = h;\n        Count++;\n    }\n    \n    static Rectangle()\n    {\n        Count = 0;\n        Console.WriteLine(\"静态构造执行\");\n    }\n    \n    public double Area() => Width * Height;\n}\nclass Program\n{\n    static void Main()\n    {\n        var r1 = new Rectangle();\n        var r2 = new Rectangle(5);\n        var r3 = new Rectangle(4, 6);\n        \n        Console.WriteLine($\"r1:{r1.Area()},r2:{r2.Area()},r3:{r3.Area()}\");\n        Console.WriteLine($\"创建了{Rectangle.Count}个矩形\");\n    }\n}",
    "et": "定义有参构造后无参构造消失",
    "ec": "class Foo { public Foo(int x) {} }\nvar f = new Foo(); // ❌ 无参构造函数不存在\n\npublic Foo() {} // ✅ 显式定义无参构造\nvar f = new Foo(0); // ✅ 使用已有构造",
    "q": [
      {
        "q": "什么是构造函数链？好处？",
        "a": "一个构造函数调用另一个(用:this())，避免重复代码，初始化逻辑集中在主构造函数。"
      }
    ]
  },
  {
    "id": 23,
    "t": "继承",
    "p": [
      "语法：class 子类:父类{}，C#只支持单继承，可实现多个接口。",
      "virtual/override：父类用virtual标记，子类用override重写，实现运行时多态。",
      "base关键字：调用父类构造函数base()、访问父类成员base.Method()。",
      "sealed：密封类不可继承，密封方法不可再被重写。"
    ],
    "c": "using System;\nclass Animal\n{\n    public string Name { get; set; }\n    \n    public Animal(string name) => Name = name;\n    \n    public virtual void Speak() => Console.WriteLine($\"{Name}发出声音\");\n}\nclass Dog : Animal\n{\n    public Dog(string name) : base(name) { }\n    \n    public override void Speak() => Console.WriteLine($\"{Name}:汪汪！\");\n    \n    public void Fetch() => Console.WriteLine($\"{Name}捡球\");\n}\nclass Cat : Animal\n{\n    public Cat(string name) : base(name) { }\n    \n    public override void Speak() => Console.WriteLine($\"{Name}:喵~\");\n}\nclass Program\n{\n    static void Main()\n    {\n        Animal[] zoo = { new Dog(\"旺财\"), new Cat(\"咪咪\") };\n        foreach(var a in zoo) \n            a.Speak(); // 多态：调用实际类型的方法\n    }\n}",
    "et": "重写时不用override",
    "ec": "class Dog : Animal\n{\n    public void Speak() {} // ❌ 隐藏而非重写，无override\n}\n\npublic override void Speak() {} // ✅ 多态生效\n\npublic new void Speak() {} // 不推荐，父类引用无法调用",
    "q": [
      {
        "q": "override和new的区别？",
        "a": "override重写虚方法，父类引用调用时执行子类版本(多态)；new隐藏父类方法，父类引用仍执行父类版本。应优先使用override。"
      }
    ]
  },
  {
    "id": 24,
    "t": "多态",
    "p": [
      "多态概念：同一接口不同实现，通过virtual/override/abstract实现运行时多态。",
      "向上转型：子类→父类，自动且安全。",
      "向下转型：父类→子类，需(Dog)a或a as Dog，可能失败。",
      "is/as模式匹配：is判断类型，as尝试转换，C#7+支持is Type var语法。"
    ],
    "c": "using System;\nabstract class Shape\n{ \n    public abstract double Area(); \n}\n\nclass Circle : Shape\n{ \n    public double Radius { get; set; } \n    public Circle(double r) => Radius = r; \n    public override double Area() => Math.PI * Radius * Radius; \n}\n\nclass Rectangle : Shape\n{ \n    public double Width, Height; \n    public Rectangle(double w, double h) { Width = w; Height = h; } \n    public override double Area() => Width * Height; \n}\n\nclass Program\n{\n    static void Main()\n    {\n        Shape[] shapes = { new Circle(5), new Rectangle(4, 6) };\n        \n        foreach(Shape sh in shapes)\n        {\n            Console.WriteLine($\"{sh.GetType().Name}面积:{sh.Area():F2}\");\n            if(sh is Circle c) \n                Console.WriteLine($\"  半径:{c.Radius}\");\n        }\n    }\n}",
    "et": "向下转型不检查类型",
    "ec": "Shape s = new Circle(5);\nRectangle r = (Rectangle)s; // ❌ InvalidCastException\n\nif(s is Rectangle) \n    r = (Rectangle)s; // ✅\n\nRectangle r2 = s as Rectangle; \nif(r2 != null) {} // ✅\n\nif(s is Rectangle r3) {} // ✅ 模式匹配推荐写法",
    "q": [
      {
        "q": "什么是多态？C#如何实现？",
        "a": "同一操作对不同对象产生不同行为。通过virtual/override实现：父类声明virtual，子类override重写，父类引用调用时执行子类版本。"
      }
    ]
  },
  {
    "id": 25,
    "t": "抽象类",
    "p": [
      "abstract修饰，不能实例化，可包含抽象方法和具体方法。",
      "抽象方法只有声明无实现，子类必须override实现。",
      "vs接口：抽象类可有字段和实现，单继承；接口只定义契约，多实现。",
      "设计选择：is-a关系+共享代码用抽象类，定义能力用接口。"
    ],
    "c": "using System;\nabstract class Shape\n{\n    public string Color { get; set; } = \"白色\";\n    \n    public abstract double Area();\n    public abstract double Perimeter();\n    \n    public void Display() => Console.WriteLine($\"{GetType().Name}({Color}):面积={Area():F2},周长={Perimeter():F2}\");\n}\nclass Circle : Shape\n{\n    public double Radius;\n    public Circle(double r) => Radius = r;\n    \n    public override double Area() => Math.PI * Radius * Radius;\n    public override double Perimeter() => 2 * Math.PI * Radius;\n}\nclass Program\n{\n    static void Main()\n    {\n        Shape c = new Circle { Radius = 5, Color = \"红\" };\n        c.Display();\n    }\n}",
    "et": "抽象类实例化或子类未实现抽象方法",
    "ec": "var s = new Shape(); // ❌ 抽象类不能实例化\n\nclass Bad : Shape \n{ \n    public override double Area() => 0; \n} // ❌ 缺少Perimeter实现\n\nclass Good : Shape \n{ \n    public override double Area() => 0; \n    public override double Perimeter() => 0; \n} // ✅",
    "q": [
      {
        "q": "抽象类和接口核心区别？何时用抽象类？",
        "a": "抽象类可有字段和实现(单继承)，接口只定义签名无实现(多实现)。有is-a关系且子类共享代码用抽象类；定义能力契约或需多继承用接口。"
      }
    ]
  },
  {
    "id": 26,
    "t": "接口",
    "p": [
      "interface IName { void Method(); }，成员默认public无实现(C#8前)。",
      "多接口实现：class Bat : IMammal, IFlyable {}弥补单继承限制。",
      "C#8+默认实现：接口可提供方法默认实现。",
      "vs抽象类：接口=能做什么(能力)，抽象类=是什么(本质)。"
    ],
    "c": "using System;\ninterface IDrawable { void Draw(); }\ninterface IResizable { void Resize(double factor); }\ninterface IColorable { string Color { get; set; } }\n\nclass Rectangle : IDrawable, IResizable, IColorable\n{\n    public double Width { get; set; } \n    public double Height { get; set; } \n    public string Color { get; set; } = \"黑\";\n    \n    public void Draw() => Console.WriteLine($\"绘制{Color}矩形({Width}x{Height})\");\n    \n    public void Resize(double factor)\n    {\n        Width *= factor;\n        Height *= factor;\n    }\n}\nclass Program\n{\n    static void Main()\n    {\n        var r = new Rectangle { Width = 10, Height = 5, Color = \"红\" };\n        r.Draw(); \n        r.Resize(2); \n        r.Draw();\n        \n        IDrawable d = r; \n        d.Draw();\n        \n        if(r is IColorable c) \n            Console.WriteLine(c.Color);\n    }\n}",
    "et": "接口实例化或未实现所有成员",
    "ec": "IDrawable d = new IDrawable(); // ❌ 接口不能实例化\n\nclass Bad : IDrawable \n{ \n    public void Draw() {} \n} // ✅ 实现了IDrawable\n\nclass Bad2 : IDrawable, IResizable \n{ \n    public void Draw() {} \n    /* 缺少Resize方法 ❌ */ \n}",
    "q": [
      {
        "q": "一个类能继承几个类？实现几个接口？",
        "a": "只能继承1个类(单继承)，可实现多个接口。禁止多类继承避免菱形继承问题，多接口无此问题因为接口无实现。"
      }
    ]
  },
  {
    "id": 27,
    "t": "泛型",
    "p": [
      "泛型类：class Stack<T>{}，T是类型参数，使用时Stack<int>。",
      "泛型方法：void Swap<T>(ref T a, ref T b)。",
      "泛型约束where T:struct/class/new()/基类/接口。",
      "优势：类型安全、代码复用、无装箱开销。"
    ],
    "c": "using System;\nclass Stack<T>\n{\n    private T[] _items; \n    private int _top = -1;\n    \n    public Stack(int capacity = 10) \n    { \n        _items = new T[capacity]; \n    }\n    \n    public void Push(T item)\n    {\n        if(_top == _items.Length - 1) \n            Array.Resize(ref _items, _items.Length * 2);\n        _items[++_top] = item;\n    }\n    \n    public T Pop() => _top >= 0 ? _items[_top--] : throw new InvalidOperationException(\"栈空\");\n    \n    public int Count => _top + 1;\n}\n\nstatic class Utils\n{\n    public static T Max<T>(T a, T b) where T : IComparable<T>\n        => a.CompareTo(b) >= 0 ? a : b;\n}\n\nclass Program\n{\n    static void Main()\n    {\n        var s = new Stack<int>();\n        s.Push(10);\n        s.Push(20);\n        Console.WriteLine(s.Pop());\n        \n        Console.WriteLine(Utils.Max(3, 7)); \n        Console.WriteLine(Utils.Max(\"abc\", \"xyz\"));\n    }\n}",
    "et": "泛型类型未满足约束",
    "ec": "class Factory<T> where T : new() \n{ \n    public T Create() => new T(); \n}\n\nvar f = new Factory<string>(); // ✅ string有无参构造函数\nvar f2 = new Factory<Shape>(); // ❌ 抽象类不满足new()约束",
    "q": [
      {
        "q": "三种常用泛型约束及作用",
        "a": "where T:struct 限制值类型；where T:class 限制引用类型；where T:new() 限制有无参构造函数，可new T()。"
      }
    ]
  },
  {
    "id": 28,
    "t": "List集合",
    "p": [
      "List<T>：动态数组，自动扩容，最常用的泛型集合。",
      "常用方法：Add/AddRange/Insert/Remove/RemoveAt/Contains/IndexOf/Sort/Find。",
      "遍历方式：for(可索引修改)/foreach(只读)/ForEach方法。",
      "Capacity(内部数组大小)vs Count(实际元素数)。"
    ],
    "c": "using System; \nusing System.Collections.Generic;\nclass Program\n{\n    static void Main()\n    {\n        var nums = new List<int>{5, 3, 8, 1, 9};\n        \n        nums.Add(7); \n        nums.AddRange(new[]{2, 6});\n        nums.Insert(0, 0); \n        nums.Remove(8); \n        nums.RemoveAt(0);\n        \n        Console.WriteLine($\"含5:{nums.Contains(5)}\");\n        \n        int first = nums.Find(n => n > 6);\n        var bigs = nums.FindAll(n => n > 5);\n        \n        nums.Sort(); \n        nums.Reverse();\n        \n        Console.WriteLine(string.Join(\",\", nums));\n        nums.ForEach(n => Console.Write(n + \" \"));\n        Console.WriteLine($\"\nCount:{nums.Count},Cap:{nums.Capacity}\");\n    }\n}",
    "et": "遍历时删除元素",
    "ec": "foreach(var n in nums) \n    if(n < 5) nums.Remove(n); // ❌ 抛出异常\n\nnums.RemoveAll(n => n < 5); // ✅\n\nfor(int i = nums.Count - 1; i >= 0; i--) \n    if(nums[i] < 5) nums.RemoveAt(i); // ✅",
    "q": [
      {
        "q": "Capacity和Count区别？何时关注Capacity？",
        "a": "Count是实际元素数，Capacity是内部数组容量。频繁添加时Capacity成倍增长导致内存分配，预知大小可指定初始容量减少扩容次数。"
      }
    ]
  },
  {
    "id": 29,
    "t": "Dictionary集合",
    "p": [
      "Dictionary<TKey,TValue>：键值对集合，键唯一，查找O(1)。",
      "增删改：dict[key]=value添加/修改，Add添加(存在抛异常)，Remove删除。",
      "安全获取：TryGetValue、ContainsKey、GetValueOrDefault。",
      "遍历：foreach遍历KeyValuePair，Keys属性，Values属性。"
    ],
    "c": "using System; \nusing System.Collections.Generic;\nclass Program\n{\n    static void Main()\n    {\n        var scores = new Dictionary<string, int>\n        {\n            {\"张三\", 95},\n            {\"李四\", 88}\n        };\n        \n        scores[\"王五\"] = 92; \n        scores.Add(\"赵六\", 85); \n        scores[\"张三\"] = 98; // 修改\n        \n        if(scores.TryGetValue(\"钱七\", out int v)) \n            Console.WriteLine(v);\n        else \n            Console.WriteLine(\"不存在\");\n        \n        Console.WriteLine($\"含张三:{scores.ContainsKey(\"张三\")}\");\n        \n        scores.Remove(\"李四\");\n        \n        foreach(var kv in scores) \n            Console.WriteLine($\"{kv.Key}:{kv.Value}分\");\n        \n        Console.WriteLine(string.Join(\",\", scores.Keys));\n        Console.WriteLine(string.Join(\",\", scores.Values));\n    }\n}",
    "et": "访问不存在的键",
    "ec": "var d = new Dictionary<string, int>(); \nd[\"张三\"] = 90;\n\nint v = d[\"李四\"]; // ❌ KeyNotFoundException\n\nif(d.TryGetValue(\"李四\", out int v2)) {} // ✅\n\nint v3 = d.GetValueOrDefault(\"李四\", 0); // ✅",
    "q": [
      {
        "q": "Dictionary查找为何O(1)？何时退化为O(n)？",
        "a": "内部使用哈希表通过键的哈希值直接定位。大量哈希冲突时退化为O(n)，好的哈希函数和合理容量可避免。"
      }
    ]
  },
  {
    "id": 30,
    "t": "异常处理",
    "p": [
      "try-catch-finally：try放置可能异常的代码，catch捕获处理，finally必定执行。",
      "异常层次：Exception→SystemException→具体异常(DivideByZeroException等)。",
      "自定义异常：继承Exception类，提供构造函数。",
      "最佳实践：不吞异常、最小化try范围、具体catch在前、finally释放资源。"
    ],
    "c": "using System;\nclass InvalidAgeException : Exception\n{\n    public InvalidAgeException(string message) : base(message) { }\n}\n\nclass Person\n{\n    private int _age;\n    \n    public int Age\n    { \n        get => _age; \n        set \n        { \n            if(value < 0 || value > 150) \n                throw new InvalidAgeException($\"年龄{value}无效\"); \n            _age = value; \n        } \n    }\n}\n\nclass Program\n{\n    static void Main()\n    {\n        try\n        {\n            var p = new Person();\n            p.Age = 200;\n        }\n        catch(InvalidAgeException ex)\n        {\n            Console.WriteLine($\"自定义异常:{ex.Message}\");\n        }\n        catch(Exception ex)\n        {\n            Console.WriteLine($\"其他错误:{ex.Message}\");\n        }\n        finally\n        {\n            Console.WriteLine(\"无论如何执行\");\n        }\n    }\n}",
    "et": "空catch块吞异常",
    "ec": "try { int r = 10 / 0; } catch(Exception) {} // ❌ 异常被吞掉\n\ntry { int r = 10 / 0; }\ncatch(Exception ex)\n{ \n    Console.WriteLine(ex.Message); \n    throw; \n} // ✅ 记录并重抛",
    "q": [
      {
        "q": "finally何时执行？有什么用？",
        "a": "无论是否发生异常都执行，通常用于资源清理(关闭文件、释放数据库连接)。即使try中有return语句也会执行。"
      }
    ]
  },
  {
    "id": 31,
    "t": "文件操作",
    "p": [
      "System.IO命名空间：File、Directory、Path、StreamReader/StreamWriter。",
      "File类：ReadAllText/WriteAllText/ReadAllLines/WriteAllLines/Copy/Move/Delete。",
      "StreamReader/StreamWriter：流式读写，using语句自动释放资源。",
      "Directory类：CreateDirectory/GetFiles/GetDirectories/Delete/Exists。"
    ],
    "c": "using System; \nusing System.IO;\nclass Program\n{\n    static void Main()\n    {\n        string path = \"test.txt\";\n        \n        File.WriteAllText(path, \"Hello,文件操作！\");\n        Console.WriteLine(File.ReadAllText(path));\n        \n        File.WriteAllLines(\"lines.txt\", new[]{\"第一行\", \"第二行\", \"第三行\"});\n        foreach(string line in File.ReadAllLines(\"lines.txt\")) \n            Console.WriteLine(line);\n        \n        using(var w = new StreamWriter(\"stream.txt\"))\n        {\n            w.WriteLine(\"流式写入1\");\n            w.WriteLine(\"流式写入2\");\n        }\n        \n        using(var r = new StreamReader(\"stream.txt\"))\n        {\n            string line;\n            while((line = r.ReadLine()) != null)\n                Console.WriteLine(line);\n        }\n        \n        Directory.CreateDirectory(\"MyDir\");\n        foreach(string f in Directory.GetFiles(\".\")) \n            Console.WriteLine(f);\n    }\n}",
    "et": "忘记关闭流",
    "ec": "StreamWriter w = new StreamWriter(\"f.txt\");\nw.WriteLine(\"Hello\"); // ❌ 忘记Close/Dispose\n\nusing(var w = new StreamWriter(\"f.txt\"))\n{\n    w.WriteLine(\"Hello\");\n} // ✅ 自动Dispose",
    "q": [
      {
        "q": "using语句的作用？",
        "a": "确保IDisposable对象使用后自动调用Dispose()释放资源，即使发生异常。等价于try-finally结构。"
      }
    ]
  },
  {
    "id": 32,
    "t": "LINQ基础",
    "p": [
      "LINQ：Language Integrated Query，语言集成查询，统一查询语法。",
      "查询语法：from x in collection where条件 select x，类似SQL。",
      "方法语法：collection.Where(x=>条件).Select(x=>投影)，更灵活。",
      "需要using System.Linq;，两种语法功能等价。"
    ],
    "c": "using System; \nusing System.Linq; \nusing System.Collections.Generic;\nclass Program\n{\n    static void Main()\n    {\n        var nums = new List<int>{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};\n        \n        // 查询语法\n        var even = from n in nums where n % 2 == 0 select n;\n        \n        // 方法语法\n        var odd = nums.Where(n => n % 2 != 0);\n        \n        Console.WriteLine(\"偶数:\" + string.Join(\",\", even));\n        Console.WriteLine(\"奇数:\" + string.Join(\",\", odd));\n        \n        var fruits = new[]{\"apple\", \"banana\", \"orange\", \"grape\", \"mango\"};\n        var shortFruits = fruits.Where(f => f.Length <= 5);\n        var sorted = fruits.OrderBy(f => f.Length);\n        var upper = fruits.Select(f => f.ToUpper());\n        \n        Console.WriteLine($\"总和:{nums.Sum()},平均:{nums.Average():F1}\");\n        Console.WriteLine($\"最大:{nums.Max()},最小:{nums.Min()}\");\n    }\n}",
    "et": "忘记using System.Linq",
    "ec": "using System;\nvar r = nums.Where(n => n > 1); // ❌ 缺少Linq命名空间\n\nusing System.Linq; // ✅ 添加后Where等方法可用",
    "q": [
      {
        "q": "查询语法和方法语法的区别？",
        "a": "查询语法类似SQL可读性好；方法语法使用Lambda更灵活。功能等价，编译器将查询语法转换为方法调用。"
      }
    ]
  },
  {
    "id": 33,
    "t": "LINQ进阶",
    "p": [
      "GroupBy：按指定键分组，返回IGrouping<TKey,TElement>。",
      "Join：内连接，类似SQL JOIN。",
      "OrderBy/ThenBy：多级排序。",
      "SelectMany：扁平化解嵌套集合。",
      "聚合函数：Sum/Average/Count/Max/Min。"
    ],
    "c": "using System; \nusing System.Linq; \nusing System.Collections.Generic;\nclass Program\n{\n    static void Main()\n    {\n        var students = new[]\n        {\n            new { Name = \"张三\", Major = \"计算机\", Score = 95 },\n            new { Name = \"李四\", Major = \"数学\", Score = 88 },\n            new { Name = \"王五\", Major = \"计算机\", Score = 92 },\n            new { Name = \"赵六\", Major = \"数学\", Score = 85 }\n        };\n        \n        // 分组\n        var grouped = students.GroupBy(s => s.Major);\n        foreach(var group in grouped)\n        {\n            Console.WriteLine($\"{group.Key}:\");\n            foreach(var s in group)\n                Console.WriteLine($\"  {s.Name}\");\n        }\n        \n        // 排序\n        var sorted = students.OrderByDescending(s => s.Score).ThenBy(s => s.Name);\n        \n        // 投影\n        var names = students.Select(s => s.Name);\n        \n        // 统计\n        var avgScore = students.Where(s => s.Major == \"计算机\").Average(s => s.Score);\n        Console.WriteLine($\"计算机平均分:{avgScore:F1}\");\n    }\n}",
    "et": "LINQ延迟执行",
    "ec": "var result = nums.Where(n => n > 5);\nnums.Add(100); // ❌ 修改原集合影响查询结果\n// 如果需要立即执行\nvar list = nums.Where(n => n > 5).ToList(); // ✅ 立即执行",
    "q": [
      {
        "q": "LINQ的延迟执行是什么？",
        "a": "查询定义时不执行，实际枚举时才执行。好处是可组合多个操作，只在需要时才遍历数据源。"
      }
    ]
  },
  {
    "id": 34,
    "t": "异步编程",
    "p": [
      "async/await：简化异步代码编写，避免回调地狱。",
      "Task<T>：表示异步操作，返回值；Task：无返回值。",
      "await：等待异步操作完成，释放线程。",
      "异步方法命名约定：方法名以Async结尾。"
    ],
    "c": "using System; \nusing System.Threading.Tasks;\nclass Program\n{\n    static async Task Main()\n    {\n        Console.WriteLine(\"开始异步操作...\");\n        \n        string result = await FetchDataAsync();\n        Console.WriteLine($\"获取数据: {result}\");\n        \n        await ProcessAsync();\n        \n        Console.WriteLine(\"异步操作完成\");\n    }\n    \n    static async Task<string> FetchDataAsync()\n    {\n        await Task.Delay(1000); // 模拟网络延迟\n        return \"Hello Async\";\n    }\n    \n    static async Task ProcessAsync()\n    {\n        await Task.Run(() => \n        {\n            for(int i = 0; i < 5; i++)\n            {\n                Console.WriteLine($\"处理 {i+1}/5\");\n                System.Threading.Thread.Sleep(200);\n            }\n        });\n    }\n}",
    "et": "同步方法调用异步方法",
    "ec": "static void Main()\n{\n    FetchDataAsync(); // ❌ 未等待，可能在完成前结束\n    \n    // 正确\n    Task.Run(async () => await FetchDataAsync()).Wait(); // ✅\n    // 或使用async Main\n    static async Task Main() // ✅ .NET Core支持\n    {\n        await FetchDataAsync();\n    }",
    "q": [
      {
        "q": "async/await的工作原理？",
        "a": "async标记方法为异步，await暂停方法执行并返回线程，等待完成后继续执行。编译器生成状态机处理上下文切换。"
      }
    ]
  },
  {
    "id": 35,
    "t": "综合实战项目",
    "p": [
      "项目结构：分层架构(Model→Service→UI)。",
      "功能需求：学生信息管理系统。",
      "核心功能：增删改查(CRUD)、数据持久化。",
      "技术要点：泛型集合、LINQ查询、文件操作、异常处理。"
    ],
    "c": "using System; \nusing System.Collections.Generic; \nusing System.Linq; \nusing System.IO;\n\nclass Student\n{\n    public int Id { get; set; }\n    public string Name { get; set; }\n    public int Age { get; set; }\n    public string Major { get; set; }\n}\n\nclass StudentService\n{\n    private List<Student> _students = new List<Student>();\n    private string _filePath = \"students.txt\";\n    \n    public StudentService() => LoadFromFile();\n    \n    public List<Student> GetAll() => _students.ToList();\n    \n    public Student GetById(int id) => _students.FirstOrDefault(s => s.Id == id);\n    \n    public void Add(Student s)\n    {\n        s.Id = _students.Count > 0 ? _students.Max(s => s.Id) + 1 : 1;\n        _students.Add(s);\n        SaveToFile();\n    }\n    \n    public void Update(Student s)\n    {\n        var idx = _students.FindIndex(st => st.Id == s.Id);\n        if(idx >= 0)\n        {\n            _students[idx] = s;\n            SaveToFile();\n        }\n    }\n    \n    public void Delete(int id)\n    {\n        _students.RemoveAll(s => s.Id == id);\n        SaveToFile();\n    }\n    \n    private void SaveToFile()\n    {\n        var lines = _students.Select(s => $\"{s.Id},{s.Name},{s.Age},{s.Major}\");\n        File.WriteAllLines(_filePath, lines);\n    }\n    \n    private void LoadFromFile()\n    {\n        if(File.Exists(_filePath))\n        {\n            foreach(var line in File.ReadAllLines(_filePath))\n            {\n                var parts = line.Split(',');\n                _students.Add(new Student\n                {\n                    Id = int.Parse(parts[0]),\n                    Name = parts[1],\n                    Age = int.Parse(parts[2]),\n                    Major = parts[3]\n                });\n            }\n        }\n    }\n}\nclass Program\n{\n    static void Main()\n    {\n        var service = new StudentService();\n        service.Add(new Student{Name=\"张三\", Age=20, Major=\"计算机\"});\n        foreach(var s in service.GetAll())\n            Console.WriteLine($\"ID:{s.Id},姓名:{s.Name},年龄:{s.Age},专业:{s.Major}\");\n    }\n}",
    "et": "文件读写异常处理",
    "ec": "// 错误：未处理文件读写异常\nFile.WriteAllText(path, data); // ❌ 可能抛异常\n\n// 正确：添加异常处理\ntry\n{\n    File.WriteAllText(path, data);\n}\ncatch(IOException ex)\n{\n    Console.WriteLine($\"文件写入失败:{ex.Message}\");\n} // ✅",
    "q": [
      {
        "q": "综合项目中数据持久化如何实现？",
        "a": "使用File类的WriteAllLines/ReadAllLines方法，将学生数据序列化为CSV格式存储，加载时解析CSV并重建对象列表。"
      }
    ]
  }
];
