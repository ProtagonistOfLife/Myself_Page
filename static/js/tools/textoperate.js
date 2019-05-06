//解决js中没有replaceAll的问题
String.prototype.replaceAll = function(s1,s2){
　　return this.replace(new RegExp(s1,"gm"),s2);
}

//将文本中所有的空格、换行、回车都清除
function trim(content){
	content = content.replace(/\r/g, '');
	content = content.replace(/\s/g, '');
	return content;
}

//删除每一行中的空格
function trim_line(content){
	var array1 = content.split('\n');
	content = '';
	for(var i in array1){
		array1[i] = array1[i].replace(/\r/g, '');
		array1[i] = array1[i].replace(/\s/g, '');
		if(array1[i] == ''){
			continue;
		}
		content += array1[i] + '\n';
	}
	return content;
}

//删除相同的行
function trim_commonline(content){
	var array1 = content.split('\n');
	var different = [];
	var index = -1;
	for(var i in array1){
		if(different.indexOf(array1[i]) < 0){
//			different.push(trim(array1[i]));
			different.push(array1[i]);
		}
	}
	content = '';
	for(var i in different){
		content += different[i] + '\n';
	}
	return content;
}

//删除所有指定的语句
function trim_words(content,words){
	return content.replaceAll(words,'');
}

/**删除每一行中的指定列数或前多少行
 * word='3-6'表示删除每一行的3-6列
 * word='hello word'表示删除每一行第1列岛指定语句长度列
 */
function trim_col(content,word){
	var start_col = -1;
	var end_col = -1;
	var start_row = -1;
	var end_row = -1;
	var reg = RegExp(/\d-\d/);
	console.log(reg.test(word));
	if(reg.test(word)){
		
	}else{
		
	}
	var array = content.split('\n');
	if(start_row > 0){
		if(start_row > array.length){
			return content;
		}
	}else{
		start_row = 0;
	}
	if(end_row < 0 || end_row > array.length){
		end_row = array.length;
	}
	for(var i = start_row;i <= end_row;i++){
		array[i] = array[i].substring(0,start_col) + array[i].substring(end_col,array[i].length);
	}
	content = '';
	for(var i in array1){
		content += array1[i] + '\n';
	}
	return content;
}