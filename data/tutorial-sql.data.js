window.TUTORIAL_DATA_sql = [
  {
    "id": 1,
    "t": "SQL 与 SQLite 简介：嵌入式数据库的来历",
    "p": [
      "SQL 诞生于 1974 年 IBM 的 System R 项目，1986 年成为 ANSI 标准，是关系数据库的通用查询语言",
      "SQLite 由 D. Richard Hipp 于 2000 年发布，是嵌入式数据库，无需服务器进程，数据存放在单个文件",
      "SQLite 广泛用于手机、浏览器、桌面软件与嵌入式设备，是部署量最大的数据库引擎之一",
      "SQL 可分为 DDL 定义结构、DML 操作数据、DQL 查询数据、DCL 权限与 TCL 事务几类",
      "SQLite 支持大部分 SQL-92 语法，并扩展了动态类型、UPSERT、窗口函数与 JSON 函数"
    ],
    "c": "-- 第一个查询：SQLite 是嵌入式数据库，无需服务器\nSELECT sqlite_version() AS version;\n\nCREATE TABLE hello (\n  id         INTEGER PRIMARY KEY,\n  msg        TEXT NOT NULL,\n  created_at TEXT DEFAULT (datetime('now'))\n);\n\nINSERT INTO hello (msg) VALUES ('你好，SQLite！');\nSELECT id, msg, created_at FROM hello;\n\n-- 查看执行计划，确认查询走主键\nEXPLAIN QUERY PLAN SELECT * FROM hello WHERE id = 1;",
    "et": "❌ 常见错误",
    "ec": "把 SQLite 当成 MySQL 或 PostgreSQL 使用，期待独立用户权限、存储过程与网络连接；SQLite 是进程内库，能力边界完全不同。",
    "q": [
      {
        "q": "SQLite 与 MySQL 的部署形态有何不同？",
        "a": "SQLite 是进程内嵌入式库，数据在单文件中；MySQL 是独立服务进程，通过 TCP 或 socket 接受连接。"
      },
      {
        "q": "SQL 的 DDL 与 DML 分别指什么？",
        "a": "DDL 定义或修改结构，如 CREATE TABLE；DML 操作数据，如 INSERT、UPDATE、DELETE。"
      }
    ]
  },
  {
    "id": 2,
    "t": "安装、命令行工具与常用点命令",
    "p": [
      "安装：Debian/Ubuntu 用 apt install sqlite3，macOS 用 brew install sqlite，Windows 用预编译包",
      "命令行工具 sqlite3 支持点命令，如 .tables、.schema、.headers、.mode、.timer",
      "图形化工具有 DB Browser for SQLite、DBeaver 与 DataGrip，适合浏览表结构与数据",
      "打开或创建数据库只需 sqlite3 app.db，文件不存在时会自动创建",
      "用 sqlite3 --version 与 PRAGMA compile_options 确认版本与编译特性"
    ],
    "c": "-- 安装：sudo apt install sqlite3 | brew install sqlite\n-- 进入交互模式：sqlite3 app.db\n-- 常用点命令：.tables .schema .indexes .headers on .mode box .timer on\n-- 执行脚本：sqlite3 app.db < schema.sql\n-- 单条查询：sqlite3 app.db \"SELECT count(*) FROM users;\"\n-- 备份：sqlite3 app.db \".backup backup.db\"\n\nSELECT sqlite_version() AS version;\nPRAGMA compile_options;\nPRAGMA database_list;",
    "et": "❌ 常见错误",
    "ec": "在生产环境用图形工具直接改库，忘记开启事务与备份；任何结构变更都应通过版本化的迁移脚本统一执行，并在测试库预演。",
    "q": [
      {
        "q": "如何查看数据库中所有表？",
        "a": "交互模式执行 .tables，或查询 SELECT name FROM sqlite_master WHERE type='table'。"
      },
      {
        "q": "如何查看某张表的建表语句？",
        "a": "执行 .schema 表名，或查询 sqlite_master 表中的 sql 字段。"
      }
    ]
  },
  {
    "id": 3,
    "t": "SELECT 基础：投影、过滤与排序",
    "p": [
      "SELECT 基本结构：SELECT 投影列、FROM 数据来源、WHERE 过滤、ORDER BY 排序、LIMIT 限制",
      "列可用 AS 起别名，别名在 ORDER BY 中可用，在 WHERE 中通常不可见",
      "SELECT * 便于探索，但生产查询应显式列出所需字段，避免结构变化导致错误",
      "常量查询可以不带 FROM，用于验证表达式、函数与类型转换行为",
      "SQL 关键字不区分大小写，约定关键字大写、标识符小写以提升可读性"
    ],
    "c": "-- SELECT 基本结构：投影、来源、过滤、排序\nCREATE TABLE books (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL,\n  author TEXT,\n  price REAL\n);\nINSERT INTO books (title, author, price) VALUES\n  ('SQL 必知必会', 'Ben Forta', 45.0),\n  ('数据库系统概念', 'Silberschatz', 98.0),\n  ('SQLite 权威指南', 'Grant Allen', 68.0);\n\nSELECT title, price FROM books;\nSELECT * FROM books WHERE price < 70;\nSELECT title AS 书名, price * 0.9 AS 折后价 FROM books;",
    "et": "❌ 常见错误",
    "ec": "下游程序依赖 SELECT * 的列顺序，表结构一变就错位；显式列出字段并给别名，接口契约才稳定可靠。",
    "q": [
      {
        "q": "WHERE 与 ORDER BY 的执行顺序？",
        "a": "先按 FROM 取数，再 WHERE 过滤，然后投影，最后 ORDER BY 排序。"
      },
      {
        "q": "列别名能在 WHERE 中引用吗？",
        "a": "通常不能，因为 WHERE 在投影之前执行；可在 ORDER BY 中引用。"
      }
    ]
  },
  {
    "id": 4,
    "t": "数据类型与亲和性",
    "p": [
      "SQLite 采用动态类型，列的类型名只决定亲和性，值可存为 INTEGER、REAL、TEXT、BLOB 或 NULL",
      "亲和性有 INTEGER、TEXT、REAL、NUMERIC、BLOB 五类，按声明类型名匹配",
      "typeof() 返回实际存储类型，CAST() 可显式转换，转换失败可能得到 0",
      "INTEGER PRIMARY KEY 是 rowid 的别名，自增且访问高效",
      "布尔值用 0 和 1 存储，日期时间通常存 TEXT 或 INTEGER 时间戳"
    ],
    "c": "CREATE TABLE samples (v);\nINSERT INTO samples (v) VALUES (42), ('42'), (4.2), (x'414243'), (NULL);\n\nSELECT v, typeof(v) AS storage_class FROM samples;\n\nCREATE TABLE typed (\n  id INTEGER PRIMARY KEY,\n  amount NUMERIC NOT NULL DEFAULT 0,\n  note TEXT\n);\nINSERT INTO typed (amount, note) VALUES ('12.50', '字符串写入 NUMERIC 列');\nSELECT id, amount, typeof(amount) AS t FROM typed;\n\nSELECT CAST('abc' AS INTEGER) AS bad_cast, 7 / 2 AS int_div, 7.0 / 2 AS real_div;",
    "et": "❌ 常见错误",
    "ec": "以为声明 VARCHAR(10) 就会截断或校验长度，SQLite 不会；类型名只影响亲和性，长度约束需要 CHECK(length(col) <= 10)。",
    "q": [
      {
        "q": "SQLite 的列类型是强约束吗？",
        "a": "不是，类型名只决定亲和性，任何列都可以存任意存储类的值。"
      },
      {
        "q": "7 / 2 的结果是什么？",
        "a": "整数除法得到 3；要得到 3.5 需写成 7.0 / 2 或 CAST 为 REAL。"
      }
    ]
  },
  {
    "id": 5,
    "t": "运算符与表达式",
    "p": [
      "算术运算符有 +、-、*、/、%，整数相除会截断，需要小数时至少一方用浮点",
      "比较运算符有 =、<>、!=、<、>、<=、>=，可配合 AND、OR、NOT 组合",
      "BETWEEN 是闭区间，IN 用于列表匹配，LIKE 做模式匹配，IS NULL 判断空值",
      "字符串连接用 ||，注意 NULL 与任何值拼接结果仍然是 NULL",
      "运算符优先级可用括号明确，避免 AND 与 OR 混用时出现逻辑错误"
    ],
    "c": "CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, stock INTEGER);\nINSERT INTO products (name, price, stock) VALUES\n  ('键盘', 299.0, 12), ('鼠标', 89.0, 0), ('显示器', 1299.0, 5);\n\nSELECT name, price FROM products WHERE price BETWEEN 80 AND 400;\nSELECT name FROM products WHERE name LIKE '%键%' OR stock = 0;\nSELECT name, price, price * stock AS inventory_value FROM products;\nSELECT name FROM products WHERE stock > 0 AND price < 1000;\nSELECT 7 / 2 AS int_div, 7 % 2 AS mod, 7.0 / 2 AS real_div;",
    "et": "❌ 常见错误",
    "ec": "用 = NULL 判断空值永远不成立，必须用 IS NULL；同理 NULL 参与算术或字符串拼接会让整个结果变成 NULL。",
    "q": [
      {
        "q": "如何判断一个字段是否为空？",
        "a": "使用 IS NULL 或 IS NOT NULL，不能用 = NULL。"
      },
      {
        "q": "BETWEEN 80 AND 400 包含边界吗？",
        "a": "包含，等价于 price >= 80 AND price <= 400。"
      }
    ]
  },
  {
    "id": 6,
    "t": "字符串函数与文本处理",
    "p": [
      "常用函数有 length、lower、upper、trim、ltrim、rtrim、replace 与 substr",
      "instr 返回子串位置，substr 按下标截取，SQLite 下标从 1 开始",
      "printf 支持格式化与对齐，适合生成固定宽度的报表文本输出",
      "字符串拼接用 ||，与 NULL 相加会得到 NULL，必要时用 coalesce 兜底",
      "LIKE 中 % 匹配任意长度，_ 匹配单个字符，大小写敏感性受 PRAGMA 影响"
    ],
    "c": "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT);\nINSERT INTO users (name, email) VALUES\n  ('Alice Chen', 'alice@example.com'),\n  ('bob li', 'BOB@EXAMPLE.COM ');\n\nSELECT upper(name), lower(email), length(name) FROM users;\nSELECT trim(email) AS cleaned, substr(name, 1, instr(name, ' ') - 1) AS first_name FROM users;\nSELECT name || ' <' || trim(email) || '>' AS mailbox FROM users;\nSELECT replace(name, ' ', '_') AS slug FROM users;\nSELECT printf('%-12s|%s', name, email) AS aligned FROM users;",
    "et": "❌ 常见错误",
    "ec": "用 + 拼接字符串，SQLite 会尝试数值相加，'1' + '2' 得到 3 而不是 '12'；字符串拼接必须使用 ||。",
    "q": [
      {
        "q": "如何取空格前的名字？",
        "a": "用 substr(name, 1, instr(name, ' ') - 1)，先定位空格位置再截取。"
      },
      {
        "q": "SUBSTR 的起始下标是 0 还是 1？",
        "a": "SQLite 中从 1 开始，0 会得到空字符串。"
      }
    ]
  },
  {
    "id": 7,
    "t": "表、行与集合：建表与插入",
    "p": [
      "CREATE TABLE 定义列名、类型、约束与默认值，表名与列名应避免使用关键字",
      "INSERT 支持多行 VALUES，一次插入多行比逐条执行更快",
      "INTEGER PRIMARY KEY 自动成为 rowid，AUTOINCREMENT 会额外维护 sqlite_sequence",
      "外键需要 PRAGMA foreign_keys = ON 才生效，且父列必须有唯一约束",
      "用 .schema 或查询 sqlite_master 查看建表语句，便于比对结构"
    ],
    "c": "CREATE TABLE customers (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL,\n  city TEXT\n);\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  customer_id INTEGER NOT NULL REFERENCES customers(id),\n  total REAL NOT NULL CHECK (total >= 0),\n  ordered_at TEXT NOT NULL DEFAULT (date('now'))\n);\nINSERT INTO customers (name, city) VALUES ('张伟', '上海'), ('李娜', '成都');\nINSERT INTO orders (customer_id, total) VALUES (1, 199.0), (1, 88.5), (2, 450.0);\n\nSELECT * FROM customers;\nSELECT count(*) AS order_count, sum(total) AS revenue FROM orders;",
    "et": "❌ 常见错误",
    "ec": "以为写了 REFERENCES 就会自动校验外键，SQLite 默认关闭外键；每个新连接都要执行 PRAGMA foreign_keys = ON。",
    "q": [
      {
        "q": "AUTOINCREMENT 与 INTEGER PRIMARY KEY 的区别？",
        "a": "后者复用删除后的 rowid，前者保证单调递增并维护 sqlite_sequence 表。"
      },
      {
        "q": "如何查看一张表的结构？",
        "a": "使用 .schema 表名，或查询 sqlite_master 的 sql 字段。"
      }
    ]
  },
  {
    "id": 8,
    "t": "条件过滤 WHERE",
    "p": [
      "WHERE 对行做过滤，只保留条件为真的记录，NULL 参与比较结果为未知",
      "AND 的优先级高于 OR，混用时必须用括号明确逻辑分组，避免歧义",
      "IN 适合枚举匹配，NOT IN 遇到 NULL 可能返回空结果，需要特别注意",
      "BETWEEN 包含边界，日期字符串按字典序比较在 ISO 格式下成立",
      "在条件列上建索引可加速过滤，但低选择性列的索引收益通常有限空间"
    ],
    "c": "CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER, hired_on TEXT);\nINSERT INTO employees (name, dept, salary, hired_on) VALUES\n  ('王强', '研发', 18000, '2021-03-01'),\n  ('刘敏', '研发', 22000, '2019-07-15'),\n  ('陈晨', '市场', 12000, '2022-01-10'),\n  ('赵磊', '销售', 15000, NULL);\n\nSELECT name, salary FROM employees WHERE dept = '研发' AND salary >= 18000;\nSELECT name FROM employees WHERE hired_on IS NULL;\nSELECT name, salary FROM employees WHERE salary BETWEEN 12000 AND 18000;\nSELECT name FROM employees WHERE dept IN ('市场', '销售');\nSELECT name FROM employees WHERE name LIKE '王%';",
    "et": "❌ 常见错误",
    "ec": "写 WHERE dept = '研发' OR '市场'，第二个条件恒为真，结果返回全表；每个 OR 分支都要写完整的比较表达式。",
    "q": [
      {
        "q": "AND 与 OR 混用时为什么要加括号？",
        "a": "AND 优先级高于 OR，不加括号可能得到与预期完全不同的过滤结果。"
      },
      {
        "q": "NOT IN 有什么陷阱？",
        "a": "子查询结果含 NULL 时，NOT IN 恒为未知，查询返回空集；可改用 NOT EXISTS。"
      }
    ]
  },
  {
    "id": 9,
    "t": "排序与分页：ORDER BY、LIMIT、OFFSET",
    "p": [
      "ORDER BY 指定排序方向，ASC 升序、DESC 降序，多列按顺序依次比较",
      "NULL 默认被视为最小值，可用 NULLS FIRST 或 NULLS LAST 显式控制",
      "LIMIT n 限制返回行数，OFFSET m 跳过前 m 行，深度分页性能会下降",
      "排序不稳定时追加主键作为次级排序键，保证分页结果可复现保持一致",
      "DISTINCT 去重发生在投影之后，可与 ORDER BY 组合使用"
    ],
    "c": "CREATE TABLE scores (id INTEGER PRIMARY KEY, player TEXT, score INTEGER);\nINSERT INTO scores (player, score) VALUES\n  ('aa', 90), ('bb', 77), ('cc', 90), ('dd', 65), ('ee', 88);\n\nSELECT player, score FROM scores ORDER BY score DESC, player ASC;\nSELECT player, score FROM scores ORDER BY score DESC LIMIT 3 OFFSET 0;\nSELECT player, score FROM scores ORDER BY score DESC LIMIT 2 OFFSET 2;\nSELECT DISTINCT score FROM scores ORDER BY score DESC;\nSELECT player FROM scores ORDER BY score DESC NULLS LAST LIMIT 1;",
    "et": "❌ 常见错误",
    "ec": "只按非唯一列排序并依赖返回顺序，分页时同一分数的行可能重复或遗漏；应追加主键等唯一列作为次级排序键。",
    "q": [
      {
        "q": "如何保证分页结果稳定？",
        "a": "在 ORDER BY 中追加唯一列，如 id，使任意两行的排序位置确定。"
      },
      {
        "q": "LIMIT 2 OFFSET 2 返回第几行到第几行？",
        "a": "跳过前 2 行，返回第 3、4 行，下标从 0 计。"
      }
    ]
  },
  {
    "id": 10,
    "t": "聚合函数与分组统计",
    "p": [
      "聚合函数 count、sum、avg、min、max 把多行压缩为一行，NULL 通常被忽略",
      "GROUP BY 按列分组，SELECT 中只能出现分组列或聚合结果",
      "HAVING 在分组后过滤，WHERE 在分组前过滤，二者不能混用",
      "count(*) 统计行数，count(col) 会跳过该列为 NULL 的行",
      "avg 只对非 NULL 值求平均，分母是有效值个数而非总行数"
    ],
    "c": "CREATE TABLE sales (id INTEGER PRIMARY KEY, region TEXT, product TEXT, amount REAL);\nINSERT INTO sales (region, product, amount) VALUES\n  ('华东', 'A', 1200), ('华东', 'B', 800), ('华北', 'A', 950),\n  ('华北', 'A', 300), ('华南', 'B', 1500);\n\nSELECT count(*) AS rows, sum(amount) AS total, avg(amount) AS avg_amount FROM sales;\nSELECT region, count(*) AS orders, sum(amount) AS revenue\nFROM sales\nGROUP BY region\nHAVING sum(amount) > 1000\nORDER BY revenue DESC;\nSELECT region, count(DISTINCT product) AS kinds FROM sales GROUP BY region;",
    "et": "❌ 常见错误",
    "ec": "在 WHERE 中使用聚合函数，如 WHERE sum(amount) > 100；分组后的过滤必须放在 HAVING 中。",
    "q": [
      {
        "q": "WHERE 与 HAVING 的区别？",
        "a": "WHERE 在分组前过滤原始行，HAVING 在分组后过滤聚合结果。"
      },
      {
        "q": "count(*) 与 count(col) 何时不同？",
        "a": "当 col 存在 NULL 时，count(col) 跳过这些行，count(*) 仍统计全部行。"
      }
    ]
  },
  {
    "id": 11,
    "t": "连接查询 JOIN",
    "p": [
      "INNER JOIN 只保留两侧都匹配的行，LEFT JOIN 保留左表全部行",
      "RIGHT JOIN 与 FULL OUTER JOIN 在 SQLite 3.39 起支持，旧版需用 UNION 模拟",
      "ON 指定连接条件，USING 用于同名列，NATURAL JOIN 自动匹配同名列但可读性差",
      "多表连接按顺序处理，先缩小结果集再执行连接通常更快也更省资源",
      "一对多连接会产生重复行，统计时要用 count(DISTINCT ...) 或先去重"
    ],
    "c": "CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT);\nCREATE TABLE books (id INTEGER PRIMARY KEY, author_id INTEGER, title TEXT, price REAL);\nINSERT INTO authors (name) VALUES ('鲁迅'), ('老舍'), ('巴金');\nINSERT INTO books (author_id, title, price) VALUES\n  (1, '呐喊', 30), (1, '彷徨', 28), (2, '骆驼祥子', 35), (NULL, '佚名文集', 20);\n\nSELECT b.title, a.name FROM books b INNER JOIN authors a ON a.id = b.author_id;\nSELECT a.name, count(b.id) AS books FROM authors a LEFT JOIN books b ON b.author_id = a.id GROUP BY a.id;\nSELECT b.title, a.name FROM books b LEFT JOIN authors a ON a.id = b.author_id;",
    "et": "❌ 常见错误",
    "ec": "把过滤条件写在 WHERE 而不是 ON，LEFT JOIN 会退化成 INNER JOIN；需要保留左表时，条件必须放在 ON 中。",
    "q": [
      {
        "q": "LEFT JOIN 与 INNER JOIN 的结果差异？",
        "a": "LEFT JOIN 保留左表所有行，未匹配处补 NULL；INNER JOIN 只保留匹配成功的行。"
      },
      {
        "q": "如何统计没有下过单的客户？",
        "a": "用 LEFT JOIN 后 WHERE 右表主键 IS NULL，或使用 NOT EXISTS。"
      }
    ]
  },
  {
    "id": 12,
    "t": "子查询与作用域",
    "p": [
      "标量子查询返回单值，可出现在 SELECT、WHERE 与赋值语句中",
      "相关子查询引用外层列，对外层每一行执行一次，注意性能开销问题",
      "IN 与 EXISTS 用于集合判断，NOT EXISTS 通常比 NOT IN 更安全",
      "FROM 子句中的子查询称为派生表，必须为它指定一个别名才能引用",
      "子查询可读性优先，复杂逻辑可改写为 CTE 提升可维护性与可读性"
    ],
    "c": "CREATE TABLE staff (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER);\nINSERT INTO staff (name, dept, salary) VALUES\n  ('甲', '研发', 20000), ('乙', '研发', 25000), ('丙', '市场', 15000), ('丁', '市场', 18000);\n\nSELECT name, salary FROM staff\nWHERE salary > (SELECT avg(salary) FROM staff);\n\nSELECT name FROM staff s\nWHERE salary = (SELECT max(salary) FROM staff x WHERE x.dept = s.dept);\n\nSELECT dept, (SELECT count(*) FROM staff x WHERE x.dept = s.dept) AS headcount\nFROM staff s GROUP BY dept;",
    "et": "❌ 常见错误",
    "ec": "用 NOT IN 搭配可能含 NULL 的子查询，结果恒为空；应改用 NOT EXISTS，或确保子查询列有 NOT NULL 约束。",
    "q": [
      {
        "q": "相关子查询为什么可能很慢？",
        "a": "它对外层每一行都执行一次内层查询，数据量大时成本迅速上升。"
      },
      {
        "q": "派生表为什么必须起别名？",
        "a": "SQL 语法要求 FROM 中的子查询有表名，供外层引用其列。"
      }
    ]
  },
  {
    "id": 13,
    "t": "表设计与范式：主键、外键与关联表",
    "p": [
      "第一范式要求字段原子，第二范式消除部分依赖，第三范式消除传递依赖",
      "主键唯一标识行，优先使用与业务无关的稳定标识，如自增 ID 或 UUID",
      "一对多关系通过外键实现，多对多关系需要中间表并设置联合主键约束",
      "规范化减少数据冗余，但报表场景可适度反规范化以提升查询性能表现",
      "为每张表添加 created_at 与 updated_at，便于审计与排查问题"
    ],
    "c": "-- 反例：把多值塞进一列；正例：拆成两张表\nCREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT NOT NULL);\nCREATE TABLE enrollments (\n  student TEXT NOT NULL,\n  course_id INTEGER NOT NULL REFERENCES courses(id),\n  grade REAL CHECK (grade BETWEEN 0 AND 100),\n  PRIMARY KEY (student, course_id)\n);\nINSERT INTO courses (title) VALUES ('数据库原理'), ('操作系统');\nINSERT INTO enrollments (student, course_id, grade) VALUES\n  ('王小明', 1, 92), ('王小明', 2, 85), ('李雷', 1, 78);\n\nSELECT e.student, c.title, e.grade\nFROM enrollments e JOIN courses c ON c.id = e.course_id\nORDER BY e.student, c.title;",
    "et": "❌ 常见错误",
    "ec": "把多个值用逗号塞进一个字段，查询、约束与索引都会变得困难；应拆成关联表，用行明确表达多值关系，并建立外键。",
    "q": [
      {
        "q": "多对多关系如何落表？",
        "a": "建立中间表，两个外键加联合主键，必要时在中间表上记录额外属性。"
      },
      {
        "q": "什么时候可以反规范化？",
        "a": "读多写少、连接成本高的报表场景，可冗余少量字段并用约束或触发器保持一致性。"
      }
    ]
  },
  {
    "id": 14,
    "t": "组合查询：UNION、INTERSECT、EXCEPT",
    "p": [
      "UNION 合并结果并去重，UNION ALL 保留重复且通常更快",
      "INTERSECT 取交集，EXCEPT 取差集，SQLite 均支持",
      "参与集合运算的各个查询列数必须相同，类型按位置一一对应匹配对应",
      "ORDER BY 与 LIMIT 作用于整个集合运算结果，需写在最后",
      "集合运算优先级低于 JOIN，混用时需要用括号明确执行顺序逻辑"
    ],
    "c": "CREATE TABLE frontend (name TEXT);\nCREATE TABLE backend (name TEXT);\nINSERT INTO frontend VALUES ('HTML'), ('CSS'), ('JavaScript'), ('SQL');\nINSERT INTO backend VALUES ('SQL'), ('Go'), ('JavaScript');\n\nSELECT name FROM frontend UNION SELECT name FROM backend ORDER BY name;\nSELECT name FROM frontend UNION ALL SELECT name FROM backend ORDER BY name;\nSELECT name FROM frontend INTERSECT SELECT name FROM backend;\nSELECT name FROM frontend EXCEPT SELECT name FROM backend;",
    "et": "❌ 常见错误",
    "ec": "用 UNION 代替 UNION ALL 做纯追加，触发额外排序去重；确认没有重复需求时应使用 UNION ALL。",
    "q": [
      {
        "q": "UNION 与 UNION ALL 的性能差异？",
        "a": "UNION 需要排序或哈希去重，UNION ALL 直接拼接，通常更快。"
      },
      {
        "q": "EXCEPT 返回什么？",
        "a": "出现在第一个查询但不在第二个查询结果中的行，并自动去重。"
      }
    ]
  },
  {
    "id": 15,
    "t": "视图与逻辑抽象",
    "p": [
      "视图是保存下来的查询，使用时像表一样查询，本身不存储数据内容",
      "CREATE VIEW 定义逻辑视图，CREATE VIEW IF NOT EXISTS 避免重复创建",
      "视图可简化复杂连接与权限控制，但每次查询都会重新执行底层语句",
      "SQLite 不支持物化视图，可用普通表配合定时刷新来模拟实现",
      "DROP VIEW 只删除视图定义，不会删除底层表中的数据记录"
    ],
    "c": "CREATE TABLE orders (id INTEGER PRIMARY KEY, customer TEXT, amount REAL, status TEXT);\nINSERT INTO orders (customer, amount, status) VALUES\n  ('alice', 120.0, 'paid'), ('bob', 80.0, 'pending'), ('alice', 200.0, 'paid');\n\nCREATE VIEW paid_orders AS\nSELECT id, customer, amount FROM orders WHERE status = 'paid';\n\nCREATE VIEW customer_revenue AS\nSELECT customer, count(*) AS orders, sum(amount) AS revenue\nFROM paid_orders GROUP BY customer;\n\nSELECT * FROM paid_orders;\nSELECT * FROM customer_revenue ORDER BY revenue DESC;",
    "et": "❌ 常见错误",
    "ec": "在视图上再套多层视图并大量过滤，执行计划难以优化；视图层数应受控，复杂报表可直接改写为 CTE 查询。",
    "q": [
      {
        "q": "视图会存储数据吗？",
        "a": "不会，普通视图只是保存的查询语句，每次查询都重新执行。"
      },
      {
        "q": "如何模拟物化视图？",
        "a": "建普通表存结果，用定时任务或触发器刷新，并记录最后更新时间。"
      }
    ]
  },
  {
    "id": 16,
    "t": "约束与数据完整性",
    "p": [
      "NOT NULL 禁止空值，DEFAULT 提供默认值，UNIQUE 保证列值唯一",
      "CHECK 约束用表达式校验，NULL 在 CHECK 中视为通过",
      "主键隐含唯一与非空，复合主键用 PRIMARY KEY (a, b) 声明",
      "外键约束需开启 PRAGMA foreign_keys，并可指定 ON DELETE 行为",
      "命名约束便于迁移与报错定位，SQLite 支持 CONSTRAINT 名称"
    ],
    "c": "CREATE TABLE accounts (\n  id INTEGER PRIMARY KEY,\n  email TEXT NOT NULL UNIQUE,\n  balance REAL NOT NULL DEFAULT 0 CHECK (balance >= 0),\n  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'frozen')),\n  created_at TEXT NOT NULL DEFAULT (datetime('now'))\n);\nINSERT INTO accounts (email, balance) VALUES ('a@example.com', 100);\n\nINSERT OR IGNORE INTO accounts (email) VALUES ('a@example.com');\nSELECT count(*) AS rows_after_duplicate FROM accounts;\n\nUPDATE accounts SET balance = balance - 50 WHERE id = 1;\nSELECT id, email, balance FROM accounts;",
    "et": "❌ 常见错误",
    "ec": "以为 UNIQUE 会忽略 NULL 从而避免重复，实际上多行 NULL 可以共存；需要非空唯一时应同时加 NOT NULL。",
    "q": [
      {
        "q": "CHECK 约束对 NULL 如何处理？",
        "a": "表达式结果为 NULL 时视为通过，因此非空要求要单独写 NOT NULL。"
      },
      {
        "q": "如何让重复插入不报错？",
        "a": "使用 INSERT OR IGNORE 忽略冲突，或 ON CONFLICT DO NOTHING。"
      }
    ]
  },
  {
    "id": 17,
    "t": "事务与回滚",
    "p": [
      "事务保证原子性，BEGIN 开启，COMMIT 提交，ROLLBACK 回滚",
      "SQLite 默认自动提交，每条语句独立事务，批量写入应显式开启事务",
      "SAVEPOINT 支持嵌套回滚，ROLLBACK TO 回到保存点而不结束整个事务",
      "约束冲突、断电与进程崩溃都可能触发回滚，日志模式影响恢复能力",
      "长事务会阻塞其他写入，应尽快提交并避免持有写锁过久影响并发性能"
    ],
    "c": "CREATE TABLE ledger (id INTEGER PRIMARY KEY, account TEXT, amount REAL NOT NULL);\nINSERT INTO ledger (account, amount) VALUES ('alice', 100), ('bob', 50);\n\nBEGIN;\nUPDATE ledger SET amount = amount - 30 WHERE account = 'alice';\nUPDATE ledger SET amount = amount + 30 WHERE account = 'bob';\nCOMMIT;\nSELECT * FROM ledger;\n\nBEGIN;\nUPDATE ledger SET amount = amount - 1000 WHERE account = 'alice';\nROLLBACK;\nSELECT sum(amount) AS total_after_rollback FROM ledger;",
    "et": "❌ 常见错误",
    "ec": "批量插入一万行而不开事务，每行都触发一次磁盘同步，速度极慢；用 BEGIN 与 COMMIT 包起来可快一个数量级。",
    "q": [
      {
        "q": "SAVEPOINT 适合什么场景？",
        "a": "长事务中的局部回滚，例如批量导入时某一段失败只回滚该段。"
      },
      {
        "q": "ROLLBACK 后数据会恢复吗？",
        "a": "会，未提交的修改全部撤销，数据库回到事务开始前的状态。"
      }
    ]
  },
  {
    "id": 18,
    "t": "导入与导出：CSV、JSON 与备份",
    "p": [
      "点命令 .mode csv 与 .import 把 CSV 导入表，.headers 控制首行是否为列名",
      "导出用 .output 或 shell 重定向，配合 -csv、-json、-header 参数",
      "导入前先建好表并匹配列顺序，分隔符可用 .separator 自定义",
      "大文件导入放在事务中，导入后执行 ANALYZE 更新统计信息",
      "SQLite 没有服务端 LOAD DATA，导入导出围绕本地文件与标准输入输出"
    ],
    "c": "-- 导出 CSV：sqlite3 app.db -header -csv \"select * from books;\" > books.csv\n-- 导入 CSV：sqlite3 app.db 后执行 .mode csv 与 .import books.csv books\nCREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, price REAL);\nINSERT INTO books (title, price) VALUES ('CSS 世界', 59.0), ('SQL 进阶', 79.0);\n\n.mode csv\n.headers on\n.output /tmp/books-export.csv\nSELECT * FROM books;\n.output stdout\n.mode box\nSELECT * FROM books;\n\n-- 备份整个数据库：sqlite3 app.db \".backup backup.db\"\n-- 导出为 SQL：sqlite3 app.db .dump > dump.sql",
    "et": "❌ 常见错误",
    "ec": "CSV 含逗号或换行时直接按分隔符切分导致错列；导出方应使用引号转义，或改用 JSON 等结构化格式。",
    "q": [
      {
        "q": "如何把 CSV 导入已有表？",
        "a": "先建好匹配列数的表，执行 .mode csv 和 .import 文件 表名。"
      },
      {
        "q": "如何生成可重建数据库的 SQL 文件？",
        "a": "使用 .dump 导出建表与插入语句，再用 sqlite3 new.db < dump.sql 恢复。"
      }
    ]
  },
  {
    "id": 19,
    "t": "模式匹配：LIKE、GLOB 与正则",
    "p": [
      "LIKE 使用 % 与 _ 通配，大小写敏感性由 PRAGMA case_sensitive_like 控制",
      "GLOB 使用 Unix 风格通配符 * 与 ?，并且区分大小写",
      "GLOB 支持 [0-9] 与 [a-z] 字符集，适合匹配固定格式的编号",
      "SQLite 默认没有 REGEXP 运算符，需要应用层注册函数或使用扩展",
      "前导通配会导致索引失效，查询模式应尽量以固定前缀字符开头进行匹配"
    ],
    "c": "CREATE TABLE files (name TEXT, size INTEGER);\nINSERT INTO files VALUES\n  ('index.html', 1200), ('style.css', 800), ('app.js', 5000),\n  ('logo.png', 34000), ('backup-2025-01.zip', 120000);\n\nSELECT name FROM files WHERE name LIKE '%.css';\nSELECT name FROM files WHERE name GLOB '*.js';\nSELECT name FROM files WHERE name GLOB 'backup-[0-9][0-9][0-9][0-9]-*.zip';\nSELECT name, size FROM files WHERE name LIKE '%a%' AND size > 1000;\nSELECT upper(name) AS upper_name FROM files WHERE name NOT LIKE '%.png';",
    "et": "❌ 常见错误",
    "ec": "写 WHERE name LIKE '%abc' 期待走索引，前导 % 让 B-tree 无法定位起点，只能全表扫描。",
    "q": [
      {
        "q": "LIKE 与 GLOB 的大小写行为？",
        "a": "LIKE 默认对 ASCII 不区分大小写，GLOB 区分大小写。"
      },
      {
        "q": "如何匹配 backup-2025-01.zip 这类文件名？",
        "a": "使用 GLOB 加字符集，如 backup-[0-9][0-9][0-9][0-9]-*.zip。"
      }
    ]
  },
  {
    "id": 20,
    "t": "扩展与多库：ATTACH、FTS5 与 JSON1",
    "p": [
      "ATTACH DATABASE 把另一个数据库文件挂到当前连接，用 schema 名访问",
      "跨库查询可像同库表一样执行 JOIN，但不能跨库创建触发器对象",
      "DETACH DATABASE 断开附加库，事务进行中不能分离",
      "SQLite 支持运行时加载扩展，如 FTS5 全文检索与 JSON1 函数",
      "附加库常用于归档数据、按租户分库以及冷热数据分离等场景中使用"
    ],
    "c": "-- 附加另一个数据库文件，像访问本库一样跨库查询\nATTACH DATABASE 'archive.db' AS archive;\nCREATE TABLE IF NOT EXISTS archive.old_orders (id INTEGER PRIMARY KEY, amount REAL);\nINSERT INTO archive.old_orders (amount) VALUES (10.0), (20.0);\n\nCREATE TABLE current_orders (id INTEGER PRIMARY KEY, amount REAL);\nINSERT INTO current_orders (amount) VALUES (30.0);\n\nSELECT sum(amount) AS total FROM (\n  SELECT amount FROM current_orders\n  UNION ALL\n  SELECT amount FROM archive.old_orders\n);\n\nDETACH DATABASE archive;",
    "et": "❌ 常见错误",
    "ec": "以为 ATTACH 会复制数据，实际上只是挂载同一个文件；跨库写入仍受文件权限与锁机制约束，需谨慎设计。",
    "q": [
      {
        "q": "ATTACH 后如何引用其中的表？",
        "a": "使用 schema 名限定，如 archive.old_orders。"
      },
      {
        "q": "跨库事务能保证原子性吗？",
        "a": "普通 SQLite 跨库写入在单连接内可事务化，但磁盘故障等场景不保证多文件原子提交。"
      }
    ]
  },
  {
    "id": 21,
    "t": "标准工具链：点命令、执行计划与格式化",
    "p": [
      "命令行点命令是 SQLite 的运维入口：.tables、.schema、.indexes、.timer、.eqp",
      "执行脚本用 sqlite3 app.db < schema.sql，交互模式用 .read schema.sql",
      "EXPLAIN 与 EXPLAIN QUERY PLAN 查看执行计划，.eqp on 自动附带计划",
      "格式化工具可用 sqlfluff、sqlformat，统一关键字大小写与缩进",
      "测试可在 :memory: 内存库中跑脚本，或用 bats 驱动 sqlite3 做断言"
    ],
    "c": "-- 包管理器/依赖：apt install sqlite3 libsqlite3-dev | brew install sqlite\n-- 版本：sqlite3 --version；JSON1 与 FTS5 通常已内置\n-- 测试框架：sqlite3 :memory: 执行断言脚本，或用 bats 驱动 sqlite3\n-- 格式化：sqlfluff format query.sql；sqlformat -r -k upper in.sql\n-- 调试器：.eqp on 查看执行计划；EXPLAIN / EXPLAIN QUERY PLAN\n-- 构建运行：sqlite3 app.db < schema.sql && sqlite3 app.db < seed.sql\n.timer on\n.headers on\n.mode box\n\nCREATE TABLE demo (id INTEGER PRIMARY KEY, label TEXT NOT NULL);\nINSERT INTO demo (label) VALUES ('索引'), ('事务'), ('窗口函数');\n\nEXPLAIN QUERY PLAN SELECT * FROM demo WHERE label = '事务';\nSELECT * FROM demo;",
    "et": "❌ 常见错误",
    "ec": "把 .timer、.mode 等点命令写进迁移 SQL 交给应用程序执行，驱动无法识别而报错；点命令只适用于 sqlite3 CLI。",
    "q": [
      {
        "q": "如何让每条查询自动显示执行计划？",
        "a": "在 sqlite3 交互模式执行 .eqp on，之后每条语句都会附带执行计划。"
      },
      {
        "q": "sqlfluff 与 sqlformat 的区别？",
        "a": "sqlfluff 是可配置的 SQL 检查与格式化工具，sqlformat 更轻量，适合快速统一格式。"
      }
    ]
  },
  {
    "id": 22,
    "t": "并发、锁与 WAL 模式",
    "p": [
      "SQLite 采用数据库级锁，写操作互斥，读操作在 WAL 模式下可与写并发",
      "WAL 模式提升读写并发，但需要定期 checkpoint，且不适合网络文件系统",
      "busy_timeout 设置等待锁释放的毫秒数，避免立即返回 SQLITE_BUSY",
      "BEGIN IMMEDIATE 立即获取写锁，减少锁升级时的死锁概率",
      "多进程写入应使用短事务并降低冲突，必要时用队列串行化请求执行"
    ],
    "c": "PRAGMA journal_mode = WAL;\nPRAGMA busy_timeout = 5000;\nPRAGMA foreign_keys = ON;\n\nCREATE TABLE jobs (id INTEGER PRIMARY KEY, state TEXT NOT NULL, worker TEXT);\nINSERT INTO jobs (state) VALUES ('queued'), ('queued'), ('done');\n\nBEGIN IMMEDIATE;\nUPDATE jobs SET state = 'running', worker = 'w1'\nWHERE id = (SELECT id FROM jobs WHERE state = 'queued' ORDER BY id LIMIT 1);\nCOMMIT;\n\nSELECT * FROM jobs;\nPRAGMA journal_mode;",
    "et": "❌ 常见错误",
    "ec": "在 NFS 或共享网盘上开启 WAL，多机访问会破坏锁语义甚至损坏数据库；SQLite 的并发模型假设本地文件系统。",
    "q": [
      {
        "q": "WAL 模式带来什么好处？",
        "a": "读操作不阻塞写、写不阻塞读，显著提升读写并发能力。"
      },
      {
        "q": "BEGIN IMMEDIATE 与 BEGIN 的区别？",
        "a": "IMMEDIATE 立即获取写锁，避免事务中途升级锁失败；普通 BEGIN 是延迟获取。"
      }
    ]
  },
  {
    "id": 23,
    "t": "索引与查询性能优化",
    "p": [
      "索引加速 WHERE、JOIN 与 ORDER BY，但会增加写入成本与存储占用",
      "复合索引遵循最左前缀原则，把选择性高且常用于等值过滤的列放前面",
      "EXPLAIN QUERY PLAN 中 SCAN 表示全表扫描，SEARCH 表示使用索引",
      "ANALYZE 收集统计信息，帮助查询规划器选择更合适的索引",
      "避免在索引列上使用函数或发生隐式类型转换，否则索引可能失效命中"
    ],
    "c": "CREATE TABLE events (id INTEGER PRIMARY KEY, user_id INTEGER, kind TEXT, created_at TEXT);\nWITH RECURSIVE seq(n) AS (\n  SELECT 1 UNION ALL SELECT n + 1 FROM seq WHERE n < 2000\n)\nINSERT INTO events (user_id, kind, created_at)\nSELECT n % 200, CASE WHEN n % 3 = 0 THEN 'click' ELSE 'view' END,\n       date('2026-01-01', '+' || n || ' days')\nFROM seq;\n\nEXPLAIN QUERY PLAN SELECT * FROM events WHERE user_id = 42;\n\nCREATE INDEX idx_events_user_created ON events (user_id, created_at);\nANALYZE;\n\nEXPLAIN QUERY PLAN SELECT * FROM events WHERE user_id = 42 ORDER BY created_at DESC LIMIT 10;",
    "et": "❌ 常见错误",
    "ec": "给每一列都建索引，写入变慢、磁盘膨胀，查询规划器还可能选错；索引应依据真实慢查询与执行计划添加，并定期复核。",
    "q": [
      {
        "q": "复合索引 (user_id, created_at) 能加速哪些查询？",
        "a": "能加速按 user_id 过滤及按 created_at 排序的查询，也支持仅按 user_id 的查询。"
      },
      {
        "q": "为什么在索引列上使用函数会失效？",
        "a": "索引按原始值排序，函数计算后的结果无法利用原有索引顺序。"
      }
    ]
  },
  {
    "id": 24,
    "t": "测试：内存数据库与断言脚本",
    "p": [
      "测试用 :memory: 内存数据库，每次运行都是干净环境，速度快且不污染文件",
      "准备夹具用建表与插入脚本，测试结束后销毁连接即可自动清理资源",
      "断言可用 CASE 输出 ok 或 FAIL，再由 shell 脚本检查输出",
      "测试要覆盖约束冲突、空值、边界分页与并发冲突等异常路径情况与数据",
      "把测试脚本纳入 CI，任何迁移或查询改动都必须执行回归验证测试"
    ],
    "c": "-- 在内存库中建夹具并断言，输出出现 FAIL 即失败\nCREATE TABLE t (id INTEGER PRIMARY KEY, v INTEGER NOT NULL);\nINSERT INTO t (v) VALUES (10), (20);\n\nSELECT CASE WHEN count(*) = 2 THEN 'ok' ELSE 'FAIL: 行数错误' END AS check_rows FROM t;\nSELECT CASE WHEN sum(v) = 30 THEN 'ok' ELSE 'FAIL: 总和错误' END AS check_sum FROM t;\n\n-- 唯一约束必须生效\nCREATE TABLE u (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE);\nINSERT INTO u (email) VALUES ('a@example.com');\nINSERT OR IGNORE INTO u (email) VALUES ('a@example.com');\nSELECT CASE WHEN count(*) = 1 THEN 'ok' ELSE 'FAIL: 唯一约束失效' END AS check_unique FROM u;\n\n-- 运行：sqlite3 :memory: < test.sql | grep -q FAIL && exit 1\nSELECT '全部断言通过' AS result;",
    "et": "❌ 常见错误",
    "ec": "测试直接连生产库或共享开发库，跑一次就改脏数据；测试必须使用独立内存库或临时文件库，并在结束后销毁。",
    "q": [
      {
        "q": "为什么测试倾向使用 :memory:？",
        "a": "速度快、环境干净、结束即销毁，不会留下测试数据。"
      },
      {
        "q": "SQL 测试如何判断失败？",
        "a": "让断言输出 FAIL 并由外层脚本 grep，或使用 CHECK 约束让非法数据插入失败。"
      }
    ]
  },
  {
    "id": 25,
    "t": "调试技巧：回显、执行计划与完整性检查",
    "p": [
      ".echo on 回显执行的 SQL，.bail on 遇错立即停止，便于定位脚本中断位置",
      "EXPLAIN 查看虚拟机指令，EXPLAIN QUERY PLAN 查看索引与扫描策略",
      "PRAGMA integrity_check 检查文件完整性，foreign_key_check 检查外键孤儿",
      "错误信息包含 SQLITE_CONSTRAINT 等扩展码，可据此区分唯一、外键与检查约束",
      "怀疑类型问题时用 typeof 与 quote 查看真实存储值"
    ],
    "c": ".echo on\n.timer on\n.headers on\n\nCREATE TABLE t (id INTEGER PRIMARY KEY, name TEXT);\nINSERT INTO t (name) VALUES ('a'), ('b');\n\nEXPLAIN SELECT * FROM t WHERE id = 1;\nEXPLAIN QUERY PLAN SELECT * FROM t WHERE name = 'a';\n\nSELECT id, quote(name), typeof(name) FROM t;\nPRAGMA integrity_check;\nPRAGMA foreign_key_check;\nPRAGMA table_info(t);",
    "et": "❌ 常见错误",
    "ec": "只看报错文本不看扩展错误码，容易把 UNIQUE 冲突误判为语法错误；应先确认约束类型，再修复数据。",
    "q": [
      {
        "q": "脚本执行到一半停止如何定位？",
        "a": "开启 .bail on 与 .echo on，最后一条回显语句就是出错位置附近。"
      },
      {
        "q": "如何检查数据库文件是否损坏？",
        "a": "执行 PRAGMA integrity_check，返回 ok 表示通过。"
      }
    ]
  },
  {
    "id": 26,
    "t": "与外部系统互操作：管道、JSON 与驱动",
    "p": [
      "sqlite3 可与 shell 管道组合，-csv 或 -json 输出便于交给 awk、jq 处理",
      "从标准输入读取 SQL 可用 echo 或 heredoc，适合自动化脚本",
      "JSON1 提供 json_object、json_array、json_each 等函数，可生成与展开 JSON",
      "应用通过 SQLite C API、JDBC、Python sqlite3 等驱动访问，参数绑定是通用做法",
      "与其他系统交换数据优先选 CSV 或 JSON，避免直接共享数据库文件"
    ],
    "c": "-- 与 shell 管道互操作\n-- sqlite3 app.db -csv \"select * from books;\" | awk -F, 'NR>1 {s+=$3} END {print s}'\n-- JSON 输出：sqlite3 app.db -json \"select * from books;\"\nCREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, price REAL);\nINSERT INTO books (title, price) VALUES ('HTML5', 49.0), ('CSS3', 55.0);\n\nSELECT json_object('id', id, 'title', title, 'price', price) AS record FROM books;\n\nSELECT json_group_array(title) AS titles FROM books;\n\nSELECT key, value FROM json_each('[1, 2, 3]');",
    "et": "❌ 常见错误",
    "ec": "把数据库文件放到共享目录让多个服务直接读写，锁冲突与损坏风险极高；应通过服务接口或各自副本交换数据。",
    "q": [
      {
        "q": "如何让 sqlite3 直接输出 JSON？",
        "a": "使用 -json 参数，或在 SQL 中调用 json_object 与 json_group_array。"
      },
      {
        "q": "json_each 的作用？",
        "a": "把 JSON 数组展开成多行，每行包含 key、value 等字段，便于关系化查询。"
      }
    ]
  },
  {
    "id": 27,
    "t": "架构与迁移：版本化与软删除",
    "p": [
      "用 schema_migrations 表记录已应用版本，迁移脚本按版本号顺序执行",
      "迁移脚本要可重复执行与可回滚，结构变更与数据变更分开管理变更",
      "软删除用 deleted_at 标记，业务查询统一过滤未删除记录",
      "审计表用于记录关键字段变更，可配合触发器或应用层共同写入记录",
      "单库多租户可用 tenant_id 列加复合索引，简单场景优于分库"
    ],
    "c": "-- 迁移模式：schema_migrations 记录已应用版本\nCREATE TABLE schema_migrations (\n  version TEXT PRIMARY KEY,\n  applied_at TEXT NOT NULL DEFAULT (datetime('now'))\n);\n\nCREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  email TEXT NOT NULL UNIQUE,\n  deleted_at TEXT\n);\nINSERT INTO schema_migrations (version) VALUES ('001_create_users');\n\n-- 软删除：业务查询统一带 deleted_at IS NULL\nUPDATE users SET deleted_at = datetime('now') WHERE id = 1;\nSELECT email FROM users WHERE deleted_at IS NULL;\nSELECT version, applied_at FROM schema_migrations ORDER BY version;",
    "et": "❌ 常见错误",
    "ec": "直接在生产库手工改表却不记录迁移版本，新环境无法复现；所有结构变更都应落成版本化、可重复执行的脚本。",
    "q": [
      {
        "q": "软删除的优点是什么？",
        "a": "保留历史数据，可恢复与审计，避免外键引用悬空。"
      },
      {
        "q": "迁移脚本为什么要可重复执行？",
        "a": "CI 与新环境可能重复运行，使用 IF NOT EXISTS 与版本记录可避免报错。"
      }
    ]
  },
  {
    "id": 28,
    "t": "数据库访问：CRUD、UPSERT 与 RETURNING",
    "p": [
      "CRUD 对应 INSERT、SELECT、UPDATE、DELETE，写操作会返回受影响行数",
      "UPSERT 用 INSERT ... ON CONFLICT DO UPDATE，实现幂等写入",
      "RETURNING 在一条语句中返回写入结果，减少额外查询开销",
      "批量写入要放在事务中，并使用预编译语句复用执行计划缓存能力复用",
      "更新时带 WHERE 条件并先 SELECT 验证，避免误改全表"
    ],
    "c": "CREATE TABLE inventory (\n  sku TEXT PRIMARY KEY,\n  qty INTEGER NOT NULL DEFAULT 0,\n  updated_at TEXT NOT NULL DEFAULT (datetime('now'))\n);\n\nINSERT INTO inventory (sku, qty) VALUES ('A-1', 5)\nON CONFLICT(sku) DO UPDATE SET qty = qty + excluded.qty, updated_at = datetime('now');\n\nINSERT INTO inventory (sku, qty) VALUES ('A-1', 3)\nON CONFLICT(sku) DO UPDATE SET qty = qty + excluded.qty\nRETURNING sku, qty;\nUPDATE inventory SET qty = qty - 2 WHERE sku = 'A-1' RETURNING *;\nDELETE FROM inventory WHERE qty <= 0 RETURNING sku;\nSELECT * FROM inventory;",
    "et": "❌ 常见错误",
    "ec": "执行 UPDATE 时忘记 WHERE，全表数据被覆盖；生产操作前先备份，并在事务中执行、确认影响行数后再提交。",
    "q": [
      {
        "q": "excluded 在 UPSERT 中代表什么？",
        "a": "表示本次尝试插入的那一行，可引用它的列更新已有记录。"
      },
      {
        "q": "RETURNING 需要什么版本？",
        "a": "SQLite 3.35.0 及以上版本支持。"
      }
    ]
  },
  {
    "id": 29,
    "t": "网络与 HTTP：SQLite 的边界与替代方案",
    "p": [
      "SQLite 是进程内数据库，不监听 TCP 端口，也没有内置的用户与权限体系",
      "不要把数据库文件放在网络共享上供多机写入，锁机制在 NFS 上不可靠",
      "需要 HTTP 访问时可选用 libSQL、Turso 等兼容服务，或自建 API 网关",
      "客户端服务器数据库如 PostgreSQL 才适合多机并发与细粒度权限",
      "缓存类数据可建表存储 URL、状态码与响应体，配合时间字段做失效判断"
    ],
    "c": "-- SQLite 不监听端口；不要通过共享文件系统跨主机写库\n-- 需要 HTTP 访问时可选：libSQL/Turso、自建 API 网关、PostgREST 风格服务\nPRAGMA journal_mode = WAL;\nPRAGMA busy_timeout = 3000;\nPRAGMA synchronous = NORMAL;\n\nCREATE TABLE cache_entries (\n  url TEXT PRIMARY KEY,\n  status INTEGER NOT NULL,\n  body TEXT,\n  fetched_at TEXT NOT NULL DEFAULT (datetime('now'))\n);\nINSERT INTO cache_entries (url, status, body) VALUES\n  ('https://example.com/api', 200, '{\"ok\":true}');\nSELECT url, status, length(body) AS bytes, fetched_at FROM cache_entries;",
    "et": "❌ 常见错误",
    "ec": "把 SQLite 当 MySQL 用，让十个服务实例同时写同一个网络盘文件，最终出现锁超时甚至数据库损坏。",
    "q": [
      {
        "q": "SQLite 能直接通过 HTTP 被访问吗？",
        "a": "不能，它是进程内库；需要 API 网关或 libSQL 这类兼容服务。"
      },
      {
        "q": "什么时候应该改用 PostgreSQL？",
        "a": "多机高并发写入、需要细粒度权限、存储过程或强网络访问时。"
      }
    ]
  },
  {
    "id": 30,
    "t": "安全编程：注入、权限与只读连接",
    "p": [
      "SQL 注入源于字符串拼接，参数绑定是当前唯一可靠的防护措施",
      "CLI 中可用 .parameter 设置命名参数，应用中使用驱动提供的占位符",
      "以最小权限原则运行，数据库文件权限仅授予属主读写与执行权限即可",
      "PRAGMA query_only 可让连接只读，降低误操作风险",
      "敏感字段应加密存储，备份文件同样需要严格的访问控制策略，避免泄露"
    ],
    "c": "-- 错误做法：拼接字符串；正确做法：参数绑定\nCREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, role TEXT NOT NULL DEFAULT 'user');\nINSERT INTO users (name) VALUES ('alice'), ('bob');\n\n-- sqlite3 CLI 绑定参数：\n-- sqlite3 app.db -cmd \".parameter set :name alice\" \"SELECT * FROM users WHERE name = :name;\"\nSELECT id, name FROM users WHERE name = :name;\n\n-- 只读连接与查询限制\nPRAGMA query_only = ON;\nPRAGMA trusted_schema = OFF;\nPRAGMA foreign_keys = ON;\nSELECT id, name, role FROM users ORDER BY id;",
    "et": "❌ 常见错误",
    "ec": "用 printf 拼接用户输入生成 SQL，攻击者传入 ' OR 1=1 -- 就能绕过条件；必须使用参数绑定或严格白名单。",
    "q": [
      {
        "q": "为什么转义单引号不够安全？",
        "a": "编码、多字节字符与不同上下文都可能绕过转义，参数绑定把数据和语句彻底分离。"
      },
      {
        "q": "query_only 适合什么场景？",
        "a": "报表、分析类只读连接，可防止误写与部分注入造成的破坏。"
      }
    ]
  },
  {
    "id": 31,
    "t": "项目实战基础：图书借阅数据库",
    "p": [
      "图书借阅系统核心实体为 members、books、loans，借阅记录关联读者与图书",
      "副本数量用 copies 字段表示，借出与归还通过 loans 的归还时间判断",
      "外键约束保证借阅记录不会指向不存在的图书或读者记录，维护引用完整性",
      "为 member_id、book_id 建索引，加速个人借阅与图书历史查询",
      "用 CHECK 约束防止副本数为负，用日期默认值简化插入数据"
    ],
    "c": "PRAGMA foreign_keys = ON;\n\nCREATE TABLE members (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  joined_on TEXT NOT NULL DEFAULT (date('now'))\n);\nCREATE TABLE books (\n  id INTEGER PRIMARY KEY, isbn TEXT NOT NULL UNIQUE,\n  title TEXT NOT NULL, copies INTEGER NOT NULL DEFAULT 1 CHECK (copies >= 0)\n);\nCREATE TABLE loans (\n  id INTEGER PRIMARY KEY, book_id INTEGER NOT NULL REFERENCES books(id),\n  member_id INTEGER NOT NULL REFERENCES members(id),\n  loaned_on TEXT NOT NULL, returned_on TEXT\n);\nINSERT INTO members (name) VALUES ('张三'), ('李四');\nINSERT INTO books (isbn, title, copies) VALUES\n  ('978-7-111', '数据库系统', 2), ('978-7-222', '算法导论', 1);\nINSERT INTO loans (book_id, member_id, loaned_on) VALUES\n  (1, 1, date('now', '-7 days')), (2, 2, date('now'));\n\nSELECT m.name, b.title, l.loaned_on, l.returned_on\nFROM loans l JOIN members m ON m.id = l.member_id JOIN books b ON b.id = l.book_id;",
    "et": "❌ 常见错误",
    "ec": "删除图书时直接 DELETE，导致历史借阅记录失去关联；应使用软删除或限制删除，保留完整的审计数据。",
    "q": [
      {
        "q": "如何查询某本书当前是否可借？",
        "a": "比较 copies 与未归还的借阅记录数，若相等则全部借出。"
      },
      {
        "q": "为什么借阅表要记录借出与归还两个时间？",
        "a": "可计算借阅时长、逾期情况，并保留完整历史。"
      }
    ]
  },
  {
    "id": 32,
    "t": "项目实战进阶：窗口函数与报表",
    "p": [
      "窗口函数在不减少行数的前提下计算排名、移动平均与前后行对比趋势",
      "PARTITION BY 分组，ORDER BY 定义窗口内顺序，ROWS 指定滑动范围",
      "row_number、rank、dense_rank 处理排名差异，lag、lead 取前后行",
      "CTE 把复杂查询拆成可读步骤，递归 CTE 可处理层级与序列",
      "报表查询先用 CTE 完成聚合，再在外层筛选，避免重复计算开销"
    ],
    "c": "CREATE TABLE readings (id INTEGER PRIMARY KEY, sensor TEXT, ts TEXT, value REAL);\nINSERT INTO readings (sensor, ts, value) VALUES\n  ('A', '2026-01-01 00:00', 12.1), ('A', '2026-01-01 01:00', 12.8),\n  ('B', '2026-01-01 00:00', 20.0), ('B', '2026-01-01 01:00', 19.4),\n  ('A', '2026-01-01 02:00', 13.2), ('B', '2026-01-01 02:00', 19.9);\n\nSELECT sensor, ts, value,\n       round(avg(value) OVER (\n         PARTITION BY sensor ORDER BY ts ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n       ), 2) AS moving_avg,\n       lag(value) OVER (PARTITION BY sensor ORDER BY ts) AS prev_value\nFROM readings\nORDER BY sensor, ts;\n\nWITH ranked AS (\n  SELECT sensor, ts, value, row_number() OVER (PARTITION BY sensor ORDER BY value DESC) AS rn\n  FROM readings\n)\nSELECT sensor, ts, value FROM ranked WHERE rn = 1;",
    "et": "❌ 常见错误",
    "ec": "在 WHERE 中直接引用窗口函数别名，SQL 执行顺序不允许；需要用 CTE 或子查询包一层后再过滤。",
    "q": [
      {
        "q": "row_number、rank、dense_rank 的区别？",
        "a": "row_number 连续编号；rank 并列跳号；dense_rank 并列不跳号。"
      },
      {
        "q": "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW 表示什么？",
        "a": "窗口包含当前行及前两行，共最多三行，用于移动平均等计算。"
      }
    ]
  },
  {
    "id": 33,
    "t": "构建、部署与数据发布",
    "p": [
      "发布前要做完整性检查、备份与迁移预演，确认回滚路径始终可用且可执行",
      "迁移脚本带版本号并按顺序执行，尽量在事务中安全完成结构变更操作",
      "VACUUM 重建数据库文件回收空间，ANALYZE 更新统计信息",
      "备份用 .backup 或 VACUUM INTO，避免直接复制正在写入的文件",
      "发布后检查 journal_mode、索引与关键查询计划是否符合预期"
    ],
    "c": "-- 发布流程：备份 → 应用迁移 → 校验 → 切流\n-- 备份：sqlite3 app.db \".backup releases/app-2026-01-01.db\"\n-- 构建：sqlite3 app.db < schema.sql && sqlite3 app.db < seed.sql\n-- 迁移：sqlite3 app.db < migrations/002_add_index.sql\nPRAGMA integrity_check;\nPRAGMA journal_mode = WAL;\nVACUUM;\nANALYZE;\n\nCREATE TABLE IF NOT EXISTS schema_migrations (\n  version TEXT PRIMARY KEY,\n  applied_at TEXT NOT NULL DEFAULT (datetime('now'))\n);\nINSERT OR IGNORE INTO schema_migrations (version) VALUES ('002_add_index');\nSELECT version, applied_at FROM schema_migrations;",
    "et": "❌ 常见错误",
    "ec": "直接 cp 正在写入的数据库文件做备份，可能得到不一致副本；应使用 .backup 或 VACUUM INTO 做一致性备份。",
    "q": [
      {
        "q": "VACUUM 的作用是什么？",
        "a": "重建数据库文件，回收删除后的空闲页并整理碎片，需要额外磁盘空间。"
      },
      {
        "q": "为什么发布前要跑 integrity_check？",
        "a": "确认文件结构没有损坏，避免把问题数据带到新版本。"
      }
    ]
  },
  {
    "id": 34,
    "t": "最佳实践与常见反模式",
    "p": [
      "显式列出字段，避免 SELECT *，接口对结构变化更稳健清晰",
      "写操作使用事务，长事务及时结束，尽量减少锁竞争与阻塞问题发生",
      "连接后立即开启外键约束，并设置 busy_timeout 与合适的日志模式",
      "所有外部输入都必须走参数绑定，禁止拼接 SQL 字符串执行查询",
      "为高频查询建索引并定期 ANALYZE，用执行计划验证实际效果"
    ],
    "c": "-- 1. 显式列名，避免 SELECT *\n-- 2. 所有写入带事务，长事务及时提交\n-- 3. 外键默认关闭，每个连接都要 PRAGMA foreign_keys = ON\n-- 4. 使用参数绑定，杜绝字符串拼接\n-- 5. 为 WHERE、JOIN、ORDER BY 高频列建索引，并定期 ANALYZE\nCREATE TABLE tags (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);\nINSERT INTO tags (name) VALUES ('css'), ('sql');\n\nBEGIN;\nINSERT INTO tags (name) VALUES ('bash') ON CONFLICT(name) DO NOTHING;\nCOMMIT;\n\nPRAGMA foreign_keys = ON;\nSELECT id, name FROM tags WHERE name LIKE 's%' ORDER BY name;",
    "et": "❌ 常见错误",
    "ec": "把 PRAGMA foreign_keys 写在建表脚本里就以为永久生效，它是连接级设置，每个新连接都要重新开启。",
    "q": [
      {
        "q": "为什么外键设置容易失效？",
        "a": "foreign_keys 是连接级 PRAGMA，不持久化到数据库文件，每个新连接都要重新设置。"
      },
      {
        "q": "SELECT * 的实际风险是什么？",
        "a": "列顺序与数量随结构变化，下游解析容易错位，还会多读不需要的大字段。"
      }
    ]
  },
  {
    "id": 35,
    "t": "总结与学习路线",
    "p": [
      "学习路线：基础查询、连接聚合、子查询与 CTE、事务索引、建模与调优",
      "继续深入窗口函数、全文检索 FTS5、JSON1 与递归查询",
      "理解查询规划器与索引结构，能读懂 EXPLAIN QUERY PLAN",
      "掌握备份恢复、迁移管理与并发控制，保证数据长期可靠、可用与可恢复",
      "用真实项目练习：图书借阅系统、报表看板与离线缓存场景进行练习"
    ],
    "c": "-- 学习路线：基础查询 → 连接聚合 → 事务与索引 → 建模与调优\nCREATE TABLE roadmap (\n  step INTEGER PRIMARY KEY,\n  topic TEXT NOT NULL,\n  done INTEGER NOT NULL DEFAULT 0 CHECK (done IN (0, 1))\n);\nINSERT INTO roadmap (step, topic, done) VALUES\n  (1, 'SELECT / WHERE / ORDER BY', 1),\n  (2, 'JOIN / GROUP BY / 子查询', 1),\n  (3, '事务、约束、索引', 0),\n  (4, '窗口函数与 CTE', 0),\n  (5, '建模、迁移与备份', 0);\n\nSELECT step, topic, CASE done WHEN 1 THEN '已完成' ELSE '待学习' END AS status\nFROM roadmap ORDER BY step;",
    "et": "❌ 常见错误",
    "ec": "只背语法不动手建模，遇到真实需求仍不会拆表与设计索引；用完整项目驱动学习，并持续用执行计划验证索引是否生效。",
    "q": [
      {
        "q": "接下来最值得深入的主题？",
        "a": "索引与查询计划、事务并发、窗口函数，这三项覆盖大多数实际性能与报表问题。"
      },
      {
        "q": "如何检验 SQL 掌握程度？",
        "a": "独立设计一个多表业务库，写出报表查询并让 EXPLAIN QUERY PLAN 走索引。"
      }
    ]
  }
];
