/*function area*/
var ehaier = ehaier || {};


/*use*/
ehaier.products = {
	init : function () {
		var that = this;
		$('.ul-sharebox').thumbox({maxThumbWidth:500});//查看缩略图		
		if($('.commentsType').length){
			that._rateAnimate();//百分比
		}
	},
	
	_rateAnimate:function(){//百分比
	var max="bargood";
	var middle="barsoso";
	var min="barbad";	
	
	var maxValue=0;
	var minValue=0;
	
	var maxIndex=0;
	var minIndex=0;
	
	$(".charts").each(function(i,item){
		var a=parseInt($(item).attr("w"));
	
		if(i==0){
			minValue=a;
			minIndex=i;
		}
	
		if(a>maxValue){
			maxValue=a;
			maxIndex=i;
		}else if(a<minValue){
			minValue=a;
			minIndex=i;
		}
	
	});
	
	$(".charts").each(function(i,item){
		var addStyle="";
		var divindex=parseInt($(item).attr("divindex"));
		if(divindex==maxIndex){
			addStyle=max;
		}else if(divindex==minIndex){
			addStyle=min;
		}else{
			addStyle=middle;
		}
	
		$(item).addClass(addStyle);
		var a=$(item).attr("w");
		$(item).animate({
			width: a+"%"
		},1000);
	});
	
	}
}

/*use*/
$(function () {
	ehaier.products.init();
});