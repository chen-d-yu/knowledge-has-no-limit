import{_ as n,o as a,c as l,L as p}from"./chunks/framework.a932675b.js";const e="/knowledge-has-no-limit/assets/image-20240122223330988.1c937385.png",o="/knowledge-has-no-limit/assets/image-20240122225329006.7f5ca913.png",t="/knowledge-has-no-limit/assets/image-20240122225918329.79e7c31e.png",b=JSON.parse('{"title":"拦截器","description":"","frontmatter":{"outline":[1,3],"typora-copy-images-to":"./assets"},"headers":[],"relativePath":"node/framework/nest/interceptors.md","lastUpdated":1725964165000}'),r={name:"node/framework/nest/interceptors.md"};function c(i,s,y,F,D,B){return a(),l("div",null,s[0]||(s[0]=[p(`<h1 id="拦截器" tabindex="-1">拦截器 <a class="header-anchor" href="#拦截器" aria-label="Permalink to &quot;拦截器&quot;">​</a></h1><p>拦截器与中间件一致，遵循 <code>AOP</code> 的思想实现，但是它们的作用却不相同。</p><p>似乎中间件能做的事，拦截器也能做：在中间件中可以获取 <code>RequestObject</code> 对象，在拦截器中也能通过 <code>ExecutionContext</code> 获取，那是不是拦截器就能完成中间件、拦截器的工作了呢？</p><p>对比了它们摘自官网的介绍，能发现这种理解是错误的。</p><p>中间件介绍：</p><blockquote><p>Middleware functions can perform the following tasks:</p><ul><li>execute any code.</li><li>make changes to the request and the response objects.</li><li>end the request-response cycle.</li><li>call the next middleware function in the stack.</li><li>if the current middleware function does not end the request-response cycle, it must call <code>next()</code> to pass control to the next middleware function. Otherwise, the request will be left hanging.</li></ul></blockquote><p>拦截器介绍：</p><blockquote><p>Interceptors have a set of useful capabilities which are inspired by the <a href="https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FAspect-oriented_programming" target="_blank" rel="noreferrer">Aspect Oriented Programming</a> (AOP) technique. They make it possible to:</p><ul><li>bind extra logic before / after method execution</li><li>transform the result returned from a function</li><li>transform the exception thrown from a function</li><li>extend the basic function behavior</li><li>completely override a function depending on specific conditions (e.g., for caching purposes)</li></ul></blockquote><ul><li>中间件和拦截器都能在请求到达前完成逻辑，但中间件的执行时机要早于拦截器。</li><li>拦截器的侧重点在 <code>AOP</code> ，它的执行时机是在路由方法的前后调用。</li><li>中间件可以中断请求，拦截器不行。</li><li>中间件无法知道当前处理请求的控制器和路由方法，拦截器可以，因为它依赖于控制器方法前后调用的。</li></ul><h2 id="使用拦截器" tabindex="-1">使用拦截器 <a class="header-anchor" href="#使用拦截器" aria-label="Permalink to &quot;使用拦截器&quot;">​</a></h2><p>拦截器是用 <code>@Injectable()</code> 装饰的类，需要实现 <code>NestInterceptor</code> 接口。它的表现得与中间件一致，能在方法前后做一些函数的增强，例如它能实现下面的功能：</p><ul><li>在方法执行前后绑定额外的逻辑</li><li>转换返回给方法结果</li><li>转换从方法抛出的异常</li><li>扩展一个方法行为</li><li>基于一些特定的条件，完全覆盖一个方法（例如缓存）</li></ul><p>我们接下来定义一个简单的拦截器：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">CallHandler</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">ExecutionContext</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">NestInterceptor</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Observable</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">tap</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">rxjs</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">LoggerInterceptor</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">implements</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">NestInterceptor</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">intercept</span><span style="color:#89DDFF;">(</span><span style="color:#BABED8;font-style:italic;">context</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">ExecutionContext</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">next</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">CallHandler</span><span style="color:#89DDFF;">):</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Observable</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Promise</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Observable</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">&gt;&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Before...</span><span style="color:#89DDFF;">&quot;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">now</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Date</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">now</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">next</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">handle</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">pipe</span><span style="color:#F07178;">(</span><span style="color:#82AAFF;">tap</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">After... </span><span style="color:#89DDFF;">\${</span><span style="color:#BABED8;">Date</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">now</span><span style="color:#BABED8;">() </span><span style="color:#89DDFF;">-</span><span style="color:#BABED8;"> now</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">ms</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>绑定注册到控制器上：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Controller</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Get</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">UseInterceptors</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@nestjs/common</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">AppService</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./app.service</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">LoggerInterceptor</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./interceptors/logger.interceptor</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">private</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">appService</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppService</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseInterceptors</span><span style="color:#BABED8;">(LoggerInterceptor)</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">getHello</span><span style="color:#89DDFF;">():</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">appService</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getHello</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>发送请求，获得如图的结果：</p><p><img src="`+e+`" alt="image-20240122223330988"></p><p>观察上面的例子，可以发现以下几点：</p><ul><li>必须返回一个 <code>RxJS</code> 响应流（包含 <code>Promise</code> 类型），否则接口类型不符会抛出错误。</li><li><code>next</code> 包含一个 <code>handle()</code> 方法，调用该方法会返回一个 <code>RxJS Observable</code> 响应流，调用 <code>handle()</code> 会执行路由方法，这在 <code>AOP</code> 的术语被称为 <strong>切入点</strong>。</li><li>拦截器有两个执行时机，时间线以 <code>next.handle()</code> 方法作为界线，带有打印 <code>Before</code> 的部分为进入路由方法之前被调用，调用 <code>handle()</code> 后的返回的 <code>RxJS Observable</code> 响应流所执行的逻辑。</li><li>传递一个类似 <code>ArgurmentHost</code> 的参数，<code>ExecutionContext</code> 继承自它，额外提供了当前执行过程的其他详细信息，比如获取当前增强方法的反射数据（当前处理方法以及包含它的控制器类）。</li></ul><div class="tip custom-block"><p class="custom-block-title">ExecutionContext 与 ArgumentsHost</p><p>更多 <code>ExecutionContext</code> 与 <code>ArgumentsHost</code> 请到查阅<a href="https://docs.nestjs.com/fundamentals/execution-context#execution-context" target="_blank" rel="noreferrer">官方文档</a>。</p></div><h2 id="绑定位置" tabindex="-1">绑定位置 <a class="header-anchor" href="#绑定位置" aria-label="Permalink to &quot;绑定位置&quot;">​</a></h2><p>与其他的组件一样，拦截器能在局部、全局进行绑定。</p><p>局部：</p><ul><li>控制器</li><li>路由方法</li></ul><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 1.绑定控制器</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseInterceptors</span><span style="color:#BABED8;">(LoggerInterceptor)</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">private</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">appService</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppService</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 2.绑定路由方法</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseInterceptors</span><span style="color:#BABED8;">(LoggerInterceptor)</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">getHello</span><span style="color:#89DDFF;">():</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">appService</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getHello</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>全局：</p><ul><li>主入口全局绑定，使用 <code>app.useGlobalInterceptors</code></li><li>根模块依赖注入</li></ul><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">async</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">function</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">bootstrap</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">app</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">NestFactory</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">create</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">AppModule</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 1.主入口全局绑定</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">useGlobalInterceptors</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">LoggerInterceptor</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">listen</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">3000</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#82AAFF;">bootstrap</span><span style="color:#BABED8;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// ---------------------------------------------</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Module</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">imports</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">controllers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [AppController]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">providers</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 2.根模块依赖注入绑定</span></span>
<span class="line"><span style="color:#BABED8;">    AppService</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">provide</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> APP_INTERCEPTOR</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">useClass</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> LoggerInterceptor</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">  ]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppModule</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="多重拦截器" tabindex="-1">多重拦截器 <a class="header-anchor" href="#多重拦截器" aria-label="Permalink to &quot;多重拦截器&quot;">​</a></h2><h3 id="同一位置多拦截器" tabindex="-1">同一位置多拦截器 <a class="header-anchor" href="#同一位置多拦截器" aria-label="Permalink to &quot;同一位置多拦截器&quot;">​</a></h3><p>当有多个拦截器绑定在同一个位置时，它们的顺序是固定的，会根据洋葱模型的特性，执行结果跟回形标类似，根据定义的顺序从下往上执行，然后回过头从上往下执行，比如下面这样：</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">private</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">readonly</span><span style="color:#BABED8;"> </span><span style="color:#BABED8;font-style:italic;">appService</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppService</span><span style="color:#89DDFF;">)</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// logger1与 logger2在打印上稍有不同</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseInterceptors</span><span style="color:#BABED8;">(LoggerInterceptor2)</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseInterceptors</span><span style="color:#BABED8;">(LoggerInterceptor)</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">getHello</span><span style="color:#89DDFF;">():</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#BABED8;">appService</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getHello</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>结果如下图：</p><p><img src="`+o+`" alt="image-20240122225329006"></p><h3 id="不同位置多个拦截器" tabindex="-1">不同位置多个拦截器 <a class="header-anchor" href="#不同位置多个拦截器" aria-label="Permalink to &quot;不同位置多个拦截器&quot;">​</a></h3><p>不同位置存在多个拦截器，比如全局、控制器、路由方法都存在拦截器时，它们的执行顺序是正序的，也就是：<code>全局 &gt; 控制器 &gt; 方法</code> 。</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 全局 </span></span>
<span class="line"><span style="color:#BABED8;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">useGlobalInterceptors</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">new</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">LoggerInterceptor3</span><span style="color:#BABED8;">())</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 控制器</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseInterceptors</span><span style="color:#BABED8;">(LoggerInterceptor2)</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Controller</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">class</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">AppController</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 方法</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">UseInterceptors</span><span style="color:#BABED8;">(LoggerInterceptor)</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Get</span><span style="color:#BABED8;">()</span></span>
<span class="line"><span style="color:#82AAFF;">getHello</span><span style="color:#BABED8;">(): string </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>结果如下图：</p><p><img src="`+t+'" alt="image-20240122225918329"></p><h2 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h2><p>基于 <code>AOP</code> 思想实现的组件，列举以下常用场景：</p><ul><li>日志记录。</li><li>封装统一的响应结果。</li><li>通过 <code>RxJS</code> 超时异常处理。</li><li>缓存拦截，命中缓存直接返回，未命中可存入缓存。</li><li>请求预处理，在请求未到达路由之前，对请求进行验证、修改请求头。</li><li>数据加密和解密。</li><li>流量控制，限制请求的频率。</li><li>事件订阅。</li><li>...</li></ul><p>用过 <code>Axios</code> 网络请求库的同学在阅读本章节时，可能会有一种感觉：拦截器好像 <code>Axios</code> 的请求拦截和响应拦截。事实也确实如你所感觉的一样，拦截器的两段执行时机，对应着请求拦截和响应拦截。</p><p>前端开发通常在拦截器中做的最多的：</p><ul><li>请求预处理，在发出请求前，添加上 <code>token</code> 等请求头。</li><li>提取响应结果，封装服务器响应结果为需要的数据格式，以便后续处理。</li></ul><h2 id="案例一-响应拦截-统一返回" tabindex="-1">案例一：响应拦截，统一返回 <a class="header-anchor" href="#案例一-响应拦截-统一返回" aria-label="Permalink to &quot;案例一：响应拦截，统一返回&quot;">​</a></h2><h2 id="案例二-超时处理" tabindex="-1">案例二：超时处理 <a class="header-anchor" href="#案例二-超时处理" aria-label="Permalink to &quot;案例二：超时处理&quot;">​</a></h2><h2 id="案例三-缓存" tabindex="-1">案例三：缓存 <a class="header-anchor" href="#案例三-缓存" aria-label="Permalink to &quot;案例三：缓存&quot;">​</a></h2>',49)]))}const u=n(r,[["render",c]]);export{b as __pageData,u as default};
