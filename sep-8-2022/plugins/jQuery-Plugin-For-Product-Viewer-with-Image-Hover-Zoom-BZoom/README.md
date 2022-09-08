# bzoom  

本代码是参照jquery.etalage.min.js的功能实现的jQuery放大镜效果！代码在`./js/jqzoom.js`中，当然，本代码实现的功能没有人家的那么全面！  

目前主要实现的功能有：
*  使用淡入淡出的效果进行放大和缩小；  
*  自动轮播图片或手动切换图片；
*  根据需要设置展示的图片的个数；  
*  设置展示图片，小图片和放大图片的尺寸；  

使用本类库时，需参照以下的规范：  

1. html的结构必须为：
```html
<div class="etalage_wrap">
    <ul id="etalage">
        <li>
            <img class="etalage_thumb_image" src="http://p3.jmstatic.com/product/000/506/506658_std/506658_pop_375_500_1.jpg" title="first img" />
            <img class="etalage_big_image" src="http://p3.jmstatic.com/product/000/506/506658_std/506658_pop_750_1000_1.jpg"/>
        </li>
       	...
    </ul>
</div>
```
类名和id与上面保持一致，`class="etalage_thumb_image"`的图片是默认展示的图片，`class="etalage_big_image"`的图片是鼠标hover时的放大图片。  

2. css样式需要引入`./css/style.css`  

3. 参数设置：  
```javascript
var _option = {
	align: "left",				// 当前展示图片的位置，则放大的图片在其相对的位置
	thumb_image_width: 300,		// 当前展示图片的宽
	thumb_image_height: 400,	// 当前展示图片的高
	source_image_width: 900,  	// 放大图片的宽
	source_image_height: 1200,	// 放大图片的高
	zoom_area_width: 600, 		// 放大图片的展示区域的宽
	zoom_area_height: "justify",// 放大图片的展示区域的高
	zoom_area_distance: 10,     // 
	zoom_easing: true,          // 是否淡入淡出
	description_opacity: 0.7,
	small_thumbs: 3,			// 小图片展示的数量
	smallthumb_inactive_opacity: 0.4, 	// 小图片处于非激活状态时的遮罩透明度
	smallthumbs_position: "bottom",		// 小图片的位置
	show_icon: true,
	hide_cursor: false,			// 鼠标放到图片时，是否隐藏指针
	speed: 600,     			// 
	autoplay: true,				// 是否自动播放
	autoplay_interval: 6000, 	// 自动播放时每张图片的停留时间
}
```
然后根据自己的需要设置参数即可：  
```javascript
$("#etalage").zoom({
	zoom_area_width: 300,
    autoplay_interval :3000,
    small_thumbs : 4,
    autoplay : false
});
```

当然，目前还只是个雏形，还有很多的问题需要解决，比如：  
1. 没有左右箭头来进行更多张图片的轮播，只能展示固定张数的图片；  
2. 图片之间的间距没有合理的计算，是写死的值；  
3. 右侧放大的图片，因为没有border的值，导致比左边大那么一点点；  

