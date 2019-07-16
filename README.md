# 为什么要测试

首先，我们要清楚为什么要测试。说白了就是**`检验我们写的代码是否有错误`**或者是需要优化的地方，从而提高我们的代码质量。要有自动化测试就需要写测试用例，在发布之前跑一遍测试用例，可以保证测试用例覆盖的地方是没有bug。
自动化测试另一个好处就是效率高，比如一个按钮的功能交给测试人员去测，需要找到页面点击对应按钮然后根据才能知道这个功能是否有问题。那交给机器，**`通过脚本去跑程序来判断是否正确要更快更准确`**，而且每次改动代码之后可以马上接入自动化测试检查是否有错误。总之，机器测试的效率肯定是要去人测试快多啦。每一次需求迭代更新，**`代码修改后，回归测试`**。

# 测试工具

1. 测试框架：**`Mocha`**、Jasmine等等，主要是提供了清晰简明的语法来描述测试用例，测试分组以及测试不通过报错，具体哪报的错，什么原因报错等等。测试框架通常提供BDD(行为驱动开发)和TDD(测试驱动开发)两种测试语法来编写测试用例。Mocha支持两种，而Jasmine只支持BDD，下面会以Mocha的BDD为例。

2. 断言库：**`Should.js`**、chai、expect.js等等，断言库提供了多少语义化的方法提供各种情况的判断。当然也不可以不用断言库，nodejs本来也有assert断言模块，下面会以Should.js为例。

3. 代码覆盖率：**`Istanbul`**是本地测试代码覆盖率常用的工具之一，它提供了一系列代码覆盖率的测试指标，可以清晰的知道哪方面的代码没有覆盖到。

> TDD
TDD的原理是在开发功能代码之前，先编写单元测试用例代码，测试代码确定需要编写什么产品代码
BDD
行为驱动开发（Behavior-Driven Development）（简写BDD），在软件工程中，BDD是一种敏捷软件开发的技术，它鼓励软件项目中的开发者、QA和非技术人员或商业参与者之间的协作。
[参考：TDD & BDD](https://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)

# 简单nodejs项目例子

#### 目录结构
```
.
├── node_modules
└── src
    └── index.js
└── test
    └── test.js
├── package.json
└── README.md
```

#### 1.首先需要安装测试框架和断言库：

```
npm install mocha should --save-dev
```

#### 2.测试用例：

```
'use strict'
require('should');
const factorial = require('../src/index');

describe('test index', function (){
  before(function(){
      // Stuff to do before the tests, like imports, what not
  });

  describe('#factorial()', function (){
      it('should return 1 when given 0', function (){
          factorial(0).should.equal(1);
      });

      it('should return 1 when given 1', function (){
          factorial(1).should.equal(1);
      });

      it('should return 2 when given 2', function (){
          factorial(2).should.equal(2);
      });

      it('should return 6 when given 3', function (){
          factorial(3).should.equal(6);
      });
  });

  after(function () {
      // Anything after the tests have finished
  });
});
```

> **it()**
it()函数定义了一个测试用例，通过Should.js提供的api，可以非常语义化的描述测试用例

> **describe: 给测试用例分组**
为了尽可能多的覆盖各种情况，测试用例往往会有很多。这时候通过分组就可以比较方便的管理（这里提一句，describe是可以嵌套的，也就是说外层分组了之后，内部还可以分子组）。另外还有一个非常重要的特性，就是每个分组都可以进行预处理（before、beforeEach）和后处理（after, afterEach）。

#### 3.实现代码：

```
'use strict'

const factorial = function (n) {
  if (n < 0) return NaN;
  if (n === 0) return 1;

  return n * factorial(n - 1);
};
module.exports = factorial
```

#### 4.在package.json文件中加入命令

```
"scripts": {
  "test": "mocha"
},
```

#### 5.run test

```
npm run test
```

# 异步代码的例子

#### 1.测试用例

```
'use strict';
require('should');
const mylib = require('../src/promise');

describe('test promise', () => {
  it('Welcome to Tmall', () => {
    return mylib('Tmall').should.be.fulfilledWith('Hello Tmall');
  });
});
```

> Should.js在8.x.x版本自带了Promise支持，可以直接使用fullfilled()、rejected()、fullfilledWith()、rejectedWith()等等一系列API测试Promise对象。

#### 2.promise实现代码

```
'use strict';
module.exports = name => new Promise(resolve => setTimeout(() => {resolve(`Hello ${name}`)}, 2000));
```
> 默认超时时间是2000ms, 可以通过 ```mocha --timeout 4000``` 修改

#代码覆盖率

#### 1.安装istanbul

```
npm install istanbul --save-dev
```
> 当使用istanbul运行Mocha时，istanbul命令自己的参数放在--之前，需要传递给Mocha的参数放在--之后

#### 2.修改script命令

```
"scripts": {
  "cover": "istanbul cover mocha -- --delay"
},
```
> windows下  mocha 换成 node_modules/mocha/bin/_mocha ，否则会找不到


#### 3.覆盖率报告

```
=============================== Coverage summary ===============================
Statements   : 92.86% ( 13/14 )
Branches     : 83.33% ( 5/6 )
Functions    : 100% ( 4/4 )
Lines        : 88.89% ( 8/9 )
================================================================================

语句覆盖率（statement coverage）：是否每个语句都执行了？
分支覆盖率（branch coverage）：是否每个if代码块都执行了？
函数覆盖率（function coverage）：是否每个函数都调用了？
行覆盖率（line coverage）：是否每一行都执行了？
```

#接入karma
> A simple tool that allows you to execute JavaScript code in multiple real browsers.

#### 1.加载依赖包

```
	"babel": "^6.23.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "istanbul": "^0.4.5",
    "karma": "^4.2.0",
    "karma-chrome-launcher": "^3.0.0",
    "karma-coverage": "^1.1.2",
    "karma-firefox-launcher": "^1.1.0",
    "karma-mocha": "^1.3.0",
    "karma-phantomjs-launcher": "^1.0.4",
    "karma-should": "^1.0.0",
    "karma-spec-reporter": "0.0.32",
    "karma-webpack": "^4.0.2",
    "mocha": "^6.1.4",
    "phantomjs-prebuilt": "^2.1.16",
    "should": "^13.2.3",
    "webpack": "^4.35.3"
```
#### 2.配置文件

```
'use strict';

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      './node_modules/should/should.js',
      'src/**/*.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'src/**/*.js': ["webpack", 'coverage'],
      'test/**/*.js': ["webpack", 'coverage']
    },
    plugins: ["karma-webpack", 'karma-should', 'karma-mocha', 'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-firefox-launcher', 'karma-coverage', 'karma-spec-reporter'],
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
              {
                loader: 'babel-loader'
              },
            ]
          },
        ]
      }
    },
    browsers: ['PhantomJS', 'Firefox', 'Chrome'],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{
        type: 'json',
        subdir: '.',
        file: 'coverage.json',
      }, {
        type: 'lcov',
        subdir: '.'
      }, {
        type: 'text-summary'
      }]
    }
  });
};
```

# 参考文档

[聊一聊前端自动化测试](https://segmentfault.com/a/1190000004558796#articleHeader14)

[前端测试基本流程](https://www.jianshu.com/p/481ef8cccd82?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)