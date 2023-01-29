const reg = /abc/;

// 1.匹配
console.log(reg.test("abcccsdasd"));
// 2.捕获
// 2.1捕获失败
const res = reg.exec("");
console.log(res);

// 2.2捕获成功，默认捕获出现的第一个
const res1 = reg.exec("bcdsabc");
console.log(res1);
/*
[ 'abc', index: 0, input: 'abcdsabc', groups: undefined ]
0：捕获成功的字符串
1：index捕获开始的值
2：input处理的字符串
3：groups
*/

// 元字符
// \s 空格
const reg1 = /\s/; // => 等价于字符串至少要有一个空格
console.log(reg1.test("a b c"));
// \S 非空格
const reg2 = /\S/; // => 等价于字符串内一个空格都不要有
console.log(reg1.test("a b c"));
