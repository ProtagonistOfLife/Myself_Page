function getdata(key){
	var cachedata = $("#datacache").text();
	if(cachedata != null){
		cachedata = JSON.parse(cachedata);
		return cachedata[key];
	}
}

function savedata(key,value){
	var cachedata = $("#datacache").text();
	if(cachedata == null || cachedata == ''){
		cachedata = {};
	}else{
		cachedata = JSON.parse(cachedata);
	}
	cachedata[key] = value;
	$("#datacache").text(JSON.stringify(cachedata));
}