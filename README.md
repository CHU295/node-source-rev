<p align="center">
  <a href="https://www.npmjs.com/package/node-source-rev"><img src="https://img.shields.io/npm/dm/node-source-rev.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/node-source-rev"><img src="https://img.shields.io/npm/v/node-source-rev.svg?sanitize=true" alt="Version"></a>
</p>

# node-source-rev
利用nodejs给静态资源css js添加hash值 版本号解决缓存

# 使用方式
`npm i node-source-rev `

[github](https://github.com/CHU295/node-source-rev)

下载源代码到项目根目录，修改`myRootPath`为需要的路径，执行` node index.js`

# 简介
使用场景是前端jQuery、bootstrap编写的纯静态页面，在浏览器缓存等方面有点问题，所以需要解决缓存。

起先是打算使用gulp那一套，例如gulp-rev 等方案，后来发现太复杂有点大题小做。

所以就有了这一套代码。


# 设计思路
其实只是单纯的给html引入的地方添加了版本号hash值等等，所以不需要改动源文件。

使用nodejs编写，使用起来相比其它方案简单多了。

> 源代码在末尾

代码主要分为两大块
- 第一块，循环目录读取到所有html文件
- 第二块，使用fs模块读取html，然后正则匹配替换引用路径，覆盖源文件


# 其它
> 这里我用的是时间戳，如果需要hash等其它字符可以自行修改

> 路径替换的话这类只是替换了css js路径，如果需要替换png等文件自行修改正则表达式即可




# 源代码

```
var fs = require('fs');
var path = require('path');

readDir(myRootPath)

function readDir(filePath) {
  fs.readdir(filePath, (err, files) => {
    files.forEach(fileName => {
      var filedir = path.join(filePath, fileName);
      fs.stat(filedir, (eror, stats) => {
        if (stats.isFile()) {
          if (filedir.indexOf('.html') > -1) {
            htmlSourceAddVersion(filedir)
          }
        } else if (stats.isDirectory()) {
          readDir(filedir)
        }
      })
    })
  })
}

function htmlSourceAddVersion(path) {
  fs.readFile(path, 'utf8', (error, data) => {
    let timestamp = new Date().valueOf()
    let html = data.toString()
    html = html.replace(/((\.css)|(\.js))(\?.*?)?(\")/g, `$1?v=${timestamp}$5`)
    fs.writeFile(path, html, 'utf8', (err, data) => { })
  })
}


```

