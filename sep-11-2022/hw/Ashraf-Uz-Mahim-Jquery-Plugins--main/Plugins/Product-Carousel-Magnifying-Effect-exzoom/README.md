# 简介
exzoom 是一个 jquery 放大镜插件,自带缩略图导航和自动播放功能,也提供了手动修改大图的方法

多行字符串使用了 ES6 语法,必要时请自行处理.

# 页面效果:
* 自动播放(默认)
* 单独设置大图
* 大屏幕:
    * 点击大图左右两侧实现上一张/下一张
    * 光标悬浮在底部缩略图部分时可切换图片
* 调屏幕:
    * 触摸屏幕实现上一张/下一张    
 
## DEMO
![DEMO](https://github.com/weihaipy/exzoom/raw/master/demo/demo.png "DEMO")

## 使用方法:
* 初始化: 
```javascript
$("#exzoom").exzoom();
```
* 初始化后可以设置大图:
 ```javascript
 $("#exzoom").exzoom("setImg", "http://www.jb51.net/images/logo.gif");
```  

# 注意
本程序仅对个人非商业用途提供免费授权,详情请查看 LICENSE