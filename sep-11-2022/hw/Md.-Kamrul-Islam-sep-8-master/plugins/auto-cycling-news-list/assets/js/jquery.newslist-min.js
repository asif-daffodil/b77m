(function(c){function n(g,j,i,a){j.hide();j.eq(0).fadeIn(g.fadeSpeed);i.eq(0).addClass("current");a.css("overflow","hidden")}c.fn.newslist=function(g){return this.each(function(){c.init(this,g)})};c.init=function(g,j){var i,a,l,h,b,m=[],d;i={itemsDiv:".items",item:".item",controlsDiv:".controls",cycler:true,hoverClass:"on",cycleSpeed:1E4,fadeSpeed:1E3,maxLoops:null,leadZero:false};if(j)b=c.extend({},i,j);i=c(g).find(b.itemsDiv);a=c(g).find(b.item);l=c(g).find(b.controlsDiv);m={init:1,cur:1,total:b.maxLoops*
a.length-1};d=1;a.each(function(){c(this).attr("id","item"+d++)});for(d=1;d<=a.length;d++){itext=d<10&&b.leadZero?"0"+d:d;l.append('<a rel="'+d+'" id="control'+d+'" href="#'+d+'">'+itext+"</a>")}h=l.children("a");h.click(function(f){f.preventDefault();f=b;var e=c(this);f.cycler=false;a.hide();a.eq(e.index()).fadeIn(f.fadeSpeed);h.removeClass("current");e.addClass("current")});h.hover(function(){c(this).addClass(b.hoverClass)},function(){c(this).removeClass(b.hoverClass)});n(b,a,h,i);setIntervalID=
setInterval(function(){var f=b,e=m,k;if((e.cur<=e.total||f.maxLoops==null)&&f.cycler){k=e.init+1;if(k>a.length){k=1;e.init=0}a.hide();a.filter("#item"+k).fadeIn(f.fadeSpeed);h.removeClass("current");h.filter("#control"+k).addClass("current");e.init++;e.cur++}else clearInterval(setIntervalID)},b.cycleSpeed)}})(jQuery);