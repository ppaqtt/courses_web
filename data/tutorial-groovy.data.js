window.TUTORIAL_DATA_groovy = [
  {
    "id": 1,
    "t": "Groovy 简介：JVM 上的动态语言",
    "p": [
      "Groovy 诞生于 2003 年，2004 年发布 1.0，后来成为 Apache 顶级项目",
      "运行在 JVM 上，可无缝调用 Java 类库，语法更简洁，同时支持脚本与面向对象",
      "动态类型与可选静态类型并存，@CompileStatic 可在关键代码上恢复编译期检查",
      "典型应用：Gradle 构建脚本、Jenkins Pipeline、Spock 测试与快速 Web 原型"
    ],
    "c": "class Main {\n    static void main(String[] args) {\n        println 'Hello, Groovy 3!'\n        def version = GroovySystem.version\n        def langs = ['Groovy', 'Java', 'Kotlin']\n        println \"当前版本: $version\"\n        println langs.collect { it.toUpperCase() }.join(', ')\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "把 Groovy 当成“语法更松的 Java”而完全不用类型：动态分派让重构和补全变弱，核心业务类应加 @CompileStatic 或 @TypeChecked。",
    "q": [
      {
        "q": "Groovy 运行在什么平台上？",
        "a": "JVM"
      },
      {
        "q": "Groovy 最广为人知的应用场景是什么？",
        "a": "Gradle 构建脚本"
      }
    ]
  },
  {
    "id": 2,
    "t": "安装与工具链：SDKMAN、groovy 与 Gradle",
    "p": [
      "用 SDKMAN 安装 Groovy 与 Gradle，或从官网下载二进制包解压使用",
      "groovy 运行脚本，groovysh 提供交互式 Shell，groovyConsole 提供图形化环境",
      "groovyc 编译为字节码，java -cp 可运行编译后的类",
      "Gradle 使用 Groovy 作为构建脚本语言，也是 Groovy 项目的主流构建工具"
    ],
    "c": "// hello.groovy\n// 运行: groovy hello.groovy\nprintln 'Hello from Groovy'\ndef nums = [1, 2, 3]\nprintln nums.collect { it * 2 }\nprintln \"sum=${nums.sum()}\"\n// 交互式: groovysh 或 groovyConsole\n// 编译字节码: groovyc hello.groovy",
    "et": "❌ 常见错误",
    "ec": "安装后直接运行 groovy 却提示找不到命令：需要把 GROOVY_HOME/bin 加入 PATH，并确认 JAVA_HOME 指向 JDK，而不是只安装了 JRE。",
    "q": [
      {
        "q": "交互式 Groovy Shell 的命令是什么？",
        "a": "groovysh"
      },
      {
        "q": "把 Groovy 编译成字节码的命令？",
        "a": "groovyc"
      }
    ]
  },
  {
    "id": 3,
    "t": "变量与常量：def、静态类型与 final",
    "p": [
      "def 声明动态类型变量，运行时根据赋值确定类型，适合脚本与小型工具",
      "也可以写 String name、int count 等静态类型，获得更好的检查与补全",
      "final 修饰变量表示不可重新赋值，配合类型声明表达常量语义",
      "Groovy 没有真正的 const，常量通常用 static final 字段并全部大写"
    ],
    "c": "def name = \"Groovy\"\nString city = \"北京\"\nfinal int MAX = 100\ndef counter = 0\ncounter += 1\nprintln \"$name @ $city\"\nprintln \"MAX=$MAX counter=$counter\"\nprintln name.getClass().name",
    "et": "❌ 常见错误",
    "ec": "以为 def 等于弱类型：def 只是省略类型声明，对象仍有真实类型，类型错误会在运行时抛出 MissingMethodException 或 ClassCastException。",
    "q": [
      {
        "q": "def 声明的变量有类型吗？",
        "a": "有，运行时是真实类型"
      },
      {
        "q": "Groovy 常量通常如何定义？",
        "a": "static final 字段，命名大写"
      }
    ]
  },
  {
    "id": 4,
    "t": "数据类型：数字、字符串、集合与 null",
    "p": [
      "整数默认 Integer，超出范围自动升为 Long，小数默认 BigDecimal",
      "String 与 GString 是两种类型，双引号插值产生 GString，单引号是普通 String",
      "List 与 Map 有一等字面量语法，默认实现是 ArrayList 与 LinkedHashMap",
      "null 表示缺失，Groovy 提供安全导航与 Elvis 运算符简化空值处理"
    ],
    "c": "def i = 42\ndef d = 3.14d\ndef b = true\ndef s = 'text'\ndef g = \"value=$i\"\ndef list = [1, 2, 3]\ndef map = [name: 'Ada', age: 36]\nprintln \"${i.class} ${d.class} ${b.class}\"\nprintln \"${g.class} ${list.class} ${map.getClass()}\"\nprintln(s == 'text')",
    "et": "❌ 常见错误",
    "ec": "用 == 比较两个 BigDecimal 以为会有精度问题：Groovy 的 == 调用 compareTo 做数值比较，与 Java 的引用比较不同，结果通常符合预期。",
    "q": [
      {
        "q": "Groovy 中小数字的默认类型是什么？",
        "a": "BigDecimal"
      },
      {
        "q": "双引号字符串插值后是什么类型？",
        "a": "GString"
      }
    ]
  },
  {
    "id": 5,
    "t": "运算符与表达式：Elvis、安全导航与范围",
    "p": [
      "算术运算符与 Java 类似，/ 返回 BigDecimal，intdiv 才做整数除法",
      "Elvis 运算符 a ?: b 在 a 为假值时返回 b，常用于提供默认值",
      "安全导航 a?.b 在 a 为 null 时直接返回 null，避免空指针异常",
      "范围 1..5 与 1..<5 可迭代，=~ 与 ==~ 用于正则匹配"
    ],
    "c": "def a = 7\ndef b = 2\nprintln(a / b)\nprintln(a.intdiv(b))\nprintln(a % b)\nprintln(2 ** 10)\ndef name = null\nprintln(name ?: \"匿名\")\nprintln(name?.size())\nprintln((1..5).collect { it * 2 })",
    "et": "❌ 常见错误",
    "ec": "把 Elvis 当成三元运算符：a ?: b 只判断 a 是否为假值，不会执行额外条件；需要条件判断时仍应写完整的条件表达式。",
    "q": [
      {
        "q": "Groovy 中 7 / 2 的结果是什么？",
        "a": "3.5，类型为 BigDecimal"
      },
      {
        "q": "a?.b 在 a 为 null 时返回什么？",
        "a": "null"
      }
    ]
  },
  {
    "id": 6,
    "t": "字符串：GString、多行与斜杠字符串",
    "p": [
      "双引号字符串支持 $name 与 ${expression} 插值，产生 GString",
      "单引号字符串不插值，适合字面量、正则与需要稳定类型的场景使用",
      "三引号字符串可以跨行书写，斜杠字符串适合路径与正则，减少转义",
      "常用方法：split、replaceAll、padLeft、stripIndent、readLines"
    ],
    "c": "def name = \"Groovy\"\ndef n = 3\nprintln \"Hello, ${name}! n*n=${n * n}\"\nprintln 'single $name'\nprintln '''多行\n文本'''\ndef path = /usr/local/bin/\nprintln path\nprintln \"abc\".reverse().toUpperCase()\nprintln(\"a,b,c\".split(',') as List)",
    "et": "❌ 常见错误",
    "ec": "把 GString 当 Map 的键：GString 的 hashCode 与等价 String 不同，可能导致 map 查不到值；作为键前应先调用 toString()。",
    "q": [
      {
        "q": "单引号字符串会插值吗？",
        "a": "不会，只有双引号与斜杠字符串支持插值"
      },
      {
        "q": "GString 当 Map 键前应做什么？",
        "a": "调用 toString() 转成 String"
      }
    ]
  },
  {
    "id": 7,
    "t": "集合：List、Map、Range 与闭包方法",
    "p": [
      "List 用 [1, 2, 3]，Map 用 [key: value]，支持下标与属性式访问",
      "each、collect、findAll、inject 等闭包方法替代手写循环",
      "范围 1..5 是 IntRange，可用 step 控制步长并直接迭代",
      "展开运算符 *. 可批量取属性，as 可做类型转换或接口适配"
    ],
    "c": "def list = [3, 1, 2]\nprintln(list.sort())\nprintln(list.collect { it * 2 })\nprintln(list.findAll { it > 1 })\nprintln(list.inject(0) { acc, x -> acc + x })\ndef map = [a: 1, b: 2]\nmap.c = 3\nprintln map\nprintln(list*.toString())\nprintln((1..5).step(2))",
    "et": "❌ 常见错误",
    "ec": "在 each 中修改集合结构：遍历时增删元素可能导致 ConcurrentModificationException 或跳过元素，应先复制或改用 collect 生成新集合。",
    "q": [
      {
        "q": "collect 与 each 的区别是什么？",
        "a": "collect 返回新集合，each 只遍历执行副作用"
      },
      {
        "q": "Map 字面量如何声明？",
        "a": "[key: value]"
      }
    ]
  },
  {
    "id": 8,
    "t": "条件分支：if、switch 与 in 运算符",
    "p": [
      "if/else 与 Java 类似，但条件必须是布尔值，Groovy 不会把数字当布尔",
      "switch 支持字符串、范围、正则、列表与闭包等多种 case",
      "in 运算符调用 isCase，可判断成员、范围或对象类型的匹配",
      "Groovy 真值规则：null、false、空字符串、空集合与数字 0 均为假"
    ],
    "c": "def score = 85\nif (score >= 90) {\n    println \"A\"\n} else if (score >= 60) {\n    println \"B\"\n} else {\n    println \"C\"\n}\ndef x = 3\ndef label = (x in [1, 2]) ? \"small\" : \"other\"\nprintln label\nswitch (x) {\n    case 1..5: println \"1..5\"; break\n    default: println \"other\"\n}",
    "et": "❌ 常见错误",
    "ec": "把 Java 的 switch 习惯照搬：Groovy 的 case 可用范围与正则，但仍需 break 或 return，否则会继续执行后面的分支。",
    "q": [
      {
        "q": "Groovy 中哪些值在条件里为假？",
        "a": "null、false、空字符串、空集合与数字 0"
      },
      {
        "q": "in 运算符依赖对象的哪个方法？",
        "a": "isCase"
      }
    ]
  },
  {
    "id": 9,
    "t": "循环与递归：for-in、times 与闭包",
    "p": [
      "for (x in collection) 遍历集合、范围与 Map，语法比 Java 更短",
      "times、upto、downto、step 是整数上的便捷迭代方法",
      "each 与 eachWithIndex 接受闭包，适合对集合执行副作用",
      "递归可用普通方法或闭包实现，闭包自引用前需要先声明变量并赋值"
    ],
    "c": "for (i in 1..3) println \"i=$i\"\n3.times { println \"times $it\" }\ndef list = ['a', 'b']\nlist.eachWithIndex { v, i -> println \"$i: $v\" }\n\ndef factorial\nfactorial = { int n -> n <= 1 ? 1 : n * factorial(n - 1) }\nprintln factorial(5)\n\ndef sum\nsum = { List xs, int acc -> xs ? sum(xs.tail(), acc + xs.head()) : acc }\nprintln sum([1, 2, 3], 0)",
    "et": "❌ 常见错误",
    "ec": "在闭包中直接递归却写成 def f = { f() }：此时 f 尚未赋值完成，运行时报 NullPointerException；应先写 def f 再给 f 赋值闭包。",
    "q": [
      {
        "q": "3.times 中的 it 表示什么？",
        "a": "当前迭代序号，从 0 开始"
      },
      {
        "q": "闭包递归前为什么要先声明变量？",
        "a": "避免闭包创建时变量尚未赋值"
      }
    ]
  },
  {
    "id": 10,
    "t": "函数基础：def、默认参数与可变参数",
    "p": [
      "def 定义方法，返回类型可省略，最后一个表达式的值即返回值",
      "参数可以写默认值，调用时省略不传，可减少大量重载方法的定义工作",
      "可变参数用 int... xs 声明，方法内直接按数组处理即可",
      "方法调用可省略括号与分号，但复杂表达式建议保留括号避免解析歧义"
    ],
    "c": "def greet(String name, String prefix = \"Hello\") {\n    \"$prefix, $name\"\n}\nprintln greet(\"Groovy\")\nprintln greet(\"Lua\", \"Hi\")\n\ndef sum(int... xs) {\n    xs.sum()\n}\nprintln sum(1, 2, 3, 4)",
    "et": "❌ 常见错误",
    "ec": "省略括号后与命令式语法混淆：println a + b 可能被解析成 (println a) + b，应写成 println(a + b) 明确运算顺序。",
    "q": [
      {
        "q": "Groovy 方法最后一个表达式是什么？",
        "a": "返回值"
      },
      {
        "q": "可变参数在方法内是什么类型？",
        "a": "数组"
      }
    ]
  },
  {
    "id": 11,
    "t": "函数进阶：闭包、柯里化与组合",
    "p": [
      "闭包是带状态的代码块，可赋给变量、作为参数传递或作为返回值使用",
      "curry 把多参数闭包转成逐层接收参数的闭包，便于复用与组合",
      "compose 与 andThen 组合函数，memoize 可缓存纯函数结果",
      "方法引用可用 :: 或 & 方法名 取得，减少重复 lambda"
    ],
    "c": "def nums = [1, 2, 3, 4]\nprintln nums.collect { it * it }.findAll { it % 2 == 0 }\ndef twice = { int x -> x * 2 }\ndef add = { int a, int b -> a + b }\nprintln twice(5)\nprintln add.curry(10)(5)\ndef compose = { f, g -> { x -> f(g(x)) } }\nprintln compose(twice, twice)(3)\nprintln nums.inject(1) { acc, x -> acc * x }",
    "et": "❌ 常见错误",
    "ec": "混淆闭包参数 it 与显式参数：嵌套闭包中 it 只指最内层，外层参数需要命名；否则会取到错误对象或编译失败。",
    "q": [
      {
        "q": "curry 的作用是什么？",
        "a": "把多参数闭包转成逐层接收参数的闭包"
      },
      {
        "q": "闭包默认的隐式参数名是什么？",
        "a": "it"
      }
    ]
  },
  {
    "id": 12,
    "t": "作用域与闭包：捕获与共享状态",
    "p": [
      "def 在脚本顶层是局部变量，未声明直接赋值才会进入脚本绑定",
      "闭包捕获外层局部变量，可读可写，从而形成一份独立的私有状态空间",
      "每次调用工厂方法都会创建独立的捕获环境，计数器彼此互不影响，互相独立",
      "this 在闭包中默认指向外围对象，可用 owner、delegate 调整"
    ],
    "c": "def makeCounter() {\n    def count = 0\n    return { count += 1 }\n}\ndef c1 = makeCounter()\nprintln c1()\nprintln c1()\ndef c2 = makeCounter()\nprintln c2()\n\ndef outer = { x ->\n    def inner = { y -> x + y }\n    inner\n}\nprintln outer(10)(5)",
    "et": "❌ 常见错误",
    "ec": "在循环中创建闭包并期望捕获当前值：闭包共享同一个循环变量，最终都看到最后的值；应在循环体内新建局部变量保存当前值。",
    "q": [
      {
        "q": "闭包捕获的是值还是变量？",
        "a": "变量本身"
      },
      {
        "q": "owner 与 delegate 的作用是什么？",
        "a": "控制闭包方法解析的委托对象"
      }
    ]
  },
  {
    "id": 13,
    "t": "类与对象：属性、构造器与 AST 转换",
    "p": [
      "class 定义类，字段省略可见性修饰符时会生成 getter 与 setter",
      "Map 构造器可直接按属性名初始化对象，如 new User(name: 'Ada')",
      "@ToString、@EqualsAndHashCode 等 AST 转换自动生成样板方法",
      "static 成员与单例可用 @Singleton 简化，避免手写 getInstance"
    ],
    "c": "class User {\n    String name\n    int age\n\n    String greet() { \"Hi, $name ($age)\" }\n}\n\ndef u = new User(name: 'Ada', age: 36)\nprintln u.greet()\nu.age = 37\nprintln u.age\nprintln u.getClass().simpleName",
    "et": "❌ 常见错误",
    "ec": "给属性同时手写 getter 与同名字段：Groovy 的属性机制会与手写方法冲突，导致访问结果与预期不一致；应只保留一种方式。",
    "q": [
      {
        "q": "Groovy 字段默认的可见性是什么？",
        "a": "private，同时生成 public getter/setter"
      },
      {
        "q": "Map 构造器依靠什么初始化属性？",
        "a": "按属性名匹配并调用 setter"
      }
    ]
  },
  {
    "id": 14,
    "t": "继承与多态：extends、super 与动态分派",
    "p": [
      "类用 extends 单继承，方法默认 public，可省略修饰符",
      "子类重写方法用 @Override 标注，可调用 super 复用父类逻辑",
      "多态由 JVM 动态分派，父类引用会调用到子类的实际实现方法",
      "Groovy 还可通过 metaClass 在运行时增删方法，但应谨慎使用"
    ],
    "c": "class Animal {\n    String name\n    String speak() { \"...\" }\n}\nclass Dog extends Animal {\n    @Override\n    String speak() { \"Woof, I am $name\" }\n}\nclass Puppy extends Dog {\n    @Override\n    String speak() { super.speak() + \" (small)\" }\n}\ndef animals = [new Animal(name: 'x'), new Dog(name: 'Rex'), new Puppy(name: 'Tom')]\nanimals.each { println it.speak() }",
    "et": "❌ 常见错误",
    "ec": "误以为 Groovy 方法重载完全按运行时类型选择：重载在编译期按静态类型解析，动态分派只适用于重写，混用时会调用错误版本。",
    "q": [
      {
        "q": "Groovy 类支持多继承吗？",
        "a": "不支持，只能单继承"
      },
      {
        "q": "调用父类实现用什么关键字？",
        "a": "super"
      }
    ]
  },
  {
    "id": 15,
    "t": "接口、抽象类与 trait",
    "p": [
      "interface 定义方法签名，Groovy 3 支持接口默认方法与私有方法",
      "abstract class 可包含抽象方法与具体实现，可以有构造参数",
      "trait 提供方法实现与字段，一个类可实现多个 trait",
      "trait 的方法冲突需要显式重写，否则编译器会直接报错无法通过"
    ],
    "c": "interface Runner {\n    String run()\n}\ntrait Flying {\n    String fly() { \"flying\" }\n}\nabstract class Bird implements Runner {\n    abstract String name()\n    String describe() { \"${name()} 可以跑\" }\n}\nclass Duck extends Bird implements Runner {\n    String name() { \"Duck\" }\n    String run() { \"running\" }\n}\nclass Eagle extends Bird implements Runner, Flying {\n    String name() { \"Eagle\" }\n    String run() { \"fast running\" }\n}\nprintln new Duck().describe()\nprintln new Eagle().fly()",
    "et": "❌ 常见错误",
    "ec": "把 trait 当成接口使用却定义构造参数：trait 不能有构造参数，需要状态初始化逻辑时应改用抽象类或组合。",
    "q": [
      {
        "q": "一个类能实现几个 trait？",
        "a": "任意多个"
      },
      {
        "q": "trait 能有构造参数吗？",
        "a": "不能"
      }
    ]
  },
  {
    "id": 16,
    "t": "泛型与类型参数",
    "p": [
      "类与方法都可用 <T> 声明类型参数，语法与 Java 基本一致",
      "泛型在 JVM 上会类型擦除，运行时无法判断 List<String> 与 List<Integer>",
      "上界 <T extends Comparable<T>> 限制类型参数的范围",
      "配合 @CompileStatic 才能获得较完整的泛型编译期检查"
    ],
    "c": "class Box<T> {\n    T value\n    Box(T value) { this.value = value }\n    <R> Box<R> map(Closure<R> f) { new Box<R>(f(value)) }\n}\ndef b = new Box<Integer>(41).map { it + 1 }\nprintln b.value\n\ndef nums = [3, 1, 2]\nprintln nums.max()\nprintln nums.min()",
    "et": "❌ 常见错误",
    "ec": "在动态 Groovy 中依赖泛型做运行时校验：类型参数会被擦除，List<String> 仍可放入 Integer，需要显式检查或使用 @CompileStatic。",
    "q": [
      {
        "q": "JVM 泛型在运行时保留类型参数吗？",
        "a": "不保留，会发生类型擦除"
      },
      {
        "q": "Box<Integer> 能放入字符串吗？",
        "a": "动态 Groovy 可以，编译期不阻止"
      }
    ]
  },
  {
    "id": 17,
    "t": "错误处理：try、catch 与自定义异常",
    "p": [
      "try/catch/finally 与 Java 类似，catch 可捕获多个异常类型",
      "Groovy 不强制检查受检异常，无需在方法签名声明 throws",
      "throw 可抛任意 Throwable，自定义异常通常继承 RuntimeException",
      "assert 用于断言，失败抛 AssertionError，可附带消息"
    ],
    "c": "def parse(String s) {\n    try {\n        return Integer.parseInt(s)\n    } catch (NumberFormatException e) {\n        println \"解析失败: ${e.message}\"\n        return null\n    } finally {\n        println \"finally 总执行\"\n    }\n}\nprintln parse(\"42\")\nprintln parse(\"x\")\n\ntry {\n    throw new IllegalStateException(\"boom\")\n} catch (IllegalStateException | IllegalArgumentException e) {\n    println \"捕获: $e.message\"\n}",
    "et": "❌ 常见错误",
    "ec": "依赖 Groovy 不检查受检异常而忽略 IOException：编译能过但运行时仍会抛出，关键 I/O 路径必须显式捕获或向上传递。",
    "q": [
      {
        "q": "Groovy 需要在方法上声明 throws 吗？",
        "a": "不需要，受检异常不被强制检查"
      },
      {
        "q": "finally 块何时执行？",
        "a": "无论是否异常都会执行"
      }
    ]
  },
  {
    "id": 18,
    "t": "文件 I/O：File、withWriter 与 NIO",
    "p": [
      "File 扩展了 withWriter、withReader、eachLine、text 等便捷方法",
      "withWriter 自动关闭流，闭包抛异常时也能正确释放资源",
      "eachLine 逐行读取，适合处理日志与大文件等常见场景使用",
      "需要路径操作与 NIO 特性时使用 java.nio.file.Files 与 Paths"
    ],
    "c": "def file = new File('out.txt')\nfile.withWriter('UTF-8') { w ->\n    w.writeLine 'hello'\n    w.writeLine 'groovy'\n}\ndef i = 0\nfile.eachLine('UTF-8') { line ->\n    println \"${++i}: $line\"\n}\nprintln file.text\nfile.delete()",
    "et": "❌ 常见错误",
    "ec": "用 file.text 读取大文件：会把全部内容一次载入内存，导致内存溢出；大文件应使用 eachLine 或 withReader 流式处理。",
    "q": [
      {
        "q": "withWriter 的好处是什么？",
        "a": "自动关闭流，异常时也能释放资源"
      },
      {
        "q": "按行读取大文件用什么方法？",
        "a": "eachLine"
      }
    ]
  },
  {
    "id": 19,
    "t": "正则表达式：=~、==~ 与 Matcher",
    "p": [
      "=~ 返回 java.util.regex.Matcher，可 find、group 与循环读取",
      "==~ 要求整个输入字符串完全匹配，并返回对应的布尔结果值即可",
      "斜杠字符串适合书写正则表达式，能避免大量反斜杠字符转义的问题",
      "replaceAll、replaceFirst 可直接在字符串上做替换"
    ],
    "c": "def text = \"订单 A123，电话 010-1234\"\ndef m = text =~ /(\\d{3})-(\\d{4})/\nif (m.find()) {\n    println \"完整: ${m.group(0)}\"\n    println \"区号: ${m.group(1)}\"\n}\nprintln text.replaceAll(/\\d+/, '#')\nprintln('A123' ==~ /[A-Z]\\d{3}/)\n\ndef matcher = 'a=1,b=2' =~ /(\\w)=(\\d)/\nwhile (matcher.find()) {\n    println \"${matcher.group(1)}=${matcher.group(2)}\"\n}",
    "et": "❌ 常见错误",
    "ec": "把 =~ 的结果直接当布尔值使用：它返回 Matcher，Groovy 真值判断依赖是否找到匹配，但后续 find 会改变状态，应显式调用 find。",
    "q": [
      {
        "q": "=~ 与 ==~ 有什么区别？",
        "a": "=~ 返回 Matcher 做部分匹配，==~ 要求整体完全匹配"
      },
      {
        "q": "如何读取第一个捕获组？",
        "a": "matcher.group(1)"
      }
    ]
  },
  {
    "id": 20,
    "t": "模块与包：package、Grape 与 Gradle",
    "p": [
      "package 声明命名空间，import 导入类，可用 as 起别名",
      "@Grab 注解在脚本中直接下载 Maven 依赖，适合单文件工具",
      "Gradle 用 dependencies 块声明实现、测试与运行时依赖",
      "多模块项目用 settings.gradle 注册子项目，模块间通过 project 依赖引用"
    ],
    "c": "// src/main/groovy/demo/App.groovy\npackage demo\n\nimport groovy.transform.CompileStatic\n\n@CompileStatic\nclass App {\n    static void main(String[] args) {\n        println \"模块化应用\"\n    }\n}\n// Gradle 依赖声明（build.gradle）\n// dependencies {\n//     implementation 'org.codehaus.groovy:groovy:3.0.21'\n// }",
    "et": "❌ 常见错误",
    "ec": "在 @Grab 中写错 group 或 artifact 坐标：运行时报错找不到依赖，应先在 Maven Central 核对 groupId、artifactId 与版本号。",
    "q": [
      {
        "q": "@Grab 适合什么场景？",
        "a": "脚本中直接下载 Maven 依赖"
      },
      {
        "q": "Gradle 多模块用什么文件注册子项目？",
        "a": "settings.gradle"
      }
    ]
  },
  {
    "id": 21,
    "t": "标准库速查与工具链",
    "p": [
      "依赖管理：Grape 的 @Grab 适合脚本，Gradle 适合正式项目",
      "测试框架 Spock 基于 given/when/then，断言表达力强",
      "格式化工具 Spotless 可统一 Groovy 代码风格并接入 CI",
      "groovyConsole 可交互试验，远程调试通过 JDWP 端口连接 IDE"
    ],
    "c": "# 依赖：Grape 注解，无需构建文件\n# @Grab('org.apache.commons:commons-lang3:3.14.0')\n\n# 构建：Gradle + groovy 插件\ngradle build\ngradle test\ngradle run\n\n# 测试框架：Spock\ngradle test --tests '*Spec'\n\n# 格式化：Spotless\ngradle spotlessApply\ngradle spotlessCheck\n\n# 调试：groovyConsole 或 JDWP 远程端口\ngroovyConsole\ngroovy -Xrunjdwp:transport=dt_socket,server=y,suspend=n,port=5005 app.groovy\n\n# 运行脚本\ngroovy app.groovy",
    "et": "❌ 常见错误",
    "ec": "在 Gradle 项目中只改 IDE 配置而不提交 build.gradle：换机器后依赖与任务全部失效；所有构建配置都应纳入版本控制。",
    "q": [
      {
        "q": "Groovy 项目常用的测试框架是什么？",
        "a": "Spock"
      },
      {
        "q": "Spotless 的检查任务叫什么？",
        "a": "spotlessCheck"
      }
    ]
  },
  {
    "id": 22,
    "t": "并发与异步：线程、Future 与 GPars",
    "p": [
      "Thread 与 ExecutorService 可直接使用，Groovy 闭包可强制转换为 Runnable",
      "CompletableFuture 支持链式异步组合，thenApply、thenAccept 处理结果",
      "GPars 提供数据流、Actor 与并行集合等更高层次的抽象",
      "共享可变状态需要加锁保护，或改用不可变数据与消息传递机制即可"
    ],
    "c": "import java.util.concurrent.Executors\nimport java.util.concurrent.CompletableFuture\n\ndef pool = Executors.newFixedThreadPool(2)\ndef futures = (1..4).collect { n ->\n    CompletableFuture.supplyAsync({ n * n }, pool)\n}\nprintln futures.collect { it.join() }\npool.shutdown()\n\ndef cf = CompletableFuture.supplyAsync { 20 }\ncf = cf.thenApply { it + 22 }\ncf.thenAccept { println \"结果: $it\" }\ncf.join()",
    "et": "❌ 常见错误",
    "ec": "在闭包中修改共享变量却未加锁：Groovy 闭包不是线程安全的，多线程下计数会丢失；应使用 AtomicInteger 或 synchronized。",
    "q": [
      {
        "q": "CompletableFuture 如何取值？",
        "a": "调用 join 或 get"
      },
      {
        "q": "GPars 提供哪些并发抽象？",
        "a": "数据流、Actor、并行集合"
      }
    ]
  },
  {
    "id": 23,
    "t": "性能优化：静态编译与字符串构建",
    "p": [
      "关键类加 @CompileStatic 消除动态分派开销，性能接近 Java",
      "避免在循环中做 GString 拼接，使用 StringBuilder 或 collect 后 join",
      "为集合预先估算容量，减少扩容与哈希重排带来的明显额外开销成本",
      "用 JMH 或 Gradle 基准测试进行测量，不要只凭感觉优化"
    ],
    "c": "import groovy.transform.CompileStatic\n\n@CompileStatic\nclass Summer {\n    static long sum(int n) {\n        long acc = 0\n        for (int i = 1; i <= n; i++) acc += i\n        return acc\n    }\n}\nlong start = System.nanoTime()\nprintln Summer.sum(1_000_000)\nprintln \"耗时: ${(System.nanoTime() - start) / 1_000_000} ms\"\n\ndef sb = new StringBuilder()\n1000.times { sb.append(it) }\nprintln sb.length()",
    "et": "❌ 常见错误",
    "ec": "在热点循环中使用动态 Groovy 并频繁调用 metaClass：每次调用都要查找方法，开销远高于 Java；应加 @CompileStatic 并避免反射。",
    "q": [
      {
        "q": "@CompileStatic 的核心作用是什么？",
        "a": "编译期静态分派，提升性能与类型检查"
      },
      {
        "q": "循环拼接字符串应使用什么？",
        "a": "StringBuilder"
      }
    ]
  },
  {
    "id": 24,
    "t": "测试：Spock 的 given/when/then",
    "p": [
      "Spock 的 Specification 用 given、when、then 描述行为，可读性高",
      "expect 用于纯表达式断言，where 块用于数据驱动测试",
      "Mock 与 Stub 由 Spock 内置支持，无需额外 Mock 框架",
      "Gradle test 运行全部测试，--tests 可筛选特定 Spec"
    ],
    "c": "// src/test/groovy/CalculatorSpec.groovy\nimport spock.lang.Specification\n\nclass Calculator {\n    int add(int a, int b) { a + b }\n}\n\nclass CalculatorSpec extends Specification {\n    def \"加法返回正确结果\"() {\n        given: \"一个计算器\"\n        def calc = new Calculator()\n\n        when: \"计算 2 + 3\"\n        def result = calc.add(2, 3)\n\n        then: \"结果为 5\"\n        result == 5\n    }\n}",
    "et": "❌ 常见错误",
    "ec": "在 then 块中写非布尔表达式：Spock 会把每个表达式当断言，但赋值或副作用语句不受支持，应把准备逻辑放到 given 块。",
    "q": [
      {
        "q": "Spock 的四个主要标签是什么？",
        "a": "given、when、then、where"
      },
      {
        "q": "Spock 内置 Mock 吗？",
        "a": "内置，无需额外框架"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧：输出、Console 与远程调试",
    "p": [
      "println 与 @ToString 快速输出对象状态，定位后及时清理",
      "groovyConsole 可逐段执行脚本并查看变量与 AST",
      "远程调试用 JDWP 参数启动，IDE 连接 5005 端口下断点",
      "assert 与 -ea 可在开发期尽早暴露不变量被破坏的问题"
    ],
    "c": "class User {\n    String name\n    int age\n    String toString() { \"User($name, $age)\" }\n}\n\ndef u = new User(name: 'Ada', age: 36)\nprintln u\nassert u.age == 36 : \"年龄应为 36，实际 ${u.age}\"\n\n// 运行: groovy app.groovy\n// groovyConsole 可查看变量与 AST\n// 远程调试: groovy -Xrunjdwp:transport=dt_socket,server=y,port=5005 app.groovy\n\ntry {\n    null.foo()\n} catch (NullPointerException e) {\n    println \"NPE: ${e.message}\"\n}",
    "et": "❌ 常见错误",
    "ec": "只打印对象的默认 toString：输出类名与哈希，无法看出字段；应使用 @ToString 或显式拼接关键字段。",
    "q": [
      {
        "q": "groovyConsole 能做什么？",
        "a": "交互执行脚本并查看变量与 AST"
      },
      {
        "q": "远程调试常用哪个端口？",
        "a": "5005"
      }
    ]
  },
  {
    "id": 26,
    "t": "与 Java 及系统互操作",
    "p": [
      "Groovy 可以直接调用 Java 类与方法，无需任何额外适配层",
      "闭包可自动转换为 Java 的 Runnable、Callable 与 SAM 接口",
      "GroovyObject 与 metaClass 可在运行时反射调用方法",
      "通过 Process 或 execute() 调用外部命令，读取标准输出"
    ],
    "c": "import java.time.LocalDate\n\ndef list = new java.util.ArrayList<String>()\nlist.add('a')\nlist.add('b')\nprintln list.join(',')\n\ndef date = LocalDate.now()\nprintln date.plusDays(7)\n\ndef proc = 'echo hello'.execute()\nproc.waitFor()\nprintln proc.text.trim()\n\nprintln new StringBuilder('abc').reverse()",
    "et": "❌ 常见错误",
    "ec": "把 Groovy 闭包传给需要 Java 函数式接口的方法却忘记强转：部分 API 不会自动转换，应写 as Runnable 或显式实现接口。",
    "q": [
      {
        "q": "Groovy 调用 Java 类需要包装吗？",
        "a": "不需要，可直接调用"
      },
      {
        "q": "执行外部命令用什么方法？",
        "a": "字符串的 execute() 或 Process"
      }
    ]
  },
  {
    "id": 27,
    "t": "设计模式：单例、策略与装饰器",
    "p": [
      "单例用 @Singleton，工厂用静态方法或 Map 构造器",
      "策略模式可用 Map 存放闭包，按名称动态选择具体的算法实现",
      "装饰器通过包装对象并转发调用实现，通常比继承组合方式更灵活选择",
      "观察者可用闭包列表实现，事件注册与通知都相当简洁轻量可靠实现"
    ],
    "c": "import groovy.transform.Singleton\n\n@Singleton\nclass Config {\n    String env = 'dev'\n}\nprintln Config.instance.env\n\nclass Pizza {\n    String size\n    List<String> toppings = []\n    Pizza size(String s) { this.size = s; this }\n    Pizza topping(String t) { toppings << t; this }\n}\ndef p = new Pizza().size('L').topping('cheese').topping('ham')\nprintln \"${p.size} ${p.toppings}\"\n\ndef strategy = [add: { a, b -> a + b }, mul: { a, b -> a * b }]\nprintln strategy.add(2, 3)",
    "et": "❌ 常见错误",
    "ec": "用 metaClass 动态改写核心类实现 AOP：全局生效且难以追踪，测试之间还会互相污染；应优先用装饰器或显式代理。",
    "q": [
      {
        "q": "@Singleton 生成什么？",
        "a": "线程安全的单例与 instance 属性"
      },
      {
        "q": "策略模式用 Map 存闭包有什么好处？",
        "a": "按名称动态选择算法，扩展方便"
      }
    ]
  },
  {
    "id": 28,
    "t": "数据库访问：groovy.sql.Sql",
    "p": [
      "groovy.sql.Sql 封装 JDBC，提供 eachRow、rows、execute 等便捷方法",
      "连接参数包含 JDBC URL、用户名、密码与驱动类名等信息",
      "参数化查询使用问号占位符，参数以列表形式依次传入并绑定参数即可",
      "withTransaction 可把多条语句放在同一事务中，异常自动回滚"
    ],
    "c": "import groovy.sql.Sql\n\ndef url = 'jdbc:sqlite:demo.db'\ndef sql = Sql.newInstance(url, 'org.sqlite.JDBC')\nsql.execute '''\n    CREATE TABLE IF NOT EXISTS user (\n        id INTEGER PRIMARY KEY,\n        name TEXT NOT NULL\n    )\n'''\nsql.execute 'INSERT INTO user(name) VALUES (?)', ['Ada']\nsql.eachRow('SELECT id, name FROM user') { row ->\n    println \"${row.id}: ${row.name}\"\n}\nsql.close()",
    "et": "❌ 常见错误",
    "ec": "用 GString 拼接 SQL：Groovy 的插值会把变量直接拼进语句，造成 SQL 注入；必须使用问号占位符与参数列表。",
    "q": [
      {
        "q": "Sql 类按行遍历结果用什么方法？",
        "a": "eachRow"
      },
      {
        "q": "参数化查询的占位符是什么？",
        "a": "问号 ?"
      }
    ]
  },
  {
    "id": 29,
    "t": "网络编程与 HTTP 客户端",
    "p": [
      "JDK 11 的 HttpClient 可在 Groovy 中直接使用，支持同步与异步",
      "HttpRequest 用 builder 设置 URI、请求头与方法",
      "JsonSlurper 解析响应 JSON，JsonOutput 生成 JSON",
      "生产可用 Ratpack、Micronaut 或 Spring Boot 的客户端"
    ],
    "c": "import java.net.URI\nimport java.net.http.HttpClient\nimport java.net.http.HttpRequest\nimport java.net.http.HttpResponse\nimport groovy.json.JsonSlurper\n\ndef client = HttpClient.newHttpClient()\ndef req = HttpRequest.newBuilder(URI.create('https://httpbin.org/get'))\n        .header('Accept', 'application/json')\n        .GET().build()\ndef res = client.send(req, HttpResponse.BodyHandlers.ofString())\nprintln res.statusCode()\ndef json = new JsonSlurper().parseText(res.body())\nprintln json.url",
    "et": "❌ 常见错误",
    "ec": "用 JsonSlurper 解析非 JSON 响应：会抛 JsonException；应先检查 Content-Type 与状态码，再决定解析方式。",
    "q": [
      {
        "q": "解析 JSON 响应用什么类？",
        "a": "JsonSlurper"
      },
      {
        "q": "HttpClient 支持异步请求吗？",
        "a": "支持，sendAsync 返回 CompletableFuture"
      }
    ]
  },
  {
    "id": 30,
    "t": "安全编程：注入、哈希与输出转义",
    "p": [
      "SQL 使用参数化查询，禁止用 GString 拼接用户输入",
      "密码使用 bcrypt、scrypt 或 Argon2，并加随机盐",
      "输出到 HTML 页面之前先做转义，避免常见的 XSS 注入风险",
      "敏感配置放在环境变量或密钥管理中，不写入任何代码与日志信息内容"
    ],
    "c": "import groovy.sql.Sql\nimport java.security.MessageDigest\n\ndef hash(String s) {\n    MessageDigest.getInstance('SHA-256')\n        .digest(s.getBytes('UTF-8'))\n        .encodeHex().toString()\n}\nprintln hash('password')\n\ndef sql = Sql.newInstance('jdbc:sqlite:demo.db', 'org.sqlite.JDBC')\nprintln sql.rows('SELECT * FROM user WHERE name = ?', ['Ada'])\nsql.close()\ndef input = \"' OR '1'='1\"\nprintln \"不要拼接: SELECT * FROM user WHERE name = '$input'\"",
    "et": "❌ 常见错误",
    "ec": "用 GString 拼 SQL 并以为加引号就安全：攻击者可用引号闭合绕过；参数化查询才能把输入与 SQL 结构彻底分离。",
    "q": [
      {
        "q": "为什么不能拼接 SQL 字符串？",
        "a": "会造成 SQL 注入"
      },
      {
        "q": "密码存储应该用什么算法？",
        "a": "bcrypt、scrypt 或 Argon2"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战：命令行文件统计工具",
    "p": [
      "groovy.cli.commons.CliBuilder 解析短选项、长选项与位置参数",
      "usage 定义帮助文本，parse 返回包含解析结果的选项对象",
      "无参数或传入 -h 时打印用法说明并正常结束程序进程并退出运行",
      "处理文件时先检查存在性，错误信息写入标准错误输出 stderr"
    ],
    "c": "import groovy.cli.commons.CliBuilder\n\ndef cli = new CliBuilder(usage: 'wc.groovy [options] file...')\ncli.l(longOpt: 'lines', '只统计行数')\ncli.h(longOpt: 'help', '显示帮助')\ndef opts = cli.parse(args)\nif (!opts || opts.h) {\n    cli.usage()\n    return\n}\nopts.arguments().each { path ->\n    def f = new File(path)\n    if (!f.exists()) {\n        System.err.println \"不存在: $path\"\n        return\n    }\n    def lines = f.readLines().size()\n    println(opts.l ? \"$lines $path\" : \"${lines}\\t${f.length()}\\t$path\")\n}",
    "et": "❌ 常见错误",
    "ec": "调用 cli.parse(args) 后不检查返回值：参数非法时返回 null，继续访问选项会抛 NullPointerException；应先判断并打印 usage。",
    "q": [
      {
        "q": "Groovy 中解析命令行选项用什么？",
        "a": "CliBuilder"
      },
      {
        "q": "参数非法时 parse 返回什么？",
        "a": "null"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战：HttpServer 提供 Web 服务",
    "p": [
      "JDK 自带 HttpServer 可在 Groovy 中快速搭建原型",
      "createContext 注册路径，闭包会自动转换为 HttpHandler",
      "设置响应头与 Content-Length 后再写入响应体内容",
      "生产可用 Ratpack、Spring Boot 或 Micronaut"
    ],
    "c": "import com.sun.net.httpserver.HttpServer\nimport java.net.InetSocketAddress\n\ndef server = HttpServer.create(new InetSocketAddress(8080), 0)\nserver.createContext('/hello') { exchange ->\n    def body = \"Hello from Groovy!\".getBytes('UTF-8')\n    exchange.responseHeaders.add('Content-Type', 'text/plain; charset=utf-8')\n    exchange.sendResponseHeaders(200, body.length)\n    exchange.responseBody.withCloseable { it.write(body) }\n}\nserver.start()\nprintln 'http://localhost:8080/hello'",
    "et": "❌ 常见错误",
    "ec": "在处理器中直接抛异常：HttpServer 不会自动返回错误页，连接可能挂起；应捕获异常并主动发送 500 响应。",
    "q": [
      {
        "q": "闭包能直接作为 HttpHandler 吗？",
        "a": "可以，Groovy 会自动 SAM 转换"
      },
      {
        "q": "响应头中 Content-Type 的作用是什么？",
        "a": "告诉客户端响应体的类型与编码"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建、部署与发布",
    "p": [
      "Gradle 的 groovy 插件编译 src/main/groovy 与 src/test/groovy",
      "application 插件生成启动脚本，shadow 插件打 fat jar",
      "java -jar 运行可执行 jar，groovy -cp 可直接运行脚本与依赖",
      "容器化使用 Gradle 多阶段构建，减小最终运行镜像的体积"
    ],
    "c": "# Gradle 构建可执行 jar\ngradle clean build\njava -jar build/libs/app.jar\n\n# 打包所有依赖（Shadow 插件）\ngradle shadowJar\n\n# 运行脚本无需构建\ngroovy -cp 'lib/*' app.groovy\n\n# Docker 多阶段构建\ndocker build -t demo-groovy .\ndocker run --rm -p 8080:8080 demo-groovy",
    "et": "❌ 常见错误",
    "ec": "打包时漏掉运行时依赖：java -jar 报 ClassNotFoundException；应使用 shadowJar 或检查 runtimeOnly 依赖是否齐全。",
    "q": [
      {
        "q": "打 fat jar 常用哪个 Gradle 插件？",
        "a": "Shadow 插件"
      },
      {
        "q": "运行 Groovy 脚本时如何附加依赖？",
        "a": "groovy -cp 指定类路径"
      }
    ]
  },
  {
    "id": 34,
    "t": "最佳实践与代码风格",
    "p": [
      "核心业务加 @CompileStatic，脚本与 DSL 保留动态特性",
      "优先使用不可变数据与 collect 等无副作用的转换操作即可",
      "用 Spotless 统一格式，CodeNarc 做静态检查",
      "避免滥用 metaClass 与运行时方法注入，保持可调试性"
    ],
    "c": "import groovy.transform.CompileStatic\n\n@CompileStatic\nclass Money {\n    final BigDecimal amount\n    final String currency\n\n    Money(BigDecimal amount, String currency) {\n        this.amount = amount\n        this.currency = currency\n    }\n\n    Money plus(Money other) {\n        assert currency == other.currency\n        new Money(amount + other.amount, currency)\n    }\n}\n\ndef m = new Money(10.5, 'CNY')\nprintln m.plus(new Money(2, 'CNY')).amount",
    "et": "❌ 常见错误",
    "ec": "给所有类都加 @CompileStatic 却仍使用动态特性：闭包委托、missingMethod 等会编译失败；应按模块选择静态或动态。",
    "q": [
      {
        "q": "Groovy 代码风格检查常用什么工具？",
        "a": "CodeNarc"
      },
      {
        "q": "哪些代码适合保留动态特性？",
        "a": "脚本、DSL 与 Gradle 构建逻辑"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "先掌握脚本语法、闭包与集合操作，再学习类以及 AST 转换知识",
      "深入 Gradle 插件、Spock 测试与 Jenkins Pipeline 实践",
      "需要高性能时学习 @CompileStatic、并发与 JVM 调优",
      "Web 方向可学习 Ratpack、Micronaut 或 Spring Boot"
    ],
    "c": "def roadmap = [\n    '基础': ['def', 'GString', '集合', '闭包'],\n    '进阶': ['泛型', 'trait', 'AST 转换', '@CompileStatic'],\n    '工程': ['Gradle', 'Spock', 'Spotless', 'CI/CD']\n]\nroadmap.each { k, v -> println \"$k: ${v.join(' / ')}\" }\ndef total = roadmap.values().sum { it.size() }\nprintln \"共 ${total} 个主题\"\nprintln '下一步：用 Gradle + Spock 写一个小型 Web API'",
    "et": "❌ 常见错误",
    "ec": "只把 Groovy 当 Gradle 脚本语言：会错过闭包、Spock 与动态 DSL 的价值；应写一个完整小项目来理解其设计取舍。",
    "q": [
      {
        "q": "Groovy 进阶最值得学的元编程特性是什么？",
        "a": "AST 转换"
      },
      {
        "q": "Web 方向可学习哪些 Groovy 框架？",
        "a": "Ratpack、Micronaut、Spring Boot"
      }
    ]
  }
];
