(function ($, window) {
  let ele = null,
    exzoom_img_box = null,
    boxWidth = null,
    boxHeight = null,
    exzoom_img_ul_outer = null, //用于限制 ul 宽度,又不影响放大镜区域
    exzoom_img_ul = null,
    exzoom_img_ul_position = 0, //循环图片区域的边距,用于移动时跟随光标
    exzoom_img_ul_width = 0, //循环图片区域的最大宽度
    exzoom_img_ul_max_margin = 0, //循环图片区域的最大外边距,应该是图片数量减一乘以boxWidth
    exzoom_nav = null,
    exzoom_nav_inner = null,
    navHightClass = "current", //当前图片的类,
    exzoom_navSpan = null,
    navHeightWithBorder = null,
    images = null,
    exzoom_prev_btn = null, //导航上一张图片
    exzoom_next_btn = null, //导航下一张图片
    imgNum = 0, //图片的数量
    imgIndex = 0, //当前图片的索引
    imgArr = [], //图片属性的数字
    exzoom_zoom = null,
    exzoom_main_img = null,
    exzoom_zoom_outer = null,
    exzoom_preview = null, //预览区域
    exzoom_preview_img = null, //预览区域的图片
    autoPlayInterval = null, //用于控制自动播放的间隔时间
    startX = 0, //移动光标的起始坐标
    startY = 0, //移动光标的起始坐标
    endX = 0, //移动光标的终止坐标
    endY = 0, //移动光标的终止坐标
    g = {}, //全局变量
    defaults = {
      navWidth: 60, //列表每个宽度,该版本中请把宽高填写成一样
      navHeight: 60, //列表每个高度,该版本中请把宽高填写成一样
      navItemNum: 5, //列表显示个数
      navItemMargin: 7, //列表间隔
      navBorder: 1, //列表边框，没有边框填写0，边框在css中修改
      autoPlay: true, //是否自动播放
      autoPlayTimeout: 2000, //播放间隔时间
    };

  let methods = {
    init: function (options) {
      let opts = $.extend({}, defaults, options);

      ele = this;
      exzoom_img_box = ele.find(".exzoom_img_box");
      exzoom_img_ul = ele.find(".exzoom_img_ul");
      exzoom_nav = ele.find(".exzoom_nav");
      exzoom_prev_btn = ele.find(".exzoom_prev_btn"); //缩略图导航上一张按钮
      exzoom_next_btn = ele.find(".exzoom_next_btn"); //缩略图导航下一张按钮

      //todo 以后可以分开宽度和高度的限制
      boxHeight = boxWidth = ele.outerWidth(); //在小屏幕中,有 padding 的情况下,计算不准,需要手动指定 ele 的宽度

      // console.log("boxWidth::" + boxWidth);
      // console.log("ele.parent().width()::" + ele.parent().width());
      // console.log("ele.parent().outerWidth()::" + ele.parent().outerWidth());
      // console.log("ele.parent().innerWidth()::" + ele.parent().innerWidth());

      //todo 缩略图导航的高度和宽度可以改为根据 导航栏宽度 和 navItemNum 计算出来,但是对于不同尺寸的不好处理
      g.navWidth = opts.navWidth;
      g.navHeight = opts.navHeight;
      g.navBorder = opts.navBorder;
      g.navItemMargin = opts.navItemMargin;
      g.navItemNum = opts.navItemNum;
      g.autoPlay = opts.autoPlay;
      g.autoPlayTimeout = opts.autoPlayTimeout;

      images = exzoom_img_box.find("img");
      imgNum = images.length; //图片的数量
      checkLoadedAllImages(images); //检查图片是否健在完成,全部加载完成的会执行初始化
    },
    prev: function () {
      //上一张图片
      moveLeft();
    },
    next: function () {
      //下一张图片
      moveRight();
    },
    setImg: function () {
      //设置大图
      let url = arguments[0];

      getImageSize(url, function (width, height) {
        exzoom_preview_img.attr("src", url);
        exzoom_main_img.attr("src", url);

        //todo 未测试
        //判断已有的图片数量是否合最初的一致,不是的话就先删除最后一个
        if (exzoom_img_ul.find("li").length === imgNum + 1) {
          exzoom_img_ul.find("li:last").remove();
        }
        exzoom_img_ul.append(
          '<li style="width: ' +
            boxWidth +
            'px;">' +
            '<img src="' +
            url +
            '"></li>'
        );

        let image_prop = copute_image_prop(url, width, height);
        previewImg(image_prop);
      });
    },
  };

  $.fn.extend({
    exzoom: function (method, options) {
      if (arguments.length === 0 || (typeof method === "object" && !options)) {
        if (this.length === 0) {
          // alert("调用 jQuery.exzomm 时的选择器为空");
          $.error("Selector is empty when call jQuery.exzomm");
        } else {
          return methods.init.apply(this, arguments);
        }
      } else if (methods[method]) {
        return methods[method].apply(
          this,
          Array.prototype.slice.call(arguments, 1)
        );
      } else {
        // alert("调用了 jQuery.exzomm 中不存在的方法");
        $.error("Method " + method + "does not exist on jQuery.exzomm");
      }
    },
  });

  /**
   * 初始化
   */
  function init() {
    exzoom_img_box.append("<div class='exzoom_img_ul_outer'></div>");
    exzoom_nav.append("<p class='exzoom_nav_inner'></p>");
    exzoom_img_ul_outer = exzoom_img_box.find(".exzoom_img_ul_outer");
    exzoom_nav_inner = exzoom_nav.find(".exzoom_nav_inner");

    //把 exzoom_img_ul 移动到 exzoom_img_ul_outer 里
    exzoom_img_ul_outer.append(exzoom_img_ul);

    //循环所有图片,计算尺寸,添加缩略图导航
    for (let i = 0; i < imgNum; i++) {
      imgArr[i] = copute_image_prop(images.eq(i)); //记录图片的尺寸属性等
      console.log(imgArr[i]);
      let li = exzoom_img_ul.find("li").eq(i);
      li.css("width", boxWidth); //设置图片上级的 li 元素的宽度
      li.find("img").css({
        "margin-top": imgArr[i][5],
        width: imgArr[i][3],
      });
    }

    //缩略图导航
    exzoom_navSpan = exzoom_nav.find("span");
    navHeightWithBorder = g.navBorder * 2 + g.navHeight;
    g.exzoom_navWidth = (navHeightWithBorder + g.navItemMargin) * g.navItemNum;
    g.exzoom_nav_innerWidth = (navHeightWithBorder + g.navItemMargin) * imgNum;

    exzoom_navSpan.eq(imgIndex).addClass(navHightClass);
    exzoom_nav.css({
      height: navHeightWithBorder + "px",
      width: boxWidth - exzoom_prev_btn.width() - exzoom_next_btn.width(),
    });
    exzoom_nav_inner.css({
      width: g.exzoom_nav_innerWidth + "px",
    });
    exzoom_navSpan.css({
      "margin-left": g.navItemMargin + "px",
      width: g.navWidth + "px",
      height: g.navHeight + "px",
    });

    //设置滚动区域的宽度
    exzoom_img_ul_width = boxWidth * imgNum;
    exzoom_img_ul_max_margin = boxWidth * (imgNum - 1);
    exzoom_img_ul.css("width", exzoom_img_ul_width);
    //添加放大镜
    exzoom_img_box.append(`
<div class='exzoom_zoom_outer'>
    <span class='exzoom_zoom'></span>
</div>
<p class='exzoom_preview'>
    <img class='exzoom_preview_img' src='' />
</p>
            `);
    exzoom_zoom = exzoom_img_box.find(".exzoom_zoom");
    exzoom_main_img = exzoom_img_box.find(".exzoom_main_img");
    exzoom_zoom_outer = exzoom_img_box.find(".exzoom_zoom_outer");
    exzoom_preview = exzoom_img_box.find(".exzoom_preview");
    exzoom_preview_img = exzoom_img_box.find(".exzoom_preview_img");

    //设置大图和预览图区域
    exzoom_img_box.css({
      width: boxHeight + "px",
      height: boxHeight + "px",
    });

    exzoom_img_ul_outer.css({
      width: boxHeight + "px",
      height: boxHeight + "px",
    });

    exzoom_preview.css({
      width: boxHeight + "px",
      height: boxHeight + "px",
      left: boxHeight + 5 + "px", //添加个边距
    });

    previewImg(imgArr[imgIndex]);
    autoPlay(); //自动播放
    bindingEvent(); //绑定事件
  }

  /**
   * 检测图片是否加载完成
   * @param images
   */
  function checkLoadedAllImages(images) {
    let timer = setInterval(function () {
      let loaded_images_counter = 0;
      let all_images_num = images.length;
      images.each(function () {
        if (this.complete) {
          loaded_images_counter++;
        }
      });
      if (loaded_images_counter === all_images_num) {
        clearInterval(timer);
        init();
      }
    }, 100);
  }

  /**
   * 获取光标坐标,如果是 touch 事件,只处理第一个
   */
  function getCursorCoords(event) {
    let e = event || window.event;
    let coords_data = e, //记录坐标的数据,默认为 event 本身,移动端的 touch 会修改
      x, //x 轴
      y; //y 轴

    if (e["touches"] !== undefined) {
      if (e["touches"].length > 0) {
        coords_data = e["touches"][0];
      }
    }

    x = coords_data.clientX || coords_data.pageX;
    y = coords_data.clientY || coords_data.pageY;

    return { x: x, y: y };
  }

  /**
   * 检查移动端触摸滑动的位置
   */
  function checkNewPositionLimit(new_position) {
    if (-new_position > exzoom_img_ul_max_margin) {
      //限制向右的范围
      new_position = -exzoom_img_ul_max_margin;
      imgIndex = 0; //向右超出范围的回到第一个
    } else if (new_position > 0) {
      //限制向左的范围
      new_position = 0;
    }
    return new_position;
  }

  /**
   * 绑定各种事件
   */
  function bindingEvent() {
    //移动端大图区域的 touchend 事件
    exzoom_img_ul.on("touchstart", function (event) {
      let coords = getCursorCoords(event);
      startX = coords.x;
      startY = coords.y;

      let left = exzoom_img_ul.css("left");
      exzoom_img_ul_position = parseInt(left);

      window.clearInterval(autoPlayInterval); //停止自动播放
    });

    //移动端大图区域的 touchmove 事件
    exzoom_img_ul.on("touchmove", function (event) {
      let coords = getCursorCoords(event);
      let new_position;
      endX = coords.x;
      endY = coords.y;

      //只跟随光标移动
      new_position = exzoom_img_ul_position + endX - startX;
      new_position = checkNewPositionLimit(new_position);
      exzoom_img_ul.css("left", new_position);
    });

    //移动端大图区域的 touchend 事件
    exzoom_img_ul.on("touchend", function (event) {
      //触屏滑动,根据移动方向按倍数对齐元素
      console.log(endX < startX);
      if (endX < startX) {
        //向左滑动
        moveRight();
      } else if (endX > startX) {
        //向右滑动
        moveLeft();
      }

      autoPlay(); //恢复自动播放
    });

    //大屏幕在放大区域点击,判断向左还是向右移动
    exzoom_zoom_outer.on("mousedown", function (event) {
      let coords = getCursorCoords(event);
      startX = coords.x;
      startY = coords.y;

      let left = exzoom_img_ul.css("left");
      exzoom_img_ul_position = parseInt(left);
    });

    exzoom_zoom_outer.on("mouseup", function (event) {
      let offset = ele.offset();

      if (startX - offset.left < boxWidth / 2) {
        //在放大镜的左半部分点击
        moveLeft();
      } else if (startX - offset.left > boxWidth / 2) {
        //在放大镜的右半部分点击
        moveRight();
      }
    });

    //进入 exzoom 停止自动播放
    ele.on("mouseenter", function () {
      window.clearInterval(autoPlayInterval); //停止自动播放
    });
    //离开 exzoom 开始自动播放
    ele.on("mouseleave", function () {
      autoPlay(); //恢复自动播放
    });

    //大屏幕进入大图区域
    exzoom_zoom_outer.on("mouseenter", function () {
      exzoom_zoom.css("display", "block");
      exzoom_preview.css("display", "block");
    });

    //大屏幕在大图区域移动
    exzoom_zoom_outer.on("mousemove", function (e) {
      let width_limit = exzoom_zoom.width() / 2,
        max_X = exzoom_zoom_outer.width() - width_limit,
        max_Y = exzoom_zoom_outer.height() - width_limit,
        current_X = e.pageX - exzoom_zoom_outer.offset().left,
        current_Y = e.pageY - exzoom_zoom_outer.offset().top,
        move_X = current_X - width_limit,
        move_Y = current_Y - width_limit;

      if (current_X <= width_limit) {
        move_X = 0;
      }
      if (current_X >= max_X) {
        move_X = max_X - width_limit;
      }
      if (current_Y <= width_limit) {
        move_Y = 0;
      }
      if (current_Y >= max_Y) {
        move_Y = max_Y - width_limit;
      }
      exzoom_zoom.css({ left: move_X + "px", top: move_Y + "px" });

      exzoom_preview_img.css({
        left: (-move_X * exzoom_preview.width()) / exzoom_zoom.width() + "px",
        top: (-move_Y * exzoom_preview.width()) / exzoom_zoom.width() + "px",
      });
    });

    //大屏幕离开大图区域
    exzoom_zoom_outer.on("mouseleave", function () {
      exzoom_zoom.css("display", "none");
      exzoom_preview.css("display", "none");
    });

    //大屏幕光宝进入放大预览区域
    exzoom_preview.on("mouseenter", function () {
      exzoom_zoom.css("display", "none");
      exzoom_preview.css("display", "none");
    });

    //缩略图导航
    exzoom_next_btn.on("click", function () {
      moveRight();
    });
    exzoom_prev_btn.on("click", function () {
      moveLeft();
    });

    exzoom_navSpan.hover(function () {
      imgIndex = $(this).index();
      move(imgIndex);
    });
  }

  /**
   * 聚焦在导航图片上,左右移动都会调用
   * @param direction: 方向,right | left,必填
   */
  function move(direction) {
    if (typeof direction === "undefined") {
      alert("exzoom 中的 move 函数的 direction 参数必填");
    }
    //如果超出图片数量了,返回第一张
    if (imgIndex > imgArr.length - 1) {
      imgIndex = 0;
    }

    //设置高亮
    exzoom_navSpan
      .eq(imgIndex)
      .addClass(navHightClass)
      .siblings()
      .removeClass(navHightClass);

    //判断缩略图导航是否需要重新设置偏移量
    let exzoom_nav_width = exzoom_nav.width();
    let nav_item_width = g.navItemMargin + g.navWidth + g.navBorder * 2; // 单个导航元素的宽度
    let new_nav_offset = 0;

    //直接对比当前索引的图片占据的宽度和exzoom的宽度的差作为偏移量即可
    let temp = nav_item_width * (imgIndex + 1);
    if (temp > exzoom_nav_width) {
      new_nav_offset = boxWidth - temp;
    }

    exzoom_nav_inner.css({
      left: new_nav_offset,
    });

    //切换大图
    let new_position = -boxWidth * imgIndex;
    //在 animate 方法前先调用 stop() ,避免反应迟钝
    new_position = checkNewPositionLimit(new_position);
    exzoom_img_ul.stop().animate({ left: new_position }, 500);
    //处理放大区域
    previewImg(imgArr[imgIndex]);
  }

  /**
   * 导航向右
   */
  function moveRight() {
    imgIndex++; //先增加 index,后面判断范围
    if (imgIndex > imgNum) {
      imgIndex = imgNum;
    }
    move("right");
  }

  /**
   * 导航向左
   */
  function moveLeft() {
    imgIndex--; //先减少 index,后面判断范围
    if (imgIndex < 0) {
      imgIndex = 0;
    }
    move("left");
  }

  /**
   * 自动播放
   */
  function autoPlay() {
    if (g.autoPlay) {
      autoPlayInterval = window.setInterval(function () {
        if (imgIndex >= imgNum) {
          imgIndex = 0;
        }
        imgIndex++;
        move("right");
      }, g.autoPlayTimeout);
    }
  }

  /**
   * 预览图片
   */
  function previewImg(image_prop) {
    if (image_prop === undefined) {
      return;
    }
    exzoom_preview_img.attr("src", image_prop[0]);

    exzoom_main_img.attr("src", image_prop[0]).css({
      width: image_prop[3] + "px",
      height: image_prop[4] + "px",
    });
    exzoom_zoom_outer.css({
      width: image_prop[3] + "px",
      height: image_prop[4] + "px",
      top: image_prop[5] + "px",
      left: image_prop[6] + "px",
      position: "relative",
    });
    exzoom_zoom.css({
      width: image_prop[7] + "px",
      height: image_prop[7] + "px",
    });
    exzoom_preview_img.css({
      width: image_prop[8] + "px",
      height: image_prop[9] + "px",
    });
  }

  /**
   * 获得图片的真实尺寸
   * @param url
   * @param callback
   */
  function getImageSize(url, callback) {
    let img = new Image();
    img.src = url;

    // 如果图片被缓存，则直接返回缓存数据
    if (typeof callback !== "undefined") {
      if (img.complete) {
        callback(img.width, img.height);
      } else {
        // 完全加载完毕的事件
        img.onload = function () {
          callback(img.width, img.height);
        };
      }
    } else {
      return {
        width: img.width,
        height: img.height,
      };
    }
  }

  /**
   * 计算图片属性
   * @param image : jquery 对象或 图片url地址
   * @param width : image 为图片url地址时指定宽度
   * @param height : image 为图片url地址时指定高度
   * @returns {Array}
   */
  function copute_image_prop(image, width, height) {
    let src;
    let res = [];

    if (typeof image === "string") {
      src = image;
    } else {
      src = image.attr("src");
      let size = getImageSize(src);
      width = size.width;
      height = size.height;
    }

    res[0] = src;
    res[1] = width;
    res[2] = height;
    let img_scale = res[1] / res[2];

    if (img_scale === 1) {
      res[3] = boxHeight; //width
      res[4] = boxHeight; //height
      res[5] = 0; //top
      res[6] = 0; //left
      res[7] = boxHeight / 2;
      res[8] = boxHeight * 2; //width
      res[9] = boxHeight * 2; //height
      exzoom_nav_inner.append(
        `<span><img src="${src}" width="${g.navWidth}" height="${g.navHeight}"/></span>`
      );
    } else if (img_scale > 1) {
      res[3] = boxHeight; //width
      res[4] = boxHeight / img_scale;
      res[5] = (boxHeight - res[4]) / 2;
      res[6] = 0; //left
      res[7] = res[4] / 2;
      res[8] = boxHeight * 2 * img_scale; //width
      res[9] = boxHeight * 2; //height
      let top = (g.navHeight - g.navWidth / img_scale) / 2;
      exzoom_nav_inner.append(
        `<span><img src="${src}" width="${g.navWidth}" style='top:${top}px;' /></span>`
      );
    } else if (img_scale < 1) {
      res[3] = boxHeight * img_scale; //width
      res[4] = boxHeight; //height
      res[5] = 0; //top
      res[6] = (boxHeight - res[3]) / 2;
      res[7] = res[3] / 2;
      res[8] = boxHeight * 2; //width
      res[9] = (boxHeight * 2) / img_scale;
      let top = (g.navWidth - g.navHeight * img_scale) / 2;
      exzoom_nav_inner.append(
        `<span><img src="${src}" height="${g.navHeight}" style="left:${top}px;"/></span>`
      );
    }

    return res;
  }

  // 闭包结束
})(jQuery, window);
