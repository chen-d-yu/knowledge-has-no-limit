// 1.() 作为整体使用
const reg1 = /abcd{2}/;
const reg2 = /(abcd){2}/;
console.log(reg1.test("abcdd")); // => 如果不做整体使用，限定元字符只会匹配前面的那个符号，也就是d会被匹配两次
console.log(reg2.test("abcdabcd")); // => abcd作为整体，会被匹配两次，形成的结构就是abcdabcd

// 2.() 单独捕获，捕获字符串时，从左边开始每一个小括号依次是exec函数数组下标从1开始递增的内容
const reg3 = /\d+(\s+)\d+/;
console.log(reg3.exec("123   123"));
// 带括号的返回值 [ '123   123', '   ', index: 0, input: '123   123', groups: undefined ]
// 不带括号的返回值 [ '123   123', index: 0, input: '123   123', groups: undefined ]

// 3.(?:) 整体匹配但是不捕获，只是标识一个整体，不会在exec函数单独捕获
const reg4 = /\d+(?:\s+)\d+/;
console.log(reg4.exec("123   123")); // [ '123   123', index: 0, input: '123   123', groups: undefined ]

// 4.| 占位或，通常表示要么是左边的整体或者是右边的整体
const reg5 = /abc|def/;
console.log(reg5.test("abc")); // => 检测到abc true
console.log(reg5.test("abcdef")); // => 检测到abc或者def true
console.log(reg5.test("casd")); // => 两者都检测不到 false

// 5.[] 一个[]表示占一个位置，表示取里面任意一个字符都行
const reg6 = /[abcd]/;
const reg7 = /^[abcd]$/;
console.log(reg6.test("e1231g,jl;ja")); // => 匹配的字符里面有任意的a、b、c、d都是true
console.log(reg7.test("a")); // => 匹配的字符里面开头和结尾只能由一个数字，有任意的a、b、c、d都是true
console.log(reg7.test("b")); // => 匹配的字符里面开头和结尾只能由一个数字，有任意的a、b、c、d都是true
console.log(reg7.test("c")); // => 匹配的字符里面开头和结尾只能由一个数字，有任意的a、b、c、d都是true

// 6.[^] 表示非里面任意一个字符都行
const reg8 = /[^abcd]/;
const reg9 = /^[^abcd]$/;
console.log(reg8.exec("e1231g,jl;ja")); // => 第一个字符由非[abcd]组成，捕获到了e，true
console.log(reg9.test("a")); // => 第一个字符由[abcd]组成，匹配不上，false
console.log(reg9.test("b")); // => 第一个字符由[abcd]组成，匹配不上，false
console.log(reg9.test("c")); // => 第一个字符由[abcd]组成，匹配不上，false

// 7.- 表示到的意思，从哪一个字符到哪一个字符，前提是ASCII码表中是连续的
const reg10 = /[0-9]/;
const reg11 = /^[a-z]$/; // [A-Z] 大写字母
console.log(reg10.test("123asda")); // => 匹配0-9之间任意一个字符，匹配到了1，true
console.log(reg11.test("a")); // => 匹配a-z开头，a-z结尾，仅此一个字符，true

/*
常见的组合形式
  1.[a-zA-Z0-9_] == \w
  2.[^a-zA-Z0-9_] == \W
  3.[0-9] == \d
  4.[^0-9] == \D
  5.[ ] == \s
  6.[^ ] == \S
  7.当 . 出现在[]或者[^]时，就表示普通的.字符，而不是一个任意非换行内容
*/

const reg = /^(abc|def){2}$/;
console.log(reg.test("abcabc")); // true
console.log(reg.test("defdef")); // true
console.log(reg.test("abcdef")); // true
console.log(reg.test("defabc")); // true

const a = /^[a-zA-Z0-9]\w{5,11}$/;
console.log(a.test("asda12312_"));
