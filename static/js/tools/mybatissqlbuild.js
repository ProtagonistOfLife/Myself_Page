function operatekind(operate,sql_field){
	//对select操作
	if(operate == 'select'){
		$('#sqlcontent').val(mybatis_select(sql_field));
	}
	//对insert操作
	else if(operate == "insert"){
		$('#sqlcontent').val(mybatis_insert(sql_field));
	}
	//对delete操作
	else if(operate == "delete"){
		$('#sqlcontent').val(mybatis_delete(sql_field));
	}
	//对update的操作
	else if(operate == "update"){
		$('#sqlcontent').val(mybatis_update(sql_field));
	}
	//对插入所有的操作
	else if(operate == "insertAll"){
		$('#sqlcontent').val(mybatis_insertAll(sql_field));
	}
}

//mybatis select查询语句生成
function mybatis_select(sql_field){
	var map = sqlAndJavaField();
	var sql = "select ";
	if(map.allfield){
		sql += "*";
	}else{
		for(key in map.field){
			sql += key + ',';
		}
		sql = sql.substr(0,sql.length-1);
	}
	sql += ' from ' + $('#tables').val() + '\n<where>';
	var obj = '';
	if($('#paramtype').val() == 'obj' && $('#objname').val() != ''){
		obj = $('#objname').val() + '.';
	}
	var notstart = false;
	for(key in map.conditional){
		sql += '\n\t<if test="' + obj + map.conditional[key] + ' != null">\n\t\t';
		if(notstart){
			sql += 'and ';
		}
		notstart = true;
		sql += key + ' = #{' + obj + map.conditional[key] + '}\n\t</if>';
	}
	sql += '\n</where>';
	return sql;
}

//mybatis insert操作
function mybatis_insert(sql_field){
	var map = sqlAndJavaField();
	var sql = 'insert into ' + $('#tables').val() + '(';
	var obj = '';
	if($('#paramtype').val() == 'obj' && $('#objname').val() != ''){
		obj = $('#objname').val() + '.';
	}
	var values = '(';
	for(var key in map.field){
		sql += key + ',';
		values += '#{' + obj + map.field[key] + '},';
	}
	values = values.substr(0,values.length-1) + ')';
	sql = sql.substr(0,sql.length-1) + ')\nvalues';
	return sql + values;
}

//mybatis delete操作
function mybatis_delete(sql_field){
	var map = sqlAndJavaField();
	var sql = 'delete from ' + $('#tables').val() + '\n<where>';
	var obj = '';
	if($('#paramtype').val() == 'obj' && $('#objname').val() != ''){
		obj = $('#objname').val() + '.';
	}
	var notstart = false;
	for(key in map.conditional){
		sql += '\n\t<if test="' + obj + map.conditional[key] + ' != null">\n\t\t';
		if(notstart){
			sql += 'and ';
		}
		notstart = true;
		sql += key + ' = #{' + obj + map.conditional[key] + '}\n\t</if>';
	}
	sql += '\n</where>';
	return sql;
}

//更新操作
function mybatis_update(sql_field){
	var map = sqlAndJavaField();
	var sql = 'update ' + $('#tables').val() + '\n<set>';
	var obj = '';
	if($('#paramtype').val() == 'obj' && $('#objname').val() != ''){
		obj = $('#objname').val() + '.';
	}
	for(key in map.field){
		sql += '\n\t<if test="' + obj + map.field[key] + ' != null">\n\t\t';
		sql += key + ' = #{' + obj + map.field[key] + '},\n\t</if>';
	}
	sql += '\n</set>\nwhere ';
	var notstart = false;
	for(key in map.conditional){
		if(notstart){
			sql += '\nand ';
		}
		notstart = true;
		sql += key + ' = #{' + obj + map.conditional[key] + '}';
	}
	return sql;
}

//插入所有
function mybatis_insertAll(sql_field){
	var map = sqlAndJavaField();
	var sql = 'insert into ' + $('#tables').val() + '(';
	var obj = '';
	if($('#paramtype').val() == 'obj' && $('#objname').val() != ''){
		obj = $('#objname').val() + '.';
	}
	var values = '\n<foreach collection =' + $('#objname').val() 
				+ ' item="item" index= "index" separator =",">\n\t(';
	for(var key in map.field){
		sql += key + ',';
		values += '#{' + 'item.' + map.field[key] + '},';
	}
	values = values.substr(0,values.length-1) + ')\n</foreach>';
	sql = sql.substr(0,sql.length-1) + ')\nvalues';
	return sql + values;
}