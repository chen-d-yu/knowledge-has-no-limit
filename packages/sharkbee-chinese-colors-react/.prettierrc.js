module.exports = {
	printWidth: 120, //一行的字符数，如果超过会进行换行，默认为80
	tabWidth: 2, //一个tab代表几个空格数，默认为2
	singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
	bracketSpacing: false, //对象大括号直接是否有空格
	//jsx的>不另起一行
	jsxBracketSameLine: false,
	trailingComma: 'all',
	// 在语句末尾打印分号。
	semi: true,
	//箭头函数参数只有一个时是否要有小括号
	arrowParens: 'avoid',
	// 兼容Mac与Windows文本文件换行符的序列监测规则
	endOfLine: 'auto',
	// jsx 不使用单引号，而使用双引号
	jsxSingleQuote: false,
};
