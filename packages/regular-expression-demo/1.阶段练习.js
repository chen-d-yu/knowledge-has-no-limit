// 1.捕获HTML结构
const str = "<div style='' id='div'><span>asd</span></div>";
const reg1 = /<.+?>/;
console.log(reg1.exec(str));

// 2.补全校验字符串-str1使得通过校验
const reg2 = /^abc{2}$/;
const str1 = "abcc";
console.log(reg2.test(str1));

// 3.验证数字范围
// 分情况编写，0~9：\d，0~99：\d{2}，0~199：1\d{2}，0~249：2[0-4]\d，  0~255：25[0-5]
const reg3 = /^(\d|\d{2}|1\d{2}|2[0-4]\d|25[0-5])$/;
console.log(reg3.test("244"));
