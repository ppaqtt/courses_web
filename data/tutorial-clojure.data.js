window.TUTORIAL_DATA_clojure = [
  {
    "id": 1,
    "t": "Clojure 简介与历史",
    "p": [
      "Clojure 由 Rich Hickey 于 2007 年发布，是运行在 JVM 上的 Lisp 方言，强调函数式与不可变",
      "核心数据结构 vector、map、set、list 都是持久化且不可变的，通过结构共享降低复制成本",
      "通过协议、多方法与命名空间组织代码，用 STM、atom、agent 处理并发状态",
      "广泛用于后端服务、数据处理、金融系统与需要高可靠性的业务场景"
    ],
    "c": "(ns hello.core)\n\n(println \"Hello, Clojure!\")\n(println \"欢迎学习 Clojure 1.10/1.11\")\n\n(def a 3)\n(def b 4)\n(println (str a \" + \" b \" = \" (+ a b)))\n(println \"Clojure 版本:\" (clojure-version))\n(println \"Java 版本:\" (System/getProperty \"java.version\"))",
    "et": "❌ 把 Clojure 当成 Java 的脚本外壳，用可变集合的思维写代码",
    "ec": "Clojure 的集合不可变，conj/assoc 返回新集合而非原地修改；把它当 Java 集合直接 add 会失败，需要可变状态时应使用 atom、ref 或 Java 互操作。",
    "q": [
      {
        "q": "Clojure 运行在什么平台上？",
        "a": "主要运行在 JVM 上，另有编译到 JavaScript 的 ClojureScript。"
      },
      {
        "q": "Clojure 的集合默认可变吗？",
        "a": "默认不可变且持久化，操作返回新集合并共享结构。"
      }
    ]
  },
  {
    "id": 2,
    "t": "安装与工具链",
    "p": [
      "需要 JDK 8 以上，推荐 JDK 11 或 17；先安装 Java 再安装 Clojure CLI 或 Leiningen",
      "官方 CLI 用 deps.edn 管理依赖与别名，Leiningen 用 project.clj，两者生态都成熟",
      "clojure 启动 REPL，clojure -M -m 命名空间 运行 -main，clojure -X 执行函数",
      "编辑器推荐 VS Code 加 Calva、IntelliJ 加 Cursive，配合 nREPL 获得交互式开发"
    ],
    "c": ";; 安装 Clojure CLI（Linux）\n;; curl -L -O https://github.com/clojure/brew-install/releases/latest/download/linux-install.sh\n;; chmod +x linux-install.sh && sudo ./linux-install.sh\n;; 创建项目\n;; mkdir demo && cd demo\n;; 编写 deps.edn 与 src/demo/core.clj 后运行\n;; clojure -M -m demo.core\n;; 启动 REPL\n;; clojure\n;; 查看依赖树\n;; clojure -Stree\n\n(ns demo.core)\n(defn -main [& _]\n  (println \"工具链就绪:\" (clojure-version)))",
    "et": "❌ 混用 Clojure CLI 与 Leiningen 的命令，导致依赖始终解析不到",
    "ec": "Clojure CLI 与 Leiningen 是两套独立工具，deps.edn 项目不能用 lein run，除非同时提供 project.clj。新手应固定一套工具链，并确认命令与配置文件匹配。",
    "q": [
      {
        "q": "运行 -main 的 CLI 命令是什么？",
        "a": "clojure -M -m 命名空间，例如 clojure -M -m demo.core。"
      },
      {
        "q": "查看项目依赖树的命令？",
        "a": "clojure -Stree。"
      }
    ]
  },
  {
    "id": 3,
    "t": "变量与常量",
    "p": [
      "def 建立全局绑定，let 建立词法局部绑定；绑定默认不可变，重新 def 会覆盖根值",
      "defonce 只在未定义时初始化，适合保存服务或连接等长生命周期对象",
      "^:dynamic 标记动态变量，配合 binding 在调用栈内临时改变其值",
      "命名用 kebab-case，谓词以 ? 结尾，副作用函数以 ! 结尾，转换函数常用 ->"
    ],
    "c": "(ns vars.core)\n\n(def answer 42)\n(defonce server-state (atom {}))\n(def ^:dynamic *debug* false)\n\n(let [x 10\n      y 20]\n  (println \"let 局部绑定:\" (+ x y)))\n\n(defn show []\n  (binding [*debug* true]\n    (println \"调试模式:\" *debug*)))\n\n(show)\n(println \"answer =\" answer)",
    "et": "❌ 以为 def 是常量声明，重新 def 后期待旧引用同步更新",
    "ec": "def 修改的是 Var 的根绑定，已展开或已编译的代码可能仍持有旧值。需要可变状态用 atom/ref，需要线程内临时覆盖用 binding 配 ^:dynamic。",
    "q": [
      {
        "q": "def 与 let 的区别？",
        "a": "def 建立全局 Var 绑定，let 建立词法局部绑定且随作用域结束失效。"
      },
      {
        "q": "defonce 适合什么场景？",
        "a": "只初始化一次的长生命周期对象，如服务实例或连接池。"
      }
    ]
  },
  {
    "id": 4,
    "t": "数据类型",
    "p": [
      "Clojure 的整数默认是 Long，小数是 Double，分数用 Ratio 表示并保持精确",
      "常用类型还有 String、Character、Keyword、Symbol、Boolean 与 nil",
      "Keyword 以冒号开头并自求值，Symbol 用于引用变量名，二者用途不同",
      "需要任意精度时用 N 后缀的 BigInt 或 M 后缀的 BigDecimal"
    ],
    "c": "(ns types.core)\n\n(println (class 42))\n(println (class 3.14))\n(println (class 1/3))\n(println (class \"文本\"))\n(println (class \\中))\n(println (class :name))\n(println (class 'sym))\n(println (type nil) (type true))\n(println (class 123N) (class (bigdec \"1.5\")))\n(println (instance? Number 42))",
    "et": "❌ 把 Keyword 与 Symbol 混用，或用 = 直接比较不同类型的数值",
    "ec": "Keyword 自求值且作为 map 键最常见，Symbol 需要解析；= 比较结构相等，(= 1 1.0) 为 false，== 只用于数值比较且可跨类型。",
    "q": [
      {
        "q": "1/3 是什么类型？",
        "a": "clojure.lang.Ratio，表示精确分数。"
      },
      {
        "q": "Keyword 与 Symbol 的关键区别？",
        "a": ":name 自求值，'name 会被当作符号解析到绑定。"
      }
    ]
  },
  {
    "id": 5,
    "t": "运算符",
    "p": [
      "算术用 + - * /，其中 / 对整数返回 Ratio 而不是截断的整数",
      "整除用 quot，取余用 rem，数学取模用 mod；inc 与 dec 是常用的加一减一",
      "比较用 = 判断值相等，== 只用于数值；not= 是 = 的取反",
      "逻辑 and/or 短路并返回最后一个值，not 返回布尔；位运算用 bit-and 等函数"
    ],
    "c": "(ns ops.core)\n\n(println (+ 1 2 3) (- 10 4) (* 2 5) (/ 10 4))\n(println (quot 10 4) (rem 10 4) (mod -10 3))\n(println (= [1 2] [1 2]) (== 1 1.0))\n(println (< 1 2 3) (>= 5 5))\n(println (and true false) (or false 1) (not nil))\n(println (inc 5) (dec 5) (max 3 9) (min 3 9))\n(println (bit-and 10 6) (bit-or 10 6) (bit-shift-left 1 4))",
    "et": "❌ 期待 (/ 10 4) 得到 2，或把 and/or 当成只返回布尔值",
    "ec": "Clojure 的 / 返回精确 Ratio 5/2，整除必须用 quot。and/or 短路并返回最后一个求值结果，(or nil 0) 返回 0，因此可直接用于提供默认值。",
    "q": [
      {
        "q": "整除与取余分别用什么？",
        "a": "quot 与 rem；mod 在负数场景按数学取模处理。"
      },
      {
        "q": "(= 1 1.0) 与 (== 1 1.0) 的结果？",
        "a": "前者 false，后者 true。"
      }
    ]
  },
  {
    "id": 6,
    "t": "字符串",
    "p": [
      "字符串是不可变 Java String，str 拼接任意值，format 使用 Java 格式化语法",
      "clojure.string 提供 join、split、replace、trim、upper-case 等常用函数",
      "subs 按字符下标截取，count 返回字符数，需注意 UTF-16 代理对",
      "正则字面量写作 #\"...\"，replace 与 split 都支持正则参数"
    ],
    "c": "(ns strings.core\n  (:require [clojure.string :as str]))\n\n(def s \"Clojure 中文\")\n(println (count s) (.length s))\n(println (subs s 0 7))\n(println (str/upper-case s))\n(println (str/join \", \" [\"a\" \"b\" \"c\"]))\n(println (str/split \"a,b;;c\" #\"[,;]+\"))\n(println (str/trim \"  hi  \"))\n(println (format \"%s 有 %d 个字符\" \"语言\" (count \"语言\")))\n(println (str/replace s #\"\\d+\" \"#\"))",
    "et": "❌ 用 subs 按字符数截取含 emoji 的字符串，结果切开代理对",
    "ec": "Java String 用 UTF-16 存储，emoji 等补充平面字符占两个 char，subs 的下标不是码点数。处理 Unicode 时应使用 codePoints 或成熟的文本库。",
    "q": [
      {
        "q": "字符串拼接用哪个函数？",
        "a": "str，可接受任意数量的任意值。"
      },
      {
        "q": "split 的正则参数怎么写？",
        "a": "使用正则字面量，例如 #\"[,;]+\"，无需双重转义。"
      }
    ]
  },
  {
    "id": 7,
    "t": "集合与数据结构",
    "p": [
      "vector 支持按下标快速访问，list 适合头部操作，map 是键值映射，set 去重",
      "conj 按集合类型在不同位置添加元素，assoc 替换或新增键，dissoc 删除键",
      "get 取值可给默认值，update 用函数更新某键，into 把序列灌入集合",
      "所有集合都是不可变的，操作返回新集合且与原集合共享大部分结构"
    ],
    "c": "(ns colls.core)\n\n(def v [10 20 30])\n(println (conj v 40) (assoc v 1 25) (get v 0))\n(println (map inc v) (filter even? v) (reduce + v))\n(def m {:a 1 :b 2})\n(println (assoc m :c 3) (dissoc m :a) (:b m) (get m :z 0))\n(def s #{1 2 2 3})\n(println s (contains? s 2) (conj s 4))\n(println (into [] (range 5)))\n(println (->> (range 10) (filter odd?) (map #(* % %)) (take 3)))",
    "et": "❌ 以为 conj 总是把元素追加到末尾，对 list 使用时顺序相反",
    "ec": "conj 对 vector 追加到尾部，对 list 添加到头部，对 map 需要传入键值对。需要固定顺序时应明确使用 vector，或改用 into 指定目标集合。",
    "q": [
      {
        "q": "如何给 map 中不存在的键提供默认值？",
        "a": "(get m :k 默认值)，或 (:k m 默认值)。"
      },
      {
        "q": "conj 对 list 添加元素的位置？",
        "a": "头部，因此连续 conj 后顺序与添加顺序相反。"
      }
    ]
  },
  {
    "id": 8,
    "t": "条件分支",
    "p": [
      "if 只有两个分支，when 只处理条件为真的情况，cond 按顺序测试多个条件",
      "case 按常量分派，condp 用谓词与表达式比较；两者都比 cond 更高效",
      "只有 nil 与 false 为假，0 与空字符串、空集合都是真值",
      "if-let 与 when-let 在判断绑定的同时完成解构，减少嵌套"
    ],
    "c": "(ns conds.core)\n\n(defn grade [score]\n  (cond\n    (>= score 90) \"A\"\n    (>= score 60) \"B\"\n    :else \"C\"))\n\n(println (grade 95) (grade 72) (grade 30))\n(println (if true \"真\" \"假\") (when (> 3 2) \"when 只处理真分支\"))\n(println (case 2 1 \"一\" 2 \"二\" \"其他\"))\n(println (condp = 3 3 \"三\" 4 \"四\" \"未知\"))\n(println (if-not nil \"nil 视为假\"))",
    "et": "❌ 用 if 判断 0 或空集合为假，结果总是进入真分支",
    "ec": "Clojure 中只有 nil 与 false 为假，0、\"\"、[] 都是真值。需要判断空集合用 empty? 或 seq，判断零用 zero?，不要依赖隐式真值转换。",
    "q": [
      {
        "q": "cond 的兜底分支怎么写？",
        "a": "把 :else 放在最后作为恒真条件。"
      },
      {
        "q": "case 的测试值可以是变量吗？",
        "a": "不可以，case 的测试值必须是编译期常量。"
      }
    ]
  },
  {
    "id": 9,
    "t": "循环与递归",
    "p": [
      "loop/recur 是 Clojure 的尾递归写法，recur 复用栈帧避免栈溢出",
      "doseq 用于对集合做副作用遍历，dotimes 执行固定次数，for 生成惰性序列",
      "range、repeat、iterate、cycle 生成惰性序列，配合 take 控制取用数量",
      "递归函数应把递归调用放在尾位置并用 recur，否则大输入会栈溢出"
    ],
    "c": "(ns loops.core)\n\n(defn factorial [n]\n  (loop [i n acc 1]\n    (if (<= i 1)\n      acc\n      (recur (dec i) (* acc i)))))\n\n(println (factorial 5))\n(doseq [x (range 3)] (println \"doseq\" x))\n(dotimes [i 3] (println \"dotimes\" i))\n(println (for [x (range 10) :when (odd? x)] (* x x)))\n(println (reduce + (take 5 (iterate inc 1))))",
    "et": "❌ 在普通递归函数中直接调用自身处理十万条数据，导致栈溢出",
    "ec": "JVM 不自动优化普通递归，recur 才复用栈帧。应把递归调用放到尾位置并用 loop/recur，或改用 reduce、map 等序列函数，避免深层调用栈。",
    "q": [
      {
        "q": "recur 必须出现在哪里？",
        "a": "尾位置，且参数个数与 loop 或函数参数一致。"
      },
      {
        "q": "for 是立即求值吗？",
        "a": "不是，for 返回惰性序列，需要 doall 或 dorun 才会完全求值。"
      }
    ]
  },
  {
    "id": 10,
    "t": "函数基础",
    "p": [
      "defn 定义函数，可以写文档字符串、多个参数列表与可变参数形式",
      "多个 arity 用不同参数个数分别定义，& 收集剩余参数为序列",
      "参数支持解构：向量位置解构、map 键解构与 :as 保留原值",
      "函数体最后一个表达式就是返回值，没有隐式的 return 语句"
    ],
    "c": "(ns funs.core)\n\n(defn greet\n  \"带文档字符串的问候函数\"\n  [name]\n  (str \"你好，\" name \"！\"))\n\n(defn area\n  ([w h] (* w h))\n  ([w] (area w w)))\n\n(defn sum-all [& xs] (reduce + xs))\n\n(println (greet \"小明\"))\n(println (area 3 4) (area 5))\n(println (sum-all 1 2 3 4))\n(println (:doc (meta #'greet)))",
    "et": "❌ 定义多个 arity 时出现相同参数个数，或可变参数与固定 arity 冲突",
    "ec": "同参数个数的 arity 会重复定义而报错，可变参数 arity 必须与固定 arity 兼容。调用不存在的参数个数会抛 ArityException，应补齐所有分支。",
    "q": [
      {
        "q": "如何定义可变参数函数？",
        "a": "在参数列表末尾写 & xs，剩余参数收集为序列。"
      },
      {
        "q": "函数如何返回多个值？",
        "a": "返回 vector 或 map，调用方用解构取出。"
      }
    ]
  },
  {
    "id": 11,
    "t": "函数进阶与高阶函数",
    "p": [
      "高阶函数接收或返回函数，map、filter、reduce 是最基础的序列处理工具",
      "partial 固定部分参数，comp 组合函数，juxt 并行应用多个函数",
      "线程宏 -> 把值插入第一个参数位置，->> 插入最后一个参数位置",
      "匿名函数用 #(...) 简写，% 表示第一个参数，%1、%2 表示指定位置参数"
    ],
    "c": "(ns higher.core)\n\n(println (map #(* % 2) [1 2 3]))\n(println (filter even? (range 10)))\n(println (apply + [1 2 3 4]))\n(println (reduce (fn [acc x] (+ acc x)) 0 [1 2 3]))\n(println ((partial + 10) 5))\n(println ((comp str inc) 41))\n(println ((juxt inc dec) 10))\n(println (-> 5 inc (* 2) str))\n(println (->> (range 10) (map inc) (filter odd?) (take 3)))\n(def square (memoize (fn [n] (* n n))))\n(println (square 4) (square 4))",
    "et": "❌ 在 -> 中调用参数顺序敏感的函数，把值插到了错误位置",
    "ec": "-> 把值作为第一个参数插入，->> 作为最后一个参数插入。对 map、filter 这类集合在最后的函数应使用 ->>，否则参数顺序错乱导致结果异常。",
    "q": [
      {
        "q": "-> 与 ->> 的区别？",
        "a": "-> 插入第一个参数位置，->> 插入最后一个参数位置。"
      },
      {
        "q": "juxt 的作用？",
        "a": "把多个函数组合成一个函数，返回各函数结果组成的 vector。"
      }
    ]
  },
  {
    "id": 12,
    "t": "作用域与闭包",
    "p": [
      "let 建立词法作用域，内层绑定可以遮蔽外层同名绑定，离开作用域即失效",
      "闭包捕获创建时的词法环境，配合 atom 可实现有状态的计数器",
      "binding 可临时改变动态变量的值，离开作用域后会自动恢复原值",
      "with-redefs 可临时替换全局函数，常用于测试中打桩与模拟依赖"
    ],
    "c": "(ns closures.core)\n\n(defn make-counter []\n  (let [state (atom 0)]\n    (fn [] (swap! state inc))))\n\n(def c1 (make-counter))\n(def c2 (make-counter))\n(println (c1) (c1) (c1))\n(println (c2))\n\n(def ^:dynamic *level* 0)\n(defn show [] (println \"level =\" *level*))\n(binding [*level* 2] (show))\n(show)",
    "et": "❌ 以为闭包捕获的是变量的值，后续修改外层绑定会影响闭包",
    "ec": "闭包捕获的是词法绑定，若绑定指向 atom 则能看到后续修改，若绑定是数字则值已固定。需要共享可变状态时应显式使用 atom 或 ref。",
    "q": [
      {
        "q": "两个闭包会共享同一个 atom 吗？",
        "a": "共享同一个 make-counter 调用内的 atom，不同调用互不影响。"
      },
      {
        "q": "binding 何时恢复原值？",
        "a": "离开 binding 块后自动恢复，且对并发线程不生效。"
      }
    ]
  },
  {
    "id": 13,
    "t": "记录与类型",
    "p": [
      "defrecord 定义带字段的类型，自动获得构造器、map 行为与相等性",
      "->Record 按位置构造，map->Record 按 map 构造，字段可用关键字访问",
      "deftype 更底层，不实现 map 接口，适合性能敏感或需要自定义协议的场景",
      "记录支持 assoc 返回新记录，也可用 dissoc 退化为普通 map"
    ],
    "c": "(ns records.core)\n\n(defrecord User [id name age])\n\n(def u (->User 1 \"小明\" 28))\n(def u2 (map->User {:id 2 :name \"小红\" :age 34}))\n\n(println u)\n(println (:name u) (:age u2))\n(println (assoc u :age 29))\n(println (dissoc u :age))\n(println (into {} u))\n(println (instance? User u))",
    "et": "❌ 用 dissoc 删除记录字段后仍按记录类型处理，导致类型判断失效",
    "ec": "dissoc 记录字段会返回普通 map，instance? 不再成立。需要保持记录类型时应重新 assoc 一个空值，而不是删除字段。",
    "q": [
      {
        "q": "defrecord 自动生成哪些构造器？",
        "a": "->Record 按位置，map->Record 按 map。"
      },
      {
        "q": "记录与普通 map 的相等性？",
        "a": "字段相同的记录与 map 用 = 比较可能相等，但类型不同。"
      }
    ]
  },
  {
    "id": 14,
    "t": "多态与多方法",
    "p": [
      "Clojure 没有类继承，多态靠协议与多方法实现，避免脆弱的父类耦合",
      "defmulti 按分派函数返回值选择方法，defmethod 注册具体实现",
      "derive 建立命名空间限定的类型层次，isa? 判断派生关系",
      "多方法支持 :default 兜底，适合按类型、状态或业务键分派"
    ],
    "c": "(ns poly.core)\n\n(defmulti area :shape)\n(defmethod area :circle [{:keys [r]}] (* Math/PI r r))\n(defmethod area :rect [{:keys [w h]}] (* w h))\n(defmethod area :default [_] (throw (ex-info \"未知形状\" {:shape :unknown})))\n\n(println (area {:shape :circle :r 1}))\n(println (area {:shape :rect :w 2 :h 3}))\n\n(derive ::dog ::animal)\n(println (isa? ::dog ::animal))\n(println (parents ::dog))",
    "et": "❌ 多方法缺少匹配且未定义 :default，运行时直接抛异常",
    "ec": "分派值没有对应方法时会抛 IllegalArgumentException。应为多方法提供 :default 兜底，或在分派前校验输入，避免错误延迟到调用点才暴露。",
    "q": [
      {
        "q": "defmulti 的分派函数何时执行？",
        "a": "每次调用时执行，其返回值用于选择方法。"
      },
      {
        "q": "derive 建立的层次与 Java 继承有何不同？",
        "a": "它是独立的命名空间限定关键字层次，不改变 Java 类型。"
      }
    ]
  },
  {
    "id": 15,
    "t": "协议与抽象",
    "p": [
      "defprotocol 声明一组方法签名，extend-type 为已有类型实现协议",
      "defrecord 与 deftype 可在类型体内直接实现协议，调用时自动分派",
      "extend-protocol 可一次为多个类型实现同一协议，适合批量扩展",
      "satisfies? 检查类型是否实现协议；协议方法调用是动态分派的"
    ],
    "c": "(ns protocols.core)\n\n(defprotocol Shape\n  (area [this])\n  (perimeter [this]))\n\n(defrecord Circle [r]\n  Shape\n  (area [_] (* Math/PI r r))\n  (perimeter [_] (* 2 Math/PI r)))\n\n(defrecord Rect [w h]\n  Shape\n  (area [_] (* w h))\n  (perimeter [_] (* 2 (+ w h))))\n\n(println (area (->Circle 1)))\n(println (perimeter (->Rect 2 3)))\n(println (satisfies? Shape (->Circle 2)))",
    "et": "❌ 在协议扩展中重复声明方法签名，或忘记重新加载命名空间",
    "ec": "协议方法只在 defprotocol 中声明一次，extend-type 里直接写实现。REPL 中修改协议后需重新加载相关命名空间，旧实例可能仍绑定旧实现。",
    "q": [
      {
        "q": "协议与 Java 接口的区别？",
        "a": "协议可为已有类型扩展实现，无需修改类型定义，也不要求类型声明实现。"
      },
      {
        "q": "如何判断类型是否实现协议？",
        "a": "使用 satisfies? 协议 实例。"
      }
    ]
  },
  {
    "id": 16,
    "t": "泛型与类型约束",
    "p": [
      "Clojure 是动态类型语言，没有 Java 式泛型语法，集合本身可存放任意值",
      "用协议表达能力约束，用多方法表达按值分派，用 spec 描述数据结构契约",
      "类型提示 ^Long、^String 只用于性能优化，不改变运行时类型检查",
      "需要强类型边界时可在 Java 互操作层使用泛型，或在边界做 spec 校验"
    ],
    "c": "(ns generics.core)\n\n(defprotocol Container\n  (put-item [c v])\n  (get-items [c]))\n\n(extend-type clojure.lang.IPersistentVector\n  Container\n  (put-item [c v] (conj c v))\n  (get-items [c] c))\n\n(extend-type clojure.lang.IPersistentMap\n  Container\n  (put-item [c v] (assoc c (:id v) v))\n  (get-items [c] (vals c)))\n\n(println (put-item [] 1))\n(println (get-items (put-item {} {:id 1 :name \"小明\"})))",
    "et": "❌ 给参数加上错误的类型提示 ^String，运行时抛 ClassCastException",
    "ec": "类型提示是给编译器的承诺，不会做运行时检查之外的转换。提示与实际类型不符时，调用 Java 方法会失败；应删除提示或先做类型校验。",
    "q": [
      {
        "q": "Clojure 有泛型吗？",
        "a": "没有泛型语法，集合可混装任意类型，约束由协议与 spec 表达。"
      },
      {
        "q": "类型提示的作用是什么？",
        "a": "减少反射、提升互操作性能，不改变语言本身的动态类型语义。"
      }
    ]
  },
  {
    "id": 17,
    "t": "错误处理",
    "p": [
      "try/catch/finally 处理异常，catch 可指定具体异常类，finally 总会执行",
      "ex-info 创建带数据 map 的异常，ex-data 读取附加信息，便于上下文传递",
      "throw 抛出异常，assert 在断言失败时抛 AssertionError",
      "REPL 中 *e 保存最近一次异常，可用 (pst *e) 打印完整栈"
    ],
    "c": "(ns errors.core)\n\n(defn parse-age [s]\n  (let [n (try (Long/parseLong s)\n               (catch NumberFormatException _ nil))]\n    (cond\n      (nil? n) (throw (ex-info \"不是整数\" {:input s}))\n      (or (neg? n) (> n 150)) (throw (ex-info \"年龄越界\" {:age n}))\n      :else n)))\n\n(doseq [s [\"30\" \"abc\" \"-5\"]]\n  (try\n    (println \"年龄:\" (parse-age s))\n    (catch clojure.lang.ExceptionInfo e\n      (println \"捕获:\" (ex-message e) (ex-data e)))\n    (finally\n      (println \"--- 结束\"))))",
    "et": "❌ 用 catch Exception 包住一切并静默返回 nil，掩盖真正的 bug",
    "ec": "过度捕获会吞掉空指针、类型错误等编程缺陷。应捕获具体异常类，无法恢复时重新 throw 或记录上下文，不要把异常当作普通控制流。",
    "q": [
      {
        "q": "如何给异常附加结构化信息？",
        "a": "使用 ex-info 创建并传入 map，读取时用 ex-data。"
      },
      {
        "q": "finally 中抛异常会怎样？",
        "a": "会覆盖 try 中原有的异常，应避免在 finally 中执行可能失败的逻辑。"
      }
    ]
  },
  {
    "id": 18,
    "t": "文件 I/O",
    "p": [
      "slurp 一次读入整个文件，spit 写入文件，后者可用 :append true 追加",
      "with-open 确保 reader/writer 在块结束时关闭，避免句柄泄漏",
      "line-seq 把 BufferedReader 转成惰性行序列，适合逐行处理大文件",
      "clojure.java.io 提供 file、reader、writer、copy 等互操作工具"
    ],
    "c": "(ns files.core\n  (:require [clojure.java.io :as io]))\n\n(def path \"demo.txt\")\n(spit path \"第一行\\n第二行\\n\")\n(println (slurp path))\n(spit path \"\\n追加内容\" :append true)\n\n(with-open [rdr (io/reader path)]\n  (doseq [[i line] (map-indexed vector (line-seq rdr))]\n    (println i \":\" line)))\n\n(println (.length (io/file path)) \"字节\")\n(io/delete-file path true)",
    "et": "❌ 用 spit 追加内容却忘记 :append true，原文件被整体覆盖",
    "ec": "spit 默认以覆盖模式写入，追加必须显式传 :append true。批量写入大文件时应使用 writer 与 with-open，避免反复打开文件与字符串拼接。",
    "q": [
      {
        "q": "如何追加内容到文件末尾？",
        "a": "(spit path content :append true)。"
      },
      {
        "q": "with-open 的作用？",
        "a": "确保块内资源在退出时关闭，包括异常路径。"
      }
    ]
  },
  {
    "id": 19,
    "t": "正则表达式",
    "p": [
      "正则字面量写作 #\"pattern\"，也可用 re-pattern 从字符串动态构造",
      "re-find 返回首个匹配或分组向量，re-matches 要求整串匹配",
      "re-seq 返回所有匹配的惰性序列，re-groups 读取 matcher 的分组",
      "replace 支持 $1 反向引用，split 用正则分隔，注意转义反斜杠"
    ],
    "c": "(ns regex.core\n  (:require [clojure.string :as str]))\n\n(def s \"订单 A100 金额 250 元，订单 B200 金额 89 元\")\n(println (re-find #\"([A-Z])(\\d+)\" s))\n(println (re-seq #\"([A-Z]\\d+).*?(\\d+)\" s))\n(println (re-matches #\"\\d+\" \"12345\"))\n(let [m (re-matcher #\"(?<code>[A-Z]\\d+)\" s)]\n  (when (.find m)\n    (println \"命名组:\" (.group m \"code\"))))\n(println (str/replace s #\"订单\" \"单号\"))\n(println (str/replace \"a1b2\" #\"(\\d)\" \"[$1]\"))\n(println (str/split \"a, b;;c\" #\"[,;]+\\s*\"))",
    "et": "❌ 用 re-find 后直接按分组下标取值，未匹配时对 nil 调用 nth 而报错",
    "ec": "re-find 未匹配返回 nil，匹配无分组时返回字符串，有分组时返回 vector。取值前应判空，并按正则是否含捕获组决定数据结构。",
    "q": [
      {
        "q": "re-find 与 re-matches 的区别？",
        "a": "re-find 找任意位置的首个匹配，re-matches 要求整个字符串匹配。"
      },
      {
        "q": "替换串中如何引用分组？",
        "a": "使用 $1、$2，例如 [\"$1\"]。"
      }
    ]
  },
  {
    "id": 20,
    "t": "模块与包管理",
    "p": [
      "ns 声明命名空间并用 :require 引入依赖，:as 起别名，:refer 引入指定符号",
      "deps.edn 用 :paths 声明源码目录，:deps 声明 Maven、Git 或本地依赖",
      "Leiningen 使用 project.clj，deps.edn 与 project.clj 可在同一项目共存",
      "本地库用 :local/root，Git 依赖用 :git/url 与 :git/sha 锁定提交"
    ],
    "c": "(ns app.core\n  (:require [clojure.string :as str]\n            [clojure.set :refer [union]]))\n\n(println (str/upper-case \"hello\"))\n(println (union #{1 2} #{2 3}))\n\n;; deps.edn\n;; {:paths [\"src\"]\n;;  :deps {org.clojure/clojure {:mvn/version \"1.11.1\"}}\n;;  :aliases {:dev {:extra-paths [\"test\"]}}}\n;; 本地与 Git 依赖：\n;; {:deps {my/lib {:local/root \"../lib\"}\n;;         other/lib {:git/url \"https://github.com/other/lib\"\n;;                    :git/sha \"6f1c2a9d8e7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d\"}}}",
    "et": "❌ 在 ns 中使用 :require 时写错路径，或把 require 写在 ns 形式之外",
    "ec": "命名空间路径必须与文件目录结构一致，否则启动时报 FileNotFoundException。:require 应放在 ns 声明内，REPL 中临时加载用 require 函数。",
    "q": [
      {
        "q": "如何引入命名空间并起别名？",
        "a": "(:require [clojure.string :as str])。"
      },
      {
        "q": "本地依赖怎么写？",
        "a": "在 deps.edn 的 :deps 中使用 {:local/root \"../lib\"}。"
      }
    ]
  },
  {
    "id": 21,
    "t": "标准库速查与工具链",
    "p": [
      "包管理用 deps.edn 或 project.clj，clojure -M 运行，clojure -X 调用函数",
      "测试框架是 clojure.test，lein test 或 clojure -X:test 执行",
      "格式化用 cljfmt，静态检查用 clj-kondo，二者都可集成到编辑器与 CI",
      "调试依赖 nREPL 交互式求值，也可用 tools.trace 与 tap> 观察数据流"
    ],
    "c": "(ns toolchain.core\n  (:require [clojure.test :refer [deftest is run-tests]]))\n\n;; 包管理与运行\n;; clojure -Sdeps '{:deps {org.clojure/data.json {:mvn/version \"2.4.0\"}}}' -M -e '(require (quote clojure.data.json))'\n;; clojure -M -m app.core        # 运行 -main\n;; clojure -X:build              # 调用 deps.edn 中的 :exec-fn\n;; 测试 / 格式化 / 静态检查\n;; clojure -X:test\n;; cljfmt check src\n;; clj-kondo --lint src\n;; 调试：REPL 中 (tap> x)、(clojure.repl/doc f)，nREPL 默认端口 7888\n\n(deftest self-check\n  (is (= 4 (+ 2 2))))\n(println (run-tests 'toolchain.core))",
    "et": "❌ 混用 clojure -M 与 clojure -X，导致参数形状不匹配而报错",
    "ec": "-M 用于调用 -main 或执行表达式，参数是字符串；-X 调用带 map 参数的函数，参数来自命令行键值。应按入口函数的签名选择正确方式。",
    "q": [
      {
        "q": "运行项目内测试的常见命令？",
        "a": "lein test，或 clojure -X:test（需在 deps.edn 定义别名）。"
      },
      {
        "q": "clj-kondo 的作用？",
        "a": "静态检查未定义符号、未使用绑定与潜在错误。"
      }
    ]
  },
  {
    "id": 22,
    "t": "并发与状态",
    "p": [
      "atom 提供无协调的同步状态，swap! 原子更新，reset! 直接替换",
      "ref 配合 dosync 实现 STM 事务，多个 ref 的修改要么全部成功要么全部回滚",
      "agent 适合异步、串行的状态更新，send 投递动作，await 等待完成",
      "future 在后台执行并返回可解引用对象，core.async 用 channel 组织异步流程"
    ],
    "c": "(ns concurrency.core)\n\n(def counter (atom 0))\n(dotimes [_ 5] (swap! counter inc))\n(println \"atom:\" @counter)\n\n(def account (ref 100))\n(dosync (alter account - 30))\n(println \"ref:\" @account)\n\n(def fut (future (Thread/sleep 100) (* 6 7)))\n(println \"future:\" @fut)\n\n(def a (agent 0))\n(send a inc)\n(await a)\n(println \"agent:\" @a)\n\n(println \"pmap:\" (pmap #(* % %) (range 5)))",
    "et": "❌ 在 dosync 之外对 ref 调用 alter，或在事务中执行阻塞 I/O",
    "ec": "ref 只能在 dosync 事务内修改，否则抛 IllegalStateException。STM 会自动重试事务，事务体应保持纯净短小，避免网络请求等副作用。",
    "q": [
      {
        "q": "atom 与 ref 的区别？",
        "a": "atom 无协调、单值原子更新；ref 支持多值事务与一致性。"
      },
      {
        "q": "如何等待 agent 完成所有投递动作？",
        "a": "调用 await，等待该 agent 的动作队列清空。"
      }
    ]
  },
  {
    "id": 23,
    "t": "性能优化",
    "p": [
      "开启 *warn-on-reflection* 并给 Java 互操作加类型提示，消除反射调用",
      "用 transient 与 persistent! 批量构建集合，减少中间不可变对象的分配",
      "惰性序列具有分块求值特性，应避免在大序列上叠加过多的中间转换",
      "用 criterium 做可靠基准测试，先测量再优化，优先减少分配与反射"
    ],
    "c": "(ns perf.core)\n\n(set! *warn-on-reflection* true)\n\n(defn fast-sum [^longs xs]\n  (let [n (alength xs)]\n    (loop [i 0 acc 0]\n      (if (< i n)\n        (recur (inc i) (+ acc (aget xs i)))\n        acc))))\n\n(def v (long-array (range 1000000)))\n(println \"sum =\" (fast-sum v))\n\n(defn build [n]\n  (persistent! (reduce conj! (transient []) (range n))))\n(println \"count =\" (count (build 100000)))",
    "et": "❌ 在热路径上反复使用 assoc 构造大 map，或忘记类型提示导致全程反射",
    "ec": "持久化集合的每次更新都有结构共享开销，批量构建应使用 transient。Java 互操作未加 ^long、^String 等提示时会走反射，性能可能差一个数量级。",
    "q": [
      {
        "q": "如何发现代码中的反射调用？",
        "a": "执行 (set! *warn-on-reflection* true) 后重新加载命名空间。"
      },
      {
        "q": "transient 集合的使用限制？",
        "a": "只能在单线程内使用，完成后用 persistent! 转回持久化集合。"
      }
    ]
  },
  {
    "id": 24,
    "t": "测试",
    "p": [
      "clojure.test 用 deftest 定义测试、is 断言、testing 分组、are 参数化",
      "use-fixtures 在每个或每组测试前后执行准备与清理逻辑",
      "run-tests 运行指定命名空间，lein test 或 clojure -X:test 运行全部",
      "测试应覆盖正常、边界与异常路径，纯函数测试应尽量不依赖外部状态"
    ],
    "c": "(ns calc-test\n  (:require [clojure.test :refer [deftest is testing are run-tests]]))\n\n(defn add [a b] (+ a b))\n(defn divide [a b] (/ a b))\n\n(deftest add-test\n  (testing \"整数相加\"\n    (is (= 5 (add 2 3)))\n    (are [a b expected] (= expected (add a b))\n      0 0 0\n      -1 1 0)))\n\n(deftest divide-test\n  (is (= 2 (divide 10 5)))\n  (is (thrown? ArithmeticException (divide 1 0))))\n\n(run-tests 'calc-test)",
    "et": "❌ 只写 deftest 却不运行，误以为测试已经执行并通过",
    "ec": "deftest 只是定义测试 Var，不会自动执行。必须调用 run-tests，或通过 lein test、clojure -X:test 触发；CI 中应确保测试命令返回非零退出码。",
    "q": [
      {
        "q": "如何断言某段代码抛出异常？",
        "a": "(is (thrown? 异常类 表达式))。"
      },
      {
        "q": "are 的作用？",
        "a": "用表格形式参数化断言，减少重复测试代码。"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧",
    "p": [
      "REPL 驱动开发：在光标处求值、检查中间值，比反复重启程序更高效",
      "tap> 把值送入 tap 集合，配合 Portal 或 REBL 可视化复杂数据结构",
      "tools.trace 的 trace 与 trace-vars 可打印调用与返回值，定位递归问题",
      "clj-kondo 做静态检查，*e 与 (pst *e) 查看异常栈，set! *warn-on-reflection* 查反射"
    ],
    "c": "(ns debug.core\n  (:require [clojure.repl :refer [doc]]))\n\n(defn safe-div [a b]\n  (when (zero? b)\n    (tap> {:event :zero-division :a a :b b}))\n  (if (zero? b)\n    (throw (ArithmeticException. \"除数不能为 0\"))\n    (/ a b)))\n\n(add-tap println)\n(println (safe-div 10 2))\n(try (safe-div 1 0)\n     (catch ArithmeticException e\n       (println \"错误:\" (.getMessage e))))\n(doc safe-div)",
    "et": "❌ 把 tap> 当成可靠日志，生产环境关键路径依赖它记录审计信息",
    "ec": "tap> 是异步且可能丢弃数据，只适合开发期观察。审计与错误记录应使用日志库；tap 集合也可能无消费者，不能作为唯一的数据出口。",
    "q": [
      {
        "q": "如何查看某个函数的文档？",
        "a": "(doc 函数名)，需引入 clojure.repl。"
      },
      {
        "q": "REPL 中最近一次异常保存在哪？",
        "a": "*e，可用 (pst *e) 打印栈。"
      }
    ]
  },
  {
    "id": 26,
    "t": "Java 互操作与系统调用",
    "p": [
      "Clojure 直接调用 Java：.method 调实例方法，ClassName/staticMethod 调静态方法",
      "new 或 ClassName. 创建对象，doto 连续调用多个方法并返回原对象",
      "proxy 动态实现 Java 接口或继承类，gen-class 可生成供 Java 调用的类",
      "调用外部进程用 clojure.java.shell/sh 或 ProcessBuilder，注意参数分隔"
    ],
    "c": "(ns interop.core)\n\n(println (.toUpperCase \"hello\"))\n(println (. Math sqrt 16))\n(println (String/valueOf 42))\n\n(let [sb (StringBuilder.)]\n  (.append sb \"Clojure\")\n  (.append sb \" + Java\")\n  (println (.toString sb)))\n\n(let [p (.start (ProcessBuilder. [\"sh\" \"-c\" \"echo 来自子进程\"]))]\n  (println \"退出码:\" (.waitFor p)))",
    "et": "❌ 把静态方法写成 (.method Class) 或漏写类名，导致无法解析符号",
    "ec": "实例方法写作 (.method obj args)，静态方法写作 (Class/method args)，构造函数写作 (Class. args)。三者语法不同，混用会报 Unable to resolve symbol。",
    "q": [
      {
        "q": "如何调用 Java 静态方法？",
        "a": "(类名/方法名 参数)，例如 (Math/sqrt 16)。"
      },
      {
        "q": "doto 的用途？",
        "a": "对同一对象连续调用多个方法，最后返回该对象。"
      }
    ]
  },
  {
    "id": 27,
    "t": "设计模式",
    "p": [
      "策略模式用函数值或协议实现，把可替换的行为作为参数传入目标函数",
      "装饰器模式对应高阶函数，例如 Ring 中间件包装 handler",
      "建造者模式用 assoc 逐步构造 map，或使用 doto 配置 Java 对象",
      "记忆化用 memoize 缓存纯函数结果，注意缓存无上限与失效问题"
    ],
    "c": "(ns patterns.core)\n\n(def strategies {:add + :mul *})\n(defn calc [op a b] ((get strategies op) a b))\n(println (calc :add 2 3) (calc :mul 2 3))\n\n(defn wrap-logging [handler]\n  (fn [req]\n    (println \"请求:\" (:uri req))\n    (handler req)))\n(def app (wrap-logging (fn [_] {:status 200 :body \"ok\"})))\n(println (app {:uri \"/health\"}))\n\n(def fib (memoize (fn [n] (if (< n 2) n (+ (fib (- n 1)) (fib (- n 2)))))))\n(println (fib 80))",
    "et": "❌ 用 memoize 缓存依赖外部状态或参数空间极大的函数，造成内存膨胀",
    "ec": "memoize 的缓存无上限也不会失效，只适合纯函数与小参数空间。涉及 I/O、时间或用户输入的函数不应直接记忆化，必要时应自定义带淘汰策略的缓存。",
    "q": [
      {
        "q": "Clojure 中策略模式的常见实现？",
        "a": "把函数作为值存入 map 或直接作为参数传入。"
      },
      {
        "q": "中间件模式的本质？",
        "a": "接收 handler 并返回新 handler 的高阶函数。"
      }
    ]
  },
  {
    "id": 28,
    "t": "数据库访问",
    "p": [
      "next.jdbc 是当前推荐的 JDBC 封装，配合连接池与 SQL 数据库使用",
      "jdbc/get-datasource 创建数据源，execute! 查询返回 map 序列",
      "sql/insert!、sql/update!、sql/delete! 提供表名加 map 的便捷操作",
      "始终使用 ? 占位符与参数向量，避免拼接 SQL 字符串造成注入"
    ],
    "c": "(ns db.core\n  (:require [next.jdbc :as jdbc]\n            [next.jdbc.sql :as sql]))\n\n(def ds (jdbc/get-datasource {:dbtype \"sqlite\" :dbname \"app.db\"}))\n\n(jdbc/execute! ds [\"CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)\"])\n(sql/insert! ds :users {:name \"小明\" :age 28})\n(sql/insert! ds :users {:name \"小红\" :age 34})\n\n(println (jdbc/execute! ds [\"SELECT * FROM users ORDER BY age DESC\"]))\n(println (jdbc/execute-one! ds [\"SELECT name FROM users WHERE age > ?\" 30]))",
    "et": "❌ 用 str 拼接用户输入生成 SQL，或把参数写在 SQL 字符串里",
    "ec": "字符串拼接会导致 SQL 注入，参数应作为向量中的独立元素传入。next.jdbc 会把 ? 安全绑定为预编译参数，也能正确处理引号与类型。",
    "q": [
      {
        "q": "next.jdbc 查询返回什么结构？",
        "a": "默认返回 vector，元素是列名关键字到值的 map。"
      },
      {
        "q": "如何只取一行？",
        "a": "使用 execute-one!。"
      }
    ]
  },
  {
    "id": 29,
    "t": "Web 开发与 HTTP",
    "p": [
      "Ring 把 HTTP 抽象为请求 map 到响应 map 的函数，中间件是包装 handler 的高阶函数",
      "Compojure 用路由宏组织 URL，Reitit 提供数据驱动路由与参数校验",
      "run-jetty 启动内嵌 Jetty，生产环境通常打包为 jar 交给容器运行",
      "JSON 用 cheshire 或 jsonista 编解码，响应需设置 Content-Type 头"
    ],
    "c": "(ns web.core\n  (:require [ring.adapter.jetty :refer [run-jetty]]\n            [compojure.core :refer [defroutes GET]]\n            [compojure.route :as route]\n            [ring.middleware.json :refer [wrap-json-response]]\n            [ring.util.response :as resp]))\n\n(defroutes app\n  (GET \"/hello\" [] (resp/response \"你好，Clojure!\"))\n  (GET \"/api/user/:id\" [id] {:status 200 :body {:id id :name \"小明\"}})\n  (route/not-found \"404 未找到\"))\n\n(def handler (wrap-json-response app))\n\n(defn -main [& _]\n  (run-jetty handler {:port 3000 :join? true}))",
    "et": "❌ 处理函数直接返回字符串或 Java 对象，而不是 Ring 响应 map",
    "ec": "Ring handler 必须返回包含 :status、:headers、:body 的 map，否则 Jetty 适配器报错。返回纯文本也应包装为 {:status 200 :headers {} :body \"...\"}。",
    "q": [
      {
        "q": "Ring handler 的输入输出是什么？",
        "a": "输入请求 map，输出响应 map。"
      },
      {
        "q": "为什么需要 wrap-json-response？",
        "a": "把 map 形式的响应体序列化为 JSON 并设置 Content-Type。"
      }
    ]
  },
  {
    "id": 30,
    "t": "安全编程",
    "p": [
      "所有外部输入都要校验类型、长度与范围，用 spec 或 malli 在边界处验证",
      "SQL 用参数绑定，HTML 输出需转义，避免 XSS 与注入",
      "密钥从环境变量或密钥服务读取，密码用 bcrypt 等慢哈希加盐存储",
      "依赖安全可用 clj-watson 扫描，禁用不受信任输入上的 eval 与 read-string"
    ],
    "c": "(ns security.core\n  (:require [clojure.string :as str]))\n\n(defn valid-port? [s]\n  (boolean (re-matches #\"\\d{1,5}\" (str s))))\n\n(defn html-escape [s]\n  (-> s\n      (str/replace \"&\" \"&amp;\")\n      (str/replace \"<\" \"&lt;\")\n      (str/replace \">\" \"&gt;\")\n      (str/replace \"\\\"\" \"&quot;\")))\n\n(println (valid-port? \"8080\") (valid-port? \"80; rm -rf /\"))\n(println (html-escape \"<script>alert('x')</script>\"))\n(let [secret (or (System/getenv \"APP_SECRET\") \"\")]\n  (println \"密钥是否配置:\" (not (empty? secret))))",
    "et": "❌ 用 read-string 解析用户输入，或用 eval 执行配置中的表达式",
    "ec": "read-string 支持 #= 读取期求值，等同于远程代码执行；外部数据应使用 clojure.edn/read-string。HTML 转义还需覆盖单引号，防止属性注入。",
    "q": [
      {
        "q": "为什么 read-string 危险？",
        "a": "它会在读取阶段执行 #= 后的任意代码。"
      },
      {
        "q": "SQL 注入如何避免？",
        "a": "使用参数化查询，把值作为参数向量传入，不拼接字符串。"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战：命令行工具",
    "p": [
      "命令行入口是 -main 函数，参数通过 *command-line-args* 获取",
      "tools.cli 负责解析选项与参数，生成用法说明并统一处理参数错误",
      "程序用 System/exit 返回退出码，错误信息写 stderr",
      "文件处理用 with-open 与 line-seq，避免一次载入整个文件"
    ],
    "c": "(ns wc.core\n  (:require [clojure.java.io :as io]))\n\n(defn count-lines [path]\n  (with-open [rdr (io/reader path)]\n    (count (line-seq rdr))))\n\n(defn -main [& args]\n  (if (empty? args)\n    (do (println \"用法: clojure -M -m wc.core <文件...>\")\n        (System/exit 1))\n    (let [rows (for [p args :when (.isFile (io/file p))]\n                 [p (count-lines p)])\n          total (reduce + 0 (map second rows))]\n      (doseq [[p n] rows] (println (format \"%6d  %s\" n p)))\n      (println (format \"%6d  总计\" total)))))",
    "et": "❌ 把 -main 的参数当成选项 map，或忘记处理空参数导致空指针",
    "ec": "-main 接收的是字符串序列，选项需要 tools.cli 解析。空参数时应打印用法并返回非零退出码，文件不存在时用 .isFile 过滤而不是直接打开。",
    "q": [
      {
        "q": "-main 的参数从哪里来？",
        "a": "来自命令行，作为字符串参数序列传入。"
      },
      {
        "q": "如何返回非零退出码？",
        "a": "调用 (System/exit 1)，或让启动脚本根据异常退出。"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战：数据处理与服务",
    "p": [
      "数据管道用 map/filter/remove 的 transducer 组合，避免生成中间序列",
      "transduce 与 into 配合 xf 高效完成转换与聚合",
      "分组用 group-by，聚合用 reduce 或频率统计，最后排序输出",
      "服务层可用 atom 保存内存状态，Ring handler 负责请求与响应的转换"
    ],
    "c": "(ns pipeline.core\n  (:require [clojure.string :as str]\n            [clojure.edn :as edn]))\n\n(def raw \"小明,研发,18000\\n小红,研发,22000\\n小刚,市场,15000\")\n\n(def xf (comp\n         (map str/trim)\n         (remove str/blank?)\n         (map #(str/split % #\",\"))\n         (map (fn [[n d s]] {:name n :dept d :salary (edn/read-string s)}))))\n\n(def rows (into [] xf (str/split-lines raw)))\n(println \"行数:\" (count rows))\n\n(def by-dept (group-by :dept rows))\n(doseq [[dept items] by-dept]\n  (println dept \"人数\" (count items)\n           \"平均\" (double (/ (reduce + (map :salary items)) (count items)))))",
    "et": "❌ 把 transducer 的 comp 顺序当成普通函数组合，导致转换顺序颠倒",
    "ec": "transducer 的 comp 从左到右依次应用，普通函数 comp 从右到左。把 into 的参数顺序写成 (into xf [] data) 也会报参数错误，正确形式是 (into [] xf data)。",
    "q": [
      {
        "q": "transducer 相比惰性序列的优势？",
        "a": "不产生中间序列，减少分配，适合大数据管道。"
      },
      {
        "q": "into 接收 transducer 的参数顺序？",
        "a": "(into 目标 xform 源)。"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建、部署与发布",
    "p": [
      "tools.build 定义 uberjar 任务，把源码、依赖与主类打包成可执行 jar",
      "deps.edn 用 :aliases 定义构建、测试与运行配置，避免污染默认依赖",
      "部署可用 java -jar 直接运行，或构建 Docker 镜像交给编排平台",
      "发布遵循语义化版本，CI 中执行测试、静态检查与构建，产物归档"
    ],
    "c": "(ns build.core)\n\n;; deps.edn 中定义构建别名\n;; {:aliases\n;;  {:build {:deps {io.github.clojure/tools.build {:mvn/version \"0.9.6\"}}\n;;           :ns-default build}}}\n\n;; build.clj\n;; (ns build\n;;   (:require [clojure.tools.build.api :as b]))\n;; (def lib 'demo/app)\n;; (defn uber [_]\n;;   (b/delete {:path \"target\"})\n;;   (b/copy-dir {:src-dirs [\"src\"] :target-dir \"target/classes\"})\n;;   (b/compile-clj {:basis (b/create-basis {:project \"deps.edn\"})\n;;                   :ns-compile '[demo.core] :class-dir \"target/classes\"})\n;;   (b/uber {:class-dir \"target/classes\" :uber-file \"target/app.jar\"\n;;            :basis (b/create-basis {:project \"deps.edn\"}) :main 'demo.core}))\n;; 执行: clojure -T:build uber",
    "et": "❌ 构建 uberjar 时未 AOT 编译主命名空间，java -jar 启动报类找不到",
    "ec": "uberjar 需要先 compile-clj 生成 class 文件，并在 :main 中指定主命名空间，否则清单缺少 Main-Class。构建后应实际执行 java -jar 验证启动。",
    "q": [
      {
        "q": "tools.build 用哪个命令执行任务？",
        "a": "clojure -T:build 任务名，例如 clojure -T:build uber。"
      },
      {
        "q": "为什么要把构建配置放进 :aliases？",
        "a": "隔离构建期依赖，避免污染运行时依赖。"
      }
    ]
  },
  {
    "id": 34,
    "t": "最佳实践",
    "p": [
      "优先编写纯函数，把副作用集中在系统边界，便于测试、推理与复用",
      "命名空间保持小而聚焦，避免循环依赖，公共 API 用 docstring 说明",
      "用 clj-kondo 与 cljfmt 统一风格，用 spec 或 malli 校验数据契约",
      "避免在函数内 def，谨慎使用动态变量与全局可变状态，保持 REPL 可重载"
    ],
    "c": "(ns best.core\n  (:require [clojure.spec.alpha :as s]))\n\n(s/def ::name (s/and string? #(<= 1 (count %) 50)))\n(s/def ::age (s/and int? #(<= 0 % 150)))\n(s/def ::user (s/keys :req-un [::name ::age]))\n\n(defn make-user [m]\n  (if (s/valid? ::user m)\n    m\n    (throw (ex-info \"用户数据不合法\" (s/explain-data ::user m)))))\n\n(println (make-user {:name \"小明\" :age 28}))\n(println (s/valid? ::user {:name \"\" :age 200}))",
    "et": "❌ 在函数体内用 def 创建全局变量，重复加载后状态被意外重置",
    "ec": "函数内 def 会在每次调用时重新定义 Var，破坏引用透明性并影响并发。应使用 let 局部绑定，需要共享状态时显式使用 atom，并放在命名空间顶层。",
    "q": [
      {
        "q": "为什么要保持命名空间小而聚焦？",
        "a": "降低耦合与循环依赖风险，便于单独测试与重载。"
      },
      {
        "q": "spec 的 :req-un 与 :req 区别？",
        "a": ":req-un 使用非限定关键字，:req 使用完全限定关键字。"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "学习路线：语法与数据结构、函数与序列、并发与工程、Web 与项目",
      "深入方向包括 core.async、ClojureScript、数据工程与 JVM 性能调优",
      "推荐资源：官方指南、ClojureDocs、The Joy of Clojure 与真实开源项目",
      "下一步用 Ring + next.jdbc 做一个可部署的小服务，并补齐测试与构建"
    ],
    "c": "(ns roadmap.core)\n\n(def roadmap\n  [{:stage \"语法与数据结构\" :chapters (range 1 10)}\n   {:stage \"函数与抽象\" :chapters (range 10 17)}\n   {:stage \"工程能力\" :chapters (range 17 26)}\n   {:stage \"生态与项目\" :chapters (range 26 34)}])\n\n(doseq [{:keys [stage chapters]} roadmap]\n  (println (format \"%-16s 第 %d-%d 章\" stage (first chapters) (last chapters))))\n\n(println \"推荐资源: Clojure 官方指南、ClojureDocs、The Joy of Clojure\")",
    "et": "❌ 只读不写，跳过 REPL 练习，遇到问题仍习惯重启整个应用",
    "ec": "Clojure 的优势在交互式开发，应在 REPL 中复现小问题、观察数据形状再改代码。每学完一个阶段就做一个真实小项目，并补齐测试与构建配置。",
    "q": [
      {
        "q": "学习 Clojure 的核心路径？",
        "a": "数据结构与函数、序列处理、并发状态、工程化与 Web 项目。"
      },
      {
        "q": "为什么强调 REPL 驱动开发？",
        "a": "可以即时验证小表达式与数据结构，快速定位问题且不必重启应用。"
      }
    ]
  }
];
