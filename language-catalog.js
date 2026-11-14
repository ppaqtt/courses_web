/**
 * 34 门语言的统一目录数据
 * 用于：学习路线、跨语言概念对照、每日 5 题、在线运行示例
 *
 * 字段说明：
 *   id / key / name / icon      基础标识
 *   group / groups              主分组 + 可归属分组
 *   year / creator              诞生年份与作者
 *   blurb / useCases            一句话介绍与典型用途
 *   exampleTitle / example      可在线运行的示例
 *   concepts                    闭包 / 垃圾回收 / 类型系统 / 并发模型
 *   detail                      已有教程详情页的深链（没有则为 null）
 *   chapters                    该语言在教程中的章节数（用于进度）
 */
(function (global) {
    const LANGUAGES = [
        {
            id: 1, key: 'python', name: 'Python', icon: '🐍',
            group: 'data', groups: ['data', 'script'],
            year: 1991, creator: 'Guido van Rossum',
            blurb: '语法简洁，数据科学、自动化与后端开发的首选。',
            useCases: ['数据科学', '自动化脚本', 'Web 后端'],
            exampleTitle: '斐波那契数列',
            example: String.raw`def fib(n):
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print("fib(10) =", fib(10))`,
            concepts: ['完整闭包', '引用计数 + 分代 GC', '动态强类型', '线程 / 多进程 / async'],
            detail: 'programming-languages-tutorial.html#lang-1',
            chapters: 6
        },
        {
            id: 2, key: 'javascript', name: 'JavaScript', icon: '⚡',
            group: 'frontend', groups: ['frontend', 'script'],
            year: 1995, creator: 'Brendan Eich',
            blurb: 'Web 的通用语言，前端、Node.js 后端与跨端应用都能写。',
            useCases: ['Web 前端', 'Node.js 后端', '跨端应用'],
            exampleTitle: '数组与箭头函数',
            example: String.raw`const langs = ['JS', 'TS', 'Node'];
const upper = langs.map(x => x.toUpperCase());
console.log('Languages: ' + upper.join(', '));`,
            concepts: ['完整闭包', '追踪式 GC', '动态弱类型（可用 TS 加静态类型）', '事件循环 / async'],
            detail: 'programming-languages-tutorial.html#lang-2',
            chapters: 6
        },
        {
            id: 3, key: 'java', name: 'Java', icon: '☕',
            group: 'system', groups: ['system', 'web'],
            year: 1995, creator: 'James Gosling',
            blurb: '一次编写、到处运行，企业级后端与 Android 的基石。',
            useCases: ['企业级后端', 'Android', '大数据'],
            exampleTitle: '1 到 10 求和',
            example: String.raw`public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 10; i++) sum += i;
        System.out.println("1 + ... + 10 = " + sum);
    }
}`,
            concepts: ['完整闭包（Lambda）', '分代 GC', '静态强类型', '线程 / 虚拟线程'],
            detail: 'programming-languages-tutorial.html#lang-3',
            chapters: 6
        },
        {
            id: 4, key: 'cpp', name: 'C++', icon: '⚙️',
            group: 'system', groups: ['system', 'game'],
            year: 1985, creator: 'Bjarne Stroustrup',
            blurb: '高性能与底层控制的代名词，游戏引擎和系统软件常用。',
            useCases: ['游戏引擎', '系统软件', '高性能计算'],
            exampleTitle: '向量求和',
            example: String.raw`#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int n : nums) sum += n;
    cout << "sum = " << sum << endl;
    return 0;
}`,
            concepts: ['完整闭包（Lambda）', '手动管理 + RAII', '静态强类型', '线程 / 协程'],
            detail: 'programming-languages-tutorial.html#lang-4',
            chapters: 6
        },
        {
            id: 5, key: 'csharp', name: 'C#', icon: '🎯',
            group: 'system', groups: ['system', 'web', 'game'],
            year: 2000, creator: 'Microsoft',
            blurb: '.NET 平台的现代语言，Unity 游戏与桌面/后端通吃。',
            useCases: ['Unity 游戏', '.NET 后端', '桌面应用'],
            exampleTitle: '字符串插值',
            example: String.raw`using System;

class Program {
    static void Main() {
        int sum = 0;
        for (int i = 1; i <= 10; i++) sum += i;
        Console.WriteLine($"1 + ... + 10 = {sum}");
    }
}`,
            concepts: ['完整闭包', '分代 GC', '静态强类型', 'async / await / 线程'],
            detail: 'programming-languages-tutorial.html#lang-5',
            chapters: 6
        },
        {
            id: 6, key: 'go', name: 'Go', icon: '🔵',
            group: 'system', groups: ['system', 'web'],
            year: 2009, creator: 'Google',
            blurb: '简洁、编译快，原生并发与云原生生态的代表。',
            useCases: ['云原生', '微服务', 'DevOps 工具'],
            exampleTitle: '循环求和',
            example: String.raw`package main

import "fmt"

func main() {
    sum := 0
    for i := 1; i <= 10; i++ {
        sum += i
    }
    fmt.Println("1 + ... + 10 =", sum)
}`,
            concepts: ['完整闭包', '并发标记清除 GC', '静态强类型', 'goroutine / channel'],
            detail: 'programming-languages-tutorial.html#lang-6',
            chapters: 6
        },
        {
            id: 7, key: 'rust', name: 'Rust', icon: '🦀',
            group: 'system', groups: ['system', 'web'],
            year: 2010, creator: 'Mozilla',
            blurb: '所有权与借用检查，在编译期保证内存安全。',
            useCases: ['系统编程', 'WebAssembly', '区块链'],
            exampleTitle: '迭代器求和',
            example: String.raw`fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let sum: i32 = nums.iter().sum();
    println!("sum = {}", sum);
}`,
            concepts: ['完整闭包', '无 GC / 所有权', '静态强类型', '线程 / async'],
            detail: 'programming-languages-tutorial.html#lang-7',
            chapters: 6
        },
        {
            id: 8, key: 'typescript', name: 'TypeScript', icon: '📘',
            group: 'frontend', groups: ['frontend', 'script'],
            year: 2012, creator: 'Microsoft',
            blurb: '给 JavaScript 加上静态类型，适合大型前端工程。',
            useCases: ['大型前端', '企业级应用', 'Node.js 后端'],
            exampleTitle: '类型注解与 reduce',
            example: String.raw`const nums: number[] = [1, 2, 3, 4, 5];
const sum: number = nums.reduce((a, b) => a + b, 0);
console.log('sum = ' + sum);`,
            concepts: ['完整闭包', '由 JS 运行时管理', '静态类型（渐进式）', '事件循环 / async'],
            detail: 'programming-languages-tutorial.html#lang-8',
            chapters: 6
        },
        {
            id: 9, key: 'php', name: 'PHP', icon: '🐘',
            group: 'script', groups: ['script', 'web'],
            year: 1995, creator: 'Rasmus Lerdorf',
            blurb: '为 Web 而生，部署简单，CMS 与中小型站点生态庞大。',
            useCases: ['网站开发', '内容管理', '电商平台'],
            exampleTitle: '数组求和',
            example: String.raw`<?php
$nums = [1, 2, 3, 4, 5];
$sum = array_sum($nums);
echo "sum = {$sum}\n";`,
            concepts: ['完整闭包', '引用计数 + 周期回收', '动态弱类型（可选类型声明）', '多进程 / FPM'],
            detail: 'programming-languages-tutorial.html#lang-9',
            chapters: 6
        },
        {
            id: 10, key: 'swift', name: 'Swift', icon: '🍎',
            group: 'system', groups: ['system', 'mobile'],
            year: 2014, creator: 'Apple',
            blurb: 'Apple 平台的现代语言，安全、快速、表达力强。',
            useCases: ['iOS', 'macOS', '服务端'],
            exampleTitle: 'reduce 求和',
            example: String.raw`import Foundation

let nums = [1, 2, 3, 4, 5]
let sum = nums.reduce(0, +)
print("sum = \(sum)")`,
            concepts: ['完整闭包', 'ARC 引用计数', '静态强类型', 'async / await / 线程'],
            detail: 'programming-languages-tutorial.html#lang-10',
            chapters: 6
        },
        {
            id: 11, key: 'kotlin', name: 'Kotlin', icon: '🟣',
            group: 'system', groups: ['system', 'mobile'],
            year: 2011, creator: 'JetBrains',
            blurb: '与 Java 互操作，空安全与协程让 Android 开发更舒服。',
            useCases: ['Android', 'Ktor 后端', '跨平台'],
            exampleTitle: '集合求和',
            example: String.raw`fun main() {
    val nums = listOf(1, 2, 3, 4, 5)
    println("sum = " + nums.sum())
}`,
            concepts: ['完整闭包', 'JVM GC', '静态强类型 + 空安全', '协程 / 线程'],
            detail: null,
            chapters: 1
        },
        {
            id: 12, key: 'ruby', name: 'Ruby', icon: '💎',
            group: 'script', groups: ['script', 'web'],
            year: 1995, creator: 'Yukihiro Matsumoto',
            blurb: '优雅、以开发者体验为中心，Rails 让 Web 开发更快。',
            useCases: ['Web 开发', '自动化脚本', '原型'],
            exampleTitle: '数组求和',
            example: String.raw`nums = [1, 2, 3, 4, 5]
puts "sum = #{nums.sum}"`,
            concepts: ['完整闭包（Block/Proc）', '标记清除 GC', '动态强类型', '线程 / GVL'],
            detail: null,
            chapters: 1
        },
        {
            id: 13, key: 'sql', name: 'SQL', icon: '🗄️',
            group: 'data', groups: ['data'],
            year: 1974, creator: 'IBM',
            blurb: '关系型数据库的通用查询语言，数据分析的基本功。',
            useCases: ['数据库查询', '数据分析', '报表'],
            exampleTitle: 'UNION ALL 查询',
            example: String.raw`SELECT 'Python' AS language, 1991 AS year
UNION ALL
SELECT 'JavaScript', 1995
UNION ALL
SELECT 'Go', 2009;`,
            concepts: ['有限（存储过程）', '由数据库管理', '静态类型', '数据库并发控制'],
            detail: null,
            chapters: 1
        },
        {
            id: 14, key: 'c', name: 'C', icon: '🔧',
            group: 'system', groups: ['system'],
            year: 1972, creator: 'Dennis Ritchie',
            blurb: '现代操作系统的母语，理解内存与指针的必经之路。',
            useCases: ['操作系统', '嵌入式', '底层库'],
            exampleTitle: '循环求和',
            example: String.raw`#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 10; i++) sum += i;
    printf("1 + ... + 10 = %d\n", sum);
    return 0;
}`,
            concepts: ['无闭包（函数指针）', '手动管理', '静态弱类型', '线程 / 进程'],
            detail: null,
            chapters: 1
        },
        {
            id: 15, key: 'dart', name: 'Dart', icon: '🎯',
            group: 'frontend', groups: ['frontend', 'mobile'],
            year: 2011, creator: 'Google',
            blurb: 'Flutter 的开发语言，一套代码构建多端界面。',
            useCases: ['Flutter 跨端', 'Web 前端', '客户端'],
            exampleTitle: 'reduce 求和',
            example: String.raw`void main() {
  final nums = [1, 2, 3, 4, 5];
  print('sum = ' + nums.reduce((a, b) => a + b).toString());
}`,
            concepts: ['完整闭包', '分代 GC', '静态强类型（可选 dynamic）', 'async / await / isolate'],
            detail: null,
            chapters: 1
        },
        {
            id: 16, key: 'scala', name: 'Scala', icon: 'λ',
            group: 'functional', groups: ['functional', 'data'],
            year: 2003, creator: 'Martin Odersky',
            blurb: 'JVM 上的函数式与面向对象融合体，擅长数据工程。',
            useCases: ['大数据', '分布式系统', '后端'],
            exampleTitle: 'List 求和',
            example: String.raw`object Main extends App {
  val nums = List(1, 2, 3, 4, 5)
  println("sum = " + nums.sum)
}`,
            concepts: ['完整闭包', 'JVM GC', '静态强类型', 'Actor / 线程'],
            detail: null,
            chapters: 1
        },
        {
            id: 17, key: 'r', name: 'R', icon: '📊',
            group: 'data', groups: ['data'],
            year: 1993, creator: 'Ross Ihaka & Robert Gentleman',
            blurb: '统计学家的工作台，数据可视化与统计建模利器。',
            useCases: ['统计分析', '数据可视化', '生物信息'],
            exampleTitle: '向量求和',
            example: String.raw`nums <- c(1, 2, 3, 4, 5)
cat("sum =", sum(nums), "\n")`,
            concepts: ['完整闭包', '引用计数 / GC', '动态弱类型', '多进程 / 并行包'],
            detail: null,
            chapters: 1
        },
        {
            id: 18, key: 'lua', name: 'Lua', icon: '🌙',
            group: 'script', groups: ['script', 'game'],
            year: 1993, creator: 'Roberto Ierusalimschy',
            blurb: '轻量嵌入式脚本，游戏引擎与配置系统的常客。',
            useCases: ['游戏脚本', '嵌入式', '配置'],
            exampleTitle: 'ipairs 求和',
            example: String.raw`local nums = {1, 2, 3, 4, 5}
local sum = 0
for _, n in ipairs(nums) do
  sum = sum + n
end
print("sum = " .. sum)`,
            concepts: ['完整闭包（upvalue）', '增量 GC', '动态弱类型', '协程'],
            detail: null,
            chapters: 1
        },
        {
            id: 19, key: 'bash', name: 'Bash', icon: '🐚',
            group: 'script', groups: ['script', 'system'],
            year: 1989, creator: 'Brian Fox',
            blurb: 'Linux/macOS 的命令行胶水语言，自动化运维的基础。',
            useCases: ['运维自动化', 'CI/CD', '文本处理'],
            exampleTitle: '循环求和',
            example: String.raw`#!/usr/bin/env bash
sum=0
for i in $(seq 1 10); do
  sum=$((sum + i))
done
echo "1 + ... + 10 = $sum"`,
            concepts: ['无闭包', '无 GC', '无静态类型', '多进程 / 管道'],
            detail: null,
            chapters: 1
        },
        {
            id: 20, key: 'html', name: 'HTML', icon: '📄',
            group: 'frontend', groups: ['frontend'],
            year: 1993, creator: 'Tim Berners-Lee',
            blurb: '网页的结构与语义，所有 Web 页面的骨架。',
            useCases: ['网页结构', '语义化', '无障碍'],
            exampleTitle: '语义化页面',
            example: String.raw`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>HTML 预览</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; }
    h1 { color: #667eea; }
  </style>
</head>
<body>
  <h1>Hello, HTML!</h1>
  <p>这是浏览器实时渲染的预览。</p>
</body>
</html>`,
            concepts: ['无', '由浏览器管理', '标记语言', '无'],
            detail: null,
            chapters: 1
        },
        {
            id: 21, key: 'css', name: 'CSS', icon: '🎨',
            group: 'frontend', groups: ['frontend'],
            year: 1996, creator: 'Håkon Wium Lie',
            blurb: '控制网页的布局、颜色与动效，让结构变得好看。',
            useCases: ['页面样式', '响应式布局', '动效'],
            exampleTitle: '渐变卡片',
            example: String.raw`<style>
  .card {
    max-width: 360px;
    margin: 40px auto;
    padding: 24px;
    border-radius: 16px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    font-family: sans-serif;
    text-align: center;
    box-shadow: 0 12px 32px rgba(0, 0, 0, .2);
  }
</style>
<div class="card">
  <h2>CSS 预览</h2>
  <p>渐变、圆角与阴影。</p>
</div>`,
            concepts: ['无', '由浏览器管理', '声明式', '无'],
            detail: null,
            chapters: 1
        },
        {
            id: 22, key: 'haskell', name: 'Haskell', icon: '🎓',
            group: 'functional', groups: ['functional'],
            year: 1990, creator: 'Haskell 委员会',
            blurb: '纯函数式语言，类型系统与惰性求值的经典代表。',
            useCases: ['函数式编程', '编译器', '形式化验证'],
            exampleTitle: '列表求和',
            example: String.raw`main :: IO ()
main = do
  let nums = [1, 2, 3, 4, 5]
  putStrLn ("sum = " ++ show (sum nums))`,
            concepts: ['完整闭包', 'GHC 分代 GC', '静态强类型', 'STM / 轻量线程'],
            detail: null,
            chapters: 1
        },
        {
            id: 23, key: 'elixir', name: 'Elixir', icon: '💧',
            group: 'functional', groups: ['functional', 'web'],
            year: 2011, creator: 'José Valim',
            blurb: '构建在 BEAM 上的函数式语言，Actor 并发与容错出色。',
            useCases: ['实时应用', '分布式系统', 'Web 后端'],
            exampleTitle: 'Enum 求和',
            example: String.raw`nums = [1, 2, 3, 4, 5]
IO.puts("sum = #{Enum.sum(nums)}")`,
            concepts: ['完整闭包', 'BEAM 进程级 GC', '动态强类型', 'Actor / 进程'],
            detail: null,
            chapters: 1
        },
        {
            id: 24, key: 'clojure', name: 'Clojure', icon: '🌀',
            group: 'functional', groups: ['functional'],
            year: 2007, creator: 'Rich Hickey',
            blurb: 'JVM 上的 Lisp 方言，强调不可变数据与简洁的并发模型。',
            useCases: ['数据工程', '并发编程', 'DSL'],
            exampleTitle: 'reduce 求和',
            example: String.raw`(println "sum =" (reduce + [1 2 3 4 5]))`,
            concepts: ['完整闭包', 'JVM GC', '动态强类型', 'STM / Agent'],
            detail: null,
            chapters: 1
        },
        {
            id: 25, key: 'fsharp', name: 'F#', icon: '🔷',
            group: 'functional', groups: ['functional', 'data'],
            year: 2005, creator: 'Microsoft',
            blurb: '.NET 上的函数式优先语言，类型推断与数据处理很强。',
            useCases: ['数据分析', '.NET 后端', '脚本'],
            exampleTitle: 'List 求和',
            example: String.raw`let nums = [1; 2; 3; 4; 5]
printfn "sum = %d" (List.sum nums)`,
            concepts: ['完整闭包', '.NET GC', '静态强类型', 'async / 线程'],
            detail: null,
            chapters: 1
        },
        {
            id: 26, key: 'erlang', name: 'Erlang', icon: '📡',
            group: 'functional', groups: ['functional', 'system'],
            year: 1986, creator: 'Ericsson',
            blurb: '为电信级容错而生，Actor 模型与热更新的先驱。',
            useCases: ['电信系统', '分布式', '高可用服务'],
            exampleTitle: '列表求和',
            example: String.raw`-module(main).
-export([main/1]).

main(_Args) ->
    Sum = lists:sum([1, 2, 3, 4, 5]),
    io:format("sum = ~p~n", [Sum]).`,
            concepts: ['完整闭包', '每进程 GC', '动态强类型', 'Actor / 进程'],
            detail: null,
            chapters: 1
        },
        {
            id: 27, key: 'ocaml', name: 'OCaml', icon: '🐫',
            group: 'functional', groups: ['functional', 'system'],
            year: 1996, creator: 'INRIA',
            blurb: '兼具函数式与命令式的高性能语言，编译器领域常用。',
            useCases: ['编译器', '金融系统', '形式化验证'],
            exampleTitle: 'List 求和',
            example: String.raw`let () =
  let nums = [1; 2; 3; 4; 5] in
  let sum = List.fold_left ( + ) 0 nums in
  Printf.printf "sum = %d\n" sum`,
            concepts: ['完整闭包', '分代 GC', '静态强类型', '线程 / async'],
            detail: null,
            chapters: 1
        },
        {
            id: 28, key: 'perl', name: 'Perl', icon: '🐪',
            group: 'script', groups: ['script'],
            year: 1987, creator: 'Larry Wall',
            blurb: '文本处理的瑞士军刀，正则与系统管理脚本的老牌选择。',
            useCases: ['文本处理', '系统管理', '日志分析'],
            exampleTitle: '数组求和',
            example: String.raw`my @nums = (1, 2, 3, 4, 5);
my $sum = 0;
$sum += $_ for @nums;
print "sum = $sum\n";`,
            concepts: ['完整闭包', '引用计数', '动态弱类型', '线程 / 进程'],
            detail: null,
            chapters: 1
        },
        {
            id: 29, key: 'pascal', name: 'Pascal', icon: '📐',
            group: 'system', groups: ['system'],
            year: 1970, creator: 'Niklaus Wirth',
            blurb: '结构化编程的经典教学语言，Delphi 的前身。',
            useCases: ['教学', '桌面应用', '嵌入式'],
            exampleTitle: '循环求和',
            example: String.raw`program Hello;
var
  i, sum: Integer;
begin
  sum := 0;
  for i := 1 to 10 do
    sum := sum + i;
  writeln('1 + ... + 10 = ', sum);
end.`,
            concepts: ['有限（函数指针）', '手动管理', '静态强类型', '线程'],
            detail: null,
            chapters: 1
        },
        {
            id: 30, key: 'groovy', name: 'Groovy', icon: '🎸',
            group: 'script', groups: ['script', 'web'],
            year: 2003, creator: 'James Strachan',
            blurb: 'JVM 上的动态脚本语言，Gradle 与 Jenkins 的常客。',
            useCases: ['构建脚本', '自动化', 'JVM 脚本'],
            exampleTitle: '列表求和',
            example: String.raw`def nums = [1, 2, 3, 4, 5]
println "sum = " + nums.sum()`,
            concepts: ['完整闭包', 'JVM GC', '动态 / 可选静态', '线程 / GPars'],
            detail: null,
            chapters: 1
        },
        {
            id: 31, key: 'objectivec', name: 'Objective-C', icon: '🍏',
            group: 'system', groups: ['system', 'mobile'],
            year: 1984, creator: 'Brad Cox',
            blurb: 'Apple 平台的老牌语言，消息传递与 C 的混合体。',
            useCases: ['iOS/macOS 旧项目', 'Cocoa', '底层扩展'],
            exampleTitle: 'NSArray 求和',
            example: String.raw`#import <Foundation/Foundation.h>

int main() {
    @autoreleasepool {
        NSArray *nums = @[@1, @2, @3, @4, @5];
        int sum = 0;
        for (NSNumber *n in nums) sum += [n intValue];
        NSLog(@"sum = %d", sum);
    }
    return 0;
}`,
            concepts: ['完整闭包（Block）', 'ARC 引用计数', '静态弱类型', 'GCD / 线程'],
            detail: null,
            chapters: 1
        },
        {
            id: 32, key: 'assembly', name: 'Assembly', icon: '🧱',
            group: 'system', groups: ['system'],
            year: 1949, creator: '早期计算机科学家',
            blurb: '与机器指令一一对应，理解 CPU 与操作系统的窗口。',
            useCases: ['底层优化', '逆向工程', '嵌入式'],
            exampleTitle: '系统调用输出',
            example: String.raw`section .data
    msg db "Hello, Assembly!", 10
    len equ $ - msg

section .text
    global _start

_start:
    mov rax, 1
    mov rdi, 1
    mov rsi, msg
    mov rdx, len
    syscall

    mov rax, 60
    xor rdi, rdi
    syscall`,
            concepts: ['无', '手动管理', '无类型（寄存器）', '中断 / 多核'],
            detail: null,
            chapters: 1
        },
        {
            id: 33, key: 'prolog', name: 'Prolog', icon: '🧠',
            group: 'functional', groups: ['functional'],
            year: 1972, creator: 'Alain Colmerauer',
            blurb: '逻辑编程代表，用事实与规则描述问题而非步骤。',
            useCases: ['专家系统', '自然语言处理', '约束求解'],
            exampleTitle: '规则与求和',
            example: String.raw`:- initialization(main).

main :-
    Sum is 1 + 2 + 3 + 4 + 5,
    write('sum = '), write(Sum), nl,
    halt.`,
            concepts: ['无（逻辑变量）', 'Prolog 引擎 GC', '动态类型', '逻辑 / 并发扩展'],
            detail: null,
            chapters: 1
        },
        {
            id: 34, key: 'fortran', name: 'Fortran', icon: '🧮',
            group: 'system', groups: ['system', 'data'],
            year: 1957, creator: 'John Backus',
            blurb: '科学计算的开山鼻祖，数值计算与超级计算机仍在使用。',
            useCases: ['科学计算', '数值模拟', '高性能计算'],
            exampleTitle: '循环求和',
            example: String.raw`program hello
  implicit none
  integer :: i, total
  total = 0
  do i = 1, 10
    total = total + i
  end do
  print *, '1 + ... + 10 = ', total
end program hello`,
            concepts: ['有限（内部函数）', '手动管理', '静态强类型', 'OpenMP / MPI'],
            detail: null,
            chapters: 1
        }
    ];

    const GROUPS = [
        { id: 'script', name: '脚本', icon: '📜', desc: '快速解决实际问题，胶水与自动化' },
        { id: 'system', name: '系统', icon: '⚙️', desc: '性能、内存、并发与底层控制' },
        { id: 'functional', name: '函数式', icon: 'λ', desc: '组合、不可变与并发模型' },
        { id: 'data', name: '数据', icon: '📊', desc: '查询、统计与数据可视化' },
        { id: 'frontend', name: '前端', icon: '🎨', desc: '页面结构、样式与交互' }
    ];

    const PATHS = [
        {
            id: 'web-fullstack',
            title: 'Web 全栈',
            icon: '🌐',
            desc: '从页面结构到前端交互，再到后端 API 与数据库。',
            steps: [
                { key: 'html', chapter: '结构与语义', note: '先能写出可访问的页面' },
                { key: 'css', chapter: '布局与视觉', note: 'Flex/Grid 与响应式' },
                { key: 'javascript', chapter: '交互与异步', note: 'DOM、事件、fetch' },
                { key: 'typescript', chapter: '类型与工程化', note: '为大型前端加类型' },
                { key: 'python', chapter: '后端 API', note: 'Flask/FastAPI + 数据库' },
                { key: 'sql', chapter: '数据持久化', note: '建模、查询与索引' }
            ]
        },
        {
            id: 'systems',
            title: '系统与底层',
            icon: '⚙️',
            desc: '理解内存、性能与并发，从 C 到 Rust/Go。',
            steps: [
                { key: 'c', chapter: '内存与指针', note: '理解地址、栈与堆' },
                { key: 'cpp', chapter: '抽象与 STL', note: 'RAII、模板与容器' },
                { key: 'rust', chapter: '所有权与安全', note: '编译期内存安全' },
                { key: 'go', chapter: '并发与云原生', note: 'goroutine 与微服务' },
                { key: 'assembly', chapter: '机器视角', note: '寄存器与系统调用' }
            ]
        },
        {
            id: 'data-script',
            title: '数据与脚本',
            icon: '📊',
            desc: '用脚本自动化工作，用 SQL/R 做数据分析。',
            steps: [
                { key: 'python', chapter: '脚本与数据', note: '自动化与数据处理' },
                { key: 'sql', chapter: '查询与聚合', note: '从 SELECT 到 JOIN' },
                { key: 'r', chapter: '统计与可视化', note: '统计建模与图表' },
                { key: 'bash', chapter: '命令行自动化', note: '管道与定时任务' },
                { key: 'perl', chapter: '文本处理', note: '正则与日志清洗' }
            ]
        }
    ];

    const byKey = Object.create(null);
    const byId = Object.create(null);
    const byName = Object.create(null);
    LANGUAGES.forEach(lang => {
        byKey[lang.key] = lang;
        byId[lang.id] = lang;
        byName[lang.name.toLowerCase()] = lang;
    });

    global.LANGUAGE_CATALOG = LANGUAGES;
    global.LANGUAGE_GROUPS = GROUPS;
    global.LEARNING_PATHS = PATHS;
    global.getCatalogLanguage = function (value) {
        if (value == null) return null;
        if (typeof value === 'object') return value;
        const raw = String(value).trim();
        return byKey[raw.toLowerCase()] ||
            byId[Number(raw)] ||
            byName[raw.toLowerCase()] ||
            null;
    };
    global.getCatalogLanguagesByGroup = function (groupId) {
        return LANGUAGES.filter(lang => lang.group === groupId);
    };
})(window);
