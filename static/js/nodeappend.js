/**
 * @param result	网站信息数组
 * @param subtile	网站类型小标题
 */
function addWebsiteInfo(result,subtile){
	var webheader = '';
	if(result != null && result.length > 0){
		webheader = '<!--' + subtile + '-->'
		+ '<h4 class="text-gray"><i class="linecons-tag" style="margin-right: 7px;" id="'
		+ subtile + '"></i>' + subtile + '</h4>';
		$("#main-content").append(webheader);
		for(var i = 0;i < result.length;i=i+4){
			var rowcont = $('<div class="row"></div>');
			for(var j = i;j < result.length && j < i+4;j++){
				var website = $('<div class="col-sm-3"><div class="xe-widget xe-conversations box2 label-info"'
						+ 'data-toggle="tooltip" data-placement="bottom" title="">'
						+ '<div class="xe-comment-entry"><a class="xe-user-img"> <img class="img-circle" width="40">'
						+ '</a><div class="xe-comment"><a href="#" class="xe-user-name overflowClip_1"> <strong></strong>'
						+ '</a><p class="overflowClip_2"></p></div></div></div></div>');
				website.find('div').attr('onclick','window.open(\'' + result[j].url
						+ '\', \'_blank\')');
				website.find('div').attr('data-original-title',result[j].url);
				website.find('div').find('div').find('a').find('img').attr('src',result[j].imageurl);
				website.find('div').find('div').find('div').find('a').find('strong').append(result[j].name);
				website.find('div').find('div').find('div').find('p').append(result[j].describe);
				rowcont.append(website);
			}
			$("#main-content").append(rowcont);
		}
		$("#main-content").append('<br><!--END ' + subtile + '-->');
	}
}