
// **************TAB特效*******************
var oProduct = document.getElementsByClassName("product_list");//获取所有商品列表元素
for(var i=0; i<oProduct.length; i++){
	var oTab = oProduct[i].getElementsByTagName("span");//从商品列表中获取全部span元素
	for(var k=0; k<oTab.length; k++){
		oTab[k].index = k;//获取当前k值交给span元素的index属性
		oTab[k].onmouseover = function(){//当鼠标移动到对应按钮时发生事件
			var oUl = this.parentNode.parentNode.getElementsByTagName("ul");//获取所有特定ul元素（ul元素父节点的父节点为商品列表元素）
			var oSpan = this.parentNode.getElementsByTagName("span");//获取所有特定span元素（span元素父节点为商品列表元素））
			for(var j=0; j<oUl.length; j++){
				oUl[j].style.display = "none";//定义商品列表的ul元素不会被显示
				oSpan[j].style.background = "#eaeef9";//改变商品列表中的按钮元素的背景颜色
			}
			oUl[this.index].style.display = "block";//定义对应ul元素为块级元素
			oSpan[this.index].style.background = "#fff";//改变移动到的按钮元素的背景颜色
		}
	}
	oTab[0].onmouseover();//重置元素
}


// **************轮播图特效*******************

/*定义4个全局变量：
	i为图像数量（0-5）；
	j为切换图像时渐变的步长（10-0）；
	Timer为切换图像定时器；
	Timer2为图像渐变定时器 */
var i=j=Timer=Timer2=0;
var oAd = document.getElementById("ad"); //获取轮播图元素
oAd.onmouseover = clearTimer;	//绑定事件处理函数：当鼠标移入轮播图时，调用函数clearTimer()
oAd.onmouseout = setTimer; //绑定事件处理函数：当鼠标移出轮播图时，调用函数setTimer()

var btns = oAd.getElementsByTagName("span"); //从轮播图中获取全部按钮（span元素）
btns[0].style.background = "#f60"; //改变第1个按钮（第1个span元素）的背景色
setTimer(); //启动图像轮播

function setTimer(){
	Timer = setInterval("sr()",3000); //每隔3秒调用函数sr()一次 （切换一幅图像）
}

function clearTimer(){
	var n = event.target.innerHTML; //获取事件发生时（即当鼠标移入轮播图时）目标元素的超文本内容
	if(n>0) { //如果内容是数字（只有span元素有内容1-6），说明鼠标移入按钮，需要切换图像。
		i = n>1?n-2:5; //设定前一图像
		sr(); //切换图像
	}
	clearInterval(Timer); //停止切换图像
}

function sr(){
	for( var k=0; k<btns.length; k++) btns[k].style.background = "#716564"; //所有按钮还原背景色
	if(++i>5) i=0;	//设定新图像
	btns[i].style.background = "#f60"; //改变第相应按钮（span元素）的背景色
	clearTimeout(Timer2); //停止图像渐变
	j=9, sr2(); //重新开始图像渐变
}

//函数sr2()用于逐渐改变列表元素（ul元素）的上边位置，达到图像渐变的目的。
//由j值（10-0）控制sr2()调用次数。
function sr2(){
	document.getElementById("ad1").style.top = -390*(i-j/10) + "px"; 
	if(--j>=0) Timer2 = setTimeout("sr2()",100); //如果j>=0则0.1秒后调用自己一次。
}
