// 元字符
// 1.\s 空格  =>  等价于字符串至少要有一个空格 通过校验
const reg1 = /\s/;
console.log(reg1.test("a b c")); // true

// 2.\S 非空格  =>  等价于字符串内至少有一个非空格内容 通过校验
const reg2 = /\S/;
console.log(reg2.test("    ")); // false
console.log(reg2.test(" a   ")); // true

// 3.\t 制表符->tab  =>  等价于字符串内至少有一个制表符内容 通过校验
const reg3 = /\t/;
console.log(reg3.test("	")); // true

// 4.\d 数字  =>  字符串内至少有一个数字 通过校验
const reg4 = /\d/;
console.log(reg4.test("abs123")); // true

// 5.\D 非数字  =>  字符串内至少需要一个非数字字符 通过校验
const reg5 = /\D/;
console.log(reg5.test("1223")); // false
console.log(reg5.test("1223asd")); // true

// 6.\w  =>  字符串内至少需要一个数字、字母、或者下划线 通过校验
const reg6 = /\w/;
console.log(reg6.test("#")); // false
console.log(reg6.test("#_")); // true
console.log(reg6.test("#a")); // true
console.log(reg6.test("#1")); // true

// 7.\W  =>  字符串内至少需要一个数字、字母、或者下划线以外的任意一个字符串
const reg7 = /\W/;
console.log(reg7.test("a1_")); // fasle
console.log(reg7.test("a1_###——+==")); // true

// 8. .  =>  字符串内至少需要一个任意非换行内容
const reg8 = /./;
console.log(reg8.test("\n")); // \n表示换行  false
console.log(reg8.test("a1+_-#")); // true

// 9. \  =>  转义，和特定的字符组合在一起，转成特殊意义的字符，可以将内容相互转成 [没有/有]意义的内容
const regT = /s/; // =>表示字符串至少需要一个s
const reg9 = /\s/; // =>表示至少需要一个空格
// 这两者之间的意思就差别很大，这个字符一般指有的符号在元字符内已经被使用了直接定义是无法表达出来的意思，需要转义才能表达原来的意思
