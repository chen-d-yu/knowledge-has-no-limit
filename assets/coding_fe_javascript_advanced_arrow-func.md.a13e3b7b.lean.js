import{_ as n,o as a,c as l,L as p}from"./chunks/framework.a932675b.js";const F=JSON.parse('{"title":"箭头函数","description":"","frontmatter":{"name":"箭头函数"},"headers":[],"relativePath":"coding/fe/javascript/advanced/arrow-func.md","lastUpdated":1725964165000}'),o={name:"coding/fe/javascript/advanced/arrow-func.md"};function e(c,s,r,t,i,y){return a(),l("div",null,s[0]||(s[0]=[p(`<h1 id="箭头函数" tabindex="-1">箭头函数 <a class="header-anchor" href="#箭头函数" aria-label="Permalink to &quot;箭头函数&quot;">​</a></h1><p>常见声明函数的方式有三种</p><ul><li>函数表达式</li><li>函数声明</li><li>箭头函数</li><li>构造函数声明</li></ul><p>在这几种方式中，箭头函数的声明方式比其他的更加简洁</p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 1.函数表达式</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> fn </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2.函数声明</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 3.箭头函数，()参数列表，{}方法体，用箭头链接</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> arrowFun </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 4.构造函数声明</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> func </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">Function</span><span style="color:#BABED8;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>函数声明和函数表达式的区别：</p><ol><li>函数声明会把函数提升到当前作用域的顶层，即使你在代码块最后面定义的函数</li><li>函数表达式不会产生函数提升，就算用<code>var</code>也只是提前声明而未定义</li></ol><h2 id="基本语法" tabindex="-1">基本语法 <a class="header-anchor" href="#基本语法" aria-label="Permalink to &quot;基本语法&quot;">​</a></h2><p>箭头函数对于参数和方法体，存在一些省略的写法，使得箭头函数更加简洁方便</p><p><strong>省略规则：</strong></p><ol><li>如果箭头函数只有一个参数，可省略参数括号</li><li>如果代码体中只有一句代码，可以省略大括号</li><li>如果该箭头函数返回的是对象，需要用括号包裹</li></ol><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 1.基本语法：():参数列表 =&gt; {}:语法代码块</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> fn </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">arrow function fn</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2.只有一个参数，可以省略参数括号</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> fn1 </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">a</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 3.语法体只有一行代码，可以省略大括号</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> sum </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">x</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">y</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> x </span><span style="color:#89DDFF;">+</span><span style="color:#BABED8;"> y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 4.语法体只有一行返回语句，且返回的是对象，省略大括号</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">name</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> (</span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> name </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="箭头函数的特点" tabindex="-1">箭头函数的特点 <a class="header-anchor" href="#箭头函数的特点" aria-label="Permalink to &quot;箭头函数的特点&quot;">​</a></h2><h3 id="_1-不会绑定this" tabindex="-1">1. 不会绑定<code>this</code> <a class="header-anchor" href="#_1-不会绑定this" aria-label="Permalink to &quot;1. 不会绑定\`this\`&quot;">​</a></h3><p>箭头函数不会创建自己的<code>this</code>，它只会从自己的作用域链的上一层继承<code> this</code></p><p>箭头函数的<code>this</code>指向，是在函数定义环节就已经确定了，因为自身无法拥有<code>this</code>会去上层作用域寻找</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">age</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">setInterval</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">age</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// this正确地指向 p 实例</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> p </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">Person</span><span style="color:#BABED8;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>没有绑定<code>this</code>，所以无法改变<code>this</code>的指向，<code>apply | call | bind</code>等改变<code>this</code>指向的方法自然无效</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">张三</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#82AAFF;">foo</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> person </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">孙悟空</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 箭头函数没有this，所以这些方法对箭头函数无效</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// this还是按照作用域链查找的方式，忽略obj字面量的{}</span></span>
<span class="line"><span style="color:#BABED8;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(person) </span><span style="color:#676E95;font-style:italic;">// window</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><blockquote><p>对象字面量不会形成作用域</p><p>对象字面亮的大括号仅仅表示创建对象的语法糖，不会形成作用域</p></blockquote><h3 id="_2-不绑定arguments" tabindex="-1">2. 不绑定<code>arguments</code> <a class="header-anchor" href="#_2-不绑定arguments" aria-label="Permalink to &quot;2. 不绑定\`arguments\`&quot;">​</a></h3><p>普通函数中存在一个隐式的<code>arguments</code>类数组对象，在箭头函数中却不会绑定这个对象，不会绑定意味着它会和<code>this</code>一样，只会从自己作用域链的上一层继承过来，如果没有这个对象，恰好你又访问了它，那么喜提报错</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> testArguments </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">arguments</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">testArguments</span><span style="color:#BABED8;">() </span><span style="color:#676E95;font-style:italic;">// Uncaught ReferenceError: arguments is not defined</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>在箭头函数内部更加推荐剩余参数</p><div class="tip custom-block"><p class="custom-block-title">剩余参数</p><p>在<code>ES6</code>，优先推荐在函数内部使用剩余参数，而不是<code>arguments</code>类数组对象</p></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 使用剩余参数替代arguments</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 剩余参数args形参是个真正的数组，它接收testArgs函数的剩余参数</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> testArgs </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">(...</span><span style="color:#BABED8;font-style:italic;">args</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">args</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">Array</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isArray</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">args</span><span style="color:#F07178;">))</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">testArgs</span><span style="color:#BABED8;">(</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">4</span><span style="color:#BABED8;">) </span><span style="color:#676E95;font-style:italic;">// [1,2,3,4] true</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="_3-箭头函数无法作为构造函数" tabindex="-1">3. 箭头函数无法作为构造函数 <a class="header-anchor" href="#_3-箭头函数无法作为构造函数" aria-label="Permalink to &quot;3. 箭头函数无法作为构造函数&quot;">​</a></h3><p>箭头函数是一个特殊的函数对象，在<strong>小学二年级课本有教</strong>，只要是对象基本会有它的隐式原型<code>__proto__</code>，而函数对象还会在这个基础上多一个显式原型<code>prototype</code>——原型链。</p><p>箭头函数特殊的点就在于，它是没有显式原型<code>prototype</code>属性的，就跟普通对象是没有区别</p><p><img src="https://minio.sciento.cn/st-public/2/4a7e2bd4db52450bbaa363e3e16b5295@%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E5%8E%9F%E5%9E%8B.png" alt=""></p><p>由于它没有显式原型<code>prototype</code>，那么它作为构造函数时，在执行<a href="./new">new 关键字</a>的操作时，内部就会抛出错误<code>Uncaught TypeError: fn is not a constructor</code></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ol><li>箭头函数可以在参数、方法体有一些省略写法</li><li>箭头函数自身不绑定<code>this|arguments</code>等对象，它只会从自己的作用域链的上一层继承</li><li>箭头函数被<code>apply|call|bind</code>等改变<code>this</code>指向的方法调用时，改变<code>this</code>指向的操作无效，函数会正常调用</li><li>箭头函数是个特殊的函数对象，它没有显式原型<code>prototype</code>，所以它无法被当做构造函数，无法被<code>new</code>关键字所操作</li></ol>`,33)]))}const B=n(o,[["render",e]]);export{F as __pageData,B as default};