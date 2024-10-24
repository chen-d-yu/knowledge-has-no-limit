import{_ as n,o as a,c as l,L as p}from"./chunks/framework.a932675b.js";const D=JSON.parse('{"title":"this","description":"","frontmatter":{},"headers":[],"relativePath":"coding/fe/javascript/advanced/this.md","lastUpdated":1725964165000}'),o={name:"coding/fe/javascript/advanced/this.md"};function e(c,s,r,t,i,y){return a(),l("div",null,s[0]||(s[0]=[p(`<h1 id="this" tabindex="-1">this <a class="header-anchor" href="#this" aria-label="Permalink to &quot;this&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p><code>this</code>关键字是当前执行上下文的一个对象，在面向对象类的语言中表示当前实例对象的一个引用</p><p>但在<code>JavaScript</code>中，<code>this</code>的指向可不是一成不变的，它很灵活，灵活到会根据 <strong><em>当前执行环境</em></strong> 的变化而变化</p><h2 id="this-指向绑定规则" tabindex="-1">this 指向绑定规则 <a class="header-anchor" href="#this-指向绑定规则" aria-label="Permalink to &quot;this 指向绑定规则&quot;">​</a></h2><p>在前言，我们说过<code>this</code>很灵活，它的绑定与定义的环境位置无关，而是跟绑定与调用环境有关，<code>this</code>是在运行时确定指向的</p><p>常见的四种绑定方式</p><ul><li>独立调用，指向<code>globalThis</code></li><li>隐式绑定，函数被对象引用并调用</li><li>显式调用，使用<code>apply</code>、<code>call</code>、<code>bind</code>等方法改变<code>this</code>的指向</li><li><code>new</code>关键字绑定</li></ul><blockquote><p><span style="font-size:18px;font-weight:bold;">globalThis</span></p><p>以前从不同的 JavaScript 环境中获取全局对象需要不同的语句，获取全局属性的繁琐程度极大增加。</p><p><code>globalThis</code>  提供了一个标准的方式来获取不同环境下的全局  <code>this</code>  对象，无论你在哪个环境，它会确保可以在有无窗口的各种环境下正常工作，你只需要记住，全局作用域中的  <code>this</code>  就是  <code>globalThis</code>。</p></blockquote><h3 id="独立调用" tabindex="-1">独立调用 <a class="header-anchor" href="#独立调用" aria-label="Permalink to &quot;独立调用&quot;">​</a></h3><p>独立调用表示没有对象<code>.</code>语法的方式调用的独立函数调用执行方式，例如<code>fn()</code>，这种方式的<code>this</code>指向的是当前环境的<code>globalThis</code></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 1.独立调用函数，执行输出this为window</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">fn</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">fn</span><span style="color:#BABED8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2.在对象中定义函数，但是执行时独立调用，依然指向全局</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test this</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#82AAFF;">fn</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> objFn </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> obj</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">fn</span></span>
<span class="line"><span style="color:#82AAFF;">objFn</span><span style="color:#BABED8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 3.在函数内部，存在独立调用，依然指向全局</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">bar</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">callback</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">callback</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">bar</span><span style="color:#BABED8;">(fn)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 4.严格模式下，独立调用的this返回undefined</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">strict</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">use strict</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">strict</span><span style="color:#BABED8;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="隐式绑定" tabindex="-1">隐式绑定 <a class="header-anchor" href="#隐式绑定" aria-label="Permalink to &quot;隐式绑定&quot;">​</a></h3><p>所谓的隐式绑定，就是通过对象<code>.</code>语法调用的函数，当前调用的函数的<code>this</code>会绑定到这个对象上面</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">test this</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#82AAFF;">fn</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1.对象点语法，函数执行输出this为当前的obj对象</span></span>
<span class="line"><span style="color:#BABED8;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">fn</span><span style="color:#BABED8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2.传入函数中，以对象点语法调用，this依然指向这个对象</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">bar</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">obj</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">obj</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">fn</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">bar</span><span style="color:#BABED8;">(obj)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="显式绑定" tabindex="-1">显式绑定 <a class="header-anchor" href="#显式绑定" aria-label="Permalink to &quot;显式绑定&quot;">​</a></h3><p>使用<code>apply</code>、<code>call</code>、<code>bind</code>等方法改变<code>this</code>的指向，这三个函数原型的方法都会改变<code>this</code>的指向，例如 <code>fn.apply()</code> 调用它们，就可以显式改变<code>this</code>的指向，它们大致功能都是改变<code>this</code>指向，只在使用上有些许差别</p><p>它们在传递第一个参数——<code>this</code>指向时，都有一个共同的特点，如果第一个实参为非引用数据类型，那么<code>this</code>会绑定到该实参的 <strong><em>包装类</em></strong> 上，<strong><em>如果实参没有包装类，那么当前次的显式绑定会变成独立调用，也就是指向全局<code>this</code></em></strong></p><ul><li><strong>apply</strong>：执行函数，传递两个参数，第一个参数是需要改变绑定的<code>this</code>，第二个参数是函数调用的实参列表，以数组方式传递</li><li><strong>call</strong>：执行函数，传递两个参数，第一个参数是需要改变绑定的<code>this</code>，剩下的参数是函数调用的实参列表，以剩余参数传递</li><li><strong>bind</strong>：执行函数，传递两个参数，第一个参数是需要改变绑定的<code>this</code>，剩下的参数是函数调用的实参列表，以剩余参数传递，并且该函数会范湖一个新的函数，新的函数就算是独立调用，后续也不会改变它的<code>this</code>指向</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> obj </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">张三</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">age</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">18</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#89DDFF;">(...</span><span style="color:#BABED8;font-style:italic;">args</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1.apply测试传入第一个参数类型，call、bind同理</span></span>
<span class="line"><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">abc</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">) </span><span style="color:#676E95;font-style:italic;">// String {&#39;abc&#39;}</span></span>
<span class="line"><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(</span><span style="color:#F78C6C;">123</span><span style="color:#BABED8;">) </span><span style="color:#676E95;font-style:italic;">// Number {123}</span></span>
<span class="line"><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(</span><span style="color:#FF9CAC;">true</span><span style="color:#BABED8;">) </span><span style="color:#676E95;font-style:italic;">// Boolean {true}</span></span>
<span class="line"><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">null</span><span style="color:#BABED8;">) </span><span style="color:#676E95;font-style:italic;">// window</span></span>
<span class="line"><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">undefined</span><span style="color:#BABED8;">) </span><span style="color:#676E95;font-style:italic;">// window</span></span>
<span class="line"><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(</span><span style="color:#F78C6C;">123</span><span style="color:#C792EA;">n</span><span style="color:#BABED8;">) </span><span style="color:#676E95;font-style:italic;">// BigInt {123n}</span></span>
<span class="line"><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(</span><span style="color:#82AAFF;">Symbol</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">symbol</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)) </span><span style="color:#676E95;font-style:italic;">// Symbol {Symbol(symbol), description: &#39;symbol&#39;}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2.apply，执行输出 this =&gt; obj</span></span>
<span class="line"><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">apply</span><span style="color:#BABED8;">(obj</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> [</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">abc</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">123</span><span style="color:#BABED8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 3.call，执行输出 this =&gt; obj</span></span>
<span class="line"><span style="color:#BABED8;">foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">call</span><span style="color:#BABED8;">(obj</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">abc</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">123</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 4.bind，执行输出 this =&gt; obj，并返回函数</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> newFn </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> foo</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bind</span><span style="color:#BABED8;">(obj</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">abc</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">123</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#82AAFF;">newFn</span><span style="color:#BABED8;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="new-绑定" tabindex="-1">new 绑定 <a class="header-anchor" href="#new-绑定" aria-label="Permalink to &quot;new 绑定&quot;">​</a></h3><p><a href="./new">new 关键字</a> 能帮我们通过一个“构造函数”实例化一个对象，通过<code>new</code>将<code>this</code>绑定到实例对象上</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">Foo</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Foo 构造函数</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1.new关键字实例对象，this指向了foo实例对象</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#BABED8;"> foo </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">Foo</span><span style="color:#BABED8;">()</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote><p><span style="font-size:18px;font-weight:bold;">实例对象</span></p><p>由构造函数创建的具体对象。当使用 new 关键字调用构造函数时，它会返回一个新的对象（实例对象），该对象继承了构造函数的属性和方法。</p></blockquote><h2 id="绑定规则的优先级" tabindex="-1">绑定规则的优先级 <a class="header-anchor" href="#绑定规则的优先级" aria-label="Permalink to &quot;绑定规则的优先级&quot;">​</a></h2><p>上述的四个绑定规则，它们之间也是存在优先级，下列的注意事项掌握后，优先级也就不成问题了</p><ul><li>独立调用，优先级最低，会被任意一种绑定规则覆盖</li><li>隐式绑定，它的优先级仅在独立调用之后，显式绑定之前</li><li>显式绑定<code>apply/call/bind</code>之间也存在优先级问题，<code>bind</code>的优先级高于<code>apply/call</code>，<code>apply</code>和<code>call</code>是同级，后面的绑定会覆盖前面的</li><li><code>new</code>绑定，优先级最高，但是<code>new</code>会和<code>apply/call</code>互斥</li></ul><p><strong><em>绑定规则的优先级总结下来就是：</em></strong></p><ul><li><code>new</code>和<code>apply/call</code>存在互斥，不能一同使用</li><li><code>new</code>绑定会覆盖所有的绑定 &gt; bind &gt; apply/call &gt; 隐式绑定 &gt; 独立调用</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><ol><li><code>this</code>的绑定是根据当前函数的执行上下文决定的，它会在函数运行时确定<code>this</code>指向</li><li><code>this</code>的四种绑定规则 <ul><li>独立调用</li><li>隐式绑定</li><li>显式绑定</li><li><code>new</code>绑定</li></ul></li><li>绑定规则的优先级 <ul><li><code>new</code>和<code>apply/call</code>存在互斥，不能一同使用</li><li><code>new</code>绑定 &gt; <code>bind</code> &gt; <code>apply/call</code> &gt; 隐式绑定 &gt; 独立调用</li></ul></li></ol>`,31)]))}const b=n(o,[["render",e]]);export{D as __pageData,b as default};
