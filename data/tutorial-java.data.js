window.TUTORIAL_DATA_java = 
[
  {
    "id": 1,
    "t": "Java简介与历史",
    "p": [
      "Java的诞生：Java由Sun Microsystems公司的James Gosling于1995年推出，最初名为Oak，后改名为Java",
      "核心理念：\"Write Once, Run Anywhere\"（一次编写，到处运行），通过JVM实现跨平台",
      "主要特性：面向对象、平台无关、自动垃圾回收、强类型、多线程支持",
      "应用领域：企业级应用、Android开发、大数据处理、Web服务、嵌入式系统",
      "版本演进：从JDK 1.0到最新的LTS版本，每6个月发布一个新版本"
    ],
    "c": "// 第一个Java程序\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n        System.out.println(\"Java版本: \" + System.getProperty(\"java.version\"));\n    }\n}",
    "et": "文件名与类名不一致：",
    "ec": "文件名与类名不一致：class MyProgram 必须保存在 MyProgram.java 文件中\nmain方法签名错误：void main(String args) 缺少 public static 或数组 []",
    "q": [
      {
        "q": "Java最初的名字是什么？",
        "a": "Oak"
      }
    ]
  },
  {
    "id": 2,
    "t": "JDK安装配置",
    "p": [
      "JDK vs JRE：JDK（Java Development Kit）包含开发工具和JRE；JRE仅包含运行环境",
      "JVM：Java Virtual Machine，负责将字节码翻译为机器码执行，是跨平台的核心",
      "环境变量：JAVA_HOME指向JDK安装目录，PATH需要包含bin目录",
      "编译执行：javac编译.java为.class字节码，java运行字节码"
    ],
    "c": "# 检查Java版本\njava -version\n\n# 编译Java程序\njavac HelloWorld.java\n\n# 运行Java程序\njava HelloWorld\n\n# 设置环境变量(Linux/Mac)\nexport JAVA_HOME=/usr/lib/jvm/java-17\nexport PATH=$JAVA_HOME/bin:$PATH",
    "et": "javac不是内部命令：",
    "ec": "javac不是内部命令：未正确配置PATH环境变量，需将JDK的bin目录加入PATH\n找不到或无法加载主类：运行时加了.class后缀，应使用 java HelloWorld 而非 java HelloWorld.class",
    "q": [
      {
        "q": "JDK包含JRE吗？",
        "a": "A. 包含（JDK = JRE + 开发工具）"
      }
    ]
  },
  {
    "id": 3,
    "t": "第一个Java程序",
    "p": [
      "程序结构：Java程序由类(class)组成，每个程序至少有一个类，且必须包含main方法",
      "main方法：public static void main(String[] args) 是程序执行的起点",
      "输出语句：System.out.println() 输出并换行，System.out.print() 不换行",
      "编译运行：先javac编译生成.class文件，再java运行"
    ],
    "c": "public class FirstProgram {\n    public static void main(String[] args) {\n        System.out.println(\"我的第一个Java程序！\");\n        System.out.println(\"当前日期: \" + new java.util.Date());\n        System.out.print(\"不换行输出 \");\n        System.out.println(\"换行输出\");\n    }\n}",
    "et": "缺少分号：",
    "ec": "缺少分号：Java每条语句必须以分号 ; 结尾\n括号不匹配：每个 { 必须有对应的 }，初学者常漏掉末尾的大括号",
    "q": [
      {
        "q": "写出Java程序入口方法的完整签名。",
        "a": "public static void main(String[] args)"
      }
    ]
  },
  {
    "id": 4,
    "t": "注释与命名规范",
    "p": [
      "单行注释：// 注释内容，用于简短说明",
      "多行注释：/* 注释内容 */，用于多行说明",
      "文档注释：/** 注释内容 */，可由javadoc工具生成API文档",
      "命名规范：类名大驼峰(MyClass)、方法/变量小驼峰(myMethod)、常量全大写(MAX_VALUE)、包名全小写"
    ],
    "c": "/**\n * 文档注释 - 描述类的作用\n * @author 学习者\n */\npublic class NamingConvention {\n    // 常量：全大写，下划线分隔\n    public static final int MAX_SIZE = 100;\n\n    /* 成员变量：小驼峰命名 */\n    private String userName;\n\n    /** 方法：小驼峰命名 */\n    public void setUserName(String name) {\n        this.userName = name;\n    }\n}",
    "et": "命名不规范：",
    "ec": "命名不规范：class myclass 应改为 class MyClass，类名首字母必须大写\n使用Java关键字：int class = 10; 中class是保留字，不能用作标识符",
    "q": [
      {
        "q": "以下哪种注释可以生成API文档？",
        "a": "C. /** 注释 */ （文档注释，可通过javadoc生成文档）"
      }
    ]
  },
  {
    "id": 5,
    "t": "基本数据类型",
    "p": [
      "整数类型：byte(1字节)、short(2字节)、int(4字节，默认)、long(8字节)",
      "浮点类型：float(4字节)、double(8字节，默认)",
      "字符类型：char(2字节)，存储Unicode字符",
      "布尔类型：boolean，只有true和false两个值",
      "注意：Java基本类型有固定大小，不随平台变化"
    ],
    "c": "public class DataTypes {\n    public static void main(String[] args) {\n        byte b = 127;\n        short s = 32000;\n        int i = 100000;\n        long l = 10000000000L;\n\n        float f = 3.14f;\n        double d = 3.14159265;\n\n        char c = 'A';\n        char unicode = '\\u0041';\n\n        boolean flag = true;\n\n        System.out.println(\"byte: \" + b);\n        System.out.println(\"double: \" + d);\n        System.out.println(\"char: \" + c);\n    }\n}",
    "et": "long忘记加L：",
    "ec": "long忘记加L：long l = 10000000000; 超出int范围报错，应写 10000000000L\nfloat忘记加f：float f = 3.14; 浮点字面量默认double，需写 3.14f",
    "q": [
      {
        "q": "Java中int类型占多少字节？",
        "a": "4字节"
      }
    ]
  },
  {
    "id": 6,
    "t": "变量与常量",
    "p": [
      "变量声明：数据类型 变量名 = 值;，Java是强类型语言",
      "局部变量：方法内声明，必须初始化后才能使用",
      "成员变量：类中声明，有默认初始值(int为0, boolean为false, 对象为null)",
      "常量：使用 final 关键字修饰，赋值后不可修改，命名全大写"
    ],
    "c": "public class VariableDemo {\n    static int classVar;\n    static final double PI = 3.14159;\n\n    public static void main(String[] args) {\n        int age = 25;\n        String name = \"Java\";\n        final int MAX_AGE = 150;\n\n        System.out.println(\"姓名: \" + name);\n        System.out.println(\"PI: \" + PI);\n        System.out.println(\"默认值: \" + classVar);\n    }\n}",
    "et": "局部变量未初始化：",
    "ec": "局部变量未初始化：int x; System.out.println(x); 编译错误，局部变量必须先赋值\n修改常量：final int N = 10; N = 20; 编译错误，final变量不可重新赋值",
    "q": [
      {
        "q": "用final声明一个常量MAX_VALUE，值为100。",
        "a": "final int MAX_VALUE = 100;"
      }
    ]
  },
  {
    "id": 7,
    "t": "类型转换",
    "p": [
      "自动类型转换：小范围→大范围(byte→short→int→long→float→double)",
      "强制类型转换：大范围→小范围，需显式 (目标类型)值，可能丢失精度",
      "字符串转换：String.valueOf()转字符串，Integer.parseInt()转基本类型",
      "注意：boolean不参与类型转换"
    ],
    "c": "public class TypeConversion {\n    public static void main(String[] args) {\n        int i = 100;\n        long l = i;\n        double d = l;\n\n        double pi = 3.14159;\n        int intPi = (int) pi;\n\n        String s1 = String.valueOf(100);\n        int num = Integer.parseInt(\"200\");\n        double dbl = Double.parseDouble(\"3.14\");\n\n        System.out.println(\"强制转换: \" + intPi);\n        System.out.println(\"字符串转int: \" + num);\n    }\n}",
    "et": "精度丢失：",
    "ec": "精度丢失：int x = (int)3.99; 结果为3，不是4，直接截断\n数字格式异常：Integer.parseInt(\"abc\"); 运行时抛出NumberFormatException",
    "q": [
      {
        "q": "将double值3.99强制转换为int，结果是什么？",
        "a": "3（直接截断小数部分）"
      }
    ]
  },
  {
    "id": 8,
    "t": "算术运算符",
    "p": [
      "基本运算：+ - * / % 加、减、乘、除、取余",
      "整数除法：两个int相除结果仍为int，小数部分被截断",
      "自增自减：++ 和 --，分前缀(先变后用)和后缀(先用后变)",
      "复合赋值：+= -= *= /= %=，如 a += b 等价于 a = a + b"
    ],
    "c": "public class ArithmeticOps {\n    public static void main(String[] args) {\n        int a = 17, b = 5;\n        System.out.println(\"加法: \" + (a + b));\n        System.out.println(\"除法: \" + (a / b));\n        System.out.println(\"取余: \" + (a % b));\n\n        int x = 10;\n        System.out.println(\"x++: \" + (x++));\n        System.out.println(\"++x: \" + (++x));\n\n        int n = 10;\n        n += 5;\n        n *= 2;\n        System.out.println(\"n: \" + n);\n    }\n}",
    "et": "整数除法丢失精度：",
    "ec": "整数除法丢失精度：int result = 5 / 2; 结果为2而非2.5，应用 5.0 / 2\n除以零：int x = 10 / 0; 运行时抛出ArithmeticException",
    "q": [
      {
        "q": "17 % 5 的结果是什么？",
        "a": "2"
      }
    ]
  },
  {
    "id": 9,
    "t": "关系与逻辑运算符",
    "p": [
      "关系运算符：== != > = ，结果为boolean值",
      "逻辑运算符：&&（短路与）、||（短路或）、!（非）",
      "短路特性：&&左边为false则右边不执行；||左边为true则右边不执行",
      "三元运算符：条件 ? 值1 : 值2"
    ],
    "c": "public class LogicOps {\n    public static void main(String[] args) {\n        int a = 10, b = 20;\n        System.out.println(\"a == b: \" + (a == b));\n        System.out.println(\"a != b: \" + (a != b));\n\n        boolean x = true, y = false;\n        System.out.println(\"x && y: \" + (x && y));\n        System.out.println(\"x || y: \" + (x || y));\n\n        int[] arr = {1, 2, 3};\n        int idx = 5;\n        if (idx < arr.length && arr[idx] > 0) {\n            System.out.println(\"安全访问\");\n        }\n\n        int max = (a > b) ? a : b;\n        System.out.println(\"较大值: \" + max);\n    }\n}",
    "et": "用=代替==：",
    "ec": "用=代替==：if (a = 5) 赋值操作，编译报错\n忽略短路：应用&&防止NPE，如 obj != null && obj.getValue() > 0",
    "q": [
      {
        "q": "true && false || true 的结果是什么？",
        "a": "true（&&优先级高于||）"
      }
    ]
  },
  {
    "id": 10,
    "t": "if-else语句",
    "p": [
      "if语句：if (条件) { 代码块 }，条件为true时执行",
      "if-else：条件为true执行if块，false执行else块",
      "if-else if-else：多条件分支，依次判断",
      "注意：条件必须是boolean表达式，不能用0/1"
    ],
    "c": "public class IfElseDemo {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 90) {\n            System.out.println(\"优秀\");\n        } else if (score >= 80) {\n            System.out.println(\"良好\");\n        } else if (score >= 60) {\n            System.out.println(\"及格\");\n        } else {\n            System.out.println(\"不及格\");\n        }\n\n        int age = 25;\n        boolean hasLicense = true;\n        if (age >= 18) {\n            if (hasLicense) System.out.println(\"可以驾车\");\n        }\n    }\n}",
    "et": "if后加分号：",
    "ec": "if后加分号：if (x > 0); 空语句，代码块无论如何都执行\n用=代替==：if (flag = true) 是赋值，应用 if (flag)",
    "q": [
      {
        "q": "写出判断一个整数n是否为偶数的if语句。",
        "a": "if (n % 2 == 0) {\n    System.out.println(\"是偶数\");\n}"
      }
    ]
  },
  {
    "id": 11,
    "t": "switch语句",
    "p": [
      "基本语法：switch(表达式)匹配case值，支持byte/short/int/char/String(JDK7+)/枚举",
      "break重要性：没有break会穿透到下一个case继续执行",
      "default：所有case都不匹配时执行",
      "JDK14+增强：switch表达式，用->箭头语法"
    ],
    "c": "public class SwitchDemo {\n    public static void main(String[] args) {\n        int day = 3;\n        switch (day) {\n            case 1: System.out.println(\"星期一\"); break;\n            case 2: System.out.println(\"星期二\"); break;\n            case 3: System.out.println(\"星期三\"); break;\n            default: System.out.println(\"其他\"); break;\n        }\n\n        String color = \"red\";\n        switch (color) {\n            case \"red\": System.out.println(\"红色\"); break;\n            case \"blue\": System.out.println(\"蓝色\"); break;\n        }\n    }\n}",
    "et": "忘记break：",
    "ec": "忘记break：导致case穿透，多个case的代码被顺序执行\ncase值重复：编译错误，case值不能重复",
    "q": [
      {
        "q": "switch语句中case后没有break会怎样？",
        "a": "发生case穿透，继续执行后续case直到遇到break"
      }
    ]
  },
  {
    "id": 12,
    "t": "for循环",
    "p": [
      "基本for：for(初始化; 条件; 更新) { 循环体 }",
      "增强for：for(类型 变量 : 数组/集合)，也叫for-each",
      "执行顺序：初始化→条件判断→循环体→更新→条件判断→...",
      "死循环：for(;;) 等价于 while(true)"
    ],
    "c": "public class ForLoop {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n\n        int sum = 0;\n        for (int i = 1; i <= 100; i++) {\n            sum += i;\n        }\n        System.out.println(\"1-100的和: \" + sum);\n\n        int[] nums = {10, 20, 30, 40, 50};\n        for (int n : nums) {\n            System.out.print(n + \" \");\n        }\n    }\n}",
    "et": "循环条件永远为true：",
    "ec": "循环条件永远为true：注意循环终止条件，避免死循环\n增强for中修改集合：抛出ConcurrentModificationException",
    "q": []
  },
  {
    "id": 13,
    "t": "while与do-while",
    "p": [
      "while：先判断后执行，可能一次不执行",
      "do-while：先执行后判断，至少执行一次",
      "选择原则：循环次数确定用for，不确定用while",
      "注意：do-while末尾的分号不要忘记"
    ],
    "c": "public class WhileDemo {\n    public static void main(String[] args) {\n        int target = 7, guess = 1;\n        while (guess != target) { guess++; }\n        System.out.println(\"找到: \" + guess);\n\n        int count = 0;\n        do {\n            System.out.println(\"执行第 \" + (count+1) + \" 次\");\n            count++;\n        } while (count < 3);\n\n        int num = 12345, digits = 0, temp = num;\n        while (temp > 0) { temp /= 10; digits++; }\n        System.out.println(num + \" 有 \" + digits + \" 位\");\n    }\n}",
    "et": "忘记更新循环变量：",
    "ec": "忘记更新循环变量：导致死循环\ndo-while忘记分号：do { } while (条件) 末尾必须有分号",
    "q": [
      {
        "q": "while和do-while的主要区别是什么？",
        "a": "while先判断后执行(可能0次)；do-while先执行后判断(至少1次)"
      }
    ]
  },
  {
    "id": 14,
    "t": "break与continue",
    "p": [
      "break：跳出当前循环，循环立即终止",
      "continue：跳过本次循环剩余代码，进入下一次迭代",
      "带标签的break：break 标签名; 可跳出多层嵌套循环",
      "标签语法：标签名: 放在循环前"
    ],
    "c": "public class BreakContinue {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 100; i++) {\n            if (i % 7 == 0) {\n                System.out.println(\"找到: \" + i);\n                break;\n            }\n        }\n\n        for (int i = 1; i <= 10; i++) {\n            if (i % 2 == 0) continue;\n            System.out.print(i + \" \");\n        }\n        System.out.println();\n\n        outer:\n        for (int i = 0; i < 3; i++) {\n            for (int j = 0; j < 3; j++) {\n                if (i == 1 && j == 1) break outer;\n                System.out.print(\"(\" + i + \",\" + j + \") \");\n            }\n        }\n    }\n}",
    "et": "在普通if中使用break：",
    "ec": "在普通if中使用break：break只能在循环或switch中使用\n混淆break和continue：break终止整个循环，continue只跳过当次",
    "q": []
  },
  {
    "id": 15,
    "t": "一维数组",
    "p": [
      "声明与初始化：int[] arr = new int[5]; 或 int[] arr = {1,2,3};",
      "索引：从0开始，最大索引为length-1",
      "默认值：int默认0，boolean默认false，对象默认null",
      "长度：arr.length 是属性而非方法"
    ],
    "c": "public class ArrayDemo {\n    public static void main(String[] args) {\n        int[] scores = new int[5];\n        scores[0] = 90;\n        scores[1] = 85;\n\n        String[] names = {\"Alice\", \"Bob\", \"Charlie\"};\n\n        for (int i = 0; i < scores.length; i++) {\n            System.out.println(\"成绩\" + i + \": \" + scores[i]);\n        }\n\n        for (String name : names) {\n            System.out.println(\"姓名: \" + name);\n        }\n\n        int[] arr = {5, 2, 8, 1, 9};\n        java.util.Arrays.sort(arr);\n        System.out.println(java.util.Arrays.toString(arr));\n    }\n}",
    "et": "数组越界：",
    "ec": "数组越界：arr[arr.length] 抛出ArrayIndexOutOfBoundsException\n声明后直接使用：数组必须先初始化才能使用",
    "q": []
  },
  {
    "id": 16,
    "t": "多维数组",
    "p": [
      "声明：int[][] matrix = new int[3][4]; 3行4列",
      "不规则数组：每行长度可不同",
      "初始化：int[][] m = {{1,2},{3,4},{5,6}};",
      "本质：二维数组是\"数组的数组\""
    ],
    "c": "public class MultiArray {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n\n        for (int i = 0; i < matrix.length; i++) {\n            for (int j = 0; j < matrix[i].length; j++) {\n                System.out.print(matrix[i][j] + \" \");\n            }\n            System.out.println();\n        }\n\n        int[][] jagged = new int[3][];\n        jagged[0] = new int[]{1, 2};\n        jagged[1] = new int[]{3, 4, 5};\n        jagged[2] = new int[]{6};\n    }\n}",
    "et": "列索引越界：",
    "ec": "列索引越界：注意每行的列数\n未初始化行：不规则数组需单独初始化每行",
    "q": []
  },
  {
    "id": 17,
    "t": "字符串基础",
    "p": [
      "不可变性：String对象创建后内容不可改变",
      "创建方式：字面量 \"hello\" 或 new String(\"hello\")",
      "字符串池：字面量创建的字符串存储在常量池中，相同内容共享",
      "== vs equals：==比较引用地址，equals()比较内容"
    ],
    "c": "public class StringBasics {\n    public static void main(String[] args) {\n        String s1 = \"Hello\";\n        String s2 = \"Hello\";\n        String s3 = new String(\"Hello\");\n\n        System.out.println(s1 == s2);\n        System.out.println(s1 == s3);\n        System.out.println(s1.equals(s3));\n\n        String greeting = s1 + \" World\";\n        String formatted = String.format(\"姓名: %s, 年龄: %d\", \"Java\", 25);\n\n        String original = \"Java\";\n        String modified = original.replace('a', 'o');\n        System.out.println(original);\n        System.out.println(modified);\n    }\n}",
    "et": "用==比较字符串内容：",
    "ec": "用==比较字符串内容：应用 equals() 比较内容\n循环中大量拼接：应用StringBuilder代替 str += \"a\"",
    "q": [
      {
        "q": "String s1 = \"Java\"; String s2 = new String(\"Java\"); s1 == s2 的结果？",
        "a": "false（s1指向字符串池，s2指向堆中新对象）"
      }
    ]
  },
  {
    "id": 18,
    "t": "字符串方法",
    "p": [
      "查询：length(), charAt(i), indexOf(s), contains(s)",
      "截取：substring(begin), substring(begin, end)",
      "转换：toUpperCase(), toLowerCase(), trim(), replace()",
      "分割连接：split(regex), String.join()"
    ],
    "c": "public class StringMethods {\n    public static void main(String[] args) {\n        String str = \"  Hello, Java World!  \";\n        System.out.println(\"长度: \" + str.length());\n        System.out.println(\"去空格: \" + str.trim());\n        System.out.println(\"大写: \" + str.toUpperCase());\n        System.out.println(\"替换: \" + str.replace(\"Java\", \"Python\"));\n        System.out.println(\"包含: \" + str.contains(\"Java\"));\n        System.out.println(\"截取: \" + str.substring(2, 7));\n\n        String[] fruits = \"apple,banana,cherry\".split(\",\");\n        String joined = String.join(\" | \", fruits);\n        System.out.println(\"连接: \" + joined);\n\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"Hello\").append(\" \").append(\"World\");\n        System.out.println(sb.toString());\n    }\n}",
    "et": "substring越界：",
    "ec": "substring越界：抛出StringIndexOutOfBoundsException\n对null调用方法：抛出NullPointerException",
    "q": [
      {
        "q": "写出将字符串\"Hello World\"反转的代码。",
        "a": "String s = \"Hello World\";\nString reversed = new StringBuilder(s).reverse().toString();"
      }
    ]
  },
  {
    "id": 19,
    "t": "方法定义与调用",
    "p": [
      "方法结构：修饰符 返回类型 方法名(参数列表) { 方法体 }",
      "返回值：有返回值用return，无返回值用void",
      "参数传递：基本类型传值，引用类型传引用",
      "递归：方法调用自身，必须有终止条件"
    ],
    "c": "public class MethodDemo {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n\n    public static void printInfo(String name, int age) {\n        System.out.println(name + \" is \" + age + \" years old\");\n    }\n\n    public static long factorial(int n) {\n        if (n <= 1) return 1;\n        return n * factorial(n - 1);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"3 + 5 = \" + add(3, 5));\n        printInfo(\"Java\", 25);\n        System.out.println(\"5! = \" + factorial(5));\n    }\n}",
    "et": "缺少返回语句：",
    "ec": "缺少返回语句：声明了返回类型但没有return语句，编译错误\nvoid中使用return值：void print() { return 0; } 编译错误",
    "q": [
      {
        "q": "写一个静态方法isEven(int n)，判断是否为偶数。",
        "a": "public static boolean isEven(int n) {\n    return n % 2 == 0;\n}"
      }
    ]
  },
  {
    "id": 20,
    "t": "方法重载",
    "p": [
      "定义：同一个类中，方法名相同但参数列表不同",
      "参数列表不同：参数个数、类型、顺序不同",
      "返回类型：不能仅靠返回类型区分重载",
      "调用：根据实参类型和个数自动匹配"
    ],
    "c": "public class MethodOverload {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n\n    public static double add(double a, double b) {\n        return a + b;\n    }\n\n    public static int add(int a, int b, int c) {\n        return a + b + c;\n    }\n\n    public static String add(String a, String b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(add(3, 5));\n        System.out.println(add(3.5, 2.5));\n        System.out.println(add(1, 2, 3));\n        System.out.println(add(\"Hello\", \" World\"));\n    }\n}",
    "et": "仅返回类型不同：",
    "ec": "仅返回类型不同：int add() 和 double add() 不算重载\n参数名不同：add(int a) 和 add(int b) 不算重载",
    "q": [
      {
        "q": "判断：void print(int x) 和 void print(double x) 是否构成重载？",
        "a": "是（参数类型不同）"
      }
    ]
  },
  {
    "id": 21,
    "t": "面向对象基础",
    "p": [
      "类与对象：类是模板，对象是实例",
      "封装：将数据和方法封装在一起，隐藏内部实现",
      "继承：子类继承父类的属性和方法",
      "多态：同一接口多种实现方式"
    ],
    "c": "public class Person {\n    private String name;\n    private int age;\n\n    public Person(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n\n    public void introduce() {\n        System.out.println(\"我叫\" + name + \"，今年\" + age + \"岁\");\n    }\n\n    public String getName() {\n        return name;\n    }\n\n    public void setAge(int age) {\n        if (age > 0) {\n            this.age = age;\n        }\n    }\n\n    public static void main(String[] args) {\n        Person p = new Person(\"张三\", 25);\n        p.introduce();\n        p.setAge(26);\n    }\n}",
    "et": "忘记new：",
    "ec": "忘记new：Person p; p是null，需 new Person()\n访问私有字段：不能直接访问private字段，需通过getter/setter",
    "q": [
      {
        "q": "创建一个Car类，包含品牌和价格属性，以及drive方法。",
        "a": "public class Car {\n    private String brand;\n    private double price;\n\n    public Car(String brand, double price) {\n        this.brand = brand;\n        this.price = price;\n    }\n\n    public void drive() {\n        System.out.println(brand + \"正在行驶\");\n    }\n}"
      }
    ]
  },
  {
    "id": 22,
    "t": "构造方法",
    "p": [
      "定义：与类名相同，无返回类型，用于初始化对象",
      "默认构造：无参构造，未定义时编译器自动生成",
      "重载：可定义多个构造方法，参数列表不同",
      "this调用：this()调用其他构造方法"
    ],
    "c": "public class Student {\n    private String name;\n    private int age;\n    private String grade;\n\n    public Student() {\n        this.name = \"未知\";\n        this.age = 0;\n    }\n\n    public Student(String name) {\n        this(name, 0);\n    }\n\n    public Student(String name, int age) {\n        this(name, age, \"一年级\");\n    }\n\n    public Student(String name, int age, String grade) {\n        this.name = name;\n        this.age = age;\n        this.grade = grade;\n    }\n\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        Student s2 = new Student(\"李四\");\n        Student s3 = new Student(\"王五\", 18, \"高三\");\n    }\n}",
    "et": "构造方法有返回值：",
    "ec": "构造方法有返回值：public void Student() {} 不是构造方法\nthis()位置错误：必须在构造方法第一行",
    "q": [
      {
        "q": "类中定义了带参构造后，还能使用new ClassName()吗？",
        "a": "不能（除非显式定义无参构造）"
      }
    ]
  },
  {
    "id": 23,
    "t": "this关键字",
    "p": [
      "指代当前对象：在方法中引用调用该方法的对象",
      "区分字段和参数：this.name = name;",
      "调用其他方法：this.method();",
      "调用构造方法：this(); 必须在第一行"
    ],
    "c": "public class Person {\n    private String name;\n\n    public Person(String name) {\n        this.name = name;\n    }\n\n    public void setName(String name) {\n        this.name = name;\n    }\n\n    public void printInfo() {\n        System.out.println(\"姓名: \" + this.name);\n        this.sayHello();\n    }\n\n    public void sayHello() {\n        System.out.println(\"Hello, \" + this.name);\n    }\n\n    public static void main(String[] args) {\n        Person p = new Person(\"赵六\");\n        p.printInfo();\n    }\n}",
    "et": "静态方法中用this：",
    "ec": "静态方法中用this：静态方法属于类，不属于对象\n字段名与参数名相同时忘记this：name = name; 参数赋值给参数",
    "q": [
      {
        "q": "在静态方法中能否使用this关键字？为什么？",
        "a": "不能，静态方法属于类，不依赖对象实例，没有this指向"
      }
    ]
  },
  {
    "id": 24,
    "t": "继承",
    "p": [
      "extends：class Child extends Parent",
      "单继承：Java只支持单继承",
      "super：调用父类的构造方法或方法",
      "继承内容：继承父类非private的属性和方法"
    ],
    "c": "public class Animal {\n    protected String name;\n\n    public Animal(String name) {\n        this.name = name;\n    }\n\n    public void eat() {\n        System.out.println(name + \"正在吃东西\");\n    }\n}\n\npublic class Dog extends Animal {\n    public Dog(String name) {\n        super(name);\n    }\n\n    public void bark() {\n        System.out.println(name + \"汪汪叫\");\n    }\n\n    @Override\n    public void eat() {\n        super.eat();\n        System.out.println(\"吃狗粮\");\n    }\n\n    public static void main(String[] args) {\n        Dog dog = new Dog(\"旺财\");\n        dog.eat();\n        dog.bark();\n    }\n}",
    "et": "多继承：",
    "ec": "多继承：Java不支持多重继承，可用接口实现\n访问父类private：子类不能访问父类private字段",
    "q": [
      {
        "q": "创建Student类继承Person类，添加grade属性。",
        "a": "public class Student extends Person {\n    private String grade;\n\n    public Student(String name, int age, String grade) {\n        super(name, age);\n        this.grade = grade;\n    }\n}"
      }
    ]
  },
  {
    "id": 25,
    "t": "方法重写",
    "p": [
      "定义：子类重写父类的方法，方法名、参数列表、返回类型相同",
      "@Override：可选注解，编译器检查是否正确重写",
      "访问权限：子类重写方法的访问权限不能比父类更严格",
      "调用父类方法：super.method()"
    ],
    "c": "public class Shape {\n    public double getArea() {\n        return 0;\n    }\n\n    public void draw() {\n        System.out.println(\"绘制图形\");\n    }\n}\n\npublic class Circle extends Shape {\n    private double radius;\n\n    public Circle(double radius) {\n        this.radius = radius;\n    }\n\n    @Override\n    public double getArea() {\n        return Math.PI * radius * radius;\n    }\n\n    @Override\n    public void draw() {\n        super.draw();\n        System.out.println(\"绘制圆形\");\n    }\n\n    public static void main(String[] args) {\n        Circle c = new Circle(5);\n        System.out.println(\"面积: \" + c.getArea());\n        c.draw();\n    }\n}",
    "et": "参数列表不同：",
    "ec": "参数列表不同：参数个数或类型不同不是重写，是重载\n返回类型不兼容：子类返回类型必须是父类的子类",
    "q": [
      {
        "q": "创建Rectangle类继承Shape，重写getArea方法。",
        "a": "public class Rectangle extends Shape {\n    private double width, height;\n\n    public Rectangle(double w, double h) {\n        width = w; height = h;\n    }\n\n    @Override\n    public double getArea() {\n        return width * height;\n    }\n}"
      }
    ]
  },
  {
    "id": 26,
    "t": "多态",
    "p": [
      "定义：父类引用指向子类对象",
      "向上转型：Shape s = new Circle();",
      "向下转型：Circle c = (Circle)s;",
      "instanceof：判断对象是否为某个类的实例"
    ],
    "c": "public class PolymorphismDemo {\n    public static void main(String[] args) {\n        Shape[] shapes = {\n            new Circle(5),\n            new Rectangle(4, 6),\n            new Circle(3)\n        };\n\n        for (Shape s : shapes) {\n            System.out.println(\"面积: \" + s.getArea());\n            if (s instanceof Circle) {\n                Circle c = (Circle) s;\n                System.out.println(\"是圆形\");\n            }\n        }\n    }\n}",
    "et": "错误的向下转型：",
    "ec": "错误的向下转型：非该类型实例强转会抛出ClassCastException\n调用子类特有方法：父类引用不能调用子类特有方法",
    "q": [
      {
        "q": "Shape s = new Circle(); s.getArea() 调用的是哪个类的方法？",
        "a": "Circle类的getArea()方法（运行时多态）"
      }
    ]
  },
  {
    "id": 27,
    "t": "抽象类",
    "p": [
      "abstract：修饰类和方法",
      "抽象方法：只有声明没有实现的方法",
      "抽象类：包含抽象方法的类，不能实例化",
      "子类：必须实现父类所有抽象方法"
    ],
    "c": "public abstract class Animal {\n    protected String name;\n\n    public Animal(String name) {\n        this.name = name;\n    }\n\n    public abstract void makeSound();\n\n    public void sleep() {\n        System.out.println(name + \"在睡觉\");\n    }\n}\n\npublic class Cat extends Animal {\n    public Cat(String name) {\n        super(name);\n    }\n\n    @Override\n    public void makeSound() {\n        System.out.println(name + \"喵喵叫\");\n    }\n\n    public static void main(String[] args) {\n        Animal cat = new Cat(\"咪咪\");\n        cat.makeSound();\n        cat.sleep();\n    }\n}",
    "et": "实例化抽象类：",
    "ec": "实例化抽象类：new Animal(); 编译错误\n子类未实现所有抽象方法：子类也必须声明为abstract",
    "q": [
      {
        "q": "创建抽象类Vehicle，包含抽象方法run()，然后创建Car类实现它。",
        "a": "public abstract class Vehicle {\n    public abstract void run();\n}\n\npublic class Car extends Vehicle {\n    @Override\n    public void run() {\n        System.out.println(\"汽车在行驶\");\n    }\n}"
      }
    ]
  },
  {
    "id": 28,
    "t": "接口",
    "p": [
      "interface：public interface Flyable {}",
      "抽象方法：默认是public abstract",
      "常量：默认是public static final",
      "实现：class Bird implements Flyable"
    ],
    "c": "public interface Flyable {\n    int MAX_HEIGHT = 10000;\n    void fly();\n}\n\npublic interface Swimmable {\n    void swim();\n}\n\npublic class Duck implements Flyable, Swimmable {\n    @Override\n    public void fly() {\n        System.out.println(\"鸭子飞\");\n    }\n\n    @Override\n    public void swim() {\n        System.out.println(\"鸭子游泳\");\n    }\n\n    public static void main(String[] args) {\n        Duck duck = new Duck();\n        duck.fly();\n        duck.swim();\n        System.out.println(Flyable.MAX_HEIGHT);\n    }\n}",
    "et": "接口中写普通方法：",
    "ec": "接口中写普通方法：接口中不能有非抽象方法（Java 8之前）\n继承接口：应用implements，不是extends",
    "q": [
      {
        "q": "一个类可以实现多个接口吗？",
        "a": "可以（Java支持多实现）"
      }
    ]
  },
  {
    "id": 29,
    "t": "异常处理",
    "p": [
      "try-catch：捕获异常",
      "finally：无论是否发生异常都会执行",
      "throw：主动抛出异常",
      "throws：声明方法可能抛出的异常"
    ],
    "c": "public class ExceptionDemo {\n    public static int divide(int a, int b) throws ArithmeticException {\n        if (b == 0) {\n            throw new ArithmeticException(\"除数不能为0\");\n        }\n        return a / b;\n    }\n\n    public static void main(String[] args) {\n        try {\n            int result = divide(10, 0);\n            System.out.println(\"结果: \" + result);\n        } catch (ArithmeticException e) {\n            System.out.println(\"发生异常: \" + e.getMessage());\n        } finally {\n            System.out.println(\"finally块执行\");\n        }\n    }\n}",
    "et": "空catch块：",
    "ec": "空catch块：捕获异常但不处理，问题被隐藏\n顺序错误：先catch子类再catch父类",
    "q": [
      {
        "q": "finally块是否一定执行？",
        "a": "不一定（System.exit()会终止JVM，finally不执行）"
      }
    ]
  },
  {
    "id": 30,
    "t": "文件操作",
    "p": [
      "File类：表示文件或目录路径",
      "字节流：InputStream/OutputStream",
      "字符流：Reader/Writer",
      "Files工具类：Java 7新增的文件操作工具"
    ],
    "c": "import java.io.*;\nimport java.nio.file.*;\n\npublic class FileOperations {\n    public static void main(String[] args) throws IOException {\n        Path path = Paths.get(\"example.txt\");\n\n        Files.write(path, \"Hello, Java!\".getBytes());\n        String content = new String(Files.readAllBytes(path));\n        System.out.println(content);\n\n        File file = new File(\"data.txt\");\n        try (BufferedWriter writer = new BufferedWriter(new FileWriter(file))) {\n            writer.write(\"第一行\");\n            writer.newLine();\n            writer.write(\"第二行\");\n        }\n\n        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {\n            String line;\n            while ((line = reader.readLine()) != null) {\n                System.out.println(line);\n            }\n        }\n    }\n}",
    "et": "忘记关闭流：",
    "ec": "忘记关闭流：资源泄露，应用try-with-resources\n字符编码问题：读取中文时需指定UTF-8编码",
    "q": [
      {
        "q": "使用try-with-resources语法读取文件内容。",
        "a": "try (BufferedReader br = new BufferedReader(\n    new FileReader(\"file.txt\"))) {\n    String line;\n    while ((line = br.readLine()) != null) {\n        System.out.println(line);\n    }\n}"
      }
    ]
  },
  {
    "id": 31,
    "t": "泛型",
    "p": [
      "定义：参数化类型，使类型安全",
      "使用：<T>表示类型参数",
      "通配符：<?>表示任意类型",
      "类型边界：<T extends Number>限制类型"
    ],
    "c": "public class GenericBox<T> {\n    private T item;\n\n    public void set(T item) {\n        this.item = item;\n    }\n\n    public T get() {\n        return item;\n    }\n\n    public static <E> void printArray(E[] array) {\n        for (E element : array) {\n            System.out.println(element);\n        }\n    }\n\n    public static void main(String[] args) {\n        GenericBox<String> stringBox = new GenericBox<>();\n        stringBox.set(\"Hello\");\n        System.out.println(stringBox.get());\n\n        Integer[] numbers = {1, 2, 3};\n        GenericBox.printArray(numbers);\n    }\n}",
    "et": "泛型数组：",
    "ec": "泛型数组：不能创建泛型数组\n类型擦除：运行时泛型信息被擦除",
    "q": [
      {
        "q": "创建一个泛型栈类。",
        "a": "public class GenericStack&lt;T&gt; {\n    private List&lt;T&gt; elements = new ArrayList&lt;&gt;();\n    public void push(T item) { elements.add(item); }\n    public T pop() { return elements.remove(elements.size() - 1); }\n}"
      }
    ]
  },
  {
    "id": 32,
    "t": "集合框架",
    "p": [
      "List：有序可重复（ArrayList, LinkedList）",
      "Set：无序不重复（HashSet, TreeSet）",
      "Map：键值对（HashMap, TreeMap）",
      "遍历方式：迭代器、for-each、Stream API"
    ],
    "c": "import java.util.*;\n\npublic class CollectionDemo {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>();\n        list.add(\"Apple\");\n        list.add(\"Banana\");\n        list.add(\"Apple\");\n        System.out.println(\"List: \" + list);\n\n        Set<String> set = new HashSet<>(list);\n        System.out.println(\"Set: \" + set);\n\n        Map<String, Integer> map = new HashMap<>();\n        map.put(\"Alice\", 25);\n        map.put(\"Bob\", 30);\n\n        for (Map.Entry<String, Integer> entry : map.entrySet()) {\n            System.out.println(entry.getKey() + \": \" + entry.getValue());\n        }\n    }\n}",
    "et": "遍历修改：",
    "ec": "遍历修改：遍历时不能直接修改集合\nHashMap线程安全：HashMap不是线程安全的",
    "q": []
  },
  {
    "id": 33,
    "t": "多线程",
    "p": [
      "创建方式：继承Thread或实现Runnable",
      "线程状态：新建、就绪、运行、阻塞、死亡",
      "同步：synchronized关键字",
      "线程池：ExecutorService"
    ],
    "c": "public class ThreadDemo {\n    static class Counter {\n        private int count = 0;\n        public synchronized void increment() {\n            count++;\n        }\n        public int getCount() { return count; }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n\n        Thread t1 = new Thread(() -> {\n            for (int i = 0; i < 1000; i++) {\n                counter.increment();\n            }\n        });\n\n        Thread t2 = new Thread(() -> {\n            for (int i = 0; i < 1000; i++) {\n                counter.increment();\n            }\n        });\n\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n\n        System.out.println(\"最终计数: \" + counter.getCount());\n    }\n}",
    "et": "竞态条件：",
    "ec": "竞态条件：多个线程同时访问共享资源\n死锁：线程互相等待对方释放锁",
    "q": [
      {
        "q": "如何停止一个线程？",
        "a": "使用volatile标志位，不要用stop()"
      }
    ]
  },
  {
    "id": 34,
    "t": "Lambda表达式",
    "p": [
      "语法：(参数) -> 表达式",
      "函数式接口：只有一个抽象方法的接口",
      "方法引用：ClassName::methodName",
      "Stream API：配合Lambda进行数据处理"
    ],
    "c": "import java.util.*;\nimport java.util.stream.*;\n\npublic class LambdaDemo {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList(\"Alice\", \"Bob\", \"Charlie\");\n\n        names.forEach(name -> System.out.println(name));\n\n        List<String> filtered = names.stream()\n            .filter(name -> name.length() > 3)\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n        System.out.println(filtered);\n\n        int sum = Arrays.stream(new int[]{1, 2, 3, 4, 5})\n            .filter(n -> n % 2 == 0)\n            .sum();\n        System.out.println(\"偶数和: \" + sum);\n    }\n}",
    "et": "变量捕获：",
    "ec": "变量捕获：Lambda中使用的外部变量必须是final或effectively final\n返回类型：单表达式无需return，代码块需要",
    "q": [
      {
        "q": "使用Stream API求列表最大值。",
        "a": "list.stream().max(Integer::compare).get()"
      }
    ]
  },
  {
    "id": 35,
    "t": "Java模块系统",
    "p": [
      "module-info.java：模块描述文件",
      "exports：导出包给其他模块",
      "requires：声明依赖其他模块",
      "Java 9+特性：模块化JDK"
    ],
    "c": "// module-info.java\nmodule com.example.myapp {\n    requires java.base;\n    requires java.logging;\n    exports com.example.myapp.api;\n    exports com.example.myapp.service to com.example.consumer;\n}\n\n// 使用模块\npackage com.example.myapp;\n\npublic class ModuleDemo {\n    public static void main(String[] args) {\n        Module module = ModuleDemo.class.getModule();\n        System.out.println(\"模块名: \" + module.getName());\n        System.out.println(\"模块描述符: \" + module.getDescriptor());\n    }\n}",
    "et": "导出包：",
    "ec": "导出包：未导出的包不能被其他模块访问\n循环依赖：模块之间不能有循环依赖",
    "q": [
      {
        "q": "如何声明一个模块依赖？",
        "a": "requires 模块名;"
      }
    ]
  }
];
